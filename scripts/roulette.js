var key = '';
var search = '';
var queryURL = '';

var searches =["cat", "dog"];

$(document).ready(function(){

    RenderButtons();

    // On Search button click
    $('#search-add').on("click", function(){
        // Get searched term and push to button array and clear search
        var gifSearch = $('#search-input').val().trim();
        $('#search-input').val("");
        searches.push(gifSearch);
        console.log(gifSearch);
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
        var name = $(this).attr("data-name");
        console.log("Searching", name);

        // TO DO:
        // Ajax query for name var
        // Append gifs to main area
    }
});
