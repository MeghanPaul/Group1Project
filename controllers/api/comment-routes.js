const router = require("express").Router();
const { Comment } = require("../../models");

router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "text", "user_id", "product_id", "created_at"],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post("/", (req, res) => {
  if (req.session) {
    Comment.create({
      text: req.body.text,
      product_id: req.body.product_id,
      user_id: req.body.user_id,
    })
      .then((dbCommentData) => {
        res.json(dbCommentData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

module.exports = router;
