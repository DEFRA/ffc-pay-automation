class paymentEventMonitoringPage {

  subHeader () {
    return cy.get('.govuk-heading-l');
  }

  searchByFRNInstructions () {
    return cy.get('#main-content > div > div > form.govuk-\\!-margin-bottom-6 > div > label');
  }

  searchByFRNExample () {
    return cy.get('#search-frn-hint');
  }

  searchByFRNField () {
    return cy.get('#search-frn');
  }

  searchByFRNButton () {
    return cy.get('.govuk-\\!-margin-bottom-6 > .govuk-button');
  }

  searchByBatchInstructions () {
    return cy.get('[action="/monitoring/batch/name"] > .govuk-form-group > .govuk-label');
  }

  searchByBatchExample () {
    return cy.get('#search-batch-hint');
  }

  searchByBatchField () {
    return cy.get('#search-batch');
  }

  searchByBatchButton () {
    return cy.get('[action="/monitoring/batch/name"] > .govuk-button');
  }

  selectSchemeLabel () {
    return cy.get('.govuk-label');
  }

  selectSchemeDropdown () {
    return cy.get('#schemeId');
  }

  selectSchemeButton () {
    return cy.get('#submit');
  }

  frnSearchedLabel () {
    return cy.get('.govuk-caption-l');
  }

  schemeColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(1)');
  }

  agreementColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(2)');
  }

  paymentRequestColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(3)');
  }

  valueColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(4)');
  }

  statusColumn () { 
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(5)');
  }

  lastUpdatedColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(6)');
  }

  actionsColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(7)');
  }

  viewLink () {
    return cy.get(':nth-child(7) > a');
  }

  activityColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(1)');
  }

  viewStatusColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(2)');
  }

  completedColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(3)');
  }

  batchFRNColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(2)');
  }

  batchYearColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(3)');
  }

  batchAgreementColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(4)');
  }

  batchRequestColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(5)');
  }

  batchValueColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(6)');
  }

  batchStatusColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(7)');
  }

  batchActionsColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(8)');
  }

  processedRequestLabel () {
    return cy.get('.govuk-table__caption');
  }

  processedRequestsSchemeColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(1)');
  }

  processedRequestsNumberOfColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(2)');
  }

  processedRequestsValueColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(3)');
  }
}

export default new paymentEventMonitoringPage();