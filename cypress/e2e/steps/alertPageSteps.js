import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import paymentAlertsPage from '../pages/paymentAlertsPage'




Then(/^on the Alerts page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step', `on the Alerts page I confirm that ${element} is displayed`)

  const verify = (method, texts) => {
    texts.forEach(text => {
      paymentAlertsPage[method](text)
        .should('be.visible')
    })
  }

  const schemeLabels = {
    'sfi22 label': 'SFI-22',
    'sfi pilot label': 'SFI-Pilot',
    'lump sums label': 'Lump Sum Payments',
    'vet visits label': 'Vet Visits',
    'countryside stewardship label': 'Countryside Stewardship',
    'basic payment scheme label': 'Basic Payment Scheme',
    'manual injection label': 'Manual Injection',
    'environmental stewardship label': 'Environmental Stewardship',
    'imps label': 'IMPS',
    'forestry commission label': 'Forestry Commission',
    'sfi23 label': 'SFI-23',
    'delinked payments label': 'Delinked Payments',
    'expanded sfi label': 'Expanded SFI Offer',
    'csht revenue label': 'Countryside Stewardship Higher Tier (Revenue)',
    'csht capital label': 'Countryside Stewardship Higher Tier (Capital)',
    'farm payments technical test label': 'Farm Payments Technical Test',
    'woodland management plan label': 'Woodland Management Plan'
  }

  const schemeButtons = {
    'sfi22 show button': 'SFI-22',
    'sfi pilot show button': 'SFI-Pilot',
    'lump sums show button': 'Lump Sum Payments',
    'vet visits show button': 'Vet Visits',
    'countryside stewardship show button': 'Countryside Stewardship',
    'basic payment scheme show button': 'Basic Payment Scheme',
    'manual injection show button': 'Manual Injection',
    'environmental stewardship show button': 'Environmental Stewardship',
    'imps show button': 'IMPS',
    'forestry commission show button': 'Forestry Commission',
    'sfi23 show button': 'SFI-23',
    'delinked payments show button': 'Delinked Payments',
    'expanded sfi show button': 'Expanded SFI Offer',
    'csht revenue show button': 'Countryside Stewardship Higher Tier (Revenue)',
    'csht capital show button': 'Countryside Stewardship Higher Tier (Capital)',
    'farm payments technical test show button': 'Farm Payments Technical Test',
    'woodland management plan show button': 'Woodland Management Plan'
  }

  if (schemeLabels[element]) {
    verify('schemeLabel', [schemeLabels[element]])
    return
  }

  if (schemeButtons[element]) {
    paymentAlertsPage.schemeShowButton(schemeButtons[element])
      .should('be.visible')
    return
  }

  switch (element) {
  case 'sub header':
    verify('heading', ['Manage alerts'])
    break

  case 'page description':
    verify('paragraph', ['This section allows users to see payment alerts that are in place for each scheme and'])
    break

  case 'find out more':
    verify('paragraph', ['Find out more about each alert type by visiting our alerts information page, or by clicking on any of the alert type names below.'])
    break

  case 'alerts information link':
    paymentAlertsPage.alertsInformationLink()
      .should('be.visible')
      .and('have.class', 'govuk-link')
    break

  case 'add new recipient button':
    paymentAlertsPage.addNewRecipientButton()
      .should('be.visible')
    break

  case 'show all sections button':
    paymentAlertsPage.showAllSectionsButton()
      .should('be.visible')
    break

  default:
    throw new Error(`Invalid element: ${element}`)
  }

  console.log(`Confirmed that ${element} is displayed on the Alerts page`)
  cy.log(`Confirmed that ${element} is displayed on the Alerts page`)
})

