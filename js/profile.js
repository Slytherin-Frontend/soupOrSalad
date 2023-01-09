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

const btn = document.querySelector('#btn');
btn.addEventListener('click', (event) => {
    let checkboxes = document.querySelectorAll('input[name="color"]:checked');
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    localStorage.setItem('person', values);;
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
                let locName = [selectedArray.name+", "+selectedArray.country_code]
                localStorage.setItem("lat", lat)
                localStorage.setItem("lon", lon)
                localStorage.setItem("placeName",locName)
                localStorage.setItem("timezone",timeZone)
                
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
    search: function(){
        this.fetchLocation(
            document.querySelector(".city-bar").value,document.querySelector(".country-bar").value)
    }

}


//defining the variables which take data from client storage
let userLat = localStorage.getItem("lat")
let userLon = localStorage.getItem("lon")
let userLocName = localStorage.getItem("placeName")
let userTimeZone = localStorage.getItem("timezone")


// weather code descriptions
let weatherCodes = {
0:"Clear sky",
1:"Mainly clear",
2:"Partly cloudy",
3:"Overcast",
45:"Fog",
48:"Depositing rime fog",
51:"Light drizzle",
53:"Moderate drizzle",
55:"Dense drizzle",
56:"Light, freezing drizzle",
57:"Dense, freezing drizzle",
61:"Slight rain",
63:"Moderate rain", 
65:"Heavy rain",
66:"Light, freezing drizzle", 
67:"Heavy, freezing drizzle",
71:"Slight snowfall", 
73:"Moderate snowfall", 
75:"Heavy snowfall",
77:"Snow grains",
80:"Slight rain",
81:"Moderate rain", 
82:"Violent rain",
85:"Slight snow showers", 
86:"Heavy snow showers",
95:"Slight to moderate thunderstorm",
96:"Thunderstorm with slight hail", 
99: "Thunderstorm with heavy hail"
}

//weather api call
let weather = {
    fetchWeather: function () {
        if (userLat&&userLon&&userTimeZone != null){
        fetch("https://api.open-meteo.com/v1/forecast?latitude=" +userLat + "&longitude=" +userLon + "&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&current_weather=true&timezone="+userTimeZone
        ).then((response) => response.json()).then((data) => this.displayWeather(data));
    }
        else{}
    
},
    displayWeather: function (data) {
        const {temperature,time,windspeed,weathercode} = data.current_weather;
        const {temperature_2m_max,temperature_2m_min,precipitation_sum} = data.daily;
        
        console.log(time.slice(11,16),temperature,windspeed,temperature_2m_max[0],temperature_2m_min[0],precipitation_sum[0]);
        console.log(data);
        document.querySelector(".city").innerHTML="weather in:\n"+userLocName;
        document.querySelector(".weatherNow").innerHTML="weather now:\n"+weatherCodes[weathercode];
        document.querySelector(".temp").innerHTML="temp now:\n"+temperature+"°C";
        document.querySelector(".maxTemp").innerHTML="max temp today:\n"+temperature_2m_max[0]+"°C";
        document.querySelector(".minTemp").innerHTML="min temp today:\n"+temperature_2m_min[0]+"°C";
        document.querySelector(".precipitation").innerHTML="total rain today:\n"+precipitation_sum[0]+"mm";
        document.querySelector(".wind").innerHTML="max windspeed:\n"+windspeed+"km/h";
    },
    
}



window.onload = function (){
    weather.fetchWeather();
}

document.querySelector(".search button").addEventListener("click",function(){
    userLocation.search();
})

document.querySelector(".search button").addEventListener("click",function(){
    document.querySelector(".resultList").innerHTML="Search result:"
})

document.querySelector(".save").addEventListener("click", function(){
    location.reload()
})


// timer to refresh the page 
setTimeout(() => {
    document.location.reload();
  }, 900000);