class agreementClosuresPage {
  pageTitle () {
    return cy.get('h1.govuk-heading-l');
  }

  pageDescription () {
    return cy.get('p.govuk-body');
  }

  noClosureText () {
    return cy.get('p#no-closure-text');
  }

  lblFRN () {
    return cy.get('label[for="frn"]');
  }

  txtFRN () {
    return cy.get('input#frn');
  }

  lblAgreementNumber () {
    return cy.get('label[for="agreement"]');
  }

  txtAgreementNumber () {
    return cy.get('input#agreement');
  }

  lblClosureDate () {
    return cy.get('legend');
  }

  txtDateDay () {
    return cy.get('input#day');
  }

  txtDateMonth () {
    return cy.get('input#month');
  }

  txtDateYear () {
    return cy.get('input#year');
  }

  linkRemoveSubmission () {
    return cy.get('.govuk-button-link');
  }

  lastFRN () {
    return cy.get('.govuk-table__row').last().find('.govuk-table__cell').eq(0);
  }

  lastAgreementNumber () {
    return cy.get('.govuk-table__row').last().find('.govuk-table__cell').eq(1);
  }

  lastClosureDate () {
    return cy.get('.govuk-table__row').last().find('.govuk-table__cell').eq(3);
  }

  firstFRN () {
    return cy.get('.govuk-table__row').eq(1).find('.govuk-table__cell').eq(0);
  }

  firstAgreementNumber () {
    return cy.get('.govuk-table__row').eq(1).find('.govuk-table__cell').eq(1);
  }

  firstClosureDate () {
    return cy.get('.govuk-table__row').eq(1).find('.govuk-table__cell').eq(3);
  }
}

export default new agreementClosuresPage();