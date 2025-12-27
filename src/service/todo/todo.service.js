import { prisma } from "../../lib/prisma.js";

class TodoService {
  async createTodo(userId, todo) {
    const { title, description, priority, category } = todo;

    return prisma.todo.create({
      data: {
        title,
        description,
        userId,
        priority,
        category,
      },
    });
  }

  async getTodos(filters = {}) {
    const { search, category, priority } = filters;

    console.log("Todos filters", filters);
    const whereClause = {};

    // filtered by cateogry
    if (category && category !== "ALL") {
      whereClause.category = category;
    }

    // filtered by priority
    if (priority && priority !== "ALL") {
      whereClause.priority = priority;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category) {
    }

    return await prisma.todo.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async getTodoById(id) {
    return await prisma.todo.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async updateTodo(id, todo) {
    const { title, description, completed, priority, category } = todo;

    console.log("Todo", todo);

    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    if (priority !== undefined) updateData.priority = priority;
    if (category !== undefined) updateData.category = category;

    return prisma.todo.update({
      where: { id: id },
      include: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      data: updateData,
    });
  }

  async deleteTodo(id) {
    // Delete the todo
    return prisma.todo.delete({
      where: { id: id },
    });
  }

  async todoExists(id) {
    const count = await prisma.todo.count({
      where: { id: id },
    });
    return count > 0;
  }
}

export default new TodoService();
