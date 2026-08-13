BEGIN;

DROP TABLE IF EXISTS perf_seed;
DROP TABLE IF EXISTS manual_seed;
DROP TABLE IF EXISTS ml_source;
DROP TABLE IF EXISTS ml_parent;
DROP TABLE IF EXISTS ml_av02;
DROP TABLE IF EXISTS ml_bv02;
DROP TABLE IF EXISTS qc_pending_seed;
DROP TABLE IF EXISTS qc_pending_parent;
DROP TABLE IF EXISTS qc_pending_av02;
DROP TABLE IF EXISTS qc_pending_bv02;

TRUNCATE TABLE
  public."debtData",
  public."invoiceLines",
  public."manualLedgerPaymentRequest",
  public."qualityChecks",
  public."paymentRequests"
RESTART IDENTITY CASCADE;

------------------------------------------------------------
-- Shared seed data
------------------------------------------------------------

CREATE TEMP TABLE perf_seed AS
SELECT
  gs,
  1 AS "schemeId",
  'SFI' AS "sourceSystem",
  'RP00' AS "deliveryBody",
  trunc(random() * 9000000000 + 1000000000)::bigint AS "frn",
  trunc(random() * 90000000 + 10000000)::bigint AS "agreementNumber",
  trunc(random() * 90000000 + 10000000)::bigint AS "contractNumber",
  (ARRAY['Q1','Q2','Q3','Q4'])[floor(random() * 4)::int + 1] AS "schedule",
  md5('mega-ref-' || gs)::uuid AS "referenceId",
  md5('mega-correlation-' || gs)::uuid AS "correlationId",
  md5('developer-user-' || gs)::uuid AS "createdById"
FROM generate_series(1, 11000) gs;

------------------------------------------------------------
-- 1) Requests awaiting debt data
------------------------------------------------------------

INSERT INTO public."paymentRequests" (
  "schemeId",
  "sourceSystem",
  "deliveryBody",
  "invoiceNumber",
  "frn",
  "sbi",
  "ledger",
  "marketingYear",
  "agreementNumber",
  "contractNumber",
  "paymentRequestNumber",
  "currency",
  "schedule",
  "dueDate",
  "originalSettlementDate",
  "originalInvoiceNumber",
  "invoiceCorrectionReference",
  "value",
  "received",
  "released",
  "categoryId",
  "referenceId",
  "correlationId",
  "netValue",
  "exchangeRate",
  "eventDate",
  "vendor",
  "trader",
  "claimDate",
  "fesCode",
  "annualValue",
  "remmittanceDescription",
  "providesAccountingValues"
)
SELECT
  "schemeId",
  "sourceSystem",
  "deliveryBody",
  'S' || lpad((100000000000000 + gs)::text, 15, '0') || 'V001',
  "frn",
  NULL,
  'AP',
  2022,
  "agreementNumber",
  "contractNumber",
  1,
  'GBP',
  "schedule",
  DATE '2022-12-01',
  NULL,
  NULL,
  NULL,
  10000000,
  NOW() - interval '60 days',
  NOW() - interval '55 days',
  1,
  md5('awaiting-debt-settled-ref-' || gs)::uuid,
  "correlationId",
  10000000,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  FALSE
FROM perf_seed;

