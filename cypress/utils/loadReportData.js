require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

module.exports = async () => {
  const csvPath = path.resolve('cypress/fixtures/reportData-sample.csv');

  const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  try {
    await client.connect();

    await client.query('TRUNCATE TABLE "reportData"');

    const csvData = fs.readFileSync(csvPath);
    const records = parse(csvData, { columns: true, skip_empty_lines: true });

    if (records.length === 0) {
      console.log('⚠ No rows found in CSV');
      return { success: true };
    }

    const keys = Object.keys(records[0]);
    const columnsSql = keys.map(k => `"${k}"`).join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const insertSql = `INSERT INTO "reportData" (${columnsSql}) VALUES (${placeholders})`;

    for (const row of records) {
      const values = keys.map(k => (row[k] === 'NULL' ? null : row[k]));
      await client.query(insertSql, values);
    }

    await client.end();
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to load report data:', error);
    try {
      await client.end();
    } catch {}
    return { success: false, error: error.message };
  }
};