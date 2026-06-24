import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import paymentHoldsPage from '../pages/paymentHoldsPage'
import moment from 'moment'
import { schemeAndHolds } from '../../support/data/paymentHolds.data.js'

When('I upload bulk payment holds file {string}', (file) => {

  Cypress.emit('log:step', 'I upload bulk payment holds file ' + file)
  const fixturePath = `cypress/fixtures/${file}`

  paymentHoldsPage.fileInput().selectFile(fixturePath)
})


When('I click the Create bulk payment holds button', () => {

  Cypress.emit('log:step', 'I click the Create bulk payment holds button')
  paymentHoldsPage.btnSubmit().click()
})

Then('the new holds in {string} are visible along with the correct timestamp', (file) => {

  Cypress.emit('log:step', 'the new holds in ' + file + ' are visible along with the correct timestamp')
  cy.fixture(file).then((csvData) => {
    const frnValues = csvData.split(',')
    const today = moment().format('DD/MM/YYYY') // Get today's date once

    frnValues.forEach((frnValue) => {
      paymentHoldsPage.frnSearchField().clear().type(frnValue)
      paymentHoldsPage.frnSearchButton().click()

      // Wait for a reasonable amount of time for the table to load
      cy.wait(2000) // Adjust time as necessary based on your application

      // Check for all rows containing the FRN
      cy.get('tbody.govuk-table__body').each((row) => {
        // Log the row content for debugging
        cy.wrap(row).invoke('text').then((rowText) => {
          cy.log(`Row content: ${rowText}`)
        })

        // Check if the row contains the FRN
        cy.wrap(row).contains('td', frnValue).then((td) => {
          if (td.length > 0) {
            // If the FRN is found in this row, check for today's date
            cy.wrap(row).contains('td', today).should('exist').then(() => {
              cy.log(`Found date: ${today} for FRN: ${frnValue} in row:`, row)
            })
          }
        })
      })

      cy.get('a').contains('Manage payment holds').scrollIntoView().click()
      cy.get('a').contains('Search for a payment hold').scrollIntoView().click()
    })
  })
})

Then('the {string} error message is displayed on the Payment holds page', (errMsg) => {

  Cypress.emit('log:step', 'the ' + errMsg + ' error message is displayed on the Payment holds page')
  paymentHoldsPage
    .errorSummaryTitle()
    .should('be.visible')
    .and('contain.text', 'There is a problem')
  paymentHoldsPage
    .errorMessage()
    .should('be.visible')
    .and('contain.text', errMsg)
})

Then('the {string} error message is displayed on the Bulk upload page', (errMsg) => {

  Cypress.emit('log:step', 'the ' + errMsg + ' error message is displayed on the Bulk upload page')
  paymentHoldsPage
    .bulkUploadErrorSummaryTitle()
    .should('be.visible')
    .and('contain.text', 'There is a problem')
  paymentHoldsPage
    .bulkUploadErrorMessage()
    .should('be.visible')
    .and('contain.text', errMsg)
})

When('the user selects to {string} holds', (option) => {

  Cypress.emit('log:step', 'the user selects to ' + option + ' holds')
  paymentHoldsPage.sltAddRemoveHolds().select(option)
})

When('on the Payment Holds page I enter the newly generated FRN in the search field', () => {

  Cypress.emit('log:step', 'on the Payment Holds page I enter the newly generated FRN in the search field')
  const updatedFRN = Cypress.env('updatedMessageBody').frn
  paymentHoldsPage.frnSearchField().type(updatedFRN)
})

When('on the Payment Holds page I enter {string} in the FRN search field', (frn) => {

  Cypress.emit('log:step', 'on the Payment Holds page I enter ' + frn + ' in the FRN search field')

  if (frn.includes('current FRN')) {

    let env = 'dev'
    let sqlStatement = `SELECT
  MAX(CASE WHEN "frn"::text ~ '^[0-9]' THEN "frn" END) AS max_frn
  FROM "paymentRequests"`
    let databaseName = 'ffc-pay-processing'

    cy.task('databaseQuery', { env, databaseName, sqlStatement })
      .then((result) => {

        const row = result.rows?.[0]

        if (!row) {
          throw new Error('No rows returned from database query')
        }

        const {
          max_frn,
        } = row

        cy.log(max_frn)


        console.log('Max FRN:', max_frn)
        paymentHoldsPage.frnSearchField().type(max_frn)
      })

  } else {
    paymentHoldsPage.frnSearchField().type(frn)
  }
})

Then('on the Payment Holds page I click the FRN search button', () => {

  Cypress.emit('log:step', 'on the Payment Holds page I click the FRN search button')
  paymentHoldsPage.frnSearchButton().click()
})

Then('on the Payment Holds page I confirm that scheme filter box is visible', () => {

  Cypress.emit('log:step', 'on the Payment Holds page I confirm that scheme filter box is visible')
  paymentHoldsPage.schemeFilterBox().should('be.visible')
})

Then('on the Payment Holds page I enter {string} in the scheme filter box', (scheme) => {

  Cypress.emit('log:step', 'on the Payment Holds page I enter ' + scheme + ' in the scheme filter box')
  paymentHoldsPage.schemeFilterBox().select(scheme)
})

Then('on the Payment Holds page I enter {string} hold for scheme {string}', (holds, scheme) => {

  Cypress.emit('log:step', 'on the Payment Holds page I enter ' + holds + ' in the scheme filter box')
  paymentHoldsPage.holdsFilterBox()
    .find(`option[data-scheme-name="${scheme}"]:not([hidden])`)
    .then($o => cy.get('#selectHoldCategoryId')
      .select($o.val()))


})

// Check all holds match respectively for all schemes. loops through all the schemes and holds inside paymentholds.data.js

Then('on the Payment Holds page all schemes have correct holds', () => {

  cy.wrap(Object.entries(schemeAndHolds)).each(([scheme, expectedOptions]) => {

    cy.log(`Validating scheme: ${scheme}`)

    paymentHoldsPage.schemeFilterBox().select(scheme)

    cy.get('#selectHoldCategoryId')
      .find(`option[data-scheme-name="${scheme}"]:not([hidden])`)
      .then($options => {
        const actual = [...$options].map(o => o.textContent.trim())

        expect(actual, `Mismatch for ${scheme}`)
          .to.have.members(expectedOptions)
      })

  })

})


Then('the payment requests related to the {string} CSV are not in the table', (file) => {

  Cypress.emit('log:step', 'the payment requests related to the ' + file + ' CSV are not in the table')

  cy.fixture(file).then((csvData) => {
    const frnValues = csvData
      .trim()
      .split(/\r?\n/)
      .map((line) => line.split(',')[0].trim())


    frnValues.forEach((frnValue) => {
      paymentHoldsPage.frnSearchField().clear().type(frnValue)
      paymentHoldsPage.frnSearchButton().click()

      cy.get('body').then(($body) => {
        if ($body.text().includes('No payment holds found for FRN ' + frnValue)) {
          cy.log('Confirmed that ' + frnValue + ' is not present in the table')
        } else {
          throw new Error('Holds for ' + frnValue + ' were found in table')
        }
      })
    })
  })
})