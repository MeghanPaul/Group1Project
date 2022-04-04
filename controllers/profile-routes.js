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
      res.render("profile", { products });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", (req, res) => {
  Product.findByPk(req.params.id, {
    attributes: ["title", "description", "price", "img_link"],
  })
    .then((dbProductData) => {
      if (dbProductData) {
        const product = dbProductData.get({ plain: true });

        res.render("edit-product", {
          product,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
