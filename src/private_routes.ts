/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

// declare a new router to include all the endpoints
const router = Router();

router.get('/user', safe(actions.getUsers));
router.delete('/user/:id', safe(actions.deleteUsers));
router.get('/tarea/:id', safe(actions.getTareasPorUsuario));
router.get('/tarea/', safe(actions.getTareas));
router.post('/tarea/:id', safe(actions.createTarea));
router.delete('/tarea/:id', safe(actions.borrarTarea));

export default router;
