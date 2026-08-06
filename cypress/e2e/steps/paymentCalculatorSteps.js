import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'


import paymentCalculatorPage from '../pages/paymentCalculatorPage'
import enterYourDelinkedPaymentReferencePage from '../pages/enterYourDelinkedPaymentReferencePage'
import delinkedPaymentCalculationPage from '../pages/delinkedPaymentCalculationPage'

//would much rather use the generic handler for button clicks but the button on this page is weird
Then(/^on the Payment calculator page I click the start now button$/, () => {

  paymentCalculatorPage.button('Start now').click()
})

Then(/^on the Delinked payment calculation page I confirm that default year is "(.*)"$/, (year) => {

  Cypress.emit('log:step', 'on the Delinked payment calculation page I confirm that default year is ' + year)
  cy.url().should('include', 'year' + year)
  console.log('Confirmed that default year is', year, 'on the Delinked payment calculation page')
  cy.log('Confirmed that default year is', year, 'on the Delinked payment calculation page')
})

Then(/^on the Payment Calculator page I confirm that "(.*)" is correctly displayed$/, (element) => {
  Cypress.emit(
    'log:step',
    `on the Payment Calculator page I confirm that ${element} is correctly displayed`
  )

  const verify = (method, texts) => {
    texts.forEach(text => {
      paymentCalculatorPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'sub title':
    verify('heading', ['Calculate your delinked payment'])
    break

  case 'paragraph one':
    verify('paragraph', ['Delinked payments have replaced Basic Payment Scheme (BPS) payments in England. Reductions will be applied each year until the payments finish at the end of 2027.'])
    break

  case 'paragraph two':
    verify('paragraph', ['Reductions to delinked payments are known as progressive reductions.'])
    break

  case 'paragraph three':
    verify('paragraph', ['To receive delinked payments, you must have claimed, and been eligible for, BPS 2023 in England (except in some inheritance cases).'])
    break

  case 'paragraph four':
    verify('paragraph', ['Use this calculator to estimate how progressive reductions could reduce your delinked payment for 2026 and 2027. The calculator also shows how progressive reductions affected your 2024 and 2025 delinked payment.'])
    break

  case 'start button':
    verify('button', ['Start now'])
    break

  case 'paragraph five':
    verify('paragraph', ['Calculations should be quick and will not ask for personal information.'])
    break

  case 'paragraph six':
    verify('paragraph', ['Call the Rural Payments helpline on 03000 200 301 if you need help using this calculator.'])
    break

  case 'paragraph seven':
    verify('paragraph', ['The reductions to delinked payments help fund new schemes and grants.'])
    break

  case 'paragraph eight':
    verify('paragraph', ['You can read more about delinked payments: replacing the Basic Payment Scheme.'])
    break

  case 'related content title':
    verify('heading', ['Related content'])
    break

  case 'related content link one':
    verify('link', ['Delinked payments replacing the Basic Payment Scheme'])
    break

  case 'related content link two':
    verify('link', ['Funding for farmers, growers and land managers'])
    break
  }

  console.log('Confirmed that',element,'is displayed correctly on the Payment Calculator page')

  cy.log('Confirmed that',element,'is displayed correctly on the Payment Calculator page'
  )
})

Then( /^on the Enter your delinked payment reference amount page I confirm that "(.*)" is correctly displayed$/,
  (element) => {
    Cypress.emit('log:step',`on the Enter your delinked payment reference amount page I confirm that ${element} is correctly displayed`)

    const verify = (method, texts) => {
      texts.forEach(text => {
        enterYourDelinkedPaymentReferencePage[method](text)
          .should('be.visible')
      })
    }

    switch (element) {
    case 'page title':
      verify('heading', ['Enter your delinked payment reference amount'])
      break

    case 'paragraph one':
      verify('paragraph', ['This calculator will estimate your payment'])
      break

    case 'paragraph two':
      verify('paragraph', ['You were sent your reference amount in the delinked payments'])
      break

    case 'paragraph three':
      verify('paragraph', ['This amount will have changed if BPS 2020, 2021 and 2022 reference'])
      break

    case 'bullet line one':
      verify('listItem', ['been transferred in or out of your business'])
      break

    case 'bullet line two':
      verify('listItem', ['changed following a payment query'])
      break

    case 'paragraph four':
      verify('paragraph', ['You can view your current reference amount and any data transfers in'])

      verify('link', ['Rural Payments service'])
      break

    case 'paragraph five':
      verify('hint', ['Do not include commas in the amount you enter. For example, enter £20,000 as 20000.'])
      break

    case 'value field':
      enterYourDelinkedPaymentReferencePage
        .input()
        .should('be.visible')
      break

    case 'calculate button':
      verify('button', ['Calculate my delinked payment'])
      break

    case 'amount format error message':
      verify('errorMessage', ['The value must be a number without commas.'])
      break
    }

    console.log('Confirmed that',  element,'is displayed correctly on the Enter your delinked payment reference amount page')

    cy.log('Confirmed that', element,'is displayed correctly on the Enter your delinked payment reference amount page'
    )
  }
)

When(/^on the Enter your delinked payment reference amount page I enter amount of "(.*)"$/, (amount) => {

  Cypress.emit('log:step', 'on the Enter your delinked payment reference amount page I enter amount of ' + amount)
  enterYourDelinkedPaymentReferencePage.input().should('be.visible').clear().type(amount)
  console.log('Entered a valid amount of', amount, 'on the Enter your delinked payment reference amount page')
  cy.log('Entered a valid amount of', amount, 'on the Enter your delinked payment reference amount page')
})

Then(/^on the Enter your delinked payment reference amount page I click the "(.*)"$/, (element) => {

  Cypress.emit('log:step', 'on the Enter your delinked payment reference amount page I click the ' + element)
  switch (element) {
  case 'calculate button':
    enterYourDelinkedPaymentReferencePage.button('Calculate').should('be.visible').click(); break
  }
  console.log('Clicked on ' + element + ' on the Enter your delinked payment reference amount page')
  cy.log('Clicked on ' + element + ' on the Enter your delinked payment reference amount page')
})

Then(/^on the Delinked payment calculation page I confirm that "(.*)" is correctly displayed$/, (element) => {
  Cypress.emit(
    'log:step',
    `on the Delinked payment*calculation page I confirm that ${element} is correctly displayed`
  )

  const verify = (method, texts) => {
    texts.forEach(text => {
      delinkedPaymentCalculationPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'page title':
    verify('heading', ['Delinked payment calculation'])
    break

  case 'paragraph one':
    verify('paragraph', ['Your estimated delinked payment is based on a reference amount of £20,000.00, with a progressive reduction applied.'])
    break

  case '2024 tab':
    delinkedPaymentCalculationPage.tab('2024')
      .should('be.visible')
    break

  case '2025 tab':
    delinkedPaymentCalculationPage.tab('2025')
      .should('be.visible')
    break

  case '2026 tab':
    delinkedPaymentCalculationPage.tab('2026')
      .should('be.visible')
    break

  case '2027 tab':
    delinkedPaymentCalculationPage.tab('2027')
      .should('be.visible')
    break

  case 'estimated payment header':
    verify('tableCaption', ['Estimated delinked payment in 2026'])
    break

  case 'scheme year':
    verify('tableHeader', ['2026'])
    break

  case 'total estimated reduction':
    verify('tableCell', ['£19,600.00'])
    break

  case 'total estimated payment':
    verify('tableCell', ['£400.00'])
    break

  case 'paragraph two':
    verify('paragraph', ['We plan to make the payment from 1 August.'])
    break

  case 'progressive reduction header':
    verify('tableCaption', ['Progressive reduction applied to your payment for 2026'])
    break

  case 'payment band':
    verify('tableHeader', ['2026'])
    break

  case '£30,000.00 or less':
    verify('tableCell', ['£19,600.00'])
    break

  case 'total progressive reduction':
    verify('tableCell', ['£19,600.00'])
    break

  case 'percentageReductionHeader':
    verify('tableCaption', ['Percentage reduction for 2026'])
    break

  case 'scheme year two':
    verify('tableHeader', ['2026'])
    break

  case '30,000.00 or less two':
    verify('tableCell', ['98%'])
    break
  }

  console.log('Confirmed that',element,'is displayed correctly on the Delinked payment calculation page')

  cy.log('Confirmed that',element,'is displayed correctly on the Delinked payment calculation page')
})