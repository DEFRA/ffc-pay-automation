
//  Database query helpers for payment automation tests
//  Centralizes all SQL queries used throughout the test suite

//  Query to get the maximum invoice number for GLOS scheme
const getMaxGlosInvoiceNumber = () => `
  SELECT
    MAX(CASE WHEN "invoiceNumber"::text ~ '^[0-9]{5} 1$' THEN "invoiceNumber" END) AS max_invoice_number
  FROM "paymentRequests"
`

//  Query to get invoice number for a given FRN
const getInvoiceNumberByFrn = (frn) =>
  `SELECT "invoiceNumber" FROM "paymentRequests" WHERE "frn" = ${frn}`

//  Query to get the maximum vendor and contract number for Genesis scheme
const getMaxGenesisVendorAndContract = () => `
  SELECT
    MAX(CASE WHEN "vendor"::text ~ '^[0-9]' THEN "vendor" END) AS max_vendor,
    MAX(CASE WHEN "contractNumber"::text LIKE 'AG00%' THEN "contractNumber" END) AS max_contract_number
  FROM "paymentRequests"
`

//  Query to get the maximum trader for IMPS scheme
const getMaxImpsTrader = () => `
  SELECT
    MAX(CASE WHEN trader LIKE 'J%' AND trader ~ 'J[0-9]+' THEN trader END) AS max_trader
  FROM "paymentRequests"
`

//  Query to get the maximum SBI, contract number, and agreement number for FPTT scheme
const getMaxFpttDetails = () => `
  SELECT
    MAX(CASE WHEN "sbi"::text ~ '^[0-9]' THEN "sbi" END) AS max_sbi,
    MAX(CASE WHEN "contractNumber" LIKE 'R%' AND "contractNumber" ~ 'R[0-9]+' THEN "contractNumber" END) AS max_contract_number,
    MAX(CASE WHEN "agreementNumber"::text ~ '^[0-9]' THEN "agreementNumber" END) AS max_agreement_number
  FROM "paymentRequests"
`

//  Query to get the maximum contract number and agreement number for all other schemes
const getMaxContractAndAgreement = () => `
  SELECT
    MAX(CASE WHEN "contractNumber"::text ~ '^[0-9]' THEN "contractNumber" END) AS max_contract,
    MAX(CASE WHEN "agreementNumber"::text ~ '^[0-9]' THEN "agreementNumber" END) AS max_agreement_number
  FROM "paymentRequests"
`

//  Query to get manual upload record by ID
const getManualUploadById = (uploadId = 1) =>
  `SELECT * FROM "manualUploads" WHERE "uploadId" = ${uploadId}`

//  Query to get payment request by FRN
const getPaymentRequestByFrn = (frn) =>
  `SELECT * FROM "paymentRequests" WHERE "frn" = ${frn}`

//  Query to get settled value from completed payment request by FRN
const getSettledValueByFrn = (frn) =>
  `SELECT "settledValue" FROM "completedPaymentRequests" WHERE "frn" = ${frn}`

//  Query to get hold category ID by FRN
const getHoldCategoryByFrn = (frn) =>
  `SELECT "holdCategoryId" FROM "holds" WHERE "frn" = ${frn}`

//  Query to get payment request ID from completed payment requests by FRN
const getCompletedPaymentRequestIdByFrn = (frn) =>
  `SELECT "paymentRequestId" FROM "completedPaymentRequests" WHERE "frn" = ${frn}`

//  Query to get scheme code for invoice lines by description
const getSchemeCodeByDescription = (description) => `
  SELECT "schemeCode"
  FROM "invoiceLines"
  WHERE "description" = '${description}'
`

//  Query to wait for outbox records to be ready for settlement
const getOutboxReadyForSettlement = (startFrn, endFrn) => `
  SELECT COUNT(*) AS count
  FROM "outbox" o
  JOIN "completedPaymentRequests" cpr
    ON cpr."completedPaymentRequestId" = o."completedPaymentRequestId"
  WHERE cpr."frn" BETWEEN ${startFrn} AND ${endFrn}
  AND cpr."paymentRequestNumber" = 1
`

//  Query to count outbox records for settlement with payment line items
const getOutboxReadyForSettlementWithPaymentLines = (startFrn, endFrn) => `
  SELECT COUNT(*) AS count
  FROM "outbox" o
  JOIN "completedPaymentRequests" cpr
    ON cpr."completedPaymentRequestId" = o."completedPaymentRequestId"
  JOIN "paymentLines" pl
    ON pl."completedPaymentRequestId" = cpr."completedPaymentRequestId"
  WHERE cpr."frn" BETWEEN ${startFrn} AND ${endFrn}
  AND cpr."paymentRequestNumber" = 1
`

// Query to count claim records ready

const getClaimsReady = (startFrn, endFrn) => `
  SELECT COUNT(*) AS count
  FROM "claims" c
  WHERE c."frn" BETWEEN ${startFrn} AND ${endFrn}
`


// Query to get the maximum SBI and agreement number for Vet Visits scheme

const getMaxVetVisitsDetails = () => `
  SELECT
    MAX(CASE WHEN "sbi"::text ~ '^[0-9]' THEN "sbi" END) AS max_sbi,
    MAX(CASE WHEN "agreementNumber"::text ~ '^[0-9]' THEN "agreementNumber" END) AS max_agreement_number
  FROM "paymentRequests"
`

module.exports = {
  getMaxGlosInvoiceNumber,
  getInvoiceNumberByFrn,
  getMaxGenesisVendorAndContract,
  getMaxImpsTrader,
  getMaxVetVisitsDetails,
  getMaxFpttDetails,
  getMaxContractAndAgreement,
  getManualUploadById,
  getPaymentRequestByFrn,
  getSettledValueByFrn,
  getHoldCategoryByFrn,
  getCompletedPaymentRequestIdByFrn,
  getSchemeCodeByDescription,
  getOutboxReadyForSettlement,
  getOutboxReadyForSettlementWithPaymentLines,
  getClaimsReady
}