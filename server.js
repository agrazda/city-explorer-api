"use strict";
//const express library always comes first-------------------
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");

//------------------------------------------------------------

const data = require("./data/weather.json");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
// console.log(weather[0].find)

// Get API End Points must have request, response
app.get("/", (request, response) => response.send("Your doing great"));

//----------------Search Query----------------------------
app.get("/weather", async (request, response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;

  const cityFound = await axios.get(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`
  );
  console.log(cityFound.data.data);
  try {
    const weatherFound = cityFound.data.data.map((day) => new Forecast(day));
    console.log("test");
    response.send(weatherFound);
  } catch (error) {
    console.error("error from api", error);
    response.status(500).send("server error");
  }
  //   response.send(cityFound);
});

class Forecast {
  constructor(day) {
    this.description = `low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    this.date = day.datetime;
  }
}

app.get("/movies", async (request, response) => {
  const cityName = request.query.searchQuery;

  const cityFound = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`
  );
  console.log(cityFound.data);
  try {
    const movieFound = cityFound.data.results.map((movie) => new Movies(movie));
    console.log("test");
    response.send(movieFound);
  } catch (error) {
    console.error("error from api", error);
    response.status(500).send("server error");
  }
  //   response.send(cityFound);
});

class Movies {
  constructor(movie) {
    
    this.title = movie.title;
  }
}

//--------------------------------------------------------------
//app.listen needs to be the last line of code within server.js
app.listen(PORT, () => console.log(`listening on ${PORT}`));
