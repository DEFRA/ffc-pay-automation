class downloadStatementsPage {

  pageTitle () {
    return cy.get('.govuk-heading-xl');
  }

  pageDescription () {
    return cy.get('.govuk-grid-column-two-thirds > :nth-child(1)');
  }

  pageInstructions () {
    return cy.get(':nth-child(2) > .govuk-label');
  }

  instructionExamples () {
    return cy.get('#filename-hint');
  }

  filenameField () {
    return cy.get('#filename');
  }

  individualCriteriaInstructions () {
    return cy.get('form > .govuk-body');
  }

  selectSchemeLabel () {
    return cy.get(':nth-child(4) > .govuk-label');
  }

  selectSchemeDropdown () {
    return cy.get('#schemeId');
  }

  marketingYearLabel () {
    return cy.get(':nth-child(5) > .govuk-label');
  }

  marketingYearField () {
    return cy.get('#marketingYear');
  }

  frnLabel () {
    return cy.get(':nth-child(6) > .govuk-label');
  }

  frnSearchInstructions () {
    return cy.get(':nth-child(6) > .govuk-hint');
  }

  frnField () {
    return cy.get('#frn');
  }

  timestampLabel () {
    return cy.get(':nth-child(7) > .govuk-label');
  }

  timestampSearchInstructions () {
    return cy.get('#timestamp-hint');
  }

  timestampField () {
    return cy.get('#timestamp');
  }

  searchStatementsButton () {
    return cy.get('#report-submit');
  }

  clearButton () {
    return cy.get('.govuk-button--secondary');
  }

  resultsSubHeader () {
    return cy.get('.govuk-heading-m');
  }

  numberOfResults () {
    return cy.get('.govuk-body-s');
  }

  schemeColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(1)');
  }

  yearColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(2)');
  }

  frnColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(3)');
  }

  timestampColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(4)');
  }

  actionColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(5)');
  }

  nextButton () {
    return cy.get('.govuk-pagination__next > .govuk-link');
  }

  previousButton () {
    return cy.get('.govuk-pagination__prev > .govuk-link');
  }

  downloadButton () {
    return cy.get('.govuk-link').contains('Download');
  }
}

export default new downloadStatementsPage();