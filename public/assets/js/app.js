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
  event.preventDefault();
  // Empty the notes from the note section
  $(".noteArea").empty();
  
  var articleId = $(this).attr("data-id");
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
      // // console.log(data);
      // var id = data._id;
      // // Set the title in the header.
      // $(".modal-title").html(data.title);
      // // Create a data-id attribute for the button.
      // $(".saveNote").attr("data-id", id);

      
      // if (data.notes) {
      //console.log(data.notes);
      //     for (i=0; i<data.notes.length; i++) {
      //         $(".noteArea").append(
      //             "<div class='card-body notecard' id='notecard'>" + 
      //                 "<h4 class='notecardTitle' data-id='" + data.notes[i]._id + "'>" + 
      //                     data.notes[i].title + 
      //                 "</h4>" + 
      //                 "<button type='button' class='btn btn-danger deleteNote' data-id='" + data.notes[i]._id + "'>Delete</button>" + 
      //             "</div>"
      //         );
      //         $(".noteArea").append(
      //             "<hr>"
      //         );
      //     }
      // }
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
          noteTitle: $("#titleinput").val(),
          // Value taken from note textarea
          noteBody: $("#bodyinput").val()
      }
  })
  
  .then((data) => {
      // Log the response
    console.log(data);
   
    $('#notesModal').modal("hide");
  $(".noteArea").text(data.noteTitle);
    $(".noteArea").text(data.noteBody);
     
      
  });
  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
