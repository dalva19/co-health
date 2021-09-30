const router = require("express").Router();
const Request = require("../models/Request");
const User = require("../models/User");

//finds the requests in user's community
//search request text for match
router.get("/", async (req, res) => {
  let query;
  const search = req.query.search;
  let normalizedSearch;
  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const normalizedUserCommunity = user.address.city
    .replace(/\s+/g, "")
    .trim()
    .toLowerCase();

  if (req.query.search) {
    normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch.replace(/\s+/g, "").split(/\W+/).length === 1) {
      query = {
        $text: { $search: `${normalizedSearch}` },
        normalizedCommunity: normalizedUserCommunity,
      };
    } else {
      query = {
        $text: { $search: `\"${normalizedSearch}\"` },
        normalizedCommunity: normalizedUserCommunity,
      };
    }
  }

  if (!req.query) {
    query = { normalizedCommunity: normalizedUserCommunity };
  }

  try {
    const requests = await Request.find(query);
    const count = await Request.countDocuments(query);

    if (!count) {
      return res.status(404).send("Not found.");
    }

    res.status(200).send({ requests: requests, count: count });
  } catch (err) {
    res.status(400).send(err);
  }
});

//finds requests in a searched community
router.get("/:communityName", async (req, res) => {
  try {
    const requests = await Request.find({
      community: req.params.communityName
        .replace(/\s+/g, "")
        .trim()
        .toLowerCase(),
    });

    res.status(200).send(requests);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
