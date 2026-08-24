class PaymentAlertsPage {
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

  schemeLabel (text) {
    return cy.contains(
      '.govuk-accordion__section-heading-text-focus',
      text
    )
      .containsWithoutWhitespace(text)
  }

  schemeShowButton (text) {
    return cy.contains(
      '.govuk-accordion__section-heading-text-focus',
      text
    )
      .closest('.govuk-accordion__section-header')
      .find('.govuk-accordion-nav__chevron')
  }

  alertsInformationLink () {
    return cy.get('.govuk-grid-column-full .govuk-link')
  }

  addNewRecipientButton () {
    return cy.get('.govuk-button')
      .contains('Add new alerts recipient')
  }

  showAllSectionsButton () {
    return cy.get('.govuk-accordion__show-all')
  }

  addNewEmailField () {
    return cy.get('#emailAddress')
  }

  addNewSelectSchemeDropdown () {
    return cy.get('#schemeId')
  }

  addNewInvalidEmailError () {
    return cy.get('.govuk-error-message')
  }

  createNewAlertRecipientButton () {
    return cy.get('#submit')
  }

  addNewSFI22All () {
    return cy.get('#sfi-22-all')
  }

  addNewSFIPilotAll () {
    return cy.get('#sfi-pilot-all')
  }

  editButton () {
    return cy.contains(
      '#scheme-accordion-content-2 a',
      'Edit'
    ).first()
  }
  removeEmailButton () {
    return cy.get('.govuk-button--warning')
  }
}

export default new PaymentAlertsPage()