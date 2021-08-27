


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

  export default weather;