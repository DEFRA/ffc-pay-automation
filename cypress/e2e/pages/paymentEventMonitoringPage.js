class paymentEventMonitoringPage {

  subHeader () {
    return cy.get('.govuk-heading-l')
  }

  searchByFRNInstructions () {
    return cy.get('.govuk-body-m')
  }

  searchByFRNExample () {
    return cy.get('#search-frn-hint')
  }

  searchByFRNField () {
    return cy.get('#search-frn')
  }

  searchByFRNButton () {
    return cy.get('[aria-label="Payment FRN search form."] > .govuk-button')
  }

  searchByBatchInstructions () {
    return cy.get('[action="/monitoring/batch/name"] > .govuk-button')
  }

  searchByBatchExample () {
    return cy.get('#search-batch-hint')
  }

  searchByBatchField () {
    return cy.get('#search-batch')
  }

  searchByBatchButton () {
    return cy.get('[action="/monitoring/batch/name"] > .govuk-button')
  }

  selectSchemeLabel () {
    return cy.get('.govuk-body-m')
  }

  selectSchemeDropdown () {
    return cy.get('#schemeId')
  }

  selectSchemeButton () {
    return cy.get('#submit')
  }

  frnSearchedLabel () {
    return cy.get('.govuk-grid-column-full > .govuk-heading-m')
  }

  schemeColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(1)')
  }

  agreementColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(2)')
  }

  paymentRequestColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(3)')
  }

  valueColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(4)')
  }

  statusColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(5)')
  }

  lastUpdatedColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(6)')
  }

  viewLink () {
    return cy.get(':nth-child(7) > a')
  }

  activityColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(7)')
  }

  viewStatusColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(2)')
  }

  completedColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(3)')
  }
  batchSubHeader () {
    return cy.get('.govuk-heading-l')
  }

  batchFRNColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(2)')
  }

  batchYearColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(3)')
  }

  batchAgreementColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(4)')
  }

  batchRequestColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(5)')
  }

  batchValueColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(6)')
  }

  batchStatusColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(7)')
  }

  batchActionsColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(8)')
  }

  processedRequestLabel () {
    return cy.get('.govuk-table__caption')
  }

  processedRequestsSchemeColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(1)')
  }

  processedRequestsNumberOfColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(2)')
  }

  processedRequestsValueColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(3)')
  }

  processedRequestsNumberOf () {
    return cy.get('.govuk-table__body > .govuk-table__row > :nth-child(2)')
  }

  processedRequestsValue () {
    return cy.get('.govuk-table__body > .govuk-table__row > :nth-child(3)')
  }

  firstPaymentRequestNumber () {
    return cy.get('.govuk-table__body > :nth-child(1) > :nth-child(3)')
  }

  secondPaymentRequestNumber () {
    return cy.get('.govuk-table__body > :nth-child(2) > :nth-child(3)')
  }

  frnPaymentHistory () {
    return cy.get('.govuk-heading-l')
  }

  frnPaymentRequestHistory () {
    return cy.get('.govuk-heading-l')
  }
}

export default new paymentEventMonitoringPage()