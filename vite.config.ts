// vite.config.js
import { ghPages } from 'vite-plugin-gh-pages';

/** @type {import('vite').UserConfig} */
export default {
  base: '/safia-landing/',
  plugins: [ghPages()],
};
