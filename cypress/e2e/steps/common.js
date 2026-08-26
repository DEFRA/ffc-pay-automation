import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import paymentManagementPage from '../pages/paymentManagementPage'
import gdsGenericPage from '../pages/gdsGenericPage'
const { getEnvironmentConfig } = require('../../support/configLoader')

const envConfig = getEnvironmentConfig()
const env = envConfig.env
console.log('Environment Config:', envConfig)

// -------------------------
// HOMEPAGE VISIT
// -------------------------

Given('I visit the {string} homepage', (text) => {

  Cypress.emit('log:step', 'I visit the ' + text + ' homepage')

  cy.log(text)
  let url

  switch (text) {
  case 'Payment management':
    url = envConfig.paymentManagementUrl
    break
  case 'Request Editor':
    url = envConfig.requestEditorUrl
    break
  case 'Calculate your delinked payment':
    url = envConfig.paymentCalculatorUrl
    break
  }

  cy.log('URL to open ' + url)
  cy.visit(url)
  cy.wait(2000)
  cy.wrap(url).as('baseUrl')

  const envFilePath = 'cypress/fixtures/env.json'

  cy.task('readFileIfExists', envFilePath).then((existingData) => {
    const existingEnv = existingData ? existingData.env : null

    if (existingEnv !== env) {
      cy.task('writeFile', { filePath: envFilePath, data: { env } })
        .then(() => cy.log(`🔄 Environment changed: Writing new env (${env}) to fixture file`))
    } else {
      cy.log(`✅ Environment unchanged (${env}). No file update needed.`)
    }
  })
})

// -------------------------
// HOMEPAGE ASSERTION
// -------------------------

Given('I am on the {string} homepage', (text) => {

  Cypress.emit('log:step', 'I am on the ' + text + ' homepage')
  let url

  switch (text) {
  case 'Payment management':
    url = envConfig.paymentManagementUrl
    break
  case 'Request Editor':
    url = envConfig.requestEditorUrl
    break
  }

  cy.url().should('eq', url)
  paymentManagementPage.header().should('be.visible').and('have.text', text)
})

// -------------------------
// BUTTON CLICKS
// -------------------------
When('I click on the {string} button', (text) => {

  Cypress.emit('log:step', 'I click on the ' + text + ' button')
  cy.get('button').contains(text).first().scrollIntoView().click()
  if (text === 'Submit' || text === 'Filter') {
    cy.wait(10000)
  }
})

When('I click on {string}', (text) => {

  Cypress.emit('log:step', 'I click on ' + text)
  cy.contains(text).scrollIntoView().click()
})

When('I click on the {string} radio button', (option) => {
  cy.contains('.govuk-radios__item', option)
    .find('input[type="radio"]')
    .check({ force: true })
  Cypress.emit(`Clicked on the  ${option} button`)

})


// -------------------------
// ASSERTIONS -
// -------------------------

Then('I should see {string}', (text) => {

  Cypress.emit('log:step', 'I should see ' + text)
  cy.contains(text)
})

//generic success message assertion
Then('I see a success message for {string}', (successMessage) => {
  cy.assertSuccessBanner(successMessage)
})


//generic error message assertion
Then('I see an error message for {string}', (errorMessage) => {
  cy.assertErrorBanner(errorMessage)
})

Then(
  /^I should see the (heading|paragraph|hint|link|list item|button|strong text|details summary|warning text|verify text|label|accordion text|inset text) "(.*)"$/,
  (type, text) => {
    const elementMap = {
      heading: 'heading',
      paragraph: 'paragraph',
      hint: 'hint',
      link: 'link',
      'list item': 'listItem',
      button: 'button',
      'strong text': 'strong',
      'details summary': 'detailsSummary',
      'warning text': 'warningText',
      'verify text': 'verifyText',
      label: 'label',
      'accordion text': 'accordionText',
      'inset text' : 'insetText'
    }

    gdsGenericPage[elementMap[type]](text)
  }
)

When(/^I select the scheme "(.*)"$/, (scheme) => {
  gdsGenericPage.schemeDropdown()
    .select(scheme)
})


Then(/^I should see scheme "(.*)" in the scheme dropdown$/, (scheme) => {
  gdsGenericPage.schemeOption(scheme)
    .should('exist')
})


// -------------------------
//  PAGINATION - assertions and clicks
// -------------------------

