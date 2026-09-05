import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  base: './',
  plugins: [vanillaExtractPlugin()],
});
