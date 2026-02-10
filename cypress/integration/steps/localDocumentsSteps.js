/* global Given, When, Then */

Given(/^I restart and clear the local doc environment$/, () => {
  cy.restartLocalDocEnv();
});

When(/^I insert (.*) test data into Statement Data service$/, (year) => {

  const databaseName = 'ffc-doc-statement-data';
  const sqlStatement = `INSERT INTO "organisations" ("sbi","addressLine1", "addressLine2", "addressLine3", "city", "county", "postcode", "emailAddress", "frn", "name", "updated")
VALUES
(123456789,'8 The Street','Area','District','City','County','AA1 1BB','documents.performance.test@gmail.com','1234567890','Test Farm',to_date('28-JUN-24 03:54:41','DD-MON-YY HH:MI:SS'))
ON CONFLICT ("sbi")
DO UPDATE SET
  "addressLine1" = EXCLUDED."addressLine1",
  "addressLine2" = EXCLUDED."addressLine2",
  "addressLine3" = EXCLUDED."addressLine3",
  "city" = EXCLUDED."city",
  "county" = EXCLUDED."county",
  "postcode" = EXCLUDED."postcode",
  "emailAddress" = EXCLUDED."emailAddress",
  "frn" = EXCLUDED."frn",
  "name" = EXCLUDED."name",
  "updated" = EXCLUDED."updated";

INSERT INTO "delinkedCalculation" ("applicationId", "calculationId", "sbi", "frn", "paymentBand1", "paymentBand2", "paymentBand3", "paymentBand4", "percentageReduction1", "percentageReduction2", "percentageReduction3", "percentageReduction4", "progressiveReductions1", "progressiveReductions2", "progressiveReductions3", "progressiveReductions4", "totalProgressiveReduction", "referenceAmount", "totalDelinkedPayment", "paymentAmountCalculated", "updated")
VALUES
(1234567,987654321,123456789,'1234567890',30000,50000,150000,99999999.99,50.00,55.00,65.00,70.00,15000.00,11000.00,65000.00,35000.00,126000.00,2000000.00,75000.00,37500.00,'2025-09-04 13:34:26.219')
ON CONFLICT ("calculationId")
DO UPDATE SET
  "applicationId" = EXCLUDED."applicationId",
  "sbi" = EXCLUDED."sbi",
  "frn" = EXCLUDED."frn",
  "paymentBand1" = EXCLUDED."paymentBand1",
  "paymentBand2" = EXCLUDED."paymentBand2",
  "paymentBand3" = EXCLUDED."paymentBand3",
  "paymentBand4" = EXCLUDED."paymentBand4",
  "percentageReduction1" = EXCLUDED."percentageReduction1",
  "percentageReduction2" = EXCLUDED."percentageReduction2",
  "percentageReduction3" = EXCLUDED."percentageReduction3",
  "percentageReduction4" = EXCLUDED."percentageReduction4",
  "progressiveReductions1" = EXCLUDED."progressiveReductions1",
  "progressiveReductions2" = EXCLUDED."progressiveReductions2",
  "progressiveReductions3" = EXCLUDED."progressiveReductions3",
  "progressiveReductions4" = EXCLUDED."progressiveReductions4",
  "totalProgressiveReduction" = EXCLUDED."totalProgressiveReduction",
  "referenceAmount" = EXCLUDED."referenceAmount",
  "totalDelinkedPayment" = EXCLUDED."totalDelinkedPayment",
  "paymentAmountCalculated" = EXCLUDED."paymentAmountCalculated";

INSERT INTO "d365" ("calculationId", "paymentPeriod", "paymentReference", "paymentAmount", "transactionDate", "marketingYear")
VALUES
(987654321,'` + year + `','PY0410241',37500.00,to_date('01-AUG-24 12:00:00','DD-MON-YY HH:MI:SS'),'` + year + `');
`;

  cy.databaseInsert({databaseName, sqlStatement});
  cy.wait(180000); // Wait for the data to be inserted and to be processed through all doc services
  cy.log(`✅ Test data for year ${year} has been inserted into Statement Data service`);
});

