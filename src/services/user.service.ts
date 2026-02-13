import { AppDataSource } from "../models/DataSource";
import { User } from "../models/entities/User.entity";
import { Role } from "../models/entities/Role.entity";

export class UserService {
  private static userRepository = AppDataSource.getRepository(User);
  private static roleRepository = AppDataSource.getRepository(Role);

  static async createUser(
    name: string,
    email: string,
    password: string,
    roleId: number,
  ) {
    const role = await this.roleRepository.findOneBy({ id: roleId });
    if (!role) {
      throw new Error("Role not found.");
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = role;
    
    await this.userRepository.save(user);
  }

  static async getAllUsers() {
    return await this.userRepository.find({
      relations: ["role"],
    });
  }

  static async getAllRoles() {
    return await this.roleRepository.find();
  }
}