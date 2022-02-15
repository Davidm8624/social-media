const UserModel = require("../models/UserModel");

const searchUsers = async (req, res) => {
  let { searchText } = req.params;

  if (!searchText) return res.status(401).send("no search text given");

  try {
    const results = await UserModel.find({
      name: { $regex: searchText, $options: "i" },
    });
    res.status(200).json(results);
  } catch (error) {
    console.log("search error at controllers/search", error);
    res.status(500).send("server error @ controller/search");
  }
};

module.exports = { searchUsers };
