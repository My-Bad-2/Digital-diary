import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  base: './'
});
