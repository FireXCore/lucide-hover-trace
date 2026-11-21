import { defineConfig } from "vite";
export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rolldownOptions: {
      external: ["react", "react/jsx-runtime", "lucide-react"],
    },
  },
});
