import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import metricsDashboardPage from '../pages/metricsDashboardPage'

Then (/^on the Metrics Dashboard page I confirm that "(.*)" is not displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Metrics Dashboard page I confirm that ' + element + ' is not displayed')
  switch (element) {
  case 'select year filter dropdown':
    metricsDashboardPage.selectYearFilterDropdown().should('not.be.visible'); break
  case 'select month filter dropdown':
    metricsDashboardPage.selectMonthFilterDropdown().should('not.be.visible'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that' + element + ' is not displayed on the Metrics Dashboard page')
  cy.log('Confirmed that' + element + ' is not displayed on the Metrics Dashboard page')
})


Then(/^on the Metrics Dashboard page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit(
    'log:step',
    `on the Metrics Dashboard page I confirm that ${element} is displayed`
  )

  const verify = (method, texts) => {
    texts.forEach(text => {
      metricsDashboardPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'page title':
    verify('heading', ['Metrics dashboard'])
    break

  case 'page description':
    verify('paragraph', ['This dashboard provides operational metrics for payments and documents. You can view payment and document metrics filtered by time period.'])
    break

  case 'time period filter dropdown':
    metricsDashboardPage.timePeriodFilterDropdown()
      .should('be.visible')
    break

  case 'time period filter button':
    verify('button', ['Apply filters'])
    break

  case 'payment metrics sub header':
    verify('heading', ['Payment Metrics'])
    break

  case 'payments panel':
    verify('panel', ['Payments'])
    break

  case 'payments count':
    metricsDashboardPage.panelValue('Payments')
      .should('be.visible')
    break

  case 'total value panel':
    verify('panel', ['Total Value'])
    break

  case 'total value amount':
    metricsDashboardPage.panelValue('Total Value')
      .should('be.visible')
    break

  case 'breakdown description':
    metricsDashboardPage.tableCaption(
      'Payments by scheme breakdown',
      'Breakdown of payments and values by scheme'
    ).should('be.visible')
    break

  case 'payment scheme column':
    metricsDashboardPage.tableHeader(
      'Payments by scheme breakdown',
      'Scheme'
    ).should('be.visible')
    break

  case 'total payments column':
    metricsDashboardPage.tableHeader(
      'Payments by scheme breakdown',
      'Total Payments'
    ).should('be.visible')
    break

  case 'total value column':
    metricsDashboardPage.tableHeader(
      'Payments by scheme breakdown',
      'Total Value (£)'
    ).should('be.visible')
    break

  case 'pending column':
    metricsDashboardPage.tableHeader(
      'Payments by scheme breakdown',
      'Pending'
    ).should('be.visible')
    break

  case 'processed column':
    metricsDashboardPage.tableHeader(
      'Payments by scheme breakdown',
      'Processed'
    ).should('be.visible')
    break

  case 'documents metrics sub header':
    verify('heading', ['Document Metrics'])
    break

  case 'documents issued':
    verify('panel', ['Documents Issued'])
    break

  case 'documents count':
    metricsDashboardPage.panelValue('Documents Issued')
      .should('be.visible')
    break

  case 'documents breakdown description':
    metricsDashboardPage.tableCaption(
      'Statements by scheme and delivery method',
      'Breakdown of statements by scheme showing delivery methods and costs'
    ).should('be.visible')
    break

  case 'documents scheme column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Scheme'
    ).should('be.visible')
    break

  case 'year column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Year'
    ).should('be.visible')
    break

  case 'total documents column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Total Documents'
    ).should('be.visible')
    break

  case 'print and post column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Print & Post'
    ).should('be.visible')
    break

  case 'print and post cost column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Print & Post Cost (£)'
    ).should('be.visible')
    break

  case 'email column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Email'
    ).should('be.visible')
    break

  case 'select year filter dropdown':
    metricsDashboardPage.selectYearFilterDropdown()
      .should('be.visible')
    break

  case 'select month filter dropdown':
    metricsDashboardPage.selectMonthFilterDropdown()
      .should('be.visible')
    break

  case 'no payment data message':
    verify('warningText', ['Warning No metrics data is available for the selected period from either payment or document services. This may indicate no activity has been recorded yet.'])
    break

  case 'no document data message':
    verify('verifyText', ['No document data available for the selected period.'])
    break

  case 'clear filters':
    metricsDashboardPage.clearFiltersButton()
      .should('be.visible')
    break

  default:
    throw new Error(`Invalid element: ${element}`)
  }

  console.log(
    `Confirmed that ${element} is displayed on the Metrics Dashboard page`
  )

  cy.log(
    `Confirmed that ${element} is displayed on the Metrics Dashboard page`
  )
})

Then(/^on the Metrics Dashboard page I select "(.*?)" in (.*?) filter$/, (option, filter) => {

  Cypress.emit('log:step', 'on the Metrics Dashboard page I select ' + option + ' in ' + filter + ' filter')

  if (filter === 'Time Period') {
    metricsDashboardPage.timePeriodFilterDropdown().scrollIntoView().select(option)
  } else if (filter === 'Select Year') {
    metricsDashboardPage.selectYearFilterDropdown().scrollIntoView().select(option)
  } else if (filter === 'Select Month') {
    metricsDashboardPage.selectMonthFilterDropdown().scrollIntoView().select(option)
  } else {
    throw new Error(`Unknown filter: ${filter}`)
  }

  cy.log(`Selected ${option} option in ${filter} filter`)
  console.log(`Selected ${option} option in ${filter} filter`)
})

When(/^on the Metrics Dashboard page I click on the "(.*)" button$/, (button) => {

  Cypress.emit('log:step', 'on the Metrics Dashboard page I click on the ' + button + ' button')

  switch (button) {
  case 'clear filters':
    metricsDashboardPage.clearFiltersButton().scrollIntoView().click(); break
  default:
    throw new Error('invalid button name')
  }

  cy.log('Clicked' + button + 'on Metrics Dashboard page')
  console.log('Clicked' + button + 'on Metrics Dashboard page')
})

Then(/^on the Metrics Dashboard page I confirm that (.*) value is (.*)$/, (field, expectedValue) => {

  Cypress.emit('log:step', 'on the Metrics Dashboard page I confirm that ' + field + ' is ' + expectedValue)

  let fieldNumber

  switch (field) {
  case 'number of payments': fieldNumber = 0; break
  case 'payment amount': fieldNumber = 1; break
  case 'number of documents': fieldNumber = 2; break
  default:
    throw new Error('invalid field name')
  }

  let actualValue

  cy.get('.metrics-panel').eq(fieldNumber)
    .find('.metrics-panel__body')

    .invoke('text')
    .then((text) => {
      actualValue = text.trim()   // "0"

      console.log(`Expected Value = ${expectedValue}. Actual Value = ${actualValue}`)
      cy.log(`Expected Value = ${expectedValue}. Actual Value = ${actualValue}`)

      if (expectedValue === actualValue) {
        console.log(`Confirmed that ${field} is ${expectedValue}`)
        cy.log(`Confirmed that ${field} is ${expectedValue}`)
      } else {
        console.log(`${field} is not ${expectedValue}, Actual value is ${actualValue}`)
        cy.log(`${field} is not ${expectedValue}, Actual value is ${actualValue}`)
        throw new Error('Incorrect value')
      }
    })
})