INSERT INTO public."paymentRequests" (
  "schemeId",
  "sourceSystem",
  "deliveryBody",
  "invoiceNumber",
  "frn",
  "sbi",
  "ledger",
  "marketingYear",
  "agreementNumber",
  "contractNumber",
  "paymentRequestNumber",
  "currency",
  "schedule",
  "dueDate",
  "originalSettlementDate",
  "originalInvoiceNumber",
  "invoiceCorrectionReference",
  "value",
  "received",
  "released",
  "categoryId",
  "referenceId",
  "correlationId",
  "netValue",
  "exchangeRate",
  "eventDate",
  "vendor",
  "trader",
  "claimDate",
  "fesCode",
  "annualValue",
  "remmittanceDescription",
  "providesAccountingValues"
)
SELECT
  "schemeId",
  "sourceSystem",
  "deliveryBody",
  'S' || lpad((200000000000000 + gs)::text, 15, '0') || 'V002',
  "frn",
  NULL,
  'AP',
  2022,
  "agreementNumber",
  "contractNumber",
  2,
  'GBP',
  "schedule",
  CURRENT_DATE + 30,
  NULL,
  NULL,
  NULL,
  -6000000,
  NOW(),
  NULL,
  3,
  "referenceId",
  "correlationId",
  4000000,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  FALSE
FROM perf_seed;

------------------------------------------------------------
-- 2) Manage unattached debt data
------------------------------------------------------------

INSERT INTO public."debtData" (
  "paymentRequestId",
  "schemeId",
  "frn",
  "reference",
  "netValue",
  "debtType",
  "recoveryDate",
  "attachedDate",
  "createdDate",
  "createdBy",
  "createdById",
  "migrated",
  "migrationId"
)
SELECT
  NULL,
  1,
  trunc(random() * 9000000000 + 1000000000)::bigint,
  CASE
    WHEN gs % 10 = 0 THEN 'SIP' || lpad(gs::text, 12, '0')
    WHEN gs % 7 = 0 THEN 'Z' || lpad(gs::text, 8, '0')
    ELSE floor(10000000 + random() * 89999999)::bigint::text
  END,
  CASE
    WHEN gs % 12 = 0 THEN 1000
    WHEN gs % 5 = 0 THEN 100000
    ELSE 1000000
  END,
  CASE WHEN gs % 8 = 0 THEN 'adm' ELSE 'irr' END,
  CASE
    WHEN gs % 4 = 0 THEN DATE '2018-06-15'
    WHEN gs % 4 = 1 THEN DATE '2023-01-20'
    WHEN gs % 4 = 2 THEN DATE '2026-01-01'
    ELSE DATE '2026-03-09'
  END,
  NULL,
  NOW() - ((gs % 180) * interval '1 day'),
  'Developer',
  "createdById",
  NULL,
  NULL
FROM perf_seed;

------------------------------------------------------------
-- 3) Manual ledger assignment dataset
-- Not Ready
------------------------------------------------------------

CREATE TEMP TABLE manual_seed AS
SELECT
  gs,
  trunc(random() * 9000000000 + 1000000000)::bigint AS frn,
  trunc(random() * 90000000 + 10000000)::bigint AS agreement_number,
  trunc(random() * 90000000 + 10000000)::bigint AS contract_number,
  md5('manual-corr-' || gs)::uuid AS correlation_id,
  md5('manual-ref-' || gs)::uuid AS reference_id
FROM generate_series(1, 11000) gs;

CREATE TEMP TABLE ml_source AS
WITH inserted AS (
  INSERT INTO public."paymentRequests" (
    "schemeId",
    "sourceSystem",
    "deliveryBody",
    "invoiceNumber",
    "frn",
    "ledger",
    "marketingYear",
    "agreementNumber",
    "contractNumber",
    "paymentRequestNumber",
    "currency",
    "schedule",
    "value",
    "received",
    "released",
    "categoryId",
    "referenceId",
    "correlationId"
  )
  SELECT
    1,
    'SFI',
    'RP00',
    'S' || lpad((300000000000000 + gs)::text, 15, '0') || 'V001',
    frn,
    'AP',
    2022,
    agreement_number,
    contract_number,
    1,
    'GBP',
    'Q4',
    1000000,
    NOW(),
    NOW(),
    1,
    reference_id,
    correlation_id
  FROM manual_seed
  RETURNING *
)
SELECT * FROM inserted;

