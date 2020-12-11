import 'regenerator-runtime/runtime';
import './assets/css/reset.css';
import './assets/css/style.css';
import content from './content';
import ui from './ui';

content.weatherPage();

// const temperature = { unit: 'celsius' }; // here or elsewhere?
const searchBar = document.querySelector('.search-bar');
const temperatureToggle = document.querySelector('.temperature-toggle-wrap');

window.addEventListener('load', () => {
  ui.defaultLocation();
  ui.userLocation();
});

// temperatureToggle.addEventListener('click', e => {
//   if (temperature unit is equal to celsius) {
//     const fahrenheit = Math.floor(celsiusToFahrenheit(weather temperature in celsius));
//     find and convert all/main temperature content in celsius to fahrenheit
//   } else {
//     change all fahrenheit back to original celsius value (stored in data attribute maybe)
//     and reset weather unit to celsius
//   }
// });

searchBar.addEventListener('keypress', async (e) => {
  if (e.keyCode === 13) {
    const weatherObj = await ui.searchWeather(searchBar.value);
    ui.displayWeather(weatherObj);
    searchBar.value = '';
    searchBar.blur();
  }
});

temperatureToggle.addEventListener('click', e => {
  console.log(e.target.dataset.unit);
  ui.toggleTemperatureUnit(e.target.dataset.unit);
});
