// console.log('Hello world');

var recipeBtn = document.querySelector('#find-recipe');

recipeBtn.addEventListener('click', function(event){
event.preventDefault();
// console.log('submitted');

var inputText = document.querySelector('#input-box').value;
// console.log(inputText);
 
const id = "1b0fa889";

const key = "c7c8044eb4a22528a8ccc3bbdee4c57b";

// construct URL
 var queryURL = `https://api.edamam.com/search?q=${inputText}&app_id=${id}&app_key=${key}&from=0&to=20`;

 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    });
});
