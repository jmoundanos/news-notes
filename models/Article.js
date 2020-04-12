var mongoose = require("mongoose");

//Save Schema constructor
var Schema = mongoose.Schema;

//Use Schema constructor to make new object

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});
//Create model from schema
var Article = mongoose.model("Article", ArticleSchema);

//Export model
module.exports = Article;