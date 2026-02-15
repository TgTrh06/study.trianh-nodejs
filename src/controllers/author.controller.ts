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

      const result = await AuthorService.createAuthor(name, biography);

      console.log(result.data);

      res.redirect("/authors");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error creating author.");
    }
  }

  static async getAllAuthors(_req: Request, res: Response) {
    const authorList = await AuthorService.getAllAuthor();
    console.log(authorList);
    res.render("authors/author-list", { authors: authorList.data });
  }
}

export default AuthorController;