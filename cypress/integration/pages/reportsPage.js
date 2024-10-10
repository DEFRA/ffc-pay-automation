class reportsPage {
  schemeDropdown () {
    return cy.get('#schemeId');
  }

  yearField () {
    return cy.get('#year');
  }

  prnField () {
    return cy.get('#prn');
  }

  revenueCapitalDropdown () {
    return cy.get('#revenueOrCapital');
  }

  frnField () {
    return cy.get('#frn');
  }
}

export default new reportsPage();