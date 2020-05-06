import typescript from '@rollup/plugin-typescript';

const outDir = 'dist';

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [
    {
      name: 'MewUI',
      dir: `${outDir}/@mewui/core/umd`,
      format: 'umd',
      sourcemap: true,
    },
  ],
};
