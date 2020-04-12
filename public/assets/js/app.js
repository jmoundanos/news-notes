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
$(".save-btn").on("click", function() {
  // Keep the page from reloading.
  event.preventDefault();
  // Read data attribute from "save" button.
  var id = $(this).data("id");

  // Send the PUT request.
  $.ajax({
      url: "/saved/" + id,
      type: "PUT",
      success: function () {
          // Show the 'save' success message in the modal,
          $('#saveArticleModal').modal('show');
      }
  })
  // then update the page when the modal is closed.
  .then(function() {
       console.log("Article has been saved");
      $(".saveArticleCloseBtn").on("click", function() {
          window.location.href = '/';
      });
  });
});