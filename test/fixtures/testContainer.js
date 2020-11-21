import { Container } from '../../src/main';
import testComponent from './testComponent';
import anotherTestComponent from './anotherTestComponent';

const components = [testComponent, anotherTestComponent];
const config = {
  test: 'test',
  state: {
    message: 'Global Message',
    someObject: {
      foo: 'bar',
      baz: 'qux',
    },
  },
};

export default new Container(components, config);
