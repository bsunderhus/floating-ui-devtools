import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/lib.tsx',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    outDir: 'lib',
  },
  publicDir: false,
  plugins: [
    dts({
      tsconfigPath: 'tsconfig.lib.json',
      rollupTypes: true,
    }),
  ],
});
