const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  connectId: { type: String },
  sender: { type: String },
  recipient: { type: String },
  chatLog: { type: Array },
});

module.exports = mongoose.model("Chat", ChatSchema);
