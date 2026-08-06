class metricsDashboardPage {

  pageTitle () {
    return cy.get('.govuk-heading-xl')
  }

  pageDescription () {
    return cy.get('.govuk-body-l')
  }
  timePeriodFilterDropdown () {
    return cy.get('#period')
  }

  timePeriodFilterButton () {
    return cy.get(':nth-child(4) > .govuk-button')
  }

  paymentMetricsSubHeader () {
    return cy.get('.govuk-grid-column-full > :nth-child(5)')
  }

  paymentsPanel () {
    return cy.get(':nth-child(6) > :nth-child(1) > .govuk-panel')
  }

  paymentsCount () {
    return cy.get(':nth-child(6) > :nth-child(1) > .govuk-panel > .govuk-panel__body')
  }

  totalValuePanel () {
    return cy.get(':nth-child(2) > .govuk-panel')
  }

  totalValueAmount () {
    return cy.get(':nth-child(2) > .govuk-panel > .govuk-panel__body')
  }

  breakdownDescription () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__caption')
  }

  paymentSchemeColumn () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__head > .govuk-table__row > :nth-child(1)')
  }

  totalPaymentsColumn () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__head > .govuk-table__row > :nth-child(2)')
  }

  totalValueColumn () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__head > .govuk-table__row > :nth-child(3)')
  }

  pendingColumn () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__head > .govuk-table__row > :nth-child(4)')
  }

  processedColumn () {
    return cy.get('[aria-label="Payments by scheme breakdown"] > .govuk-table__head > .govuk-table__row > :nth-child(5)')
  }

  documentsMetricsSubHeader () {
    return cy.get('.govuk-grid-column-full > :nth-child(8)')
  }

  documentsIssued () {
    return cy.get(':nth-child(9) > .govuk-grid-column-one-half > .govuk-panel')
  }

  documentsCount () {
    return cy.get(':nth-child(9) > .govuk-grid-column-one-half > .govuk-panel > .govuk-panel__body')
  }

  docBreakdownDescription () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__caption')
  }

  docSchemeColumn () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__head > .govuk-table__row > :nth-child(1)')
  }

  yearColumn () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__head > .govuk-table__row > :nth-child(2)')
  }

  totalDocumentsColumn () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__head > .govuk-table__row > :nth-child(3)')
  }

  printAndPostColumn () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__head > .govuk-table__row > :nth-child(4)')
  }

  printAndPostCostColumn () {
    return cy.get('[aria-label="Statements by scheme and delivery method"] > .govuk-table__head > .govuk-table__row > :nth-child(5)')
  }

  emailColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(6)')
  }

  selectYearFilterDropdown () {
    return cy.get('#schemeYear')
  }

  selectMonthFilterDropdown () {
    return cy.get('#selectedMonth')
  }

  noPaymentDataMessage () {
    return cy.get('.govuk-warning-text__text')
  }

  noDocumentDataMessage () {
    return cy.get('.govuk-grid-column-full > :nth-child(11)')
  }

  clearFiltersButton () {
    return cy.get('.govuk-grid-row > .govuk-button-group > .govuk-link')
  }

}
export default new metricsDashboardPage()