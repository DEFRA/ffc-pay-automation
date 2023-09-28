class prCalPage {
  prCalUrl () {
    return 'https://calculate-direct-payment-reductions.defra.gov.uk';
  }

  startingAmountField () {
    return cy.get('#value');
  }

  acceptCookiesButton () {
    return cy.get('.js-cookies-button-accept');
  }
}

export default new prCalPage();