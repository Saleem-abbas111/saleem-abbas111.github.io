import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: if this repo is deployed at https://<user>.github.io/<repo>/
// (i.e. NOT a "<user>.github.io" root repo), set base to "/<repo>/".
// If it IS the root "<user>.github.io" repo, keep base as "/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});
