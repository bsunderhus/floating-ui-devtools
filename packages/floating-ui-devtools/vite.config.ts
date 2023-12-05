import packageJSON from './package.json';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'umd', 'cjs'],
      fileName: packageJSON.name,
      name: packageJSON.name,
    },
    outDir: 'dist',
    copyPublicDir: false,
  },
  plugins: [dts({ rollupTypes: true })],
});
