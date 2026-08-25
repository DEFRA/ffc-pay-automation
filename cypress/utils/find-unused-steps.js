const fs = require('fs')
const path = require('path')

const FEATURES_DIR = 'cypress/e2e'
const STEPS_DIR = 'cypress/e2e/steps'

function getFiles (dir, extensions) {
  let results = []

  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file)

    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getFiles(fullPath, extensions))
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(fullPath)
    }
  })

  return results
}

function getFeatureSteps () {
  const featureFiles = getFiles(FEATURES_DIR, ['.feature'])
  const steps = []

  featureFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8')

    content.split('\n').forEach(line => {
      line = line.trim()

      if (
        line.startsWith('Given ') ||
        line.startsWith('When ') ||
        line.startsWith('Then ') ||
        line.startsWith('And ') ||
        line.startsWith('But ')
      ) {
        steps.push(line.replace(/^(Given|When|Then|And|But)\s+/, ''))
      }
    })
  })

  return steps
}

function getStepDefinitions () {
  const stepFiles = getFiles(STEPS_DIR, ['.js'])
  const definitions = []

  const stepRegex =
    /(Given|When|Then)\s*\(\s*\/\^(.*?)\$\/[gimuy]*\s*,/g

  stepFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8')

    let match

    while ((match = stepRegex.exec(content)) !== null) {
      definitions.push({
        file,
        regex: match[2]
      })
    }
  })

  return definitions
}

function isUsed (regexPattern, featureSteps) {
  try {
    const regex = new RegExp(`^${regexPattern}$`)

    return featureSteps.some(step => regex.test(step))
  } catch {
    return true
  }
}

const featureSteps = getFeatureSteps()
const stepDefinitions = getStepDefinitions()

const unused = stepDefinitions.filter(
  step => !isUsed(step.regex, featureSteps)
)

console.log('\n=== UNUSED STEP DEFINITIONS ===\n')

unused.forEach(step => {
  console.log(`${step.file}`)
  console.log(`  ${step.regex}`)
})

console.log(`\nTotal unused: ${unused.length}`)