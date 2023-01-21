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

  // TESTING
  console.log($("dd.character").find("ul.commas").find("li.last").find("a").first().text())



  // Parse stats
  const bookStats = new Stats();
  $("dl.stats")
    .find("dd")
    .each((i, item) => {
    bookStats[item.attribs.class] = item.children[0].data;
    })
  
  // Parse author information
  return new Book(
    $("h2.title").text().trim(),
    $(".byline").text().trim(),
    url.match(/works\/(\d*)/)[1],
    bookStats
  )
}

module.exports = router;