When(/^I send bulk test data for (.*) into Statement Data service$/, (year) => {

  const databaseName = 'ffc-doc-statement-data';

  var sbi = '';
  var frn = '';
  var applicationId = '';
  var calculationId = '';

  switch (year) {
  case '2024':
    sbi = '12345678';
    frn = '123456789';
    applicationId = '123456';
    calculationId = '98765432';
    break;
  case '2025':
    sbi = '13345678';
    frn = '133456789';
    applicationId = '123456';
    calculationId = '88765432';
    break;

  }

  for (let i=0; i<10; i++) {

    const sqlStatement = `INSERT INTO "organisations" ("sbi","addressLine1", "addressLine2", "addressLine3", "city", "county", "postcode", "emailAddress", "frn", "name", "updated")
VALUES
(${sbi + i}, '${i} The Street','Area','District','City','County','AA1 1BB','documents.performance.test@gmail.com','${frn + i}','Test Farm',to_date('28-JUN-24 03:54:41','DD-MON-YY HH:MI:SS'))
ON CONFLICT ("sbi")
DO UPDATE SET
  "addressLine1" = EXCLUDED."addressLine1",
  "addressLine2" = EXCLUDED."addressLine2",
  "addressLine3" = EXCLUDED."addressLine3",
  "city" = EXCLUDED."city",
  "county" = EXCLUDED."county",
  "postcode" = EXCLUDED."postcode",
  "emailAddress" = EXCLUDED."emailAddress",
  "frn" = EXCLUDED."frn",
  "name" = EXCLUDED."name",
  "updated" = EXCLUDED."updated";

INSERT INTO "delinkedCalculation" ("applicationId", "calculationId", "sbi", "frn", "paymentBand1", "paymentBand2", "paymentBand3", "paymentBand4", "percentageReduction1", "percentageReduction2", "percentageReduction3", "percentageReduction4", "progressiveReductions1", "progressiveReductions2", "progressiveReductions3", "progressiveReductions4", "totalProgressiveReduction", "referenceAmount", "totalDelinkedPayment", "paymentAmountCalculated", "updated")
VALUES (
  ${(applicationId) + i}, ${(calculationId) + i}, ${sbi + i}, '${frn + i}',
  30000, 50000, 150000, 99999999.99,
  50.00, 55.00, 65.00, 70.00,
  15000.00, 11000.00, 65000.00, 35000.00,
  126000.00, 2000000.00, 75000.00, 37500.00,
  '2025-09-04 13:34:26.219'
)ON CONFLICT ("calculationId")
DO UPDATE SET
  "applicationId" = EXCLUDED."applicationId",
  "sbi" = EXCLUDED."sbi",
  "frn" = EXCLUDED."frn",
  "paymentBand1" = EXCLUDED."paymentBand1",
  "paymentBand2" = EXCLUDED."paymentBand2",
  "paymentBand3" = EXCLUDED."paymentBand3",
  "paymentBand4" = EXCLUDED."paymentBand4",
  "percentageReduction1" = EXCLUDED."percentageReduction1",
  "percentageReduction2" = EXCLUDED."percentageReduction2",
  "percentageReduction3" = EXCLUDED."percentageReduction3",
  "percentageReduction4" = EXCLUDED."percentageReduction4",
  "progressiveReductions1" = EXCLUDED."progressiveReductions1",
  "progressiveReductions2" = EXCLUDED."progressiveReductions2",
  "progressiveReductions3" = EXCLUDED."progressiveReductions3",
  "progressiveReductions4" = EXCLUDED."progressiveReductions4",
  "totalProgressiveReduction" = EXCLUDED."totalProgressiveReduction",
  "referenceAmount" = EXCLUDED."referenceAmount",
  "totalDelinkedPayment" = EXCLUDED."totalDelinkedPayment",
  "paymentAmountCalculated" = EXCLUDED."paymentAmountCalculated";

INSERT INTO "d365" ("calculationId", "paymentPeriod", "paymentReference", "paymentAmount", "transactionDate", "marketingYear")
VALUES (
  ${(calculationId) + i}, '${year}', 'PY141024` + i + `', 37500.00, to_date('01-AUG-24 12:00:00','DD-MON-YY HH:MI:SS'),'${year}'
);
`;

    cy.databaseInsert({databaseName, sqlStatement});

  }
  if (year === '2025') {
    cy.wait(180000); // Wait for the data to be inserted and to be processed through all doc services
  }

  cy.log(`✅ Bulk test data for year ${year} has been inserted into Statement Data service`);
});

