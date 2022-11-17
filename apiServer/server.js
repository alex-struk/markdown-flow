const express = require("express");
const cors = require("cors");

const app = express();

var whitelist = ["http://localhost:3000", 'https://digital-gov-frontend-pr-1119-c0cce6-dev.apps.silver.devops.gov.bc.ca', 
'http://digital-gov-frontend-pr-1119-c0cce6-dev.apps.silver.devops.gov.bc.ca']
var corsOptions = {
  origin: function (origin, callback) {

    if (whitelist.indexOf(origin) !== -1 || typeof origin == 'undefined') { // undefined when the api is hit directly
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS: '+origin))
    }
  }
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require("./app/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});