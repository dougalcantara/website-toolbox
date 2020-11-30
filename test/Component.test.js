import testContainer from './fixtures/testContainer';
import testComponent from './fixtures/testComponent';
import './fixtures/_document';

const component = testComponent(testContainer);
const newMessage = 'Goodbye cruel world!';

test('Component.root', () => {
  const { root } = component;

  expect(root.toString()).toEqual('[object NodeList]');
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
  nodes.willBeQueriedLater = root[0].querySelector('p');
  try {
    nodes.nope = document.querySelector('.some-thing');
  } catch ({ message }) {
    expect(message).toEqual(
      '[website-toolbox]: Nodes must be declared before they are assigned a value in TestComponent.nodes'
    );
  }

  // quietly reject shapes that don't fit the restriction of '' or ['']
  expect(nodes.badInput).toBeNull();
});

test('Component.data', () => {
  const { data, methods } = component;

  // make sure assignment works as expected for typical usage
  expect(data.message).toEqual('Hello world!');
  methods.updateMessage(newMessage);
  expect(data.message).toEqual(newMessage);

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
  const containerUpdated = jest.spyOn(hooks, 'containerUpdated');

  // double check current state
  expect(data.message).toEqual(newMessage);
  // mutate that state
  methods.updateMessage('Episode IV: A New Hope');
  // check that hooks.updated was called
  expect(updated).toHaveBeenCalled();
  // check that hooks.updated was called & was passed the updated piece of data
  expect(updated).toHaveBeenCalledWith(
    'Episode IV: A New Hope', // the next value
    'Goodbye cruel world!', // the previous value
    'message' // the data.key that was updated
  );
});

test('Component.setState', () => {
  const { hooks, container } = component;
  const containerUpdated = jest.spyOn(hooks, 'containerUpdated');
  const setState = jest.spyOn(component, 'setState');
  const setStateCallback = jest.fn();
  const initialState = container.state;

  const newMsg = {
    message: 'From component',
  };

  setState(newMsg, setStateCallback);

  expect(containerUpdated).toHaveBeenCalledWith(
    'From component',
    'Global Message',
    'message'
  );

  const updatedState = {
    ...initialState,
    ...newMsg,
  };

  // ensure other state props weren't tampered w/ when calling setState
  expect(container.state).toStrictEqual(updatedState);
  // setState callback arg should be passed the new version of State
  expect(setStateCallback).toHaveBeenCalledWith(updatedState);
});
