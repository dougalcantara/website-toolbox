import testContainer from './fixtures/testContainer';
import testComponent from './fixtures/testComponent';
import anotherTestComponent from './fixtures/anotherTestComponent';

test('Container.components', () => {
  const components = [
    testComponent(testContainer),
    anotherTestComponent(testContainer),
  ];

  expect(testContainer.components).toEqual(expect.arrayContaining(components));
});
