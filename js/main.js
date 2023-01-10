var recipeBtn = document.querySelector('#find-recipe');

var recipeContainer = $('#recipe-container');


recipeBtn.addEventListener('click', function(event){
event.preventDefault();
// console.log('submitted');

var inputText = document.querySelector('#input-box').value;
// console.log(inputText);
 
const id = "1b0fa889";

const key = "c7c8044eb4a22528a8ccc3bbdee4c57b";

const recipeContainer = $('#recipe-containter');

// construct URL
let cusineQuery = localStorage.getItem('cusineQuery')|| ''
console.log(cusineQuery);
let healthQuery = localStorage.getItem('healthQuery')|| ''
let dietQuery = localStorage.getItem('dietQuery')|| ''
let choiceQuery = localStorage.getItem('choiceQuery')||''
// let choice =localStorage.getItem('choice');
var queryURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${inputText}&app_id=${id}&app_key=${key}&from=0&to=20${dietQuery}${healthQuery}${cusineQuery}${choiceQuery}&imageSize=REGULAR`;




 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    // console.log(response.hits[0].recipe.image);
    console.log(response)

    var arr0_19 = [...Array(20).keys()];
    shuffle(arr0_19);
    
    var gpCards = ["", ""]
    var tmpStr = ""
    var newIdx = 0
    for (let j=0; j<6; j++){
        newIdx = arr0_19[j];
        tmpStr = `<div class="card">
        <img class="card-img-top" src="${response.hits[newIdx].recipe.image}"
            alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${response.hits[newIdx].recipe.label}</h5>
            <div class="text-center" id="meal-type">Meal type: ${response.hits[newIdx].recipe.mealType}</div>
            <div class ="text-center" id="diet-labels"> ${response.hits[newIdx].recipe.dietLabels}</div>
            <div class ="text-center" id="ingredients" style="font-size: 0.9rem;"><h6>Ingredients:</h6> ${response.hits[newIdx].recipe.ingredientLines}</div>
            <div class="text-center" id="time"><b>Preparation time: </b>${response.hits[newIdx].recipe.totalTime} mins</div>
            <br>
            <a type="button" class="btn btn-secondary" target="_blank" a href="${response.hits[newIdx].recipe.url}">More
                details</a>
        </div>
        </div>`
        if (j%2 === 0) 
            gpCards[0] += tmpStr;
        else 
            gpCards[1] += tmpStr;
        
    }
    let childNode = '<div class="card-group">'+gpCards[0]+
        '</div><div class="card-group">'+gpCards[1]+'</div>'
    document.querySelector('#recipe-container').innerHTML = childNode;
    // recipeContainer.html(childNode);
    });
});

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
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
