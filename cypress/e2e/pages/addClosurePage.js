class addClosurePage {
  pageTitle () {
    return cy.get('h1.govuk-heading-l');
  }

  pageDescription () {
    return cy.get('p.govuk-body');
  }

  frnInput () {
    return cy.get('input#frn');
  }

  agreementNumberInput () {
    return cy.get('input#agreement');
  }

  closureDateDayInput () {
    return cy.get('input#day');
  }

  closureDateMonthInput () {
    return cy.get('input#month');
  }

  closureDateYearInput () {
    return cy.get('input#year');
  }

  bulkUploadLink () {
    return cy.get('a[href="/closure/bulk"]');
  }

  singleUploadLink () {
    return cy.get('a[href="/closure/add"]');
  }

  btnSubmit () {
    return cy.get('#submit');
  }
}

export default new addClosurePage();