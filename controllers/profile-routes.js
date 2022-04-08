import express from 'express';
let router = express.Router();
import withAuth from '../utils/auth.js';
import Product from '../models/Product.js';
import sequelize from '../config/connection.js';

router.get("/", withAuth, (req, res) => {
  Product.findAll({
    where: {
      user_id: req.session.user.id,
    },
    attributes: ["id", "title", "description", "price", "img_link"],
  })
    .then((dbPostData) => {
      const products = dbPostData.map((post) => post.get({ plain: true }));
      res.render("profile", { products, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Product.findByPk(req.params.id, {
    attributes: ["title", "description", "price", "img_link","user_id"],
  })
    .then((dbProductData) => {
      if (dbProductData) {
        const product = dbProductData.get({ plain: true });

        res.render("edit-product", {
          product,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export {router as default};