When(/^I send incorrect test data into (.*) service$/, (databaseName) => {

  var expectedError = '';
  var sqlStatement = '';

  switch (databaseName) {
  case 'ffc-doc-statement-constructor':
    expectedError = 'value too long for type character varying(30)';
    sqlStatement = `INSERT INTO "organisations" ("sbi","addressLine1", "addressLine2", "addressLine3", "city", "county", "postcode", "emailAddress", "frn", "name", "updated")
VALUES
(123456789,'8 The Street','Area','District','City','County','AA1 1BB','documents.performance.test@gmail.com','1234567890','Test Farm',to_date('28-JUN-24 03:54:41','DD-MON-YY HH:MI:SS'))
ON CONFLICT ("sbi")
DO UPDATE SET
  "addressLine1" = EXCLUDED."addressLine1",
  "addressLine2" = EXCLUDED."addressLine2",
  "addressLine3" = EXCLUDED."addressLine3",
  "city" = EXCLUDED."city",
  "county" = EXCLUDED."county",
  "postcode" = EXCLUDED."postcode",
  "emailAddress" = EXCLUDED."emailAddress",
  "frn" = EXCLUDED."frn",
  "name" = EXCLUDED."name",
  "updated" = EXCLUDED."updated";

INSERT INTO "delinkedCalculation" ("applicationId", "calculationId", "sbi", "frn", "paymentBand1", "paymentBand2", "paymentBand3", "paymentBand4", "percentageReduction1", "percentageReduction2", "percentageReduction3", "percentageReduction4", "progressiveReductions1", "progressiveReductions2", "progressiveReductions3", "progressiveReductions4", "totalProgressiveReduction", "referenceAmount", "totalDelinkedPayment", "paymentAmountCalculated")
VALUES
(1234567,987654321,123456789,'1234567890','30000','50000','150000','99999999.99','50','55','65','70','15000','11000','65000','35000','126000','2000000','75000',37500)
ON CONFLICT ("calculationId")
DO UPDATE SET
  "applicationId" = EXCLUDED."applicationId",
  "sbi" = EXCLUDED."sbi",
  "frn" = EXCLUDED."frn",
  "paymentBand1" = EXCLUDED."paymentBand1",
  "paymentBand2" = EXCLUDED."paymentBand2",
  "paymentBand3" = EXCLUDED."paymentBand3",
  "paymentBand4" = EXCLUDED."paymentBand4",
  "percentageReduction1" = EXCLUDED."percentageReduction1",
  "percentageReduction2" = EXCLUDED."percentageReduction2",
  "percentageReduction3" = EXCLUDED."percentageReduction3",
  "percentageReduction4" = EXCLUDED."percentageReduction4",
  "progressiveReductions1" = EXCLUDED."progressiveReductions1",
  "progressiveReductions2" = EXCLUDED."progressiveReductions2",
  "progressiveReductions3" = EXCLUDED."progressiveReductions3",
  "progressiveReductions4" = EXCLUDED."progressiveReductions4",
  "totalProgressiveReduction" = EXCLUDED."totalProgressiveReduction",
  "referenceAmount" = EXCLUDED."referenceAmount",
  "totalDelinkedPayment" = EXCLUDED."totalDelinkedPayment",
  "paymentAmountCalculated" = EXCLUDED."paymentAmountCalculated";

INSERT INTO "d365" ("calculationId", "paymentPeriod", "paymentReference", "paymentAmount", "transactionDate", "marketingYear")
VALUES
(987654321,'2025','PY04102412345678901234567890123',37500,to_date('01-AUG-24 12:00:00','DD-MON-YY HH:MI:SS'), 2025);
`;
    break;
  case 'ffc-doc-statement-data':
    expectedError = 'value too long for type character varying(30)';
    sqlStatement = `INSERT INTO "organisations" ("sbi","addressLine1", "addressLine2", "addressLine3", "city", "county", "postcode", "emailAddress", "frn", "name", "updated")
VALUES
(123456789,'8 The Street','Area','District','City','County','AA1 1BB','documents.performance.test@gmail.com','1234567890','Test Farm',to_date('28-JUN-24 03:54:41','DD-MON-YY HH:MI:SS'))
ON CONFLICT ("sbi")
DO UPDATE SET
  "addressLine1" = EXCLUDED."addressLine1",
  "addressLine2" = EXCLUDED."addressLine2",
  "addressLine3" = EXCLUDED."addressLine3",
  "city" = EXCLUDED."city",
  "county" = EXCLUDED."county",
  "postcode" = EXCLUDED."postcode",
  "emailAddress" = EXCLUDED."emailAddress",
  "frn" = EXCLUDED."frn",
  "name" = EXCLUDED."name",
  "updated" = EXCLUDED."updated";

INSERT INTO "delinkedCalculation" ("applicationId", "calculationId", "sbi", "frn", "paymentBand1", "paymentBand2", "paymentBand3", "paymentBand4", "percentageReduction1", "percentageReduction2", "percentageReduction3", "percentageReduction4", "progressiveReductions1", "progressiveReductions2", "progressiveReductions3", "progressiveReductions4", "totalProgressiveReduction", "referenceAmount", "totalDelinkedPayment", "paymentAmountCalculated")
VALUES
(1234567,987654321,123456789,'1234567890','30000','50000','150000','99999999.99','50','55','65','70','15000','11000','65000','35000','126000','2000000','75000',37500)
ON CONFLICT ("calculationId")
DO UPDATE SET
  "applicationId" = EXCLUDED."applicationId",
  "sbi" = EXCLUDED."sbi",
  "frn" = EXCLUDED."frn",
  "paymentBand1" = EXCLUDED."paymentBand1",
  "paymentBand2" = EXCLUDED."paymentBand2",
  "paymentBand3" = EXCLUDED."paymentBand3",
  "paymentBand4" = EXCLUDED."paymentBand4",
  "percentageReduction1" = EXCLUDED."percentageReduction1",
  "percentageReduction2" = EXCLUDED."percentageReduction2",
  "percentageReduction3" = EXCLUDED."percentageReduction3",
  "percentageReduction4" = EXCLUDED."percentageReduction4",
  "progressiveReductions1" = EXCLUDED."progressiveReductions1",
  "progressiveReductions2" = EXCLUDED."progressiveReductions2",
  "progressiveReductions3" = EXCLUDED."progressiveReductions3",
  "progressiveReductions4" = EXCLUDED."progressiveReductions4",
  "totalProgressiveReduction" = EXCLUDED."totalProgressiveReduction",
  "referenceAmount" = EXCLUDED."referenceAmount",
  "totalDelinkedPayment" = EXCLUDED."totalDelinkedPayment",
  "paymentAmountCalculated" = EXCLUDED."paymentAmountCalculated";

INSERT INTO "d365" ("calculationId", "paymentPeriod", "paymentReference", "paymentAmount", "transactionDate", "marketingYear")
VALUES
(987654321,'2025','PY04102412345678901234567890123',37500,to_date('01-AUG-24 12:00:00','DD-MON-YY HH:MI:SS'), 2025);
`;
    break;
  case 'ffc-doc-statement-publisher':
    expectedError = 'value too long for type character varying(255)';
    sqlStatement = `INSERT INTO "statements" ("statementId", "frn", "sbi", "businessName", "addressLine1", "addressLine2", "addressLine3", "addressLine4", "addressLine5", "postcode", "email", "filename", "received", "schemeName", "schemeShortName", "schemeYear", "documentReference", "emailTemplate")
VALUES
(1,1234567890,123456789,'Test Farm','8 The Street','Area','District','City','County','AA1 1BB','documents.performance.test@gmail.com',
'filenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefile.pdf','2025-09-05 12:58:39.145','Delinked Payment Statement','DP','2025',100001,'838adf3d-15bd-4db5-b080-a318d54da1fc');
`;
    break;
  case 'ffc-doc-statement-generator':
    expectedError = 'value too long for type character varying(255)';
    sqlStatement = `INSERT INTO "generations" ("generationId", "statementData", "dateGenerated", "filename", "documentReference")
VALUES
(1,'{"address":{"line1":"8 The Street","line2":"Area","line3":"District","line4":"City","line5":"County","postcode":"AA1 1BB"},"businessName":"Test Farm","email":"documents.performance.test@gmail.com","frn":1234567890,"sbi":123456789,"calculationId":987654321,"applicationId":1234567,"paymentBand1":"30000","paymentBand2":"50000","paymentBand3":"150000","paymentBand4":"99999999.99","percentageReduction1":"050.00","percentageReduction2":"055.00","percentageReduction3":"065.00","percentageReduction4":"070.00","progressiveReductions1":"15000.00","progressiveReductions2":"11000.00","progressiveReductions3":"65000.00","progressiveReductions4":"35000.00","referenceAmount":"2000000.00","totalProgressiveReduction":"126000.00","totalDelinkedPayment":"75000.00","paymentAmountCalculated":"37500.00","paymentReference":"PY0410241","paymentPeriod":"2025","marketingYear":2025,"paymentAmount":"37500","transactionDate":"2024-08-01T00:00:00.000Z","scheme":{"name":"Delinked Payment Statement","shortName":"DP","year":2025},"previousPaymentCount":0,"excludedFromNotify":false}',
'2025-09-05 12:58:39.145','filenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefile.pdf', 100001);
`;
    break;
  default:
    throw new Error(`Unknown database: ${databaseName}`);
  }

  cy.databaseInsert({databaseName, sqlStatement}).then((error) => {
    console.log('Error generated', error);
    cy.log('Error generated', error);
    if (error === expectedError) {
      console.log('✅ Correct error generated');
      cy.log('✅ Correct error generated');
    } else {
      throw new Error(('❌ Correct error not generated. Expected: ' + expectedError + ' but got: ' + error));
    }
    cy.wait(10000);

  });
});

