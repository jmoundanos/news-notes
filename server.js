var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');

//var axios = require("axios");
//var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [
      path.join(__dirname, "views/partials")
    ]
}));
app.set("view engine", "handlebars");

//Save routes to variables
var scrapeRoutes = require("./controllers/articleController.js");
app.use(scrapeRoutes);
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/news-notes", { useNewUrlParser: true });

  // Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  