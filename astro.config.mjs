import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import importPlus from '@astropub/imports'
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	integrations: [mdx()],
	vite: {
		plugins: [importPlus()],
	},
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
});
