import { Request, Response } from "express";
import { AuthorService } from "../services/author.service";

class AuthorController {
  static async getCreateForm(_req: Request, res: Response) {
    try {
      res.render("authors/author-create");
    } catch (error) {}
  }
  
  static async createAuthor(req: Request, res: Response) {
    try {
      const { name, biography } = req.body;

      await AuthorService.createAuthor(name, biography);

      res.redirect("authors/author-list");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error creating author.");
    }
  }

  static async getAllAuthor(_req: Request, res: Response) {
    const authorList = await AuthorService.getAllAuthor();
    console.log(authorList);
    res.render("authors/author-list", { authors: authorList });
  }
}

export default AuthorController;