CREATE TEMP TABLE ml_parent AS
WITH inserted AS (
  INSERT INTO public."paymentRequests" (
    "schemeId",
    "sourceSystem",
    "deliveryBody",
    "invoiceNumber",
    "frn",
    "ledger",
    "marketingYear",
    "agreementNumber",
    "contractNumber",
    "paymentRequestNumber",
    "currency",
    "schedule",
    "value",
    "received",
    "released",
    "categoryId",
    "referenceId",
    "correlationId",
    "netValue"
  )
  SELECT
    1,
    'SFI',
    'RP00',
    replace(s."invoiceNumber", 'V001', 'V002'),
    s."frn",
    'AR',
    2022,
    s."agreementNumber",
    s."contractNumber",
    2,
    'GBP',
    'Q4',
    -9000000,
    NOW(),
    NOW(),
    2,
    s."referenceId",
    s."correlationId",
    1000000
  FROM ml_source s
  RETURNING *
)
SELECT * FROM inserted;

CREATE TEMP TABLE ml_av02 AS
WITH inserted AS (
  INSERT INTO public."paymentRequests" (
    "schemeId",
    "sourceSystem",
    "deliveryBody",
    "invoiceNumber",
    "frn",
    "ledger",
    "marketingYear",
    "agreementNumber",
    "contractNumber",
    "paymentRequestNumber",
    "currency",
    "schedule",
    "value",
    "received",
    "categoryId",
    "referenceId",
    "correlationId",
    "netValue",
    "originalInvoiceNumber"
  )
  SELECT
    p."schemeId",
    p."sourceSystem",
    p."deliveryBody",
    replace(p."invoiceNumber", 'V002', 'AV02'),
    p."frn",
    'AR',
    p."marketingYear",
    p."agreementNumber",
    p."contractNumber",
    2,
    'GBP',
    'Q4',
    -1500000,
    NOW(),
    3,
    p."referenceId",
    p."correlationId",
    1000000,
    replace(p."invoiceNumber", 'V002', 'V001')
  FROM ml_parent p
  RETURNING *
)
SELECT * FROM inserted;

CREATE TEMP TABLE ml_bv02 AS
WITH inserted AS (
  INSERT INTO public."paymentRequests" (
    "schemeId",
    "sourceSystem",
    "deliveryBody",
    "invoiceNumber",
    "frn",
    "ledger",
    "marketingYear",
    "agreementNumber",
    "contractNumber",
    "paymentRequestNumber",
    "currency",
    "schedule",
    "value",
    "received",
    "categoryId",
    "referenceId",
    "correlationId",
    "netValue",
    "originalInvoiceNumber"
  )
  SELECT
    p."schemeId",
    p."sourceSystem",
    p."deliveryBody",
    replace(p."invoiceNumber", 'V002', 'BV02'),
    p."frn",
    'AP',
    p."marketingYear",
    p."agreementNumber",
    p."contractNumber",
    2,
    'GBP',
    'Q3',
    -7500000,
    NOW(),
    3,
    md5('manual-bv02-ref-' || p."paymentRequestId")::uuid,
    p."correlationId",
    1000000,
    p."invoiceNumber"
  FROM ml_parent p
  RETURNING *
)
SELECT * FROM inserted;

INSERT INTO public."invoiceLines" (
  "paymentRequestId",
  "schemeCode",
  "accountCode",
  "fundCode",
  "description",
  "value",
  "deliveryBody",
  "agreementNumber",
  "marketingYear",
  "stateAid",
  "convergence"
)
SELECT
  "paymentRequestId",
  'SFI',
  'SOS710',
  'DRD10',
  'Manual Ledger Parent',
  "value",
  'RP00',
  "agreementNumber"::varchar,
  2022,
  FALSE,
  FALSE
FROM ml_parent;

