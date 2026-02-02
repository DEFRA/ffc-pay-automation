class managementInformationPage {

  pageTitle () {
    return cy.get('.govuk-heading-xl');
  }

  pageDescription () {
    return cy.get('.govuk-body-l');
  }

  helpDropdown () {
    return cy.get('.govuk-details__summary-text');
  }

  helpDescription () {
    return cy.get('.govuk-body');
  }

  showAllDescription () {
    return cy.get('.govuk-list > :nth-child(1)');
  }

  yearToDateDescription () {
    return cy.get('.govuk-list > :nth-child(2)');
  }

  byYearDescription () {
    return cy.get('.govuk-list > :nth-child(3)');
  }

  byMonthDescription () {
    return cy.get('.govuk-list > :nth-child(4)');
  }

  thisMonthDescription () {
    return cy.get('.govuk-list > :nth-child(5)');
  }

  last7DaysDescription () {
    return cy.get('.govuk-list > :nth-child(6)');
  }

  last24HoursDescription () {
    return cy.get('.govuk-list > :nth-child(7)');
  }

  paymentValuesDescription () {
    return cy.get('.govuk-list > :nth-child(8)');
  }

  printAndPostDescription () {
    return cy.get('.govuk-list > :nth-child(9)');
  }

  timePeriodFilterDropdown () {
    return cy.get('#period');
  }

  timePeriodFilterButton () {
    return cy.get('.govuk-button');
  }

  paymentMetricsSubHeader () {
    return cy.get('.govuk-grid-column-full > :nth-child(6)');
  }

  paymentsPanel () {
    return cy.get(':nth-child(7) > :nth-child(1) > .govuk-panel > .govuk-panel__title');
  }

  paymentsCount () {
    return cy.get(':nth-child(7) > :nth-child(1) > .govuk-panel > .govuk-panel__body');
  }

  totalValuePanel () {
    return cy.get(':nth-child(2) > .govuk-panel > .govuk-panel__title');
  }

  totalValueAmount () {
    return cy.get(':nth-child(2) > .govuk-panel > .govuk-panel__body');
  }

  breakdownDescription () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__caption');
  }

  paymentSchemeColumn () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__head > .govuk-table__row > :nth-child(1)');
  }

  totalPaymentsColumn () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__head > .govuk-table__row > :nth-child(2)');
  }

  totalValueColumn () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__head > .govuk-table__row > :nth-child(3)');
  }

  pendingColumn () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__head > .govuk-table__row > :nth-child(4)');
  }

  processedColumn () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__head > .govuk-table__row > :nth-child(5)');
  }

  documentsMetricsSubHeader () {
    return cy.get('.govuk-grid-column-full > :nth-child(9)');
  }

  documentsIssued () {
    return cy.get(':nth-child(10) > .govuk-grid-column-one-half > .govuk-panel > .govuk-panel__title');
  }

  documentsCount () {
    return cy.get(':nth-child(10) > .govuk-grid-column-one-half > .govuk-panel > .govuk-panel__body');
  }

  docBreakdownDescription () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__caption');
  }

  docSchemeColumn () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__head > .govuk-table__row > :nth-child(1)');
  }

  yearColumn () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__head > .govuk-table__row > :nth-child(2)');
  }

  totalDocumentsColumn () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__head > .govuk-table__row > :nth-child(3)');
  }

  printAndPostColumn () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__head > .govuk-table__row > :nth-child(4)');
  }

  printAndPostCostColumn () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__head > .govuk-table__row > :nth-child(5)');
  }

  emailColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(6)');
  }

  selectYearFilterDropdown () {
    return cy.get('#schemeYear');
  }

  selectMonthFilterDropdown () {
    return cy.get('#selectedMonth');
  }

  noPaymentDataMessage () {
    return cy.get('.govuk-grid-column-full > :nth-child(9)');
  }

  noDocumentDataMessage () {
    return cy.get('.govuk-grid-column-full > :nth-child(12)');
  }

  clearFiltersButton () {
    return cy.get('.govuk-link');
  }

}
export default new managementInformationPage();