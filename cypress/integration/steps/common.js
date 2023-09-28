/* global Given, When, Then */

import prCal from '../pages/prCal';

Given(/^I visit the "(.*)" homepage$/, (text) => {
  var url;

  switch (text) {
  case 'Progressive Reductions Calculations':
    url = prCal.prCalUrl();
    break;
  }

  cy.visit(url);

  if (text === 'Progressive Reductions Calculations') {
    prCal.acceptCookiesButton().click();
  }
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