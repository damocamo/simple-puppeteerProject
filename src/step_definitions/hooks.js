const {
    BeforeAll,
    AfterAll,
    Before,
    After,
    setDefaultTimeout,
} = require('cucumber')
const scope = require('../actions/scope')
const constants = require('../actions/constants')
const utils = require('../actions/utils')
const logger = require('../actions/logger')
let timeBefore
let scenarioTimeBefore
let moment = require('moment')
//Keeps the current scenario 
let counter

BeforeAll(async function () {
    //over run counter may use one day 
    counter = 0
    let env = process.env.NODE_ENV

    if (env !== "API") {
        const puppeteer = require('puppeteer');
        scope.driver = puppeteer;
        console.log('ENV: ' + env)

        const platform = process.platform
        let launchProperties = {
            headless: constants.headlessMode,
            devtools: constants.devtools,
            ignoreHTTPSErrors: true,
            args: ['--no-sandbox',
                '--disable-setuid-sandbox',
                '--enable-logging', '--v=1',
            ]
        }

        // if chromiumPath is not empty, set executablePath to chromiumPath
        if (constants.chromiumPath !== '') {
            launchProperties.executablePath = constants.chromiumPath
        }
        scope.browser = await scope.driver.launch(launchProperties)
    }
    // depending on flags we set params and remove folders 
    setDefaultTimeout(constants.pageTimeout)
    utils.checkDir(constants.clearReports)

    // create new folder for current run (this is for our debugs) 
    scope.folder = utils.getTime('DD-MM-YYYY-HH:mm:ss')
    utils.mkdirSync(`./output/${scope.folder}`)

    timeBefore = utils.getTime('DD-MM-YY HH:mm:ss')
    console.log('Complete Run commenced at: ' + timeBefore);
    timeBefore = moment(timeBefore, "DD-MM-YY HH:mm:ss")

});

Before(async function (scenario) {

    // create new page between scenarios
    if (process.env.NODE_ENV !== "API") {

        context = await scope.browser.createIncognitoBrowserContext();
        scope.page = await context.newPage()
        // add in accept language header - this is required when running in headless mode
        await scope.page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.8,zh-TW;q=0.6'
        })
    }

    //this is a comment in the output report 
    //this.attach('Welcome to our TestFrameWork - using puppeteer, BDD and other cool stuff');
    scenarioTimeBefore = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + scenarioTimeBefore)

    const scenarioName = scenario.pickle.name.replace(/ /g, '-')
    console.log(`Scenario Running : ${scenarioName}`)
    this.attach('Scenario Run time commenced at: ' + scenarioTimeBefore);
    scenarioTimeBefore = moment(scenarioTimeBefore, "DD-MM-YY HH:mm:ss")

});

After(async function (scenario) {
    let name = scenario.pickle.name.replace(/ /g, '-')
    let result = scenario.result.status
    let stream = ''
    let timeScenarioAfter = utils.getTime('DD-MM-YY HH:mm:ss')
    timeScenarioAfter = moment(timeScenarioAfter, "DD-MM-YY HH:mm:ss")

    let duration = moment.duration(timeScenarioAfter.diff(scenarioTimeBefore));
    let seconds = duration.asSeconds() - (Math.floor(duration.asMinutes()) * 60)

    logger.log("Time taken: " + Math.floor(duration.asDays()) + " days " + Math.floor(duration.asHours()) + " hours " + Math.floor(duration.asMinutes()) + " minutes " + seconds + " seconds ")
    this.attach("Time taken: " + Math.floor(duration.asDays()) + " days " + Math.floor(duration.asHours()) + " hours " + Math.floor(duration.asMinutes()) + " minutes " + seconds + " seconds ")

    // At moment take screenshot of fail
    if (process.env.NODE_ENV !== "API") {
        if (result === 'failed') {
            stream = await utils.takeScreenshot(result)
            await scope.page.close()
            counter++
            return this.attach(stream, 'image/png');
        } else {
            await scope.page.close()
            counter++
        }
    }

});

AfterAll(async () => {
    let timeAfter = utils.getTime('DD-MM-YY HH:mm:ss')
    console.log('Complete Run completed at: ' + timeAfter);

    timeAfter = moment(timeAfter, "DD-MM-YY HH:mm:ss")
    let duration = moment.duration(timeAfter.diff(timeBefore));
    let seconds = duration.asSeconds() - (Math.floor(duration.asMinutes()) * 60)

    console.log("Time taken: " + Math.floor(duration.asDays()) + " days " + Math.floor(duration.asHours()) + " hours " + Math.floor(duration.asMinutes()) + " minutes " + seconds + " seconds ")
    // At moment take screenshot of fail
    if (process.env.NODE_ENV !== "API") {

        await scope.browser.close()
    }
});

function getBeforeTime() {
    return moment(timeBefore, "DD-MM-YY HH:mm:ss")
};

module.exports = {
    getBeforeTime
}