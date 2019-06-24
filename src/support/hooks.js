var config = require('./config');
var vars = require('./helpers/variables');
const string = require('./helpers/string');
var helperCommon = require('./helpers/common');
var flatten = require('./helpers/flattenObject');

const { Before } = require('cucumber')



/**
   * Make some action in Before Step Event
   */
Before((scenario) => {
  vars.addVariable("scenario_name", string.slugify(scenario.getName()));
  vars.addVariable("img_num", "1");

  var folder_default = helperCommon.getTreatedValue("${vars.project_name}|${vars.feature_name}|${vars.scenario_name}");
  vars.addVariable('folder_default', folder_default);

  callback();
});


var Hooks = function () {

  /**
   * Make some action in Before Feature Event
   */
  this.registerHandler('BeforeFeature', function (feature, callback) {
    context.setCurrentFeature(feature);

    //load UIMap and config file
    config.loadConfigs(null);
    context.loadUIMap();
    setVariables(context.loadParamsFile().parameters)
    //load defaults variables
    vars.addVariable("feature_name", string.slugify(feature.getName()));
    vars.addVariable("project_name", string.slugify(config.projectName));

    callback();
  });



  /**
   * Make some action in Before Step Event
   */
  this.registerHandler('BeforeStep', function (step, callback) {
    context.setCurrentStep(step);
    vars.addVariable("step_name", string.slugify(step.getName()));
    callback();
  });
};

module.exports = Hooks;
