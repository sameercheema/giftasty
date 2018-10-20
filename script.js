// API KEY = GICYMab8116ASxMsQ3ilkI7AnKgNTo0K

let topics = ["pizza", "doughnuts", "ice-cream", "chicken", "cookies", "steak"];

function buttonBuilder() {
    $('.button-area').empty();
    for(let i = 0; i<topics.length;i++){
        let newButton = $('<button>').addClass('category-button').text(topics[i]);
        newButton.data('name', topics[i]);
        $('.button-area').append(newButton);
    };
}
// click on the -Add!- button to add any choice category
$('#add-category').on('click', function(event){
    event.preventDefault();
    let cat = $('#category-input').val().trim();
    if(cat){ // makes sure the user doesn't add blank buttons
        topics.push(cat);
        buttonBuilder();
        $('#category-input').val("");
    }else{
        return false;
    }
});
// clicking a gif will play/pause it
function toggleGif(){
    let state = $(this).data('state');
    if(state === 'still'){
        $(this).attr('src', $(this).data('active'));
        $(this).data('state', 'active');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).data('state', 'still');
    };
}
// displays the gif on the page when called (by clicking a category button)
function displayGifs(){
    let category = $(this).data('name');
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=GICYMab8116ASxMsQ3ilkI7AnKgNTo0K";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $('.gif-area').empty();
        let dataArray = response.data;
        console.log(response);
        for(let i = 0; i < dataArray.length;i++){
            let gifDiv = $('<div class="gif-card">');
            let gifTitle = $('<div class="git-title">'+ response.data[i].title+'</div>');
            let gifRating = $('<div class="gif-rating">Rating: '+ response.data[i].rating.toUpperCase()+'</div>');
            let newGif = $('<img class="gif">');
            newGif.attr('src', response.data[i].images.fixed_height_still.url);
            newGif.attr('data-state', 'still');
            newGif.attr('data-still', response.data[i].images.fixed_height_still.url);
            newGif.attr('data-active', response.data[i].images.fixed_height.url);
            gifDiv.append(gifTitle, gifRating, newGif);
            $('.gif-area').append(gifDiv);
        };
    });
}
// click events for submit button and each gif
$(document).on('click', '.category-button', displayGifs);
$(document).on('click', '.gif', toggleGif);
//builds preset buttons
buttonBuilder();
