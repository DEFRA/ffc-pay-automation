import 'cypress-axe'
import addContext from 'mochawesome/addContext'
import './commands'
const { getEnvironmentConfig } = require('../support/configLoader')
const envConfig = getEnvironmentConfig()
const env = envConfig.env

Cypress.on('uncaught:exception', (err) => {
  if (err.message && err.message.includes('cross-origin frame')) {
    return false
  }
})

let stepLog = []
let pendingContext = []
let screenshotPathsThisTest = []
let executedSteps = []

//allows us to set these values when we generate frn in payment steps
let debugContext = {
  frn: null,
  agreementNumber: null,
  contractNumber: null,
  invoiceNumber: null,
  scheme: null,
  paymentRequestId: null,
  sbi: null
}

Cypress.Commands.add('setDebugContext', (values) => {
  debugContext = {
    ...debugContext,
    ...values
  }
})
// STEP LOGGING

Cypress.on('log:step', (step) => {
  stepLog.push(step)
  executedSteps.push(step)
})



// SCREENSHOT CAPTURE

Cypress.Screenshot.defaults({
  onAfterScreenshot (_details, results) {
    if (results && results.path) {
      screenshotPathsThisTest.push(results.path)
    }
  }
})

afterEach(function () {
  const debugReportEnabled =
    Cypress.env('debugReport') === true ||
    Cypress.env('debugReport') === 'true'

  if (debugReportEnabled && this.currentTest?.state === 'failed') {
    const currentTest = this.currentTest

    const scenario = currentTest.title.replace(
      /\s*\(example #\d+\)/i,
      ''
    )

    const capturedSteps = [...executedSteps]
    const capturedScreenshots = [...screenshotPathsThisTest]
    const capturedBusinessContext = { ...debugContext }

    const lastStep =
      capturedSteps.length > 0
        ? capturedSteps[capturedSteps.length - 1]
        : 'No steps captured'

    cy.url().then((url) => {
      const reportData = {
        feature: Cypress.spec.name,
        scenario,
        status: currentTest.state,
        timestamp: new Date().toISOString(),
        environment: Cypress.env('env'),
        url,

        error:
          currentTest.err?.message ??
          'No error captured',

        stack:
          currentTest.err?.stack
            ?.split('\n')
            .slice(0, 10)
            .join('\n') ??
          'No stack trace captured',

        duration:
          currentTest.wallClockDuration ??
          currentTest.duration ??
          0,

        lastStep,
        steps: capturedSteps,
        screenshots: capturedScreenshots,
        businessContext: capturedBusinessContext,

        processingLogs: 'Not collected',
        enrichmentLogs: 'Not collected',
        submissionLogs: 'Not collected',
        trackingLogs: 'Not collected'
      }

      const isDev = String(Cypress.env('env')).includes('dev')

      if (!isDev) {
        return cy.task('writeFailureReport', reportData)
      }

      const namespace = Cypress.env('KUBERNETES_NAMESPACE')

      const searchText =
        capturedBusinessContext.frn != null
          ? String(capturedBusinessContext.frn)
          : null

      const logSources = [{
        reportKey: 'processingLogs',
        label: 'app.kubernetes.io/name=ffc-pay-processing'
      }, {
        reportKey: 'enrichmentLogs',
        label: 'app.kubernetes.io/name=ffc-pay-enrichment'
      }, {
        reportKey: 'submissionLogs',
        label: 'app.kubernetes.io/name=ffc-pay-submission'
      }, {
        reportKey: 'trackingLogs',
        label: 'app.kubernetes.io/name=ffc-pay-tracking'
      }]

      return cy.wrap(logSources, { log: false })
        .each((source) => {
          return cy.task(
            'getFilteredPodLogs',
            {
              namespace,
              label: source.label,
              searchText
            },
            { log: false }
          ).then((logs) => {
            reportData[source.reportKey] = logs
          })
        })
        .then(() => {
          return cy.task('writeFailureReport', reportData)
        })
    })
  }

  if (stepLog.length > 0) {
    stepLog.forEach((step) => {
      pendingContext.push({
        title: 'Step',
        value: step
      })
    })

    stepLog = []
  }

  screenshotPathsThisTest.forEach((screenshotPath) => {
    cy.task(
      'readScreenshotAsBase64',
      screenshotPath,
      { log: false }
    ).then((base64) => {
      if (base64) {
        pendingContext.push({
          title: 'Screenshot',
          value: `data:image/png;base64,${base64}`
        })
      }
    })
  })

  screenshotPathsThisTest = []
  executedSteps = []

  debugContext = {
    frn: null,
    agreementNumber: null,
    contractNumber: null,
    invoiceNumber: null,
    scheme: null,
    paymentRequestId: null,
    sbi: null,
    vendor: null,
    trader: null
  }
})

Cypress.on('test:after:run', (test) => {
  pendingContext.forEach(({ title, value }) => {
    addContext({ test }, { title, value })
  })
  pendingContext = []
})

// ERROR LOGGING

Cypress.on('fail', (error, runnable) => {
  addContext({ test: runnable }, {
    title: 'Error',
    value: error.message
  })

  throw error
})

//route generation info for tracking coverage, only runs on dev for stability
Cypress.on('url:changed', (url) => {
  if (!env.includes('dev')) {
    return
  }

  try {
    const pathname = new URL(url).pathname

    // surround in try so route coverage can never break tests
    Cypress.backend?.('task', {
      task: 'recordRoute',
      arg: pathname
    }).catch(() => {})
  } catch (err) {
    console.error(err)
  }
})