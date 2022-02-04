// setting all the routes for the index of our application
const express = require('express');
const router = express.Router();

// route of our application
router.get('/', (req, res) => {
  res.render('index')
});

// exporting the router
module.exports = router;