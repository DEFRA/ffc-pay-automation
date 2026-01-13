/* global Given, When, Then */

import paymentCalculatorPage from '../pages/paymentCalculatorPage';
import enterYourDelinkedPaymentReferencePage from '../pages/enterYourDelinkedPaymentReferencePage';
import delinkedPaymentCalculationPage from '../pages/delinkedPaymentCalculationPage';
import constants from '../../support/constants.json';

When(/^on the Payment Calculator page I click the "(.*)"$/, (element) => {
  switch (element) {
  case 'start button':
    paymentCalculatorPage.startButton().should('be.visible').click(); break;
  case 'related content link one':
    paymentCalculatorPage.relatedContentLinkOne().should('be.visible').click(); break;
  case 'related content link two':
    paymentCalculatorPage.relatedContentLinkTwo().should('be.visible').click(); break;
  }
  console.log('Clicked on', element, 'on the Payment Calculator page');
  cy.log('Clicked on', element, 'on the Payment Calculator page');
});

Then(/^I confirm that I am on the "(.*)" page$/, (text) => {
  cy.url().should('include', text);
});

Then(/^I confirm that I am on the "(.*)" subpage$/, (text) => {
  cy.url().should('include', text);

  enterYourDelinkedPaymentReferencePage
    .subHeader()
    .should('be.visible')
    .and('have.text', constants[text].pageSubHeader);
});

Then(/^on the Delinked payment calculation page I confirm that default year is "(.*)"$/, (year) => {
  cy.url().should('include', 'year' + year);
  console.log('Confirmed that default year is', year, 'on the Delinked payment calculation page');
  cy.log('Confirmed that default year is', year, 'on the Delinked payment calculation page');
});

Then(/^on the Payment Calculator page I confirm that "(.*)" is correctly displayed$/, (element) => {
  switch (element) {
  case 'sub title':
    paymentCalculatorPage.subTitle().should('be.visible').and('contain.text', 'Calculate your delinked payment'); break;
  case 'paragraph one':
    paymentCalculatorPage.paragraphOne().should('be.visible').and('contain.text', 'Delinked payments have replaced Basic Payment Scheme (BPS) payments in England. Reductions will be applied each year until the payments finish at the end of 2027.'); break;
  case 'paragraph two':
    paymentCalculatorPage.paragraphTwo().should('be.visible').and('contain.text', 'Reductions to delinked payments are known as progressive reductions.'); break;
  case 'paragraph three':
    paymentCalculatorPage.paragraphThree().should('be.visible').and('contain.text', 'To receive delinked payments, you must have claimed, and been eligible for, BPS 2023 in England (except in some inheritance cases).'); break;
  case 'paragraph four':
    paymentCalculatorPage.paragraphFour()
      .should('be.visible')
      .and(($el) => {
        const html = $el.html();
        expect(html).to.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/); // checks for anchor tag
      })
      .and('contain.text', 'Use this calculator to estimate how progressive reductions could reduce your delinked payment for 2026 and 2027.')
      .and('contain.text', 'The estimate for 2026 and 2027 is based on the proposed progressive reduction ')
      .and('contain.text', 'figures for these years shown in the')
      .and('contain.text', 'The calculator also shows how progressive reductions affected your 2024 and 2025 delinked payment.');
    break;
  case 'start button':
    paymentCalculatorPage.startButton().should('be.visible').and('contain.text', 'Start now'); break;
  case 'paragraph five':
    paymentCalculatorPage.paragraphFive().should('be.visible').and('contain.text', 'Calculations should be quick and will not ask for personal information.'); break;
  case 'paragraph six':
    paymentCalculatorPage.paragraphSix().should('be.visible').and('contain.text', 'Call the Rural Payments helpline on 03000 200 301 if you need help using this calculator.'); break;
  case 'paragraph seven':
    paymentCalculatorPage.paragraphSeven().should('be.visible').and('contain.text', 'The reductions to delinked payments help fund new schemes and grants.'); break;
  case 'paragraph eight':
    paymentCalculatorPage.paragraphEight().should('be.visible').and('contain.text', 'You can read more about delinked payments: replacing the Basic Payment Scheme.'); break;
  case 'related content title':
    paymentCalculatorPage.relatedContentTitle().should('be.visible').and('contain.text', 'Related content'); break;
  case 'related content link one':
    paymentCalculatorPage.relatedContentLinkOne().should('be.visible').and('contain.text', 'Delinked payments replacing the Basic Payment Scheme'); break;
  case 'related content link two':
    paymentCalculatorPage.relatedContentLinkTwo().should('be.visible').and('contain.text', 'Funding for farmers, growers and land managers'); break;
  }

  console.log('Confirmed that', element, 'is displayed correctly on the Payment Calculator page');
  cy.log('Confirmed that', element, 'is displayed correctly on the Payment Calculator page');
});

