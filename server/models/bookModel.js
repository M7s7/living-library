const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book: {
    title: String,
    author: String,
    url: String,
    rating: String,
    category: String,
    warnings: String,
    language: String,
    stats: {
      published: String,
      status: String,
      status_flag: String,
      words: String,
      chapters: String,
      comments: String,
      kudos: String,
      bookmarks: String, 
      hits: String,
    },
    tags: {
      fandoms: Array,
      relationships: Array,
      characters: Array,
      additional: Array,
    }
  },
  user: {type: String, required: true},
  timestamp: Number,
  filters: {
    favourite: Boolean,
    reading: Boolean,
    completed: Boolean,
  }
  
})

module.exports = mongoose.model("BookModel", bookSchema);