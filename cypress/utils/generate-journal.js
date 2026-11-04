const fs = require('node:fs')
const crypto = require('node:crypto')
const readline = require('node:readline/promises')
const { execFileSync } = require('node:child_process')
const { stdin: input, stdout: output } = require('node:process')

const SCHEMES = {
  sfi23: {
    outputPrefix: 'FFCSFIA_0001_AP_',
    outputSuffix: ' (SFI_SFIA).csv',
    referencePrefix: 'S2795919',
    referenceSuffix: 'V001',

    vendorTemplate: ['Vendor', '1258445148', '', 'DRD10', '80101', '2023', 'RP00', 'S279591940653785V001', '-100000', 'GBP', 'legacy', '', '40653785', '0', '', '1', '', '', '', 'BACS_GBP', 'SITI_SFIA', '', '0001', '', '01/12/2025', 'GBP', '', '', 'Q4', 'END'],

    ledgerTemplate: ['Ledger', 'SOS710', '', 'DRD10', '80101', '2023', 'RP00', 'S279591940653785V001', '100000', 'GBP', 'legacy', '', '', '', '1', '', '', 'G00 - Gross value of claim', '', '', '', '', '', '', '', '', '', '40770826', '', 'END']
  },

  fptt: {
    outputPrefix: 'FFCFALS_FPTT_0001_AP_',
    outputSuffix: ' (FALS_FPTT).csv',

    headerTemplate: ['Header', '1234567890', '212345678', 'FALS_FPTT', '2026', 'DRD10', '84001', 'RP00', 'R12345678-V001Q1', '-1000', '-4000', 'R12345678', 'GBP', '03/11/2026', '1', 'Farm Payments Technical Test Payment'],

    ledgerTemplate: ['Ledger', '1', '123456789', 'SOS710', '2026', 'DRD10', '84002', 'RP00', 'R12345678-V001Q1', '1000', 'G00 - Gross value of claim', '', '', '', '', '']
  }
}

function randomInteger (min, max) {
  return crypto.randomInt(min, max + 1)
}

function generateUniqueNumber (min, max, usedValues) {
  let value

  do {
    value = randomInteger(min, max).toString()
  } while (usedValues.has(value))

  usedValues.add(value)

  return value
}

function selectFrnFile () {
  const script = `
    Add-Type -AssemblyName System.Windows.Forms

    $dialog = New-Object System.Windows.Forms.OpenFileDialog
    $dialog.Title = 'Select FRNs.csv'
    $dialog.Filter = 'CSV files (*.csv)|*.csv'
    $dialog.Multiselect = $false

    if ($dialog.ShowDialog() -eq 'OK') {
      Write-Output $dialog.FileName
    }
  `

  const selectedFile = execFileSync(
    'powershell.exe',
    ['-NoProfile', '-Command', script],
    {
      encoding: 'utf8'
    }
  ).trim()

  if (!selectedFile) {
    throw new Error('No FRN file was selected.')
  }

  return selectedFile
}

function selectOutputFile (defaultFileName) {
  const escapedFileName = defaultFileName.replace(/'/g, "''")

  const script = `
    Add-Type -AssemblyName System.Windows.Forms

    $dialog = New-Object System.Windows.Forms.SaveFileDialog
    $dialog.Title = 'Save generated journal'
    $dialog.Filter = 'CSV files (*.csv)|*.csv'
    $dialog.FileName = '${escapedFileName}'
    $dialog.DefaultExt = 'csv'
    $dialog.AddExtension = $true
    $dialog.OverwritePrompt = $true

    if ($dialog.ShowDialog() -eq 'OK') {
      Write-Output $dialog.FileName
    }
  `

  const selectedFile = execFileSync(
    'powershell.exe',
    ['-NoProfile', '-Command', script],
    {
      encoding: 'utf8'
    }
  ).trim()

  if (!selectedFile) {
    throw new Error('No output location was selected.')
  }

  return selectedFile
}

function getFrns () {
  const frnFilePath = selectFrnFile()

  const content = fs.readFileSync(frnFilePath, 'utf8')

  const lines = content
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)

  if (lines.length === 0) {
    throw new Error('Selected FRN file is empty.')
  }

  // Remove the "frn" header
  if (lines[0].toLowerCase() === 'frn') {
    lines.shift()
  }

  if (lines.length === 0) {
    throw new Error(
      'Selected FRN file does not contain any FRNs.'
    )
  }

  return lines
}

function formatTimestamp (date = new Date()) {
  const pad = value => String(value).padStart(2, '0')

  return [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate()), pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join('')
}

