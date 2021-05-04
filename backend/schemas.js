const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  username: String,
  profilePicture: String,
  email: String,
  password : String,
  wishlist: [{ itemType: String, id: String }],
  last24VisitedItems: [{ itemType: String, id: String }],
});

userSchema.plugin(passportLocalMongoose);

const reviewSchema = new Schema({
  user: String,       
  rating: Number,
  itemId: String,
  date: { type: Date, default: Date.now },
  text: String,
  likes: [String],
  reports: Number,
});

const moviesSchema = new Schema({
  title: String,
  genre: String,
  dateOfRelease: { type: Date, default: Date.now },
  copiesSold: Number,
  price: Number,
  image: String,
  averageRating: Number,
  trailerLink: String,
  castAndCredits: {
    actors: [String],
    producers: [String],
    Director: String,
  },
  description: String,
  reviews: [reviewSchema],
});

const booksSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  dateOfRelease: { type: Date, default: Date.now },
  copiesSold: Number,
  price: Number,
  image: String,
  averageRating: Number,
  description: String,
  reviews: [reviewSchema],
});

const gamesSchema = new Schema({
  title: String,
  creator: String,
  genre: String,
  dateOfRelease: { type: Date, default: Date.now },
  copiesSold: Number,
  price: Number,
  image: String,
  averageRating: Number,
  description: String,
  reviews: [reviewSchema],
});

const applicationsSchema = new Schema({
  title: String,
  creator: String,
  genre: String,
  dateOfRelease: { type: Date, default: Date.now },
  copiesSold: Number,
  price: Number,
  image: String,
  averageRating: Number,
  description: String,
  reviews: [reviewSchema],
});

module.exports = {
  userSchema,
  reviewSchema,
  applicationsSchema,
  moviesSchema,
  booksSchema,
  gamesSchema,
};
