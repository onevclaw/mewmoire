const { DateTime } = require("luxon");

module.exports = {
  layout: "layouts/diary.njk",
  tags: ["diary"],
  permalink: (data) => {
    const dt = DateTime.fromJSDate(data.page.date, { zone: "Asia/Tokyo" });
    return `/${dt.toFormat("yyyy/LL/dd")}/index.html`;
  }
};
