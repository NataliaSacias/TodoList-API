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

  @Column({unique: true})
  estado: boolean;


@ManyToOne(() => Users, user => user.tareas)
user: Users;
}