var searchInput = document.querySelector("#searchInput");
var searchBtn = document.querySelector("#searchBtn");

var city = "Cairo"; // Default city

// Fetch weather when the page loads
document.addEventListener("DOMContentLoaded", function () {
  getWeather();
});

searchBtn.addEventListener("click", function () {
  city = searchInput.value.trim();
  if (city) {
    getWeather();
  } else {
    alert("Please enter a city name.");
  }
});

async function getWeather() {
  try {
    var w = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=5928f664f16642a0a2c134656240512&q=${city}&days=3`
    );

    if (!w.ok) throw new Error("Invalid API response");

    var res = await w.json();

    if (!res.forecast || !res.location) throw new Error("Invalid city name");

    if (res.forecast.forecastday.length < 3) {
      alert("Weather forecast is unavailable for this location.");
      return;
    }

    display(res);
  } catch (error) {
    alert("Error fetching weather data. Please check the city name.");
  }
}

function display(res) {
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var foreCastDay = res.forecast.forecastday;

  var d0 = new Date(foreCastDay[0].date);
  var d1 = new Date(foreCastDay[1].date);
  var d2 = new Date(foreCastDay[2].date);

  var dayName0 = days[d0.getDay()];
  var dayName1 = days[d1.getDay()];
  var dayName2 = days[d2.getDay()];

  var monthName = months[d0.getMonth()];

  var box1 = `
  <div class="date rounded-start d-flex justify-content-between p-2 pb-0">
    <p class="day">${dayName0}</p>
    <p class="month">${monthName}</p>
  </div>
  <div class="ms-3 day-info">
    <p class="fw-semibold fs-4 m-0 mt-3">${res.location.name}</p>
    <p class="temp fw-bold text-white">
      ${res.current.temp_c}°C
      <img class="ms-3" src="https:${res.current.condition.icon}" alt="" />
    </p>
    <span class="weather-state">${res.current.condition.text}</span>
    <div class="mt-2">
      <span class="me-3">
        <i class="fa-solid fa-umbrella me-2"></i>${res.current.humidity}%
      </span>
      <span class="me-3">
        <i class="fa-solid fa-wind"></i> ${res.current.wind_kph} km/h
      </span>
      <span class="me-3">
        <i class="fa-regular fa-compass"></i> ${res.current.wind_dir}
      </span>
    </div>
  </div>`;

  var box2 = `
  <div class="date rounded-end d-flex flex-column align-items-center justify-content-center">
    <p class="day mt-2">${dayName1}</p>
  </div>
  <div class="day-info text-center mt-5">
    <img class="day-info-img" src="https:${foreCastDay[1].day.condition.icon}" alt="" />
    <p class="temp2 fw-bold text-white m-0">${foreCastDay[1].day.maxtemp_c}°C</p>
    <p class="temp2 fw-lighter fs-6 m-0">${foreCastDay[1].day.mintemp_c}°C</p>
    <span class="weather-state">${foreCastDay[1].day.condition.text}</span>
  </div>`;

  var box3 = `
  <div class="date rounded-end d-flex flex-column align-items-center justify-content-center">
    <p class="day mt-2">${dayName2}</p>
  </div>
  <div class="day-info text-center mt-5">
    <img class="day-info-img" src="https:${foreCastDay[2].day.condition.icon}" alt="" />
    <p class="temp2 fw-bold text-white m-0">${foreCastDay[2].day.maxtemp_c}°C</p>
    <p class="temp2 fw-lighter fs-6 m-0">${foreCastDay[2].day.mintemp_c}°C</p>
    <span class="weather-state">${foreCastDay[2].day.condition.text}</span>
  </div>`;

  document.getElementById("box1").innerHTML = box1;
  document.getElementById("box2").innerHTML = box2;
  document.getElementById("box3").innerHTML = box3;
}
