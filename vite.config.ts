import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
  },
  plugins: [preact()],
  base: "/rubiks/",
  server: {
    hmr: {
      overlay: true,
    },
  },
});
