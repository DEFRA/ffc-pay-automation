class paymentHoldsPage {
  selectedOption () {
    return cy.get('#remove').find('option:selected');
  }

  fileInput () {
    return cy.get('input#file');
  }

  btnSubmit () {
    return cy.get('#submit');
  }

  holdCategoryId () {
    return cy.get('#holdCategoryId');
  }

  errorSummaryTitle () {
    return cy.get('#error-summary-title');
  }

  errorMessage () {
    return cy.get('.govuk-error-message');
  }

  bulkUploadErrorSummaryTitle () {
    return cy.get('.govuk-error-summary__title');
  }

  bulkUploadErrorMessage () {
    return cy.get('#error-message-text');
  }

  holdCategoryOption () {
    return cy.get('#holdCategoryId');
  }

  btnAddRemoveHoldsInBulk () {
    return cy.get('[href="/payment-holds/bulk"]');
  }

  sltAddRemoveHolds () {
    return cy.get('select[id="remove"]');
  }

  allFirstColumnCells () {
    return cy.get('tr td:first-child');
  }

  frnSearchField () {
    return cy.get('#payment-hold-search');
  }

  frnSearchButton () {
    return cy.get('#main-content > div > div > form > button');
  }
}

export default new paymentHoldsPage();