
require('dotenv').config()
const { spawn } = require('child_process')

function getAccessToken () {
  return new Promise((resolve, reject) => {
    const shellCommand = 'az account get-access-token --resource-type oss-rdbms --query accessToken --output tsv'

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
            `Failed to get access token (exit code ${code}). ${errorOutput}`
          )
        )
      }
    })
  })
}

async function generateAccessToken (maxRetries = 6) {
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await getAccessToken()
    } catch (error) {
      lastError = error

      console.warn(
        ' Access token attempt ${attempt}/${maxRetries} failed: ${error.message}'
      )

      if (attempt < maxRetries) {
        console.log('Retrying in 5 seconds...')
        await new Promise(resolve => setTimeout(resolve, attempt * 5000))
      }
    }
  }

  throw lastError
}

module.exports = generateAccessToken