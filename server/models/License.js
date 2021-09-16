const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LicenseSchema = new Schema({
  name: { type: String },
  normalizedName: { type: "string" },
  licenseType: { type: String },
  normalizedLicenseType: { type: String },
  licenseNumber: { type: String },
  status: { type: String },
});

module.exports = mongoose.model("License", LicenseSchema);
