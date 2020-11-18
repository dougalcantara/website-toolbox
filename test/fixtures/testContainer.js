import { Container } from '../../src/main';
import testComponent from './testComponent';
import anotherTestComponent from './anotherTestComponent';

const components = [testComponent, anotherTestComponent];
const config = {
  test: 'test',
};

export default new Container(components, config);
