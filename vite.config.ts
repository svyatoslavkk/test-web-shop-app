import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/main.tsx",
      name: "ShopApp",
      fileName: (format) => `app.${format}.js`,
      formats: ["umd"],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  define: {
    global: "globalThis",
    "process.env": {},
  },
});
