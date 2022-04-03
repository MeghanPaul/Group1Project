const router = require("express").Router();
const withAuth = require("../../utils/auth");

//Theorhetical spaceholders for product model
const Products = require("../../models");
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

module.exports = router;
