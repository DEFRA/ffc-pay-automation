import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import reportsPage from '../pages/reportsPage'
const { getEnvironmentConfig } = require('../../support/configLoader')

//this should probably be split into two generic helpers one for radio and one for dropdown (i think the only thing that still uses dropdown is scheme), this is not good quality code
When('I select {string} from the {string} dropdown or radio', (text, dropdown) => {

  Cypress.emit('log:step', 'I select ' + text + ' from the ' + dropdown + ' dropdown')
  if (['COHT Capital', 'COHT Revenue'].includes(text) ) {
    cy.wait(60000)
    cy.log('Wait for all payments to process')
  } else if (text === '') {
    return
  } else if (['revenueCapital', 'reportType', 'statusReportScheme'].includes(dropdown)) {
    cy.contains('label', text)
      .scrollIntoView()
      .click()
  }
  if (dropdown === 'scheme') {
    reportsPage.schemeDropdown().then($dropdown => {
      const options = $dropdown.find('option')

      const selectedOption = [...options].find(option => option.innerText.trim() === text)

      if (selectedOption) {
        reportsPage.schemeDropdown().scrollIntoView().select(text)

        const schemeId = selectedOption.value
        Cypress.env('formData', { ...Cypress.env('formData'), schemeId })
      } else {
        throw new Error(`Option "${text}" not found in the scheme dropdown.`)
      }
    })
  }
})

When(/^I select the first visible year for the "(.*)" scheme$/, (schemeKey) => {

  Cypress.emit('log:step', 'I select the first visible year for the ' + schemeKey + ' scheme')
  const schemeMap = {
    'delinked': 'delinked-payment-statement',
    'sfi-23': 'sustainable-farming-incentive'
  }

  const valueToSelect = schemeMap[schemeKey.toLowerCase()]
  if (!valueToSelect) {
    throw new Error(`No mapping found for scheme "${schemeKey}"`)
  }

  cy.log(`Selecting <option> with value: "${valueToSelect}"`)

  reportsPage.statusReportSchemeDropdown().then(($select) => {
    const selectEl = $select[0]
    const option = [...selectEl.options].find(opt => opt.value === valueToSelect && !opt.hidden)

    if (!option) {
      throw new Error(`No visible <option> with value "${valueToSelect}" found`)
    }

    selectEl.value = option.value
    selectEl.dispatchEvent(new Event('change', { bubbles: true }))

    cy.log(`Selected "${option.textContent.trim()}"`)
    expect(selectEl.value).to.eq(option.value)
  })
})

When('I type the {string} date as {string}', (dateType, date) => {

  Cypress.emit('log:step', 'I type the ' + dateType + ' date as ' + date)
  const [day, month, year] = date.split('-')

  if (dateType === 'start') {
    reportsPage.startDateDayField().type(day)
    reportsPage.startDateMonthField().type(month)
    reportsPage.startDateYearField().type(year)
    Cypress.env('formData', { ...Cypress.env('formData'), 'start-date-day': day })
    Cypress.env('formData', { ...Cypress.env('formData'), 'start-date-month': month })
    Cypress.env('formData', { ...Cypress.env('formData'), 'start-date-year': year })
  } else if (dateType === 'end') {
    reportsPage.endDateDayField().type(day)
    reportsPage.endDateMonthField().type(month)
    reportsPage.endDateYearField().type(year)
    Cypress.env('formData', { ...Cypress.env('formData'), 'end-date-day': day })
    Cypress.env('formData', { ...Cypress.env('formData'), 'end-date-month': month })
    Cypress.env('formData', { ...Cypress.env('formData'), 'end-date-year': year })
  } else {
    throw new Error(`Unknown date type: ${dateType}`)
  }
})

Given('the sample report data is loaded', () => {

  Cypress.emit('log:step', 'the sample report data is loaded')
  cy.task('loadReportData').then((result) => {
    expect(result.success, result.error).to.be.true
  })
})

When('I click on an available report', () => {

  Cypress.emit('log:step', 'I click on an available report')
  reportsPage.availableReports().first().scrollIntoView().click({ force: true })
})


When(/^the status report is downloaded with "(.*)" as the title$/, function (title) {

  Cypress.emit('log:step', 'the status report is downloaded with ' + title + ' as the title')
  cy.get('@downloadedFileName').then((fileName) => {
    const expectedFileName = `${title}.csv`
    expect(fileName).to.include(expectedFileName)

    const relativePath = `cypress/downloads/${fileName}`
    const checkFileExists = (attempt = 0, maxAttempts = 10) => {
      return cy.task('fileExists', relativePath, {timeout: 3000}).then((exists) => {
        if (exists) {
          return true
        }
        if (attempt >= maxAttempts) {
          throw new Error(`File "${relativePath}" not found after ${maxAttempts} attempts.`)
        }
        return cy.wait(1000).then(() => checkFileExists(attempt + 1, maxAttempts))
      })
    }


    checkFileExists().should('eq', true)
  })
})

When('on the Available reports page I select first available report', () => {

  Cypress.emit('log:step', 'on the Available reports page I select first available report')
  cy.get(':nth-child(1) > .govuk-link')
    .invoke('attr', 'href')
    .then(url => {
      cy.request(url).then(res => {
        expect(res.status).to.eq(200)
        expect(res.headers['content-type']).to.include('text/html; charset=utf-8')
      })
    })
})

When(/^the user downloads the status report with text "(.*)"$/, (linkText) => {

  Cypress.emit('log:step', 'the user downloads the status report with text ' + linkText)
  const { paymentManagementUrl } = getEnvironmentConfig()

  cy.contains('a.govuk-link', linkText)
    .should('have.attr', 'href')
    .then((relativeHref) => {
      const baseUrl = paymentManagementUrl.replace(/\/$/, '')
      const path = relativeHref.startsWith('/') ? relativeHref : `/${relativeHref}`
      const fullUrl = `${baseUrl}${path}`

      const decodedHref = decodeURIComponent(relativeHref)
      const filePathParam = decodedHref.split('file-name=')[1]

      const rawFileName = filePathParam.replace(/\//g, '_')
      const sanitizedFileName = rawFileName.replace(/:/g, '_')
      const filePath = `cypress/downloads/${sanitizedFileName}`

      cy.request({
        url: fullUrl,
        encoding: 'utf8'
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.writeFile(filePath, response.body)
      })

      cy.wrap(sanitizedFileName).as('downloadedFileName')
    })
})