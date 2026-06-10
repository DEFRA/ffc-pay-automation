class cookiesPage {

  pageHeader () {
    return cy.get('.govuk-heading-l')
  }

  descriptionOne () {
    return cy.get('#main-content > :nth-child(2)')
  }

  descriptionTwo () {
    return cy.get('#main-content > :nth-child(3)')
  }

  essentialCookiesSubheader () {
    return cy.get('#main-content > :nth-child(4)')
  }

  essentialCookiesDescription () {
    return cy.get('#main-content > :nth-child(5)')
  }

  essentialCookiesName () {
    return cy.get(':nth-child(6) > .govuk-table__body > .govuk-table__row > :nth-child(1)')
  }

  essentialCookiesPurpose () {
    return cy.get(':nth-child(6) > .govuk-table__body > .govuk-table__row > :nth-child(2)')
  }

  essentialCookiesExpires () {
    return cy.get(':nth-child(6) > .govuk-table__body > .govuk-table__row > :nth-child(3)')
  }

  analyticsCookiesSubheader () {
    return cy.get('#main-content > :nth-child(7)')
  }

  analyticsDescriptionOne () {
    return cy.get('#main-content > :nth-child(8)')
  }

  analyticsDescriptionTwo () {
    return cy.get('#main-content > :nth-child(9)')
  }

  analyticsDescriptionThree () {
    return cy.get('#main-content > :nth-child(10)')
  }

  analyticsBulletPointOne () {
    return cy.get('.govuk-list > :nth-child(1)')
  }

  analyticsBulletPointTwo () {
    return cy.get('.govuk-list > :nth-child(2)')
  }

  analyticsBulletPointThree () {
    return cy.get('.govuk-list > :nth-child(3)')
  }

  analyticsCookiesNameOne () {
    return cy.get(':nth-child(12) > .govuk-table__body > :nth-child(1) > :nth-child(1)')
  }

  analyticsCookiesNameTwo () {
    return cy.get('.govuk-table__body > :nth-child(2) > :nth-child(1)')
  }

  analyticsCookiesPurposeOne () {
    return cy.get(':nth-child(12) > .govuk-table__body > :nth-child(1) > :nth-child(2)')
  }

  analyticsCookiesPurposeTwo () {
    return cy.get('.govuk-table__body > :nth-child(2) > :nth-child(2)')
  }

  analyticsCookiesExpiresOne () {
    return cy.get(':nth-child(12) > .govuk-table__body > :nth-child(1) > :nth-child(3)')
  }

  analyticsCookiesExpiresTwo () {
    return cy.get('.govuk-table__body > :nth-child(2) > :nth-child(3)')
  }

  acceptAnalyticsCookiesSubheader () {
    return cy.get('#main-content > .govuk-grid-row > .govuk-grid-column-two-thirds > .govuk-heading-m')
  }

  acceptAnalyticsCookiesDescription () {
    return cy.get('.govuk-fieldset__legend')
  }

  acceptAnalyticsYesBtn () {
    return cy.get(':nth-child(1) > .govuk-label')
  }

  acceptAnalyticsNoBtn () {
    return cy.get(':nth-child(2) > .govuk-label')
  }

  saveCookieSettingsBtn () {
    return cy.get('#submit')
  }

  cookiePreferencesBannerHeader () {
    return cy.get('#govuk-notification-banner-title')
  }

  cookiePreferencesBannerDescription () {
    return cy.get('.govuk-notification-banner__heading')
  }

  backToPageLink () {
    return cy.get('.govuk-notification-banner__link')
  }
}

export default new cookiesPage()