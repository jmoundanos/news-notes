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