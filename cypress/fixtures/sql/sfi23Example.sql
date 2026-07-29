
INSERT INTO "organisations" (
  "sbi",
  "addressLine1",
  "addressLine2",
  "addressLine3",
  "city",
  "county",
  "postcode",
  "emailAddress",
  "frn",
  "name",
  "updated"
)
VALUES (
  111704302,
  '012 Test Road',
  '1234',
  '4567',
  'Leeds',
  'Test Yorkshire',
  '012 GH',
  'svend.kristensen@atos.ai',
  1101717386,
  '1 The Testers',
  to_date('14-FEB-24 01:34:17', 'DD-MON-YY HH:MI:SS')
)
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

INSERT INTO "totals" (
  "sbi",
  "frn",
  "agreementNumber",
  "claimId",
  "schemeType",
  "calculationId",
  "calculationDate",
  "invoiceNumber",
  "agreementStart",
  "agreementEnd",
  "totalActionPayments",
  "totalAdditionalPayments",
  "totalPayments",
  "updated"
)
VALUES
(
  111704302,
  1101717386,
  2421081,
  242108,
  'SFI-23',
  120240821,
  to_date('02-FEB-24 10:55:33', 'DD-MON-YY HH:MI:SS'),
  'SFIA0103195',
  to_date('01-NOV-23 12:00:00', 'DD-MON-YY HH:MI:SS'),
  to_date('31-OCT-26 12:00:00', 'DD-MON-YY HH:MI:SS'),
  1000.00,
  1000,
  2000.00,
  to_date('29-FEB-24 10:59:01', 'DD-MON-YY HH:MI:SS')
),
(
  111704302,
  1101717386,
  2421081,
  242108,
  'SFI-23',
  120240822,
  to_date('02-FEB-24 10:55:33', 'DD-MON-YY HH:MI:SS'),
  'SFIA0103195',
  to_date('01-NOV-23 12:00:00', 'DD-MON-YY HH:MI:SS'),
  to_date('31-OCT-26 12:00:00', 'DD-MON-YY HH:MI:SS'),
  1000.00,
  1000,
  2000.00,
  to_date('29-FEB-24 10:59:01', 'DD-MON-YY HH:MI:SS')
),
(
  111704302,
  1101717386,
  2421081,
  242108,
  'SFI-23',
  120240823,
  to_date('02-FEB-24 10:55:33', 'DD-MON-YY HH:MI:SS'),
  'SFIA0103195',
  to_date('01-NOV-23 12:00:00', 'DD-MON-YY HH:MI:SS'),
  to_date('31-OCT-26 12:00:00', 'DD-MON-YY HH:MI:SS'),
  1000.00,
  1000,
  2000.00,
  to_date('29-FEB-24 10:59:01', 'DD-MON-YY HH:MI:SS')
)
ON CONFLICT ("calculationId")
DO UPDATE SET
  "frn" = EXCLUDED."frn",
  "agreementNumber" = EXCLUDED."agreementNumber",
  "claimId" = EXCLUDED."claimId",
  "schemeType" = EXCLUDED."schemeType",
  "calculationDate" = EXCLUDED."calculationDate",
  "invoiceNumber" = EXCLUDED."invoiceNumber",
  "agreementStart" = EXCLUDED."agreementStart",
  "agreementEnd" = EXCLUDED."agreementEnd",
  "totalActionPayments" = EXCLUDED."totalActionPayments",
  "totalAdditionalPayments" = EXCLUDED."totalAdditionalPayments",
  "totalPayments" = EXCLUDED."totalPayments",
  "updated" = EXCLUDED."updated";

INSERT INTO "dax" (
  "calculationId",
  "paymentPeriod",
  "paymentReference",
  "paymentAmount",
  "transactionDate"
)
VALUES
(
  120240821,
  '1st February 2024 to 30th April 2024',
  'PY2066650',
  500,
  to_date('09-FEB-24 12:00:00', 'DD-MON-YY HH:MI:SS')
),
(
  120240822,
  '1st May 2024 to 31st July 2024',
  'RC200821243',
  500,
  to_date('12-FEB-24 12:00:00', 'DD-MON-YY HH:MI:SS')
),
(
  120240823,
  '1st August 2024 to 31st October 2024',
  'RC200821244',
  500,
  to_date('15-FEB-24 12:00:00', 'DD-MON-YY HH:MI:SS')
);
