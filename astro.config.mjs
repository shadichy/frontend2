import { defineConfig } from "astro/config";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";
import importPlus from '@astropub/imports'
import node from "@astrojs/node";
import rollup from "astro-rollup"

const isPr = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
	integrations: isPr ? [mdx(), 
		rollup(), 
		compress({
			js: {
				ecma: 2020,
				mangle: true,
				keep_fnames: false,
				keep_classnames: false,
				compress: {
					drop_console: true,
				}
			}
		})
	] : [mdx()],
	vite: {
		plugins: [importPlus()],
	},
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
});
