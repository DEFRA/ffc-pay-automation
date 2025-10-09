require('dotenv').config();
const { Client } = require('pg');
var value = '';

// This module connects to Statement Constructor database, inserts incorrect test data and then confirms expected error message

module.exports = async () => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.STATEMENTCONSTRUCTORPORT,
    database: process.env.STATEMENTCONSTRUCTORDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  try {
    await client.connect();
    const insertSql = `INSERT INTO "organisations" ("sbi","addressLine1", "addressLine2", "addressLine3", "city", "county", "postcode", "emailAddress", "frn", "name", "updated")
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


    await client.query(insertSql);
    console.log('✅ Data inserted successfully');

    await client.end();
  } catch (error) {
    console.log('Error generated', error);
    if (error.message === 'value too long for type character varying(30)') {
      console.log('✅ Correct error generated');
    } else {
      console.error('❌ Correct error not generated');
      throw error;
    }
  }

};