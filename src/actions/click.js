const find = require('./find')
const wait = require('./wait')
/*
    Clicks a selector and waits for navigation, with user generated wait and click options. 
*/
async function clickAndWaitForNavigation(page, selector, clickOptions, waitOptions) {
    const [response] = Promise.all([
        page.waitForNavigation(waitOptions),
        page.click(selector, clickOptions)
    ])
    return response
}

/*
    Waits for selector to be visible then clicks on it 
*/
async function waitforSelectorClick(page, selector) {

    await page.waitFor(selector)
    const icon = await page.waitForSelector(
        selector, {
        visible: true
    }
    )
    if (icon == undefined) {
        logger.log('Wait for selector didnt work holding for 2 seconds')
        wait.wait(page)
    }
    await page.focus(selector)
    await icon.click()

    return true
}


async function clickTextWaitLoad(page, selector, text, isVisable) {

    let test = await find.elementContainingText(page, selector, text, false, isVisable)

    await test.focus()
    await test.click()

    return test

}

//Click by text 
const escapeXpathString = str => {
    const splitedQuotes = str.replace(/'/g, `', "'", '`);
    return `concat('${splitedQuotes}', '')`;
};

module.exports = {
    clickAndWaitForNavigation,
    waitforSelectorClick,
    clickTextWaitLoad,

};