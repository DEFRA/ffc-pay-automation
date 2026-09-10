class agreementClosuresPage {

  lastFRN () {
    return cy.get('.govuk-table__row').last().find('.govuk-table__cell').eq(0)
  }
  agreementClosureEnterFrnField () {
    return cy.get('#closure-search')
  }
}

export default new agreementClosuresPage()