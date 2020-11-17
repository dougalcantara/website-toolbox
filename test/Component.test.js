import Component from '../src/main';

document.body.innerHTML = /*html*/ `
  <div class="unrelated-component">
    <p>Something distracting</p>
  </div>
  <div class="test-component">
    <h1 class="headline">Headline</h1>
    <button class="button" type="submit">Submit</button>
    <button class="button" type="reset">Cancel</button>
  </div>
`;

const component = new Component({
  name: 'TestComponent',
  root: '.test-component',
  nodes: {
    headline: '.headline', // querySelector
    buttons: ['.button'], // querySelectorAll
    elementNotInScope: '.unrelated-component', // will be `null`, since you can't query outside of the root element
    // will be null
    moreBadInput: 42,
    // also null
    badInput: {
      foo: 'bar',
      baz: 'qux',
    },
  },
  data: {
    message: 'Hello world!',
  },
  hooks: {
    setup() {
      // The component is available as `this`, similar to VueJS
      this.methods.attachEventListeners();
    },
    updated(data) {},
  },
  methods: {
    attachEventListeners() {
      const submitButton = this.nodes.buttons[0];

      submitButton.addEventListener('click', this.methods.handleSubmit);
    },
    handleSubmit(e) {
      // handle a click, form submission, resize, etc
    },
    // can assign data from inside methods
    updateMessage(newMsg) {
      this.data.message = newMsg;
    },
    // can't update something that hasn't been declared
    assignUndeclaredData(prop, val) {
      // TypeError: 'set' on proxy: trap returned falsish for property ${prop}
      this.data[prop] = val;
    },
  },
});

const testComponent = component();
const newMessage = 'Goodbye cruel world!';

test('Component.root', () => {
  const { root } = testComponent;

  expect(root.toString()).toEqual('[object HTMLDivElement]');
});

test('Component.nodes', () => {
  const { nodes } = testComponent;
  // querySelector
  expect(nodes.headline.toString()).toEqual('[object HTMLHeadingElement]');
  // querySelectorAll
  expect(nodes.buttons.toString()).toEqual('[object NodeList]');
  // can't query for elements outside of root
  expect(nodes.elementNotInScope).toBeNull();
  // bad config
  expect(nodes.badInput).toBeNull();
});

test('Component.data', () => {
  const { data, methods } = testComponent;

  // make sure assignment works as expected for typical usage
  expect(data.message).toEqual('Hello world!');
  methods.updateMessage(newMessage);
  expect(data.message).toEqual(newMessage);

  // accessing an undeclared var results in an error
  try {
    data.skunk;
  } catch ({ message }) {
    expect(message).toEqual(
      '[website-toolbox]: property skunk does not exist on Component.data'
    );
  }

  // prevent assignment to an undeclared data.property
  try {
    methods.assignUndeclaredData('skunk', 'stinky');
  } catch ({ message }) {
    expect(message).toEqual(
      '[website-toolbox]: Cannot assign a value to an undeclared data property'
    );
  }
});

test('Component.lifecycle', () => {
  const { hooks, methods, data } = testComponent;
  const updated = jest.spyOn(hooks, 'updated');

  // double check current state
  expect(data.message).toEqual(newMessage);
  // mutate that state
  methods.updateMessage('Episode IV: A New Hope');
  // check that hooks.updated was called
  expect(updated).toHaveBeenCalledTimes(1);
  // check that hooks.updated was called & was passed the updated piece of data
  expect(updated).toHaveBeenCalledWith({ message: 'Episode IV: A New Hope' });
});
