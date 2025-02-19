import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
  },
  plugins: [preact(), tailwindcss()],
  base: "/rubiks",
  server: {
    hmr: {
      overlay: true,
    },
  },
});
