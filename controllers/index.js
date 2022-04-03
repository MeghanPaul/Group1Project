const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const profileRoutes = require("./profile-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.arguments("/profile", profileRoutes);

module.exports = router;
