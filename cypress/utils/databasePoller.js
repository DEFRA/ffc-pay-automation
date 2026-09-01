const pollDatabase = ({
  env,
  databaseName,
  sqlStatement,
  timeout = 240000,
  interval = 5000
}) => {
  const start = Date.now()

  const check = () => {
    return cy.task('databaseQuery', {
      env,
      databaseName,
      sqlStatement
    }).then((results) => {
      if (results.rows.length > 0) {
        cy.log(`✅ Data found in ${databaseName}`)
        return cy.wrap(results)
      }

      if (Date.now() - start > timeout) {
        throw new Error(`Timed out waiting for data in ${databaseName}`)
      }

      cy.wait(interval)

      return check()
    })
  }

  return check()
}

export default pollDatabase