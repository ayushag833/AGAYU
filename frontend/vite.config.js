import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
    plugins: [react()],
  },
  server: {
    proxy: {
      "/api/": "http://localhost:8000",
      "/uploads/": "http://localhost:8000",
    },
  },
});
