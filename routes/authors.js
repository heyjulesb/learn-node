// setting all the routes for the index of our application
const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All authors route
router.get('/', async (req, res) => {
  let searchOptions = {}
  // GET request sends info as a query in the URL why we use req.query
  // checks a name is being passed to the server
  if(req.query.name != null && req.query.name !== ''){
    // regular expression allows us to search for part of the text in a field
    // i means it is not case sensitive
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', { 
      authors: authors, 
      searchOptions: req.query 
      });
  } catch { 
    res.redirect('/');
  }
})

// New Author routes - display form
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
});

// Create Author Route
router.post('/', async (req, res) => {
  const author = new Author({
    // req.body is used as POST request sends info via the body
    name: req.body.name
  });
  try {
    const newAuthor = await author.save()
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`);

  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    });
  }
});

//exporting the router
module.exports = router;