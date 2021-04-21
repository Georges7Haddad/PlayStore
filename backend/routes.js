module.exports = function (app, db, path) {
  var applicationsCollection = db.collection("Applications");
  var gamesCollection = db.collection("Games");
  var moviesCollection = db.collection("Movies");
  var booksCollection = db.collection("Books");

  app.get("/", (req, res) => {
    res.render(path.resolve("../frontend/views/home"));
  });

  app.get("/applications", (req, res) => {
    applicationsCollection
      .find()
      .toArray()
      .then((applications) => {
        res.render("../../frontend/views/applications", {
          applications: applications,
        });
      });
  });

  app.get("/games", (req, res) => {
    gamesCollection
      .find()
      .toArray()
      .then((games) => {
        res.render("../../frontend/views/games", { games: games });
      });
  });

  app.get("/movies", (req, res) => {
    moviesCollection
      .find()
      .toArray()
      .then((movies) => {
        res.render("../../frontend/views/movies", { movies: movies });
      });
  });

  app.get("/books", (req, res) => {
    booksCollection
      .find()
      .toArray()
      .then((books) => {
        res.render("../../frontend/views/books", { books: books });
      });
  });
};
