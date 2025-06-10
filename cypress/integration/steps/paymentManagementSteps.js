/* global When, Then */

import paymentManagementPage from '../pages/paymentManagementPage';
import reportsPage from '../pages/reportsPage';
import constants from '../../support/constants.json';

When(/^I can see "(.*)" as the header$/, (text) => {
  paymentManagementPage.header().should('be.visible').and('have.text', text);
});

Then(/^I am on the "(.*)" subpage$/, (text) => {
  cy.url().should('include', text);

  paymentManagementPage
    .subHeader()
    .should('be.visible')
    .and('have.text', constants[text].pageSubHeader);
});

When(/^the CSV file is downloaded with "(.*)" as the title$/, (text) => {
  const relativePath = `cypress/downloads/${text}.csv`;

  if (text === 'ffc-pay-mi-report-v2' || text === 'ffc-pay-hold-report' || text === 'ffc-pay-suppressed-report') {
    const relativePath = `cypress/downloads/${text}.csv`;

    const checkFileExists = (attempt = 0, maxAttempts = 10) => {
      return cy.task('fileExists', relativePath, {timeout: 3000}).then((exists) => {
        if (exists) {
          return true;
        }
        if (attempt >= maxAttempts) {
          throw new Error(`File "${relativePath}" not found after ${maxAttempts} attempts.`);
        }
        return cy.wait(1000).then(() => checkFileExists(attempt + 1, maxAttempts));
      });
    };


    checkFileExists().should('eq', true);
  } else {
    cy.contains('We’re preparing your report. This can take a few minutes for large datasets.').should('be.visible');
    reportsPage.spinner().should('be.visible');
    cy.contains('Your report has been successfully downloaded. You may now close this window.', { timeout: 50000 }).should('be.visible');

    cy.task('fileExists', relativePath).should('eq', true);
  }
});

Then('I should see the number of closures', () => {
  paymentManagementPage.noOfClosures().should('be.visible');
});

Then('I make a note of the closures count', () => {
  paymentManagementPage
    .noOfClosures()
    .should('be.visible')
    .invoke('text').then(($closureCount) => {
      cy.wrap(parseInt($closureCount), { log: true }).as('initialClosureCount');
    });
});

Then('the closure count has increased by 1', () => {
  cy.get('@initialClosureCount').then((initialCount) => {
    paymentManagementPage
      .noOfClosures()
      .should('be.visible')
      .invoke('text').then(($closureCount) => {
        const currentCount = parseInt($closureCount);
        expect(currentCount).to.equal(initialCount + 1);
      });
  });
});

Then('I should see {string} number of closures', (count) => {
  paymentManagementPage
    .noOfClosures()
    .should('be.visible')
    .and('contain.text', count);
});

When('I select {string} from the {string} dropdown', (text, dropdown) => {
  if (dropdown === 'scheme') {
    reportsPage.schemeDropdown().then($dropdown => {
      const options = $dropdown.find('option');

      const selectedOption = [...options].find(option => option.innerText.trim() === text);

      if (selectedOption) {
        reportsPage.schemeDropdown().scrollIntoView().select(text);

        const schemeId = selectedOption.value;
        Cypress.env('formData', { ...Cypress.env('formData'), schemeId });
      } else {
        throw new Error(`Option "${text}" not found in the scheme dropdown.`);
      }
    });
  } else if (dropdown === 'revenueCapital') {
    reportsPage.revenueCapitalDropdown().scrollIntoView().select(text);
    Cypress.env('formData', { ...Cypress.env('formData'), revenueOrCapital: text });
  } else if (dropdown === 'reportType') {
    reportsPage.reportTypeDropdown().scrollIntoView().select(text);
  }
});

When('I type the {string} date as {string}', (dateType, date) => {
  const [day, month, year] = date.split('-');

  if (dateType === 'start') {
    reportsPage.startDateDayField().type(day);
    reportsPage.startDateMonthField().type(month);
    reportsPage.startDateYearField().type(year);
    Cypress.env('formData', { ...Cypress.env('formData'), 'start-date-day': day });
    Cypress.env('formData', { ...Cypress.env('formData'), 'start-date-month': month });
    Cypress.env('formData', { ...Cypress.env('formData'), 'start-date-year': year });
  } else if (dateType === 'end') {
    reportsPage.endDateDayField().type(day);
    reportsPage.endDateMonthField().type(month);
    reportsPage.endDateYearField().type(year);
    Cypress.env('formData', { ...Cypress.env('formData'), 'end-date-day': day });
    Cypress.env('formData', { ...Cypress.env('formData'), 'end-date-month': month });
    Cypress.env('formData', { ...Cypress.env('formData'), 'end-date-year': year });
  } else {
    throw new Error(`Unknown date type: ${dateType}`);
  }
});