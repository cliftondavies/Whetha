// move all weather related methods (apart from renderWeatherData) to weather.js
// move userLocation to geolocation.js
import content from './content';

const ui = (() => {
  const getWeatherByCoords = async (latitude, longitude) => {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const weatherJson = await fetch(apiUrl);
    const weatherData = await weatherJson.json();
    return weatherData;
  };

  const getWeatherByCityName = async (city) => {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherJson = await fetch(apiUrl);
    const weatherData = await weatherJson.json();
    return weatherData;
  };

  const renderWeatherData = ({
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

  const defaultWeather = async () => {
    const londonWeather = await getWeatherByCityName('London');
    renderWeatherData(londonWeather);
  };

  const userWeather = async (position) => {
    const { latitude, longitude } = position.coords;
    const weatherData = await getWeatherByCoords(latitude, longitude);
    renderWeatherData(weatherData);
  };

  const userLocation = () => {
    if ('geolocation' in navigator) { navigator.geolocation.getCurrentPosition(userWeather); }
  };

  const toggleTemperatureUnit = (unit) => {
    const temperatureToggleWrap = document.querySelector('.temperature-toggle-wrap');
    const temperatureToggle = document.querySelector('.temperature-toggle');
    const temperatures = document.querySelectorAll('[data-temperature]');

    if (unit === 'celsius') {
      Array.from(temperatures).forEach(temperature => {
        const fahrenheit = (Number(temperature.textContent.match(/[0-9]/g).join('')) * (9 / 5)) + 32;
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

  const toggleMenu = () => {
    const toggleOpen = document.querySelector('.toggle-open');
    const toggleClose = document.querySelector('.toggle-close');
    const menu = document.querySelector('.menu-hide');
    content.toggleClass(toggleOpen, 'toggle-hide');
    content.toggleClass(toggleClose, 'toggle-hide');
    content.toggleClass(menu, 'menu-show');
  };

  const clearSearchInput = (inputElement) => {
    inputElement.value = '';
    inputElement.blur();
  };

  return {
    userLocation,
    getWeatherByCityName,
    renderWeatherData,
    defaultWeather,
    toggleTemperatureUnit,
    toggleMenu,
    clearSearchInput,
  };
})();

export { ui as default };
