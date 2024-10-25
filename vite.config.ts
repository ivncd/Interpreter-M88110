import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src',
  base: '/Interpreter-M88110/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '/ace': path.resolve(__dirname, 'node_modules/ace-builds/src-noconflict')
    }
  }
});