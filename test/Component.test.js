import testComponent from './fixtures/testComponent';
import testContainer from './fixtures/testContainer';
import './fixtures/_document';

const component = testComponent(testContainer);
const newMessage = 'Goodbye cruel world!';

test('Component.root', () => {
  const { root } = component;

  expect(root.toString()).toEqual('[object HTMLDivElement]');
});

test('Component.nodes', () => {
  const { root, nodes } = component;
  // querySelector
  expect(nodes.headline.toString()).toEqual('[object HTMLHeadingElement]');
  // querySelectorAll
  expect(nodes.buttons.toString()).toEqual('[object NodeList]');
  // can't query for elements outside of root
  expect(nodes.elementNotInScope).toBeNull();

  // allow for nodes to be initialized as '', hinting that they'll be queried later
  nodes.willBeQueriedLater = root.querySelector('p');
  try {
    nodes.nope = document.querySelector('.some-thing');
  } catch ({ message }) {
    expect(message).toEqual(
      '[website-toolbox]: Nodes must be declared before they are assigned a value in TestComponent.nodes'
    );
  }

  // quietly reject shapes that don't fit the restriction of '' or []
  expect(nodes.badInput).toBeNull();
});

test('Component.data', () => {
  const { data, methods } = component;

  // make sure assignment works as expected for typical usage
  expect(data.message).toEqual('Hello world!');
  methods.updateMessage(newMessage);
  expect(data.message).toEqual(newMessage);

  // accessing an undeclared var results in an error
  try {
    data.skunk;
  } catch ({ message }) {
    expect(message).toEqual(
      '[website-toolbox]: property skunk does not exist on TestComponent.data'
    );
  }

  // prevent assignment to an undeclared data.property
  try {
    methods.assignUndeclaredData('skunk', 'stinky');
  } catch ({ message }) {
    expect(message).toEqual(
      '[website-toolbox]: Cannot assign a value to an undeclared property in TestComponent.data'
    );
  }
});

test('Component.lifecycle', () => {
  const { hooks, methods, data } = component;
  const updated = jest.spyOn(hooks, 'updated');

  // double check current state
  expect(data.message).toEqual(newMessage);
  // mutate that state
  methods.updateMessage('Episode IV: A New Hope');
  // check that hooks.updated was called
  expect(updated).toHaveBeenCalledTimes(1);
  // check that hooks.updated was called & was passed the updated piece of data
  expect(updated).toHaveBeenCalledWith(
    'Episode IV: A New Hope', // the next value
    'Goodbye cruel world!', // the previous value
    'message' // the data.key that was updated
  );
});
