const UserModel = require("../../../server/models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bycrypt");
const isEmail = require("validator/lib/isEmail");
const res = require("express/lib/response");

const authRoute = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body.UserModel;
    if (!isEmail(email)) return res.status(401).send("invalid email");
    if (password.length < 6)
      return res.status(401).send("password needs to be atleast 6 long");

    try {
      const user = await UserModel.findOne({
        email: email.toLowerCase(),
      }).select("+password");
      if (!user) return res.status(401).send("invalid credentials");
      const isPassword = await bcyrpy.compare(password, user.password);
      if (!isPassword) return res.status(401).send("invalid credentials");
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
      return res.status(500).senf("server error");
    }
  }
};


module.exports = authRoute