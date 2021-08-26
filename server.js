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
    return searchCity === city.city_name;
  });

  const weatherFound = cityFound.data.map((weather) => {
    const date = weather.datetime;
    const low_temp = weather.low_temp;
    const high_temp = weather.high_temp;
    const description = weather.weather.description;
    return new Forecast(`low of ${low_temp}, high of ${high_temp} with ${description}`,date);

    // return [
    //   `description: low of ${low_temp}, high of ${high_temp} with ${description}, date: ${date}`,
    // ];

  });

  response.send(weatherFound);
//   response.send(cityFound);
});

class Forecast {
  constructor(description, date) {
    this.description = description;
    this.date = date;
  }
}

//--------------------------------------------------------------
//app.listen needs to be the last line of code within server.js
app.listen(PORT, () => console.log(`listening on ${PORT}`));
