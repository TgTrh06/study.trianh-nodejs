import { AppDataSource } from "../models/DataSource";
import { Author } from "../models/entities/Author.entity";
import { Book } from "../models/entities/Book.entity";

export class BookService {
  private static bookRepository = AppDataSource.getRepository(Book);
  private static authorRepository = AppDataSource.getRepository(Author);

  static async createBook(
    title: string,
    publishedYear: number,
    authorId: number,
  ) {
    const author = await this.authorRepository.findOneBy({ id: authorId })
    if (!author) {
      throw new Error("Author not found.");
    }

    const book = new Book();
    book.title = title;
    book.publishedYear = publishedYear;
    book.author = author;
    
    await this.bookRepository.save(book);
  }

  static async getAllBook() {
    return await this.bookRepository.find({
      relations: ["author"],
    });
  }

  static async getAllAuthor() {
    return await this.authorRepository.find();
  }

  static async deleteBook(
    bookId: number,
  ) {
    const book = await this.bookRepository.findOneBy({ id: bookId })
    if (!book) {
      throw new Error("Book not found.");
    }
    
    await this.bookRepository.delete(book);
  }
}