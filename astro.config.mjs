import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://taylan.co",
  adapter: cloudflare(),
  integrations: [solidJs()],
});
