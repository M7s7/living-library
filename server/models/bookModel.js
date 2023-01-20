const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book: {
    title: String,
    author: String,
    url: String,
    stats: {
      published: String,
      status: String,
      words: String,
      chapters: String,
      comments: String,
      kudos: String,
      bookmarks: String, 
      hits: String
    }
  },
  user: {type: String, required: true}
})

module.exports = mongoose.model("BookModel", bookSchema);