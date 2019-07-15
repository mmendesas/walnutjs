# **walnutjs**

**walnutjs** is a collection of generic steps for interact with web-applications.

You can easily simulate user interactions using a business-readable way.
You only need to write some feature files using the **Gherkin** syntax and plan your tests with **BDD (Behavior Driven Development)** pattern.

Enjoy It!


[![https://nodei.co/npm/walnutjs.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/walnutjs.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/walnutjs)

[![CircleCI](https://circleci.com/gh/mmendesas/walnutjs.svg?style=svg)](https://circleci.com/gh/mmendesas/walnutjs)
[![Npm version](https://img.shields.io/npm/v/walnutjs.svg?style=flat-square)](https://www.npmjs.com/package/walnutjs)
![License](https://img.shields.io/npm/l/walnutjs.svg?style=flat-square)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)


```sh
Usage: walnut [options]

Walnut Framework - Automated BDD Tests for Web Applications

Options:
  -V, --version              output the version number
  -c, --config <path>        path to JSON config file
  -t, --tags <tagName>       name of tag to run (default: [])
  -m, --execMethod <method>  execution method [e.g runOnlyAPI]
  -h, --help                 output usage information
```

> Please see our wiki **[DOCs](https://github.com/sednemm/walnutjs/wiki)** for more details.


## Getting Started
These instructions will give you a sample feature file to show you how easy is to make your own tests

### Prerequisites
Before continue, check that you have completed the following requirements:
* [**java**](https://www.java.com/en/download/) - Java runtime environment - _tested on 1.8.0_211_
* [**nodejs**](https://nodejs.org) - A javascript runtime - _tested on v10.16.0_
* **selenium webserver**:
    * [**webdriver-manager**](https://www.npmjs.com/package/webdriver-manager) - A selenium server and browser driver manager.
    * [**zalenium**](https://opensource.zalando.com/zalenium/) - A flexible and scalable selenium grid.

### Setup the project
1. Start by creating a simple `nodejs` project and add **walnutjs** to it:
    ```sh
    mkdir my-app && cd my-app
    npm init -y
    npm i --save walnutjs
    ```
2. Setting up a `walnut-config.js` file inside rootFolder based on [this file](https://github.com/mmendesas/walnutjs-boilerplate/blob/master/walnut-config.json)
3. Create a folder structure like that:
    ```sh
    > my-app
        > test
            > features
                sample.feature
            > step-defs
                custom-steps.js
            > locators
                locators.json
            > params
                params.json
    ```
    > You can create these folders above on your own, just be sure to indicate the correct paths inside `walnut-config.js` file.
4. Add the folowing content to `locators.json` file:
    ```json
    {
        "containers":[
            {
                "name": "GoogleHome",
                "locators":[
                    { "key": "SearchInput", "type": "name", "value": "q" },
                    { "key": "SearchButton", "type": "p:xpath", "value": "//input[@value='{0}']" }
                ]
            }
        ]
    }
    ```
5. Add the following content to `sample.feature` file:
    ```gherkin
    Feature: First test with walnutjs

        @simple_web
        Scenario: I want see the Google Page
            Given user navigates to 'http://www.google.com'
            When user fills 'GoogleHome-SearchInput' by replacing text with 'led zeppelin wikipedia'
            And user clicks on 'GoogleResult-SearchButton'
    ```

6. Before execution check that `selenium webserver` was started correctly. For this sample we will use `webdriver-manager`
    ```sh
    webdriver-manager start
    ...
    10:15:57.230 INFO [SeleniumServer.boot] - Selenium Server is up and running on port 4444
    ```

7. Define a single start script in your `package.json`:
    ```json
     "scripts": {
        "start": "walnut",
      }
    ```
8. Execute your script
    ```sh
    npm start
    ```
    > You can also run using `$(npm bin)/walnut` on your terminal

### More details
> Review this [project boilerplate](https://github.com/mmendesas/walnutjs-test) to get more insights and [this documentation](https://github.com/mmendesas/walnutjs/wiki) to see more details.


## Running the tests

Just run the following command inside the root folder:
  * test: `npm run test`
  * coverage: `npm run coverage`


## Built With

* [nodejs](https://nodejs.org/en/) - A JavaScript runtime
* [cucumber](https://www.npmjs.com/package/cucumber) - tool for running automated tests written in plain language
* [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) - The official Webdriver Javascript bindings from the Selenium project.

## Authors

* **Marcio Mendes** - *Initial work* - [mmendesas](https://github.com/mmendesas)

See also the list of [contributors](https://github.com/mmendesas/walnutjs/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License.
