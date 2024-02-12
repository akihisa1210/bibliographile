import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "bibliographile",
  version: "0.1.0",
  permissions: ["contextMenus", "tabs"],
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  host_permissions: ["<all_urls>"],
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.tsx"],
    },
  ],
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
