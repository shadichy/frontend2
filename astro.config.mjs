import { defineConfig } from "astro/config";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";
import importPlus from '@astropub/imports'
import node from "@astrojs/node";

const isPr = import.meta.env.PROD || process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  integrations: isPr ? [compress(), mdx()] : [mdx()],
  vite: {
    plugins: [importPlus()],
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
