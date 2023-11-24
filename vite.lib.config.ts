import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/lib/index.ts',
      formats: ['es', 'umd', 'cjs'],
      fileName: 'floating-ui-devtools',
      name: 'floating-ui',
    },
    outDir: 'lib',
    copyPublicDir: false,
  },
  plugins: [dts({ rollupTypes: true, tsconfigPath: 'tsconfig.lib.json' })],
});
