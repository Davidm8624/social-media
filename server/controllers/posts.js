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
    console.log('1');
    if (location) newPost.location = location;
    console.log('2');
    if (picUrl) newPost.picUrl = picUrl;
    console.log(newPost);
    const post = await new PostModel(newPost).save();
    console.log('4');
    const postCreated = await PostModel.findById(post._id).populate("user");
    console.log('5');
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

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);
    if (!post) return res.status(403).send("post not found");

    const isLiked = post.likes.find((like) => like.user.toString() === userId);
    if (isLiked) return res.status(401).send("post already liked");

    await post.likes.unshift({ user: userId });
    await post.save();
    return res.status(200).send("post liked");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error @ like post");
  }
};

/*
unlike a post
.put('/like/:postId')
req.params{postId}
*/

const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const post = await PostModel.findById(postId);
    if (!post) return res.status(403).send("post not found");

    const likedIndex = post.likes.findIndex(
      (like) => like.user.toString() === userId
    ); //aslong as you dont have {}'s you dont need a return

    if (likedIndex === -1) return res.status(403).send("post alredy not liked");
    await post.likes.splice(likedIndex, 1);
    await post.save();
    return res.status(200).send("post unliked");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error @ unlike post");
  }
};

/**
get all likes on a post
.get('/link/:postId')
req.params{postId}
 */
const getLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findById(postId).populate("likes.user");
    if (!post) return res.status(403).send("post not found");
    return res.status(200).json(post.likes);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error @ unlike post");
  }
};
/**
 * create a comment
 * .post('/comments/:postId')
 * req.params{postId}
 * req.body {text}
 */

const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    if (!text) return res.status(403).send("text required");
    const post = await PostModel.findById(postId);
    if (!post) return res.status(403).send("post not found");

    const newComment = {
      user: req.userId,
      _id: uuid(),
      text,
    };

    await post.comments.unshift(newComment);
    await post.save();
    return res.status(200).json(newComment._id);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error @ unlike post");
  }
};

/**
 * delete a comment
 * .delete('/comment/:postId/:commentId)
 * req.params{postId, commentId}
 */

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);
    if (!post) return res.status(403).send("post not found");

    const comment = post.comments.find((comment) => comment._id === commentId);
    if (!comment) return res.status(403).send("comment not found");

    const user = await UserModel.findById(userId);

    const deleteComment = async () => {
      const indexOf = post.comments.indexOf(comment);
      await post.comments.splice(indexOf, 1);
      await post.save();

      return res.status(200).send("comment deleted");
    };
    if (comment.user.toString() !== userId) {
      if (user.role === admin) {
        await deleteComment();
      } else {
        return res.status(401).send("unauthorized to delete this comment");
      }
    }

    await deleteComment();
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error @ unlike post");
  }
};

module.exports = {
  createPost,
  getAllPost,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  getLikes,
  createComment,
  deleteComment,
};
