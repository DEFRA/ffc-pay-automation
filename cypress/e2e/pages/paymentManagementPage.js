class paymentManagementPage {

  applicationHeader () {
    return cy.get('.govuk-service-navigation__text')
  }

  signOutLink () {
    return cy.get('.govuk-service-navigation__link')
  }

  pageHeader () {
    return cy.get('.govuk-heading-l')
  }

  mainHeader () {
    return cy.get('.govuk-heading-xl')
  }

  subHeader () {
    return cy.get('.govuk-heading-l')
  }

  header () {
    return cy.get('h1.govuk-heading-l')
  }

  reportsHeader () {
    return cy.get(':nth-child(2) > :nth-child(1) > .govuk-heading-m')
  }

  reportsDescription () {
    return cy.get(':nth-child(2) > :nth-child(1) > .govuk-hint')
  }

  reportsLink () {
    return cy.get(':nth-child(2) > :nth-child(1) > .govuk-list > li > .govuk-link')
  }

  paymentEventsHeader () {
    return cy.get(':nth-child(2) > :nth-child(2) > .govuk-heading-m')
  }

  paymentEventsDescription () {
    return cy.get(':nth-child(2) > :nth-child(2) > .govuk-hint')
  }

  monitoringLink () {
    return cy.get(':nth-child(2) > :nth-child(2) > .govuk-list > :nth-child(1) > .govuk-link')
  }

  schemesLink () {
    return cy.get(':nth-child(2) > .govuk-list > :nth-child(2) > .govuk-link')
  }

  paymentHoldsHeader () {
    return cy.get(':nth-child(3) > :nth-child(1) > .govuk-heading-m')
  }

  paymentHoldsDescription () {
    return cy.get(':nth-child(3) > :nth-child(1) > .govuk-hint')
  }

  manageHoldsLink () {
    return cy.get(':nth-child(3) > :nth-child(1) > .govuk-list > li > .govuk-link')
  }

  manualPaymentsHeader () {
    return cy.get(':nth-child(3) > :nth-child(2) > .govuk-heading-m')
  }

  manualPaymentsDescription () {
    return cy.get(':nth-child(3) > :nth-child(2) > .govuk-hint')
  }

  manualPaymentUploadLink () {
    return cy.get(':nth-child(3) > :nth-child(2) > .govuk-list > li > .govuk-link')
  }

  agreementClosuresHeader () {
    return cy.get(':nth-child(4) > :nth-child(1) > .govuk-heading-m')
  }

  agreementClosuresDescription () {
    return cy.get(':nth-child(4) > :nth-child(1) > .govuk-hint')
  }

  manageClosuresLink () {
    return cy.get(':nth-child(4) > :nth-child(1) > .govuk-list > :nth-child(1) > .govuk-link')
  }

  agreementClosuresLink () {
    return cy.get(':nth-child(1) > .govuk-list > :nth-child(2) > .govuk-link')
  }

  bulkAgreementClosuresLink () {
    return cy.get(':nth-child(3) > .govuk-link')
  }

  emailAlertsHeader () {
    return cy.get(':nth-child(4) > :nth-child(2) > .govuk-heading-m')
  }

  emailAlertsDescription () {
    return cy.get(':nth-child(4) > :nth-child(2) > .govuk-hint')
  }

  alertsLink () {
    return cy.get(':nth-child(4) > :nth-child(2) > .govuk-list > li > .govuk-link')
  }

  statementsHeader () {
    return cy.get(':nth-child(5) > :nth-child(1) > .govuk-heading-m')
  }

  statementsDescription () {
    return cy.get(':nth-child(5) > :nth-child(1) > .govuk-hint')
  }

  downloadStatementsLink () {
    return cy.get(':nth-child(5) > :nth-child(1) > .govuk-list > li > .govuk-link')
  }

  metricsHeader () {
    return cy.get(':nth-child(5) > :nth-child(2) > .govuk-heading-m')
  }

  metricsDescription () {
    return cy.get(':nth-child(5) > :nth-child(2) > .govuk-hint')
  }

  managementInformationLink () {
    return cy.get(':nth-child(5) > :nth-child(2) > .govuk-list > li > .govuk-link')
  }

  resetPaymentRequestsHeader () {
    return cy.get(':nth-child(6) > .govuk-card--dashboard > .govuk-heading-m')
  }

  resetPaymentRequestsDescription () {
    return cy.get(':nth-child(6) > .govuk-card--dashboard > .govuk-hint')
  }

  resetPaymentRequestsLink () {
    return cy.get(':nth-child(6) > .govuk-card--dashboard > .govuk-list > li > .govuk-link')
  }

  cookieBannerHeader () {
    return cy.get('.govuk-cookie-banner__heading')
  }

  cookieBannerContentOne () {
    return cy.get('.js-question-banner > .govuk-grid-row > .govuk-grid-column-two-thirds > .govuk-cookie-banner__content > :nth-child(1)')
  }

  cookieBannerContentTwo () {
    return cy.get('.govuk-cookie-banner__content > :nth-child(2)')
  }

  cookieBannerAcceptBtn () {
    return cy.get('.js-cookies-button-accept')
  }

  cookieBannerRejectBtn () {
    return cy.get('.js-cookies-button-reject')
  }

  cookieBannerViewLink () {
    return cy.get('.govuk-button-group > .govuk-link')
  }

  cookieBannerAcceptedMessage () {
    return cy.get('.js-cookies-accepted > .govuk-grid-row > .govuk-grid-column-two-thirds > .govuk-cookie-banner__content > .govuk-body')
  }

  cookieBannerRejectedMessage () {
    return cy.get('.js-cookies-rejected > .govuk-grid-row > .govuk-grid-column-two-thirds > .govuk-cookie-banner__content > .govuk-body')
  }

  cookieBannerAcceptedHideBtn () {
    return cy.get('.js-cookies-accepted > .govuk-button-group > .govuk-button')
  }

  cookieBannerRejectedHideBtn () {
    return cy.get('.js-cookies-rejected > .govuk-button-group > .govuk-button')
  }
}

export default new paymentManagementPage()