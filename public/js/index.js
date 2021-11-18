// Global Variables
const inputsForm = document.querySelector(".input");
const zipInput = document.querySelector(".input__field");
const errorMessage = document.querySelector(".error");
const feelingInput = document.querySelector("#feelings");

// API variables
const API_KEY = "5db50372bcf66dc6c716330b027a9b2d";

/* HELPER FUNCTIONS */

// Fetch data from the weather api using zip code
async function getWeather(key, zipCode) {
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}&units=metric`;

  try {
    const response = await fetch(baseURL, {
      method: "GET",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

// POST weather data to custom server
async function postWeather(path, data) {
  try {
    const response = await fetch(`http://localhost:3000${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const returnedData = await response.json();

    return returnedData;
  } catch (error) {
    return error;
  }
}

// GET WEATHER DATA FROM LOCAL SERVER
async function getLocalWeather() {
  try {
    const response = await fetch("http://localhost:3000/weather", {
      method: "GET",
    });

    const data = response.json();

    return data;
  } catch (error) {
    return error;
  }
}

// Display error when conditions fail
function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

/* END OF HELPER FUNCTION */

// Add live validation each time the user writes
let timeoutID = 0;

zipInput.addEventListener("input", (e) => {
  clearTimeout(timeoutID);

  // Delay the if checking by setTimeout, is it more effecient or it doesn't matter?
  timeoutID = setTimeout(() => {
    if (
      e.target.value < 0 ||
      e.target.value.length < 5 ||
      e.target.value.length > 5
    ) {
      displayError("Please enter a valid zip-code");
    } else {
      errorMessage.style.display = "none";
    }
  }, 1000);
});

// Handle the form submition
inputsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = await getWeather(API_KEY, e.target.zipCode.value);

  // Handle error from the API
  if (data.message) {
    displayError(`${data.message} (USA CODES ONLY)`);
    throw new Error("Please enter a USA zip code");
  }

  console.log(data);

  // Post the data to our local server
  await postWeather("/add", {
    temperature: data.main.temp,
    place: data.name,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    date: new Date().toDateString(),
    response: feelingInput.value,
  });

  // Get data from local server
  const finalData = await getLocalWeather();
  console.log(finalData);
});
