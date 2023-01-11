
var recipeBtn = document.querySelector('#find-recipe');

var recipeContainer = $('#recipe-container');

const weatherLoc = $('#weather-location');

//side bar info using local storage data
if ((localStorage.getItem('placeName')===null)){
    
}else {
weatherLoc.text("weather in:\n" + localStorage.getItem('placeName'));
$('#weather-info').text("weather now:\n" + localStorage.getItem('weatherNow'));
$('#weather-temp').text("temp now:\n" + localStorage.getItem('tempNow') + "°C");
$('#max-temp').text("max temp today:\n" + localStorage.getItem('temp') + "°C");
$('#min-temp').text("min temp today:\n" + localStorage.getItem('tempMin') + "°C");
$('#rain').text("total rain:\n" + localStorage.getItem('precipitation') + "mm");
$('#wind').text("max wind speed:\n" + localStorage.getItem('windSpd') + "km/h");
};

// on click function 
recipeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    // console.log('submitted');

    var inputText = document.querySelector('#input-box').value;
    // console.log(inputText);

    const id = "1b0fa889";

    const key = "f1142d5c27142abbfe9a6402558b265b";

    const recipeContainer = $('#recipe-containter');

    // obtain local storage query key-value pairs
    let cusineQuery = localStorage.getItem('cusineQuery') || ''
    console.log(cusineQuery);
    let healthQuery = localStorage.getItem('healthQuery') || ''
    let dietQuery = localStorage.getItem('dietQuery') || ''
    let choiceQuery = localStorage.getItem('choiceQuery') || ''

    // construct query URL
    var queryURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${inputText}&app_id=${id}&app_key=${key}&from=0&to=20${dietQuery}${healthQuery}${cusineQuery}${choiceQuery}&imageSize=REGULAR`;

    //ajax request for query URL
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        // console.log(response.hits[0].recipe.image);
        console.log(response)

        //shuffle 0 - 20
        var arr0_19 = [...Array(20).keys()];
        shuffle(arr0_19);

        var gpCards = ["", ""]
        var tmpStr = ""
        var newIdx = 0

        //for loop creating dynamic shuffle cards
        for (let j = 0; j < 6; j++) {
            newIdx = arr0_19[j];
            tmpStr = `<div class="card">
            <img class="card-img-top" src="${response.hits[newIdx].recipe.image}"
                alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${response.hits[newIdx].recipe.label}</h5>
                <div class="text-center" id="meal-type"><b>Meal type:</b> ${response.hits[newIdx].recipe.mealType}</div>
                <div class ="text-center" id="diet-labels"> ${response.hits[newIdx].recipe.dietLabels}</div>
                <div class ="text-center" id="ingredients" style="font-size: 0.9rem;"><h6>Ingredients:</h6> ${response.hits[newIdx].recipe.ingredientLines}</div>
                <div class="text-center" id="time"><b>Preparation time: </b>${response.hits[newIdx].recipe.totalTime} mins</div>
                <br>
                <a type="button" class="btn btn-secondary" target="_blank" a href="${response.hits[newIdx].recipe.url}">More
                    details</a>
            </div>
            </div>`
            if (j % 2 === 0)
                gpCards[0] += tmpStr;
            else
                gpCards[1] += tmpStr;

        }
        let childNode = '<div class="card-group">' + gpCards[0] +
            '</div><div class="card-group">' + gpCards[1] + '</div>'
        //append innerHTML to be childNode
        document.querySelector('#recipe-container').innerHTML = childNode;
        // recipeContainer.html(childNode);
    });
});

// shuffle array function
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