Then(/^I pull (.*) file from Azure Blob Storage and confirm that correct values have been generated$/, (fileType) => {
  cy.wait(20000);
  switch (fileType) {
  case '2025 statements':
    cy.task('fetchStatementsBlobById', {
      container: 'statements',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      year: '2025'
    });
    break;
  case '2024 statements':
    cy.task('fetchStatementsBlobById', {
      container: 'statements',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      year: '2024'
    });
    break;
  case 'glos payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'glos'
    });
    break;
  case 'imps payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'imps'
    });
    break;
  case 'genesis payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'genesis'
    });
    break;
  case 'dps payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'dps'
    });
    break;
  case 'vet visits':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'vet visits'
    });
    break;
  case 'cohtr':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'cohtr'
    });
    break;
  case 'cohtc':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'cohtc'
    });
    break;
  case 'cs payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'cs'
    });
    break;
  case 'bps payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'bps'
    });
    break;
  case 'lump sums payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'lump sums'
    });
    break;
  case 'sfi expanded payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'sfi expanded'
    });
    break;
  case 'sfi pilot payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'sfi pilot'
    });
    break;
  case 'delinked payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'delinked'
    });
    break;
  case 'sfi23 payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'sfi23'
    });
    break;
  case 'sfi22 payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'sfi22'
    });
    break;
  case 'manual payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'manual'
    });
    break;
  case 'ppa scenarios payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'ppa scenarios payments'
    });
    break;
  case 'ppa scenarios topups':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'ppa scenarios topups'
    });
    break;
  case 'ppa scenarios reductions':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'ppa scenarios reductions'
    });
    break;
  case 'ppa scenarios recoveries':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'ppa scenarios recoveries'
    });
    break;
  default: throw new Error(`Unknown scheme: ${fileType}`);
  }

});

