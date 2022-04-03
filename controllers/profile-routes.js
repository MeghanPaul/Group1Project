const router = require("express").Router();
// const withAuth = require("../utils/auth");
const { Post } = require("../models");
// const sequelize = require("../config/connection");

router.get("/", (req, res) => {
  console.log(req.session);
  Post.findAll({
    where: {
      user_id: req.session.user.id,
    },
    attributes: ["id", "title", "post_url"],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("profile", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
