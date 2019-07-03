/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs-plus');
const path = require('path');
const Cucumber = require('cucumber');
const program = require('commander');
const { version, description } = require('../package.json');
const logger = require('../src/support/helpers/logger');

// set default configuration
let config = {
  walnut: {
    name: 'walnut sample automation',
    enableDebug: false,
    reports: './reports',
    noScreenshot: false,
    paths: {
      locators: './example/locators',
      evidences: './example/photos',
      parameters: './example/params/my-params.json',
    },
  },
  cucumber: {
    steps: './steps',
    timeout: 15000,
    features: './example/features/sample.feature',
    outputFormat: 'summary',
  },
  selenium: {
    browser: 'chrome',
    browserTeardownStrategy: 'always',
    remoteURL: 'http://localhost:4444/wd/hub',
    caps: {
      browserName: 'chrome',
      chromeOptions: {
        // args: ['--headless', '--disable-gpu'] //headless
        args: ['start-maximized', 'disable-extensions'],
      },
    },
  },
};

const collectPaths = (value, paths) => {
  paths.push(value);
  return paths;
};

// start the CLI options
program
  .version(version)
  .description(description)
  .option('-c, --config <path>', 'path to JSON config file')
  .option('-t, --tags <tagName>', 'name of tag to run', collectPaths, [])
  .parse(process.argv);

// read config from file
const configFileName = path.resolve(process.cwd(), 'walnut-config.json');
const configPath = program.config || configFileName;

if (fs.isFileSync(configPath)) {
  config = Object.assign(config, require(configPath));
}

// set config globally
global.config = config;

// browser name globally
global.browser = config.selenium.browser;
global.browserTeardownStrategy = config.selenium.browserTeardownStrategy;

// used within world.js to output reports
global.reportsPath = path.resolve(config.walnut.reports);
if (!fs.existsSync(config.walnut.reports)) {
  fs.makeTreeSync(config.walnut.reports);
}

// set the default timeout
global.DEFAULT_TIMEOUT = global.DEFAULT_TIMEOUT || config.cucumber.timeout;

// rewrite command line switches for cucumber
process.argv.splice(2, 100);

// 1 define cucumber output format
// add switch to tell cucumber to produce json report files
process.argv.push('-f');
process.argv.push(config.cucumber.outputFormat || 'summary');
process.argv.push('-f');
process.argv.push(`json:${path.resolve(__dirname, global.reportsPath, 'cucumber-report.json')}`);

// 2 define the required scripts
// add cucumber world as first required script (this sets up the globals)

process.argv.push('-r');
process.argv.push(path.resolve(__dirname, './support/world.js'));

process.argv.push('-r');
process.argv.push(path.resolve(__dirname, './step_defs'));

// add path to import custom step definitions
process.argv.push('-r');
process.argv.push(path.resolve(config.cucumber.steps));

// process.argv.push(path.resolve(__dirname, '../example/features/**/*.feature'));
// add path to import custom features
process.argv.push(config.cucumber.features);

// add tag
if (program.tags) {
  program.tags.forEach((tag) => {
    process.argv.push('-t');
    process.argv.push(tag);
  });
}

// console.log('my-args: ', process.argv)

//
// execute cucumber
//
const cucumberInfo = {
  argv: process.argv,
  cwd: process.cwd(),
  stdout: process.stdout,
};

const cucumberCli = new Cucumber.Cli(cucumberInfo);

cucumberCli.run()
  .then((succeeded) => {
    const code = succeeded.success ? 0 : 1;
    const exitNow = () => {
      process.exit(code);
    };

    if (process.stdout.write('')) {
      exitNow();
    } else {
      // write() returned false, kernel buffer is not empty yet...
      process.stdout.on('drain', exitNow);
    }
  })
  .catch((error) => {
    logger.error(`\n${error.stack}`);
  });
