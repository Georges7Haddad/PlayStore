var path = require("path");
var express = require("express");
const mongoose = require("mongoose");
passport              =  require("passport");
bodyParser            =  require("body-parser");
LocalStrategy         =  require("passport-local");
passportLocalMongoose =  require("passport-local-mongoose");
const schemas = require("./schemas"); // Connect Schemas
const User = mongoose.model("User", schemas.userSchema);
var app = express();
var port = 8080;

app.use(express.static(path.resolve("../frontend"))); // Specify the static files folder
app.set("view engine", "ejs"); // Set the view engine to ejs


app.use(express.urlencoded({ extended: false }))
app.use(require("express-session")({
  secret:"Any normal Word",//decode or encode session
      resave: false,          
      saveUninitialized:false    
}));

var connectionString =
  "mongodb://georgeshaddad:1234@cluster0-shard-00-00.smhyu.mongodb.net:27017,cluster0-shard-00-01.smhyu.mongodb.net:27017,cluster0-shard-00-02.smhyu.mongodb.net:27017/PlaystoreDB?ssl=true&replicaSet=atlas-1gvw6r-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    require("./routes")(app); // Connect routes file
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port);
console.log("Server Running");

