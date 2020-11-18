import testContainer from './fixtures/testContainer';
import testComponent from './fixtures/testComponent';
import anotherTestComponent from './fixtures/anotherTestComponent';

const container = testContainer();

test('Container.components', () => {
  const components = [
    testComponent(container),
    anotherTestComponent(container),
  ];

  expect(container.components).toEqual(expect.arrayContaining(components));
});
