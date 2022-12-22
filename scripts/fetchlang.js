import crowdin from "@crowdin/ota-client";
import fs from "fs";
import Defaults from "../src/defaults.js";
import axios from "axios";

const { pages } = Defaults,
	ohash = "0ec83da22715d54901879a8yk35",
	lf = "src/lang.json",
	{ timestamp, content } = (() => {
		try {
			return JSON.parse(fs.readFileSync(lf).toString());
		} catch (err) {
			return { timestamp: 0, content: {} };
		}
	})();

/**
 * @param {{ [s: string]: Object; } } obj
 */
function genFiles(obj) {
	Object.entries(obj).forEach(([key, value]) =>
		((langdir) => {
			fs.mkdirSync(langdir, { recursive: true });
			Object.entries(pages).forEach(([k, v]) =>
				v.length == 1 ? undefined : fs.mkdirSync(`${langdir}/${k}`)
			);
			value.forEach(({ content, file }) =>
				((filebase) =>
					fs.writeFileSync(
						`${langdir}${
							pages[filebase] || filebase == "glob" ? "" : "/home"
						}${file}`,
						JSON.stringify(content)
					))(file.substring(1, file.indexOf(".")))
			);
		})(`src/layouts/lang/${key.split("-")[0]}`)
	);
}

/**
 * @param {any} err
 */
function fallback(err) {
	console.log(err);
	console.log("W: Failed, reverting...");
	if (!fs.existsSync("src/layouts/lang"))
		if (fs.existsSync(lf)) genFiles(content);
		else console.error("E: Error no language file found!");
}

export default {
	gen: axios
		.create()
		.get(`https://distributions.crowdin.net/${ohash}/manifest.json`, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4758.11 Safari/537.36",
				Accept: "application/json, text/plain, */*",
			},
		})
		.then((res) => {
			console.log("I: Fetching translations...");
			if (timestamp < res.data.timestamp) {
				// @ts-ignore
				new crowdin.default(ohash, {
					disableManifestCache: false,
					disableStringsCache: false,
					disableJsonDeepMerge: false,
				})
					.getTranslations()
					.then((/** @type {{ [s: string]: any; }} */ trans) => {
						fs.writeFileSync(
							lf,
							JSON.stringify({ timestamp: res.data.timestamp, content: trans })
						);
						genFiles(trans);
					})
					.catch(fallback);
			}
		})
		.catch(fallback),
};
