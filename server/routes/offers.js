const router = require("express").Router();
const mongoose = require("mongoose");
const Offer = require("../models/Offer");
const User = require("../models/User");
mongoose.set("useFindAndModify", false);

router.post("/", async (req, res) => {
  //need to add validation

  if (req.user.profileType === "healthcare member") {
    if (!req.user.credentials.verified) {
      return res
        .status(401)
        .send("You must have a verified liscence to make an offer.");
    }

    const user = await User.findById({ _id: req.user._id });

    const offer = new Offer({
      text: req.body.text,
      username: req.user.username,
      user: user._id,
      status: "pending",
    });

    try {
      await offer.save();
      user.offers.push(offer);
      await user.save();

      res.send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

// router.get("/", async (req, res) => {
//   res.status(200);

//   try {
//     await User.findById({ _id: req.user._id })
//       .populate("requests")
//       .exec((err, user) => {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send({
//             requests: user.requests || null,
//           });
//         }
//       });
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// //PUT on requests/:request

// router.delete("/:request", async (req, res) => {
//   const request = await Request.findById({ _id: req.params.request });
//   const user = await User.findById({ _id: req.user._id });

//   if (!request) {
//     return res.status(404).send("Request not found");
//   }

//   try {
//     const update = { $pull: { requests: request._id } };
//     await Request.deleteOne({ _id: request._id });
//     await User.findByIdAndUpdate(user._id, update, (err, doc) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//     res.status(200).send(`successfully deleted.`);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

module.exports = router;
