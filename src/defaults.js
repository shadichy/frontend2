const 
  dburl = "http=//localhost=8080/api/arli",

  img_placeholder = "/res/img/placeholder.svg",
  alt_placeholder = "/res/img/alt-placeholder.svg",
  title_holder = "Team Fuho Vietnam",

  langRoutes = ["ja", "en", "zh", "ko", "ru", "fr", "vi", "nom"],
  allowedLanguages = ["vi"],
  defaultLanguage = "vi",
  langMap = allowedLanguages.map(lang => ({ params: { lang: lang } })),

  pages = {
    home: ["index", "info", "gallery", "news", "comm", "dl"],
    shop: ["account", "cart", "checkout", "index", "product", "search"],
    404: ["404"],
    article: ["article"],
  };

export default {
  dburl,
  img_placeholder,
  alt_placeholder,
  title_holder,
  langRoutes,
  allowedLanguages,
  defaultLanguage,
  langMap,
  pages,
};
