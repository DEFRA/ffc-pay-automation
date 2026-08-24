import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import paymentAlertsPage from '../pages/paymentAlertsPage'


Then (/^on the Alerts page I confirm that all schemes have successfully cascaded$/, () => {

  Cypress.emit('log:step', 'on the Alerts page I confirm that all schemes have successfully cascaded')

  cy.get('.govuk-accordion__section-toggle-text') .should($els => {
    // Convert to array and check each element's text
    const allAreHide = [...$els].every(el => el.textContent.trim() === 'Hide')
    expect(allAreHide).to.be.true
  })
})


Then(/^on the Add new alert recipient page I confirm that all options are present when no filter selected$/, () => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I confirm that all options are present when no filter selected')

  const stringsToCheck = [ 'Batch Rejected', 'Batch Quarantined', 'Payment Rejected', 'Payment Dax Rejected', 'Payment Invalid Bank', 'Payment Processing Failed', 'Payment Settlement Unsettled', 'Payment Settlement Unmatched', 'Response Rejected', 'Payment Request Blocked', 'Payment Dax Unavailable', 'Receiver Connection Failed', 'Demographics Processing Failed', 'Demographics Update Failed', 'Event Save Alert', 'Table Create Alert', 'Responses Processing Failed', 'Customer Update Processing Failed', 'Tracking Update Failure']

  cy.document().then(doc => {
    const pageText = doc.body.innerText
    stringsToCheck.forEach(str => {
      const count = (pageText.match(new RegExp(str, 'g')) || []).length
      expect(count, `Occurrences of "${str}"`).to.eq(17)
    })
  })
  console.log('Confirmed that all options are present when no filter selected')
  cy.log('Confirmed that all options are present when no filter selected')
})

Then(/^on the Add new alert recipient page I confirm that only one set of options is displayed$/, () => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I confirm that only one set of options is displayed')

  const stringsToCheck = [ 'Batch Rejected', 'Batch Quarantined', 'Payment Rejected', 'Payment Dax Rejected', 'Payment Invalid Bank', 'Payment Processing Failed', 'Payment Settlement Unsettled', 'Payment Settlement Unmatched', 'Response Rejected', 'Payment Request Blocked', 'Payment Dax Unavailable', 'Receiver Connection Failed', 'Demographics Processing Failed', 'Demographics Update Failed', 'Event Save Alert', 'Table Create Alert', 'Responses Processing Failed', 'Customer Update Processing Failed', 'Tracking Update Failure']

  cy.document().then(doc => {
    const pageText = doc.body.innerText
    stringsToCheck.forEach(str => {
      const count = (pageText.match(new RegExp(str, 'g')) || []).length
      expect(count, `Occurrences of "${str}"`).to.eq(1)
    })
  })
  console.log('Confirmed that only one set of options is displayed when scheme filter is used')
  cy.log('Confirmed that only one set of options is displayed when scheme filter is used')
})


Then(/^the following alerts should be selected$/, (dataTable) => {

  dataTable.raw().forEach(([alert]) => {
    cy.contains('label', alert)
      .invoke('attr', 'for')
      .then(id => {
        cy.get(`#${id}`)
          .should('be.checked')
      })
  })
})