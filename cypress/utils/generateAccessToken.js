require('dotenv').config()

const { spawn, exec } = require('child_process')
const util = require('util')

const execAsync = util.promisify(exec)

function getAccessToken () {
  return new Promise((resolve, reject) => {
    const shellCommand =
      'az account get-access-token --resource-type oss-rdbms --query accessToken --output tsv'

    console.log('Getting access token')

    const child = spawn('wsl', ['bash', '-ic', shellCommand], {
      stdio: 'pipe'
    })

    let output = ''
    let errorOutput = ''

    child.stdout.on('data', (data) => {
      const line = data.toString()
      output += line
      console.log('🟢', line.trim())
    })

    child.stderr.on('data', (data) => {
      const line = data.toString()
      errorOutput += line
      console.error('🔴', line.trim())
    })

    child.on('error', (err) => {
      reject(err)
    })

    child.on('close', (code) => {
      if (code === 0 && output.trim()) {
        console.log('Generated access token')
        resolve(output.trim())
      } else {

        reject(
          new Error(
            `Failed to get access token (exit code ${code}). ${output} ${errorOutput}`
          )
        )

      }
    })
  })
}

async function restartWsl () {
  console.log('Restarting WSL...')

  await execAsync('wsl --shutdown')

  // Give WSL time to stop cleanly
  await new Promise(resolve => setTimeout(resolve, 5000))

  console.log('WSL restart complete')
}

async function generateAccessToken (maxRetries = 6) {
  let lastError
  let wslRestarted = false

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await getAccessToken()
    } catch (error) {
      lastError = error

      console.warn(
        `Access token attempt ${attempt}/${maxRetries} failed: ${error.message}`
      )

      // Restart WSL once if we hit the known WSL service error
      if (
        !wslRestarted &&
        error.message.includes('0x8007274c')
      ) {
        try {
          await restartWsl()
          wslRestarted = true
        } catch (restartError) {
          console.error(
            `Failed to restart WSL: ${restartError.message}`
          )
        }
      }

      if (attempt < maxRetries) {
        const delay = attempt * 5000

        console.log(`Retrying in ${delay / 1000} seconds...`)

        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

module.exports = generateAccessToken