Then(/^on the Enter your delinked payment reference amount page I confirm that "(.*)" is correctly displayed$/, (element) => {
  switch (element) {
  case 'page title':
    enterYourDelinkedPaymentReferencePage.subHeader().should('be.visible').and('contain.text', 'Enter your delinked payment reference amount'); break;
  case 'paragraph one':
    enterYourDelinkedPaymentReferencePage.paragraphOne().should('be.visible').and('contain.text', 'This calculator will estimate your payment for each of the years 2024 to 2027 based on the reference amount you enter.'); break;
  case 'paragraph two':
    enterYourDelinkedPaymentReferencePage.paragraphTwo().should('be.visible').and('contain.text', 'You were sent your reference amount in the delinked payments information statement.'); break;
  case 'paragraph three':
    enterYourDelinkedPaymentReferencePage.paragraphThree().should('be.visible').and('contain.text', 'This amount will have changed if BPS 2020, 2021 and 2022 reference data has either:'); break;
  case 'bullet line one':
    enterYourDelinkedPaymentReferencePage.bulletLineOne().should('be.visible').and('contain.text', 'been transferred in or out of your business'); break;
  case 'bullet line two':
    enterYourDelinkedPaymentReferencePage.bulletLineTwo().should('be.visible').and('contain.text', 'changed following a payment query'); break;
  case 'paragraph four':
    enterYourDelinkedPaymentReferencePage.paragraphFour()
      .should('be.visible')
      .and(($el) => {
        const html = $el.html();
        expect(html).to.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/); // checks for anchor tag
      })
      .and('contain.text', 'You can view your current reference amount and any data transfers in the');
    break;
  case 'paragraph five':
    enterYourDelinkedPaymentReferencePage.paragraphFive().should('be.visible').and('contain.text', 'Do not include commas in the amount you enter. For example, enter £20,000 as 20000.'); break;
  case 'value field':
    enterYourDelinkedPaymentReferencePage.valueField().should('be.visible'); break;
  case 'calculate button':
    enterYourDelinkedPaymentReferencePage.calculateButton().should('be.visible').and('contain.text', 'Calculate my delinked payment'); break;
  case 'amount format error message':
    enterYourDelinkedPaymentReferencePage.errorMessage().should('be.visible').and('contain.text', 'The value must be a number without commas.'); break;
  }

  console.log('Confirmed that', element, 'is displayed correctly on the Enter your delinked payment reference amount page');
  cy.log('Confirmed that', element, 'is displayed correctly on the Enter your delinked payment reference amount page');
});

When(/^on the Enter your delinked payment reference amount page I enter amount of "(.*)"$/, (amount) => {
  enterYourDelinkedPaymentReferencePage.valueField().should('be.visible').clear().type(amount);
  console.log('Entered a valid amount of', amount, 'on the Enter your delinked payment reference amount page');
  cy.log('Entered a valid amount of', amount, 'on the Enter your delinked payment reference amount page');
});

Then(/^on the Enter your delinked payment reference amount page I click the "(.*)"$/, (element) => {
  switch (element) {
  case 'calculate button':
    enterYourDelinkedPaymentReferencePage.calculateButton().should('be.visible').click(); break;
  }
  console.log('Clicked on ' + element + ' on the Enter your delinked payment reference amount page');
  cy.log('Clicked on ' + element + ' on the Enter your delinked payment reference amount page');
});

Then(/^on the Delinked payment calculation page I confirm that "(.*)" is correctly displayed$/, (element) => {
  switch (element) {
  case 'page title':
    delinkedPaymentCalculationPage.subHeader().should('be.visible').and('contain.text', 'Delinked payment calculation'); break;
  case 'paragraph one':
    delinkedPaymentCalculationPage.paragraphOne().should('be.visible').and('contain.text', 'Your estimated delinked payment is based on a reference amount of £20,000.00, with a progressive reduction applied.'); break;
  case '2024 tab':
    delinkedPaymentCalculationPage.twentyTwentyFourTab().should('be.visible'); break;
  case '2025 tab':
    delinkedPaymentCalculationPage.twentyTwentyFiveTab().should('be.visible'); break;
  case '2026 tab':
    delinkedPaymentCalculationPage.twentyTwentySixTab().should('be.visible');break;
  case '2027 tab':
    delinkedPaymentCalculationPage.twentyTwentySevenTab().should('be.visible'); break;
  case 'estimated payment header':
    delinkedPaymentCalculationPage.estimatedPaymentHeader().should('be.visible').and('contain.text', 'Estimated delinked payment in 2026'); break;
  case 'scheme year':
    delinkedPaymentCalculationPage.schemeYear().should('be.visible').and('contain.text', '2026'); break;
  case 'total estimated reduction':
    delinkedPaymentCalculationPage.totalEstimatedReduction().should('be.visible').and('contain.text', '£19,600.00'); break;
  case 'total estimated payment':
    delinkedPaymentCalculationPage.totalEstimatedPayment().should('be.visible').and('contain.text', '£400.00'); break;
  case 'paragraph two':
    delinkedPaymentCalculationPage.paragraphTwo().should('be.visible').and('contain.text', 'We plan to make the payment from 1 August.'); break;
  case 'progressive reduction header':
    delinkedPaymentCalculationPage.progressiveReductionHeader().should('be.visible').and('contain.text', 'Progressive reduction applied to your payment for 2026'); break;
  case 'payment band':
    delinkedPaymentCalculationPage.paymentBand().should('be.visible').and('contain.text', '2026'); break;
  case '£30,000.00 or less':
    delinkedPaymentCalculationPage.thirtyKOrLess().should('be.visible').and('contain.text', '£19,600.00'); break;
  case 'total progressive reduction':
    delinkedPaymentCalculationPage.totalProgressiveReduction().should('be.visible').and('contain.text', '£19,600.00'); break;
  case 'percentageReductionHeader':
    delinkedPaymentCalculationPage.percentageReductionHeader().should('be.visible').and('contain.text', 'Percentage reduction for 2026'); break;
  case 'scheme year two':
    delinkedPaymentCalculationPage.schemeYearTwo().should('be.visible').and('contain.text', '2026'); break;
  case '30,000.00 or less two':
    delinkedPaymentCalculationPage.thirtyKOrLessTwo().should('be.visible').and('contain.text', '98%'); break;
  }

  console.log('Confirmed that', element, 'is displayed correctly on the Enter your delinked payment reference amount page');
  cy.log('Confirmed that', element, 'is displayed correctly on the Enter your delinked payment reference amount page');
});