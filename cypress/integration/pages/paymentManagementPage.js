class paymentManagementPage {
  header () {
    return cy.get('h1.govuk-heading-l');
  }

  subHeader () {
    return cy.get('.govuk-heading-l');
  }

  tableCaption () {
    return cy.get('.govuk-table__caption');
  }
}

export default new paymentManagementPage();