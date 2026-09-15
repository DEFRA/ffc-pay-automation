const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')


//in ffc-pay-web, the endpoints live in the constants folders, however this is not the case for request-editor and pr-calculator , so we point wsl to look in different folders to extract route info to compare against
const repositories = [{
  name: 'ffc-pay-web',
  path: '/home/svend/ffc-pay-web',
  source: 'constants'
}, {
  name: 'ffc-pay-request-editor',
  path: '/home/svend/ffc-pay-request-editor',
  source: 'routes'
}, {
  name: 'ffc-pr-calculator',
  path: '/home/svend/ffc-pr-calculator',
  source: 'routes'
}]

// ignore list of routes we don't really care about, not critical to business flows
const ignoredRoutes = ['/', '/healthy', '/healthz', '/sitemap', '/robots.txt', '/assets/{path*}', '/static/{path*}', '/login', '/logout', '/dev-auth', '/authenticate', '/loading/{jobId}', '/download-report-list/generation/download/{jobId}', '/download-statements/download/{filename*}']

const routeCoverageFile = path.join(
  process.cwd(),
  'cypress',
  'reports',
  'route-coverage.json'
)

const outputFile = path.join(
  process.cwd(),
  'cypress',
  'reports',
  'route-coverage-report.json'
)

function normaliseRoute (route) {
  if (!route || typeof route !== 'string') {
    return null
  }

  let normalisedRoute = route
    .trim()
    .split('?')[0]
    .split('#')[0]

  if (
    normalisedRoute.length > 1 &&
    normalisedRoute.endsWith('/')
  ) {
    normalisedRoute = normalisedRoute.slice(0, -1)
  }

  return normalisedRoute
}

function getWslFiles (searchPath, fileNamePattern) {
  const output = execSync(
    `wsl find "${searchPath}" -type f -name "${fileNamePattern}"`,
    {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024
    }
  )

  return output
    .split(/\r?\n/)
    .map(file => file.trim())
    .filter(Boolean)
}

function readWslFile (file) {
  return execSync(
    `wsl cat "${file}"`,
    {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024
    }
  )
}

function extractQuotedRoute (text) {
  if (!text || typeof text !== 'string') {
    return null
  }

  const singleQuoteStart = text.indexOf("'")
  const doubleQuoteStart = text.indexOf('"')

  let quote
  let start

  if (
    singleQuoteStart !== -1 &&
    (
      doubleQuoteStart === -1 ||
      singleQuoteStart < doubleQuoteStart
    )
  ) {
    quote = "'"
    start = singleQuoteStart
  } else if (doubleQuoteStart !== -1) {
    quote = '"'
    start = doubleQuoteStart
  } else {
    return null
  }

  const end = text.indexOf(quote, start + 1)

  if (end === -1) {
    return null
  }

  const value = text.slice(start + 1, end).trim()

  if (!value.startsWith('/')) {
    return null
  }

  return value
}

function extractRoutesFromConstants (repo) {
  const constantsPath = `${repo.path}/app/constants`

  const routeFiles = getWslFiles(
    constantsPath,
    '*routes*.js'
  )

  const routes = []

  routeFiles.forEach(file => {
    const content = readWslFile(file)

    content
      .split(/\r?\n/)
      .forEach(line => {
        const colonPosition = line.indexOf(':')

        if (colonPosition === -1) {
          return
        }

        const valuePart = line.slice(colonPosition + 1)
        const route = extractQuotedRoute(valuePart)

        if (!route) {
          return
        }

        routes.push({
          route: normaliseRoute(route),
          file: file.replace(repo.path, ''),
          repo: repo.name
        })
      })
  })

  console.log(
    `${repo.name}: ${routeFiles.length} files, ` +
    `${routes.length} route declarations`
  )

  return routes
}

function extractRoutesFromRouteFiles (repo) {
  const routeFiles = getWslFiles(
    `${repo.path}/app/routes`,
    '*.js'
  )


  const routes = []

  routeFiles.forEach(file => {
    const content = readWslFile(file)

    content
      .split(/\r?\n/)
      .forEach(line => {
        const trimmedLine = line.trim()

        if (!trimmedLine.startsWith('path:')) {
          return
        }

        const valuePart = trimmedLine.slice(
          'path:'.length
        )

        const route = extractQuotedRoute(valuePart)

        if (!route) {
          return
        }

        routes.push({
          route: normaliseRoute(route),
          file: file.replace(repo.path, ''),
          repo: repo.name
        })
      })
  })
  console.log(`${repo.name}: ${routeFiles.length} files, ${routes.length} routes`)
  return routes
}

