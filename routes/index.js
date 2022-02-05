// setting all the routes for the index of our application
const express = require("express");
const router = express.Router();
const Book = require("../models/book");
// route of our application
router.get("/", async (req, res) => {
  let books;
  try {
    // find all the books, sort by created at in descending order and only show up to 10
    books = await Book.find().sort({ createdAt: "desc" }).limit(10).exec();
  } catch {
    books = [];
  }

  res.render("index", { books: books });
});

// exporting the router
module.exports = router;
