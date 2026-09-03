const { spawn } = require('child_process')

const env = process.argv[2]

if (!env) {
  throw new Error('No environment supplied')
}

//assign the split of scenarios you want here
const workers = [{
  name: 'A',
  specs: ['01_PaymentManagement.feature', '02_RequestEditor.feature', '07_PaginationRequestEditor.feature', '09_PaginationPaymentManagement.feature', '41_ResetPaymentRequest.feature']
}, {
  name: 'B',
  specs: ['04_UploadPaymentHolds.feature', '05_RemovePaymentHolds.feature', '13_PaymentHolds.feature', '31_NotifyAPI.feature', '42_PaymentEventMonitoring.feature']
}, {
  name: 'C',
  specs: ['20_AccessibilityTesting.feature', '40_DownloadStatements.feature','43_PaymentAlerts.feature', '45_DocumentAlerts.feature']
}, {
  name: 'D',
  specs: ['03_AgreementClosures.feature', '08_QualityCheck.feature', '10_Reports.feature', '38_MetricsDashboard.feature', '41_ResetPaymentRequest.feature', '42_PaymentEventMonitoring.feature']
}, {
  //these have to be run all in one session sequentially because the validation does not work at the minute when multiple are running at the same time
  name: 'Payments-All',
  specs: ['06_PaymentsE2EJourney.feature','11_PPAE2EJourneyCredit.feature','12_PPAE2EJourneyDebit.feature','14_DocE2EJourney.feature','15_ManualPayments.feature', '16_GLOSPayments.feature', '18_IMPSPayments.feature','19_GENESISPayments.feature','21_DPSPayments.feature', '22_CSHigherTierRevenuePayments.feature', '23_CSHigherTierCapitalPayments.feature', '24_VetVisitsPayments.feature','25_CSPayments.feature', '26_BPSPayments.feature','27_LumpSumsPayments.feature', '28_SFIExpandedPayments.feature','29_DelinkedPayments.feature', '30_SFIPilotPayments.feature', '32_SFI23Payments.feature', '33_SFI22Payments.feature','34_PPATopUpScenarios.feature','35_PPAReductionScenarios.feature','36_PPARecoveryScenarios.feature','37_D365Rejection.feature','39_MessagingBulkProcessing.feature','44_FarmPaymentsTechnicalTest.feature','46_WMPPayments.feature']
}]

function runWorker (worker) {
  const specList = worker.specs
    .map(spec => `cypress/e2e/features/${spec}`)
    .join(',')

  console.log(`\n Starting ${worker.name}`)
  console.log(` ${specList}\n`)

  return new Promise((resolve, reject) => {
    const process = spawn(
      'npx',
      ['cypress', 'run', '--browser', 'chrome', '--env', `env=${env},TAGS=@${env}`, '--spec', specList],
      {
        shell: true,
        stdio: 'inherit'
      }
    )

    process.on('close', (code) => {
      if (code === 0) {
        console.log(` ${worker.name} passed`)
        resolve()
      } else {
        reject(new Error(`${worker.name} failed with exit code ${code}`))
      }
    })
  })
}

async function run () {
  console.log('\n======================================')
  console.log('Running Cypress in parallel')
  console.log(`Environment: ${env}`)
  console.log(`Workers: ${workers.length}`)
  console.log('======================================\n')

  try {
    await Promise.all(workers.map(runWorker))

    console.log('\n All workers completed successfully')
    process.exit(0)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

run()