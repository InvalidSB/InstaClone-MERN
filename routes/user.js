const express = require("express");
const router = express.Router();

const PostModel = require("../models/post");
const UserModel = require("../models/user");
const RequireLogin = require("../middleware/RequireLogin");

router.get("/profile/:id", RequireLogin, (req, res) => {
  UserModel.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      PostModel.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "user not found" });
    });
});


// follow
router.put("/follow", RequireLogin, (req, res) => {
  console.log(req)
  console.log(req.user)
  UserModel.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      UserModel.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

// unfollow
router.put("/unfollow", RequireLogin, (req, res) => {
  UserModel.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      UserModel.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

router.put("/updatepropic", RequireLogin, (req, res) => {
  const { pic } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        pic,
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "Profile pic not updated" });
      }
      res.json(result);
    }
  );
});

// followed user profile image and name
router.get("/followeduserpn", RequireLogin, (req, res) => {
  UserModel.find(req.user._id)
    .populate("following", "_id name pic")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});

// user search garera dekhauna

router.post("/searchuser", RequireLogin, (req, res) => {
  let userPattern = new RegExp("^" + req.body.query);
  UserModel.find({ email: { $regex: userPattern } })
    .select("_id email name pic")
    .then((userRecord) => res.json({ userRecord }))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
