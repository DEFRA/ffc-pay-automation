import reporter from 'cucumber-html-reporter';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const cucumberJsonDir = 'report/JSON/';
const cucumberReportFileMap = {};
const cucumberReportMap = {};
const jsonIndentLevel = 2;
const htmlReportDir = 'report/HTML/';
const screenshotsDir = './cypress/screenshots';

// ✅ Read the Cypress environment from the persistent environment variable
const environment = process.env.CYPRESS_ENV || 'test'; // Default to 'test' if not found

console.info(chalk.green(`🌍 Running report for environment: ${environment}`));

getCucumberReportMaps();
addScreenshots();
generateReport();

function getCucumberReportMaps () {
  const jsonFile = path.join(cucumberJsonDir, 'cucumber_report.json');

  if (!fs.existsSync(jsonFile)) {
    console.warn(chalk.yellow(`⚠️ JSON report not found: ${jsonFile}`));
    return;
  }

  const json = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

  if (!Array.isArray(json) || json.length === 0) {
    console.warn(chalk.yellow('⚠️ JSON report is empty or not an array.'));
    return;
  }

  console.info(chalk.green(`📂 Found JSON report with ${json.length} features.`));

  json.forEach((feature, index) => {
    if (!feature.uri) {
      console.warn(chalk.yellow(`⚠️ Skipping feature at index ${index} due to missing 'uri'.`));
      return;
    }

    const featureFile = path.basename(feature.uri); // Extract filename only

    console.info(chalk.cyan(`🔍 Processing feature: ${featureFile}, found in JSON.`));

    if (!cucumberReportFileMap[featureFile]) {
      cucumberReportFileMap[featureFile] = 'cucumber_report.json'; // Since all are in one file
      cucumberReportMap[featureFile] = [];
    }

    cucumberReportMap[featureFile].push(feature);

    console.info(chalk.blue(`✅ Mapped feature: ${featureFile} with ${feature.elements.length} scenarios.`));
  });

  console.info(chalk.green(`✅ Successfully processed ${Object.keys(cucumberReportMap).length} feature files.`));
}

function addScreenshots () {
  if (!fs.existsSync(screenshotsDir)) {
    console.warn(chalk.yellow(`⚠️ Screenshots directory not found: ${screenshotsDir}`));
    return;
  }

  const readdirRecursive = location =>
    fs.readdirSync(location).reduce((acc, file) => {
      const fullPath = path.join(location, file);
      return fs.statSync(fullPath).isDirectory()
        ? acc.concat(readdirRecursive(fullPath))
        : acc.concat(fullPath);
    }, []);

  const screenshots = readdirRecursive(screenshotsDir).filter(file => file.endsWith('.png'));

  if (screenshots.length === 0) {
    console.warn(chalk.yellow('⚠️ No screenshots found.'));
    return;
  }

  screenshots.forEach(screenshot => {
    const featureMatch = screenshot.match(/([\w-_.]+\.feature)/);
    if (!featureMatch) {
      return;
    }

    const featureFile = featureMatch[0];

    if (!cucumberReportMap[featureFile]) {
      console.warn(chalk.yellow(`⚠️ Feature file '${featureFile}' not found in JSON report.`));
      return;
    }

    const regex = /(?<=--\s).+?((?=\s\(example\s#\d+\))|(?=\s\(failed\))|(?=\.\w{3}))/g;
    const [scenarioName] = screenshot.match(regex) || [];

    if (!scenarioName) {
      return;
    }

    console.info(chalk.blue(`🖼 Adding screenshot to '${featureFile} - ${scenarioName}'`));

    cucumberReportMap[featureFile].forEach(feature => {
      feature.elements.forEach(scenario => {
        if (scenarioName.includes(scenario.name.replace(/["']/g, ''))) {
          const failedStep = scenario.steps.find(step => step.result.status === 'failed');
          if (!failedStep) {
            return;
          }

          const base64Image = fs.readFileSync(path.resolve(screenshot), 'base64');

          if (!failedStep.embeddings) {
            failedStep.embeddings = [];
          }

          failedStep.embeddings.push({ data: base64Image, mime_type: 'image/png' });
        }
      });
    });

    fs.writeFileSync(
      path.join(cucumberJsonDir, cucumberReportFileMap[featureFile]),
      JSON.stringify(cucumberReportMap[featureFile], null, jsonIndentLevel)
    );
  });
}

function generateReport () {
  if (!fs.existsSync(cucumberJsonDir)) {
    console.warn(chalk.yellow(`⚠️ Folder '${cucumberJsonDir}' not found. REPORT CANNOT BE CREATED!`));
    return;
  }

  const options = {
    brandTitle: 'Cucumber Test Report',
    jsonDir: cucumberJsonDir,
    output: path.join(htmlReportDir, 'cucumber_report.html'),
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    theme: 'bootstrap',
    launchReport: false,
    metadata: {
      'Environment': environment,
    },
  };

  reporter.generate(options);
  console.info(chalk.green('✅ HTML report generated successfully!'));
}