"use strict";
//const express library always comes first-------------------
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
import weather from './weather'
import movies from './movies'

//------------------------------------------------------------

const data = require("./data/weather.json");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;


// Get API End Points must have request, response
app.get("/", (request, response) => response.send("Your doing great"));





//--------------------------------------------------------------
//app.listen needs to be the last line of code within server.js
app.listen(PORT, () => console.log(`listening on ${PORT}`));
