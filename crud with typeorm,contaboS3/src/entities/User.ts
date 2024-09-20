// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   email: string;

//   @Column({ nullable: true }) // Allow the imageUrl to be null
//   imageUrl?: string;
// }
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Use `!` to tell TypeScript that this will be initialized later by TypeORM

  @Column()
  name!: string; // Ensure name is initialized (or add `?` to make it optional)

  @Column()
  email!: string; // Ensure email is initialized (or add `?` to make it optional)

  @Column({ nullable: true })
  imageUrl?: string; // This is allowed to be undefined or null
}
