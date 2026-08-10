import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import resetPaymentRequestPage from '../pages/resetPaymentRequestPage'

const { getEnvironmentConfig } = require('../../support/configLoader')
const envConfig = getEnvironmentConfig()
const env = envConfig.env


Then (/^on the Reset payment request page I confirm that "(.*)" is displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Reset payment request page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'page title':
    resetPaymentRequestPage.pageTitle().should('be.visible').haveWithoutWhitespace('Reset payment request'); break
  case 'page description':
    resetPaymentRequestPage.pageDescription().should('be.visible').containsWithoutWhitespace( 'Invoice number'); break
  case 'page instructions':
    resetPaymentRequestPage.pageInstructions().should('be.visible').containsWithoutWhitespace( 'For example S123456789012345V001'); break
  case 'invoice number field':
    resetPaymentRequestPage.invoiceNumberField().should('be.visible').and('have.attr', 'type', 'text'); break
  case 'reset button':
    resetPaymentRequestPage.resetButton().should('be.visible').and('have.attr', 'type', 'submit'); break
  case 'payment request does not exist error':
    resetPaymentRequestPage.errorTitle().should('be.visible').containsWithoutWhitespace( 'There is a problem')
    resetPaymentRequestPage.errorMessage().should('be.visible').containsWithoutWhitespace( 'Payment request', 'does not exist'); break
  case 'enter a valid invoice number error':
    resetPaymentRequestPage.errorTitle().should('be.visible').containsWithoutWhitespace( 'There is a problem')
    resetPaymentRequestPage.errorMessage().should('be.visible').containsWithoutWhitespace( 'Error: Enter an invoice number'); break
  case 'payment request successfully reset message':
    resetPaymentRequestPage.successTitle().should('be.visible').containsWithoutWhitespace( 'has been successfully reset and will be reprocessed by Payment Hub'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that' + element + 'is displayed on the Reset payment request page')
  cy.log('Confirmed that' + element + 'is displayed on the Reset payment request page')
})

Then (/^on the Reset payment request page I enter "(.*)" into the "(.*)" field$/, (text, field) => {

  Cypress.emit('log:step', 'on the Reset payment request page I enter ' + text + ' into the ' + field + ' field')

  switch (field) {
  case 'invoice number':
    resetPaymentRequestPage.invoiceNumberField().scrollIntoView().type(text); break
  default:
    throw new Error('invalid field name')
  }

  console.log(`Entered ${text} into the ${field} field on the Reset payment request page`)
  cy.log(`Entered ${text} into the ${field} field on the Reset payment request page`)
})

Then (/^on the Reset payment request page I use current invoice number in the invoice number field$/, () => {

  Cypress.emit('log:step', 'on the Reset payment request page I use current invoice number in the invoice number field')
  const currentInvoiceNumber = 'S2795919' + Cypress.env('nextContractNumber').toString() + 'V001'

  resetPaymentRequestPage.invoiceNumberField().scrollIntoView().type(currentInvoiceNumber)
})


Then (/^on the Reset payment request page I click the "(.*)"$/, (button) => {

  Cypress.emit('log:step', 'on the Reset payment request page I click the ' + button)

  switch (button) {
  case 'reset button': resetPaymentRequestPage.resetButton().scrollIntoView().click(); break
  default:
    throw new Error('invalid button name')
  }
  cy.log(`Clicked on the ${button} successfully`)
  console.log(`Clicked on the ${button} successfully`)
})

Then(
  /^I confirm that second completedPaymentRequest entry has been made in database for invoice number "(.*)"$/,
  (invoiceNumber) => {
    Cypress.emit(
      'log:step',
      `I confirm that second completedPaymentRequest entry has been made in database for invoice number ${invoiceNumber}`
    )

    if (invoiceNumber.includes('Current')) {
      invoiceNumber = `S2795919${Cypress.env('nextContractNumber')}V001`
    }

    const sqlStatement = `
      SELECT *
      FROM "completedPaymentRequests"
      WHERE "invoiceNumber" = '${invoiceNumber}'
    `

    const databaseName = 'ffc-pay-processing'

    const pollForSecondEntry = (attempt = 1, maxAttempts = 20) => {
      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {
          const data = result.rows

          cy.log(
            `Attempt ${attempt}: Found ${data.length} completedPaymentRequest entries for invoice number ${invoiceNumber}`
          )

          if (data.length >= 2) {
            cy.log(
              `Confirmed that second completedPaymentRequest entry has been made in database for invoice number ${invoiceNumber}`
            )
            return
          }

          if (attempt >= maxAttempts) {
            throw new Error(
              `Expected at least 2 completedPaymentRequest entries for invoice number ${invoiceNumber}, but found ${data.length}`
            )
          }

          cy.wait(5000)
          pollForSecondEntry(attempt + 1, maxAttempts)
        })
    }

    pollForSecondEntry()
  }
)