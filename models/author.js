const mongoose = require('mongoose');
// creating a schema/DB table
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// name of our table inside the DB. authorSchema defines the schema inside the table
module.exports = mongoose.model('Author', authorSchema)