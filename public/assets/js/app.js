//Scrape button
$("#scrape-button").on("click", function(){
  event.preventDefault();
   //Scraping route
  $.ajax("/scrape",{
    type: "GET"
  }).then(function(){
    location.reload();
    console.log("scrape complete");
  })
})

$("#clear-button").on("click", function(){
  event.preventDefault();
  $("#article-section").empty();
  $.ajax({
    type: "DELETE",
    url: "/delete-articles",
    success: function(res){
      if(res == "error"){
        console.log("error")
      }
    }
  });
});

// Get all notes for an article.
$(".addNote").on("click", function() {
  // Keep the page from reloading.
  event.preventDefault();
  // Empty the notes from the note section
  $(".noteArea").empty();
  // Save the id from the button
  var articleId = $(this).attr("data-id");
  // Make the ajax call for the article
  $.ajax({
      method: "GET",
      url: "/getnotes/" + articleId,
      success: function () {
          // Open the notes modal
          $('#notesModal').modal('show');
      }
  })
  // Add the note information
  .then(function(data) {
      // console.log(data);
      var id = data._id;
      // Set the title in the header.
      $(".modal-title").html(data.title);
      // Create a data-id attribute for the button.
      $(".saveNote").attr("data-id", id);

      // If there's already a note for the article...
      if (data.notes) {
          console.log(data.notes);
          for (i=0; i<data.notes.length; i++) {
              $(".noteArea").append(
                  "<div class='card-body notecard' id='notecard'>" + 
                      "<h4 class='notecardTitle' data-id='" + data.notes[i]._id + "'>" + 
                          data.notes[i].title + 
                      "</h4>" + 
                      "<button type='button' class='btn btn-danger deleteNote' data-id='" + data.notes[i]._id + "'>Delete</button>" + 
                  "</div>"
              );
              $(".noteArea").append(
                  "<hr>"
              );
          }
      }
  });
});
// Save a Note.
$(".saveNote").on("click", function() {
  var articleId = $(this).attr("data-id");
  $.ajax({
      url: "/postnotes/" + articleId,
      method: "POST",
      data: {
          // Value taken from title input
          title: $("#titleinput").val(),
          // Value taken from note textarea
          body: $("#bodyinput").val()
      }
  })
  .then(function(data) {
      // Log the response
      // console.log(data);
      window.location.href = '/'
      
  });
  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
