const UserModel = require("../../../server/models/UserModel");
// const FollowerModel = require("../../../models/FollowerModel");
// const ProfileModel = require("../../../models/ProfileModel");
const userNameRegex = require("../../../util/usernameRegex");
const defaultProfilePicURL = require("../../../util/defaultProfilePic");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const ProfileModel = require("../../../server/models/ProfileModel");
const FollowerModel = require("../../../server/models/FollowerModel");

signupRoute = async (req, res) => {
  //get username aviable route
  console.log(req.params);
  if (req.method === "GET" && req.params) {
    const { username } = req.params;
    try {
      if (username.length < 1) return res.status(401).send("invalid input");
      if (!userNameRegex.test(username)) {
        return res.status(401).send("invalid");
      }
      const user = await UserModel.findOne({
        username: username.toLowerCase(),
      });
      if (user) return res.status(401).send("username not aviable");
      return res.status(200).send("Avilable");
    } catch (error) {
      console.log(error);
      res.status(500).send("there was a server error");
    }
  }

  //Post user route
  else if (req.method === "POST") {
    const {
      name,
      email,
      username,
      password,
      bio,
      facebook,
      twitter,
      youtube,
      instagram,
    } = req.body.user;

    if (!isEmail(email)) {
      return res.status(401).send("that is not the correct email");
    }
    if (password.length < 6)
      return res.status(401).send("password must be atleast 6 chars long");
    try {
      let user;
      user = await UserModel.findOne({ email: email.toLowerCase() });
      if (user) return res.status(401).send("email already in use");

      user = new UserModel({
        name,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password,
        profilePicURL: req.body.profilePicURL || defaultProfilePicURL,
      });

      user.password = await bcrypt.hash(password, 10);
      user = await user.save();

      let profileFields = {};
      profileFields.user = user._id;
      if (bio) profileFields.bio = bio;
      if (twitter) profileFields.twitter = twitter;
      if (youtube) profileFields.youtube = youtube;
      if (instagram) profileFields.instagram = instagram;
      if (facebook) profileFields.facebook = facebook;

      await new ProfileModel(profileFields).save();
      await new FollowerModel({
        user: user._id,
        followers: [],
        following: [],
      }).save;

      const payload = { userID: user._id };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json(token);
        }
      );

    } catch (error) {
      console.log(error);
      return res.status(500).send("server err");
    }
  } else {
    res.status(500).send("Method not supported on routes");
  }
};

module.exports = signupRoute;
