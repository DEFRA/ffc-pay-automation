import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import downloadStatementsPage from '../pages/downloadStatementsPage'
const { getEnvironmentConfig } = require('../../support/configLoader')
const envConfig = getEnvironmentConfig()
const env = envConfig.env

console.log('Environment Config:', envConfig)


Then(/^on the Download Statements page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit(
    'log:step',
    `on the Download Statements page I confirm that ${element} is displayed`
  )

  const verify = (method, texts) => {
    texts.forEach(text => {
      downloadStatementsPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'page title':
    verify('heading', ['Download payment statements'])
    break

  case 'page description':
    verify('paragraph', ['Statements provide customers with payment details.'])
    break

  case 'page instructions':
    verify('label', ['Full filename'])
    break

  case 'instruction examples':
    verify('hint', ['Examples:', 'FFC_PaymentDelinkedStatement_DP_2024_1100021264_2025101508224868.pdf', 'FFC_PaymentSfi23QuarterlyStatement_DP_2024_1100021264_2025101508224868.pdf'])
    break

  case 'filename field':
    downloadStatementsPage.input('#filename')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
    break

  case 'individual criteria instructions':
    verify('paragraph', ['Or search by individual criteria:'])
    break

  case 'select scheme Delinked Radio':
    downloadStatementsPage.input('#schemeId-1')
      .should('exist')
    break

  case 'select scheme SFI Radio':
    downloadStatementsPage.input('#schemeId-2')
      .should('exist')
    break

  case 'marketing year label':
    verify('label', ['Marketing year'])
    break

  case 'marketing year field':
    downloadStatementsPage.input('#marketingYear')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
    break

  case 'frn label':
    verify('label', ['Firm reference number (FRN)'])
    break

  case 'frn search instructions':
    verify('hint', ['Enter a 10-digit FRN'])
    break

  case 'frn field':
    downloadStatementsPage.input('#frn')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
    break

  case 'timestamp label':
    verify('label', ['Timestamp'])
    break

  case 'timestamp search instructions':
    verify('hint', ['For example, 06-01-2026 18:00'])
    break

  case 'timestamp field':
    downloadStatementsPage.input('#timestamp')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
    break

  case 'search statements button':
    downloadStatementsPage.input('#report-submit')
      .should('be.visible')
      .and('have.class', 'govuk-button')
    break

  case 'clear button':
    downloadStatementsPage.button('Clear')
      .should('be.visible')
      .and('have.attr', 'type', 'button')
    break

  case 'statements sub header and number of results':
    verify('heading', ['Statements'])
    break

  case 'scheme column':
    verify('tableHeader', ['Scheme'])
    break

  case 'year column':
    verify('tableHeader', ['Year'])
    break

  case 'frn column':
    verify('tableHeader', ['FRN'])
    break

  case 'timestamp column':
    verify('tableHeader', ['Timestamp'])
    break

  case 'action column':
    verify('tableHeader', ['Action'])
    break

  case 'next button':
    if (!env.includes('local')) {
      downloadStatementsPage.paginationLink('Next')
        .should('be.visible')
    } else {
      downloadStatementsPage.paginationLink('Next')
        .should('not.exist')
    }
    break

  case 'previous button':
    downloadStatementsPage.paginationLink('Previous')
      .should('be.visible')
    break

  default:
    throw new Error(`Invalid element: ${element}`)
  }

  console.log(`Confirmed that ${element} is displayed on the Download Statements page`)
  cy.log(`Confirmed that ${element} is displayed on the Download Statements page`)
})



Then(/^on the Download Statements page I confirm that the text on "(.*)" reads "(.*)"$/, (element, expectedText) => {

  Cypress.emit('log:step', 'on the Download Statements page I confirm that the text on ' + element + ' reads ' + expectedText)
  let selectedElement

  switch (element) {
  case 'number of results':
    selectedElement = downloadStatementsPage.numberOfResults(); break
  default:
    throw new Error('invalid element')
  }

  selectedElement.should('be.visible').invoke('text').then((text) => {
    if (text.includes(expectedText)) {
      console.log(`Confirmed that the text on ${element} reads ${expectedText}`)
      cy.log(`Confirmed that the text on ${element} reads ${expectedText}`)
    } else {
      console.log(`The text on ${element} does not read ${expectedText}, actual value is ${text}`)
      cy.log(`The text on ${element} does not read ${expectedText}, actual value is ${text}`)
      throw new Error('Incorrect text')
    }
  })
})

Then(/^on the Download Statements page I confirm that statement can be downloaded$/, () => {

  Cypress.emit('log:step', 'on the Download Statements page I confirm that statement can be downloaded')
  cy.request('/download-statements/download/FFC_PaymentDelinkedStatement_DP_2025_1105607649_2025101415310344.pdf')
    .its('status') .should('eq', 200)
})


Then('on the Download Statements page I confirm that no statement results are displayed', () => {
  downloadStatementsPage.resultsTable()
    .should('not.exist')
})