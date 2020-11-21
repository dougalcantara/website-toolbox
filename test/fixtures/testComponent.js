import { Component } from '../../src/main';
import './_document';

const testComponent = new Component({
  name: 'TestComponent',
  root: '.test-component',
  nodes: {
    headline: '.headline', // querySelector
    buttons: ['.button'], // querySelectorAll
    elementNotInScope: '.unrelated-component', // will be `null`, since you can't query outside of the root element
    willBeQueriedLater: '', // allow for dynamic DOM entries & similar stuff to get queried later
    // will be `null`
    badInput: {
      foo: 'bar',
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
    updated(next, prev, prop) {},
    containerUpdated(next, prev, prop) {},
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

export default testComponent;
