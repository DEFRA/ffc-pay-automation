class cookiesPage {
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

  tableCell (rowIdentifier, text = rowIdentifier) {
    return cy.contains('.govuk-table__row', rowIdentifier)
      .contains('.govuk-table__cell, .govuk-table__header', text)
      .containsWithoutWhitespace(text)
  }

  legend (text) {
    return cy.contains('.govuk-fieldset__legend', text)
      .containsWithoutWhitespace(text)
  }

  radioLabel (text) {
    return cy.contains('.govuk-radios__label, label', text)
      .containsWithoutWhitespace(text)
  }

  button (text) {
    return cy.contains('button', text)
      .containsWithoutWhitespace(text)
  }

  notificationBannerTitle (text) {
    return cy.get('#govuk-notification-banner-title')
      .containsWithoutWhitespace(text)
  }

  notificationBannerHeading (text) {
    return cy.contains('.govuk-notification-banner__heading', text)
      .containsWithoutWhitespace(text)
  }

  notificationBannerLink (text) {
    return cy.contains('.govuk-notification-banner__link', text)
      .containsWithoutWhitespace(text)
  }
}

export default new cookiesPage()