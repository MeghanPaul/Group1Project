import express from 'express';
let router = express.Router();

import userRoutes from './user-routes.js';
import productRoutes from './product-routes.js';
import commentRoutes from './comment-routes.js';

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/comments", commentRoutes);

export {router as default};
