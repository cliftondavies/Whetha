import 'regenerator-runtime/runtime';
import './assets/css/reset.css';
import './assets/css/style.css';
import content from './content';
import ui from './ui';

content.weatherPage();

// const temperature = { unit: 'celsius' }; // here or elsewhere?
// const temperatureToggle = document.querySelector('.temperature-toggle-wrap');
// const searchBar = document.querySelector('.search-bar');

window.addEventListener('load', ui.userLocation);

// temperatureToggle.addEventListener('click', e => {
//   if (temperature unit is equal to celsius) {
//     const fahrenheit = Math.floor(celsiusToFahrenheit(weather temperature in celsius));
//     find and convert all/main temperature content in celsius to fahrenheit
//   } else {
//     change all fahrenheit back to original celsius value (stored in data attribute maybe)
//     and reset weather unit to celsius
//   }
// });

// searchBar.addEventListener('keypress', async e => {
//   if (e.keyCode == 13) {
//     const weatherObj = await getWeather(searchBar.value);
//     displayWeather(weatherObj);
//   }
// });
