const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: {
      type: String, 
      unique: true
      },
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
  })

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model("BookModel", bookSchema);