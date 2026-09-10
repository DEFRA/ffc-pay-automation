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

  default:
    throw new Error(`Unknown home page element: ${element}`)
  }

  cy.log(`Confirmed that ${element} is displayed`)
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


Then(
  /^I confirm that payment for "(.*)" scheme with "(.*)" payment installments totalling "(.*)" is displayed$/,
  (scheme, payments, value) => {
    Cypress.emit(
      'log:step',
      `I confirm that payment for ${scheme} scheme with ${payments} payment installments totalling ${value} is displayed`
    )

    const verifyPayment = (attempt = 1) => {
      cy.reload()

      cy.get('main').then($main => {
        const text = $main.text()

        const paymentFound =
          text.includes(scheme) &&
          text.includes(payments) &&
          text.includes(value)

        if (paymentFound) {
          cy.log(
            `Confirmed that payment for ${scheme} scheme with ${payments} payment installments totalling ${value} is displayed`
          )
          return
        }

        if (attempt >= 20) {
          throw new Error(
            `Payment not found after 20 attempts. Expected: ${scheme}, ${payments}, ${value}`
          )
        }

        cy.log(
          `Attempt ${attempt}/20 failed. Refreshing page and retrying...`
        )

        cy.wait(15000)

        verifyPayment(attempt + 1)
      })
    }

    verifyPayment()
  }
)