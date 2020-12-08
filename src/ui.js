// enable user to select current location
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


// geolocation.js ?
// const userLocation = (position) => {
//   const latitude = position.coords.latitude;
//   const longitude = position.coords.longitude;
//   getWeather(latitude, longitude)
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
