import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const outFile = 'dist/@mewui/core/umd/mewui';

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [
    {
      file: `${outFile}.js`,
      name: 'MewUI',
      format: 'umd',
      sourcemap: true,
    },
    {
      file: `${outFile}.min.js`,
      name: 'MewUI',
      format: 'umd',
      sourcemap: true,
      plugins: [
        terser({
          output: {
            comments: false,
          },
        }),
      ],
    },
  ],
};
