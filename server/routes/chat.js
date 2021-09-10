const router = require("express").Router();
const Chat = require("../models/Chat");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

router.get("/", async (req, res) => {
  try {
    const chat = await Chat.find({
      communityMember: req.query.communityMember,
      healthcareMember: req.query.healthcareMember,
    });

    if (!chat) {
      return res.status(404).send("No chats found");
    }

    res.status(200).send(chat[0]);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:chatId", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).send("No chats found");
    }

    res.status(200).send(chat);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
