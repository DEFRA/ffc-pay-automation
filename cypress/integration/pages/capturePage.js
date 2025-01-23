class capturePage {
  txtFrn () {
    return cy.get('#user-search-frn');
  }

  btnFrnSearch () {
    return cy.get('.search-button').eq(0);
  }

  sltScheme () {
    return cy.get('[name="scheme"]');
  }

  btnSchemeSearch () {
    return cy.get('.search-button').eq(1);
  }

  tableRows () {
    return cy.get('.govuk-table__body .govuk-table__row');
  }

  errorMessage () {
    return cy.get('#error-message');
  }

  noDataSetsMessage () {
    return cy.get('.govuk-inset-text');
  }
}

export default new capturePage();