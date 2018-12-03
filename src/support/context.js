var helperFile = require('./helper/file');
var config = require('./config');
var fs = require('fs');

var context = {

    currentFeature: null,

    currentScenario: null,

    currentStep: null,

    locators: null,

    parameters: null,

    getCurrentFeature: function () {
        return this.currentFeature;
    },

    setCurrentFeature: function (feature) {
        this.currentFeature = feature;
        return this;
    },

    getCurrentScenario: function () {
        return this.currentScenario;
    },

    setCurrentScenario: function (scenario) {
        this.currentScenario = scenario;
        return this;
    },

    getCurrentStep: function () {
        return this.currentStep;
    },

    setCurrentStep: function (step) {
        this.currentStep = step;
        return this;
    },

    getLocators: function () {
        return this.locators;
    },

    setLocators: function (loc) {
        this.locators = loc;
        return this;
    },

    /**
     * Load the locators file
     */
    loadUIMap: function () {
        const folder = config.locatorsPath;
        let content = { containers: [] };

        fs.readdirSync(folder).forEach(file => {
            try {
                const fileJson = helperFile.readContentFromFile(`${folder}/${file}`);
                content.containers = content.containers.concat(JSON.parse(fileJson).containers);
            } catch (err) {
                const message = `Error in locators: ${folder}/${file}. You need to inform correct structure of locator file.`;
                console.log(message);
            }
        });

        this.locators = content;
        return this;
    },

    /**
     * Load a fake ui map for unittests
     */
    loadFakeUIMap: function () {
        var content = '{"containers":[{"name":"locAA","locators":[{"key":"key001","type":"type001","value":"value001"},{"key":"key002","type":"type002","value":"value002"},{"key":"key003","type":"type003","value":"value003"}]},{"name":"locBB","locators":[{"key":"key001","type":"type001","value":"value 00 1"},{"key":"key002","type":"type002","value":"value002"}]}]}';
        this.locators = JSON.parse(content);
        return this;
    },

    /**
     * Load the parameters file
     */
    loadParamsFile: function () {
        if (config.parametersPath !== '') {
            const fileContent = helperFile.readContentFromFile(config.parametersPath);
            this.parameters = JSON.parse(fileContent);            
        }
        return this;
    },
};

module.exports = context;