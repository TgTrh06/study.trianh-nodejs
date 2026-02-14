import { AppDataSource } from "../models/DataSource";
import { Author } from "../models/entities/Author.entity";

export class AuthorService {
  private static authorRepository = AppDataSource.getRepository(Author);
  
  static async createAuthor(
    name: string,
    biography: string,
  ) {
    const author = new Author();

    author.name = name;
    author.biography = biography;

    await this.authorRepository.save(author);
  }

  static async getAllAuthor() {
    const authors = await this.authorRepository.find();
    if (!authors) {
      return { success: false };
    }
    return { success: true, data: authors };
  }
}