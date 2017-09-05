var apiKey = '&api_key=793386d43c174b9aac620baf8736bae5&limit=';
var baseURL = 'https://api.giphy.com/v1/gifs/search?q=';
var limit = '5';

var searches =["Cat", "Dog"];

$(document).ready(function(){

    // On Search button click
    $('#search-add').on("click", function(event){
        // Get searched term and push to button array and clear search
        event.preventDefault();
        var searchType = $('#search-type').val();
        var searchNumber = $('#display-number').val();
        var searchTerm = $('#search-input').val().trim();
        $('#search-input').val("");

        // TO DO: 
        RenderButtons(searchType, searchNumber, searchTerm);
    });

    $('#search-type').on("change", function(event){
        if ($(this).val() == "trending")
        {
            $('#search-input').hide();
        }
        else
        {
            $('#search-input').show();    
        }
    })    

    // Generates buttons with desired values
    function RenderButtons(type, display, term){
        b = $('<button>');
        b.addClass("search-bttn").text(term);

        // If search term is search
        if(type == "search")
        {   // Pass the term, and display amount to search function, add it on click, and call function
            b.on("click", function () {
                TermSearch(term, display);
            });
            TermSearch(term, display);
        }
        $('#search-history').prepend(b);
            
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

    function TermSearch(searchTerm, displayLimit){
        console.log("Search Term", searchTerm);
        console.log("Display Limit", displayLimit);

        var queryURL = baseURL + searchTerm + apiKey + displayLimit;
        Search(queryURL);
    }

    function Search(searchURL){ 
        $.ajax({
            url: searchURL,
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
