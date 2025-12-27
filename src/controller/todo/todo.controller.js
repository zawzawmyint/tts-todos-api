import todoService from "../../service/todo/todo.service.js";
class TodoController {
  async createTodo(req, res, next) {
    console.log(req);
    try {
      const { title, description, priority, category } = req.body;

      if (!title) {
        return res
          .status(400)
          .json({ success: false, message: "Title is required." });
      }

      const todo = await todoService.createTodo(req.user.id, {
        title,
        description,
        priority,
        category,
      });

      res.status(201).json({
        success: true,
        data: todo,
        message: "Todo created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async getTodos(req, res, next) {
    try {
      const { search, category, priority } = req.query;
      console.log(search);
      const todos = await todoService.getTodos({
        search,
        category,
        priority,
      });

      res.json({
        success: true,
        data: todos,
        message: "Todos retrieved successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async getTodoById(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const todo = await todoService.getTodoById(id);

      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Todo not found",
        });
      }

      res.json({
        success: true,
        data: todo,
        message: "Todo retrieved successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateTodo(req, res, next) {
    console.log("request user id", req.user.id);
    try {
      const { id } = req.params;
      const { title, description, completed, priority, category } = req.body;

      // Initialize with existing values
      let updateData = {
        title,
        description,
        completed,
        priority,
        category,
      };

      const exists = await todoService.todoExists(id);

      if (!exists) {
        return res.status(404).json({
          success: false,
          message: "Todo not found",
        });
      }

      // Check if user is authorized to update this user
      const todo = await todoService.getTodoById(id);
      console.log("todo user id", todo.userId);
      if (req.user.id !== todo.userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update this todo",
        });
      }

      if (!title) {
        return res.status(400).json({
          success: false,
          message: "Title is required.",
        });
      }

      const updatedtodo = await todoService.updateTodo(id, updateData);

      res.json({
        success: true,
        data: updatedtodo,
        message: "Todo updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const { id } = req.params;

      const exists = await todoService.todoExists(id);

      if (!exists) {
        return res.status(404).json({
          success: false,
          message: "Todo not found",
        });
      }

      // Check if user is authorized to update this user
      const todo = await todoService.getTodoById(id);

      if (req.user.id !== todo.userId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this todo",
        });
      }

      await todoService.deleteTodo(id);

      res.json({
        success: true,
        data: {},
        message: "Todo deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new TodoController();
