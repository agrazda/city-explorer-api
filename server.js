"use strict";
//const express library always comes first-------------------
const express = require("express");
require("dotenv").config();
const cors = require("cors");
//------------------------------------------------------------

const data = require("./data/weather.json");
const app = express();
app.use(cors())
const PORT = process.env.PORT || 3002;
// console.log(weather[0].find)

// Get API End Points must have request, response
app.get("/", (request, response) => response.send("Your doing great"));

//----------------Search Query----------------------------
app.get("/weather", (request, response) => {
   const searchCity = request.query.searchQuery;
  console.log(request.query);

  const cityFound = data.find((city) => {
    return searchCity.toLowerCase() === city.city_name.toLowerCase();
  });

  try{
    const weatherFound = cityFound.data.map((day) => new Forecast(day)); 
    response.send(weatherFound); 
  }
  catch (error) {
    console.error('error from api', error);
    response.status(500).send('server error');
  }
//   response.send(cityFound);
});

class Forecast {
  constructor(day) {
    this.description = `low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    this.date = day.datetime;
  }
}

//--------------------------------------------------------------
//app.listen needs to be the last line of code within server.js
app.listen(PORT, () => console.log(`listening on ${PORT}`));
