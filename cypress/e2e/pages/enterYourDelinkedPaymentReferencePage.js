class enterYourDelinkedPaymentReferencePage {
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

  link (text) {
    return cy.contains('a', text)
      .containsWithoutWhitespace(text)
  }

  hint (text) {
    return cy.contains('#value-hint', text)
      .containsWithoutWhitespace(text)
  }

  input () {
    return cy.get('#value')
  }

  button (text) {
    return cy.contains('button', text)
      .containsWithoutWhitespace(text)
  }

  errorMessage (text) {
    return cy.contains('#value-error', text)
      .containsWithoutWhitespace(text)
  }

  verifyText (text) {
    return cy.contains(text)
      .containsWithoutWhitespace(text)
  }
}

export default new enterYourDelinkedPaymentReferencePage()