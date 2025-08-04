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
    return cy.get('#select-type');
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

  spinner () {
    return cy.get('.govuk-spinner');
  }

  availableReports () {
    return cy.get('.govuk-task-list__name-and-hint > .govuk-link');
  }

  statusReportYearDropdown () {
    return cy.get('#report-year');
  }

  statusReportSchemeDropdown () {
    return cy.get('#select-type');
  }
}

export default new reportsPage();