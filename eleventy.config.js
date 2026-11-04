import { existsSync } from "node:fs";
import { loadAll } from "js-yaml";
import { RenderPlugin } from "@11ty/eleventy";

// Link previews on social media need full URLs for images, not paths.
const siteUrl = "https://rcsb.band";

// The people editing content/ may not be programmers, so when something in a file is wrong we
// fail the build with a message that names the file and the entry. Render keeps the old version of
// the site live when a build fails, so a typo never takes the site down.
function fail(message) {
  throw new Error(message);
}

// load() throws on a file that has only comments, which is what an editor gets if they delete
// every show but keep the notes at the top. loadAll() gives us an empty list for that instead.
function loadYaml(contents) {
  const docs = loadAll(contents);
  return docs.length ? docs[0] : [];
}

function checkedShow(show) {
  if (show === null || typeof show !== "object") {
    fail(
      "content/shows.yaml: there's an empty or broken entry. " +
        'Look for a line with just a "-" on it.',
    );
  }
  if (!show.venue) {
    fail(`content/shows.yaml: the show on ${show.date} needs a "venue:" line.`);
  }

  const date = show.date;
  const valid =
    typeof date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(Date.parse(`${date}T00:00:00Z`)) &&
    new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;
  if (!valid) {
    fail(
      `content/shows.yaml: the show at "${show.venue}" has date "${date}". ` +
        "Dates must be a real day written like 2026-11-15 (year-month-day). " +
        'Put the time on its own "time:" line.',
    );
  }
  return show;
}

function sortedShows(shows) {
  return (shows ?? []).map(checkedShow).sort((a, b) => a.date.localeCompare(b.date));
}

// The build server runs on UTC, which is already "tomorrow" during a US evening show. Allowing a
// day of slack keeps tonight's show in the upcoming list. The script in the page then does the
// exact split using the visitor's own clock.
function cutoff() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(RenderPlugin);
  eleventyConfig.addDataExtension("yaml", loadYaml);
  eleventyConfig.addGlobalData("siteUrl", siteUrl);

  eleventyConfig.addPassthroughCopy({ "content/photos": "photos" });
  eleventyConfig.addPassthroughCopy({ "site/style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "site/favicon.svg": "favicon.svg" });

  // A misspelled photo name, or the wrong capital letters, would otherwise show up as a broken
  // image with no warning, since file names on the server are case-sensitive.
  eleventyConfig.addFilter("photo", (name) => {
    if (!existsSync(`content/photos/${name}`)) {
      fail(
        `There's no photo named "${name}" in content/photos/. ` +
          "The name must match exactly, including capital letters.",
      );
    }
    return `/photos/${encodeURIComponent(name)}`;
  });

  eleventyConfig.addFilter("upcoming", (shows) =>
    sortedShows(shows).filter((s) => s.date >= cutoff()),
  );
  eleventyConfig.addFilter("past", (shows) =>
    sortedShows(shows)
      .filter((s) => s.date < cutoff())
      .reverse(),
  );
  eleventyConfig.addFilter("prettyDate", (iso) =>
    new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }),
  );
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
}

export const config = {
  dir: {
    input: "site",
    data: "../content",
    includes: "_includes",
    output: "_site",
  },
};
