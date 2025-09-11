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
}

export default new manualPaymentsPage();