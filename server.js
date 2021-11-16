const express = require("express");
const cors = require("cors");

// Initialize express instance
const app = express();

// express built-in middleware (body-parser is now included in express per the documentation)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// express external middleware
app.use(cors());

// Set up a listener for the server on port 3000
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

// Dummy storage object
const projectData = {};

app.get("/", (req, res) => {
  res.status("200").send(projectData);
});

app.post("/add", (req, res) => {
  projectData = req.body;

  res.status("200").send(projectData);
});
