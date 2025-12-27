import express from "express";
import UserController from "../../controller/user/user.controller.js";
import requireAuth from "../../middleware/auth.middleware.js";

const router = express.Router();
router.use(requireAuth); // Apply to all routes for authentication
// Protected routes
router.get("/", UserController.getUsers); // cacheMiddleware is used to cache the response for 10 seconds

export default router;
