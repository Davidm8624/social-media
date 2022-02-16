const { createPost, getAllPost, getPostById, deletePost } = require("../controllers/posts");

const router = require("express").Router();

router.route('/').post(createPost).get(getAllPost)
router.route('/:postId').get(getPostById).delete(deletePost)


module.exports = router;