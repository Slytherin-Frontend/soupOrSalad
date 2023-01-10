// console.log('Hello world');
function storageAvailable(type) {
  let storage;
  try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch (e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
}
else {
  // Too bad, no localStorage for us
}


console.log(storageAvailable('sessionStorage'))


// health preferences list
let healthPreferences =
  { 'Alcohol-Cocktail': 'alcohol-cocktail', 'Alcohol-Free': 'alcohol-free', 'Celery-Free': 'celery-free', 'Crustcean-Free': 'crustacean-free', 'Dairy-Free': 'dairy-free', 'DASH': 'DASH', 'Egg-Free': 'egg-free', 'Fish-Free': 'fish-free', 'FODMAP-Free': 'fodmap-free', 'Gluten-Free': 'gluten-free', 'Immuno-Supportive': 'immuno-supportive', 'Keto-Friendly': 'keto-friendly', 'Kidney-Friendly': 'kidney-friendly', 'Kosher': 'kosher', 'Low Potassium': 'low-potassium', 'Low Sugar': 'low-sugar', 'Lupine-Free': 'lupine-free', 'Mediterranean': 'Mediterranean', 'Mollusk-Free': 'mollusk-free', 'Mustard-Free': 'mustard-free', 'No oil added': 'No-oil-added', 'Paleo': 'paleo', 'Peanut-Free': 'peanut-free', 'Pescatarian': 'pecatarian', 'Pork-Free': 'pork-free', 'Red-Meat-Free': 'red-meat-free', 'Sesame-Free': 'sesame-free', 'Shellfish-Free': 'shellfish-free', 'Soy-Free': 'soy-free', 'Sugar-Conscious': 'sugar-conscious', 'Sulfite-Free': 'sulfite-free', 'Tree-Nut-Free': 'tree-nut-free', 'Vegan': 'vegan', 'Vegetarian': 'vegetarian', 'Wheat-Free': 'wheat-free', }

// diet preferences list
let dietPreferences =
  { 'Balanced': 'balanced', 'High-Fiber': 'high-fiber', 'High-Protein': 'high-protein', 'Low-Carb': 'low-carb', 'Low-Fat': 'low-fat', 'Low-Sodium': 'low-sodium', }


// dynamically creating checkboxes once page loads
// diet
$(document).ready(function () {
  $('#edit-diet').ready(function () {
      var list = ['High-Fiber', 'High-Protein', 'Balanced', 'Low-Carb', 'Low-Fat', 'Low-Sodium'];
      for (let value of list) {
          $('#diet-container')
              .append(`<div class="preference-checkbox"><input type="checkbox" id="${value}" name="diet" class"preference" value="${dietPreferences[value]}">`)
              .append(`<label for="${value}">${value}</label></div>`);
      }

  })
});



//health
$(document).ready(function () {
  $('#edit-diet').ready(function () {
      var list = ['Alcohol-Cocktail','Alcohol-Free','Celery-Free','Crustcean-Free','Dairy-Free','DASH','Egg-Free','Fish-Free','FODMAP-Free','Gluten-Free','Immuno-Supportive','Keto-Friendly','Kidney-Friendly','Kosher','Low Potassium','Low Sugar','Lupine-Free','Mediterranean','Mollusk-Free','Mustard-Free','No oil added','Paleo','Peanut-Free','Pescatarian','Pork-Free','Red-Meat-Free','Sesame-Free','Shellfish-Free','Soy-Free','Sugar-Conscious','Sulfite-Free','Tree-Nut-Free','Vegan','Vegetarian','Wheat-Free',];
      for (let value of list) {
          $('#health-container')
              .append(`<div class="preference-checkbox"><input type="checkbox" id="${value}" name="health" class"preference" value="${healthPreferences[value]}">`)
              .append(`<label for="${value}">${value}</label></div>`);
      }

  })
});

//cuisine

$(document).ready(function () {
  $('.diet-preferences').ready(function () {
      var list = ['american','asian','british','caribbean','central europe','chinese','eastern europe','french','greek','indian','italian','japanese','korean','kosher','mediterranean','mexican','middle eastern','nordic','south american','south east asian','world',];
      for (let value of list) {
          $('#cuisine-container')
              .append(`<div class="preference-checkbox"><input type="checkbox" id="${value}" name="cuisine" class"preference" value="${value}">`)
              .append(`<label for="${value}">${value}</label></div>`);
      }

  })
});




const btn = document.querySelector('#save-diet');
// diet save
btn.addEventListener('click', (event) => {
  let checkboxes = document.querySelectorAll('input[name="diet"]:checked');
  let queryVal = "";
  checkboxes.forEach((checkbox) => {
      queryVal += "&diet=" + checkbox.value;
  });
  localStorage.setItem('dietQuery', queryVal);
});

btn.addEventListener('click', (event) => {
  let checkboxes = document.querySelectorAll('input[name="diet"]:checked');
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value)
  });
  localStorage.setItem('diet', values);
});

// health save
btn.addEventListener('click', (event) => {
  let checkboxes = document.querySelectorAll('input[name="health"]:checked');
  let queryVal = "";
  checkboxes.forEach((checkbox) => {
      queryVal += "&health=" + checkbox.value;
  });
  localStorage.setItem('healthQuery', queryVal);
});

btn.addEventListener('click', (event) => {
  let checkboxes = document.querySelectorAll('input[name="health"]:checked');
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value)
  });
  localStorage.setItem('health', values);
});

// cuisine save
btn.addEventListener('click', (event) => {
  let checkboxes = document.querySelectorAll('input[name="cuisine"]:checked');
  let queryVal = "";
  checkboxes.forEach((checkbox) => {
      queryVal += "&cuisine=" +  checkbox.value;
  });
  localStorage.setItem('cuisineQuery', queryVal);
});

