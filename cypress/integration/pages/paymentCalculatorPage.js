class paymentCalculatorPage {
  subHeader () {
    return cy.get('.govuk-heading-l');
  }

  paragraphOne () {
    return cy.get('.govuk-main-wrapper > .govuk-grid-row > .govuk-grid-column-two-thirds > :nth-child(2)');
  }

  paragraphTwo () {
    return cy.get('.govuk-grid-column-two-thirds > :nth-child(3)');
  }

  paragraphThree () {
    return cy.get('.govuk-grid-column-two-thirds > :nth-child(4)');
  }

  paragraphFour () {
    return cy.get('.govuk-grid-column-two-thirds > :nth-child(6)');
  }

  startButton () {
    return cy.get('#submit');
  }

  paragraphFive () {
    return cy.get('.govuk-grid-column-two-thirds > :nth-child(8)');
  }

  paragraphSix () {
    return cy.get('.govuk-grid-column-two-thirds > :nth-child(9)');
  }

  paragraphSeven () {
    return cy.get('.govuk-grid-column-two-thirds > :nth-child(10)');
  }

  paragraphEight () {
    return cy.get('.govuk-grid-column-two-thirds > :nth-child(11)');
  }

  relatedContentTitle () {
    return cy.get('#subsection-title');
  }

  relatedContentLinkOne () {
    return cy.get(':nth-child(1) > .govuk-link');
  }

  relatedContentLinkTwo () {
    return cy.get('#farming-is-changing-link');
  }
}

export default new paymentCalculatorPage();