INSERT INTO public."invoiceLines" (
  "paymentRequestId",
  "schemeCode",
  "accountCode",
  "fundCode",
  "description",
  "value",
  "deliveryBody",
  "agreementNumber",
  "marketingYear",
  "stateAid",
  "convergence"
)
SELECT
  "paymentRequestId",
  'SFI',
  'SOS710',
  'DRD10',
  'Manual Ledger AV02 Child',
  "value",
  'RP00',
  "agreementNumber"::varchar,
  2022,
  FALSE,
  FALSE
FROM ml_av02;

INSERT INTO public."invoiceLines" (
  "paymentRequestId",
  "schemeCode",
  "accountCode",
  "fundCode",
  "description",
  "value",
  "deliveryBody",
  "agreementNumber",
  "marketingYear",
  "stateAid",
  "convergence"
)
SELECT
  "paymentRequestId",
  'SFI',
  'SOS710',
  'DRD10',
  'Manual Ledger BV02 Child',
  "value",
  'RP00',
  "agreementNumber"::varchar,
  2022,
  FALSE,
  FALSE
FROM ml_bv02;

INSERT INTO public."manualLedgerPaymentRequest" (
  "paymentRequestId",
  "ledgerPaymentRequestId",
  "createdBy",
  "createdDate",
  "active",
  "original"
)
SELECT
  p."paymentRequestId",
  a."paymentRequestId",
  'Developer',
  NOW(),
  TRUE,
  TRUE
FROM ml_parent p
JOIN ml_av02 a
  ON a."correlationId" = p."correlationId";

INSERT INTO public."manualLedgerPaymentRequest" (
  "paymentRequestId",
  "ledgerPaymentRequestId",
  "createdBy",
  "createdDate",
  "active",
  "original"
)
SELECT
  p."paymentRequestId",
  b."paymentRequestId",
  'Developer',
  NOW(),
  TRUE,
  TRUE
FROM ml_parent p
JOIN ml_bv02 b
  ON b."correlationId" = p."correlationId";

INSERT INTO public."qualityChecks" (
  "paymentRequestId",
  "checkedDate",
  "checkedBy",
  "status",
  "checkedById"
)
SELECT
  "paymentRequestId",
  NULL::timestamp,
  NULL::varchar,
  'Not Ready',
  NULL::uuid
FROM ml_parent;

------------------------------------------------------------
-- 4) Ledger assignment quality check dataset
-- Pending
------------------------------------------------------------

CREATE TEMP TABLE qc_pending_seed AS
SELECT
  gs,
  trunc(random() * 9000000000 + 1000000000)::bigint AS frn,
  trunc(random() * 90000000 + 10000000)::bigint AS agreement_number,
  trunc(random() * 90000000 + 10000000)::bigint AS contract_number,
  md5('pending-qc-corr-' || gs)::uuid AS correlation_id,
  md5('pending-qc-ref-' || gs)::uuid AS reference_id
FROM generate_series(1, 11000) gs;

CREATE TEMP TABLE qc_pending_parent AS
WITH inserted AS (
  INSERT INTO public."paymentRequests" (
    "schemeId",
    "sourceSystem",
    "deliveryBody",
    "invoiceNumber",
    "frn",
    "sbi",
    "ledger",
    "marketingYear",
    "agreementNumber",
    "contractNumber",
    "paymentRequestNumber",
    "currency",
    "schedule",
    "dueDate",
    "originalSettlementDate",
    "originalInvoiceNumber",
    "invoiceCorrectionReference",
    "value",
    "received",
    "released",
    "categoryId",
    "referenceId",
    "correlationId",
    "netValue",
    "exchangeRate",
    "eventDate",
    "vendor",
    "trader",
    "claimDate",
    "fesCode",
    "annualValue",
    "remmittanceDescription",
    "providesAccountingValues"
  )
  SELECT
    1,
    'SFI',
    'RP00',
    'S' || lpad((990000000000000 + gs)::text, 15, '0') || 'V002',
    frn,
    NULL,
    'AR',
    2022,
    agreement_number,
    contract_number,
    2,
    'GBP',
    'Q4',
    CURRENT_DATE + 30,
    NULL,
    NULL,
    NULL,
    -9000000,
    NOW(),
    NOW(),
    2,
    reference_id,
    correlation_id,
    1000000,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    FALSE
  FROM qc_pending_seed
  RETURNING *
)
SELECT * FROM inserted;

