var express = require("express");

var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");

// Import the model to use its database functions.
var db = require("../models");

//Create routes and logic within the routes
// A GET route for scraping the website
router.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.echojs.com").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      //grab every article tag, and do the following:
      $("article h2").each(function(i, element) {
        // Save an empty result object
        var result = {};
  // Add the text and href of every link, and save these properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
  //console.log(result);
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
      res.send("Scrape Complete");
    });
  });
  //Route to get all the articles from the database
  router.get("/", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({}).limit(20)
      .then(function(dbArticle) {
        var hbsObject = {articles:dbArticle};
        res.render("index",hbsObject);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  router.get("/getnotes/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  
// Route for saving an article's note
router.post("/postnotes/:id", function(req, res) {
  // Save the new note that gets posted to the Notes collection,
  // then find an article from the req.params.id,
  // and update it's "note" property with the _id of the new note.
  console.log(req.body);
  db.Note.create(req.body)
  .then(function(dbNote) {
      return db.Article.findOneAndUpdate(
          {_id: req.params.id},
          {notes: dbNote._id},
          {new: true }
      );
  })
  // respond with the article with the note included.
  .then(function(dbArticle) {
      // If all Notes are successfully found, send them back to the client.
      res.json(dbArticle);
  })
  .catch(function(error) {
      // If an error occurs, send the error to the client.
      res.json(error);
  });
});

// Route to drop the Articles collection.
router.delete("/delete-articles", function(req, res, next) {
  db.Article.remove({}, function(err) {
      if (err) {
          console.log(err)
      } else {
          console.log("articles dropped!");
      }
  })
  .then(function (dropnotes) {
      db.Note.remove({}, function(err) {
          if (err) {
              console.log(err)
          } else {
              console.log("notes dropped!");
          }
      })
  })
});
module.exports = router;