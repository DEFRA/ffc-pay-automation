class paymentAlertsPage {

  subHeader () {
    return cy.get('.govuk-heading-l');
  }

  pageDescription () {
    return cy.get('.govuk-grid-column-full > :nth-child(2)');
  }

  findOutMore () {
    return cy.get('.govuk-grid-column-full > :nth-child(3)');
  }

  alertsInformationLink () {
    return cy.get('.govuk-grid-column-full > :nth-child(3) > .govuk-link');
  }

  addNewRecipientButton () {
    return cy.get('.govuk-button');
  }

  showAllSectionsButton () {
    return cy.get('.govuk-accordion__show-all > .govuk-accordion-nav__chevron');
  }

  sfi22Label () {
    return cy.get('#scheme-accordion-heading-1 > .govuk-accordion__section-heading-text-focus');
  }

  sfi22Show () {
    return cy.get(':nth-child(2) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  sfiPilotLabel () {
    return cy.get('#scheme-accordion-heading-2 > .govuk-accordion__section-heading-text-focus');
  }

  sfiPilotShow () {
    return cy.get(':nth-child(3) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  lumpSumsLabel () {
    return cy.get('#scheme-accordion-heading-3 > .govuk-accordion__section-heading-text-focus');
  }

  lumpSumsShow () {
    return cy.get(':nth-child(4) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  vetVisitsLabel () {
    return cy.get('#scheme-accordion-heading-4 > .govuk-accordion__section-heading-text-focus');
  }

  vetVisitsShow () {
    return cy.get(':nth-child(5) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  countrysideStewardshipLabel () {
    return cy.get('#scheme-accordion-heading-5 > .govuk-accordion__section-heading-text-focus');
  }

  countrysideStewardshipShow () {
    return cy.get(':nth-child(6) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  basicPaymentSchemeLabel () {
    return cy.get('#scheme-accordion-heading-6 > .govuk-accordion__section-heading-text-focus');
  }

  basicPaymentSchemeShow () {
    return cy.get(':nth-child(7) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  manualInjectionLabel () {
    return cy.get('#scheme-accordion-heading-7 > .govuk-accordion__section-heading-text-focus');
  }

  manualInjectionShow () {
    return cy.get(':nth-child(8) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  environmentalStewardshipLabel () {
    return cy.get('#scheme-accordion-heading-8 > .govuk-accordion__section-heading-text-focus');
  }

  environmentalStewardshipShow () {
    return cy.get(':nth-child(9) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  impsLabel () {
    return cy.get('#scheme-accordion-heading-9 > .govuk-accordion__section-heading-text-focus');
  }

  impsShow () {
    return cy.get(':nth-child(10) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  forestryCommissionLabel () {
    return cy.get('#scheme-accordion-heading-10 > .govuk-accordion__section-heading-text-focus');
  }

  forestryCommissionShow () {
    return cy.get(':nth-child(11) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  sfi23Label () {
    return cy.get('#scheme-accordion-heading-11 > .govuk-accordion__section-heading-text-focus');
  }

  sfi23Show () {
    return cy.get(':nth-child(12) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  delinkedPaymentsLabel () {
    return cy.get('#scheme-accordion-heading-12 > .govuk-accordion__section-heading-text-focus');
  }

  delinkedPaymentsShow () {
    return cy.get(':nth-child(13) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  expandedSFIOfferLabel () {
    return cy.get('#scheme-accordion-heading-13 > .govuk-accordion__section-heading-text-focus');
  }

  expandedSFIOfferShow () {
    return cy.get(':nth-child(14) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  cshtRevenueLabel () {
    return cy.get('#scheme-accordion-heading-14 > .govuk-accordion__section-heading-text-focus');
  }

  cshtRevenueShow () {
    return cy.get(':nth-child(15) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  cshtCapitalLabel () {
    return cy.get('#scheme-accordion-heading-15 > .govuk-accordion__section-heading-text-focus');
  }

  cshtCapitalShow () {
    return cy.get(':nth-child(16) > .govuk-accordion__section-header > .govuk-accordion__section-heading > .govuk-accordion__section-button > .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus > .govuk-accordion-nav__chevron');
  }

  addNewSubHeader () {
    return cy.get('.govuk-heading-l');
  }

  addNewEmailLabel () {
    return cy.get('form > :nth-child(4) > .govuk-label');
  }

  addNewEmailField () {
    return cy.get('#emailAddress');
  }

  addNewSelectSchemeLabel () {
    return cy.get('form > :nth-child(5) > .govuk-label');
  }

  addNewSelectSchemeDropdown () {
    return cy.get('#selectView');
  }

  addNewSFI22All () {
    return cy.get('#sfi-22-all');
  }

  addNewInvalidEmailError () {
    return cy.get('.govuk-error-message');
  }

  createNewAlertRecipientButton () {
    return cy.get('#submit');
  }
}

export default new paymentAlertsPage();