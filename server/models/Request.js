const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new mongoose.Schema({
  text: { type: String, required: true },
  username: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" }, //user who makes request
  offers: [{ type: Schema.Types.ObjectId, ref: "User" }], //users who make offers on ind request
  status: { type: String, default: null },
});

module.exports = mongoose.model("Request", RequestSchema);
