import express from 'express';
let router = express.Router();

import userRoutes from './user-routes.js';
import productRoutes from './product-routes.js';

router.use("/users", userRoutes);
router.use("/products", productRoutes);

export {router as default};
