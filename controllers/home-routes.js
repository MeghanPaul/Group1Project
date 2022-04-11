import express from 'express';
let router = express.Router();
import withAuth from '../utils/auth.js';
import Product from '../models/Product.js';
import Comment from '../models/Comment.js';

router.get("/", withAuth, (req, res) => {
  Product.findAll({
    attributes: ["id", "title", "description", "price", "img_link"],
    /* include: {
      model: Comment,
      attributes: ["id", "text", "user_id", "product_id", "created_at"],
    }, */
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

export {router as default};
