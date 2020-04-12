var express = require("express");

var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");

// Import the model to use its database functions.
var db = require("../models");

//Create routes and logic within the routes
// A GET route for scraping the statesman website
router.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.echojs.com").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      //grab every article tag, and do the following:
      $("article h2").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save thes properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
  
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });
  router.get("/", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({}).limit(20)
      .then(function(dbArticle) {
      //  res.render("index", {
      //    hbsObject: dbArticle.map(news => news.toJSON())
      //  })
          var hbsObject = {articles:dbArticle};
          console.log("This is a hbsObject" + JSON.stringify(hbsObject));
        //Send articles to be used by handlebars index
       //res.json(dbArticle);
       res.render("index",hbsObject);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
/*router.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });*/
  
module.exports = router;