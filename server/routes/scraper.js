const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { Book, Stats } = require('../classes/book');

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log(req.user)
    const url = `${process.env.SOURCE_WEBSITE}/${req.query.url}`;
    const HTML = await axios.get(url, {
      headers: {
        Cookie: "view_adult=true; path=/"
      }
    });
    res.send(parseBook(HTML.data, url));
  } catch (e) {
    console.log(`scraper.js get request failed - URL invalid: ${e}`);
    res.sendStatus(400);
  }
})

const parseBook = (HTML, url) => {
  const $ = cheerio.load(HTML);

  // PARSING TAGS
  const fandoms = [];
  $("dd.fandom").find("ul").find("li").each(function () {
    const value = $(this).text();
    fandoms.push(value);
  })

  const relationships = [];
  $("dd.relationship").find("ul").find("li").each(function () {
    const value = $(this).text();
    relationships.push(value);
  })

  const characters = [];
  $("dd.character").find("ul").find("li").each(function () {
    const value = $(this).text();
    characters.push(value);
  })

  const additional = [];
  $("dd.freeform").find("ul").find("li").each(function () {
    const value = $(this).text();
    additional.push(value);
  })

  // PARSING STATS
  const bookStats = new Stats();
  $("dl.stats")
    .find("dd")
    .each((i, item) => {
    bookStats[item.attribs.class] = item.children[0].data;
    })
  
  // Parse author information: title, author, url, rating, category, warnings, language, stats, tags
  return new Book(
    $("h2.title").text().trim(),
    $(".byline").text().trim(),
    url.match(/works\/(\d*)/)[1],
    $("dd.rating").text().trim(),
    $("dd.category").text().trim(),
    $("dd.warning").text().trim(),
    $("dd.language").text().trim(),
    bookStats, 
    {fandoms, relationships, characters, additional}
  )
}

module.exports = router;