CREATE TEMP TABLE qc_pending_av02 AS
WITH inserted AS (
  INSERT INTO public."paymentRequests" (
    "schemeId",
    "sourceSystem",
    "deliveryBody",
    "invoiceNumber",
    "frn",
    "sbi",
    "ledger",
    "marketingYear",
    "agreementNumber",
    "contractNumber",
    "paymentRequestNumber",
    "currency",
    "schedule",
    "dueDate",
    "originalSettlementDate",
    "originalInvoiceNumber",
    "invoiceCorrectionReference",
    "value",
    "received",
    "released",
    "categoryId",
    "referenceId",
    "correlationId",
    "netValue",
    "exchangeRate",
    "eventDate",
    "vendor",
    "trader",
    "claimDate",
    "fesCode",
    "annualValue",
    "remmittanceDescription",
    "providesAccountingValues"
  )
  SELECT
    p."schemeId",
    p."sourceSystem",
    p."deliveryBody",
    replace(p."invoiceNumber", 'V002', 'AV02'),
    p."frn",
    NULL,
    'AR',
    p."marketingYear",
    p."agreementNumber",
    p."contractNumber",
    2,
    'GBP',
    'Q4',
    CURRENT_DATE + 30,
    CURRENT_DATE + 30,
    replace(p."invoiceNumber", 'V002', 'V001'),
    NULL,
    -1500000,
    NOW(),
    NULL,
    3,
    p."referenceId",
    p."correlationId",
    1000000,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    FALSE
  FROM qc_pending_parent p
  RETURNING *
)
SELECT * FROM inserted;

CREATE TEMP TABLE qc_pending_bv02 AS
WITH inserted AS (
  INSERT INTO public."paymentRequests" (
    "schemeId",
    "sourceSystem",
    "deliveryBody",
    "invoiceNumber",
    "frn",
    "sbi",
    "ledger",
    "marketingYear",
    "agreementNumber",
    "contractNumber",
    "paymentRequestNumber",
    "currency",
    "schedule",
    "dueDate",
    "originalSettlementDate",
    "originalInvoiceNumber",
    "invoiceCorrectionReference",
    "value",
    "received",
    "released",
    "categoryId",
    "referenceId",
    "correlationId",
    "netValue",
    "exchangeRate",
    "eventDate",
    "vendor",
    "trader",
    "claimDate",
    "fesCode",
    "annualValue",
    "remmittanceDescription",
    "providesAccountingValues"
  )
  SELECT
    p."schemeId",
    p."sourceSystem",
    p."deliveryBody",
    replace(p."invoiceNumber", 'V002', 'BV02'),
    p."frn",
    NULL,
    'AP',
    p."marketingYear",
    p."agreementNumber",
    p."contractNumber",
    2,
    'GBP',
    'Q3',
    CURRENT_DATE + 30,
    NULL,
    p."invoiceNumber",
    NULL,
    -7500000,
    NOW(),
    NULL,
    3,
    md5('pending-qc-bv02-ref-' || p."paymentRequestId")::uuid,
    p."correlationId",
    1000000,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    FALSE
  FROM qc_pending_parent p
  RETURNING *
)
SELECT * FROM inserted;

INSERT INTO public."invoiceLines" (
  "paymentRequestId",
  "schemeCode",
  "accountCode",
  "fundCode",
  "description",
  "value",
  "deliveryBody",
  "agreementNumber",
  "marketingYear",
  "stateAid",
  "convergence"
)
SELECT
  "paymentRequestId",
  'SFI',
  'SOS710',
  'DRD10',
  'Pending QC Parent',
  "value",
  'RP00',
  "agreementNumber"::varchar,
  "marketingYear",
  FALSE,
  FALSE
