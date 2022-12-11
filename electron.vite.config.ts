import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import path from "node:path";
import tailwindcss from "tailwindcss";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    publicDir: path.resolve(__dirname, "resources"),
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
  },
  renderer: {
    define: {
      "process.platform": JSON.stringify(process.platform),
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: "./src/renderer/tailwind.config.js",
          }),
        ],
      },
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
    plugins: [react()],
  },
});