function extractRoutesFromRepo (repo) {
  if (repo.name === 'ffc-pay-web') {
    return [...extractRoutesFromConstants(repo), ...extractRoutesFromRouteFiles(repo)]
  }

  return extractRoutesFromRouteFiles(repo)
}


function loadVisitedRoutes () {
  if (!fs.existsSync(routeCoverageFile)) {
    throw new Error(
      `Unable to find ${routeCoverageFile}`
    )
  }

  const data = JSON.parse(
    fs.readFileSync(routeCoverageFile, 'utf8')
  )

  return new Set(
    data.map(route => normaliseRoute(route))
  )
}

function main () {
  console.log('Loading visited routes...')

  const visitedRoutes = loadVisitedRoutes()

  console.log(
    `Found ${visitedRoutes.size} visited routes`
  )

  const allDeclaredRoutes = repositories.flatMap(
    extractRoutesFromRepo
  )

  const uniqueDeclaredRoutes = []
  const seen = new Set()

  allDeclaredRoutes.forEach(route => {
    if (!route || !route.route) {
      return
    }

    const key = `${route.repo}:${route.route}`

    if (!seen.has(key)) {
      seen.add(key)
      uniqueDeclaredRoutes.push(route)
    }
  })

  const filteredRoutes = uniqueDeclaredRoutes.filter(
    route => !ignoredRoutes.includes(route.route)
  )

  const coveredRoutes = filteredRoutes.filter(
    route =>
      visitedRoutes.has(route.route)
  )

  const uncoveredRoutes = filteredRoutes.filter(
    route =>
      !visitedRoutes.has(route.route)
  )

  const repoCoverage = repositories.map(repo => {
    const repoRoutes = uniqueDeclaredRoutes.filter(
      route => route.repo === repo.name
    )

    const repoCoveredRoutes = repoRoutes.filter(
      route => visitedRoutes.has(route.route)
    )

    return {
      repo: repo.name,
      declaredRoutes: repoRoutes.length,
      coveredRoutes: repoCoveredRoutes.length,
      uncoveredRoutes:
      repoRoutes.length - repoCoveredRoutes.length,
      coveragePercentage:
      repoRoutes.length === 0
        ? 0
        : Number(
          (
            (repoCoveredRoutes.length /
                repoRoutes.length) *
              100
          ).toFixed(2)
        )
    }
  })
  const report = {
    generatedAt: new Date().toISOString(),

    summary: {
      totalDeclaredRoutes:
        filteredRoutes.length,
      coveredRoutes:
        coveredRoutes.length,
      uncoveredRoutes:
        uncoveredRoutes.length,
      coveragePercentage:
  uniqueDeclaredRoutes.length === 0
    ? 0
    : Number(
      (
        (
          coveredRoutes.length /
            uniqueDeclaredRoutes.length
        ) *
          100
      ).toFixed(2)
    )
    },
    repoCoverage,
    uncoveredRoutes,
    coveredRoutes
  }

  fs.writeFileSync(
    outputFile,
    JSON.stringify(report, null, 2)
  )

  console.log('')
  console.log('Route Coverage')
  console.log('--------------')
  console.log(
    `Declared: ${report.summary.totalDeclaredRoutes}`
  )
  console.log(
    `Covered:  ${report.summary.coveredRoutes}`
  )
  console.log(
    `Missing:  ${report.summary.uncoveredRoutes}`
  )
  console.log(
    `Coverage: ${report.summary.coveragePercentage}%`
  )
  console.log('')
  console.log('Coverage By Repository')
  console.log('----------------------')

  repoCoverage.forEach(repo => {
    console.log(
      `${repo.repo}: ${repo.coveredRoutes}/${repo.declaredRoutes} (${repo.coveragePercentage}%)`
    )
  })
  console.log('')
  console.log('Report written to:')
  console.log(outputFile)
}

main()