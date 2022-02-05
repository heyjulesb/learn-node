const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

// setting all the routes for the index of our application
// All authors route
router.get("/", async (req, res) => {
  let searchOptions = {};
  // GET request sends info as a query in the URL why we use req.query
  // checks a name is being passed to the server
  if (req.query.name != null && req.query.name !== "") {
    // regular expression allows us to search for part of the text in a field
    // i means it is not case sensitive
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// New Author routes - display form
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    // req.body is used as POST request sends info via the body
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors/${newAuthor.id}`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

// path for viewing the selected author.
// :id signifies there will be a variable called 'id' that will be passed along with our request
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    res.render("authors/show", {
      author: author,
      booksByAuthor: books,
    });
  } catch {
    res.redirect("/");
  }
});

// path for the author edit page
router.get("/:id/edit", async (req, res) => {
  try {
    // find the user by the ID. - findById is a mongoose method
    const author = await Author.findById(req.params.id);
    res.render("authors/edit", { author: author });
  } catch {
    res.redirect("/authors");
  }
});

// path for update author
router.put("/:id", async (req, res) => {
  let author; // we need the author variable in the catch, so it has to be defined outside in order for the catch to use it.
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch {
    // if the author does not exist, redirect to home page
    if (author == null) {
      res.redirect("/");
    } else {
      res.render("authors/edit", {
        author: author,
        errorMessage: "Error updating Author",
      });
    }
  }
});

// path for delete author
router.delete("/:id", async (req, res) => {
  let author; // we need the author variable in the catch, so it has to be defined outside in order for the catch to use it.
  try {
    author = await Author.findById(req.params.id);
    await author.remove();
    res.redirect("/authors");
  } catch {
    // if the author does not exist, redirect to home page
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

//exporting the router
module.exports = router;
