var context = require('./context');
var vars = require('./helper/variables');
var helperString = require('./helper/string');


// var Hooks = function () {

var Hooks = function(){

    this.registerHandler('BeforeFeature', function (feature, callback) {
        context.setCurrentFeature(feature);
        vars.addVariable("feature_name", helperString.slugify(feature.getName()));
        context.loadUIMap();
        callback();
    });

    this.registerHandler('BeforeScenario', function (scenario, callback) {
        context.setCurrentScenario(scenario);
        vars.addVariable("scenario_name", helperString.slugify(scenario.getName()));
        callback();
    });

    this.registerHandler('BeforeStep', function (step, callback) {
        context.setCurrentStep(step);
        vars.addVariable("step_name", helperString.slugify(step.getName()));
        callback();
    });
};

module.exports = Hooks;