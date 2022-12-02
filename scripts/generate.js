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
function genPage(lang, filepath, importpath, name) {
  const page =
    name == "404" ? "NotFound" : name.charAt(0).toUpperCase() + name.slice(1);
  if (!fs.existsSync(filepath))
    fs.mkdirSync(filepath, { recursive: true });
  fs.writeFileSync(
    `${filepath}/${name}.astro`,
    `---
import ${page} from "${importpath}/${name}.astro";
---
<${page} lang="${lang}" />
`
  );
}

fetchlang.gen;

allowedLanguages.forEach((lang) =>
  ((langpath) =>
    Object.entries(pages).forEach(([k, v]) =>
      (([path, gap]) =>
        v.forEach((n) =>
          genPage(
            lang,
            `${langpath}/${path}`,
            `../${gap}../layouts/pages/${k}`,
            n
          )
        ))(v.length != 1 && k != "home" ? [`${k}`, "../"] : ["", ""])
    ))(`src/pages/${lang}`)
);

{
  Object.entries(pages).forEach(([k, v]) =>
    ((path) =>
      v.forEach((n) =>
        genPage(dfLang, `src/pages/${path}`, `../layouts/pages/${k}`, n)
      ))(v.length == 1 || k == "home" ? "" : `${k}/`)
  );

  const dir = `src/pages/article/`;
  fs.readdirSync(`${dir}/${dfLang}`).forEach((file) =>
    fs.writeFileSync(
      dir + file,
      fs
        .readFileSync(`${dir}/${dfLang}/${file}`)
        .toString()
        .replace(
          "'../../../layouts/paths/article.astro'",
          "'../../layouts/paths/article.astro'"
        )
    )
  );
}
