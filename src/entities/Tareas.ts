import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, 
  BaseEntity, JoinTable
} from 'typeorm';

import {Users} from "./Users"

@Entity()
export class Tareas extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
 
//   @Column()
//   password: string;

  @Column()
  tarea: string;

//   @Column()
//   descripcion: string;

  @Column()
  estado: boolean;


@ManyToOne(() => Users, users => users.tareas)
users: Users;
}