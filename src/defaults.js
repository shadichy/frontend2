const langHeadingPath = (() => {
    try {
      return import.meta.env.PROD;
    } catch (err) {
      return process.env.NODE_ENV === "production";
    }
  })(),
  dburl = "http://localhost:8080/api/arli",
  wpurl = "https://service.teamfuho.net/graphql",
  mgurl =
    "mongodb://127.0.0.1:27017/teamfuho?directConnection=true&serverSelectionTimeoutMS=2000&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true",
  mgdb = "FuhoDB",
  img_placeholder = "/res/img/placeholder.svg",
  alt_placeholder = "/res/img/alt-placeholder.svg",
  title_holder = "Team Fuho Vietnam",
  langRoutes = ["ja", "en", "zh", "ko", "ru", "fr", "vi", "nom"],
  allowedLanguages = ["vi"],
  defaultLanguage = "vi",
  langMap = allowedLanguages.map((lang) => ({ params: { lang: lang } })),
  pages = {
    home: ["index", "info", "gallery", "news", "community", "download"],
    shop: ["account", "cart", "checkout", "index", "product", "search"],
    404: ["404"],
    article: ["article"],
    image: ["image"],
  },
  specialPages = ["article", "image"];

export default {
	langHeadingPath,
	dburl,
	wpurl,
	mgurl,
	mgdb,
	img_placeholder,
	alt_placeholder,
	title_holder,
	langRoutes,
	allowedLanguages,
	defaultLanguage,
	langMap,
	pages,
	specialPages,
};
