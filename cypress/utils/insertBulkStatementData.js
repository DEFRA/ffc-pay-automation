require('dotenv').config();
const { Client } = require('pg');
var value = '';

// This module connects to Statement Data database and inserts 10 instances of test data for 2024 Delinked

module.exports = async (year) => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.STATEMENTDATAPORT,
    database: process.env.STATEMENTDATADATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  var sbi = '';
  var paymentRef = '';
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

  await client.connect();


  for (let i=0; i<10; i++) {
    try {

      const insertSql = `INSERT INTO "organisations" ("sbi","addressLine1", "addressLine2", "addressLine3", "city", "county", "postcode", "emailAddress", "frn", "name", "updated")
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


      await client.query(insertSql);
      console.log('✅ ' + year + 'Data inserted successfully');

    } catch (error) {
      console.log('Error generated', error);
      throw error;
    }
  }
  await client.end();
  return value;
};