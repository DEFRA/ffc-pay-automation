class PaymentManagementPage {
  applicationHeader () {
    return cy.get('.govuk-service-navigation__text')
  }

  signOutLink () {
    return cy.get('.govuk-service-navigation__link')
  }

  pageHeader () {
    return cy.get('.govuk-heading-l').first()
  }

  mainHeader () {
    return cy.get('.govuk-heading-xl').first()
  }

  subHeader () {
    return cy.get('.govuk-heading-l').first()
  }

  header () {
    return cy.get('h1').first()
  }

  // ---------------------------+
  // Generic Card Helpers       |
  // ---------------------------+

  card (cardTitle) {
    return cy
      .contains('.govuk-heading-m', cardTitle)
      .closest('.govuk-card--dashboard')
  }

  cardHeader (cardTitle) {
    return this.card(cardTitle)
      .find('.govuk-heading-m')
  }

  cardDescription (cardTitle) {
    return this.card(cardTitle)
      .find('.govuk-hint')
  }

  cardLink (cardTitle, linkText) {
    return this.card(cardTitle)
      .contains('.govuk-link', linkText)
  }

  cardLinks (cardTitle) {
    return this.card(cardTitle)
      .find('.govuk-link')
  }

  // ---------------------------+
  // Convenience wrappers       |
  // ---------------------------+

  reportsCard () {
    return this.card('Reports')
  }

  paymentEventsCard () {
    return this.card('Payment Events')
  }

  paymentHoldsCard () {
    return this.card('Payment Holds')
  }

  manualPaymentsCard () {
    return this.card('Manual Payments')
  }

  agreementClosuresCard () {
    return this.card('Agreement Closures')
  }

  emailAlertsCard () {
    return this.card('Email Alerts')
  }

  statementsCard () {
    return this.card('Statements')
  }

  metricsCard () {
    return this.card('Metrics')
  }

  resetPaymentRequestsCard () {
    return this.card('Reset Payment Requests')
  }

  // -----------------------+
  // Cookie Banner          |
  // -----------------------+

  cookieBannerHeader () {
    return cy.get('.govuk-cookie-banner__heading')
  }

  cookieBannerContentOne () {
    return cy.get('.js-question-banner .govuk-cookie-banner__content')
      .find('p')
      .first()
  }

  cookieBannerContentTwo () {
    return cy.get('.govuk-cookie-banner__content')
      .find('p')
      .eq(1)
  }

  cookieBannerAcceptBtn () {
    return cy.get('.js-cookies-button-accept')
  }

  cookieBannerRejectBtn () {
    return cy.get('.js-cookies-button-reject')
  }

  cookieBannerViewLink () {
    return cy.get('.govuk-button-group .govuk-link')
  }

  cookieBannerAcceptedMessage () {
    return cy.get('.js-cookies-accepted .govuk-body')
  }

  cookieBannerRejectedMessage () {
    return cy.get('.js-cookies-rejected .govuk-body')
  }

  cookieBannerAcceptedHideBtn () {
    return cy.get('.js-cookies-accepted .govuk-button')
  }

  cookieBannerRejectedHideBtn () {
    return cy.get('.js-cookies-rejected .govuk-button')
  }
}

export default new PaymentManagementPage()