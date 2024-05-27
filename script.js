document.addEventListener("DOMContentLoaded", () => {
  function displayWelcomePopup() {
    alert(`Welcome to my website! 
        
This is very basic web project developed using HTML, CSS, and JS for demonstrating Weather fetching. 
It gives weather of the searched city with its humidity and wind speed.
        
`);
  }

  const inputBox = document.querySelector(".input-box");
  const searchBtn = document.getElementById("searchBtn");
  const weather_img = document.querySelector(".weather-img");
  const temperature = document.querySelector(".temperature");
  const description = document.querySelector(".description");
  const humidity = document.getElementById("humidity");
  const wind_speed = document.getElementById("wind-speed");
  const location_not_found = document.querySelector(".location-not-found");
  const weather_body = document.querySelector(".weather-body");

  async function checkWeather(city) {
    const api_key = "14e0ba8d6d57cf456f552de5b7c10053";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then((response) =>
      response.json()
    );
    if (weather_data.cod === `404`) {
      location_not_found.style.display = "flex";
      weather_body.style.display = "none";
      console.log("error");
      return;
    }
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}KM/H`;
    switch (weather_data.weather[0].main) {
      case "Clouds":
        weather_img.src = "Images/cloud.png";
        break;
      case "Clear":
        weather_img.src = "Images/clear.png";
        break;
      case "Rain":
        weather_img.src = "Images/rain.png";
        break;
      case "Mist":
        weather_img.src = "Images/mist.png";
        break;
      case "Snow":
        weather_img.src = "Images/snow.png";
        break;
    }

    console.log(weather_data);
  }
  searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
  });
  displayWelcomePopup();
});
