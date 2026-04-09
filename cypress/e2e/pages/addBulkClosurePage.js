class addBulkClosurePage {
  pageTitle () {
    return cy.get('h1.govuk-heading-l');
  }

  pageDescription () {
    return cy.get('p.govuk-body');
  }

  uploadFileLabel () {
    return cy.get('label[for="file"]');
  }

  fieldHint () {
    return cy.get('.govuk-hint');
  }

  fileInput () {
    return cy.get('input#file');
  }

  singleClosureLink () {
    return cy.get('a[href="/closure"]');
  }
}

export default new addBulkClosurePage();