//Verifies it exists
Then(/^I verify the pagination "(next|previous)" is visible$/, (direction) => {
  const selector = direction === 'next'
    ? '.govuk-pagination__next > .govuk-link'
    : '.govuk-pagination__prev > .govuk-link'

  cy.get(selector)
    .should('be.visible')
})

//Verifies it does not exist
Then(/^I verify the pagination "(next|previous)" is not visible$/, (direction) => {
  const selector = direction === 'next'
    ? '.govuk-pagination__next > .govuk-link'
    : '.govuk-pagination__prev > .govuk-link'

  cy.get(selector)
    .should('not.exist')
})
//clicks next or previous pagination buttons
When(/^I click the pagination "(next|previous)"$/, (direction) => {
  const selector = direction === 'next'
    ? '.govuk-pagination__next > .govuk-link'
    : '.govuk-pagination__prev > .govuk-link'

  cy.get(selector)
    .should('be.visible')
    .click()
})
// returns the current page we are on
Then(/^the current pagination page number is "(.*)"$/, (pageNumber) => {
  cy.get('.govuk-pagination__item--current > .govuk-link')
    .invoke('text')
    .then(text => {
      expect(text.trim()).to.equal(pageNumber)
    })
})

//finds the highest number inside the pagination list and clicks it, this way it works for 1 or 1000 pages
Then(/^I go to the last page of pagination results$/, () => {
  cy.get('.govuk-pagination__list .govuk-link').then(($links) => {
    cy.contains(
      '.govuk-pagination__list .govuk-link',
      Math.max(
        ...[...$links]
          .map(l => parseInt(l.innerText, 10))
          .filter(n => !Number.isNaN(n))
      ).toString()
    ).click()
  })
})
//selects one of the 25000 | 2000 | 1000 eg links visible on pages with tables, for filtering number of records per page
When('I select {int} records per page pagination link', (number) => {
  Cypress.emit('log:step', `on the Payment Holds Page I select ${number} records per page`)
  cy.contains('a', new RegExp(`^${number}$`))
    .scrollIntoView()
    .click()
})


// -------------------------
// FORM/FIELD ENTRIES
// -------------------------

//enters X into Y field. View gdsGenericPage to see currently supported forms and add new ones if they are generic
//also has capability for random FRN generation. simply pass in "random frn" and it will generate you one.
// if you want to use the random FRN in the same run, pass in 'saved random frn'
// if it's using the random frn input, it saves it as randomFRN to be used in other assertions
const generators = {
  'random frn': () =>
    `10${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`
}

When(/^I enter "(.*)" into the "(.*)" field$/, (value, field) => {
  const generator = generators[value.toLowerCase()]

  const actualValue = generator
    ? generator()
    : value

  if (value.toLowerCase() === 'random frn') {
    cy.wrap(actualValue).as('randomFrn')
  } else if (value.toLowerCase() === 'saved random frn') {

    cy.get('@randomFrn').then((frn) => {

      gdsGenericPage.field(field.toLowerCase())

        .clear()

        .type(frn)

    })

    return

  }

  gdsGenericPage.field(field.toLowerCase())
    .clear()
    .type(actualValue)
})

Then(/^I should see the field "(.*)"$/, (field) => {
  gdsGenericPage.field(field)
    .should('be.visible')
})


// -------------------------
// LINK CLICKS
// -------------------------



When('I click on the {string} link', (text) => {
  Cypress.emit('log:step', 'I click on the ' + text + ' link')

  if (['Enrich', 'Review'].includes(text)) {
    cy.log('Waiting for link to appear')

    const start = Date.now()

    const findLink = () => {
      cy.get('body').then(($body) => {
        if ($body.find(`a:contains("${text}")`).length) {
          return
        }

        if (Date.now() - start > 240000) {
          throw new Error(`Timed out waiting for ${text} link`)
        }

        cy.wait(5000)
        cy.reload()
        findLink()
      })
    }

    findLink()
  }

  cy.contains('a', text)
    .scrollIntoView()
    .click()

  cy.wait(1000)
  console.log(`Clicked on the ${text} link`)
  cy.log(`Clicked on the ${text} link`)
})


When('I click the {string} breadcrumb', (breadcrumbText) => {
  cy.clickBreadcrumb(breadcrumbText)
})

When(/^I click the accordion link "(.*)"$/, (text) => {
  gdsGenericPage.accordionLink(text)
    .click()
})

When(/^I expand the accordion section "(.*)"$/, (section) => {
  gdsGenericPage.accordionSection(section)
    .click()
})


