/* global Given, When, Then */

import google from '../pages/google';
import prCal from '../pages/prCal';

Given(/^I visit the "(.*)" homepage$/, (text) => {
  var url;

  switch (text) {
  case 'Google':
    url = google.googleURL();
    break;
  case 'Progressive Reductions Calculations':
    url = prCal.prCalUrl();
    break;
  }

  cy.visit(url);

  if (text === 'Progressive Reductions Calculations') {
    prCal.acceptCookiesButton().click();
  }
});

When(/^I search for "(.*)"$/, (text) => {
  google.searchBar().type(text + '{enter}');
});

When(/^I click on the "(.*)" button$/, (text) => {
  cy.contains(text).click();
});

Then(/^I should see "(.*)"$/, (text) => {
  cy.contains(text);
});