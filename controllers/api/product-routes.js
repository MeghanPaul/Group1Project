const router = require("express").Router();
const withAuth = require("../../utils/auth");

//Theorhetical spaceholders for product model
const { Product } = require("../../models");
const sequelize = require("sequelize");

//GET for the products homepage
router.get("/:filter", async (req, res) => {
  //theorhetical attribute names
  const attributes = [
    "img_link",
    "title",
    "description",
    "price",
    "user_id",
    "votes",
    "creation_time",
  ];

  try {
    if (filter == "sortByVotes") {
      const dbProductData = await Products.findAll({
        include: [
          {
            model: Products,
            attributes: attributes,
            order: sequelize.literal("votes", "DESC"),
          },
        ],
      });
    } else if (filter == "sortByRecent") {
      const dbProductData = await Products.findAll({
        include: [
          {
            model: Products,
            attributes: attributes,
            order: sequelize.literal("creation_time", "DESC"),
          },
        ],
      });
    } else {
      throw new Error("Invalid Route");
    }

    const productPage = dbProductData.map((product) => {
      product.get({ plain: true });
    });

    res.render("home", {
      productPage,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    //status 500 -> server error, server doesn't know how to handle the route
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  Product.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    img_link: req.body.img_link,
    user_id: req.body.user_id,
  })
    .then((dbProductData) => {
      console.log(dbProductData);
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
