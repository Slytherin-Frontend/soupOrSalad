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
// let choice =localStorage.getItem('choice');
 var queryURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${inputText}&app_id=${id}&app_key=${key}&from=0&to=20${dietQuery}${healthQuery}${cusineQuery}&imageSize=REGULAR`;


 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    // console.log(response.hits[0].recipe.image);
    let childNode = `<div class="card-group"><div class="card">
<img class="card-img-top" src="${response.hits[0].recipe.image}"
    alt="Card image cap">
<div class="card-body">
    <h5 class="card-title">${response.hits[0].recipe.label}</h5>
    <div class="text-center" id="meal-type">Meal type: ${response.hits[0].recipe.mealType}</div>
    <div class ="text-center" id="diet-labels"> ${response.hits[0].recipe.dietLabels}</div>
    <div class ="text-center" id="ingredients" style="font-size: 0.9rem;"><h6>Ingredients:</h6> ${response.hits[0].recipe.ingredientLines}</div>
    <br>
    <button type="button" class="btn btn-secondary" data-toggle="modal"
        data-target=".bd-example-modal-lg">More
        details</button>
</div>
</div>
<div class="card">
<img class="card-img-top" src="${response.hits[1].recipe.image}"
    alt="Card image cap">
<div class="card-body">
    <h5 class="card-title" id="salad5">${response.hits[1].recipe.label}</h5>
    <div class="text-center" id="meal-type">Meal type: ${response.hits[1].recipe.mealType}</div>
    <div class ="text-center" id="diet-labels"> ${response.hits[1].recipe.dietLabels}</div>
    <div class ="text-center" id="ingredients" style="font-size: 0.9rem;"><h6>Ingredients:</h6> ${response.hits[1].recipe.ingredientLines}</div>
    <br>
    <button type="button" class="btn btn-secondary" data-toggle="modal"
        data-target=".bd-example-modal-lg">More
        details</button>
</div>
</div>
<div class="card">
<img class="card-img-top" src="${response.hits[2].recipe.image}"
    alt="Card image cap">
<div class="card-body">
    <h5 class="card-title" id="salad5">${response.hits[2].recipe.label}</h5>
    <div class="text-center" id="meal-type">Meal type: ${response.hits[2].recipe.mealType}</div>
    <div class ="text-center" id="diet-labels"> ${response.hits[2].recipe.dietLabels}</div>
    <div class ="text-center" id="ingredients" style="font-size: 0.9rem;"><h6>Ingredients:</h6> ${response.hits[2].recipe.ingredientLines}</div>
    <br>
    <button type="button" class="btn btn-secondary" data-toggle="modal"
        data-target=".bd-example-modal-lg">More
        details</button>
</div>
</div>
</div>
<div class="card-group"><div class="card">
<img class="card-img-top" src="${response.hits[3].recipe.image}"
    alt="Card image cap">
<div class="card-body">
    <h5 class="card-title" id="salad5">${response.hits[3].recipe.label}</h5>
    <div class="text-center" id="meal-type">Meal type: ${response.hits[3].recipe.mealType}</div>
    <div class ="text-center" id="diet-labels"> ${response.hits[3].recipe.dietLabels}</div>
    <div class ="text-center" id="ingredients" style="font-size: 0.9rem;"><h6>Ingredients:</h6> ${response.hits[3].recipe.ingredientLines}</div>
    <br>
    <button type="button" class="btn btn-secondary" data-toggle="modal"
        data-target=".bd-example-modal-lg">More
        details</button>
</div>
</div>
<div class="card">
<img class="card-img-top" src="${response.hits[9].recipe.image}"
    alt="Card image cap">
<div class="card-body">
    <h5 class="card-title" id="salad5">${response.hits[9].recipe.label}</h5>
    <div class="text-center" id="meal-type">Meal type: ${response.hits[9].recipe.mealType}</div>
    <div class ="text-center" id="diet-labels"> ${response.hits[9].recipe.dietLabels}</div>
    <div class ="text-center" id="ingredients" style="font-size: 0.9rem;"><h6>Ingredients:</h6> ${response.hits[9].recipe.ingredientLines}</div>
    <br>
    <button type="button" class="btn btn-secondary" data-toggle="modal"
        data-target=".bd-example-modal-lg">More
        details</button>
</div>
</div>
<div class="card">
<img class="card-img-top" src="${response.hits[5].recipe.image}"
    alt="Card image cap">
<div class="card-body">
    <h5 class="card-title" id="salad5">${response.hits[5].recipe.label}</h5>
    <div class="text-center" id="meal-type">Meal type: ${response.hits[5].recipe.mealType}</div>
    <div class ="text-center" id="diet-labels"> ${response.hits[5].recipe.dietLabels}</div>
    <div class ="text-center" id="ingredients" style="font-size: 0.9rem;"><h6>Ingredients:</h6> ${response.hits[5].recipe.ingredientLines}</div>
    <br>
    <button type="button" class="btn btn-secondary" data-toggle="modal"
        data-target=".bd-example-modal-lg">More
        details</button>
</div>
</div>
</div>`
    document.querySelector('#recipe-container').innerHTML = childNode;
    // recipeContainer.html(childNode);
    });
});
