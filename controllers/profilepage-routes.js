const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  Post.findAll({
    where: {
      id: req.session.user_id,
    },
  });
});
