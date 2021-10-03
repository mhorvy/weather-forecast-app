var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#weather");
var weatherResultContainerEl = document.querySelector("#weather-container");
var weatherResultSearchTerm = document.querySelector("#weather-search-term");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var city = nameInputEl.value.trim();

  if (city) {
    getcityweatherResult(city);

    // clear old content
    weatherResultContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

var getcityweatherResult = function(city) {
  // format the github api url
  var apiUrl = "api.openweathermap.org/data/2.5/forecast?q={Minneapolis}}&appid=${0aca813a353ceacb0a70838ee064eccc}";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayweatherResult(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather");
    });
};

var displayweatherResult = function(weatherResult, searchTerm) {
  // check if api returned any weatherResult
  if (weatherResult.length === 0) {
    weatherResultContainerEl.textContent = "No weatherResultitories found.";
    return;
  }

  weatherResultSearchTerm.textContent = searchTerm;

  // loop over weatherResult
  for (var i = 0; i < weatherResult.length; i++) {
    // format weatherResult name
    var weatherResultName = weatherResult[i].owner.login + "/" + weatherResult[i].name;

    // create a container for each weatherResult
    var weatherResultEl = document.createElement("div");
    weatherResultEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold weatherResults
    var titleEl = document.createElement("span");
    titleEl.textContent = weatherResultName;

    // append to container
    weatherResultEl.appendChild(titleEl);

    // create a  element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // append to container
    weatherResultEl.appendChild(statusEl);

    // append container to the dom
    weatherResultContainerEl.appendChild(weatherResultEl);
  }
};

// add event listeners to forms
cityFormEl.addEventListener("submit", formSubmitHandler);
