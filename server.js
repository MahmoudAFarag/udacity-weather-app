const express = require("express");
const cors = require("cors");

// Initialize express instance
const app = express();

// express built-in middleware (body-parser is now included in express per the documentation)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// express external middleware
app.use(cors());

// Set up a listener for the server on port 3000
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

// Dummy storage object
let projectData = {};

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/weather", (req, res) => {
  res.send(projectData);
});

const postOptions = [
  "temperature",
  "place",
  "description",
  "icon",
  "date",
  "response",
];

app.post("/add", (req, res) => {
  const keys = Object.keys(req.body);

  keys.map((key) => {
    if (!postOptions.includes(key) || keys.length < 6) {
      throw new Error(
        "Please make sure you passed the following key: temperature, date, response"
      );
    }
  });

  projectData = req.body;

  res.status("200").send(projectData);
});
