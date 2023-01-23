const express = require('express');
const Book = require('../models/bookModel');

const router = express.Router();

// /create <body is Book class>
router.post("/create", async (req, res) => {
  try {
    const matching = await Book.findOne({
      "book.url": req.body.url,
      user: req.user.username,
    })

    if (matching !== null) {
      console.log("CRUD - Create: Book already exists!");
      res.sendStatus(400);
    } else {
      const bookModel = new Book({
        book: req.body,
        user: req.user.username,
        timestamp: Date.now(),
        favourite: false,
      });
  
      await bookModel.save();
      console.log(`Saved "${bookModel.book.title}" to database`);
      res.send(bookModel);
    }
  } catch (e) {
    console.log(`CRUD: Create error - ${e}`);
    res.sendStatus(400);
  }
})

// /read?url=XYZ
router.get("/read", async (req, res) => {
  try {
    const bookModel = await Book.findOne({ 
      "book.url": req.query.url,
      user: req.user.username,
    });
    
    if (bookModel == null) {
      console.log("CRUD - Read: Book not found!");
      res.sendStatus(400);
    } else {
      console.log(`Read "${bookModel.book.title}" from database`);
      res.send(bookModel);
    }
  } catch (e) {
    console.log(`CRUD: Read error - ${e}`);
    res.sendStatus(400);
  }
})

// /update?url=XYZ, <body>
router.put("/update", async (req, res) => {
  try {
    const oldBookModel = await Book.findOne({
      "book.url": req.query.url,
      user: req.user.username,
    });

    const fave = req.query.favourite ? !oldBookModel.favourite : oldBookModel.favourite;
    const time = req.query.favourite ? oldBookModel.timestamp : Date.now();
    const bookModel = await Book.findOneAndReplace(
      { "book.url": req.query.url,
        user: req.user.username
      },
      {
        book: req.body,
        user: req.user.username,
        favourite: fave,
        timestamp: time,
      }
    );
    
    if (bookModel == null) {
      console.log("CRUD - Update: Book not found!");
      res.sendStatus(400);
    } else {
      console.log(`Updated "${bookModel.book.title}"`); 
      res.send(bookModel);
    }
  } catch (e) {
    console.log(`CRUD: Update error - ${e}`);
    res.sendStatus(400);
  }
})  

// /delete?url=XYZ
router.delete("/delete", async (req, res) => {
  try {
    const bookModel = await Book.findOneAndDelete(
      { "book.url": req.query.url,
        user: req.user.username
      }
    );
    console.log(`Deleted "${bookModel.book.title}"`);
    res.send(bookModel);
  } catch (e) {
    console.log(`CRUD: Delete error - ${e}`);
    res.sendStatus(400);
  }
})

// /all
router.get("/all", async (req, res) => {
  try {
    console.log(req.user, req.session)
    const all = await Book.find({ user: req.user.username });
    console.log(typeof(all), all)
  
    res.send(all);
  } catch (e) {
    console.log(`CRUD: All error - ${e}`);
    res.sendStatus(400);
  }
})


module.exports = router;