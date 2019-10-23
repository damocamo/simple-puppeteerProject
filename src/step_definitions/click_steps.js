const {
    When,
    Given
} = require('cucumber');
const scope = require('../actions/scope')
const utils = require('../actions/utils')
const logger = require('../actions/logger.js')
const click = require('../actions/click')
const wait = require('../actions/wait')
const getPage = require('../step_definitions/components/get_page')


Given('I click on {string}', async function (selector) {
    //Used for logging purpse (only if set)
    logger.log(`I click on ${selector}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);

    //gets page
    let page = getPage.getPage()
    selector = getPage.elementFor(page, selector)

    await wait.elementVisible(scope.page, selector)
    let mybutton = await scope.page.$(selector)
    // await mybutton.click()

    await Promise.all([
        scope.page.waitForResponse(response => response.ok()),
        mybutton.click(), // Clicking the
    ]);

    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

});

Given('I click on {string} with text {string}', async function (selector, text) {
    //Used for logging purpse (only if set)
    logger.log(`I click the ${selector} button with text ${text}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);

    //gets page
    let page = getPage.getPage()
    selector = getPage.elementFor(page, selector)
    if (page === "popup") {
        await click.clickTextWaitLoad(scope.page, selector, text)
    } else
        await click.clickTextWaitLoad(scope.page, selector, text, true)

    //Wait for load 
    await scope.page.waitForResponse(response => response.ok());

    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

});

When('I click {string} item on the results', async function (value) {
    //Used for logging purpse (only if set)
    logger.log(`I click  ${value} item on the results`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);
    await scope.page.waitForResponse(response => response.ok());
    //await scope.page.waitForNavigation({waitUntil: 'domcontentloaded'});

    //set page to results 
    scope.pageObject = "results_page"
    let element = getPage.elementFor(scope.pageObject, "resultsSelect")
    await scope.page.waitFor(element)
    // Chagnge to page object search results here 
    let searchResults = await scope.page.$(element)
    element = getPage.elementFor(scope.pageObject, "resultsChild")
    let input = await searchResults.$x(element)


    await input[value].click()

    //Wait for load 
    await scope.page.waitForNavigation({ waitUntil: 'load' });
    await scope.page.waitForResponse(response => response.ok());


    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

})

When('I click on cart button', async function () {

    //Used for logging purpse (only if set)
    logger.log(`I click on cart button`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);

    let element = getPage.elementFor(scope.pageObject, "global cartid")
    let myCart = await scope.page.$(element)
    await myCart.click()

    //Wait for load 
    await scope.page.waitForNavigation({ waitUntil: 'load' });
    await scope.page.waitForResponse(response => response.ok());


    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));
})


Given('I click {string} {string} on item {string}', async function (elementText, elementSelector, arrayNumber) {

    //Used for logging purpse (only if set)
    logger.log(`I click ${elementText} ${elementSelector} on item ${arrayNumber}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);

    //find elements with that selector
    let matchingElements = await scope.page.$$(elementSelector)
    let elementAry = []
    for (let matchingElement of matchingElements) {
        const matchingElementText = await scope.page.evaluate(el => el.innerText, matchingElement)
        if (matchingElementText == elementText) {
            elementAry.push(matchingElement)
        }
    }
    let itemClick = elementAry[arrayNumber]
    await itemClick.click()
    //Wait for load 
    await scope.page.waitForResponse(response => response.ok());


    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

})



Given('I click on the {string} option', async function (option) {

    //Used for logging purpse (only if set)
    logger.log(`I click on the ${option} option`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);
    //find the check button on the page with text "option"
    selector = `//a[contains(text(), '${option}')]/preceding-sibling::span`
    await wait.elementXpathVisible(scope.page, selector)
    let link = await scope.page.$x(selector);
    await link[0].click()
    await scope.page.waitForResponse(response => response.ok());
    await scope.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

});







