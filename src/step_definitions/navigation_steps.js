const {
    When,
    Given
} = require('cucumber')
const scope = require('../actions/scope')
const utils = require('../actions/utils')
const logger = require('../actions/logger.js')
const wait = require("../actions/wait")

When('I navigate to {string}', async function (homepage) {
    //Used for logging purpse (only if set)
    logger.log(`I navigate to ${homepage}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);
    //if needed
    let env = process.env.NODE_ENV

    try {
        await scope.page.goto(homepage, {
            waitUntil: ['load', 'networkidle0', 'domcontentloaded']
        })

    } catch (error) {
        console.log(error)
    }

    scope.pageObject = "main_page"

    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));
});


Given('I wait till {string} is visable', async function (elem) {
    //Used for logging purpse (only if set)
    logger.log(`I wait till ${elem} is visable ${elem}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);

    await wait.elementVisible(scope.page,elem)
    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

});



