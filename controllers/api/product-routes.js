const router = require("express").Router();
const withAuth = require("../../utils/auth");

//Theorhetical spaceholders for product model
const { Product } = require("../../models");
const sequelize = require("sequelize");

//GET for the products homepage
router.get("/", (req, res) => {
  Product.findAll({
    attributes: ["id", "title", "description", "price", "img_link"],
  })
    .then((dbProductData) => {
      const products = dbProductData.map((product) =>
        product.get({ plain: true })
      );
      res.render("home", { products });
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
//             attributes: attributes,
//             order: sequelize.literal("votes", "DESC"),
//           },
//         ],
//       });
//     } else if (req.params.filter == "sortByRecent") {
//       const dbProductData = await Product.findAll({
//         include: [
//           {
//             model: Products,
//             attributes: attributes,
//             order: sequelize.literal("creation_time", "DESC"),
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

router.put("/:id", withAuth, (req, res) => {
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

module.exports = router;
