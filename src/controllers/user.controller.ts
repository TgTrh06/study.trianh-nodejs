import { Request, Response } from "express";
import { UserService } from "../services/user.service";

class UserController {
  static async getCreateForm(_req: Request, res: Response): Promise<void> {
    try {
      const roleList = await UserService.getAllRoles();
      res.render("users/user-create", { roles: roleList });    
    } catch (error) {}
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, roleId } = req.body;

      await UserService.createUser(name, email, password, roleId);

      res.redirect("users/user-list")
    } catch (error) {
      console.log(error);
      res.status(500).send("Error creating user.");
    }
  }

  static async getAllUsers(_req: Request, res: Response): Promise<void> {
    const userList = await UserService.getAllUsers();
    console.log(userList);
    res.render("users/user-list", { users: userList });
  }
}

export default UserController;
