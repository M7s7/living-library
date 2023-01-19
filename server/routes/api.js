const express = require('express');
const BookModel = require('../models/bookModel');

const router = express.Router();

// /create <body is Book class>
router.post("/create", async (req, res) => {
  try {
    const book = new BookModel(req.body);
    await book.save();
    console.log(`Saved "${book.title}" to database`);
    res.send(book);
  } catch (e) {
    console.log(`CRUD: Create error - ${e}`);
    res.sendStatus(400);
  }
})

// /read?url=XYZ
router.get("/read", async (req, res) => {
  try {
    const book = await BookModel.findOne({ url: req.query.url });
    
    if (book == null) {
      console.log("CRUD - Read: Book not found!");
      res.sendStatus(400);
    } else {
      console.log(`Read "${book.title}" from database`);
      res.send(book);
    }
  } catch (e) {
    console.log(`CRUD: Read error - ${e}`);
    res.sendStatus(400);
  }
})

// /update?url=XYZ, <body>
router.put("/update", async (req, res) => {
  try {
    const book = await BookModel.findOneAndReplace(
      { url: req.query.url },
      req.body
    );
    
    if (book == null) {
      console.log("CRUD - Update: Book not found!");
      res.sendStatus(400);
    } else {
      console.log(`Updated "${book.title}"`); 
      res.send(book);
    }
  } catch (e) {
    console.log(`CRUD: Update error - ${e}`);
    res.sendStatus(400);
  }
})  

// /delete?url=XYZ
router.delete("/delete", async (req, res) => {
  try {
    const book = await BookModel.findOneAndDelete(
      { url: req.query.url }
    );
    console.log(`Deleted "${book.title}"`);
    res.send(book);
  } catch (e) {
    console.log(`CRUD: Delete error - ${e}`);
    res.sendStatus(400);
  }
})

// /all
router.get("/all", async (req, res) => {
  try {
    const all = await BookModel.find({});
    res.send(all);
  } catch (e) {
    console.log(`CRUD: All error - ${e}`);
    res.sendStatus(400);
  }
})


module.exports = router;