import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "bibliographile",
  version: "0.1.0",
  key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnyzpRrYuhwScmvNQExl9hBOQdGGWuWzqukLG3vUZa2I9c37XyT5cWaHDiOWPcwV6mrz50PCYsR2YFTG8IMOLRfciKh9PMd7yjX0j+jZKJF7GKYyb5Dt7AcpWOFv5mtAxL+OWXpcIDFUoRg+2Gg7TvTIAN8AdGXd0K+Vt3/eJeroDi9kHAzDvdyWWcIlHkyKP9NOSXPENuRaFeIkCOvp4oQ94Y7EqONPX9n5YnU8E7MOwpfqvj8fV7wZ+oUuf8w/kjUMPTCv8FfTMH4mUxfHDXQws9FjlITXpraQ7+lJUta4gLqSmZMXBOjd/DHiaxjJ9/URQwLLdWr54PSjkOxuEoQIDAQAB",
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
