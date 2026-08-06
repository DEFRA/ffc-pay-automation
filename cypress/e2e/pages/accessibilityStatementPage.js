class accessibilityStatementPage {
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

  verifyText (text) {
    return cy.contains(text)
      .containsWithoutWhitespace(text)
  }
}
export default new accessibilityStatementPage()