const router = require("express").Router();
const Request = require("../models/Request");
const User = require("../models/User");

//routes on co-health/profile

router.get("/", async (req, res) => {
  res.status(200);

  try {
    await User.findById({ _id: req.user._id })
      .populate("requests")
      .exec((err, user) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            name: user.name,
            username: user.username,
            profileType: user.profileType,
            address: user.address,
            credentials: user.credentials || null,
            requests: user.requests || null,
            offers: user.offers || null,
          });
        }
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

// //figure out how to populate username into params from login
// router.get("/:username", async (req, res) => {
//   if (req.user.username === req.params.username) {
//     res.status(200);
//     //get profile info from db
//     try {
//       await User.findById({ _id: req.user._id })
//         .populate("requests")
//         .exec((err, user) => {
//           if (err) {
//             console.log(err);
//           } else {
//             res.send({
//               name: user.name,
//               username: user.username,
//               profileType: user.profileType,
//               address: user.address,
//               credentials: user.credentials || null,
//               requests: user.requests || null,
//               offers: user.offers || null,
//             });
//           }
//         });
//     } catch (err) {
//       res.status(400).send(err);
//     }
//   }
// });

router.post("/request", async (req, res) => {
  //need to add validation
  if (req.user.profileType === "community member") {
    const user = await User.findById({ _id: req.user._id });

    const request = new Request({
      text: req.body.text,
      username: req.user.username,
      user: user._id,
      status: "pending",
    });

    try {
      await request.save();
      user.requests.push(request);
      await user.save();

      res.send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.get("/requests", async (req, res) => {
  res.status(200);

  try {
    await User.findById({ _id: req.user._id })
      .populate("requests")
      .exec((err, user) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            requests: user.requests || null,
          });
        }
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

//put '/request'
//delete '/request'
// router.delete('/requests/:request', async (req, res) => {
//   const update = {$pull: {requests: req._id}}

// })

module.exports = router;
