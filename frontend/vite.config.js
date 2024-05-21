import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_redirects",
          dest: ".",
        },
      ],
    }),
  ],
  server: {
    proxy: {
      "/api/": "https://agayu.onrender.com",
      "/uploads/": "https://agayu.onrender.com",
    },
  },
});
