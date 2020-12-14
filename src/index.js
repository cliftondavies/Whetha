import 'regenerator-runtime/runtime';
import './assets/css/reset.css';
import './assets/css/style.css';
import content from './content';
import ui from './ui';

content.weatherPage();

const searchBar = document.querySelector('.search-bar');
const temperatureToggle = document.querySelector('.temperature-toggle-wrap');
const menuToggle = document.querySelector('.menu-toggle');

window.addEventListener('load', () => {
  ui.defaultWeather().catch(ui.errorHandler);
  ui.userLocation();
});

searchBar.addEventListener('keypress', async (e) => {
  if (e.keyCode === 13) {
    try {
      const weatherData = await ui.getWeatherByCityName(searchBar.value);
      ui.renderWeatherData(weatherData);
      ui.clearSearchInput(searchBar);
    } catch (error) {
      ui.errorHandler(error);
    }
  }
});

temperatureToggle.addEventListener('click', e => {
  ui.toggleTemperatureUnit(e.target.dataset.unit);
});

menuToggle.addEventListener('click', ui.toggleMenu);
