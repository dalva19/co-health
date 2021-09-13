const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  text: { type: String, required: true },
  username: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" }, //user who makes request
  offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }], //users who make offers on ind request
  status: { type: String, default: null },
  acceptedOffer: { type: Schema.Types.ObjectId, ref: "Offer" },
  community: { type: String },
  coordinates: { lat: Number, lng: Number },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", RequestSchema);
