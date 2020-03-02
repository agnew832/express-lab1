// require the express module
const express = require("express");

//require the cors module
const cors = require("cors");

// create a instance of an Express server
const app = express();

// accept json from requests
app.use(express.json());

//allow CORS
app.use(cors());

// import our routes.js our cart endpoints
const cartRoutes = require("./routes.js");

//tell the server to use our cartRoutes/make our endpoints available on this server
app.use("/", cartRoutes);

//define a port
const port = 3500;

app.listen(port, () => {
  console.log(`Listening  on port: ${port}`);
});
