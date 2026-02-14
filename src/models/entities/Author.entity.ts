import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book.entity";

@Entity("authors")
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  biography!: string;

  @OneToMany(() => Book, (book) => book.author)
  books!: Book[];
}