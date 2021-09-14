const router = require("express").Router();
const Request = require("../models/Request");

//finds the requests in user's community
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find({
      community: req.user.address.city.trim().toLowerCase(),
    });

    res.status(200).send(requests);
  } catch (err) {
    res.status(400).send(err);
  }
});

//finds requests in a searched community
router.get("/:communityName", async (req, res) => {
  try {
    const requests = await Request.find({
      community: req.params.communityName.trim().toLowerCase(),
    });

    res.status(200).send(requests);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
