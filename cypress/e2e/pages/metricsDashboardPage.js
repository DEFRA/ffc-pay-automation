class MetricsDashboardPage {
  heading (text) {
    return cy.contains('h1, h2, h3', text)
      .containsWithoutWhitespace(text)
  }

  paragraph (text) {
    return cy.contains('p', text)
      .containsWithoutWhitespace(text)
  }

  listItem (text) {
    return cy.contains('li', text)
      .containsWithoutWhitespace(text)
  }

  detailsSummary (text) {
    return cy.contains('.govuk-details__summary-text', text)
      .containsWithoutWhitespace(text)
  }

  button (text) {
    return cy.contains('button', text)
      .containsWithoutWhitespace(text)
  }

  link (text) {
    return cy.contains('a', text)
      .containsWithoutWhitespace(text)
  }

  panel (text) {
    return cy.contains('.govuk-panel', text)
      .containsWithoutWhitespace(text)
  }

  panelValue (panelTitle) {
    return cy.contains('.govuk-panel', panelTitle)
      .find('.govuk-panel__body')
  }

  tableCaption (tableName, text) {
    return cy.get(`[aria-label="${tableName}"]`)
      .contains('.govuk-table__caption', text)
      .containsWithoutWhitespace(text)
  }

  tableHeader (tableName, text) {
    return cy.get(`[aria-label="${tableName}"]`)
      .contains('.govuk-table__header', text)
      .containsWithoutWhitespace(text)
  }

  warningText (text) {
    return cy.contains('.govuk-warning-text__text', text)
      .containsWithoutWhitespace(text)
  }

  verifyText (text) {
    return cy.contains(text)
      .containsWithoutWhitespace(text)
  }

  timePeriodFilterDropdown () {
    return cy.get('#period')
  }

  selectYearFilterDropdown () {
    return cy.get('#schemeYear')
  }

  selectMonthFilterDropdown () {
    return cy.get('#selectedMonth')
  }

  clearFiltersButton () {
    return cy.contains('a', 'Clear filters')
      .containsWithoutWhitespace('Clear filters')
  }
}

export default new MetricsDashboardPage()