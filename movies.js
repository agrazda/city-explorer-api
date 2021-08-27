



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

  export default Movies;