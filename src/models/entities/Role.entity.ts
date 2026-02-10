import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "./User.entity";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => User, (user) => user.role)
  user!: User[];
}