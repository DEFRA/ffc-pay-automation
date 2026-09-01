const { spawn } = require('child_process')

const env = process.argv[2]

if (!env) {
  throw new Error('No environment supplied')
}


const workers = [{
  name: 'Management',
  specs: ['01_PaymentManagement.feature', '02_RequestEditor.feature', '07_PaginationRequestEditor.feature', '09_PaginationPaymentManagement.feature']
}, {
  name: 'Holds',
  specs: ['04_UploadPaymentHolds.feature', '05_RemovePaymentHolds.feature', '13_PaymentHolds.feature']
}, {
  name: 'Alerts',
  specs: ['20_AccessibilityTesting.feature', '43_PaymentAlerts.feature', '45_DocumentAlerts.feature']
}, {
  name: 'Payments-A',
  specs: ['15_ManualPayments.feature', '16_GLOSPayments.feature', '18_IMPSPayments.feature', '19_GENESISPayments.feature']
}]

function runWorker (worker) {
  const specList = worker.specs
    .map(spec => `cypress/e2e/features/${spec}`)
    .join(',')

  console.log(`\n Starting ${worker.name}`)
  console.log(` ${specList}\n`)

  return new Promise((resolve, reject) => {
    const process = spawn(
      'npx',
      ['cypress', 'run', '--browser', 'chrome', '--env', `env=${env},TAGS=@${env}`, '--spec', specList],
      {
        shell: true,
        stdio: 'inherit'
      }
    )

    process.on('close', (code) => {
      if (code === 0) {
        console.log(` ${worker.name} passed`)
        resolve()
      } else {
        reject(new Error(`❌ ${worker.name} failed with exit code ${code}`))
      }
    })
  })
}

async function run () {
  console.log('\n======================================')
  console.log('Running Cypress in parallel')
  console.log(`Environment: ${env}`)
  console.log(`Workers: ${workers.length}`)
  console.log('======================================\n')

  try {
    await Promise.all(workers.map(runWorker))

    console.log('\n All workers completed successfully')
    process.exit(0)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

run()