// -------------------------
// ACCESSIBILITY
// -------------------------

Then('I confirm there are no accessibility issues on the page', () => {

  Cypress.emit('log:step', 'I confirm there are no accessibility issues on the page')

  cy.injectAxe()
  cy.checkA11y(null, {
    runOnly: {
      type: 'tag',
      values: ['wcag22aa']
    }
  }, (violations) => {
    violations.forEach(({ id, impact, description, help, helpUrl, nodes }) => {
      cy.log(`Violation ID: ${id}`)
      cy.log(`Impact: ${impact}`)
      cy.log(`Description: ${description}`)
      cy.log(`Help: ${help}`)
      cy.log(`More info: ${helpUrl}`)
      cy.log('Affected nodes:')

      nodes.forEach(({ html, target }) => {
        cy.log(`  - HTML: ${html}`)
        cy.log(`    Target: ${target.join(', ')}`)
      })
    })
  })
  cy.log('No accessibility violations found')
  console.log('No accessibility violations found')
})

Then('I wait for {int} milliseconds', (time) => {
  cy.wait(time)
})
// -------------------------
// EXTERNAL LINK STATUS
// -------------------------

When('I verify status of external link - {string}', (text) => {

  Cypress.emit('log:step', 'I verify status of external link - ' + text)
  let pageUrl = ''

  switch (text) {
  case 'Rural Payments service.':
    pageUrl = 'https://www.ruralpayments.service.gov.uk/customer-account/login'
    break
  }

  cy.log('Verifying status of external link:', pageUrl)

  cy.request(pageUrl).then((response) => {
    expect(response.status).to.eq(200)
  })
})

// -------------------------
// DOWNLOAD LINKS
// -------------------------

When('I click on the {string} download link', (text) => {

  Cypress.emit('log:step', 'I click on the ' + text + ' download link')
  if (text === 'Request Editor report') {
    cy.contains(text).click()
  } else {
    cy.get('a')
      .contains(text)
      .scrollIntoView()
      .then((el) => {
        el.attr('download', '')
      })
      .click()
  }
})


// -------------------------
// FILE UPLOAD
// -------------------------


When('I upload {string} file', (file) => {

  Cypress.emit('log:step', 'I upload ' + file + ' file')
  gdsGenericPage.fileInput().selectFile(`cypress/fixtures/${file}`, {force : true})
})


// generic screenshot helper - grabs the spec name - by default it uses the spec name and scenario name
//timeout 60k instead of 30k because 30k fails on big big pages
//conversation can probably be had about whether we change the way we screenshot big pages
Then('I take a screenshot', () => {
  cy.screenshot({timeout : 60000})
})

//specific screenshot helper with name input, see scenario 01 for usage
Then('I take a screenshot for {string}', (name) => {
  cy.screenshot(`${Cypress.spec.name} -- ${name}`)
})

Then('I confirm that I am on the {string} homepage', (service) => {

  Cypress.emit('log:step', 'I confirm that I am on the ' + service + ' homepage')
  let url

  switch (service) {
  case 'payment management':
    url = envConfig.paymentManagementUrl
    break
  case 'request editor':
    url = envConfig.requestEditorUrl
    break
  case 'payment calculator':
    url = envConfig.paymentCalculatorUrl
    break
  case 'reset payment request':
    url = envConfig.paymentManagementUrl + 'payment-request/reset'
    break
  default:
    throw new Error(`Unknown service: ${service}`)
  }

  cy.url().should('eq', url)
  console.log(`Confirmed that I am on the ${service} homepage with URL: ${url}`)
  cy.log(`Confirmed that I am on the ${service} homepage with URL: ${url}`)
})

Then('I confirm that {string} error message has been generated', (error) => {

  Cypress.emit('log:step', 'I confirm that ' + error + ' error message has been generated')
  let databaseName
  let expectedError

  switch (error) {
  case 'invoice lines do not match':
    databaseName = 'ffc-pay-enrichment-ffc-pay-enrichment-1'
    expectedError = 'Payment request is invalid. Invoice line values (10000000) do not match header (-10000012)'
    break
  }

  cy.task('getDockerLogs', databaseName).then((logs) => {
    cy.log(logs)
    if (logs.includes(expectedError)) {
      console.log(`✅ Error "${expectedError}" has been generated`)
      cy.log(`✅ Error "${expectedError}" has been generated`)
    } else {
      throw new Error(`Error "${expectedError}" has not been generated`)
    }
  })
})