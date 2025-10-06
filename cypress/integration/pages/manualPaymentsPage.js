class manualPaymentsPage {
  pageTitle () {
    return cy.get('h1.govuk-heading-l');
  }

  pageDescription () {
    return cy.get('p.govuk-body');
  }

  chooseFileBtn () {
    return cy.get('#file');
  }

  uploadBtn () {
    return cy.get('#submit');
  }

  manualPaymentsGuidanceLink () {
    return cy.get('.govuk-body > .govuk-link');
  }

  statusText () {
    return cy.get('#progress-status-text');
  }

  errorText () {
    return cy.get('#error-message-text');
  }

  typeErrorText () {
    return cy.get(':nth-child(2) > .govuk-error-message');
  }

  nameErrorText () {
    return cy.get('.govuk-error-message');
  }

  returnButton () {
    return cy.get('.govuk-notification-banner__content > .redirect-link > .govuk-link');
  }

  errorReturnButton () {
    return cy.get('#error-message > .redirect-link > .govuk-link');
  }
}

export default new manualPaymentsPage();