
# Automation Framework

Uses a combination of page objects with screenplay actions this framework has four main components.

Feature Files - Here we will create out tests.
Test Steps - Where all the steps are defined.
Components - This is where each page object lives.

# Prerequisite

The system must have installed:
- Node.js
- Docker (and Docker compose)

# Installing

Local system:
- npm i
- npm run test-sit

Docker (this can be used in a CI/CD or cloud environment):
- docker-compose run visual 


# Configuration

There is a properties.json file that contains the ENV and other variables that can be changed depending on environment

    "pageTimeout": `<The timeout of how long we should wait for visablity of elements>`,
    "waitTime": `<Hard wait that is utalised around the application>`,
    "headlessMode": `<If headless mode or not set to true/false>`,
    "devtools": `<Opens the dev tools menu in the broswer in test (for debuggin)>`,
    "user": `<This is the user permissions for access to the system>`,
    "width": `<Set the page width>`,
    "height":  `<Set the page height>`,
    "stepScreenshot": `<Take a screenshot on every step>`,
    "clearReports": `<Clear all the output results>`,
    "launchReport": `<At the end of the tests lanuch the summary report>`,
    "consoleLogs": `<More detail output of the run>`,
    "chromiumPath": `<Used for docker default is "">`

# Running

$npm run `<something from package.json>`
eg:
$npm run test-sit // This runs the package.json test execution - SIT (all @done features) This will generate report in output DIR

When we want to 're-run' we have a parameter called time which will use the application and customer id for the run that failed else we cannot continue (if the tests failed before these are created at the beginning of the test then there is a deeper problem and most likely the system is down or a major change has occured)
eg:
Say we start with
$npm run test-sit
This creates folders in the output dir
This will be in the format DD-MM-YYYY-HH-MM:SS (obvously the time which the test was run)
Thus if we want to do a re-run on that folder, say we have the time index of 26-03-2019-11:57:40 for the failed run we then run
$npm run rerun-sit -- 26-03-2019-11:57:40

npm run sit/dev -- for puppeter tests only

# Results

The output folder contains the date-time of the current run when running 'test-sit' this will
generate a report called cucumber_report.html. If a test fails screen shots are visable

# API Testing

This covers two types of different APIs. One that was created in house the other an online api with key provided.

To run the tests simply
$npm run api

Report is generated under test-results folder (xml format)
