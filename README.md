# ffc-pay-automation

## Installation

### Prerequisites

The FFC Pay Automation framework can be run either on windows or on Linux via WSL. Below are steps to install on WSL (Linux)

1. Visual Studio Code (https://code.visualstudio.com/)
2. NVM (Node Version Manager) (https://github.com/nvm-sh/nvm)
3. Node.js - run `nvm install --lts` from Linux terminal
4. Google Chrome - run `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb` from Linux terminal, and then `sudo apt -y install ./google-chrome-stable_current_amd64.deb` to install

### Setup

1. Clone this Git repository to your local directory (within Linux)
2. Open up this local instance of the project in Visual Studio Code
3. Install the recommended extensions from Visual Studio Code Extensions.
4. Open Terminal within Visual Studio Code and install Yarn by running `npm install --global yarn` from the terminal
5. Open Terminal within Visual Studio Code and install the dependencies by running `npm install` from the terminal
6. Open Terminal within Visual Studio Code and install the dependencies by running `sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb` from the terminal

## Framework Architecture

### Overview

This framework uses:

- Cypress for browser automation and for service bus / PSQL automation.
- Cucumber (Gherkin) for business-readable test scenarios.
- Page Object Model (POM) design pattern, utilizing common steps ideally before creating custom infrastructure.
- Mochawesome for reporting.
- ESLint for code quality and consistency.

The aim is to keep feature files readable, steps reusable and test logic maintainable.

## Directory Structure

```text
cypress
├── e2e
│   ├── features
│   ├── pages
│   └── steps
├── fixtures
├── downloads
├── screenshots
├── videos
├── support
├── reports
└── utils
```
## Reusable Step Definitions (`common.js`)

The framework follows a **generic-first approach** when implementing automation.

Before creating new page objects, locators, or step definitions, existing functionality within `common.js` should always be considered first. Many user interactions such as entering data, selecting dropdown values, clicking links, clicking buttons, validating text, and verifying page content are already handled through reusable generic steps.

The goal is to minimise duplication across the framework and maintain a consistent automation standard.

### Preferred Approach

1. Use an existing generic step from `common.js` wherever possible.
2. If the interaction can be reused across multiple pages or services, extend the generic functionality rather than creating page-specific implementations.
3. Only create a new Page Object Model (POM) method when the behaviour is genuinely unique to a specific page or business process.
4. Avoid creating page-specific locators and steps for functionality that already exists elsewhere within the application.

### Examples

 Preferred

```gherkin
And I enter "1050001234" into the "frn" field 
And I select "SFI23" from the "scheme" dropdown
When I click the "Continue" button
Then I verify "Payment request created" is displayed
```

 Avoid

Creating new page-specific methods such as:

```javascript
paymentRequestPage.enterFrn()
paymentRequestPage.clickContinue()
paymentRequestPage.verifySuccessMessage()
```

when the same behaviour can already be achieved through existing generic steps.

### When Should a Page Object Be Created?

A Page Object Model should only be introduced when the functionality being tested is genuinely page-specific and cannot reasonably be reused elsewhere within the application.

Examples include:

- Complex business workflows unique to a single page.
- Custom controls or interactions not supported by existing generic steps.
- Page-specific calculations or behaviours.
- Highly specialised validation logic that exists only in one area of the application.

> **Guiding Principle:** If a user interaction could reasonably occur on more than one page, it should be implemented as a reusable generic step in `common.js`. Page Objects should be reserved for genuinely page-specific behaviour that cannot be standardised or reused elsewhere.
> 
## Folder Overview

| Folder | Description |
|---------|-------------|
| `features` | Gherkin feature files containing business-readable test scenarios written using Given/When/Then syntax. |
| `pages` | Page Object Models (POMs) containing reusable locators and page interaction methods. |
| `steps` | Step definitions that implement the behaviour described in the feature files. |
| `fixtures` | Static test data used during test execution. |
| `downloads` | Files downloaded during Cypress test runs. |
| `screenshots` | Screenshots generated automatically during execution and test failures. |
| `videos` | Video recordings of test executions. |
| `support` | Shared commands, hooks, custom utilities, and framework configuration. |
| `reports` | Generated test execution reports (e.g. Mochawesome reports). |
| `utils` | Reusable helper functions and common utility modules. |

## Common Utilities

| File | Purpose | Typical Use Case |
|--------|---------|------------------|
| `utils/databaseInsert.js` | Inserts test data directly into the database. | Test setup, seeding prerequisite data, creating records that are difficult to create through the UI. |
| `utils/databasePoller.js` | Polls the database until expected data or conditions are met. | Waiting for asynchronous processing, reducing reliance on fixed waits. |
| `utils/databaseQuery.js` | Executes database queries and returns results. | Data validation, test assertions, record lookups and cleanup activities. |
| `utils/date.js` | Provides reusable date generation, formatting and manipulation functions. | Future dates, past dates, date validation and dynamic test data. |
| `utils/downloadPaymentsBlobById.js` | Downloads payment files from Azure Blob Storage using a payment identifier. | Statement validation and payment file verification. |
| `utils/downloadStatementsBlobById.js` | Downloads statement files from Azure Blob Storage. | Statement generation and download verification. |
| `utils/empty-folder.js` | Removes files from a specified directory. | Test cleanup and environment preparation before execution. |
| `utils/find-unused-steps.js` | Identifies step definitions that are no longer referenced by feature files. | Framework clean-up and refactoring activities. |
| `utils/generateAccessToken.js` | Generates access tokens for authenticated API requests. | API testing and service authentication. |
| `utils/generateJWT.js` | Generates JWT tokens used within automated tests. | Authentication, service-to-service testing and token validation. |
| `utils/hidePendingInHtml.js` | Removes or hides pending scenarios from generated HTML reports. | Producing cleaner Mochawesome reports. |
| `utils/loadReportData.js` | Loads and processes report data for report generation. | Report aggregation and post-processing. |
| `utils/receiveMessage.js` | Receives and processes messages from queues or messaging services. | Message validation and integration testing. |
| `utils/run-parallel.js` | Splits the test suite across multiple Cypress workers and executes them in parallel. | Reducing regression execution times while supporting isolated worker groups. |
| `utils/sendMessage.js` | Sends individual messages to integrated messaging services. | Triggering downstream processing and integration testing. |
| `utils/sendMessagesBatch.js` | Sends multiple messages as a batch operation. | Bulk processing and load-testing scenarios. |
| `utils/uploadFileToBlobStorage.js` | Uploads files to Azure Blob Storage. | File upload scenarios and storage integration testing. |
| `fixtures/paymentsholds.data.js` | Centralised data source containing valid schemes, hold types and hold-related test data used throughout the framework. | Hold creation, hold validation, dropdown selection and data-driven testing. |

---



## Running Tests

Tests are executed in Chrome using environment-specific tags. Commands are defined within the `scripts` section of `package.json`.

> **Note:** Interactive (`npm run cypress:local/dev/test`) executions do not generate Mochawesome reports.

| Type | Command | Description |
|--------|----------|-------------|
| Interactive | `npm run cypress:local` | Open Cypress Test Runner against Local environment |
| Interactive | `npm run cypress:dev` | Open Cypress Test Runner against Dev environment |
| Interactive | `npm run cypress:test` | Open Cypress Test Runner against Test environment |
| Headless | `npm run cypress:local:all` | Run all tagged Local tests and generate report data |
| Headless | `npm run cypress:dev:all` | Run all tagged Dev tests and generate report data |
| Headless | `npm run cypress:test:all` | Run all tagged Test tests and generate report data |
| Single Feature | `npm run cypress:local:one -- "<feature>"` | Run a single feature against Local |
| Single Feature | `npm run cypress:dev:one -- "<feature>"` | Run a single feature against Dev |
| Single Feature | `npm run cypress:test:one -- "<feature>"` | Run a single feature against Test |
| Parallel | `npm run cypress:local:parallel` | Run the Local suite using multiple workers |
| Parallel | `npm run cypress:dev:parallel` | Run the Dev suite using multiple workers |
| Parallel | `npm run cypress:test:parallel` | Run the Test suite using multiple workers |
| Reporting | `npm run report:merge` | Merge Mochawesome JSON output into a single report file |
| Reporting | `npm run report:html` | Generate an HTML report from merged results |
| Utility | `npm run clean:reports` | Remove reports, screenshots, videos and downloads |
| Utility | `npm run find-unused-steps` | Identify step definitions not referenced by any feature file |

### Example: Running a Single Feature

```bash
npm run cypress:local:one -- "cypress/e2e/features/41_ResetPaymentRequest.feature"
```

### Parallel Execution

Parallel execution is configured within:

```text
cypress/utils/run-parallel.js
```

The suite is split across multiple workers to reduce execution time. Payment end-to-end scenarios remain grouped into a dedicated worker to avoid test data conflicts.

### Generating HTML Reports

After any headless, single-feature or parallel execution:

```bash
npm run report:merge
npm run report:html
```

### Test Artifacts

| Artifact | Location |
|-----------|----------|
| Reports | `cypress/reports` |
| Screenshots | `cypress/screenshots` |
| Videos | `cypress/videos` |
| Downloads | `cypress/downloads` |

*Last updated: 11th September 2026*
