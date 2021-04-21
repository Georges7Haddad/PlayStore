var path = require("path");
var express = require("express");
const mongoose = require("mongoose");
var app = express();
var port = 8080;
app.use(express.static(path.resolve("../frontend"))); // Specify the static files folder
app.set("view engine", "ejs"); // Set the view engine to ejs

var connectionString =
  "mongodb://georgeshaddad:1234@cluster0-shard-00-00.smhyu.mongodb.net:27017,cluster0-shard-00-01.smhyu.mongodb.net:27017,cluster0-shard-00-02.smhyu.mongodb.net:27017/PlaystoreDB?ssl=true&replicaSet=atlas-1gvw6r-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    var db = mongoose.connection;
    require("./routes")(app, db, path); // Connect routes file
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port);
console.log("Server Running");
