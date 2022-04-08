import express from 'express';
let router = express.Router();

<<<<<<< HEAD
import userRoutes from './user-routes.js';
import productRoutes from './product-routes.js';
=======
const userRoutes = require("./user-routes");
const productRoutes = require("./product-routes");
const commentRoutes = require("./comment-routes");
>>>>>>> ac15442998608eebec7e85b96b76a9669cf44f19

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/comments", commentRoutes);

export {router as default};
