class requestEditorPage {
  errorSummaryTitle () {
    return cy.get('.govuk-error-summary__title');
  }

  errorSummaryItem () {
    return cy.get('.govuk-list > li > a');
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

  unattachedReportingDatasetsCount () {
    return cy.get('.govuk-heading-xl').first();
  }

  getSchemeRadioButton (schemeName) {
    return cy.contains('label', schemeName);
  }

  getFrnSearchField () {
    return cy.get('#user-search-frn');
  }

  getFrnSearchButton () {
    return cy.get('.govuk-button');
  }

  firstFRN () {
    return cy.get('.govuk-table__body').first().find('.govuk-table__cell').eq(2);
  }

  firstCaptureFRN () {
    return cy.get('.govuk-table__body').first().find('.govuk-table__cell').eq(1);
  }

  firstFRNManualLedger () {
    return cy.get('.govuk-table__body > .govuk-table__row > :nth-child(3)');
  }

  lastFRN () {
    return cy.get('.govuk-table__row').last().find('.govuk-table__cell').eq(2);
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

  yesProvisionalValuesRadioButton () {
    return cy.get('#agree');
  }

  noProvisionalValuesRadioButton () {
    return cy.get('#agree-2');
  }

  yesEditedCorrectlyRadioButton () {
    return cy.get('#status');
  }

  noEditedCorrectlyRadioButton () {
    return cy.get('#status-2');
  }

  irregularRadioButton () {
    return cy.get('#debt-type');
  }

  administrativeRadioButton () {
    return cy.get('#debt-type-2');
  }

  dayInput () {
    return cy.get('#debt-discovered-date-day');
  }

  monthInput () {
    return cy.get('#debt-discovered-date-month');
  }

  yearInput () {
    return cy.get('#debt-discovered-date-year');
  }

  unattachedDataNoButton () {
    return cy.get('#unattached-data-no');
  }

  unattachedDataYesButton () {
    return cy.get('#unattached-data-yes');
  }
}

export default new requestEditorPage();