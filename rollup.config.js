import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/main.js',
  output: {
    file: 'build/website-toolbox.js',
    name: 'website-toolbox',
    format: 'umd',
  },
  plugins: [
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
    uglify(),
  ],
};