function generateSfi23Records (paymentRequestCount, frns) {
  const config = SCHEMES.sfi23
  const usedMValues = new Set()
  const lines = []

  if (paymentRequestCount > frns.length) {
    throw new Error(
      `Requested ${paymentRequestCount} payment requests but FRNs.csv only contains ${frns.length} FRNs.`
    )
  }

  for (
    let record = 0;
    record < paymentRequestCount;
    record += 1
  ) {
    const frn = frns[record]

    const mValue = generateUniqueNumber(
      10000000,
      99999999,
      usedMValues
    )

    const reference =
      `${config.referencePrefix}${mValue}${config.referenceSuffix}`

    const vendor = [...config.vendorTemplate]
    const ledger = [...config.ledgerTemplate]

    vendor[1] = frn       // B1 - FRN from FRNs.csv
    vendor[7] = reference // H1
    vendor[12] = mValue   // M1

    ledger[7] = reference // H2
    ledger[27] = mValue   // AB2

    lines.push(
      vendor.join(','),
      ledger.join(',')
    )
  }

  return `${lines.join('\r\n')}\r\n`
}

function generateFpttRecords (paymentRequestCount, frns) {
  const config = SCHEMES.fptt

  const usedSbis = new Set()
  const usedAgreementNumbers = new Set()
  const usedContractNumbers = new Set()

  const lines = []

  if (paymentRequestCount > frns.length) {
    throw new Error(
      `Requested ${paymentRequestCount} payment requests but FRNs.csv only contains ${frns.length} FRNs.`
    )
  }

  for (
    let record = 0;
    record < paymentRequestCount;
    record += 1
  ) {
    const frn = frns[record]

    const sbi = generateUniqueNumber(
      100000000,
      999999999,
      usedSbis
    )

    const agreementNumber = generateUniqueNumber(
      100000000,
      999999999,
      usedAgreementNumbers
    )

    const contractDigits = generateUniqueNumber(
      10000000,
      99999999,
      usedContractNumbers
    )

    const contractNumber = `R${contractDigits}`
    const reference = `${contractNumber}-V001Q1`

    const header = [...config.headerTemplate]
    const ledger = [...config.ledgerTemplate]

    header[1] = frn              // B1 - FRN
    header[2] = sbi              // C1 - SBI
    header[8] = reference        // I1
    header[11] = contractNumber  // L1

    ledger[2] = agreementNumber  // C2 - Agreement number
    ledger[8] = reference        // I2
    ledger[9] = String(Number(header[9]) * -1) // J2 = J1 flipped
    ledger[10] = 'G00 - Gross value of claim'  // K2

    lines.push(
      header.join(','),
      ledger.join(',')
    )
  }

  return `${lines.join('\r\n')}\r\n`
}

function getArgument (name) {
  const index = process.argv.indexOf(`--${name}`)

  return index === -1
    ? undefined
    : process.argv[index + 1]
}

async function main () {
  const rl = readline.createInterface({
    input,
    output
  })

  try {
    const schemeArgument = getArgument('scheme')

    const schemeInput =
      schemeArgument ??
      await rl.question('Scheme (SFI23/FPTT): ')

    const scheme = schemeInput
      .trim()
      .toLowerCase()

    if (!Object.hasOwn(SCHEMES, scheme)) {
      throw new Error(
        `Scheme "${schemeInput.trim()}" is not supported yet. Supported schemes: SFI23, FPTT.`
      )
    }

    console.log('Select the FRN file...')

    const frns = getFrns()

    console.log(
      `Loaded ${frns.length} FRNs from the selected file.`
    )

    const countArgument = getArgument('count')

    const countInput =
      countArgument ??
      await rl.question(
        'How many payment requests should be generated? '
      )

    const paymentRequestCount = Number(
      countInput.trim()
    )

    if (
      !Number.isSafeInteger(paymentRequestCount) ||
      paymentRequestCount < 1
    ) {
      throw new Error(
        'Payment request count must be a whole number greater than 0.'
      )
    }

    const config = SCHEMES[scheme]

    let content

    switch (scheme) {
    case 'sfi23':
      content = generateSfi23Records(
        paymentRequestCount,
        frns
      )
      break

    case 'fptt':
      content = generateFpttRecords(
        paymentRequestCount,
        frns
      )
      break

    default:
      throw new Error(
        `Scheme "${scheme}" is not supported.`
      )
    }

    const fileName =
      `${config.outputPrefix}${formatTimestamp()}${config.outputSuffix}`

    console.log('Choose where to save the generated journal...')

    const outputPath = selectOutputFile(fileName)

    fs.writeFileSync(
      outputPath,
      content,
      {
        encoding: 'utf8',
        flag: 'w'
      }
    )

    console.log('')
    console.log(
      `Generated ${paymentRequestCount} payment request(s).`
    )
    console.log(
      `Used ${paymentRequestCount} FRN(s) from the selected FRN file.`
    )
    console.log(
      `Generated ${paymentRequestCount * 2} CSV line(s).`
    )
    console.log(`Output: ${outputPath}`)
  } finally {
    rl.close()
  }
}

main().catch(error => {
  console.error(
    `Journal generation failed: ${error.message}`
  )

  process.exitCode = 1
})