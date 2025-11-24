class enterYourDelinkedPaymentReferencePage {

  subHeader () {
    return cy.get('.govuk-heading-l');
  }

  paragraphOne () {
    return cy.get('form > :nth-child(3)');
  }

  paragraphTwo () {
    return cy.get('form > :nth-child(4)');
  }

  paragraphThree () {
    return cy.get('form > :nth-child(5)');
  }

  bulletLineOne () {
    return cy.get('.govuk-list > :nth-child(1)');
  }

  bulletLineTwo () {
    return cy.get('.govuk-list > :nth-child(2)');
  }

  paragraphFour () {
    return cy.get('form > :nth-child(7)');
  }

  paragraphFive () {
    return cy.get('#value-hint');
  }

  valueField () {
    return cy.get('#value');
  }

  calculateButton () {
    return cy.get('#submit');
  }

  errorMessage () {
    return cy.get('#value-error');
  }

}

export default new enterYourDelinkedPaymentReferencePage();