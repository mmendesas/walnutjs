var context = require('./context');
var config = require('./config');
var vars = require('./helper/variables');
var helperString = require('./helper/string');
var helperCommon = require('./helper/common');

const clearEnvVariable = text => text.replace("${", "").replace("}", "")
const getEnvVariable = variable => process.env[clearEnvVariable(variable)] || ''
const setVariables = parameters => {
    Object.keys(parameters).forEach((key) => {
        let text = parameters[key];
        if (parameters[key] instanceof Object) {
            // recursive iteration for look at child nodes
            setVariables(parameters[key]);
        } else {
            let regExp = /\$\{([^${}]+)\}/g;
            var matches = text.match(regExp) || [];
            // add vars if they exist
            if (matches.length > 0) {
                matches.forEach(envVariable => text = text.replace(envVariable, getEnvVariable(envVariable)))
                vars.addVariable(key, text)
            }
        }
    });
}

var Hooks = function () {

    /**
     * Make some action in Before Feature Event
     */
    this.registerHandler('BeforeFeature', function (feature, callback) {
        context.setCurrentFeature(feature);

        //load UIMap and config file
        config.loadConfigs();
        context.loadUIMap();
        setVariables(context.loadParamsFile().parameters)
        //load defaults variables
        vars.addVariable("feature_name", helperString.slugify(feature.getName()));
        vars.addVariable("project_name", helperString.slugify(config.projectName));

        callback();
    });

    /**
     * Make some action in Before Step Event
     */
    this.registerHandler('BeforeScenario', function (scenario, callback) {
        context.setCurrentScenario(scenario);
        vars.addVariable("scenario_name", helperString.slugify(scenario.getName()));
        vars.addVariable("img_num", "1");

        var folder_default = helperCommon.getTreatedValue("${vars.project_name}|${vars.feature_name}|${vars.scenario_name}");
        vars.addVariable('folder_default', folder_default);

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