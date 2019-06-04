
const fs = require('fs-plus');
const path = require('path');
const cucumber = require('cucumber');
const program = require('commander');
const { version, description } = require('../package.json');

// set default configuration
const config = {
  cucumber: {
    steps: './steps',
    timeout: 15000,
    features: '/Users/mmendesas/Documents/mdocs/walnutjs/example/features/sample.feature',
  },
  selenium: {
    browser: 'chrome',
    browserTeardownStrategy: 'always',
    remoteURL: 'http://localhost:4444/wd/hub',
    caps: {
      browserName: 'chrome',
      chromeOptions: {
        // args: ['--headless', '--disable-gpu'] //headless
        args: ['start-maximized', 'disable-extensions']
      },
    }
  },
  reports: './reports',
  noScreenshot: false,
  locatorsPath: '/Users/mmendesas/Documents/mdocs/walnutjs/example/locators'
};

// start the CLI options
program
  .version(version)
  .description(description)
  .option('-c, --config <path>', 'path to JSON config file')
  .parse(process.argv);

// read config from file
const configFileName = path.resolve(process.cwd(), 'walnutjs.json');
const configPath = program.config || configFileName

if (fs.isFileSync(configPath)) {
  config = Object.assign(config, require(configPath));
}

// set config globally
global['config'] = config;

// browser name globally
global.browser = config.selenium.browser;
global.browserTeardownStrategy = config.selenium.browserTeardownStrategy;

// used within world.js to output reports
global.reportsPath = path.resolve(config.reports);
if (!fs.existsSync(config.reports)) {
  fs.makeTreeSync(config.reports);
}

// set the default timeout
global.DEFAULT_TIMEOUT = global.DEFAULT_TIMEOUT || config.cucumber.timeout;

// rewrite command line switches for cucumber
process.argv.splice(2, 100);

// add switch to tell cucumber to produce json report files
process.argv.push('-f');
process.argv.push('pretty');
process.argv.push('-f');
process.argv.push('json:' + path.resolve(__dirname, global.reportsPath, 'cucumber-report.json'));

// add cucumber world as first required script (this sets up the globals)
process.argv.push('-r');
process.argv.push(path.resolve(__dirname, './support/world.js'));

process.argv.push('-r');
process.argv.push(path.resolve(__dirname, './step_defs'));

// // add path to import custom step definitions
// process.argv.push('-r');
// process.argv.push(path.resolve(config.steps));

// add strict option (fail if there are any undefined or pending steps)
process.argv.push('-S');
process.argv.push(config.cucumber.features)

// console.log('my-args: ', process.argv)

//
// execute cucumber
//
var cucumberCli = cucumber.Cli(process.argv);
global.cucumber = cucumber;

cucumberCli.run(function (succeeded) {

  var code = succeeded ? 0 : 1;

  function exitNow() {
    process.exit(code);
  }

  if (process.stdout.write('')) {
    exitNow();
  }
  else {
    // write() returned false, kernel buffer is not empty yet...
    process.stdout.on('drain', exitNow);
  }
});
