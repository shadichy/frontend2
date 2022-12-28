import { defineConfig } from "astro/config";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";
import importPlus from '@astropub/imports'
import { assertPlugin } from '@astropub/assert'

const isPr = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  integrations: isPr ? [compress(), mdx()] : [mdx()],
  vite: {
    plugins: [importPlus()],
  },
});
