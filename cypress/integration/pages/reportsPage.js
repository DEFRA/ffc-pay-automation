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

  reportTypeDropdown () {
    return cy.get('#report-type');
  }

  startDateDayField () {
    return cy.get('#start-date-day');
  }

  startDateMonthField () {
    return cy.get('#start-date-month');
  }

  startDateYearField () {
    return cy.get('#start-date-year');
  }

  endDateDayField () {
    return cy.get('#end-date-day');
  }

  endDateMonthField () {
    return cy.get('#end-date-month');
  }

  endDateYearField () {
    return cy.get('#end-date-year');
  }
}

export default new reportsPage();