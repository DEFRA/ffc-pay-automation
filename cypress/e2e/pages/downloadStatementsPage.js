class DownloadStatementsPage {
  heading (text) {
    return cy.contains('h1, h2, h3', text)
      .containsWithoutWhitespace(text)
  }

  paragraph (text) {
    return cy.contains('p', text)
      .containsWithoutWhitespace(text)
  }

  label (text) {
    return cy.contains('.govuk-label', text)
      .containsWithoutWhitespace(text)
  }

  hint (text) {
    return cy.contains('.govuk-hint', text)
      .containsWithoutWhitespace(text)
  }

  radio (label) {
    return cy.contains('label', label)
      .containsWithoutWhitespace(label)
  }

  input (id) {
    return cy.get(id)
  }

  button (text) {
    return cy.contains('button', text)
      .containsWithoutWhitespace(text)
  }

  tableHeader (text) {
    return cy.contains('.govuk-table__header', text)
      .containsWithoutWhitespace(text)
  }

  paginationLink (text) {
    return cy.contains('.govuk-pagination__link', text)
  }

  verifyText (text) {
    return cy.contains(text)
      .containsWithoutWhitespace(text)
  }
  resultsTable () {
    return cy.get('.govuk-table')
  }
}

export default new DownloadStatementsPage()