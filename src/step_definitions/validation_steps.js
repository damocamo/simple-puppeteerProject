const {
    Then,
    Given
} = require('cucumber')
const scope = require('../actions/scope');
const chai = require('chai')
const utils = require('../actions/utils')
const find = require('../actions/find')
const wait = require('../actions/wait')
const getPage = require('../step_definitions/components/get_page')
const logger = require('../actions/logger.js')

Then('I validate the URL is {string}', async function (title) {
    //Used for logging purpse (only if set)
    logger.log(`I validate the URL is ${title}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);


    let myValue = await scope.page.url()

    chai.expect(title).to.equal(myValue)

    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

});

Then('I validate {string} contains {string}', async function (selector, value) {
    //Used for logging purpse (only if set)
    logger.log(`I validate ${selector} contains ${value}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);


    //gets page
    let page = getPage.getPage()
    selector = getPage.elementFor(page, selector)


    //wait for selector first 
    await wait.elementVisible(scope.page, selector)
    let objectText = await find.elementText(scope.page, selector)

    if (value === "Random") {
        value = scope.random
    }

    chai.expect(value).to.equal(objectText)
    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));
});

Then('I validate input {string} contains {string}', async function (selector, value) {
    //Used for logging purpse (only if set)
    logger.log(`I validate input ${selector} contains ${selector}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);

    //gets page
    let page = getPage.getPage()
    selector = getPage.elementFor(page, selector)

    //wait for selector first 
    await wait.elementVisible(scope.page, selector)
    let objectText = await find.getTextOfSelAttribute(scope.page, selector, "value")

    if (value === "Random") {
        value = scope.random
    }

    chai.expect(value.toLowerCase()).to.equal(objectText)
    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));
});

Given('I validate cart has added {string} item', async function (number) {
    //Used for logging purpse (only if set)
    logger.log(`I validate cart has added ${number} item`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);
    let element = getPage.elementFor(scope.pageObject, "global cartVlaue")

    let text = await find.elementText(scope.page, element)
    await wait.elementVisible(scope.page, element)

    chai.expect(text).to.equal(number)
    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));
})

Given('I validate page contains text {string}', async function (myYext) {
    //Used for logging purpse (only if set)
    logger.log(`I validate page contains text ${myYext}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);

    let selector = getPage.elementFor(scope.pageObject, "global buttonText")
    await scope.page.waitFor(selector)
    await scope.page.waitFor(2000)
    let found = await scope.page.evaluate(myYext => {
        return window.find(myYext)
    }, myYext);
    chai.expect(found).to.be.true
    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));
})



Given('I wait for {string} is not visable', async function (selector) {
    //Used for logging purpse (only if set)
    logger.log(`I validate ${selector} is not visable`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);


    //gets page
    let page = getPage.getPage()
    selector = getPage.elementFor(page, selector)

    let elementHandle = await scope.page.$(selector)
    let myText = await find.getPropertyText(scope.page, elementHandle, "class")

    while (myText.includes("-visible")) {
        myText = await find.getPropertyText(scope.page, elementHandle, "class")

    }

    chai.expect(myText).to.not.contain("-visible")

    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

});

Given('I save the {string} name clicked', async function (product) {
    //Used for logging purpse (only if set)
    logger.log(`I save the product name clicked`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);

    //gets page and element
    let page = getPage.getPage()
    selector = getPage.elementFor(page, product)
    // Saves the name of the element clicked (title of product)
    scope.productItem = await find.elementText(scope.page, selector)

    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

});


Given('I validate product name has been added', async function () {
    //Used for logging purpse (only if set)
    logger.log(`I validate product name has been added`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);

    let element = getPage.elementFor(scope.pageObject, "global cartItem")
    let myList = await scope.page.$$(element)
    let found = false
    //Loop through all the cart items 
    for(list of myList){

        let mytxt = await find.elementTextHandle(list)
        //Validate that the item is really in the cart by text of the product
        if(scope.productItem === mytxt){
            found = true
        }
    }

    chai.expect(found).to.be.true

    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

});

Given('I validate search results relate to {string}', async function (value) {
    //Used for logging purpse (only if set)
    logger.log(`I validate search results relate to ${value}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);
    //await scope.page.waitForNavigation({waitUntil: 'domcontentloaded'});
    await scope.page.waitForResponse(response => response.ok());

    //set page to results 
    scope.pageObject = "results_page"
    let element = getPage.elementFor(scope.pageObject, "resultsSelect")
    await scope.page.waitFor(element)
    // Chagnge to page object search results here 
    let searchResults = await scope.page.$(element)
    element = getPage.elementFor(scope.pageObject, "resultsChild")
    let input = await searchResults.$x(element)
    let found = 0
    //get the links off all the results and strip the text
    for(mylocal of input){

        let mylink = await mylocal.$("a")
        let objectText = await find.getPropertyText(scope.page,mylink,'title')
        objectText = objectText.toLowerCase()
        // the title of the product contains the "value" provided 
        if(objectText.includes(value.toLowerCase()))
        {
            found++ 
        }
    }
    // We expect all results to contain the key word in the search 
    chai.expect(found).to.be.eqls(input.length)

    //default screenshot code if config set
    let stream = await utils.screenshotStep(true)
    return (stream === '' ? null : this.attach(stream, 'image/png'));

})
