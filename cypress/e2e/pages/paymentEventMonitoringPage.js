class paymentEventMonitoringPage {
  heading (text) {
    return cy.contains('h1, h2, h3', text)
      .containsWithoutWhitespace(text)
  }

  paragraph (text) {
    return cy.contains('p', text)
      .containsWithoutWhitespace(text)
  }

  button (text) {
    return cy.contains('button', text)
      .containsWithoutWhitespace(text)
  }

  tableHeader (text) {
    return cy.contains('.govuk-table__header', text)
      .containsWithoutWhitespace(text)
  }

  tableCaption (text) {
    return cy.contains('.govuk-table__caption', text)
      .containsWithoutWhitespace(text)
  }

  searchField (field) {
    const selectors = {
      frn: '#search-frn',
      batch: '#search-batch'
    }

    return cy.get(selectors[field])
  }

  searchButton (field) {
    const selectors = {
      frn: '[aria-label="Payment FRN search form."] > .govuk-button',
      batch: '[action="/monitoring/batch/name"] > .govuk-button'
    }

    return cy.get(selectors[field])
  }

  selectSchemeDropdown () {
    return cy.get('#schemeId')
  }

  selectSchemeButton () {
    return cy.get('#submit')
  }

  viewLink () {
    return cy.get('.govuk-table')
      .contains('a', 'View')
  }

  tableCell (rowNumber, columnNumber) {
    return cy.get(`.govuk-table__body > :nth-child(${rowNumber}) > :nth-child(${columnNumber})`)
  }

  paymentRequestCell (rowNumber) {
    return this.tableCell(rowNumber, 3)
  }

  processedRequestsNumberOf () {
    return cy.get('.govuk-table__body > .govuk-table__row > :nth-child(2)')
  }

  processedRequestsValue () {
    return cy.get('.govuk-table__body > .govuk-table__row > :nth-child(3)')
  }

  verifyText (text) {
    return cy.contains(text)
      .containsWithoutWhitespace(text)
  }
}
export default new paymentEventMonitoringPage()