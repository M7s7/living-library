class Book {
  constructor(title, author, url, rating, category, warnings, language, stats, tags) {
    this.title = title;
    this.author = author;
    this.url = url; // Url refers to the reference number after /work/
    this.rating = rating;
    this.category = category;
    this.warnings = warnings;
    this.language = language;
    this.stats = stats;
    this.tags = tags;
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

class Tags {
  constructor (fandoms, relationships, characters, additional) {
    this.fandoms = fandoms;
    this.relationships = relationships;
    this.characters = characters;
    this.additional = additional;
  }
}



module.exports = {
  Book: Book,
  Stats: Stats, 
  Tags: Tags
}