Then(/^I confirm that test data has not been inserted into the (.*) database$/, (databaseName) => {
  var sqlStatement = '';
  switch (databaseName) {
  case 'ffc-doc-statement-constructor':
    sqlStatement = 'SELECT * FROM "organisations" WHERE "sbi" = 123456789';
    break;
  case 'ffc-doc-statement-data':
    sqlStatement = 'SELECT * FROM "organisations" WHERE "sbi" = 123456789';
    break;
  case 'ffc-doc-statement-publisher':
    sqlStatement = 'SELECT "statementId" FROM "statements" WHERE "sbi" = 123456789';
    break;
  case 'ffc-doc-statement-generator':
    sqlStatement = 'SELECT "statementData" FROM "generations" WHERE "generationId" = 1';
    break;
  default:
    throw new Error(`Unknown database: ${databaseName}`);
  }

  cy.databaseQuery({databaseName, sqlStatement}).then((results) => {
    cy.log('Results - ' + JSON.stringify(results));

    if (results.rowCount === 0) {
      cy.log('✅ Data does not exist in database ');
      console.log('✅ Data does not exist in database ');
    } else {
      throw new Error('Data was found in database');
    }
  });


});

Then(/^I confirm that test data has been inserted into the (.*) database$/, (databaseName) => {

  var sqlStatement = '';
  switch (databaseName) {
  case 'ffc-doc-statement-data':
    sqlStatement = 'SELECT * FROM "organisations" WHERE "sbi" = 123456789';
    break;
  case 'ffc-doc-statement-constructor':
    sqlStatement = 'SELECT * FROM "organisations" WHERE "sbi" = 123456789';
    break;
  case 'ffc-doc-statement-generator':
    sqlStatement = 'SELECT "statementData" FROM "generations" WHERE "generationId" = 1';
    break;
  case 'ffc-doc-statement-publisher':
    sqlStatement = 'SELECT "statementId" FROM "statements" WHERE "sbi" = 123456789';
    break;
  default:
    throw new Error(`Unknown database: ${databaseName}`);
  }

  cy.databaseQuery({databaseName, sqlStatement}).then((results) => {
    const data = results.rows[0];
    console.log('Data retrieved:', data);
    if (results.rows.length > 0) {
      console.log('✅ Data exists in the database');
    } else {
      throw new Error('Data is not in database');
    }
  });

  console.log(`✅ Test data has been inserted into the ${databaseName} database`);
  cy.log(`✅ Test data has been inserted into the ${databaseName} database`);
});

