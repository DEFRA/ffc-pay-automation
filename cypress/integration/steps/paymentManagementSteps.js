import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
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
  cy.readFile(`cypress/downloads/${text}.csv`, { timeout: 15000 }).should('exist');
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

When(/^the CSV file is downloaded with "(.*)" as the title when I send the request$/, (expectedFileName) => {
  const formData = Cypress.env('formData');

  cy.request({
    method: 'GET',
    url: '/report-list/transaction-summary/download',
    qs: formData,
    encoding: 'binary'
  }).then((response) => {
    const contentDisposition = response.headers['content-disposition'];
    const fileNameMatch = contentDisposition.match(/filename=([^;]+)/);
    const actualFileName = fileNameMatch[1];

    expect(response.status).to.eq(200);
    expect(actualFileName).to.eq('ffc-pay-combined-transaction-report_'+expectedFileName+'.csv');
  });
});

When(/^the AP AR CSV file is downloaded with "(.*)" as the title when I send the request$/, (expectedFileName) => {
  const formData = Cypress.env('formData');

  cy.request({
    method: 'GET',
    url: '/report-list/ap-ar-listing/download',
    qs: formData,
    encoding: 'binary'
  }).then((response) => {
    const contentDisposition = response.headers['content-disposition'];
    const fileNameMatch = contentDisposition.match(/filename=([^;]+)/);
    const actualFileName = fileNameMatch[1];

    expect(response.status).to.eq(200);
    expect(actualFileName).to.eq('ffc-pay-ap-listing-report-from-'+expectedFileName+'.csv');
  });
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