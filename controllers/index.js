import express from 'express';
let router = express.Router();

import apiRoutes from './api/index.js';
import homeRoutes from './home-routes.js';
import profileRoutes from './profile-routes.js';

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);

export {router as default};
