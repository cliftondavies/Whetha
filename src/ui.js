// set current location
// const userWeather = () => {
//   if ('geolocation' in navigator) {
//     navigator.geolocation.getCurrentPosition(userLocation, error); // (setPosition, error) originally
//   } else {
//     // reveal notification element at top with error message - Geolocation not supported
//   }
// };


// display weather info related to a specific search
// const displayWeather = async () => { // pass lat and long vals as params?
//   const { main, sys, weather } = await getWeather(latVal, longVal);
//   select all elements to update
//   updates content on the page with info
// }; // try/catch
// const displayWeather = ({ main, name, sys, weather, wind }) => {
//   select all elements to update
//   updates content on the page with info
// }; // try/catch or catch


// change background image of current weather section based on weather type


// toggle menu


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


// geolocation.js ?
// const userLocation = async (position) => {
//   const latitude = position.coords.latitude;
//   const longitude = position.coords.longitude;
//   const weatherObj = await getWeather(latitude, longitude);
//   displayWeather(weatherObj);
// };

// const userLocationError = (error) => {
//   reveal notification element at top with #{error.message} property - Geolocation not supported
// };


// api.js ?
// require('dotenv').config()
// const apiKey = process.env.API_KEY;

// const getWeather = async (latitude, longitude) => {
//   const apiUrl = see most up to date url from openweather
//   const weatherJson = await fetch(apiUrl);
//   const weatherObj = await weatherJson.json();
//   return weatherObj;
// };// try/catch or catch

// const weatherData = ({ main, name, sys, weather, wind }) => ({ main, sys, weather });
// const weatherData = async () => { // pass lat and long vals as params?
//   const { main, sys, weather } = await getWeather(latVal, longVal);
//   return { main, sys, weather };
// }; // try/catch or catch


// set icon method - hereor in coontent is the method necessary?


// search weather for a specific location
