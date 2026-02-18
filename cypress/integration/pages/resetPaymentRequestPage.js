class resetPaymentRequestPage {

  pageTitle () {
    return cy.get('.govuk-heading-l');
  }

  pageDescription () {
    return cy.get('.govuk-label');
  }

  pageInstructions () {
    return cy.get('.govuk-hint');
  }

  invoiceNumberField () {
    return cy.get('#invoiceNumber');
  }

  resetButton () {
    return cy.get('#submit');
  }

  errorTitle () {
    return cy.get('#error-summary-title');
  }

  errorMessage () {
    return cy.get('.govuk-error-message');
  }

  successTitle () {
    return cy.get('.govuk-panel__title');
  }

  successMessage () {
    return cy.get('.govuk-panel__body');
  }

  whatHappensNextSubheader () {
    return cy.get('.govuk-heading-m');
  }

  whatHappensNextMessage () {
    return cy.get('.govuk-width-container > :nth-child(3)');
  }

  performAnotherActionLink () {
    return cy.get('#main-content > div > div > div > p:nth-child(4) > a');
  }
}

export default new resetPaymentRequestPage();