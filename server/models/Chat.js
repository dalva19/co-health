const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  communityMember: { type: Schema.Types.ObjectId, ref: "User" },
  healthcareMember: { type: Schema.Types.ObjectId, ref: "User" },
  chatLog: { type: Array },
});

module.exports = mongoose.model("Chat", ChatSchema);
