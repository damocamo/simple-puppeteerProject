const {
    When,
    Given
} = require('cucumber');
const scope = require('../actions/scope');
const utils = require('../actions/utils')
const logger = require('../actions/logger.js')
const random = require('../actions/randomstring')
const wait = require('../actions/wait')
const getPage = require('../step_definitions/components/get_page')

Given('I fill in {string} input with {string}', async function (inputField, inputText) {
    //Used for logging purpse (only if set)
    logger.log(`I fill in  ${inputField} input with  ${inputText}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);
    //gets page
    let page = getPage.getPage()
    inputField = getPage.elementFor(page, inputField)

    await wait.elementVisible(scope.page, inputField)

    let element = await scope.page.$(inputField)
    // this will generate a random input 
    if (inputText === "Random") {
        inputText = random.makeid(7) + "@gmail.com"
        // here we save this in the gloal so can be checked later 
        scope.random = inputText
    } else if (inputText === "ScopeInput") {
        inputText = scope.random
    }

    await element.type(inputText)
    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));
});


Given('I press {string} keys', async function (key) {
    //Used for logging purpse (only if set)
    logger.log(`I press ${key} keys`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);
    await scope.page.keyboard.press(key)
})

//Specific test step with selectors
When('I input the address {string}', async function (inputAddress) {
    //Used for logging purpse (only if set)
    logger.log(`I input the address ${inputAddress}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);

    let address
    await wait.elementVisible(scope.page, '#company_name')
    //Still wait as the input of address is a little more complex
    await scope.page.waitFor(1000)
    let selector = 'input[type=text]'
    let selectors = await scope.page.$$(selector)
    for (element of selectors) {
        const propertyHandle = await element.getProperty('placeholder');
        const propertyValue = await propertyHandle.jsonValue();

        if (propertyValue === "Start typing your address...") {
            address = element
            break;
        }

    }
    //hold to load the list 
    await address.type(inputAddress)
    //hold to load the list is populated 
    await wait.elementVisible(scope.page, '[role="option"]')
    // Select second from the list 
    await scope.page.keyboard.press('ArrowDown');
    await scope.page.keyboard.press('Enter');

    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

});






