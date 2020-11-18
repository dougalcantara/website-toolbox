import { Component } from '../../src/main';
import './_document';

const anotherTestComponent = new Component({
  name: 'AnotherTestComponent',
  root: '.another-test-component',
  nodes: {
    logo: '.logo',
    triggers: ['.button'],
  },
  hooks: {},
  methods: {},
});

export default anotherTestComponent;
