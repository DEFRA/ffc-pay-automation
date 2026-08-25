import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import paymentManagementPage from '../pages/paymentManagementPage'
import constants from '../../support/constants.json'

import homePageCards from '../../support/data/homePageCards.json'
const { getEnvironmentConfig } = require('../../support/configLoader')
const envConfig = getEnvironmentConfig()


console.log('Environment Config:', envConfig)

When(/^I can see "(.*)" as the header$/, (text) => {
  paymentManagementPage.header().should('be.visible').haveWithoutWhitespace(text)
})

Then(/^I am on the "(.*)" subpage$/, (text) => {

  Cypress.emit('log:step', 'I am on the ' + text + ' subpage')

  cy.url().should('include', text)

  if (text === 'metrics') {

    //Slightly different element identifier for sub header on this page

    paymentManagementPage
      .mainHeader()
      .should('be.visible')
      .haveWithoutWhitespace(constants[text].pageSubHeader)

  } else {

    paymentManagementPage
    //grabs the first subheader avail, otherwise if there is multiple subheaders it grabs all of them
      .subHeader().first()
      .should('be.visible')
      .haveWithoutWhitespace(constants[text].pageSubHeader)
  }
})

When(/^on the Home Page I click the "(.*)" button$/, (button) => {

  Cypress.emit('log:step', 'on the Home Page I click the ' + button + ' button')

  let element

  switch (button) {
  case 'accept cookies':  element = paymentManagementPage.cookieBannerAcceptBtn(); break
  case 'reject cookies':  element = paymentManagementPage.cookieBannerRejectBtn(); break
  case 'hide message': element = paymentManagementPage.cookieBannerHideBtn(); break
  case 'cookies accepted hide button': element = paymentManagementPage.cookieBannerAcceptedHideBtn(); break
  case 'cookies rejected hide button': element = paymentManagementPage.cookieBannerRejectedHideBtn(); break
  }
  element.click()
  cy.log('Clicked the ' + button + ' button')
  console.log('Clicked the ' + button + ' button')
})

Then(/^on the Home Page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step', `on the Home Page I confirm that ${element} is displayed`)

  if (homePageCards[element]) {
    const card = homePageCards[element]

    paymentManagementPage
      .cardHeader(card.title)
      .should('be.visible')
      .containsWithoutWhitespace( card.title)

    paymentManagementPage
      .cardDescription(card.title)
      .should('be.visible')
      .containsWithoutWhitespace( card.description)

    card.links.forEach(link => {
      paymentManagementPage
        .cardLink(card.title, link)
        .should('be.visible')
        .containsWithoutWhitespace( link)
    })

    cy.log(`Confirmed that ${element} is displayed`)
    return
  }

  switch (element) {
  case 'application header':
    paymentManagementPage.applicationHeader()
      .should('be.visible')
      .containsWithoutWhitespace( 'Payment management')
    break

  case 'sign out link':
    paymentManagementPage.signOutLink()
      .should('be.visible')
      .containsWithoutWhitespace( 'Sign out')
    break

  case 'page header':
    paymentManagementPage.pageHeader()
      .should('be.visible')
      .containsWithoutWhitespace( 'Payments and Documents Services')
    break

  case 'cookie banner header':
    paymentManagementPage.cookieBannerHeader()
      .should('be.visible')
      .containsWithoutWhitespace( 'Cookies on Payment management')
    break

  case 'cookie banner content':
    paymentManagementPage.cookieBannerContentOne()
      .should('be.visible')
      .containsWithoutWhitespace( 'We use some essential cookies to make this service work.')

    paymentManagementPage.cookieBannerContentTwo()
      .should('be.visible')
      .containsWithoutWhitespace('We’d like to set additional cookies so we can remember your settings, understand how people use the service and make improvements.')
    break

  case 'cookie banner accept button':
    paymentManagementPage.cookieBannerAcceptBtn()
      .should('be.visible')
      .containsWithoutWhitespace( 'Accept analytics cookies')
    break

  case 'cookie banner reject button':
    paymentManagementPage.cookieBannerRejectBtn()
      .should('be.visible')
      .containsWithoutWhitespace( 'Reject analytics cookies')
    break

  case 'cookie banner view link':
    paymentManagementPage.cookieBannerViewLink()
      .should('be.visible')
      .containsWithoutWhitespace( 'View cookies')
    break

  case 'cookie banner accepted message':
    paymentManagementPage.cookieBannerAcceptedMessage()
      .should('be.visible')
      .containsWithoutWhitespace('You’ve accepted analytics cookies. You can change your cookie settings at any time.')
    break

  case 'cookie banner accepted hide button':
    paymentManagementPage.cookieBannerAcceptedHideBtn()
      .should('be.visible')
      .containsWithoutWhitespace( 'Hide this message')
    break

  case 'cookie banner rejected message':
    paymentManagementPage.cookieBannerRejectedMessage()
      .should('be.visible')
      .containsWithoutWhitespace('You’ve rejected analytics cookies. You can change your cookie settings at any time.')
    break

  case 'cookie banner rejected hide button':
    paymentManagementPage.cookieBannerRejectedHideBtn()
      .should('be.visible')
      .containsWithoutWhitespace( 'Hide this message')
    break

  default:
    throw new Error(`Unknown home page element: ${element}`)
  }

  cy.log(`Confirmed that ${element} is displayed`)
})

