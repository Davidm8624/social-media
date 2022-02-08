const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    if ((!req, headers.authorization)) {
      return res.status(401).send("unauthorized");
    }
    if ((!req, headers.authorization.split(" ")[0] !== "Bearer")) {
      return res.status(401).send("unauthorized");
    }

    const auth = req.headers.authorization.split(" ")[1];

    const { userId } = jwt.verify(
      req,
      headers.authorization,
      process.env.JWT_SECRET
    );

    req.userId =  userId ;
    next();
  } catch (error) {
    console.log(err);
    return res.status(401).send("unauthorized");
  }
};

module.exports = {authMiddleware}