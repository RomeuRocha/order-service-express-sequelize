const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv/config');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//mockup to insert data test
const mockup = require('./app/config/mockup')

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Rest Aplication" });
});

require("./app/routes/client.route")(app);
require('./app/routes/order.route')(app);
require('./app/routes/service.route')(app);
require('./app/routes/product.route')(app);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

