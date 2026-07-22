class downloadStatementsPage {

  pageTitle () {
    return cy.get('.govuk-heading-l')
  }

  pageDescription () {
    return cy.get('.govuk-grid-column-two-thirds > :nth-child(1)')
  }

  pageInstructions () {
    return cy.get(':nth-child(2) > .govuk-label')
  }

  instructionExamples () {
    return cy.get('#filename-hint')
  }

  filenameField () {
    return cy.get('#filename')
  }

  individualCriteriaInstructions () {
    return cy.get('form > .govuk-body')
  }

  selectSchemeDropdown () {
    return cy.get('#schemeId')
  }
  selectSchemeRadioDelinked () {
    return cy.get('#schemeId-1')
  }

  selectSchemeRadioSFI () {
    return cy.get('#schemeId-2')
  }

  marketingYearLabel () {
    return cy.contains('.govuk-label', 'Marketing year')
  }

  marketingYearField () {
    return cy.get('#marketingYear')
  }

  frnLabel () {
    return cy.contains('.govuk-label', 'Firm reference number (FRN)')
  }

  frnSearchInstructions () {
    return cy.get(':nth-child(6) > .govuk-hint')
  }

  frnField () {
    return cy.get('#frn')
  }

  timestampLabel () {
    return cy.contains('.govuk-label', 'Timestamp')
  }

  timestampSearchInstructions () {
    return cy.get('#timestamp-hint')
  }

  timestampField () {
    return cy.get('#timestamp')
  }

  searchStatementsButton () {
    return cy.get('#report-submit')
  }

  clearButton () {
    return cy.get('.govuk-button--secondary')
  }

  statementsSubHeader () {
    return cy.contains('.govuk-heading-m', 'Statements')
  }

  currentPageNumber () {
    return cy.get('.govuk-pagination__item--current > .govuk-link')
  }


  schemeColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(1)')
  }

  yearColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(2)')
  }

  frnColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(3)')
  }

  timestampColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(4)')
  }

  actionColumn () {
    return cy.get('.govuk-table__head > .govuk-table__row > :nth-child(5)')
  }

  nextButton () {
    return cy.get('.govuk-pagination__next > .govuk-link')
  }

  previousButton () {
    return cy.get('.govuk-pagination__prev > .govuk-link')
  }

  downloadButton () {
    return cy.get('.govuk-link').contains('Download')
  }
}

export default new downloadStatementsPage()