ObjectID = require("mongodb").ObjectID;
const fs = require("fs");
const mongoose = require("mongoose");
const schemas = require("./schemas"); // Connect Schemas

const User = mongoose.model("User", schemas.userSchema);
const Review = mongoose.model("Review", schemas.reviewSchema);
const Application = mongoose.model("Application", schemas.applicationsSchema);
const Game = mongoose.model("Game", schemas.gamesSchema);
const Movie = mongoose.model("Movie", schemas.moviesSchema);
const Book = mongoose.model("Book", schemas.booksSchema);

module.exports = function (app, path) {
  app.get("/addData", (req, res) => {
    // Add data to the DB from data.json
    addData();
    // deleteAllRecords(); // DELETE ALL RECORDS (used for testing)
    res.send("Data Added");
  });

  app.get("/", (req, res) => {
    res.render(path.resolve("../frontend/views/home"));
  });

  app.get("/applications", (req, res) => {
    Application.find().then((applications) => {
      res.render("../../frontend/views/applications", {
        applications: applications,
      });
    });
  });

  app.get("/applications/topSelling", (req, res) => {
    getTopSelling(Application, "applications", res);
  });

  app.get("/games", (req, res) => {
    Game.find().then((games) => {
      res.render("../../frontend/views/games", { games: games });
    });
  });

  app.get("/games/topSelling", (req, res) => {
    getTopSelling(Application, "applications", res);
  });

  app.get("/movies", (req, res) => {
    Movie.find().then((movies) => {
      res.render("../../frontend/views/movies", { movies: movies });
    });
  });

  app.get("/games/topSelling", (req, res) => {
    getTopSelling(Game, "games", res);
  });

  app.get("/books", (req, res) => {
    Book.find().then((books) => {
      res.render("../../frontend/views/books", { books: books });
    });
  });

  app.get("/books/topSelling", (req, res) => {
    getTopSelling(Book, "books", res);
  });

  app.get("/item", (req, res) => {
    let itemType = req.query.itemType;
    let itemId = req.query.itemId;
    eval(itemType)
      .find({ _id: ObjectID(itemId) })
      .then((item) => {
        res.render(`../../frontend/views/item`, { item: item });
      });
  });

  // Add item to wishlist
  app.post("/user/:username/wishlist", (req, res) => {
    let username = req.params.username;
    let item = req.body.item;
    User.findOne({ username: username }).then((user) => {
      user.wishlist.push(item);
      user.save();
      res.send("Added to wishlist");
    });
  });

  // Get user's wishlist
  app.get("/user/:username/wishlist", (req, res) => {
    let wishlist = [];
    let username = req.params.username;
    User.findOne({ username: username })
      .then((user) => {
        for (let i = 0; i < user.wishlist.length; i++) {
          eval(user.wishlist[i].itemType)
            .findOne({
              _id: ObjectID(user.wishlist[i].id),
            })
            .then((item) => {
              wishlist.push(item);
            });
        }
      })
      .then(() => {
        console.log(wishlist);
        res.render("../../frontend/views/wishlist.ejs", {
          wishlist: wishlist,
        });
      });
  });
};

function getTopSelling(model, itemType, res) {
  model
    .find()
    .sort("-copiesSold")
    .limit(10)
    .then((items) => {
      res.render(`../../frontend/views/${itemType}`, {
        [itemType]: items,
      });
    });
}

function deleteAllRecords() {
  for (let i = 0; i < mongoose.modelNames().length; i++) {
    eval(mongoose.modelNames()[i])
      .deleteMany({})
      .then(() => {});
  }
  console.log("All RECORDS DELETED");
}

function addData() {
  function addItems(items, model) {
    for (let i = 0; i < items.length; i++) {
      var item = new model(items[i]);
      item.save();
    }
  }
  fs.readFile("data.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    data = JSON.parse(data);
    users = data["users"];
    reviews = data["reviews"];
    movies = data["movies"];
    books = data["books"];
    applications = data["applications"];
    games = data["games"];
    addItems(users, User);
    addItems(reviews, Review);
    addItems(books, Book);
    addItems(movies, Movie);
    addItems(games, Game);
    addItems(applications, Application);
  });
}
