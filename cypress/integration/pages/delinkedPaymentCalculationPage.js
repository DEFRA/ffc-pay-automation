class delinkedPaymentCalculationPage {

  subHeader () {
    return cy.get('.govuk-panel__title');
  }

  twentyTwentyFourTab () {
    return cy.get('#tab_year2024');
  }

  twentyTwentyFiveTab () {
    return cy.get('#tab_year2025');
  }

  twentyTwentySixTab () {
    return cy.get('#tab_year2026');
  }

  twentyTwentySevenTab () {
    return cy.get('#tab_year2027');
  }



  paragraphOne () {
    return cy.get('[aria-labelledby="tab_year2025"] > #year2025 > :nth-child(1)');
  }

  paragraphTwo () {
    return cy.get('#year2025 > :nth-child(3)');
  }

  estimatedPaymentHeader () {
    return cy.get('#year2025 > :nth-child(2) > .govuk-table__caption');
  }

  schemeYear () {
    return cy.get('#year2025 > :nth-child(2) > .govuk-table__body > .govuk-table__row > .govuk-table__header');
  }

  totalEstimatedReduction () {
    return cy.get('#year2025 > :nth-child(2) > .govuk-table__body > .govuk-table__row > :nth-child(2)');
  }

  totalEstimatedPayment () {
    return cy.get('#year2025 > :nth-child(2) > .govuk-table__body > .govuk-table__row > .govuk-body');
  }

  progressiveReductionHeader () {
    return cy.get('#year2025 > :nth-child(4) > .govuk-table__caption');
  }

  paymentBand () {
    return cy.get('#year2025 > :nth-child(4) > .govuk-table__head > .govuk-table__row > .govuk-table__header--numeric');
  }
  thirtyKOrLess () {
    return cy.get('#year2025 > :nth-child(4) > .govuk-table__body > :nth-child(1) > .govuk-table__cell');
  }

  totalProgressiveReduction () {
    return cy.get('#year2025 > :nth-child(4) > .govuk-table__body > :nth-child(2) > .govuk-table__cell');
  }

  percentageReductionHeader () {
    return cy.get('#year2025 > :nth-child(5) > .govuk-table__caption');
  }

  schemeYearTwo () {
    return cy.get('#year2025 > :nth-child(5) > .govuk-table__head > .govuk-table__row > .govuk-table__header--numeric');
  }

  thirtyKOrLessTwo () {
    return cy.get('#year2025 > :nth-child(5) > .govuk-table__body > .govuk-table__row > .govuk-table__cell');
  }
}

export default new delinkedPaymentCalculationPage();