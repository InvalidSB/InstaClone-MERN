const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/keys");




// signup route
router.post("/register", (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!email || !name || !password) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  UserModel.findOne({ email: email })
    .then((saveduser) => {
      if (saveduser) {
        return res
          .status(422)
          .json({ error: "user already exist with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new UserModel({
          email,
          password: hashedpassword,
          name,
          pic,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  UserModel.findOne({ email: email })
    .then((saveduser) => {
      if (!saveduser) {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
      bcrypt.compare(password, saveduser.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: saveduser._id }, JWT_SECRET);
          const { _id, name, email, following, followers, pic } = saveduser;
          res.json({
            token,
            user: { _id, name, email, following, followers, pic },
          });
          // res.json({message:"Logged in successfuly"})
        } else {
          return res.status(422).json({ error: "invalid email and password" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
