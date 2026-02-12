const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Copy-through
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Date filters
  eleventyConfig.addFilter("dateISO", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "Asia/Tokyo" }).toISODate();
  });

  eleventyConfig.addFilter("dateReadable", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "Asia/Tokyo" }).toFormat("yyyy-LL-dd");
  });

  // Diary collection: sorted newest first
  eleventyConfig.addCollection("diary", (collectionApi) => {
    return collectionApi.getFilteredByTag("diary").sort((a, b) => b.date - a.date);
  });

  const isProd = process.env.ELEVENTY_ENV === "production";

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    pathPrefix: isProd ? "/mewmoire/" : "",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
