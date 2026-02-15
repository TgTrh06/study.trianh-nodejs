import { AppDataSource } from "../models/DataSource";
import { Author } from "../models/entities/Author.entity";
import { ServiceResponse } from "../utils/types/common";

export class AuthorService {
  private static authorRepository = AppDataSource.getRepository(Author);

  static async createAuthor(
    name: string,
    biography: string,
  ): Promise<ServiceResponse<Author>> {
    try {
      const author = new Author();

      author.name = name;
      author.biography = biography;

      await this.authorRepository.save(author);

      return {
        success: true,
        data: author,
        message: "Author created successfully.",
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to create author: ${error.message}`,
      };
    }
  }

  static async getAllAuthor(): Promise<ServiceResponse<Author[]>> {
    try {
      const authors = await this.authorRepository.find();
      if (!authors) {
        return { success: false, message: "No author has been found." };
      }

      return {
        success: true,
        data: authors,
        message: "Authors have been fetched successfully.",
      };
    } catch (error: any) {
      return { success: false, message: `Failed to fetch authors: ${error.message}`}
    }
  }
}
