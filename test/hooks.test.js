const { expect } = require('chai');
const { Hooks } = require('../src/hooks');

describe('Hooks', () => {
  let hooks;

  beforeEach(() => {
    hooks = new Hooks();
  });

  it('should add and execute an action', () => {
    let actionCalled = false;
    hooks.addAction('test_action', () => {
      actionCalled = true;
    });
    hooks.doAction('test_action');
    expect(actionCalled).to.be.true;
  });

  it('should add and apply a filter', () => {
    hooks.addFilter('test_filter', (value) => {
      return value + ' world';
    });
    const result = hooks.applyFilters('test_filter', 'hello');
    expect(result).to.equal('hello world');
  });

  it('should remove an action', () => {
    let actionCalled = false;
    const action = () => {
      actionCalled = true;
    };
    hooks.addAction('test_action', action);
    hooks.removeAction('test_action', action);
    hooks.doAction('test_action');
    expect(actionCalled).to.be.false;
  });

  it('should remove a filter', () => {
    const filter = (value) => {
      return value + ' world';
    };
    hooks.addFilter('test_filter', filter);
    hooks.removeFilter('test_filter', filter);
    const result = hooks.applyFilters('test_filter', 'hello');
    expect(result).to.equal('hello');
  });

  it('should check if an action is registered', () => {
    const action = () => {};
    hooks.addAction('test_action', action);
    expect(hooks.hasAction('test_action')).to.be.true;
    hooks.removeAction('test_action', action);
    expect(hooks.hasAction('test_action')).to.be.false;
  });

  it('should check if a filter is registered', () => {
    const filter = (value) => value;
    hooks.addFilter('test_filter', filter);
    expect(hooks.hasFilter('test_filter')).to.be.true;
    hooks.removeFilter('test_filter', filter);
    expect(hooks.hasFilter('test_filter')).to.be.false;
  });
});
