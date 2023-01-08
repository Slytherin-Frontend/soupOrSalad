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

}


//defining the variables which take data from client storage
let userLat = localStorage.getItem("lat")
let userLon = localStorage.getItem("lon")
let userLocName = localStorage.getItem("placeName")
let userTimeZone = localStorage.getItem("timezone")


//weather api call
let weather = {
    fetchWeather: function () {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=" +userLat + "&longitude=" +userLon + "&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&current_weather=true&timezone="+userTimeZone
        ).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        var name = userLocName;
        const {temperature,time,windspeed} = data.current_weather;
        const {temperature_2m_max,temperature_2m_min,precipitation_sum} = data.daily;
        
        console.log(name,temperature,time.slice(11,16),windspeed,temperature_2m_max[0],temperature_2m_min[0],precipitation_sum[0])
        console.log(data)
    }
}
