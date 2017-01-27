var context = require('./context');
var vars = require('./helper/variables')
var stringHelper = require('./helper/string')

// var Hooks = function () {

module.exports = function Hooks() {

    this.registerHandler('BeforeFeature', function (feature, callback) {        
        context.setCurrentFeature(feature);        
        vars.addVariable("feature_name", stringHelper.slugify(feature.getName()));
        // console.log('current feature: ' + feature.getName());        
        callback();
    });

    this.registerHandler('BeforeScenario', function (scenario, callback) {
        context.setCurrentScenario(scenario);
        vars.addVariable("scenario_name", stringHelper.slugify(scenario.getName()));
        // console.log('current scenario: ' + scenario.getName());
        callback();
    });

    this.registerHandler('BeforeStep', function (step, callback) {
        context.setCurrentStep(step);
        vars.addVariable("step_name", stringHelper.slugify(step.getName()));
        // console.log('current step: ' + step.getName());
        callback();
    });
};