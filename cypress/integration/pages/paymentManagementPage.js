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

  agreementClosuresHeader () {
    return cy.get('.govuk-card--dashboard').eq(4).find('h2.govuk-heading-m');
  }

  agreementClosuresCount () {
    return cy.get('.govuk-card--dashboard').eq(4).find('p.govuk-heading-l');
  }

  noOfClosures () {
    return cy.get(':nth-child(3) > :nth-child(2) > .govuk-heading-l');
  }
}

export default new paymentManagementPage();