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

  const stringsToCheck = ['Receive all alerts for this scheme', 'Batch Rejected', 'Batch Quarantined', 'Payment Rejected', 'Payment Dax Rejected', 'Payment Invalid Bank', 'Payment Processing Failed', 'Payment Settlement Unsettled', 'Payment Settlement Unmatched', 'Response Rejected', 'Payment Request Blocked', 'Payment Dax Unavailable', 'Receiver Connection Failed', 'Demographics Processing Failed', 'Demographics Update Failed', 'Event Save Alert', 'Table Create Alert', 'Responses Processing Failed', 'Customer Update Processing Failed', 'Tracking Update Failure']

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

  const stringsToCheck = ['Receive all alerts for this scheme', 'Batch Rejected', 'Batch Quarantined', 'Payment Rejected', 'Payment Dax Rejected', 'Payment Invalid Bank', 'Payment Processing Failed', 'Payment Settlement Unsettled', 'Payment Settlement Unmatched', 'Response Rejected', 'Payment Request Blocked', 'Payment Dax Unavailable', 'Receiver Connection Failed', 'Demographics Processing Failed', 'Demographics Update Failed', 'Event Save Alert', 'Table Create Alert', 'Responses Processing Failed', 'Customer Update Processing Failed', 'Tracking Update Failure']

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

Then (/^on the Add new alert recipient page I select "(.*)" from Select Scheme dropdown$/, (option) => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I select ' + option + ' from Select Scheme dropdown')

  paymentAlertsPage.addNewSelectSchemeDropdown().select(option)
  console.log('Selected ' + option + ' from Select Scheme dropdown')
  cy.log('Selected ' + option + ' from Select Scheme dropdown')
})

Then (/^on the Add new alert recipient page I enter "(.*)" in the email field$/, (email) => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I enter ' + email + ' in the email field')

  paymentAlertsPage.addNewEmailField().scrollIntoView().type(email)
  console.log('Entered ' + email + ' into the email field')
  cy.log('Entered ' + email + ' into the email field')
})

Then (/^on the Add new alert recipient page I confirm that recipient "(.*)" has been added for each alert type$/, (email) => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I confirm that recipient ' + email + ' has been added for each alert type')

  //This step confirms that recipient has been added for all 19 alert types
  //The element locator is the same for each location aside from the nth-child integer at the beginning
  //Which increases by 2 for each entry

  for (let i=2; i<38; i+=2) {
    cy.get(':nth-child(' + i + ') > .govuk-table__body > .govuk-table__row > :nth-child(1)').should('be.visible').containsWithoutWhitespace( email)
  }
  console.log('confirmed that recipient ' + email + ' has been added for each alert type')
  cy.log('confirmed that recipient ' + email + ' has been added for each alert type')
})


When (/^on the Add New Alert Recipient page I click the "(.*)" button$/, (button) => {

  Cypress.emit('log:step', 'on the Add New Alert Recipient page I click the ' + button)
  switch (button) {
  case 'Add recipient':
    paymentAlertsPage.addNewRecipientButton().click(); break
  }
  cy.log(`Clicked on the ${button} button successfully`)
  console.log(`Clicked on the ${button} button successfully`)
})