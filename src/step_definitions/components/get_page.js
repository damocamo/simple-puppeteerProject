let scope = require('../../actions/scope')

function pageFor(pageName) {
    return require(`../components/${pageName}`)
}

function elementFor(pageName, element) {
    const page = pageFor(pageName)
    let split = element.split(' ')
    let isValid
    if (split.length > 1) {
        isValid = page.global.hasOwnProperty(`${split[1]}`)
        if (isValid)
            return page.global[split[1]]
        else
            return "element"
    } else {
        isValid = page.hasOwnProperty(element)
    }


    if (isValid) {
        return page[element]
    } else return "ELEMENT NOT FOUND"

}

function getPage() {
    return scope.pageObject
}

function setPage(pageName) {
    scope.pageObject = pageName
}


module.exports = {
    pageFor,
    elementFor,
    getPage,
    setPage,
}