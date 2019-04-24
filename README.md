# walnutjs

**walnutjs** is a simple collection of generic steps for interact with web elements in _**es6**_ sites.
You only need to write some feature files using the **Gherkin** syntax and plan your tests with **BDD (Behavior Driven Development)** pattern.

Please see our wiki **[DOC](https://github.com/sednemm/walnutjs/wiki)** for more details.


[![Npm version](https://img.shields.io/npm/v/walnutjs.svg?style=flat-square)](https://www.npmjs.com/package/walnutjs)
![License](https://img.shields.io/npm/l/walnutjs.svg?style=flat-square)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)


[![https://nodei.co/npm/walnutjs.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/walnutjs.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/walnutjs)


## Getting Started
These instructions will give you a sample feature file to show you how easy is to make your own tests

### Prerequisites
Before continue, check that you have completed the following requirements:
* [**nodejs**](https://nodejs.org/en/) - A JavaScript runtime
* [**protractor**](https://www.protractortest.org/#/) - end-to-end test framework
* [**webdriver-manager**](https://www.protractortest.org/#/) - helper tool to easily get an instance of a Selenium Server running.

### Running the project
1. Start by creating a simple folder and add **walnutjs** to it:
    ```sh
    mkdir my-app && cd my-app
    npm i --save walnutjs
    ```
2. Setting up a config file for protractor based on [this file](https://github.com/mmendesas/walnutjs-test/blob/master/protractor.conf.js)
3. Create a folder structure like that:
    ```sh
    > my-app
        > test
            > feature
                sample.feature
            > step-defs
                custom-steps.js
            > locators
                locators.json
    ```
4. Add the foloowing content to `locators.json` file: 
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

6. Before execution check that `webdriver-manager` was started correctly
    ```sh
    webdriver-manager start
    ...
    10:15:57.230 INFO [SeleniumServer.boot] - Selenium Server is up and running on port 4444
    ```

7. Execute your script
    ```sh
    protractor protractor.conf.js
    ```
### More details
> Review this [project boilerplate](https://github.com/mmendesas/walnutjs-test) to get more insights and [this documentation](https://github.com/mmendesas/walnutjs/wiki) to see more details.

## Built With

* [nodejs](https://nodejs.org/en/) - A JavaScript runtime
* [protractor](https://www.protractortest.org/#/) - end-to-end test framework
* [cucumber](https://www.npmjs.com/package/cucumber) - tool for running automated tests written in plain language

## Authors

* **Marcio Mendes** - *Initial work* - [mmendesas](https://github.com/mmendesas)

See also the list of [contributors](https://github.com/mmendesas/walnutjs/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License.
