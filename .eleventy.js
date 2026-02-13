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

  eleventyConfig.addFilter("dateDay", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "Asia/Tokyo" }).toFormat("dd");
  });

  eleventyConfig.addFilter("dateMonthDay", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "Asia/Tokyo" }).toFormat("LL-dd");
  });

  eleventyConfig.addFilter("yearMonth", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "Asia/Tokyo" }).toFormat("yyyy.LL");
  });

  // Group collection items by YYYY.MM (newest-first groups)
  eleventyConfig.addFilter("groupByYearMonth", (items) => {
    if (!Array.isArray(items)) return [];
    const groups = [];
    let current = null;

    for (const item of items) {
      const ym = DateTime.fromJSDate(item.date, { zone: "Asia/Tokyo" }).toFormat("yyyy.LL");
      if (!current || current.ym !== ym) {
        current = { ym, items: [] };
        groups.push(current);
      }
      current.items.push(item);
    }

    return groups;
  });

  // Take first N items (Nunjucks doesn't have JS slice semantics)
  eleventyConfig.addFilter("take", (arr, n) => {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, n);
  });

  // Diary collection: sorted newest first
  eleventyConfig.addCollection("diary", (collectionApi) => {
    return collectionApi.getFilteredByTag("diary").sort((a, b) => b.date - a.date);
  });

  // Archive collection grouped by year (newest year first)
  eleventyConfig.addCollection("diaryByYear", (collectionApi) => {
    const items = collectionApi.getFilteredByTag("diary").sort((a, b) => b.date - a.date);
    const yearMap = new Map();

    for (const item of items) {
      const year = DateTime.fromJSDate(item.date, { zone: "Asia/Tokyo" }).toFormat("yyyy");
      if (!yearMap.has(year)) yearMap.set(year, []);
      yearMap.get(year).push(item);
    }

    return Array.from(yearMap, ([year, yearItems]) => ({ year, items: yearItems }));
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
