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

test('Container.hooks', () => {
  const { hooks } = testContainer;
  const updated = jest.spyOn(hooks, 'updated');
  const setState = jest.spyOn(testContainer, 'setState');
  const setStateCallback = jest.fn();
  const initialState = testContainer.state;

  const newMsg = {
    message: 'From container',
  };

  setState(newMsg, setStateCallback);

  expect(updated).toHaveBeenCalledWith(
    'From container', // next value
    'Global Message', // prev value
    'message' // eg: this.state.message
  );

  const updatedState = {
    ...initialState,
    ...newMsg,
  };

  // ensure other state props weren't tampered w/ when calling setState
  expect(testContainer.state).toStrictEqual(updatedState);
  // setState callback arg should be passed the new version of State
  expect(setStateCallback).toHaveBeenCalledWith(updatedState);
});
