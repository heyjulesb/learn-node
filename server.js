if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// importing the modules
const { application } = require("express");
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // where all the views files will go for our server
//hook express layouts - every single file will be put in this layout file.
app.set("layout", "layouts/layout");
// telling app to use express layouts
app.use(expressLayouts);
//where our public files e.g. css, js, images etc
app.use(express.static("public"));

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter);

// default port 3000 set
app.listen(process.env.PORT || 3000);
