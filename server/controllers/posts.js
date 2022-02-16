const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const uuid = require("uuid").v4;

/*
Create a post
.post('/')
req.body {text, location, picUrl}
*/
const createPost = async (req, res) => {
  const { text, location, picUrl } = req.body;
  if (!text.length) {
    return res.status(401).send("Text mush be atleast 1 charater");
  }
  try {
    const newPost = {
      user: req.userId,
      text,
    };
    if (location) newPost.location = location;
    if (picUrl) newPost.picUrl = picUrl;
    const post = await new PostModel(newPost).save();
    const postCreated = await PostModel.findById(post._id).populate("user");
    return res.status(200).json(postCreated);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error at creat post");
  }
};

/*
get all posts
.get('/')
req.query{pagenumber} = help with pagination
*/
const getAllPost = async (req, res) => {
  const { page } = req.query;

  const pageNumber = Number(page);
  const size = 8;

  try {
    let posts;
    if (pageNumber === 1) {
      post = await PostModel.find()
        .limit(size)
        .sort({ createdAt: -1 })
        .populate("user")
        .populate("comments.user");
    } else {
      const skips = size * (pageNumber - 1);
      posts = await PostModel.find()
        .skip(skips)
        .limit(size)
        .sort({ createdAt: -1 })
        .populate("user")
        .populate("comments.user");
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error @ getAllPosts");
  }
};

/*
get a post by id
.get('/:postId')
req.params{postId}
*/

const getPostById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId)
      .populate("user")
      .populate("comments.user");
    if (!post) return res.status(403).send("post not found");
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error @ getPostById");
  }
};

/*
delete post
.delete('/:postId')
req.params{postId}
*/

const deletePost = async (req, res) => {
  try {
    const { userId } = req;
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    if (!post) return res.status(403).send("post not found");
    const user = await UserModel.findById(userId);
    if (post.user.toString() !== userId) {
      if (user.role === "admin") {
        await post.remove();
        return res.status(200).send("post deleted sucessfully");
      } else {
        return res.status(401).send("unauthorized");
      }
    }
    await post.remove();
    return res.status(200).send("post deleted sucessfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error @ deletePost");
  }
};

/*
like a post
.post('/like/:postId')
req.params{postId}
*/

/*
unlike a post
.put('/like/:postId')
req.params{postId}
*/

/**
get all likes on a post
.get('/link/:postId')
req.params{postId}
 */

/**
 * create a comment
 * .post('/comment/:postId')
 * req.params{postId}
 * req.body {text}
 */

/**
 * delete a comment
 * .delete('/comment/:postId/:commentId)
 * req.params{postId, commentId}
 */

module.exports = { createPost, getAllPost, getPostById, deletePost };
