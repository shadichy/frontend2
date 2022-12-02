export default {
  dburl: "http://localhost:8080/api/arli",
  
  img_placeholder: "/res/img/placeholder.svg",
  alt_placeholder: "/res/img/alt-placeholder.svg",
  title_holder: "Team Fuho Vietnam",

  langRoutes: ["jp", "en", "cn", "kr", "ru", "fr", "vi", "nom"],
  allowedLanguages: ["vi"],
  defaultLanguage: "vi",

  pages: {
    home: ["index", "info", "gallery", "news", "comm", "dl"],
    shop: ["account", "cart", "checkout", "index", "product", "search"],
    "404": ["404"],
    article: ["article"]
  }
}
