class paymentCalculatorPage {
  heading (text) {
    return cy.contains('h1, h2, h3', text)
      .containsWithoutWhitespace(text)
  }

  paragraph (text) {
    return cy.contains('p', text)
      .containsWithoutWhitespace(text)
  }

  link (text) {
    return cy.contains('a', text)
      .containsWithoutWhitespace(text)
  }

  button (text) {
    return cy.contains('#submit', text)
      .containsWithoutWhitespace(text)
  }

  verifyText (text) {
    return cy.contains(text)
      .containsWithoutWhitespace(text)
  }
}

export default new paymentCalculatorPage()