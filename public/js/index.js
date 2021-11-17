// Global Variables
const inputsForm = document.querySelector(".input");
const zipInput = document.querySelector(".input__field");
const errorMessage = document.querySelector(".error");

// API variables
const API_KEY = "5db50372bcf66dc6c716330b027a9b2d";

/* HELPER FUNCTIONS */

// Fetch data from the weather api using zip code
async function fetchWeather(zipCode) {
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}`;

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

  const data = await fetchWeather(e.target.zipCode.value);

  if (!data.ok) {
    displayError(`${data.message} (USA CODES ONLY)`);
    throw new Error("Please enter a USA zip code");
  }
});