btn.addEventListener('click', (event) => {
  let checkboxes = document.querySelectorAll('input[name="cuisine"]:checked');
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value)
  });
  localStorage.setItem('cuisine', values);
});




// weather & location APIs
let userLocation = {
  // case insensitive filteration of the api city search response to yield single city in given country.
  countryFilter: function (userCountry, responseArray) {
      let selectedArray = {};
      for (let i = 0; i < responseArray.length; i++) {
          compResponse = responseArray[i].country
          if (compResponse.toUpperCase() == userCountry.toUpperCase()) {
              selectedArray = responseArray[i]
              let lat = [selectedArray.latitude]
              let lon = [selectedArray.longitude]
              let timeZone = [selectedArray.timezone]
              let locName = [selectedArray.name + ", " + selectedArray.country_code]
              localStorage.setItem("lat", lat)
              localStorage.setItem("lon", lon)
              localStorage.setItem("placeName", locName)
              localStorage.setItem("timezone", timeZone)

          }
      }
  },
  // fetching city info from api paired with country filtering
  fetchLocation: function (userCity, userCountry) {
      fetch(
          "https://geocoding-api.open-meteo.com/v1/search?name=" + userCity).then((response) => response.json()).then((data) => (this.countryFilter(userCountry, data.results)
          ))

  },
  displayLocation: function (data) {
      const { name } = data;
  },
  search: function () {
      this.fetchLocation(
          document.querySelector(".city-bar").value, document.querySelector(".country-bar").value)
  }

}


//defining the variables which take data from client storage
let userLat = localStorage.getItem("lat")
let userLon = localStorage.getItem("lon")
let userLocName = localStorage.getItem("placeName")
let userTimeZone = localStorage.getItem("timezone")


// weather code descriptions
let weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light, freezing drizzle",
  57: "Dense, freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light, freezing drizzle",
  67: "Heavy, freezing drizzle",
  71: "Slight snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain",
  81: "Moderate rain",
  82: "Violent rain",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Slight to moderate thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
}

//weather api call
let weather = {
  fetchWeather: function () {
      if (userLat && userLon && userTimeZone != null) {
          fetch("https://api.open-meteo.com/v1/forecast?latitude=" + userLat + "&longitude=" + userLon + "&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&current_weather=true&timezone=" + userTimeZone
          ).then((response) => response.json()).then((data) => this.displayWeather(data));
      }
      else { }

  },
  displayWeather: function (data) {
      const { temperature, time, windspeed, weathercode } = data.current_weather;
      const { temperature_2m_max, temperature_2m_min, precipitation_sum } = data.daily;

      console.log(time.slice(11, 16), temperature, windspeed, temperature_2m_max[0], temperature_2m_min[0], precipitation_sum[0]);
      console.log(data);
      localStorage.setItem("temp",temperature_2m_max[0])
      document.querySelector(".city").innerHTML = "weather in:\n" + userLocName;
      document.querySelector(".weatherNow").innerHTML = "weather now:\n" + weatherCodes[weathercode];
      document.querySelector(".temp").innerHTML = "temp now:\n" + temperature + "°C";
      document.querySelector(".maxTemp").innerHTML = "max temp today:\n" + temperature_2m_max[0] + "°C";
      document.querySelector(".minTemp").innerHTML = "min temp today:\n" + temperature_2m_min[0] + "°C";
      document.querySelector(".precipitation").innerHTML = "total rain today:\n" + precipitation_sum[0] + "mm";
      document.querySelector(".wind").innerHTML = "max windspeed:\n" + windspeed + "km/h";
  },


}


// automatically kicks off the fetch weather function so the info is populated. if there is no stored data, a message is shown to direct user to the update location button
window.onload = function () {
  weather.fetchWeather();
}

document.querySelector(".search button").addEventListener("click", function () {
  userLocation.search();
})

document.querySelector(".search button").addEventListener("click", function () {
  document.querySelector(".resultList").innerHTML = "Search result:"
})

document.querySelector(".save").addEventListener("click", function () {
  location.reload()
})


// timer to refresh the page 
setTimeout(() => {
  document.location.reload();
}, 900000);



// suggested recipe filtering objects
let userDiet = localStorage.getItem("dietQuery")
let userHealth = localStorage.getItem("healthQuery")
let userCuisine = localStorage.getItem("cuisineQuery")
let userTemp = localStorage.getItem("temp")

let recipe = {
  
  fetchRecipe: function(){
      fetch("https://api.edamam.com/api/recipes/v2?type=public&app_id=5c1f4878&app_key=d220cee0e567234581f36d1404f5f7b3"+userDiet+userHealth+userCuisine+this.soupSalad()).then((response) => response.json()).then((data) => console.log(data));
},
  soupSalad: function(){
      console.log(typeof userTemp)
      choice= "&dishType="
      // "+" turns the temp from a string into a number which can be used for comparson
      if(+userTemp >18){
          choice +="salad"
          localStorage.setItem("choice","SALAD")
          return choice
      } else{
          choice +="soup"
          localStorage.setItem("choice","SOUP")
          return choice
      }

  }


}

//end of Victoria code

var recipeBtn = document.querySelector('#find-recipe');


var recipeContainer = $('#recipe-container');

// var childNode = `<div class="row time-block">
// <div class="col-md-1 hour" id="${hourEl}">${hourEl}</div>
// <textarea class="col-md-10 description ${stageOfTime} text-${hourEl}" id ="hour-${hourEl}"></textarea>
// <button class="btn saveBtn col-md-1 btn-${hourEl}">
//     <i class="fas fa-save"></i>
// </button>
// </div>`;

recipeContainer.append(childNode);

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
    $()
    });
});
