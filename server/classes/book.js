class Book {
  constructor(title, author, url, stats) {
    this.title = title;
    this.author = author;
    this.url = url; // Url refers to the reference number after /work/
    this.stats = stats;
  }
} 

class Stats {
  constructor (published, status, words, chapters, comments, kudos, bookmarks, hits) {
    this.published = published;
    this.status = status;
    this.words = words;
    this.chapters = chapters;
    this.comments = comments;
    this.kudos = kudos;
    this.bookmarks = bookmarks;
    this.hits = hits;
  }
}

module.exports = {
  Book: Book,
  Stats: Stats
}