import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author.entity";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  publishedYear: number;

  // Author of the book
  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: "author_id" })
  author!: Author;
}