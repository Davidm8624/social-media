const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const ProfileModel = require("../models/ProfileModel");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(404).send("this user dont exist");
    }
    const profile = await ProfileModel.findOne({ user: user._id }).populate(
      "user"
    );
    const profileFollowStats = await FollowerModel.findOne({ user: user._id });
    // console.log(profileFollowStats);

    console.log(user, profile, profileFollowStats);
    return res.status(200).json({
      profile,
      followersLength:
        profileFollowStats.followers.length > 0
          ? profileFollowStats.followers.length
          : 0,
      followingLength:
        profileFollowStats.following.length > 0
          ? profileFollowStats.following.length
          : 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("error at get profile");
  }
};

const getUserPosts = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("error at getuser posts");
  }
};

const getFollowers = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("error at get followers");
  }
};

const getFollowing = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("error at get folling");
  }
};

const followUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("error at follow user");
  }
};

const unfollowUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("error at unfollow user");
  }
};

const updateProfile = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("error at update profile");
  }
};
const updatePassword = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send("error at update password");
  }
};

module.exports = {
  getProfile,
  getUserPosts,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  updateProfile,
  updatePassword,
};
