import express from "express";
let router = express.Router();
import withAuth from "../../utils/auth.js";

//Theorhetical spaceholders for product model
import Comment from "../../models/Comment.js";
import Product from "../../models/Product.js";
import sequelize from "sequelize";
import { uploadImg } from "../../utils/image-storage.js";
//GET for the products homepage
router.get("/", (req, res) => {
  Product.findAll({
    attributes: ["id", "title", "description", "price", "img_link"],
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

router.get("/:id", (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "description", "price", "img_link"],
    include: {
      model: Comment,
      attributes: ["id", "text", "user_id", "product_id", "created_at"],
    },
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(404).json({ message: "No product found with this id" });
        return;
      }
      const products = dbProductData.get({ plain: true });
      res.render("single-page", { products, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/:filter", async (req, res) => {
//   //theorhetical attribute names
//   const attributes = ["img_link", "title", "description", "price", "user_id"];

//   try {
//     if (req.params.filter == "sortByVotes") {
//       const dbProductData = await Product.findAll({
//         include: [
//           {
//             model: Product,
//             attributes: [],
//             order: sequelize.literal("votes", "DESC"),
//           },
//         ],
//       });
//     } else if (req.params.filter == "sortByRecent") {
//       const dbProductData = await Product.findAll({
//         include: [
//           {
//             model: Product,
//             attributes: [],
//             order: sequelize.literal("creation_at", "DESC"),
//           },
//         ],
//       });
//     } else {
//       throw new Error("Invalid Route");
//     }

//     const productPage = dbProductData.map((product) => {
//       product.get({ plain: true });
//     });

//     res.render("home", {
//       productPage,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     //status 500 -> server error, server doesn't know how to handle the route
//     res.status(500).json(err);
//   }
// });

router.post("/", withAuth, (req, res) => {
  Product.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    img_link: req.body.img_link,
    user_id: req.session.user.id,
  })
    .then((dbProductData) => {
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/image", withAuth, (req, res) => {
  uploadImg(req.body.userId, req.body.title, req.body.file)
    .then((img_link) => {
      res.json(img_link);
    })
    .catch((err) => {
      console.log(err);
      //server error code
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  //if newfile different
  Product.update(
    {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      img_link: req.body.img_link,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(404).json({ message: "No product found with this id" });
        return;
      }
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Product.destroy({
    where: { id: req.params.id },
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(404).json({ message: "No product found with this id" });
        return;
      }
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

export { router as default };
