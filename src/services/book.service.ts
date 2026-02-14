import { AppDataSource } from "../models/DataSource";
import { Author } from "../models/entities/Author.entity";
import { Book } from "../models/entities/Book.entity";
import { ServiceResponse } from "../utils/types/common";

export class BookService {
  private static bookRepository = AppDataSource.getRepository(Book);
  private static authorRepository = AppDataSource.getRepository(Author);

  static async createBook(
    title: string,
    publishedYear: number,
    authorId: number,
  ): Promise<ServiceResponse<Book>> {
    try {
      const author = await this.authorRepository.findOneBy({ id: authorId });
      if (!author) {
        return { success: false, message: "Author not found." };
      }

      const book = new Book();
      book.title = title;
      book.publishedYear = publishedYear;
      book.author = author;

      await this.bookRepository.save(book);

      return {
        success: true,
        data: book,
        message: "Book created succesfully.",
      };
    } catch (error: any) {
      return { success: true, message: `Created failed: ${error.message}` };
    }
  }

  static async getAllBook(): Promise<ServiceResponse<Book[]>> {
    try {
      const books = await this.bookRepository.find({
        relations: ["author"],
      });
      return {
        success: true,
        data: books,
        message: "Books has been fetched successfully.",
      };
    } catch (error) {
      return { success: false, message: `Could not fetch books: ${error}` };
    }
  }

  static async updateBook(
    bookId: number,
    updateData: Partial<Book>,
  ): Promise<ServiceResponse<void>> {
    try {
      const result = await this.bookRepository.update(bookId, updateData);

      if (result.affected === 0) {
        return { success: false, message: "Book has not been updated" };
      }

      return { success: true, message: "Updated successfully." };
    } catch (error: any) {
      return { success: false, message: `Failed to update: ${error.message}` };
    }
  }

  static async deleteBook(bookId: number): Promise<ServiceResponse<void>> {
    try {
      const result = await this.bookRepository.delete(bookId);

      // No column has been deleted => Id does not exist
      if (result.affected === 0) {
        return { success: false, message: "Book not found." };
      }

      return { success: true, message: "Book deleted successfully." };
    } catch (error: any) {
      return { success: false, message: `Failed to delete: ${error.message}` };
    }
  }
}
