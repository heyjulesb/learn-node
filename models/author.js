const mongoose = require('mongoose');
const Book = require('./book');
// creating a schema/DB table
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
// allows us to run a method before certain action occurs. This will run any function that we put inside the function before we remove the author
// using a normal functon instead of the => function, in order to access the author
// passing a callback (next). if we call the callback this means the code is ok to go proceed unless we pass an error to the next callback
authorSchema.pre('remove', function (next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      next(new Error('This author has books in the DB'));
    } else {
      next(); // tells the DB it is ok to remove the author as they have no books
    }
  });
});

// name of our table inside the DB. authorSchema defines the schema inside the table
module.exports = mongoose.model('Author', authorSchema);
