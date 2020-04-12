var mongoose = require("mongoose");

//Save reference to Schema constructor
var Schema = mongoose.Schema;

//Create new object with Schema constructor
var NoteSchema = new Schema({
    title: String,
    body: String
});

//Create model from schema
var Note = mongoose.model("Note", NoteSchema);

//Export model
module.exports = Note;