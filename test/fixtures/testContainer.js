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
  mixins: {
    // very contrived custom hook implementation
    countResizes() {
      this.state.resizeCount = 0;

      this.hooks.countResizes = () => {
        this.setState({
          resizeCount: this.state.resizeCount++,
        });
      };

      window.addEventListener('resize', this.hooks.countResizes);
    },
  },
};

export default new Container(components, config);
