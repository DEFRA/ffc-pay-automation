/* global Given, When, Then */

import environments from '../../support/environments.json';
import paymentManagementPage from '../pages/paymentManagementPage';

Given(/^I visit the "(.*)" homepage$/, (text) => {
  var url;

  switch (text) {
  case 'Payment management':
    url = environments.paymentManagement.devUrl;
    break;
  case 'Request Editor':
    url = environments.requestEditor.devUrl;
    break;
  }

  cy.visit(url);
  paymentManagementPage.header().should('be.visible').and('have.text', text);
});

When(/^I click on the "(.*)" button$/, (text) => {
  cy.get('button').contains(text).scrollIntoView().click();
});

When(/^I click on "(.*)"$/, (text) => {
  cy.contains(text).scrollIntoView().click();
});

Then(/^I should see "(.*)"$/, (text) => {
  cy.contains(text);
});

When(/^I click on the "(.*)" link$/, (text) => {
  if (text === 'Payment request statuses') {
    cy.get('a').contains(text).scrollIntoView().then(el => {
      el.attr('download', '');
    }).click();
  } else {
    cy.get('a').contains(text).scrollIntoView().click();
  }
});