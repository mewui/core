import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const outFile = 'dist/@mewui/core/umd/mewui';
const libName = 'MewUI';
const libFormat = 'umd';

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [
    {
      file: `${outFile}.js`,
      name: `${libName}`,
      format: `${libFormat}`,
      sourcemap: true,
    },
    {
      file: `${outFile}.min.js`,
      name: `${libName}`,
      format: `${libFormat}`,
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
