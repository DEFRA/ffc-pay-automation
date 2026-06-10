class privacyNoticePage {

  pageHeader () {
    return cy.get('.govuk-heading-l')
  }

  descriptionOne () {
    return cy.get('.govuk-grid-column-full > :nth-child(2)')
  }

  descriptionTwo () {
    return cy.get('.govuk-grid-column-full > :nth-child(3)')
  }

  descriptionThree () {
    return cy.get('.govuk-grid-column-full > :nth-child(4)')
  }

  bulletPointOne () {
    return cy.get('.govuk-grid-column-full > :nth-child(5) > :nth-child(1)')
  }

  bulletPointTwo () {
    return cy.get(':nth-child(5) > :nth-child(2)')
  }

  bulletPointThree () {
    return cy.get(':nth-child(5) > :nth-child(3)')
  }

  descriptionFour () {
    return cy.get('.govuk-grid-column-full > :nth-child(6)')
  }

  whatDataSubheader () {
    return cy.get('.govuk-grid-column-full > :nth-child(7)')
  }

  whatDataDescriptionOne () {
    return cy.get('.govuk-grid-column-full > :nth-child(8)')
  }

  whatDataBulletPointOne () {
    return cy.get(':nth-child(9) > :nth-child(1)')
  }

  whatDataBulletPointTwo () {
    return cy.get(':nth-child(9) > :nth-child(2)')
  }

  whatDataDescriptionTwo () {
    return cy.get('.govuk-grid-column-full > :nth-child(10)')
  }

  whatDataDescriptionThree () {
    return cy.get(':nth-child(11)')
  }

  whatDataBulletPointThree () {
    return cy.get(':nth-child(12) > :nth-child(1)')
  }

  whatDataBulletPointFour () {
    return cy.get(':nth-child(12) > :nth-child(2)')
  }

  whatDataBulletPointFive () {
    return cy.get(':nth-child(12) > :nth-child(3)')
  }

  whatDataBulletPointSix () {
    return cy.get(':nth-child(12) > :nth-child(4)')
  }

  whatDataDescriptionFour () {
    return cy.get(':nth-child(13)')
  }

  whatDataMoreInfoLink () {
    return cy.get(':nth-child(14) > a')
  }

  whyWeNeedDataSubheader () {
    return cy.get(':nth-child(15)')
  }

  whyWeNeedDataDescriptionOne () {
    return cy.get(':nth-child(16)')
  }

  whyWeNeedDataBulletPointOne () {
    return cy.get(':nth-child(17) > :nth-child(1)')
  }

  whyWeNeedDataBulletPointTwo () {
    return cy.get(':nth-child(17) > :nth-child(2)')
  }

  whyWeNeedDataBulletPointThree () {
    return cy.get(':nth-child(17) > :nth-child(3)')
  }

  whyWeNeedDataDescriptionTwo () {
    return cy.get(':nth-child(18)')
  }

  whyWeNeedDataDescriptionThree () {
    return cy.get(':nth-child(19)')
  }

  whyWeNeedDataBulletPointFour () {
    return cy.get(':nth-child(20) > :nth-child(1)')
  }

  whyWeNeedDataBulletPointFive () {
    return cy.get(':nth-child(20) > :nth-child(2)')
  }

  whyWeNeedDataBulletPointSix () {
    return cy.get(':nth-child(20) > :nth-child(3)')
  }

  whatWeDoSubheader () {
    return cy.get(':nth-child(21)')
  }

  whatWeDoDescriptionOne () {
    return cy.get(':nth-child(22)')
  }

  whatWeDoDescriptionTwo () {
    return cy.get(':nth-child(23)')
  }

  whatWeDoBulletPointOne () {
    return cy.get(':nth-child(24) > :nth-child(1)')
  }

  whatWeDoBulletPointTwo () {
    return cy.get(':nth-child(24) > :nth-child(2)')
  }

  whereDataIsProcessedSubheader () {
    return cy.get(':nth-child(25)')
  }

  whereDataIsProcessedDescription () {
    return cy.get(':nth-child(26)')
  }

  howWeProtectDataSubheader () {
    return cy.get(':nth-child(27)')
  }

  howWeProtectDataDescription () {
    return cy.get(':nth-child(28)')
  }

  yourRightsSubheader () {
    return cy.get(':nth-child(29)')
  }

  yourRightsDescriptionOne () {
    return cy.get(':nth-child(30)')
  }

  yourRightsBulletPointOne () {
    return cy.get(':nth-child(31) > :nth-child(1)')
  }

  yourRightsBulletPointTwo () {
    return cy.get(':nth-child(31) > :nth-child(2)')
  }

  yourRightsBulletPointThree () {
    return cy.get(':nth-child(31) > :nth-child(3)')
  }

  yourRightsDescriptionTwo () {
    return cy.get(':nth-child(32)')
  }

  yourRightsBulletPointFour () {
    return cy.get(':nth-child(33) > :nth-child(1)')
  }

  yourRightsBulletPointFive () {
    return cy.get(':nth-child(33) > :nth-child(2)')
  }

  yourRightsBulletPointSix () {
    return cy.get(':nth-child(33) > :nth-child(3)')
  }

  yourRightsDescriptionThree () {
    return cy.get(':nth-child(34)')
  }

  otherLinksSubheader () {
    return cy.get(':nth-child(35)')
  }

  otherLinksDescriptionOne () {
    return cy.get(':nth-child(36)')
  }

  otherLinksDescriptionTwo () {
    return cy.get(':nth-child(37)')
  }

  followingLinksSubheader () {
    return cy.get('.govuk-heading-s')
  }

  followingLinksDescription () {
    return cy.get(':nth-child(39)')
  }

  contactInfoSubheader () {
    return cy.get(':nth-child(40)')
  }

  contactInfoDescription () {
    return cy.get(':nth-child(41)')
  }

  contactInfoAddress () {
    return cy.get(':nth-child(42)')
  }

  lastUpdatedNotice () {
    return cy.get('.govuk-inset-text')
  }
}

export default new privacyNoticePage()