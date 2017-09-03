var apiKey = '&api_key=793386d43c174b9aac620baf8736bae5&limit=';
var baseURL = 'https://api.giphy.com/v1/gifs/search?q=';
var limit = '5';

var searches =["cat", "dog"];

$(document).ready(function(){

    RenderButtons();

    // On Search button click
    $('#search-add').on("click", function(){
        // Get searched term and push to button array and clear search
        var gifSearch = $('#search-input').val().trim();
        $('#search-input').val("");
        searches.push(gifSearch);
        ReturnImages(gifSearch);
        RenderButtons();
    });

    // Generates buttons with desired values
    function RenderButtons(){
        $('#search-history').empty();
        // For every value in the search history array
        for (var i = 0; i < searches.length; i++)
        {
            // Make a button with data, text, class and on Click event to search
            b = $('<button>');
            b.text(searches[i])
                .addClass("search-bttn")
                .attr("data-name", searches[i])
                .on("click", Search);

            // Append the button to search history panel
            $('#search-history').append(b);
        }
    }

    // When user clicks on button request Information for Giphy
    function Search(){ 
        var nameData = $(this).attr("data-name");
        console.log("Searching", nameData);
        ReturnImages(nameData);
    }

    function Animate() { 
        var animatedURL = $(this).data("animated");
        $(this).attr("src",animatedURL);
        $(this).data("state", "animated");
    }
    
    function Still(){
        var stillURL = $(this).data("still");
        $(this).attr("src",stillURL);
        $(this).data("state", "still");
    }

    function ReturnImages(searchTerm){
        var queryURL = baseURL + searchTerm + apiKey + limit;
        // TO DO:
        // Ajax query for name var by changing global search var
        $.ajax({
            url: queryURL,
            method: "GET",
        }).done(function(response){
            console.log(response);
            var result = response.data;
            $('#gif-dump').empty();
            // For every data object returned in response
            for (var i = 0; i < result.length; i++){
                console.log(result[i].images.downsized_medium.url);
                var image = result[i].images;
                var gif = $('<img>');
                gif.attr("src",image.fixed_height_still.url);
                gif.data("still", image.fixed_height_still.url)
                    .data("animated", image.fixed_height.url)
                    .data("state", "still");
                gif.on("mouseenter",Animate);
                gif.on("mouseleave", Still)
                $('#gif-dump').append(gif);
            }   
        });
    }

});
