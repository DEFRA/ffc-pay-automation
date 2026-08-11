import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import paymentEventMonitoringPage from '../pages/paymentEventMonitoringPage'


Then(/^on the View events page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step',`on the View events page I confirm that ${element} is displayed`)

  const verify = (method, texts) => {
    texts.forEach(text => {
      paymentEventMonitoringPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'sub header':
    verify('heading', ['View payment events'])
    break

  case 'frn search instructions':
    verify('paragraph', ['Search and view payment events and activity by Firm Reference Number (FRN) or batch payment file name.'])
    break

  case 'frn search field':
    paymentEventMonitoringPage.searchField('frn')
      .should('be.visible')
      .and('have.attr', 'type', 'search')
    break

  case 'frn search button':
    paymentEventMonitoringPage.searchButton('frn')
      .should('be.visible')
      .and('have.attr', 'type', 'submit')
    break

  case 'batch search field':
    paymentEventMonitoringPage.searchField('batch')
      .should('be.visible')
      .and('have.attr', 'type', 'search')
    break

  case 'batch search button':
    paymentEventMonitoringPage.searchButton('batch')
      .should('be.visible')
      .and('have.attr', 'type', 'submit')
    break

  case 'frn searched label':
    verify('heading', ['1258445148'])
    break

  case 'scheme column':
    verify('tableHeader', ['Scheme'])
    break

  case 'agreement column':
    verify('tableHeader', ['Agreement'])
    break

  case 'payment request column':
    verify('tableHeader', ['Payment request'])
    break

  case 'value column':
    verify('tableHeader', ['Value'])
    break

  case 'status column':
    verify('tableHeader', ['Status'])
    break

  case 'last updated column':
    verify('tableHeader', ['Last updated'])
    break

  case 'view frn label':
    verify('heading', ['1000000001 - 00000001'])
    break

  case 'view batch label':
    verify('heading', ['SITISFIA0001_AP_20230810085609205.dat'])
    break

  case 'activity column':
    verify('tableHeader', ['Activity'])
    break

  case 'batch sub header':
    verify('heading', ['View batch file payments and their status'])
    break

  case 'batch frn column':
    verify('tableHeader', ['FRN'])
    break

  case 'batch year column':
    verify('tableHeader', ['Year'])
    break

  case 'batch agreement column':
    verify('tableHeader', ['Agreement'])
    break

  case 'batch request column':
    verify('tableHeader', ['Request'])
    break

  case 'batch value column':
    verify('tableHeader', ['Value'])
    break

  case 'batch status column':
    verify('tableHeader', ['Status'])
    break

  case 'batch actions column':
    verify('tableHeader', ['Activity'])
    break

  case 'frn payment history':
    verify('heading', ['FRN payment history'])
    break

  case 'frn payment request history':
    verify('heading', ['FRN payment request history'])
    break

  default:
    throw new Error(`Invalid element: ${element}`)
  }

  console.log(`Confirmed that ${element} is displayed on the View events page`)
  cy.log(`Confirmed that ${element} is displayed on the View events page`)
})

Then(/^on the View processed payment requests page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step',`on the View processed payment requests page I confirm that ${element} is displayed`)

  const verify = (method, texts) => {
    texts.forEach(text => {
      paymentEventMonitoringPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'sub header':
    verify('heading', ['View payment events by scheme'])
    break

  case 'select scheme label':
    verify('paragraph', ['Select a scheme to view how many payments have been made and the combined value.'])
    break

  case 'select scheme dropdown':
    paymentEventMonitoringPage.selectSchemeDropdown()
      .should('be.visible')
      .and('have.class', 'govuk-select')
    break

  case 'select scheme button':
    paymentEventMonitoringPage.selectSchemeButton()
      .should('be.visible')
      .and('have.attr', 'type', 'submit')
    break

  case 'processed payment requests label':
    verify('tableCaption', ['Scheme payment event details'])
    break

  case 'scheme column':
    verify('tableHeader', ['Scheme'])
    break

  case 'number of payments column':
    verify('tableHeader', ['Number of payments'])
    break

  case 'value column':
    verify('tableHeader', ['Value'])
    break

  default:
    throw new Error(`Invalid element: ${element}`)
  }

  console.log(`Confirmed that ${element} is displayed on the View processed payment requests page`)
  cy.log(`Confirmed that ${element} is displayed on the View processed payment requests page`)
})


Then(/^on the View processed payment requests page I select "(.*)" in scheme dropdown$/, (selection) => {
  Cypress.emit('log:step',`on the View processed payment requests page I select ${selection} in scheme dropdown`)

  paymentEventMonitoringPage.selectSchemeDropdown()
    .select(selection)

  console.log(`Selected ${selection} in Scheme dropdown`)
  cy.log(`Selected ${selection} in Scheme dropdown`)
})

Then(/^on the View events page I enter "(.*)" into the "(.*)" field$/, (value, field) => {
  Cypress.emit('log:step',`on the View events page I enter ${value} into the ${field} field`)

  switch (field) {
  case 'frn':
    paymentEventMonitoringPage.searchField('frn')
      .scrollIntoView()
      .clear()
      .type(value)
    break

  case 'batch':
    paymentEventMonitoringPage.searchField('batch')
      .scrollIntoView()
      .clear()
      .type(value)
    break

  default:
    throw new Error(`Invalid field name: ${field}`)
  }

  console.log(`Entered ${value} into the ${field} field on the View events page`)
  cy.log(`Entered ${value} into the ${field} field on the View events page`)
})

Then(/^on the View events page I click the "(.*)"$/, (button) => {
  Cypress.emit('log:step',`on the View events page I click the ${button}`)

  switch (button) {
  case 'frn search button':
    paymentEventMonitoringPage.searchButton('frn')
      .scrollIntoView()
      .click()
    break

  case 'batch search button':
    paymentEventMonitoringPage.searchButton('batch')
      .scrollIntoView()
      .click()
    break

  case 'view link':
    paymentEventMonitoringPage.viewLink()
      .scrollIntoView()
      .click()
    break

  default:
    throw new Error(`Invalid button name: ${button}`)
  }

  cy.log(`Clicked on the ${button} successfully`)
  console.log(`Clicked on the ${button} successfully`)
})

Then(/^on the View events page I confirm that rows are ordered correctly by payment request$/, () => {
  Cypress.emit('log:step','on the View events page I confirm that rows are ordered correctly by payment request')

  paymentEventMonitoringPage.paymentRequestCell(1)
    .should('be.visible')
    .containsWithoutWhitespace('1')

  paymentEventMonitoringPage.paymentRequestCell(2)
    .should('be.visible')
    .containsWithoutWhitespace('2')

  console.log('Confirmed that rows are ordered correctly by payment request')
  cy.log('Confirmed that rows are ordered correctly by payment request')
})

Then(
  /^on the View events page I confirm that "(.*)" of entry number "(.*)" in table is "(.*)"$/,
  (columnName, rowNumber, expectedValue) => {
    Cypress.emit('log:step',`on the View events page I confirm that ${columnName} of entry number ${rowNumber} in table is ${expectedValue}`)

    const columnMap = {
      scheme: 1,
      agreement: 2,
      'payment request': 3,
      value: 4,
      status: 5,
      'last updated': 6
    }

    if (!columnMap[columnName]) {
      throw new Error(`Invalid column name: ${columnName}`)
    }

    if (columnName === 'last updated') {
      const today = new Date()
      const day = String(today.getDate()).padStart(2, '0')
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const year = today.getFullYear()

      expectedValue = `${day}/${month}/${year}`

      console.log(expectedValue)
      cy.log(expectedValue)
    }

    paymentEventMonitoringPage.tableCell(rowNumber, columnMap[columnName])
      .should('be.visible')
      .containsWithoutWhitespace(expectedValue)

    console.log(`Confirmed value of table entry ${rowNumber} is ${expectedValue}`)
    cy.log(`Confirmed value of table entry ${rowNumber} is ${expectedValue}`)
  }
)



Then('I store the number of payments and total value of payments for the current scheme', () => {

  Cypress.emit('log:step', 'I store the number of payments and total value of payments for the current scheme')

  paymentEventMonitoringPage
    .processedRequestsNumberOf()
    .invoke('text')
    .then(text => text.trim())
    .as('numberOfPayments')

  paymentEventMonitoringPage
    .processedRequestsValue()
    .invoke('text')
    .then(text => text.trim())
    .as('totalValueOfPayments')

})

Then(
  'I confirm that number of payments has increased by {int} and total value of payments has increased by {string}',
  function (paymentIncrease, valueIncrease) {
    Cypress.emit(
      'log:step', `I confirm that number of payments has increased by "${paymentIncrease}" and total value of payments has increased by "${valueIncrease}"`)

    const previousCount = parseInt(this.numberOfPayments)
    const previousValue = parseFloat(
      this.totalValueOfPayments.replace(/[^0-9.-]+/g, '')
    )

    const expectedCount = previousCount + paymentIncrease
    const expectedValue =
      previousValue +
      parseFloat(valueIncrease.replace(/[^0-9.-]+/g, ''))

    const verifyPayments = (attempt = 1) => {
      paymentEventMonitoringPage
        .processedRequestsNumberOf()
        .invoke('text')
        .then(countText => {
          const actualCount = parseInt(countText)

          paymentEventMonitoringPage
            .processedRequestsValue()
            .invoke('text')
            .then(valueText => {
              const actualValue = parseFloat(
                valueText.replace(/[^0-9.-]+/g, '')
              )

              const expectedRounded = parseFloat(expectedValue.toFixed(2))
              const actualRounded = parseFloat(actualValue.toFixed(2))

              if (
                actualCount === expectedCount &&
                actualRounded === expectedRounded
              ) {
                cy.log('Expected payment values found')
                return
              }

              if (attempt >= 20) {
                throw new Error(
                  `Expected count ${expectedCount} and value ${expectedRounded}, but found count ${actualCount} and value ${actualRounded}`
                )
              }

              cy.log(
                `Attempt ${attempt}/20 failed. Refreshing page and retrying...`
              )

              cy.wait(15000)
              cy.reload()

              verifyPayments(attempt + 1)
            })
        })
    }

    verifyPayments()
  }
)

Then(/^I select "(.*)" from the monitor schemes dropdown$/, (scheme) => {

  Cypress.emit('log:step', 'I select ' + scheme + ' from the monitor schemes dropdown')
  paymentEventMonitoringPage.selectSchemeDropdown().scrollIntoView().select(scheme)
  cy.log(`Selected ${scheme} from the monitor schemes dropdown`)
  console.log(`Selected ${scheme} from the monitor schemes dropdown`)
})


Then(/^on the Processed Payment Requests page I confirm that entry is present for "(.*)" scheme with "(.*)" payments and a value of "(.*)"$/, (scheme, payments, value) => {

  Cypress.emit('log:step', 'on the Processed Payment Requests page I confirm that entry is present for ' + scheme + ' scheme with ' + payments + ' payments and a value of ' + value)
  cy.wait(2000) // Waiting for data load
  cy.contains(scheme).should('be.visible')
  cy.contains(payments).should('be.visible')
  cy.contains(value).should('be.visible')
})