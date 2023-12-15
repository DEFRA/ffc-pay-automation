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

  firstFRN () {
    return cy.get('.govuk-table__body > :nth-child(1) > :nth-child(1)');
  }

  firstAgreementNumber () {
    return cy.get('.govuk-table__body > :nth-child(1) > :nth-child(2)');
  }

  firstClosureDate () {
    return cy.get('.govuk-table__body > :nth-child(1) > :nth-child(4)');
  }
}

export default new agreementClosuresPage();