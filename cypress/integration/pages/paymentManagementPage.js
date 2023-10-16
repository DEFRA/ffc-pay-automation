class paymentManagementPage {
  header () {
    return cy.get('h1.govuk-heading-l');
  }
}

export default new paymentManagementPage();