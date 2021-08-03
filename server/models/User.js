const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const HealthcareMemberSchema = new mongoose.Schema({
  name: { firstName: { type: String }, lastName: { type: String } },
  address: {
    streetNumber: { type: String },
    street: { type: String },
    state: { type: String },
    zipcode: { type: Number },
  },
});

const CommunityMemberSchema = new mongoose.Schema({
  name: { firstName: { type: String }, lastName: { type: String } },
  address: {
    streetNumber: { type: String },
    street: { type: String },
    state: { type: String },
    zipcode: { type: Number },
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hash: String,
  salt: String,
  profileType: { type: String },
  email: {
    type: String,
    required: true,
  },
  name: { firstName: { type: String }, lastName: { type: String } },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: Number },
  },
  credentials: {
    liscence: { type: String, default: null },
    liscenceNumber: { type: String, default: null },
    verified: { type: Boolean, default: null },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }], //community members || null for healcare members
  offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }], //healthcare members || null for comm members
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString();
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

module.exports = mongoose.model("User", UserSchema);
