import { Task } from './../tasks/task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  @OneToMany(type => Task, task => task.user, {eager: true})
  tasks: Task[]

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
