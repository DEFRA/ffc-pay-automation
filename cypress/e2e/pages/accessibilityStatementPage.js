class accessibilityStatementPage {

  pageHeader () {
    return cy.get('.govuk-heading-l')
  }

  descriptionOne () {
    return cy.get('.govuk-grid-column-full > :nth-child(2)')
  }

  bulletPointOne () {
    return cy.get('.govuk-grid-column-full > :nth-child(3) > :nth-child(1)')
  }

  bulletPointTwo () {
    return cy.get('.govuk-grid-column-full > :nth-child(3) > :nth-child(2)')
  }

  bulletPointThree () {
    return cy.get(':nth-child(3) > :nth-child(3)')
  }

  bulletPointFour () {
    return cy.get(':nth-child(3) > :nth-child(4)')
  }

  bulletPointFive () {
    return cy.get(':nth-child(3) > :nth-child(5)')
  }

  descriptionTwo () {
    return cy.get('.govuk-grid-column-full > :nth-child(4)')
  }

  descriptionThree () {
    return cy.get('.govuk-grid-column-full > :nth-child(5)')
  }

  howAccessibleSubheader () {
    return cy.get('.govuk-grid-column-full > :nth-child(6)')
  }

  howAccessibleDescription () {
    return cy.get('.govuk-grid-column-full > :nth-child(7)')
  }

  feebackSubheader () {
    return cy.get('.govuk-grid-column-full > :nth-child(8)')
  }

  feedbackDescription () {
    return cy.get('.govuk-grid-column-full > :nth-child(9)')
  }

  enforcementProcedureSubheader () {
    return cy.get('.govuk-grid-column-full > :nth-child(10)')
  }

  enforcementProcedureDescription () {
    return cy.get(':nth-child(11)')
  }

  technicalInformationSubheader () {
    return cy.get(':nth-child(12)')
  }

  technicalInformationDescription () {
    return cy.get(':nth-child(13)')
  }

  complianceStatusSubheader () {
    return cy.get('.govuk-heading-s')
  }

  complianceStatusDescription () {
    return cy.get(':nth-child(15)')
  }

  improvingAccessibilitySubheader () {
    return cy.get(':nth-child(16)')
  }

  improvingAccessibilityDescription () {
    return cy.get(':nth-child(17)')
  }

  improvingAccessibilityBulletPointOne () {
    return cy.get(':nth-child(18) > :nth-child(1)')
  }

  improvingAccessibilityBulletPointTwo () {
    return cy.get(':nth-child(18) > :nth-child(2)')
  }

  preparationSubheader () {
    return cy.get(':nth-child(19)')
  }

  preparationDescriptionOne () {
    return cy.get(':nth-child(20)')
  }

  preparationDescriptionTwo () {
    return cy.get(':nth-child(21)')
  }
}

export default new accessibilityStatementPage()