require('dotenv').config();
const { Client } = require('pg');

// This module connects to Statement Data database and inserts incorrect test data and then confirms expected error message

module.exports = async (database) => {

  const statementConstructorPort = process.env.STATEMENTCONSTRUCTORPORT;
  const statementConstructorDatabase = process.env.STATEMENTCONSTRUCTORDATABASE;
  const statementDataPort = process.env.STATEMENTDATAPORT;
  const statementDataDatabase = process.env.STATEMENTDATADATABASE;
  const statementPublisherPort = process.env.STATEMENTPUBLISHERPORT;
  const statementPublisherDatabase = process.env.STATEMENTPUBLISHERDATABASE;
  const statementGeneratorPort = process.env.STATEMENTGENERATORPORT;
  const statementGeneratorDatabase = process.env.STATEMENTGENERATORDATABASE;

  var currentPort = '';
  var currentDatabase = '';
  var insertSql = '';
  var expectedError = '';

  switch (database) {
  case 'ffc-doc-statement-constructor':
    currentPort = statementConstructorPort;
    currentDatabase = statementConstructorDatabase;
    expectedError = 'value too long for type character varying(30)';
    insertSql = `INSERT INTO "organisations" ("sbi","addressLine1", "addressLine2", "addressLine3", "city", "county", "postcode", "emailAddress", "frn", "name", "updated")
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
    currentPort = statementDataPort;
    currentDatabase = statementDataDatabase;
    expectedError = 'value too long for type character varying(30)';
    insertSql = `INSERT INTO "organisations" ("sbi","addressLine1", "addressLine2", "addressLine3", "city", "county", "postcode", "emailAddress", "frn", "name", "updated")
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
    currentPort = statementPublisherPort;
    currentDatabase = statementPublisherDatabase;
    expectedError = 'value too long for type character varying(255)';
    insertSql = `INSERT INTO "statements" ("statementId", "frn", "sbi", "businessName", "addressLine1", "addressLine2", "addressLine3", "addressLine4", "addressLine5", "postcode", "email", "filename", "received", "schemeName", "schemeShortName", "schemeYear", "documentReference", "emailTemplate")
VALUES
(1,1234567890,123456789,'Test Farm','8 The Street','Area','District','City','County','AA1 1BB','documents.performance.test@gmail.com',
'filenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefile.pdf','2025-09-05 12:58:39.145','Delinked Payment Statement','DP','2025',100001,'838adf3d-15bd-4db5-b080-a318d54da1fc');
`;
    break;
  case 'ffc-doc-statement-generator':
    currentPort = statementGeneratorPort;
    currentDatabase = statementGeneratorDatabase;
    expectedError = 'value too long for type character varying(255)';
    insertSql = `INSERT INTO "generations" ("generationId", "statementData", "dateGenerated", "filename", "documentReference")
VALUES
(1,'{"address":{"line1":"8 The Street","line2":"Area","line3":"District","line4":"City","line5":"County","postcode":"AA1 1BB"},"businessName":"Test Farm","email":"documents.performance.test@gmail.com","frn":1234567890,"sbi":123456789,"calculationId":987654321,"applicationId":1234567,"paymentBand1":"30000","paymentBand2":"50000","paymentBand3":"150000","paymentBand4":"99999999.99","percentageReduction1":"050.00","percentageReduction2":"055.00","percentageReduction3":"065.00","percentageReduction4":"070.00","progressiveReductions1":"15000.00","progressiveReductions2":"11000.00","progressiveReductions3":"65000.00","progressiveReductions4":"35000.00","referenceAmount":"2000000.00","totalProgressiveReduction":"126000.00","totalDelinkedPayment":"75000.00","paymentAmountCalculated":"37500.00","paymentReference":"PY0410241","paymentPeriod":"2025","marketingYear":2025,"paymentAmount":"37500","transactionDate":"2024-08-01T00:00:00.000Z","scheme":{"name":"Delinked Payment Statement","shortName":"DP","year":2025},"previousPaymentCount":0,"excludedFromNotify":false}',
'2025-09-05 12:58:39.145','filenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefile.pdf', 100001);
`;
    break;
  default:
    throw new Error(`Unknown database: ${database}`);
  }

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: currentPort,
    database: currentDatabase,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  try {
    await client.connect();

    await client.query(insertSql);
    console.log('✅ Data inserted successfully');

    await client.end();
  } catch (error) {
    console.log('Error generated', error);
    if (error.message === expectedError) {
      console.log('✅ Correct error generated');
    } else {
      console.error('❌ Correct error not generated');
      throw error;
    }
  }

};