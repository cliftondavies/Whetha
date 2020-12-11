import content from './content';

const ui = (() => {
  // api.js ?
  // search weather for a location by longitude and latitude
  const getWeather = async (latitude, longitude) => {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const weatherJson = await fetch(apiUrl);
    const weatherData = await weatherJson.json();
    return weatherData;
  };

  // search weather for a location by city
  const searchWeather = async (city) => {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherJson = await fetch(apiUrl);
    const weatherData = await weatherJson.json();
    return weatherData;
  };

  const displayWeather = ({
    main, name, timezone, sys, weather, wind,
  }) => {
    const location = document.querySelector('.location');
    const time = document.querySelector('.time');
    const temp = document.querySelector('.current-weather-temp');
    const feel = document.querySelector('.feel-temp');
    const min = document.querySelector('.temp-min');
    const max = document.querySelector('.temp-max');
    const description = document.querySelector('.description');
    const pressure = document.querySelector('.pressure');
    const humidity = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.wind');
    content.weatherContent(location, time, temp, feel, min, max, description, pressure, humidity,
      windSpeed, main, name, timezone, sys, weather, wind);
  };

  // show default location - location
  const defaultLocation = async () => {
    const londonWeather = await searchWeather('London');
    displayWeather(londonWeather);
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

  // toggle temperature unit
  const toggleTemperatureUnit = (unit) => {
    const temperatureToggleWrap = document.querySelector('.temperature-toggle-wrap');
    const temperatureToggle = document.querySelector('.temperature-toggle');
    const temperatures = document.querySelectorAll('[data-temperature]');
    console.log(temperatures);

    if (unit === 'celsius') {
      Array.from(temperatures).forEach(temperature => {
        const digit = temperature.textContent.match(/[0-9]/g).join('');
        console.log(digit);
        const fahrenheit = (Number(digit) * (9 / 5)) + 32;
        temperature.textContent = `${Math.round(fahrenheit)}\u00B0 F`;
        temperatureToggleWrap.setAttribute('data-unit', 'fahrenheit');
        temperatureToggle.setAttribute('data-unit', 'fahrenheit');
      });
    } else {
      Array.from(temperatures).forEach(temperature => {
        temperature.textContent = `${temperature.dataset.temp}\u00B0 C`;
        temperatureToggleWrap.setAttribute('data-unit', 'celsius');
        temperatureToggle.setAttribute('data-unit', 'celsius');
      });
    }
    content.toggleClass(temperatureToggleWrap, 'temp-toggle-one');
    content.toggleClass(temperatureToggle, 'temp-toggle-two');
  };

  // change background image of current weather section based on weather type

  // toggle menu

  // clear input
  return {
    userLocation,
    searchWeather,
    displayWeather,
    defaultLocation,
    toggleTemperatureUnit,
  };
})();

export { ui as default };
