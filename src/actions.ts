import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Tareas } from './entities/Tareas'
import { Exception } from './utils'
import jwt from "jsonwebtoken"

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}


export const deleteUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).delete(req.params.id);
		return res.json(users);
}


export const borrarTarea = async (req: Request, res: Response): Promise<Response> =>{
		const tarea = await getRepository(Tareas).delete(req.params.id);
		return res.json(tarea);
}



export const createTarea = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.tarea) throw new Exception("Please provide a tarea")
	// if(!req.body.descripcion) throw new Exception("Please provide a descripcion")
	if(!req.body.estado) throw new Exception("Please provide a estado")
	


	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {id: req.params.id }})
	if(!user) throw new Exception("El usuario no existe")
    const newTarea = getRepository(Tareas).create();  //Creo un tarea
    

    newTarea.tarea = req.body.tarea;
    newTarea.estado = req.body.estado;
    newTarea.users = user


  
	const results = await getRepository(Tareas).save(newTarea); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getTareas = async (req: Request, res: Response): Promise<Response> =>{
		const tareas = await getRepository(Tareas).find();
		return res.json(tareas);
}

export const getTareasPorUsuario = async (req: Request, res: Response): Promise<Response> =>{
		const tareas = await getRepository(Tareas).find(({ where: {users: req.params.id }}));
		return res.json(tareas);
}