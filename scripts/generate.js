#!/usr/bin/env node

import fetchlang from "./fetchlang.js";
import Defaults from "../src/defaults.js";
import fs from "fs";

const { allowedLanguages, defaultLanguage, pages, specialPages } = Defaults,
	dfLang = defaultLanguage || allowedLanguages[0];

function mkdirNoExist(dir) {
	fs.existsSync(dir) || fs.mkdirSync(dir, { recursive: true });dir
}

/**
 * @param {string} lang
 * @param {string} filepath
 * @param {string} importpath
 * @param {string} name
 */
function genPage(lang, filepath, importpath, name, extra = "", args = "") {
	const page =
		name == "404" ? "NotFound" : name.charAt(0).toUpperCase() + name.slice(1);
	mkdirNoExist(filepath)
	let filename = name
	if (specialPages.indexOf(name) != -1) {
		filename = `${name}/[...${name}]`
		mkdirNoExist(`${filepath}/${name}`);
	}
	fs.writeFileSync(
		`${filepath}/${filename}.astro`,
		`---
import ${page} from "${importpath}/${name}.astro";
${extra}
---
<${page} lang=${lang} ${args}/>
`
	);
}

fetchlang.gen;

Object.entries(pages).forEach(([k, v]) =>
	(([path, spath]) =>
		v.forEach((name) => {
			const extraVars = specialPages.indexOf(name) != -1 ? [`, ${name}`, `${name}ID="${name}"`] : ["",""];
			genPage(
				"{lang}",
				`src/pages/[lang]${path}`,
				`/src/layouts${spath}`,
				name,
				`import Defaults from "/src/defaults"
export function getStaticPaths () {
	return Defaults.langMap
}
const { lang ${extraVars[0]} } = Astro.params`,
			extraVars[1]
			);
			genPage(
        `"${dfLang}"`,
        `src/pages${path}`,
        `/src/layouts${spath}`,
        name,
        specialPages.indexOf(name) != -1
          ? `import Defaults from "/src/defaults"
const { ${name} } = Astro.params`
          : "",
        extraVars[1]
      );
		}))(
		v.length == 1
			? ["", "/paths"]
			: k == "home"
			? ["", "/pages/home"]
			: [`/${k}`, `/pages/${k}`]
	)
);

