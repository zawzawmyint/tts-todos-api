import { prisma } from "../../lib/prisma.js";

class UserService {
  // Get all users
  async getUsers() {
    return await prisma.user.findMany();
  }
}

export default new UserService();
