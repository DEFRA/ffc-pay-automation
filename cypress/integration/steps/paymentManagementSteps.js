/* global Given, When, Then */

import paymentManagementPage from '../pages/paymentManagementPage';
import reportsPage from '../pages/reportsPage';
import manualPaymentsPage from '../pages/manualPaymentsPage';
import constants from '../../support/constants.json';
const { getEnvironmentConfig } = require('../../support/configLoader');

When(/^I can see "(.*)" as the header$/, (text) => {
  paymentManagementPage.header().should('be.visible').and('have.text', text);
});

Then(/^I take a screenshot for "(.*)"$/, (text) => {
  //This will pass the correct name to be used for screenshot, name must be correct in order for embedding to work
  const screenshotName = `01_PaymentManagement.feature -- 01 Verify "${text}" links work correctly`;
  console.log('Screenshot Name:', screenshotName);
  cy.screenshot(screenshotName);
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

Then('the closure count has increased by {int}', (increment) => {
  cy.get('@initialClosureCount').then((initialCount) => {
    const expectedCount = Number(initialCount) + increment;

    paymentManagementPage
      .noOfClosures()
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const currentCount = parseInt(text, 10);
        expect(currentCount).to.equal(expectedCount);
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
  if (text === 'COHT Capital') {
    cy.wait(60000);
    cy.log('Wait for all payments to process');
  } else if (text === 'COHT Revenue') {
    cy.wait(60000);
    cy.log('Wait for all payments to process');
  }
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
  } else if (dropdown === 'statusReportScheme') {
    reportsPage.statusReportSchemeDropdown().scrollIntoView().select(text);
  }
});

When(/^I select the first visible year for the "(.*)" scheme$/, (schemeKey) => {
  const schemeMap = {
    'delinked': 'delinked-payment-statement',
    'sfi-23': 'sustainable-farming-incentive'
  };

  const valueToSelect = schemeMap[schemeKey.toLowerCase()];
  if (!valueToSelect) {
    throw new Error(`No mapping found for scheme "${schemeKey}"`);
  }

  cy.log(`Selecting <option> with value: "${valueToSelect}"`);

  reportsPage.statusReportSchemeDropdown().then(($select) => {
    const selectEl = $select[0];
    const option = [...selectEl.options].find(opt => opt.value === valueToSelect && !opt.hidden);

    if (!option) {
      throw new Error(`No visible <option> with value "${valueToSelect}" found`);
    }

    selectEl.value = option.value;
    selectEl.dispatchEvent(new Event('change', { bubbles: true }));

    cy.log(`Selected "${option.textContent.trim()}"`);
    expect(selectEl.value).to.eq(option.value);
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

Given('the sample report data is loaded', () => {
  cy.task('loadReportData').then((result) => {
    expect(result.success, result.error).to.be.true;
  });
});

When('I click on an available report', () => {
  reportsPage.availableReports().first().scrollIntoView().click({ force: true });
});

When(/^the user downloads the status report with text "(.*)"$/, (linkText) => {
  const { paymentManagementUrl } = getEnvironmentConfig();

  cy.contains('a.govuk-task-list__link', linkText)
    .should('have.attr', 'href')
    .then((relativeHref) => {
      const baseUrl = paymentManagementUrl.replace(/\/$/, '');
      const path = relativeHref.startsWith('/') ? relativeHref : `/${relativeHref}`;
      const fullUrl = `${baseUrl}${path}`;

      const decodedHref = decodeURIComponent(relativeHref);
      const filePathParam = decodedHref.split('file-name=')[1];

      const rawFileName = filePathParam.replace(/\//g, '_');
      const sanitizedFileName = rawFileName.replace(/:/g, '_');
      const filePath = `cypress/downloads/${sanitizedFileName}`;

      cy.request({
        url: fullUrl,
        encoding: 'utf8'
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.writeFile(filePath, response.body);
      });

      cy.wrap(sanitizedFileName).as('downloadedFileName');
    });
});

When(/^the status report is downloaded with "(.*)" as the title$/, function (title) {
  cy.get('@downloadedFileName').then((fileName) => {
    const expectedFileName = `${title}.csv`;
    expect(fileName).to.include(expectedFileName);

    const relativePath = `cypress/downloads/${fileName}`;
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
  });
});

When(/^on the Manual Payments page I enter "(.*)" as the file to upload$/, (fileName) => {
  const filePath = `cypress/fixtures/${fileName}`;
  manualPaymentsPage.chooseFileBtn().selectFile(filePath);
  cy.log(`The file ${fileName} is attached successfully`);
  console.log(`The file ${fileName} is attached successfully`);

});

When(/^on the Manual Payments page I click the "(.*)"$/, (button) => {
  switch (button) {
  case 'upload button': manualPaymentsPage.uploadBtn().click(); break;
  case 'manual payments guidance link': manualPaymentsPage.manualPaymentsGuidanceLink().click(); break;
  case 'return button': manualPaymentsPage.returnButton().click(); break;
  }

  cy.log(`Clicked on the ${button} successfully`);
  console.log(`Clicked on the ${button} successfully`);
});

Then(/^on the Manual Payments page I confirm that "(.*)" is present$/, (element) => {
  switch (element) {
  case 'page title':
    manualPaymentsPage.pageTitle().should('be.visible').and('have.text', 'Manual payment upload'); break;
  case 'page description':
    manualPaymentsPage.pageDescription().should('be.visible').and('contain.text', 'This section allows teams to upload manual payment files into Payment Hub. Once uploaded, these files will automatically feed into the standard payment process'); break;
  case 'choose file button':
    manualPaymentsPage.chooseFileBtn().should('be.visible').and('have.attr', 'type', 'file'); break;
  case 'upload button':
    manualPaymentsPage.uploadBtn().should('be.visible').and('have.attr', 'type', 'submit'); break;
  case 'manual payments guidance link':
    manualPaymentsPage.manualPaymentsGuidanceLink().should('be.visible').and('contain.text', 'Manual Payments Guidance (PDF)'); break;
  case 'file upload confirmation message':
    manualPaymentsPage.statusText().should('be.visible').and('contain.text', 'Your manual payment file has been successfully processed. To make another upload, please click the link below to return to the manual payments page.'); break;
  case 'duplicate file error message':
    manualPaymentsPage.errorText().should('be.visible').and('contain.text', 'This file has already been uploaded. The file has not been re-processed. Please ensure you are uploading the correct and most recent file.'); break;
  case 'invalid file type error message':
    manualPaymentsPage.typeErrorText().should('be.visible').and('contain.text', 'Invalid file type - The selected file type is not supported. Please upload a valid CSV file.'); break;
  case 'invalid name error message':
    manualPaymentsPage.nameErrorText().should('be.visible').and('contain.text', 'Error: Invalid filename - We were unable to upload your manual payment file. Filenames must start with "FFC_Manual_Batch_". Optionally include a scheme (e.g. "SFI_" or "SFI23_"), then a timestamp in one of these formats: YYYYMMDDHHmm or YYYYMMDDHHmmss. The filename must end with ".csv". Examples: FFC_Manual_Batch_SFI23_202510231609.csv, FFC_Manual_Batch_202510231609.csv.'); break;
  case 'invalid file size message':
    manualPaymentsPage.nameErrorText().should('be.visible').and('contain.text', 'File too large - The uploaded file is too large. Please upload a file smaller than 1 MB.'); break;
  case 'empty file message':
    manualPaymentsPage.nameErrorText().should('be.visible').and('contain.text', 'We couldn’t process your upload because the file is empty. Please upload a file that contains data.'); break;
  case 'return button':
    manualPaymentsPage.returnButton().should('be.visible').and('have.text', 'Return'); break;
  case 'error return button':
    manualPaymentsPage.errorReturnButton().should('be.visible').and('have.text', 'Return'); break;
  case 'upload history table':
    manualPaymentsPage.uploadHistoryTable().should('be.visible'); break;
  }

  console.log('Confirmed that', element, 'is present on the Manual Payments page');
  cy.log('Confirmed that', element, 'is present on the Manual Payments page');
});

Then(/^on the Manual Payments page I confirm that entry with filename "(.*)" has been added to Upload History$/, (filename) => {

  manualPaymentsPage.uploadHistoryFilename().should('be.visible').and('have.text', filename);

  console.log('Confirmed that entry with filename', filename, 'has been added to Upload History');
  cy.log('Confirmed that entry with filename', filename, 'has been added to Upload History');
});

Then(/^on the Manual Payments page I click the View payment status link and confirm that expected FRN values are present$/, () => {

  cy.wait(240000); // Waiting for the all payments to be processed and displayed on the Payment Status page

  cy.get('a').contains("View payment status").scrollIntoView().click();

  const expectedFrns = ['1101264748', '1102172936', '1100510281', '1102368121', '1102468347',
    '1102383090', '1102316393', '1102353752', '1101123524', '1102420085', '1100064087', '1101327626',
    '1102424838', '1101208473', '1102154929', '1102429120', '1102276170', '1105107663', '1101187093',
    '1102471216', '1101390719', '1105825027', '1102433217', '1102051217', '1102425639', '1101895640',
    '1101979593', '1102472441', '1101266414', '1102566144', '1102430692', '1105383822', '1101594292',
    '1102419133', '1102732354', '1102415731', '1102218766', '1100659986', '1101744723', '1102459704',
    '1100676279', '1106030427', '1104790709', '1102862487', '1101099038', '1102857890', '1101321105',
    '1100632360', '1102300063', '1100321020', '1102417300'];
  expectedFrns.forEach(frn => {
    cy.contains('td', frn).should('be.visible');
  });
  console.log('Confirmed that expected FRN values are present on the Payment Status page');
  cy.log('Confirmed that expected FRN values are present on the Payment Status page');
});

Then(/^on the Processed Payment Requests page I confirm that entry is present for "(.*)" scheme with "(.*)" payments and a value of "(.*)"$/, (scheme, payments, value) => {
  cy.wait(2000); // Waiting for data load
  cy.contains(scheme).should('be.visible');
  cy.contains(payments).should('be.visible');
  cy.contains(value).should('be.visible');
});

When (/^on the Add New Alert Recipient page I click the "(.*)" button$/, (button) => {
  switch (button) {
  case 'Add recipient':
    paymentManagementPage.addNewAlertReceipientButton().click(); break;
  }
  cy.log(`Clicked on the ${button} button successfully`);
  console.log(`Clicked on the ${button} button successfully`);
});