Then(/^on the Home Page I confirm that "(.*)" is not displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Home Page I confirm that ' + element + ' is not displayed')

  let elementId

  switch (element) {
  case 'cookie banner header':
    elementId = paymentManagementPage.cookieBannerHeader(); break
  case 'cookie banner content':
    elementId = paymentManagementPage.cookieBannerContentOne(); break
  case 'cookie banner accept button':
    elementId = paymentManagementPage.cookieBannerAcceptBtn(); break
  case 'cookie banner reject button':
    elementId = paymentManagementPage.cookieBannerRejectBtn(); break
  case 'cookie banner view link':
    elementId = paymentManagementPage.cookieBannerViewLink(); break
  case 'cookie banner accepted message':
    elementId = paymentManagementPage.cookieBannerAcceptedMessage(); break
  case 'cookie banner accepted hide button':
    elementId = paymentManagementPage.cookieBannerAcceptedHideBtn(); break
  case 'cookie banner rejected message':
    elementId = paymentManagementPage.cookieBannerRejectedMessage(); break
  case 'cookie banner rejected hide button':
    elementId = paymentManagementPage.cookieBannerRejectedHideBtn(); break
  }

  elementId.should('not.be.visible')

  cy.log('Confirmed that ' + element + ' is not displayed')
  console.log('Confirmed that ' + element + ' is not displayed')
})


When(/^the CSV file is downloaded with "(.*)" as the title$/, (text) => {

  Cypress.emit('log:step', 'the CSV file is downloaded with ' + text + ' as the title')

  if (text === 'ffc-pay-mi-report-v2' || text === 'ffc-pay-hold-report' || text === 'ffc-pay-suppressed-report') {
    const relativePath = `cypress/downloads/${text}.csv`

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
  } else {
    cy.contains('Your report has been successfully downloaded. You may now close this window.', { timeout: 50000 }).should('be.visible')
  }
})


Then(/^I confirm that payment for "(.*)" scheme with "(.*)" payment installments totalling "(.*)" is displayed$/, (scheme, payments, value) => {

  Cypress.emit('log:step', 'I confirm that payment for ' + scheme + ' scheme with ' + payments + ' payment installments totalling ' + value + ' is displayed')
  cy.wait(2000) // Waiting for data load
  cy.get('main').within(() => {
    cy.contains(scheme).should('be.visible')
    cy.contains(payments).should('be.visible')
    cy.contains(value).should('be.visible')
  })
  cy.log(`Confirmed that payment for ${scheme} scheme with ${payments} payment installments totalling ${value} is displayed`)
  console.log(`Confirmed that payment for ${scheme} scheme with ${payments} payment installments totalling ${value} is displayed`)
})