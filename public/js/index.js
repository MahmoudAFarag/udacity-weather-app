// Global variables
const API_KEY = "5db50372bcf66dc6c716330b027a9b2d";
const URL = `https://api.openweathermap.org/data/2.5/weather?zip=71601&appid=${API_KEY}`;

// Fetch data from the weather api using zip code
// async function fetchWeather() {
//   try {
//     const response = await fetch(URL, {
//       method: "GET",
//     });

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// fetchWeather().then((data) => console.log(data));
