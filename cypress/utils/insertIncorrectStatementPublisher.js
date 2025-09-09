require('dotenv').config();
const { Client } = require('pg');
var value = '';

// This module connects to Statement Publisher database and inserts incorrect test data and then confirms expected error message

module.exports = async () => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.STATEMENTPUBLISHERPORT,
    database: process.env.STATEMENTPUBLISHERDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  try {
    await client.connect();
    const insertSql = `

    INSERT INTO "statements" ("statementId", "frn", "sbi", "businessName", "addressLine1", "addressLine2", "addressLine3", "addressLine4", "addressLine5", "postcode", "email", "filename", "received", "schemeName", "schemeShortName", "schemeYear", "documentReference", "emailTemplate")
VALUES
(1,1234567890,123456789,'Test Farm','8 The Street','Area','District','City','County','AA1 1BB','documents.performance.test@gmail.com',
'filenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefile.pdf','2025-09-05 12:58:39.145','Delinked Payment Statement','DP','2025',100001,'838adf3d-15bd-4db5-b080-a318d54da1fc');
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