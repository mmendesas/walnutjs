var context = require('./context');
var config = require('./config');
var vars = require('./helper/variables');
var helperString = require('./helper/string');

var Hooks = function () {

    /**
     * Make some action in Before Feature Event
     */
    this.registerHandler('BeforeFeature', function (feature, callback) {
        context.setCurrentFeature(feature);
        vars.addVariable("feature_name", helperString.slugify(feature.getName()));

        //load UIMap and config file
        context.loadUIMap();
        config.loadConfigs();

        callback();
    });

    /**
     * Make some action in Before Step Event
     */
    this.registerHandler('BeforeScenario', function (scenario, callback) {
        context.setCurrentScenario(scenario);
        vars.addVariable("scenario_name", helperString.slugify(scenario.getName()));
        callback();
    });

    /**
     * Make some action in Before Step Event
     */
    this.registerHandler('BeforeStep', function (step, callback) {
        context.setCurrentStep(step);
        vars.addVariable("step_name", helperString.slugify(step.getName()));
        callback();
    });
};

module.exports = Hooks;