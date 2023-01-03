const langHeadingPath = (() => {
    try {
      return import.meta.env.PROD;
    } catch (err) {
      return process.env.NODE_ENV === "production";
    }
  })(),
  langRoutes = ["vi"],
  allowedLanguages = ["vi"],
  defaultLanguage = "vi"

export default {
	langHeadingPath,
	langRoutes,
	allowedLanguages,
	defaultLanguage,
};
