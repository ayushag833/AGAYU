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
      "/api/": "https://agayu.onrender.com",
      "/uploads/": "https://agayu.onrender.com",
    },
  },
});
