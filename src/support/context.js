'use strict'

module.exports = function Context() {

    return {

        currentFeature: null,

        currentScenario: null,

        currentStep: null,

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
        }
    };
} ();