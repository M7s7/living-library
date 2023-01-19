const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const { Book, Stats } = require('../classes/book');

router.get("/", async (req, res) => {
  try {
    const url = req.query.url;
    const HTML = await axios.get(url, {
      headers: {
        Cookie: "view_adult=true; path=/"
      }
    });
    res.send(parseBook(HTML.data, url));
  } catch (e) {
    console.log("Error")
  }
})

const parseBook = (HTML, url) => {
  const $ = cheerio.load(HTML);
  // Parse stats
  const bookStats = new Stats();
  $("dl.stats")
    .find("dd")
    .each((i, item) => {
    bookStats[item.attribs.class] = item.children[0].data;
    })
  
  // Parse author information
  return new Book(
    $(".byline").text().trim(),
    $("h2.title").text().trim(),
    url,
    bookStats
  )
}

module.exports = router;


