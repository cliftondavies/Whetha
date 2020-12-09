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

  const measurementDetail = (heading, measure) => {
    const detail = htmlElement('div', 'measurement-detail');
    const detailHeading = htmlElement('span', 'detail-heading', heading);
    const detailMeasure = htmlElement('span', 'detail-measure', measure);
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

    // dateElement.textContent = `${dateDigit} ${month} ${year}`;
    return `${dateDigit} ${month} ${year}`;
  };

  const updateWeatherContent = (location, temp, feelsLike, minMax, pressure, humidity, windSpeed,
    main, name, sys, weather, wind) => {
    // update text content of all elements passed
    location.textContent;
    temp.textContent;
    feelsLike.textContent;
    minMax.textContent;
    pressure.textContent;
    humidity.textContent;
    windSpeed.textContent
  };

  const weatherPage = () => {
    const menuToggle = htmlElement('button', 'menu-toggle');
    menuToggle.setAttribute('data-toggle', ''); // check if necessary or implemented properly
    overallWrap.appendChild(menuToggle);
    const toggleOpen = htmlElement('span', 'toggle-show', '\u2630');
    const toggleClose = htmlElement('span', 'toggle-hide', 'X');
    menuToggle.appendChild(toggleOpen);
    menuToggle.appendChild(toggleClose);

    const currentWeather = htmlElement('section', 'current-weather');
    mainPage.appendChild(currentWeather);

    const locationTime = htmlElement('div', 'location-time');
    const location = htmlElement('span', 'location', 'LONDON, GB'); // caps
    const date = htmlElement('span', 'date');
    date.textContent = formattedDate();
    const time = htmlElement('span', 'time', '5 O\'Clock');
    locationTime.appendChild(location);
    locationTime.appendChild(date);
    locationTime.appendChild(time);

    const temperature = htmlElement('section', 'temperature');
    const temp = htmlElement('span', 'current-weather-temp', '5\u00B0 C');
    temp.setAttribute('data-temparature', ''); // try here first before propagating
    const feelsLike = htmlElement('span', 'feels-like', 'Feels like, 2\u00B0 C');
    const minMax = htmlElement('span', 'min-max', '1\u00B0 C / 10\u00B0 C');
    // const tempMin = htmlElement('span', 'temp-min', '1\u00B0 C'); // merge as one span with tempMax?
    // const tempMax = htmlElement('span', 'temp-max', '10\u00B0 C');
    temperature.appendChild(temp);
    temperature.appendChild(feelsLike);
    // temperature.appendChild(tempMin);
    // temperature.appendChild(tempMax);
    temperature.appendChild(minMax);

    const details = htmlElement('section', 'details');
    const icon = htmlElement('canvas', 'icon-one', '', 'icon1');
    icon.setAttribute('width', '128');
    icon.setAttribute('height', '128');
    const description = htmlElement('span', 'description', 'CLOUDY'); // caps

    const measurementDetails = htmlElement('div', 'measurement-details');
    const pressure = measurementDetail('Pressure', '5 HPA');
    const humidity = measurementDetail('Humidity', '9%');
    const wind = measurementDetail('Wind', '20 M/S');
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

    const menu = htmlElement('section', 'menu');
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
    menuBottom.appendChild(temperatureToggleWrap);

    const temperatureToggle = htmlElement('button', 'temperature-toggle');
    temperatureToggleWrap.appendChild(temperatureToggle);

    const fahrenheit = htmlElement('span', 'fahrenheit', '\u00B0F');
    menuBottom.appendChild(fahrenheit);
  };

  return {
    weatherPage,
    updateWeatherContent,
  };
})();

export { content as default };

// 1. Refactor: write function for creating a measurement-detail card
// const pressure = htmlElement('div', 'pressure');
// const pressureHeading = htmlElement('span', 'pressure-heading', 'Pressure');
// const pressureMeasure = htmlElement('span', 'pressure-measure', '5 HPA');
// pressure.appendChild(pressureHeading);
// pressure.appendChild(pressureMeasure);

// const humidity = htmlElement('div', 'humidity');
// const humidityHeading = htmlElement('span', 'humidity-heading', 'Humidity');
// const humidityMeasure = htmlElement('span', 'humidity-measure', '9%');
// humidity.appendChild(humidityHeading);
// humidity.appendChild(humidityMeasure);

// const wind = htmlElement('div', 'wind');
// const windHeading = htmlElement('span', 'wind-heading', 'Wind Speed');
// const windMeasure = htmlElement('span', 'wind-measure', '20 M/S');
// wind.appendChild(windHeading);
// wind.appendChild(windMeasure);

// 2. Refactor: write function for creating a forecast card
// const forecastOne = htmlElement('div', 'forecast-one');
// const dayOne = htmlElement('span', 'day-one', 'Monday');
// const iconTwo = htmlElement('canvas', 'icon2');
// iconTwo.setAttribute('width', 128);
// iconTwo.setAttribute('height', 128);
// const tempOne = htmlElement('span', 'temp-one', '3\u00B0/14\u00B0');
// forecastOne.appendChild(dayOne);
// forecastOne.appendChild(iconTwo);
// forecastOne.appendChild(tempOne);

// const forecastTwo = htmlElement('div', 'forecast-two');
// const dayTwo = htmlElement('span', 'day-two', 'Tuesday');
// const iconThree = htmlElement('canvas', 'icon3');
// iconThree.setAttribute('width', 128);
// iconThree.setAttribute('height', 128);
// const tempTwo = htmlElement('span', 'temp-Two', '0\u00B0/17\u00B0');

// const forecastThree = htmlElement('div', 'forecast-three');
// const dayThree = htmlElement('span', 'day-three', 'Wednesday');
// const iconFour = htmlElement('canvas', 'icon4');
// iconFour.setAttribute('width', 128);
// iconFour.setAttribute('height', 128);
// const tempThree = htmlElement('span', 'temp-three', '4\u00B0/18\u00B0');

// const forecastFour = htmlElement('div', 'forecast-four');
// const dayFour = htmlElement('span', 'day-four', 'Thursday');
// const iconFive = htmlElement('canvas', 'icon5');
// iconFive.setAttribute('width', 128);
// iconFive.setAttribute('height', 128);
// const tempFour = htmlElement('span', 'temp-four', '8\u00B0/20\u00B0');

// const forecastFive = htmlElement('div', 'forecast-five');
// const dayFive = htmlElement('span', 'day-five', 'Friday');
// const iconSix = htmlElement('canvas', 'icon6');
// iconSix.setAttribute('width', 128);
// iconSix.setAttribute('height', 128);
// const tempFive = htmlElement('span', 'temp-five', '10\u00B0/19\u00B0');
