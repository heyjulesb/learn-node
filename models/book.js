const mongoose = require("mongoose");
const path = require("path");
const coverImageBasePath = "uploads/bookCovers";
// creating a schema/DB table
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now, // sets the current date to when we create a new book
  },
  coverImageName: {
    type: String,
    required: true,
  },
  // reference authorschema
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
});

bookSchema.virtual("coverImagePath").get(function () {
  if (this.coverImageName != null) {
    return path.join("/", coverImageBasePath, this.coverImageName);
  }
});

// name of our table inside the DB. bookSchema defines the schema inside the table
module.exports = mongoose.model("Book", bookSchema);
module.exports.coverImageBasePath = coverImageBasePath;
