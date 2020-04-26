const { component, fromTemplate, render } = require('../src/index');

test('Public API', () => {
  expect(component).toBeDefined();
  expect(fromTemplate).toBeDefined();
  expect(render).toBeDefined();
});
