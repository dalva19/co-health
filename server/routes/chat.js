const router = require("express").Router();
const Chat = require("../models/Chat");

router.get("/", async (req, res) => {
  try {
    const chat = await Chat.findOne({ connectId: req.body.connectId });

    res.status(200).send(chat);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
