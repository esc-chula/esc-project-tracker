import { defineConfig } from 'tsup';

const tsupConfig = defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  splitting: true,
  dts: true,
  outDir: 'dist',
  outExtension({ format }) {
    return format === 'cjs' ? { js: '.cjs' } : { js: '.mjs' };
  },
});

// eslint-disable-next-line import/no-default-export
export default tsupConfig;
