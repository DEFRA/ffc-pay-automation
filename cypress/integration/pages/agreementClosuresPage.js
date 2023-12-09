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
}

export default new agreementClosuresPage();