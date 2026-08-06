class delinkedPaymentCalculationPage {
  heading (text) {
    return cy.contains('h1, h2, h3', text)
      .containsWithoutWhitespace(text)
  }

  paragraph (text) {
    return cy.get('#year2026')
      .contains('p', text)
      .containsWithoutWhitespace(text)
  }

  tab (year) {
    return cy.get(`#tab_year${year}`)
  }

  tableCaption (text) {
    return cy.contains('.govuk-table__caption', text)
      .containsWithoutWhitespace(text)
  }

  tableHeader (text) {
    return cy.contains('.govuk-table__header', text)
      .containsWithoutWhitespace(text)
  }

  tableCell (text) {
    return cy.contains('.govuk-table__cell, .govuk-body', text)
      .containsWithoutWhitespace(text)
  }

  verifyText (text) {
    return cy.contains(text)
      .containsWithoutWhitespace(text)
  }
}

export default new delinkedPaymentCalculationPage()