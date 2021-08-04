const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new mongoose.Schema({
  text: { type: String, required: true },
  username: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" }, //user who makes offer
  request: { type: Schema.Types.ObjectId, ref: "Request" }, //request the offer was made on
  status: { type: String, default: null },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Offer", OfferSchema);
