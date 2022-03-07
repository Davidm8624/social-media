const UserModel = require("../models/UserModel");

const searchUsers = async (req, res) => {
  let { searchText } = req.params;

  if (!searchText) return res.status(401).send("no searchText given");

  try {
    const results = await UserModel.find({
      name: { $regex: searchText, $options: "i" },
    });
    res.status(200).json(results);
  } catch (error) {
    console.log("search error at controllers/search", error);
    res.status(500).send("server error @ contorller/search");
  }
};

module.exports = { searchUsers };
