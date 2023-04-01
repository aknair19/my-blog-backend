const express = require("express");
const router = express.Router();
const {
  updateUpvotes,
  addComments,
  articles,
} = require("./articles.controller");

const validateUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

router.get("/:name", articles);

router.put("/:articleId/upvote", validateUser, updateUpvotes);
router.post("/:articleId/comments", validateUser, addComments);

module.exports = router;
