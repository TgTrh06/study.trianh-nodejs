import { Request, Response } from "express";
import { UserService } from "../services/user.service";

class UserController {
  static async getCreateForm(_req: Request, res: Response): Promise<void> {
    try {
      const roleList = UserService.getAllRoles();
      res.render("users/user-create", { roleList });    
    } catch (error) {}
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, roleId } = req.body;

      UserService.createUser(name, email, password, roleId);

      res.redirect("users/user-list")
    } catch (error) {
      console.log(error);
      res.status(500).send("Error creating user.");
    }
  }

  static async getAllUsers(_req: Request, res: Response): Promise<void> {
    const userList = UserService.getAllUsers();
    console.log(userList);
    res.render("users/user-list", { users: userList });
  }
}

export default UserController;
