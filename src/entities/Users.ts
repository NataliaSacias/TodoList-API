import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, 
  BaseEntity, JoinTable
} from 'typeorm';

import { Tareas } from "./Tareas" 

@Entity()
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Tareas, tareas => tareas.users)
  tareas: Tareas[];
}