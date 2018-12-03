var context = require('./context');

describe('Context Tests', () => {
  it('should set current feature', () => {
    context.setCurrentFeature('my feature');
    expect(context.getCurrentFeature()).toEqual('my feature');
  });

  it('should set current scenario ', () => {
    context.setCurrentScenario('my scenario');
    expect(context.getCurrentScenario()).toEqual('my scenario');
  });

  it('should set current step', () => {
    context.setCurrentStep('my step');
    expect(context.getCurrentStep()).toEqual('my step');
  });

  it('should load UIMap', () => {
    context.loadUIMap();
    expect(context.getCurrentStep()).toEqual('my step');
  });
});