FROM qc_pending_parent;

INSERT INTO public."invoiceLines" (
  "paymentRequestId",
  "schemeCode",
  "accountCode",
  "fundCode",
  "description",
  "value",
  "deliveryBody",
  "agreementNumber",
  "marketingYear",
  "stateAid",
  "convergence"
)
SELECT
  "paymentRequestId",
  'SFI',
  'SOS710',
  'DRD10',
  'Pending QC AV02 Child',
  "value",
  'RP00',
  "agreementNumber"::varchar,
  "marketingYear",
  FALSE,
  FALSE
FROM qc_pending_av02;

INSERT INTO public."invoiceLines" (
  "paymentRequestId",
  "schemeCode",
  "accountCode",
  "fundCode",
  "description",
  "value",
  "deliveryBody",
  "agreementNumber",
  "marketingYear",
  "stateAid",
  "convergence"
)
SELECT
  "paymentRequestId",
  'SFI',
  'SOS710',
  'DRD10',
  'Pending QC BV02 Child',
  "value",
  'RP00',
  "agreementNumber"::varchar,
  "marketingYear",
  FALSE,
  FALSE
FROM qc_pending_bv02;

INSERT INTO public."manualLedgerPaymentRequest" (
  "paymentRequestId",
  "ledgerPaymentRequestId",
  "createdBy",
  "createdDate",
  "active",
  "original",
  "createdById"
)
SELECT
  p."paymentRequestId",
  a."paymentRequestId",
  'Developer',
  NOW(),
  TRUE,
  TRUE,
  NULL
FROM qc_pending_parent p
JOIN qc_pending_av02 a
  ON a."correlationId" = p."correlationId";

INSERT INTO public."manualLedgerPaymentRequest" (
  "paymentRequestId",
  "ledgerPaymentRequestId",
  "createdBy",
  "createdDate",
  "active",
  "original",
  "createdById"
)
SELECT
  p."paymentRequestId",
  b."paymentRequestId",
  'Developer',
  NOW(),
  TRUE,
  TRUE,
  NULL
FROM qc_pending_parent p
JOIN qc_pending_bv02 b
  ON b."correlationId" = p."correlationId";

INSERT INTO public."qualityChecks" (
  "paymentRequestId",
  "checkedDate",
  "checkedBy",
  "status",
  "checkedById"
)
SELECT
  "paymentRequestId",
  NULL::timestamp,
  NULL::varchar,
  'Pending',
  NULL
FROM qc_pending_parent;

------------------------------------------------------------
-- Sequence safety
------------------------------------------------------------

SELECT setval(
  pg_get_serial_sequence('public."paymentRequests"', 'paymentRequestId'),
  COALESCE((SELECT MAX("paymentRequestId") FROM public."paymentRequests"), 1)
);

SELECT setval(
  pg_get_serial_sequence('public."debtData"', 'debtDataId'),
  COALESCE((SELECT MAX("debtDataId") FROM public."debtData"), 1)
);

SELECT setval(
  pg_get_serial_sequence('public."invoiceLines"', 'invoiceLineId'),
  COALESCE((SELECT MAX("invoiceLineId") FROM public."invoiceLines"), 1)
);

SELECT setval(
  pg_get_serial_sequence('public."manualLedgerPaymentRequest"', 'manualLedgerPaymentRequestId'),
  COALESCE((SELECT MAX("manualLedgerPaymentRequestId") FROM public."manualLedgerPaymentRequest"), 1)
);

SELECT setval(
  pg_get_serial_sequence('public."qualityChecks"', 'qualityCheckId'),
  COALESCE((SELECT MAX("qualityCheckId") FROM public."qualityChecks"), 1)
);

COMMIT;