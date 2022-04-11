const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Product, Comment } = require("../models");
const sequelize = require("../config/connection");
router.get("/", withAuth, (req, res) => {
  Product.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "price",
      "img_link",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE product.id = vote.product_id)"
        ),
        "vote_count",
      ],
    ],
    include: {
      model: Comment,
      attributes: ["id", "text", "user_id", "product_id", "created_at"],
    },
  })
    .then((dbProductData) => {
      const products = dbProductData.map((product) =>
        product.get({ plain: true })
      );
      res.render("home", { products, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
