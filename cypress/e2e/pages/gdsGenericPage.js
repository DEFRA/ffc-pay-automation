class GDSGenericPage {
  heading (text) {
    return cy.contains('h1, h2, h3', text)
      .containsWithoutWhitespace(text)
  }

  paragraph (text) {
    return cy.contains('p', text)
      .containsWithoutWhitespace(text)
  }

  hint (text) {
    return cy.contains('.govuk-hint', text)
      .containsWithoutWhitespace(text)
  }

  listItem (text) {
    return cy.contains('li', text)
      .containsWithoutWhitespace(text)
  }

  link (text) {
    return cy.contains('a', text)
      .containsWithoutWhitespace(text)
  }

  label (text) {
    return cy.contains('.govuk-label', text)
      .containsWithoutWhitespace(text)
  }

  button (text) {
    return cy.contains('button', text)
      .containsWithoutWhitespace(text)
  }

  strong (text) {
    return cy.contains('strong', text)
      .containsWithoutWhitespace(text)
  }

  detailsSummary (text) {
    return cy.contains('.govuk-details__summary-text', text)
      .containsWithoutWhitespace(text)
  }

  warningText (text) {
    return cy.contains('.govuk-warning-text__text', text)
      .containsWithoutWhitespace(text)
  }

  verifyText (text) {
    return cy.contains(text).containsWithoutWhitespace(text)
  }

  accordionText (text ) {
    return cy.contains('.govuk-accordion__section-heading-text-focus',text)
  }

  accordionLink (text) {
    return cy.contains('.govuk-accordion__show-all-text, .govuk-accordion__section-toggle-text', text)
      .containsWithoutWhitespace(text)
  }

  accordionSection (text) {
    return cy.contains( '.govuk-accordion__section-button',text)
  }

  insetText (text) {
    return cy.contains ('.govuk-inset-text', text)
  }

  fileInput () {
    return cy.get('#file-input')
  }

  //scheme dropdown locator ID's are not centralized yet, so you can easily add more here.
  schemeDropdown () {
    const selectors = [ '#schemeId',  '#user-search-scheme', '#selectScheme' ]
    return cy.get(selectors.join(', '))
  }

  schemeOption (text) {
    return this.schemeDropdown()
      .contains('option', text)
      .containsWithoutWhitespace(text)
  }

  field (field) {
    const fields = {
      scheme: '#schemeId, #user-search-scheme, #selectScheme',
      frn: '#frn, #user-search-frn',
      'email address': '#emailAddress',
      'agreement number': '#agreement',
      year: '#year',
      'marketing year': '#marketingYear',
      month: '#month',
      day: '#day',
      'payment hold search': '#payment-hold-search',
      'closure search': '#closure-search',
      filename: '#filename',
      timestamp: '#timestamp',
      prn: '#prn'
    }

    const selector = fields[field]

    if (!selector) {
      throw new Error(`No selector configured for field "${field}"`)
    }

    return cy.get(selector)
  }

}

export default new GDSGenericPage()