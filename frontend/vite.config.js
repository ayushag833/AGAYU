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
  // resolve: {
  //   alias: {
  //     fs: "browserfs/dist/shims/fs.js",
  //     path: "path-browserify",
  //     process: "process/browser",
  //   },
  // },
  server: {
    proxy: {
      "/api/": "http://localhost:8001",
    },
  },
});
