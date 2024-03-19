class requestEditorPage {
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
    return cy.get('#user-search');
  }

  getFrnSearchButton () {
    return cy.get('.search-button');
  }

  firstFRN () {
    return cy.get('.govuk-table__row').last().find('.govuk-table__cell').eq(2);
  }
}

export default new requestEditorPage();