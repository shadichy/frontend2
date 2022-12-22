#!/usr/bin/env node

import fetchlang from "./fetchlang.js";
import Defaults from "../src/defaults.js";
import fs from "fs";

const { allowedLanguages, defaultLanguage, pages } = Defaults,
	dfLang = defaultLanguage || allowedLanguages[0];

/**
 * @param {string} lang
 * @param {string} filepath
 * @param {string} importpath
 * @param {string} name
 */
function genPage(lang, filepath, importpath, name, extra = "") {
	const page =
		name == "404" ? "NotFound" : name.charAt(0).toUpperCase() + name.slice(1);
	fs.existsSync(filepath) || fs.mkdirSync(filepath, { recursive: true });
	fs.writeFileSync(
		`${filepath}/${name}.astro`,
		`---
import ${page} from "${importpath}/${name}.astro";
${extra}
---
<${page} lang=${lang} />
`
	);
}

fetchlang.gen;

Object.entries(pages).forEach(([k, v]) =>
	k == "article"
		? ((src, dst) => {
				fs.mkdirSync(dst, { recursive: true });
				fs.readdirSync(src).forEach((file) =>
					fs.copyFileSync(`${src}/${file}`, `${dst}/${file}`)
				);
			})(`src/pages/${dfLang}/${k}`, "src/pages/article")
		: (([path, spath]) =>
				v.forEach((name) => {
					genPage(
						"{lang}",
						`src/pages/[lang]${path}`,
						`/src/layouts${spath}`,
						name,
						`import Defaults from "/src/defaults"
export function getStaticPaths () {
	return Defaults.langMap
}
const { lang } = Astro.params`
					);
					genPage(
						`"${dfLang}"`,
						`src/pages${path}`,
						`/src/layouts${spath}`,
						name
					);
				}))(
				v.length == 1
					? ["", "/paths", ""]
					: k == "home"
					? ["", "/pages/home", ""]
					: [`/${k}`, `/pages/${k}`, "../"]
			)
);

