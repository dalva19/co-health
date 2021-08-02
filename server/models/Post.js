const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  username: String,
});

const postSchema = new mongoose.Schema({
  text: String,
  username: String,
  comments: [commentSchema],
});

module.exports = mongoose.model("Post", postSchema);
