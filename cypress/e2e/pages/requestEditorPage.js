import { resolveDate, getTodayDateParts } from  '../../utils/date.js'

class requestEditorPage {
  errorSummaryTitle () {
    return cy.get('.govuk-error-summary__title')
  }

  errorSummaryItem () {
    return cy.get('.govuk-list > li > a')
  }

  inputByValue (val) {
    return cy.get(`input[value="${val}"]`)
  }

  inputById (id) {
    return cy.get(`input[id="${id}"]`)
  }

  txtFrn () {
    return this.inputById('frn')
  }

  txtApplicationIdentifier () {
    return this.inputById('applicationIdentifier')
  }

  txtNetValue () {
    return this.inputById('net')
  }

  txtDay () {
    return this.inputById('debt-discovered-day')
  }

  txtMonth () {
    return this.inputById('debt-discovered-month')
  }

  txtYear () {
    return this.inputById('debt-discovered-year')
  }

  schemeDropdown () {
    return cy.get('#scheme')
  }


  unattachedReportingDatasetsCount () {
    return cy.get('.govuk-heading-xl').first()
  }

  getFrnSearchField () {
    return cy.get('#user-search-frn')
  }

  getFrnSearchButton () {
    return cy.get('form > .govuk-button')
  }

  firstFRN () {
    return cy.get('.govuk-table__body').first().find('.govuk-table__cell').eq(2)
  }

  firstCaptureFRN () {
    return cy.get('.govuk-table__body').first().find('.govuk-table__cell').eq(1)
  }

  firstFRNManualLedger () {
    return cy.get('.govuk-table__body > .govuk-table__row > :nth-child(3)')
  }

  lastFRN () {
    return cy.get('.govuk-table__row').last().find('.govuk-table__cell').eq(2)
  }

  applicationIdentifierHeader () {
    return cy.get('[for="applicationIdentifier"]')
  }

  applicationIdentifierHint () {
    return cy.get('#applicationIdentifier-hint')
  }

  applicationIdentifierError () {
    return cy.get('#applicationIdentifier-error')
  }

  recordsPerPageDropdown () {
    return cy.get('#perPage')
  }

  paymentHoldsRecordsPerPageDropdown () {
    return cy.get('#records')
  }

  dataSetRecords () {
    return cy.get('tbody > tr')
  }

  pageNumber () {
    return cy.get('.govuk-pagination__item')
  }

  btnNext () {
    return cy.get('[rel="next"] > .govuk-pagination__link-title')
  }

  btnPrevious () {
    return cy.get('[rel="prev"] > .govuk-pagination__link-title')
  }
  administrativeRadioButton () {
    return cy.get('#debt-type-2')
  }

  dayInput () {
    return cy.get('#debt-discovered-date-day')
  }

  monthInput () {
    return cy.get('#debt-discovered-date-month')
  }

  yearInput () {
    return cy.get('#debt-discovered-date-year')
  }

  unattachedDataNoButton () {
    return cy.get('#unattached-data-no')
  }

  unattachedDataYesButton () {
    return cy.get('#unattached-data-yes')
  }

  awaitingRepFRNSearchBtn () {
    return cy.get('form > .govuk-button')
  }
  enterDebtDiscoveredDate ({ day, month, year }) {
    this.txtDay().type(day)
    this.txtMonth().type(month)
    this.txtYear().type(year)
  }

  assertSummaryRow (label, expectedValue) {
    cy.contains('.govuk-summary-list__row', label)
      .within(() => {
        cy.get('.govuk-summary-list__value')
          .should('be.visible')
          .and('contain.text', expectedValue)
      })
  }
  verifyDatasetSummary (data) {
    this.assertSummaryRow('Scheme', data.scheme)
    this.assertSummaryRow('FRN (Firm Reference Number)', data.frn)
    this.assertSummaryRow('Agreement / claim number', data.agreementNumber)
    this.assertSummaryRow('Net value', data.netValue)
    this.assertSummaryRow('Debt type', data.typeOfDebt)
    this.assertSummaryRow(
      'Date debt discovered',
      resolveDate(data.dateDebtDiscovered)
    )
  }

  createDataset (dataset) {
    cy.get('#scheme').select(dataset.scheme)
    this.txtFrn().type(dataset.frn)
    if (dataset.agreementNumber) {
      this.txtApplicationIdentifier()
        .type(dataset.agreementNumber)
    }
    this.txtNetValue().type(dataset.netValue)
    this.inputByValue(dataset.typeOfDebt).click()
    if (dataset.dateDebtDiscovered === 'today') {
      this.enterDebtDiscoveredDate(
        getTodayDateParts()
      )
    }

  }
  assertRowPresent (value) {
    cy.contains('tr', value)
      .should('exist')
  }

  assertTableRow (expectedValues, rowNumber = 1) {

    cy.get('.govuk-table__body tr')
      .eq(rowNumber - 1)
      .within(() => {

        expectedValues.forEach(value => {
          cy.contains(value)
        })

      })
  }

  assertSchemeExists (schemeName) {
    this.schemeDropdown()
      .find('option')
      .should('contain.text', schemeName)
  }


  assertKeyValuePairs (rows) {

    Object.entries(rows).forEach(([key, value], index) => {

      cy.get('.govuk-summary-list__row')
        .eq(index)
        .within(() => {

          cy.get('.govuk-summary-list__key')
            .should('contain.text', key)

          cy.get('.govuk-summary-list__value')
            .should('contain.text', value)

        })
    })
  }


  clickPageButton (button) {

    const buttons = {
      Next: () => this.btnNext().click({ force: true }),
      Previous: () => this.btnPrevious().click({ force: true })
    }

    if (!buttons[button]) {
      throw new Error(`Page button '${button}' not found`)
    }

    buttons[button]()
  }


  verifyAwaitingReportingData (data) {

    this.assertTableRow([
      data.scheme,
      data.schemeYear,
      data.frn,
      data.agreementNumber,
      data.totalAmount,
      data.daysWaiting
    ])
  }

  verifyAwaitingDatasetSummary (data) {
    this.assertKeyValuePairs({
      'FRN': data.frn,
      'Scheme': data.scheme,
      'Year': data.schemeYear,
      'Agreement number': data.agreementNumber,
      //something to verify Invoice number in the future? where is this generated?
    })
  }

  verifyEnrichmentData (data) {
    this.assertKeyValuePairs({
      'Debt type': data.debtType,
      'Date debt discovered': data.dateDebtDiscovered,
    })
  }

  enterDateField (fieldId, { day, month, year }) {

    cy.get(`#${fieldId}-day`).clear().type(day)
    cy.get(`#${fieldId}-month`).clear().type(month)
    cy.get(`#${fieldId}-year`).clear().type(year)


  }
}

export default new requestEditorPage()