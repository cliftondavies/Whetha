import content from './content';

const ui = (() => {
  // api.js ?
  // search weather for a location by longitude and latitude
  const getWeather = async (latitude, longitude) => {
    const apiKey = process.env.API_KEY; // 'fba0df8efddb9062b4252bb8fd70457c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const weatherJson = await fetch(apiUrl);
    const weatherData = await weatherJson.json();
    return weatherData;
  };

  // search weather for a location by city
  const searchWeather = async (city) => {
    const apiKey = process.env.API_KEY; // 'fba0df8efddb9062b4252bb8fd70457c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherJson = await fetch(apiUrl);
    const weatherData = await weatherJson.json();
    return weatherData;
  };

  // show default location - location

  const displayWeather = ({
    main, name, timezone, sys, weather, wind,
  }) => {
    const location = document.querySelector('.location');
    const time = document.querySelector('.time');
    const temp = document.querySelector('.current-weather-temp');
    const feel = document.querySelector('.feels-like');
    const min = document.querySelector('.temp-min');
    const max = document.querySelector('.temp-max');
    const description = document.querySelector('.description');
    const pressure = document.querySelector('.pressure');
    const humidity = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.wind');
    content.weatherContent(location, time, temp, feel, min, max, description, pressure, humidity, windSpeed,
      main, name, timezone, sys, weather, wind);
  };

  // geolocation.js ?
  const userWeather = async (position) => {
    const { latitude, longitude } = position.coords;
    const weatherObj = await getWeather(latitude, longitude);
    console.log(weatherObj);
    displayWeather(weatherObj);
  };

  const geolocationError = (error) => {
    //alert(error.message);
  };

  // allow geolocation
  const userLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(userWeather, geolocationError);
    } else {
      //alert('Geolocation not supported');
    }
  };

  // convert celsius to fahrenheit and vice versa
  const celsiusToFahrenheit = (temperature) => (temperature * (9 / 5)) + 32;

  // toggle temperature unit
  // const temperatureUnit = (currentTempUnit) => {
  //   get all elements with class temperature
  //   if currentTempUnit is c
  //     iterate through elements
  //     get element temperature string as digit
  //     convert element temp to fahrenheit
  //     update content of element
  //   else
  //     iterate through elements
  //     get element temperature string as digit
  //     set element back to temp value retrieve from api
  //     update content of element
  //   end
  // };

  // change background image of current weather section based on weather type

  // toggle menu

  // set icon method - hereor in coontent is the method necessary?

  // clear input
  return {
    userLocation,
    searchWeather,
    displayWeather,
  };
})();

export { ui as default };
