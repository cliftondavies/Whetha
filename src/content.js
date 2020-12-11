const { Skycons } = window;

const content = (() => {
  const htmlElement = (tag, klass, textContent = '', id = '') => {
    const element = document.createElement(tag);
    if (id) element.id = id;
    element.className = klass;
    if (textContent) element.textContent = textContent;
    return element;
  };

  const overallWrap = htmlElement('div', 'overall-wrap');
  const mainPage = htmlElement('main', 'main-wrap');

  document.body.appendChild(overallWrap);
  overallWrap.appendChild(mainPage);

  const conditions = {
    Clear: 'CLEAR_DAY',
    Clouds: 'CLOUDY',
    '50d': 'FOG',
    Snow: 'SNOW',
    Rain: 'RAIN',
    Drizzle: 'RAIN',
    Thunderstorm: 'THUNDER_RAIN',
  };

  const measurementDetail = (heading, measure, measureClass) => {
    const detail = htmlElement('div', 'measurement-detail');
    const detailHeading = htmlElement('span', 'detail-heading', heading);
    const detailMeasure = htmlElement('span', measureClass, measure);
    detail.appendChild(detailHeading);
    detail.appendChild(detailMeasure);
    return detail;
  };

  const forecastDetail = (dayText, iconClass, iconID, tempText) => {
    const forecast = htmlElement('div', 'forecast-card');
    const day = htmlElement('span', 'day', dayText);
    const icon = htmlElement('canvas', iconClass, '', iconID);
    icon.setAttribute('width', '128');
    icon.setAttribute('height', '128');
    const temp = htmlElement('span', 'forecast-temp', tempText);
    forecast.appendChild(day);
    forecast.appendChild(icon);
    forecast.appendChild(temp);
    return forecast;
  };

  const savedListItem = (city) => {
    const savedListItem = htmlElement('li', 'saved-list-item');
    const cityName = htmlElement('button', 'city-name', city);
    cityName.setAttribute('type', 'button');
    savedListItem.appendChild(cityName);
    const deleteCity = htmlElement('button', 'delete-city', 'x');
    deleteCity.setAttribute('type', 'button');
    savedListItem.appendChild(deleteCity);
    return savedListItem;
  };

  const skycon = (iconID, description) => {
    const skycon = new Skycons({ monochrome: false });
    skycon.add(iconID, Skycons[description]);
    skycon.play();
  };

  const formattedDate = () => {
    const date = new Date();
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    const dateDigit = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${dateDigit} ${month} ${year}`;
  };

  const weatherContent = (location, time, temp, feel, min, max, description, pressure, humidity,
    windSpeed, main, name, timezone, sys, weather, wind) => {
    location.textContent = `${name}, ${sys.country}`;
    temp.textContent = `${Math.round(main.temp)}\u00B0 C`;
    temp.setAttribute('data-temp', Math.round(main.temp));
    feel.textContent = `${Math.round(main.feels_like)}\u00B0 C`;
    feel.setAttribute('data-temp', Math.round(main.feels_like));
    min.textContent = `${Math.round(main.temp_min)}\u00B0 C`;
    min.setAttribute('data-temp', Math.round(main.temp_min));
    max.textContent = `${Math.round(main.temp_max)}\u00B0 C`;
    max.setAttribute('data-temp', Math.round(main.temp_max));
    description.textContent = `${weather[0].description}`;
    pressure.textContent = `${main.pressure} HPA`;
    humidity.textContent = `${main.humidity}%`;
    windSpeed.textContent = `${Math.round(wind.speed)} M/S`;
    time.textContent = `UTC ${Math.round(timezone / 3600)}`;
    skycon('icon1', conditions[weather[0].main || weather[0].icon]);
  };

  const toggleClass = (element, className) => {
    element.classList.toggle(className);
  };

  const weatherPage = () => {
    const menuToggle = htmlElement('button', 'menu-toggle');
    overallWrap.appendChild(menuToggle);
    const toggleOpen = htmlElement('span', 'toggle-open', '\u2630');
    const toggleClose = htmlElement('span', 'toggle-close toggle-hide', 'X');
    menuToggle.appendChild(toggleOpen);
    menuToggle.appendChild(toggleClose);

    const currentWeather = htmlElement('section', 'current-weather');
    mainPage.appendChild(currentWeather);

    const locationTime = htmlElement('div', 'location-time');
    const location = htmlElement('span', 'location');
    const date = htmlElement('span', 'date');
    date.textContent = formattedDate();
    const time = htmlElement('span', 'time');
    locationTime.appendChild(location);
    locationTime.appendChild(date);
    locationTime.appendChild(time);

    const temperature = htmlElement('section', 'temperature');
    const temp = htmlElement('span', 'current-weather-temp');
    temp.setAttribute('data-temperature', '');

    const feelsLike = htmlElement('div', 'feels-like');
    const feel = htmlElement('span', 'feel', 'Feels like, ');
    const feelTemp = htmlElement('span', 'feel-temp');
    feelTemp.setAttribute('data-temperature', '');
    feelsLike.append(feel);
    feelsLike.append(feelTemp);
    const minMax = htmlElement('div', 'min-max');
    const tempMin = htmlElement('span', 'temp-min');
    const tempMax = htmlElement('span', 'temp-max');
    tempMax.setAttribute('data-temperature', '');
    tempMin.setAttribute('data-temperature', '');
    minMax.appendChild(tempMin);
    minMax.appendChild(tempMax);
    temperature.appendChild(temp);
    temperature.appendChild(feelsLike);
    temperature.appendChild(minMax);

    const details = htmlElement('section', 'details');
    const icon = htmlElement('canvas', 'icon-one', '', 'icon1');
    icon.setAttribute('width', '128');
    icon.setAttribute('height', '128');
    const description = htmlElement('span', 'description');

    const measurementDetails = htmlElement('div', 'measurement-details');
    const pressure = measurementDetail('Pressure', '', 'pressure');
    const humidity = measurementDetail('Humidity', '', 'humidity');
    const wind = measurementDetail('Wind', '', 'wind');
    measurementDetails.appendChild(pressure);
    measurementDetails.appendChild(humidity);
    measurementDetails.appendChild(wind);

    details.appendChild(icon);
    details.appendChild(description);
    details.appendChild(measurementDetails);

    currentWeather.appendChild(locationTime);
    currentWeather.appendChild(temperature);
    currentWeather.appendChild(details);

    skycon('icon1', 'PARTLY_CLOUDY_DAY');

    const forecast = htmlElement('section', 'forecast');
    mainPage.appendChild(forecast);
    const forecastOne = forecastDetail('Monday', 'icon2', 'icon2', '3\u00B0/14\u00B0');
    const forecastTwo = forecastDetail('Tuesday', 'icon3', 'icon3', '0\u00B0/17\u00B0');
    const forecastThree = forecastDetail('Wednesday', 'icon4', 'icon4', '4\u00B0/18\u00B0');
    const forecastFour = forecastDetail('Thursday', 'icon5', 'icon5', '8\u00B0/20\u00B0');
    const forecastFive = forecastDetail('Friday', 'icon6', 'icon6', '10\u00B0/19\u00B0');
    forecast.appendChild(forecastOne);
    forecast.appendChild(forecastTwo);
    forecast.appendChild(forecastThree);
    forecast.appendChild(forecastFour);
    forecast.appendChild(forecastFive);

    skycon('icon2', 'RAIN_SNOW_SHOWERS_DAY');
    skycon('icon3', 'FOG');
    skycon('icon4', 'RAIN_SNOW_SHOWERS_NIGHT');
    skycon('icon5', 'WIND');
    skycon('icon6', 'HAIL');

    const menu = htmlElement('section', 'menu-hide');
    overallWrap.appendChild(menu);

    const menuTop = htmlElement('div', 'menu-top');
    menu.appendChild(menuTop);

    const searchActions = htmlElement('div', 'search-actions');
    menuTop.appendChild(searchActions);

    const searchBar = htmlElement('input', 'search-bar');
    searchBar.setAttribute('placeholder', 'Enter a City...');
    const saveLocation = htmlElement('button', 'save-location', 'Save this Location');
    saveLocation.setAttribute('type', 'button');
    const currentLocation = htmlElement('button', 'current-location', 'Go to Current Location');
    currentLocation.setAttribute('type', 'button');
    searchActions.appendChild(searchBar);
    searchActions.appendChild(saveLocation);
    searchActions.appendChild(currentLocation);

    const savedLocations = htmlElement('section', 'saved-locations');
    menuTop.appendChild(savedLocations);

    const heading = htmlElement('h4', 'saved-locations-heading', 'Saved Locations');
    savedLocations.appendChild(heading);

    const savedLocationsList = htmlElement('ul', 'saved-locations-list');
    savedLocations.appendChild(savedLocationsList);

    const london = savedListItem('London, GB');
    const buenosAires = savedListItem('Buenos Aires, AR');
    const lagos = savedListItem('Lagos, NG');

    savedLocationsList.appendChild(london);
    savedLocationsList.appendChild(buenosAires);
    savedLocationsList.appendChild(lagos);

    const menuBottom = htmlElement('div', 'menu-bottom');
    menu.appendChild(menuBottom);

    const celsius = htmlElement('span', 'celsius', '\u00B0C');
    menuBottom.appendChild(celsius);

    const temperatureToggleWrap = htmlElement('div', 'temperature-toggle-wrap');
    temperatureToggleWrap.setAttribute('data-toggle', 'toggle-unit');
    temperatureToggleWrap.setAttribute('data-unit', 'celsius');
    menuBottom.appendChild(temperatureToggleWrap);

    const temperatureToggle = htmlElement('button', 'temperature-toggle');
    temperatureToggle.setAttribute('data-toggle', 'toggle-unit');
    temperatureToggle.setAttribute('data-unit', 'celsius');
    temperatureToggleWrap.appendChild(temperatureToggle);

    const fahrenheit = htmlElement('span', 'fahrenheit', '\u00B0F');
    menuBottom.appendChild(fahrenheit);
  };

  return {
    weatherPage,
    weatherContent,
    toggleClass,
  };
})();

export { content as default };
