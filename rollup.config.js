import babel from '@rollup/plugin-babel';

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'build/index.js',
      name: 'compass',
      format: 'es',
    },
    plugins: [babel({ babelHelpers: 'bundled' })],
  },
  {
    input: 'test/index.js',
    output: {
      file: 'build/test.js',
      name: 'test',
      format: 'umd',
    },
    plugins: [babel({ babelHelpers: 'bundled' })],
  },
];
