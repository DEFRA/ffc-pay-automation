/* global Given, When, Then */

import paymentManagementPage from '../pages/paymentManagementPage';
import reportsPage from '../pages/reportsPage';
import manualPaymentsPage from '../pages/manualPaymentsPage';
import managementInformationPage from '../pages/managementInformationPage';
import constants from '../../support/constants.json';
import downloadStatementsPage from '../pages/downloadStatementsPage';
import resetPaymentRequestPage from '../pages/resetPaymentRequestPage';
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

Then(/^I select "(.*)" from the monitor schemes dropdown$/, (scheme) => {
  paymentManagementPage.monitorSchemeDropdown().scrollIntoView().select(scheme);
  cy.log(`Selected ${scheme} from the monitor schemes dropdown`);
  console.log(`Selected ${scheme} from the monitor schemes dropdown`);
});

Then(/^I confirm that payment for "(.*)" scheme with "(.*)" payment installments totalling "(.*)" is displayed$/, (scheme, payments, value) => {
  cy.wait(2000); // Waiting for data load
  cy.contains(scheme).should('be.visible');
  cy.contains(payments).should('be.visible');
  cy.contains(value).should('be.visible');
  cy.log(`Confirmed that payment for ${scheme} scheme with ${payments} payment installments totalling ${value} is displayed`);
  console.log(`Confirmed that payment for ${scheme} scheme with ${payments} payment installments totalling ${value} is displayed`);
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
    manualPaymentsPage.typeErrorText().should('be.visible').and('contain.text', 'Invalid file type - We were unable to upload your manual payment file as the uploaded file is not a .CSV file. Only .CSV files are permitted.'); break;
  case 'invalid name error message':
    manualPaymentsPage.nameErrorText().should('be.visible').and('contain.text', 'Invalid filename - We were unable to upload your manual payment file. Filenames must start with "FFC_Manual_Batch_". Optionally include a scheme (e.g. "SFI_" or "SFI23_"), then a timestamp in one of these formats: YYYYMMDDHHmm or YYYYMMDDHHmmss. The filename must end with ".csv". Examples: FFC_Manual_Batch_SFI23_202510231609.csv, FFC_Manual_Batch_202510231609.csv.'); break;
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
  default:
    throw new Error('invalid element');
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

Then (/^on the Management Information page I confirm that "(.*)" is not displayed$/, (element) => {
  switch (element) {
  case 'select year filter dropdown':
    managementInformationPage.selectYearFilterDropdown().should('not.be.visible'); break;
  case 'select month filter dropdown':
    managementInformationPage.selectMonthFilterDropdown().should('not.be.visible'); break;
  default:
    throw new Error('invalid element');
  }

  console.log('Confirmed that', element, 'is not displayed on the Management Information page');
  cy.log('Confirmed that', element, 'is not displayed on the Management Information page');
});


Then (/^on the Management Information page I confirm that "(.*)" is displayed$/, (element) => {
  switch (element) {
  case 'page title':
    managementInformationPage.pageTitle().should('be.visible').and('have.text', 'Management Information'); break;
  case 'page description':
    managementInformationPage.pageDescription().should('be.visible').and('contain.text', 'View payment and document metrics filtered by time period.'); break;
  case 'help dropdown':
    managementInformationPage.helpDropdown().should('be.visible').and('contain.text', 'Help with this page'); break;
  case 'help description':
    managementInformationPage.helpDescription().should('be.visible').and('have.text', 'This dashboard provides operational metrics for payments and documents.'); break;
  case 'show all description':
    managementInformationPage.showAllDescription().should('be.visible').and('have.text', '\n              Show all - View complete dataset with no date filtering (includes year breakdown)'); break;
  case 'year to date description':
    managementInformationPage.yearToDateDescription().should('be.visible').and('have.text', '\n              Year to date - View data from 1 January of the current year to today'); break;
  case 'by year description':
    managementInformationPage.byYearDescription().should('be.visible').and('have.text', '\n              By year - Select a specific year to view annual data'); break;
  case 'by month description':
    managementInformationPage.byMonthDescription().should('be.visible').and('have.text', '\n              By month - Select a specific year and month to view monthly data'); break;
  case 'this month description':
    managementInformationPage.thisMonthDescription().should('be.visible').and('have.text', '\n              This month - View data for the current calendar month'); break;
  case 'last 7 days description':
    managementInformationPage.last7DaysDescription().should('be.visible').and('have.text', '\n              Last 7 days - View recent weekly activity'); break;
  case 'last 24 hours description':
    managementInformationPage.last24HoursDescription().should('be.visible').and('have.text', '\n              Last 24 hours - View real-time daily activity'); break;
  case 'payment values description':
    managementInformationPage.paymentValuesDescription().should('be.visible').and('have.text', 'Payment values are displayed in pounds (£)'); break;
  case 'print and post description':
    managementInformationPage.printAndPostDescription().should('be.visible').and('have.text', 'Print & Post costs are calculated based on actual postage rates'); break;
  case 'time period filter dropdown':
    managementInformationPage.timePeriodFilterDropdown().should('be.visible'); break;
  case 'time period filter button':
    managementInformationPage.timePeriodFilterButton().should('be.visible').and('contain.text', 'Apply filters'); break;
  case 'payment metrics sub header':
    managementInformationPage.paymentMetricsSubHeader().should('be.visible').and('have.text', 'Payment Metrics'); break;
  case 'payments panel':
    managementInformationPage.paymentsPanel().should('be.visible').and('contain.text', 'Payments'); break;
  case 'payments count':
    managementInformationPage.paymentsCount().should('be.visible'); break;
  case 'total value panel':
    managementInformationPage.totalValuePanel().should('be.visible').and('contain.text', 'Total Value'); break;
  case 'total value amount':
    managementInformationPage.totalValueAmount().should('be.visible'); break;
  case 'breakdown description':
    managementInformationPage.breakdownDescription().should('be.visible').and('contain.text', 'Breakdown of payments and values by scheme'); break;
  case 'payment scheme column':
    managementInformationPage.paymentSchemeColumn().should('be.visible').and('have.text', 'Scheme'); break;
  case 'total payments column':
    managementInformationPage.totalPaymentsColumn().should('be.visible').and('have.text', 'Total Payments'); break;
  case 'total value column':
    managementInformationPage.totalValueColumn().should('be.visible').and('have.text', 'Total Value (£)'); break;
  case 'pending column':
    managementInformationPage.pendingColumn().should('be.visible').and('have.text', 'Pending'); break;
  case 'processed column':
    managementInformationPage.processedColumn().should('be.visible').and('have.text', 'Processed'); break;
  case 'documents metrics sub header':
    managementInformationPage.documentsMetricsSubHeader().should('be.visible').and('have.text', 'Document Metrics'); break;
  case 'documents issued':
    managementInformationPage.documentsIssued().should('be.visible').and('contain.text', 'Documents Issued'); break;
  case 'documents count':
    managementInformationPage.documentsCount().should('be.visible'); break;
  case 'documents breakdown description':
    managementInformationPage.docBreakdownDescription().should('be.visible').and('contain.text', 'Breakdown of documents by scheme showing delivery methods and costs'); break;
  case 'documents scheme column':
    managementInformationPage.docSchemeColumn().should('be.visible').and('have.text', 'Scheme'); break;
  case 'year column':
    managementInformationPage.yearColumn().should('be.visible').and('have.text', 'Year'); break;
  case 'total documents column':
    managementInformationPage.totalDocumentsColumn().should('be.visible').and('have.text', 'Total Documents'); break;
  case 'print and post column':
    managementInformationPage.printAndPostColumn().should('be.visible').and('have.text', 'Print & Post'); break;
  case 'print and post cost column':
    managementInformationPage.printAndPostCostColumn().should('be.visible').and('have.text', 'Print & Post Cost (£)'); break;
  case 'email column':
    managementInformationPage.emailColumn().should('be.visible').and('have.text', 'Email'); break;
  case 'select year filter dropdown':
    managementInformationPage.selectYearFilterDropdown().should('be.visible'); break;
  case 'select month filter dropdown':
    managementInformationPage.selectMonthFilterDropdown().should('be.visible'); break;
  case 'no payment data message':
    managementInformationPage.noPaymentDataMessage().should('be.visible').and('have.text', 'No payment data available for the selected period.'); break;
  case 'no document data message':
    managementInformationPage.noDocumentDataMessage().should('be.visible').and('have.text', 'No document data available for the selected period.'); break;
  case 'clear filters':
    managementInformationPage.clearFiltersButton().should('be.visible').and('have.text', 'Clear filters'); break;
  default:
    throw new Error('invalid element');
  }

  console.log('Confirmed that', element, 'is displayed on the Management Information page');
  cy.log('Confirmed that', element, 'is displayed on the Management Information page');
});

Then(/^on the Management Information page I select "(.*?)" in (.*?) filter$/, (option, filter) => {

  if (filter === 'Time Period') {
    managementInformationPage.timePeriodFilterDropdown().scrollIntoView().select(option);
  } else if (filter === 'Select Year') {
    managementInformationPage.selectYearFilterDropdown().scrollIntoView().select(option);
  } else if (filter === 'Select Month') {
    managementInformationPage.selectMonthFilterDropdown().scrollIntoView().select(option);
  } else {
    throw new Error(`Unknown filter: ${filter}`);
  }

  cy.log(`Selected ${option} option in ${filter} filter`);
  console.log(`Selected ${option} option in ${filter} filter`);
});

When(/^on the Management Information page I click on the "(.*)" button$/, (button) => {
  switch (button) {
  case 'help with this page':
    managementInformationPage.helpDropdown().scrollIntoView().click(); break;
  case 'apply filters':
    managementInformationPage.timePeriodFilterButton().scrollIntoView().click(); break;
  case 'clear filters':
    managementInformationPage.clearFiltersButton().scrollIntoView().click(); break;
  default:
    throw new Error('invalid button name');
  }

  cy.log('Clicked', button, 'on Management Information page');
  console.log('Clicked', button, 'on Management Information page');
});

Then(/^on the Management Information page I confirm that (.*) is (.*)$/, (field, expectedValue) => {
  let fieldNumber;

  switch (field) {
  case 'number of payments': fieldNumber = 0; break;
  case 'payment amount': fieldNumber = 1; break;
  case 'number of documents': fieldNumber = 2; break;
  default:
    throw new Error('invalid field name');
  }

  let actualValue;

  cy.get('.metrics-panel').eq(fieldNumber)
    .find('.metrics-panel__body')

    .invoke('text')
    .then((text) => {
      actualValue = text.trim();   // "0"

      console.log(`Expected Value = ${expectedValue}. Actual Value = ${actualValue}`);
      cy.log(`Expected Value = ${expectedValue}. Actual Value = ${actualValue}`);

      if (expectedValue === actualValue) {
        console.log(`Confirmed that ${field} is ${expectedValue}`);
        cy.log(`Confirmed that ${field} is ${expectedValue}`);
      } else {
        console.log(`${field} is not ${expectedValue}, Actual value is ${actualValue}`);
        cy.log(`${field} is not ${expectedValue}, Actual value is ${actualValue}`);
        throw new Error('Incorrect value');
      }
    });
});

Then (/^on the Download Statements page I confirm that "(.*)" is displayed$/, (element) => {
  switch (element) {
  case 'page title':
    downloadStatementsPage.pageTitle().should('be.visible').and('have.text', 'Download Statements'); break;
  case 'page description':
    downloadStatementsPage.pageDescription().should('be.visible').and('contain.text', 'Search for payment statements. At least one field is required.'); break;
  case 'page instructions':
    downloadStatementsPage.pageInstructions().should('be.visible').and('contain.text', 'Search using the full filename if known.'); break;
  case 'instruction examples':
    downloadStatementsPage.instructionExamples().should('be.visible').and('contain.text', 'Examples:', 'FFC_PaymentDelinkedStatement_DP_2024_1100021264_2025101508224868.pdf', 'FFC_PaymentSfi23QuarterlyStatement_DP_2024_1100021264_2025101508224868.pdf\n  '); break;
  case 'filename field':
    downloadStatementsPage.filenameField().should('be.visible').and('have.attr', 'type', 'text'); break;
  case 'individual criteria instructions':
    downloadStatementsPage.individualCriteriaInstructions().should('be.visible').and('contain.text', 'Or search by individual criteria:'); break;
  case 'select scheme label':
    downloadStatementsPage.selectSchemeLabel().should('be.visible').and('contain.text', 'Select the scheme to view data for'); break;
  case 'select scheme dropdown':
    downloadStatementsPage.selectSchemeDropdown().should('be.visible').and('have.attr', 'class', 'govuk-select'); break;
  case 'marketing year label':
    downloadStatementsPage.marketingYearLabel().should('be.visible').and('contain.text', 'Marketing year'); break;
  case 'marketing year field':
    downloadStatementsPage.marketingYearField().should('be.visible').and('have.attr', 'type', 'text'); break;
  case 'frn label':
    downloadStatementsPage.frnLabel().should('be.visible').and('contain.text', 'Firm reference number (FRN)'); break;
  case 'frn search instructions':
    downloadStatementsPage.frnSearchInstructions().should('be.visible').and('contain.text', 'Enter a 10-digit FRN'); break;
  case 'frn field':
    downloadStatementsPage.frnField().should('be.visible').and('have.attr', 'type', 'text'); break;
  case 'timestamp label':
    downloadStatementsPage.timestampLabel().should('be.visible').and('contain.text', 'Timestamp'); break;
  case 'timestamp search instructions':
    downloadStatementsPage.timestampSearchInstructions().should('be.visible').and('contain.text', '16 digits, e.g. 2025101508224868'); break;
  case 'timestamp field':
    downloadStatementsPage.timestampField().should('be.visible').and('have.attr', 'type', 'text'); break;
  case 'search statements button':
    downloadStatementsPage.searchStatementsButton().should('be.visible').and('have.attr', 'class', 'govuk-button'); break;
  case 'clear button':
    downloadStatementsPage.clearButton().should('be.visible').and('have.attr', 'type', 'button'); break;
  case 'results sub header':
    downloadStatementsPage.resultsSubHeader().should('be.visible').and('contain.text', 'Results'); break;
  case 'number of results':
    downloadStatementsPage.numberOfResults().should('be.visible').and('contain.text', 'Showing items', 'on this page'); break;
  case 'scheme column':
    downloadStatementsPage.schemeColumn().should('be.visible').and('contain.text', 'Scheme'); break;
  case 'year column':
    downloadStatementsPage.yearColumn().should('be.visible').and('contain.text', 'Year'); break;
  case 'frn column':
    downloadStatementsPage.frnColumn().should('be.visible').and('contain.text', 'FRN'); break;
  case 'timestamp column':
    downloadStatementsPage.timestampColumn().should('be.visible').and('contain.text', 'Timestamp'); break;
  case 'action column':
    downloadStatementsPage.actionColumn().should('be.visible').and('contain.text', 'Action'); break;
  case 'next button':
    downloadStatementsPage.nextButton().should('be.visible').and('have.attr', 'class', 'govuk-link govuk-pagination__link'); break;
  case 'previous button':
    downloadStatementsPage.previousButton().should('be.visible').and('have.attr', 'class', 'govuk-link govuk-pagination__link'); break;
  default:
    throw new Error('invalid element');
  }

  console.log('Confirmed that', element, 'is displayed on the Download Statements page');
  cy.log('Confirmed that', element, 'is displayed on the Download Statements page');
});

Then (/^on the Download Statements page I confirm that "(.*)" is not displayed$/, (element) => {


  switch (element) {
  case 'page title':
    downloadStatementsPage.pageTitle().should('not.exist'); break;
  case 'page description':
    downloadStatementsPage.pageDescription().should('not.exist'); break;
  case 'page instructions':
    downloadStatementsPage.pageInstructions().should('not.exist'); break;
  case 'instruction examples':
    downloadStatementsPage.instructionExamples().should('not.exist'); break;
  case 'filename field':
    downloadStatementsPage.filenameField().should('not.exist'); break;
  case 'individual criteria instructions':
    downloadStatementsPage.individualCriteriaInstructions().should('not.exist'); break;
  case 'select scheme label':
    downloadStatementsPage.selectSchemeLabel().should('not.exist'); break;
  case 'select scheme dropdown':
    downloadStatementsPage.selectSchemeDropdown().should('not.exist'); break;
  case 'marketing year label':
    downloadStatementsPage.marketingYearLabel().should('not.exist'); break;
  case 'marketing year field':
    downloadStatementsPage.marketingYearField().should('not.exist'); break;
  case 'frn label':
    downloadStatementsPage.frnLabel().should('not.exist'); break;
  case 'frn search instructions':
    downloadStatementsPage.frnSearchInstructions().should('not.exist'); break;
  case 'frn field':
    downloadStatementsPage.frnField().should('not.exist'); break;
  case 'timestamp label':
    downloadStatementsPage.timestampLabel().should('not.exist'); break;
  case 'timestamp search instructions':
    downloadStatementsPage.timestampSearchInstructions().should('not.exist'); break;
  case 'timestamp field':
    downloadStatementsPage.timestampField().should('not.exist'); break;
  case 'search statements button':
    downloadStatementsPage.searchStatementsButton().should('not.exist'); break;
  case 'clear button':
    downloadStatementsPage.clearButton().should('not.exist'); break;
  case 'results sub header':
    downloadStatementsPage.resultsSubHeader().should('not.exist'); break;
  case 'number of results':
    downloadStatementsPage.numberOfResults().should('not.exist'); break;
  case 'scheme column':
    downloadStatementsPage.schemeColumn().should('not.exist'); break;
  case 'year column':
    downloadStatementsPage.yearColumn().should('not.exist'); break;
  case 'frn column':
    downloadStatementsPage.frnColumn().should('not.exist'); break;
  case 'timestamp column':
    downloadStatementsPage.timestampColumn().should('not.exist'); break;
  case 'action column':
    downloadStatementsPage.actionColumn().should('not.exist'); break;
  case 'next button':
    downloadStatementsPage.nextButton().should('not.exist'); break;
  case 'previous button':
    downloadStatementsPage.previousButton().should('not.exist'); break;
  default:
    throw new Error('invalid element');
  }

  console.log('Confirmed that', element, 'is not displayed on the Download Statements page');
  cy.log('Confirmed that', element, 'is not displayed on the Download Statements page');
});

Then(/^on the Download Statements page I select "(.*)" from the select scheme dropdown$/, (scheme) => {
  downloadStatementsPage.selectSchemeDropdown().scrollIntoView().select(scheme);
  cy.log(`Selected ${scheme} from the select scheme dropdown`);
  console.log(`Selected ${scheme} from the select scheme dropdown`);

});

Then(/^on the Download Statements page I click the "(.*)" button$/, (button) => {
  switch (button) {
  case 'search':
    downloadStatementsPage.searchStatementsButton().scrollIntoView().click(); break;
  case 'clear':
    downloadStatementsPage.clearButton().scrollIntoView().click(); break;
  case 'next':
    downloadStatementsPage.nextButton().scrollIntoView().click(); break;
  case 'previous':
    downloadStatementsPage.previousButton().scrollIntoView().click(); break;
  default:
    throw new Error('invalid button name');
  }
});

Then(/^on the Download Statements page I confirm that the page number on Results sub header is "(.*)"$/, (expectedValue) => {
  downloadStatementsPage.resultsSubHeader().should('be.visible').invoke('text').then((text) => {

    if (text.includes(`Page ${expectedValue}`)) {
      console.log(`Confirmed that the page number on Results sub header is ${expectedValue}`);
      cy.log(`Confirmed that the page number on Results sub header is ${expectedValue}`);
    } else {
      console.log(`Page number on Results sub header is not ${expectedValue}, actual value is ${text}`);
      cy.log(`Page number on Results sub header is not ${expectedValue}, actual value is ${text}`);
      throw new Error('Incorrect page number');
    }
  });
});

Then(/^on the Download Statements page I enter "(.*)" into the "(.*)" field$/, (filename, field) => {

  switch (field) {
  case 'filename':
    downloadStatementsPage.filenameField().scrollIntoView().type(filename); break;
  case 'marketing year':
    downloadStatementsPage.marketingYearField().scrollIntoView().type(filename); break;
  case 'frn':
    downloadStatementsPage.frnField().scrollIntoView().type(filename); break;
  case 'timestamp':
    downloadStatementsPage.timestampField().scrollIntoView().type(filename); break;
  default:
    throw new Error('invalid field name');
  }

  console.log(`Entered ${filename} into the ${field} field on the Download Statements page`);
  cy.log(`Entered ${filename} into the ${field} field on the Download Statements page`);
});

Then(/^on the Download Statements page I confirm that the text on "(.*)" reads "(.*)"$/, (element, expectedText) => {
  var selectedElement;

  switch (element) {
  case 'number of results':
    selectedElement = downloadStatementsPage.numberOfResults(); break;
  default:
    throw new Error('invalid element');
  }

  selectedElement.should('be.visible').invoke('text').then((text) => {
    if (text.includes(expectedText)) {
      console.log(`Confirmed that the text on ${element} reads ${expectedText}`);
      cy.log(`Confirmed that the text on ${element} reads ${expectedText}`);
    } else {
      console.log(`The text on ${element} does not read ${expectedText}, actual value is ${text}`);
      cy.log(`The text on ${element} does not read ${expectedText}, actual value is ${text}`);
      throw new Error('Incorrect text');
    }
  });
});

Then(/^on the Download Statements page I confirm that statement can be downloaded$/, () => {
  cy.request('/download-statements/download/FFC_PaymentDelinkedStatement_DP_2025_1105607649_2025101415310344.pdf')
    .its('status') .should('eq', 200);
});

Then (/^on the Reset payment request page I confirm that "(.*)" is displayed$/, (element) => {
  switch (element) {
  case 'page title':
    resetPaymentRequestPage.pageTitle().should('be.visible').and('have.text', 'Reset payment request'); break;
  case 'page description':
    resetPaymentRequestPage.pageDescription().should('be.visible').and('contain.text', 'Invoice number'); break;
  case 'page instructions':
    resetPaymentRequestPage.pageInstructions().should('be.visible').and('contain.text', 'Enter the DAX formatted invoice number, for example S1234567S1234567V001'); break;
  case 'invoice number field':
    resetPaymentRequestPage.invoiceNumberField().should('be.visible').and('have.attr', 'type', 'text'); break;
  case 'reset button':
    resetPaymentRequestPage.resetButton().should('be.visible').and('have.attr', 'type', 'submit'); break;
  case 'payment request does not exist error':
    resetPaymentRequestPage.errorTitle().should('be.visible').and('contain.text', 'There is a problem');
    resetPaymentRequestPage.errorMessage().should('be.visible').and('contain.text', 'Payment request S279591940653785V001 does not exist'); break;
  case 'enter a valid invoice number error':
    resetPaymentRequestPage.errorTitle().should('be.visible').and('contain.text', 'There is a problem');
    resetPaymentRequestPage.errorMessage().should('be.visible').and('contain.text', 'ValidationError: Enter a valid invoice number'); break;
  case 'payment request successfully reset message':
    resetPaymentRequestPage.successTitle().should('be.visible').and('contain.text', 'Payment request successfully reset');
    resetPaymentRequestPage.successMessage().should('be.visible').and('contain.text', 'Invoice number', 'S279591940653785V001'); break;
  case 'what happens next subheader':
    resetPaymentRequestPage.whatHappensNextSubheader().should('be.visible').and('contain.text', 'What happens next'); break;
  case 'what happens next message':
    resetPaymentRequestPage.whatHappensNextMessage().should('be.visible').and('contain.text', 'The payment request will be reprocessed and resent to DAX.'); break;
  case 'perform another action link':
    resetPaymentRequestPage.performAnotherActionLink().should('be.visible').and('contain.text', 'Perform another action'); break;
  default:
    throw new Error('invalid element');
  }

  console.log('Confirmed that', element, 'is displayed on the Reset payment request page');
  cy.log('Confirmed that', element, 'is displayed on the Reset payment request page');
});

Then (/^on the Reset payment request page I enter "(.*)" into the "(.*)" field$/, (text, field) => {
  switch (field) {
  case 'invoice number':
    resetPaymentRequestPage.invoiceNumberField().scrollIntoView().type(text); break;
  default:
    throw new Error('invalid field name');
  }

  console.log(`Entered ${text} into the ${field} field on the Reset payment request page`);
  cy.log(`Entered ${text} into the ${field} field on the Reset payment request page`);
});

Then (/^on the Reset payment request page I click the "(.*)"$/, (button) => {
  switch (button) {
  case 'reset button': resetPaymentRequestPage.resetButton().scrollIntoView().click(); break;
  case 'perform another action link': resetPaymentRequestPage.performAnotherActionLink().scrollIntoView().click(); break;
  default:
    throw new Error('invalid button name');
  }
  cy.log(`Clicked on the ${button} successfully`);
  console.log(`Clicked on the ${button} successfully`);
});

Then(/^I confirm that second completedPaymentRequest entry has been made in database for invoice number "(.*)"$/, (invoiceNumber) => {
  const sqlStatement = `SELECT * FROM "completedPaymentRequests" WHERE "invoiceNumber" = '${invoiceNumber}'`;
  const databaseName = 'ffc-pay-processing';

  cy.databaseQuery({ databaseName, sqlStatement }).then((result) => {
    const data = result.rows;
    cy.log(`Found ${data.length} completedPaymentRequest entries for invoice number ${invoiceNumber}`);
    if (data.length >= 2) {
      console.log(`Confirmed that second completedPaymentRequest entry has been made in database for invoice number ${invoiceNumber}`);
      cy.log(`Confirmed that second completedPaymentRequest entry has been made in database for invoice number ${invoiceNumber}`);
    } else {
      console.log(`Expected at least 2 completedPaymentRequest entries for invoice number ${invoiceNumber}, but found ${data.length}`);
      cy.log(`Expected at least 2 completedPaymentRequest entries for invoice number ${invoiceNumber}, but found ${data.length}`);
      throw new Error('Second completedPaymentRequest entry has not been made in database');
    }
  });
});