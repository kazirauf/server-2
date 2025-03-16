const express = require("express");
const cors = require("cors");
const dbConfig = require("./server/config/db.config");
const mongoose = require("mongoose");

const app = express();

// CORS options
var corsOptions = {
  origin: "http://localhost:8081"
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Connect to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Portfolio Application." });
});

// Include routes
require("./server/routes/contact.routes")(app);
require("./server/routes/user.routes")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});