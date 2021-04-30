var path = require("path");
var express = require("express");
const mongoose = require("mongoose");
passport              =  require("passport"),
bodyParser            =  require("body-parser"),
LocalStrategy         =  require("passport-local"),
passportLocalMongoose =  require("passport-local-mongoose"),
User                  =  require("./models/user");
var app = express();
var port = 8080;

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

app.set("view engine", "ejs"); // Set the view engine to ejs
app.use(express.urlencoded({ extended: false }))
app.use(require("express-session")({
  secret:"Any normal Word",//decode or encode session
      resave: false,          
      saveUninitialized:false    
  }));

passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());

app.get("/userprofile" ,(req,res) =>{
    res.render("userprofile");
})

app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/login",passport.authenticate("local",{
  successRedirect:"/userprofile",
  failureRedirect:"/login"
}),function (req, res){
});

app.post("/register",(req,res)=>{
  
  User.register(new User({username: req.body.username,phone:req.body.phone,mail: req.body.mail}),req.body.password,function(err,user){
      if(err){
          console.log(err);
          res.render("register");
      }
  passport.authenticate("local")(req,res,function(){
      res.redirect("/login");
  })    
  })
})

app.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}

app.listen(port);
console.log("Server Running");

