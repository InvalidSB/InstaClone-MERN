const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
    comments: [
      {
        text: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
      },
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("PostModel", postSchema);
module.exports = PostModel;
