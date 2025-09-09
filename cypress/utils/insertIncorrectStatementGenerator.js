require('dotenv').config();
const { Client } = require('pg');
var value = '';

// This module connects to Statement Generator database and inserts incorrect test data and then confirms expected error message

module.exports = async () => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.STATEMENTGENERATORPORT,
    database: process.env.STATEMENTGENERATORDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  try {
    await client.connect();
    const insertSql = `INSERT INTO "generations" ("generationId", "statementData", "dateGenerated", "filename", "documentReference")
VALUES
(1,'{"address":{"line1":"8 The Street","line2":"Area","line3":"District","line4":"City","line5":"County","postcode":"AA1 1BB"},"businessName":"Test Farm","email":"documents.performance.test@gmail.com","frn":1234567890,"sbi":123456789,"calculationId":987654321,"applicationId":1234567,"paymentBand1":"30000","paymentBand2":"50000","paymentBand3":"150000","paymentBand4":"99999999.99","percentageReduction1":"050.00","percentageReduction2":"055.00","percentageReduction3":"065.00","percentageReduction4":"070.00","progressiveReductions1":"15000.00","progressiveReductions2":"11000.00","progressiveReductions3":"65000.00","progressiveReductions4":"35000.00","referenceAmount":"2000000.00","totalProgressiveReduction":"126000.00","totalDelinkedPayment":"75000.00","paymentAmountCalculated":"37500.00","paymentReference":"PY0410241","paymentPeriod":"2025","marketingYear":2025,"paymentAmount":"37500","transactionDate":"2024-08-01T00:00:00.000Z","scheme":{"name":"Delinked Payment Statement","shortName":"DP","year":2025},"previousPaymentCount":0,"excludedFromNotify":false}',
'2025-09-05 12:58:39.145','filenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefile.pdf', 100001);
`;

    await client.query(insertSql);
    console.log('✅ Data inserted successfully');

    await client.end();
  } catch (error) {
    console.log('Error generated', error);
    if (error.message === 'value too long for type character varying(255)') {
      console.log('✅ Correct error generated');
    } else {
      console.error('❌ Correct error not generated');
      throw error;
    }
  }

};