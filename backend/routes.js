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
passport.serializeUser(User.serializeUser()); //session encoding
passport.deserializeUser(User.deserializeUser()); //session decoding
passport.use(new LocalStrategy(User.authenticate()));
var nodemailer = require("nodemailer");
const { render } = require("ejs");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, '../frontend/media/pics');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
});
const upload = multer({storage:storage});

module.exports = function (app) {
  app.get("/addData", (req, res) => {
    // Add data to the DB from data.json
    addData();
    // deleteAllRecords(); // DELETE ALL RECORDS (used for testing)
    res.send("Data Added");
  });

  app.post("/login", passport.authenticate("local"), function (req, res) {
    res.redirect(req.headers.referer);
  });

  app.post("/register", upload.single('image'),(req, res) => {
    if(req.file){    
      User.register(
      new User({
        username: req.body.username,
        email : req.body.email,
        profilePicture: req.file['filename'],
        email: req.body.email,
      }),
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
          res.render("../../frontend/views/home");
        }
        passport.authenticate("local")(req, res, function () {
          res.redirect("/");
        });
      }
    );}
    else{
      User.register(
        new User({
          username: req.body.username,
          email : req.body.email,
          profilePicture: ""
        }),
        req.body.password,
        function (err, user) {
          if (err) {
            console.log(err);
            res.render("../../frontend/views/home");
          }
          passport.authenticate("local")(req, res, function () {
            res.redirect("/");
          });
        }
      );
    }

  });

  app.get("/logout", (req, res) => {
    req.logout();
    delete req.session.passport;
    res.redirect("/");
  });

  app.get("/auth", function (req, res) {
    if (req.session.passport) {
      User.findOne({ username: req.session.passport.user }).then((user) => {
        if(user.profilePicture!=""){
          res.send({ isAuth: "true", user: user, pic: user.profilePicture });
        }
        else{
          res.send({ isAuth: "true", user: user, pic: "default.jpg" });
        }
      });
    } else {
      res.send({ isAuth: "false" });
    }
  });

  app.get("/profilepic", function (req, res){
    if (req.session.passport) {
      User.findOne({ username: req.session.passport.user }).then((user) => {
        if(user.profilePicture){
          res.send({ isAuth: "true", user: user, pic: user.profilePicture });
        }
        else{
          res.send({ isAuth: "true", user: user });
        }
      });
    } else {
      res.send({ pic: "Not Authenticated"});
    }
  });

  app.get("/forgot", (req, res) => {
    res.render("../../frontend/views/forgot", {
      username: req.session.passport ? req.session.passport.user : "",
    });
  });

  app.post("/forgot", (req, res) => {
    var pass = "";
    var str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    for (i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    var cur;
    User.findOne({ email: req.body.email }).then(async (user) => {
      cur = user;
      if (cur) {
        User.findByUsername(cur.username).then(
          function (sanitizedUser) {
            if (sanitizedUser) {
              sanitizedUser.setPassword(pass, function () {
                sanitizedUser.save();
                res.send("New password sent to " + req.body.email);
              });
            } else {
              res.send("This email address does not exist");
            }
          },
          function (err) {
            console.error(err);
          }
        );
      } else {
        res.send("This email address does not exist");
      }
    });

    var transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "glk.playstore@hotmail.com",
        pass: "GLKpassword278",
      },
    });

    var mailOptions = {
      from: "glk.playstore@hotmail.com",
      to: req.body.email,
      subject: "New Password for GLK Playstore",
      text: "Your new password is: " + pass,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error while sending the email :" + error);
      } else {
        console.log("Email sent to: " + req.body.email);
      }
    });
  });

  app.get("/", (req, res) => {
    const promise1 = new Promise((resolve, reject) => {
      get10TopSelling(Application, resolve);
    });
    const promise2 = new Promise((resolve, reject) => {
      get10TopSelling(Movie, resolve);
    });
    const promise3 = new Promise((resolve, reject) => {
      get10Newest(Game, resolve);
    });
    const promise4 = new Promise((resolve, reject) => {
      get10Newest(Book, resolve);
    });

    Promise.all([promise1, promise2, promise3, promise4]).then((values) => {
      if (req.session.passport) {
        User.findOne({ username: req.session.passport.user }).then((user) => {
          res.render("../../frontend/views/home", {
            topSellingApplications: values[0],
            topSellingMovies: values[1],
            newestGames: values[2],
            newestBooks: values[3],
            username: req.session.passport ? req.session.passport.user : "",
            wishlist: user.wishlist.map((item) => item.id),
          });
        });
      } else {
        res.render("../../frontend/views/home", {
          topSellingApplications: values[0],
          topSellingMovies: values[1],
          newestGames: values[2],
          newestBooks: values[3],
          username: req.session.passport ? req.session.passport.user : "",
          wishlist: [],
        });
      }
    });
  });

  app.get("/applications", (req, res) => {
    getItemsPage(Application, "applications", req, res);
  });

  app.get("/applications/topSelling", (req, res) => {
    getTopSelling(Application, "applications", req, res);
  });

  app.get("/applications/newestReleases", (req, res) => {
    getNewestReleases(Application, "applications", req, res);
  });

  app.get("/games", (req, res) => {
    getItemsPage(Game, "games", req, res);
  });

  app.get("/games/topSelling", (req, res) => {
    getTopSelling(Game, "games", req, res);
  });

  app.get("/games/newestReleases", (req, res) => {
    getNewestReleases(Game, "games", req, res);
  });

  app.get("/movies", (req, res) => {
    getItemsPage(Movie, "movies", req, res);
  });

  app.get("/movies/topSelling", (req, res) => {
    getTopSelling(Movie, "movies", req, res);
  });

  app.get("/movies/newestReleases", (req, res) => {
    getNewestReleases(Movie, "movies", req, res);
  });

  app.get("/books", (req, res) => {
    getItemsPage(Book, "books", req, res);
  });

  app.get("/books/topSelling", (req, res) => {
    getTopSelling(Book, "books", req, res);
  });

  app.get("/books/newestReleases", (req, res) => {
    getNewestReleases(Book, "books", req, res);
  });

  app.get("/search", (req, res) => {
    let query = req.query.q;
    const promise1 = new Promise((resolve, reject) => {
      Book.find({
        $or: [
          {
            title: { $regex: query, $options: "i" },
          },
          {
            description: { $regex: query, $options: "i" },
          },
        ],
      }).then((items) => {
        resolve(items);
      });
    });
    const promise2 = new Promise((resolve, reject) => {
      Application.find({
        $or: [
          {
            title: { $regex: query, $options: "i" },
          },
          {
            description: { $regex: query, $options: "i" },
          },
        ],
      }).then((items) => {
        resolve(items);
      });
    });
    const promise3 = new Promise((resolve, reject) => {
      Game.find({
        $or: [
          {
            title: { $regex: query, $options: "i" },
          },
          {
            description: { $regex: query, $options: "i" },
          },
        ],
      }).then((items) => {
        resolve(items);
      });
    });
    const promise4 = new Promise((resolve, reject) => {
      Movie.find({
        $or: [
          {
            title: { $regex: query, $options: "i" },
          },
          {
            description: { $regex: query, $options: "i" },
          },
        ],
      }).then((items) => {
        resolve(items);
      });
    });

    Promise.all([promise1, promise2, promise3, promise4]).then((values) => {
      if (req.session.passport) {
        User.findOne({ username: req.session.passport.user }).then((user) => {
          res.render(`../../frontend/views/search`, {
            items: values,
            wishlist: user.wishlist.map((item) => item.id),
            username: req.session.passport.user,
          });
        });
      } else {
        res.render(`../../frontend/views/search`, {
          items: values,
          wishlist: [],
          username: "",
        });
      }
    });
  });

  app.get("/item", (req, res) => {
    let itemType = req.query.itemType;
    let itemId = req.query.itemId;
    const promise1 = new Promise((resolve, reject) => {
      eval(itemType)
        .find({ _id: ObjectID(itemId) })
        .then((item) => {
          resolve(item);
        });
    });
    const promise2 = new Promise((resolve, reject) => {
      Review.find({ itemId: itemId }).then((reviews) => {
        resolve(reviews);
      });
    });

    Promise.all([promise1, promise2]).then((values) => {
      res.render(`../../frontend/views/item`, {
        item: values[0],
        reviews: values[1],
        username: req.session.passport ? req.session.passport.user : "",
      });
    });
  });

  // Add item to last 24 visited
  app.post("/user/:username/last24VisitedItems", (req, res) => {
    addItemToUser(req, res, "last24VisitedItems");
  });

  // Get user's last 24 visited items
  app.get("/user/:username/last24VisitedItems", (req, res) => {
    let last24VisitedItems = [];
    var wishlist;
    let username = req.params.username;
    User.findOne({ username: username })
      .then(async (user) => {
        wishlist = user.wishlist.map((item) => item.id);
        for (let i = 0; i < user.last24VisitedItems.length; i++) {
          await eval(user.last24VisitedItems[i].itemType)
            .findOne({
              _id: ObjectID(user.last24VisitedItems[i].id),
            })
            .then((item) => {
              last24VisitedItems.push(item);
            });
        }
      })
      .then(() => {
        res.render("../../frontend/views/lastVisited", {
          wishlist: wishlist,
          last24VisitedItems: last24VisitedItems,
          username: req.session.passport.user,
        });
      });
  });

  // Add item to wishlist
  app.post("/user/:username/wishlist", (req, res) => {
    addItemToUser(req, res, "wishlist");
  });

  // Delete item from wishlist
  app.delete("/user/:username/wishlist", (req, res) => {
    let username = req.params.username;
    let itemId = req.body.id;
    User.findOne({ username: username }).then((user) => {
      let index = user.wishlist.findIndex((element) => element.id === itemId);
      if (index > -1) {
        user.wishlist.splice(index, 1);
        user.save();
        res.send("Removed from wishlist");
      } else {
        res.send("Not Found");
      }
    });
  });

  // Get user's wishlist
  app.get("/user/:username/wishlist", (req, res) => {
    let wishlist = [];
    let username = req.params.username;
    User.findOne({ username: username })
      .then(async (user) => {
        for (let i = 0; i < user.wishlist.length; i++) {
          await eval(user.wishlist[i].itemType)
            .findOne({
              _id: ObjectID(user.wishlist[i].id),
            })
            .then((item) => {
              wishlist.push(item);
            });
        }
      })
      .then(() => {
        res.render("../../frontend/views/wishlist", {
          wishlist: wishlist,
          username: req.session.passport.user,
        });
      });
  });
};

