class resetPaymentRequestPage {

  pageTitle () {
    return cy.get('.govuk-heading-l')
  }

  pageDescription () {
    return cy.get('.govuk-label')
  }

  pageInstructions () {
    return cy.get('.govuk-hint')
  }

  invoiceNumberField () {
    return cy.get('#invoiceNumber')
  }

  resetButton () {
    return cy.get('#submit')
  }

  errorTitle () {
    return cy.get('#error-summary-title')
  }

  errorMessage () {
    return cy.get('.govuk-error-message')
  }

  successTitle () {
    return cy.get('.govuk-notification-banner__content')
  }

  successMessage () {
    return cy.get('.govuk-panel__body')
  }
}

export default new resetPaymentRequestPage()