Then(/^on the Alerts page I click the "(.*)"$/, (element) => {
  Cypress.emit('log:step', `on the Alerts page I click the ${element}`)

  const schemeButtons = {
    'sfi22 show button': 'SFI-22',
    'sfi pilot show button': 'SFI-Pilot',
    'lump sums show button': 'Lump Sum Payments',
    'vet visits show button': 'Vet Visits',
    'countryside stewardship show button': 'Countryside Stewardship',
    'basic payment scheme show button': 'Basic Payment Scheme',
    'manual injection show button': 'Manual Injection',
    'environmental stewardship show button': 'Environmental Stewardship',
    'imps show button': 'IMPS',
    'forestry commission show button': 'Forestry Commission',
    'sfi23 show button': 'SFI-23',
    'delinked payments show button': 'Delinked Payments',
    'expanded sfi show button': 'Expanded SFI Offer',
    'csht revenue show button': 'Countryside Stewardship Higher Tier (Revenue)',
    'csht capital show button': 'Countryside Stewardship Higher Tier (Capital)',
    'farm payments technical test show button': 'Farm Payments Technical Test',
    'woodland management plan show button': 'Woodland Management Plan'
  }

  if (schemeButtons[element]) {
    paymentAlertsPage.schemeShowButton(schemeButtons[element])
      .scrollIntoView()
      .click()

    console.log(`Clicked ${element} on the Alerts page`)
    cy.log(`Clicked ${element} on the Alerts page`)
    return
  }

  switch (element) {
  case 'show all sections button':
    paymentAlertsPage.showAllSectionsButton()
      .scrollIntoView()
      .click()
    break

  case 'alerts information link':
    paymentAlertsPage.alertsInformationLink()
      .scrollIntoView()
      .click()
    break

  case 'add new alerts recipient button':
    paymentAlertsPage.addNewRecipientButton()
      .scrollIntoView()
      .click()
    break

  case 'sfi22 all alerts button':
    paymentAlertsPage.addNewSFI22All()
      .scrollIntoView()
      .click()
    break

  case 'sfi pilot all alerts button':
    paymentAlertsPage.addNewSFIPilotAll()
      .scrollIntoView()
      .click()
    break

  case 'create new alert recipient button':
    paymentAlertsPage.createNewAlertRecipientButton()
      .scrollIntoView()
      .click()
    break

  case 'edit button':
    paymentAlertsPage.editButton()
      .scrollIntoView()
      .click()
    break

  case 'remove email button':
    paymentAlertsPage.removeEmailButton()
      .scrollIntoView()
      .click()
    break

  default:
    throw new Error(`Invalid element: ${element}`)
  }

  console.log(`Clicked ${element} on the Alerts page`)
  cy.log(`Clicked ${element} on the Alerts page`)
})

Then (/^on the Alerts page I confirm that all schemes have successfully cascaded$/, () => {

  Cypress.emit('log:step', 'on the Alerts page I confirm that all schemes have successfully cascaded')

  cy.get('.govuk-accordion__section-toggle-text') .should($els => {
    // Convert to array and check each element's text
    const allAreHide = [...$els].every(el => el.textContent.trim() === 'Hide')
    expect(allAreHide).to.be.true
  })
})

Then(/^on the Add new alert recipient page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step',`on the Add new alert recipient page I confirm that ${element} is displayed`)

  const verify = (method, texts) => {
    texts.forEach(text => {
      paymentAlertsPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'sub header':
    verify('heading', ['Add new alert recipient'])
    break

  case 'email label':
    cy.contains('.govuk-label', 'Email address')
      .should('be.visible')
      .containsWithoutWhitespace('Email address')
    break

  case 'email field':
    paymentAlertsPage.addNewEmailField()
      .should('be.visible')
      .and('have.attr', 'type', 'text')
    break

  case 'select scheme label':
    cy.contains(
      '.govuk-label',
      'Select a scheme to view alerts for'
    )
      .should('be.visible')
      .containsWithoutWhitespace(
        'Select a scheme to view alerts for'
      )
    break

  case 'select scheme dropdown':
    paymentAlertsPage.addNewSelectSchemeDropdown()
      .should('be.visible')
      .and('have.class', 'govuk-select')
    break

  case 'invalid email error message':
    paymentAlertsPage.addNewInvalidEmailError()
      .should('be.visible')
      .containsWithoutWhitespace(
        'The email address is not allowed. Please contact the Payment & Document Services team if you believe this is a mistake.'
      )
    break

  default:
    throw new Error(`Invalid element: ${element}`)
  }

  console.log(
    `Confirmed that ${element} is displayed on the Add new alert recipient page`
  )

  cy.log(
    `Confirmed that ${element} is displayed on the Add new alert recipient page`
  )
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