Then(/^I confirm that bulk test data has been successfully inserted into the (.*) database$/, (databaseName) => {
  var containerName = '';
  var sqlStatement = '';

  switch (databaseName) {
  case 'ffc-doc-statement-data':
    containerName = 'ffc-doc-statement-data-development';
    sqlStatement = 'SELECT * FROM "organisations" WHERE "sbi" = 12345678';

    for (let i=0; i<10; i++) {
      const querySql = ""+ sqlStatement + i + "";
      console.log('Executing query for year 2024 :', querySql);
      cy.log('Executing query for year 2024 :', querySql);

      cy.databaseQuery(databaseName, querySql).then((results) => {
        const data = results.rows[0];
        console.log('Data retrieved:', data);
        cy.log('Data retrieved:', data);
        if (results.rows.length > 0) {
          console.log('✅ Data exists in the database');
          cy.log('✅ Data exists in the database');
        } else {
          throw new Error('Data is not in database');
        }
      });

    }

    sqlStatement = 'SELECT * FROM "organisations" WHERE "sbi" = 13345678';

    for (let i=0; i<10; i++) {

      const querySql = ""+ sqlStatement + i + "";
      console.log('Executing query for year 2025 :', querySql);

      cy.databaseQuery(databaseName, querySql).then((results) => {

        const data = results.rows[0];
        console.log('Data retrieved:', data);
        if (results.rows.length > 0) {
          console.log('✅ Data exists in the database');
        } else {
          console.log('Data is not in database');
          throw Error;
        }
      });
    }
    break;
  case 'ffc-doc-statement-constructor':
    containerName = 'ffc-doc-statement-constructor-development';
    databaseName = 'ffc-doc-statement-constructor';
    sqlStatement = 'SELECT * FROM "d365"';
    cy.databaseQuery(databaseName, sqlStatement).then((results) => {

      for (let i=0; i<results.rows.length; i++) {

        if (results.rows.length > 19) {
          console.log('✅ Data exists in the database');
        } else {
          console.log('Data is not in database');
          throw Error;
        }

        const data = results.rows[i];
        console.log('Number of rows retrieved:', results.rows.length);
        console.log('Data retrieved:', data);
      }
    });
    break;
  case 'ffc-doc-statement-generator':

    containerName = 'ffc-doc-statement-generator-development';
    databaseName = 'ffc-doc-statement-generator';
    sqlStatement = 'SELECT * FROM "outbox"';

    cy.databaseQuery(databaseName, sqlStatement).then((results) => {
      for (let i=0; i<results.rows.length; i++) {

        if (results.rows.length > 19) {
          console.log('✅ Data exists in the database');
        } else {
          console.log('Data is not in database');
          throw Error;
        }

        const data = results.rows[i];
        console.log('Number of rows retrieved:', results.rows.length);
        console.log('Data retrieved:', data);
      }
    });
    break;
  }

  console.log(`✅ Bulk Test data has been inserted into the ${containerName} database`);
  cy.log(`✅ Bulk Test data has been inserted into the ${containerName} database`);
});