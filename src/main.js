import Component from './Component';

function Container(components = [], config = {}) {
  this.config = config;
  this.components = components.map((component) => component(this));

  return () => this;
}

export { Component, Container };
