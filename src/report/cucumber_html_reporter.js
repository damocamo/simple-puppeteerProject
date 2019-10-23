//var runDetails = require('../output/runEnv.json')
const reporter = require('cucumber-html-reporter');
const constants = require('../actions/constants')


const optionsRun = {
    theme: 'bootstrap',
    jsonFile: `./output/results.json`,
    output: `./output/cucumber_report.html`,
    screenshotsDirectory: `./output/screenshots/`,
    reportSuiteAsScenarios: false,
    launchReport: constants.launchReport,
    storeScreenshots: true,
    metadata: {
        "App Version": "0.0.0"
        //   "Test Environment": runDetails.environment,
        //   "Browser": runDetails.browser,
        //   "Platform": runDetails.platform,
    }
}

const optionsRerun = {
    theme: 'bootstrap',
    jsonFile: `./output/rerun-results.json`,
    output: `./output/cucumber_report_Rerun.html`,
    screenshotsDirectory: `./output/screenshots/`,
    reportSuiteAsScenarios: false,
    launchReport: constants.launchReport,
    storeScreenshots: true,
    metadata: {
        "App Version": "0.0.0"
        //   "Test Environment": runDetails.environment,
        //   "Browser": runDetails.browser,
        //   "Platform": runDetails.platform,
    }
}

if (process.env.NODE_ENV === 'run') {
    reporter.generate(optionsRun)
} else {
    reporter.generate(optionsRerun)
}