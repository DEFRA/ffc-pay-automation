class manualPaymentsPage {
  pageTitle () {
    return cy.get('h1.govuk-heading-l')
  }

  pageDescription () {
    return cy.get('#main-content > :nth-child(1) > :nth-child(1) > p.govuk-body')
  }

  chooseFileBtn () {
    return cy.get('#file')
  }

  uploadBtn () {
    return cy.get('#submit')
  }

  manualPaymentsGuidanceLink () {
    return cy.get('.govuk-body > .govuk-link')
  }

  statusText () {
    return cy.get('#progress-status-text')
  }

  uploadHistoryTable () {
    return cy.get(':nth-child(1) > .govuk-grid-row > .govuk-grid-column-full')
  }

  uploadHistoryFilename () {
    return cy.get('.govuk-table__body > .govuk-table__row > :nth-child(2)')
  }

  fileInput () {
    return cy.get('#file-input')
  }
}

export default new manualPaymentsPage()