function get10TopSelling(model, resolve) {
  model
    .find()
    .sort("-dateOfRelease")
    .limit(10)
    .then((items) => {
      resolve(items);
    });
}

function get10Newest(model, resolve) {
  model
    .find()
    .sort("-copiesSold")
    .limit(10)
    .then((items) => {
      resolve(items);
    });
}

function addItemToUser(req, res, listName) {
  let username = req.params.username;
  let item = req.body;
  User.findOne({ username: username }).then((user) => {
    let index = user[listName].findIndex((element) => element.id === item.id);
    if (index === -1) {
      user[listName].unshift(item);
      user.save();
      res.send(`Added to ${listName}`);
    } else {
      res.send("Duplicate");
    }
  });
}

function getItemsPage(model, itemType, req, res) {
  const promise1 = new Promise((resolve, reject) => {
    get10TopSelling(model, resolve);
  });
  const promise2 = new Promise((resolve, reject) => {
    get10Newest(model, resolve);
  });

  Promise.all([promise1, promise2]).then((values) => {
    model.find().then((items) => {
      if (req.session.passport) {
        User.findOne({ username: req.session.passport.user }).then((user) => {
          res.render(`../../frontend/views/${itemType}`, {
            [`${itemType}TopSelling`]: values[0],
            [`${itemType}Newest`]: values[1],
            wishlist: user.wishlist.map((item) => item.id),
            username: req.session.passport.user,
          });
        });
      } else {
        res.render(`../../frontend/views/${itemType}`, {
          [`${itemType}TopSelling`]: values[0],
          [`${itemType}Newest`]: values[1],
          wishlist: [],
          username: "",
        });
      }
    });
  });
}

