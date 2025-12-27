import express from "express";
import todoController from "../../controller/todo/todo.controller.js";
import requireAuth from "../../middleware/auth.middleware.js";

const router = express.Router();

// Apply authenticaiton middleware to all blog routes
router.use(requireAuth);

// Private routes (accessible to all authenticated users)
router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
