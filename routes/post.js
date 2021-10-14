const express = require("express");
const router = express.Router();

const PostModel = require("../models/post");
const RequireLogin = require("../middleware/RequireLogin");

const { check } = require("express-validator");

router.post(
  "/createpost",
  RequireLogin,
  [
    check("title", "Title of the post is required").not().isEmpty(),
    check("body", "Body souldnot be empty").not().isEmpty(),
    check("url", "Photo souldnot be empty").not().isEmpty(),
  ],
  (req, res) => {
    req.user.password = undefined;
    const { title, body, photo } = req.body;
    const post = new PostModel({
      title,
      body,
      photo,
      postedBy: req.user,
    });
    post
      .save()
      .then((result) => {
        res.json({ post: result });
      })
      .catch((err) => console.log(err));
  }
);

router.get("/allposts", RequireLogin, (req, res) => {
  PostModel.find({})
    .populate("postedBy", "_id name email pic")
    .populate("comments.postedBy", "_id name ")
    .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
});

router.get("/myposts", RequireLogin, (req, res) => {
  PostModel.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name email pic")
    .sort("-createdAt")
    .then((myposts) => {
      res.json({ myposts });
    })
    .catch((err) => console.log(err));
});

router.put("/likepost", RequireLogin, (req, res) => {
  PostModel.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.user._id } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name email pic")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unlikepost", RequireLogin, (req, res) => {
  PostModel.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name email pic")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", RequireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  PostModel.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name pic")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/uncomment", RequireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  PostModel.findByIdAndUpdate(
    req.body.postId,
    { $pull: { comments: comment } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name pic")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});










router.delete("/delete/:postId", RequireLogin, (req, res) => {
  PostModel.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => console.log(err));
      }
    });
});






// post of only those to whom im followed

router.get("/followedusersposts", RequireLogin, (req, res) => {
  PostModel.find({postedBy:{$in:req.user.following}})
    .populate("postedBy", "_id name email pic")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
});









module.exports = router;