function getNewestReleases(model, itemType, req, res) {
  model
    .find()
    .sort("-dateOfRelease")
    .then((items) => {
      if (req.session.passport) {
        User.findOne({ username: req.session.passport.user }).then((user) => {
          res.render(`../../frontend/views/${itemType}Top`, {
            [itemType]: items,
            wishlist: user.wishlist.map((item) => item.id),
            username: req.session.passport.user,
          });
        });
      } else {
        res.render(`../../frontend/views/${itemType}Top`, {
          [itemType]: items,
          wishlist: [],
          username: "",
        });
      }
    });
}

function getTopSelling(model, itemType, req, res) {
  model
    .find()
    .sort("-copiesSold")
    .then((items) => {
      if (req.session.passport) {
        User.findOne({ username: req.session.passport.user }).then((user) => {
          res.render(`../../frontend/views/${itemType}Top`, {
            [itemType]: items,
            wishlist: user.wishlist.map((item) => item.id),
            username: req.session.passport.user,
          });
        });
      } else {
        res.render(`../../frontend/views/${itemType}Top`, {
          [itemType]: items,
          wishlist: [],
          username: "",
        });
      }
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
    addItems(books, Book);
    addItems(movies, Movie);
    addItems(games, Game);
    addItems(applications, Application);
  });
}
