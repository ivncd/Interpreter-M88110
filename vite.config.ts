import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src',
  base: '/Interpreter-M88110/',
  resolve: {
    alias: {
      '/ace': path.resolve(__dirname, 'node_modules/ace-builds/src-noconflict')
    }
  }
});