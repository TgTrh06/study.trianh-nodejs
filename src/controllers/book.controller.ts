import { Request, Response } from "express";
import { AuthorService } from "../services/author.service";
import { BookService } from "../services/book.service";

class BookController {
  static async getCreateForm(_req: Request, res: Response) {
    try {
      const authorList = await AuthorService.getAllAuthor();
      res.render("books/book-create", { authors: authorList.data });
    } catch (error) {}
  }

  static async createBook(req: Request, res: Response) {
    try {
      const { title, publishedYear, authorId } = req.body;

      await BookService.createBook(title, publishedYear, authorId);

      res.redirect("books/book-list");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error creating book.");
    }
  }

  static async getAllBooks(_req: Request, res: Response) {
    const bookList = await BookService.getAllBook();
    console.log(bookList);
    res.render("books/book-list", { books: bookList });
  }

  static async deleteBook(req: Request, res: Response) {
    const { id } = req.params;
    
    const result = await BookService.deleteBook(Number(id));
    if (!result.success) {
      return res.status(400).send(result.message);
    }

    res.redirect("books/book-list")
  }
}

export default BookController;