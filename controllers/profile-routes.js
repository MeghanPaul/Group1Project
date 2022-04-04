const router = require("express").Router();
// const withAuth = require("../utils/auth");
const { Product } = require("../models");
// const sequelize = require("../config/connection");

router.get("/", (req, res) => {
  console.log(req.session);
  Product.findAll({
    where: {
      user_id: req.session.user.id,
    },
    attributes: ["id", "title", "description", "price", "img_link"],
  })
    .then((dbPostData) => {
      const products = dbPostData.map((post) => post.get({ plain: true }));
      console.log({ products });
      res.render("profile", { products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
