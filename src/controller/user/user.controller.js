import userService from "../../service/user/user.service.js";

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
