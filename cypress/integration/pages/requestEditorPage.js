class requestEditorPage {
  errorSummaryTitle () {
    return cy.get('.govuk-error-summary__title');
  }

  errorSummaryItem () {
    return cy.get('li');
  }

  inputByValue (val) {
    return cy.get(`input[value="${val}"]`);
  }

  inputById (id) {
    return cy.get(`input[id="${id}"]`);
  }

  txtFrn () {
    return this.inputById('frn');
  }

  txtApplicationIdentifier () {
    return this.inputById('applicationIdentifier');
  }

  txtNetValue () {
    return this.inputById('net');
  }

  txtDay () {
    return this.inputById('debt-discovered-day');
  }

  txtMonth () {
    return this.inputById('debt-discovered-month');
  }

  txtYear () {
    return this.inputById('debt-discovered-year');
  }

  valueCount () {
    return cy.get('.govuk-heading-xl');
  }

  getSchemeRadioButton (schemeName) {
    return cy.contains('label', schemeName);
  }

  getFrnSearchField () {
    return cy.get('#user-search');
  }

  getFrnSearchButton () {
    return cy.get('.search-button');
  }

  firstFRN () {
    return cy.get('.govuk-table__row').last().find('.govuk-table__cell').eq(2);
  }

  randomFRN () {
    // Generate a random index between 2 and 40
    const randomIndex = Math.floor(Math.random() * (40 - 2 + 1)) + 2;

    // Select the random table cell using the randomIndex
    return cy.get(`.govuk-table__body > :nth-child(${randomIndex}) > :nth-child(3)`);
  }

  applicationIdentifierHeader () {
    return cy.get('[for="applicationIdentifier"]');
  }

  applicationIdentifierHint () {
    return cy.get('#applicationIdentifier-hint');
  }

  applicationIdentifierError () {
    return cy.get('#applicationIdentifier-error');
  }

  recordsPerPageDropdown () {
    return cy.get('#records');
  }

  dataSetRecords () {
    return cy.get('tbody > tr');
  }

  pageNumber () {
    return cy.get('.govuk-pagination__item');
  }

  btnNext () {
    return cy.get('[rel="next"] > .govuk-pagination__link-title');
  }

  btnPrevious () {
    return cy.get('[rel="prev"] > .govuk-pagination__link-title');
  }
}

export default new requestEditorPage();