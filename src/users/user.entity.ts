import { Column, Entity } from 'typeorm';
import { PrimaryColumn } from 'typeorm/decorator/columns/PrimaryColumn';

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column({ nullable: false })
  password: string;
}
