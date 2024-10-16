import express from 'express';
import protect from '../MiddleWare/Authorization.js';
import  {createTodo, GetTodo , deleteTodo , CheckTodo , UpdateTodo}  from '../Controllers/todo.controller.js';

const router = express.Router();

router.post("/create",protect,createTodo)
router.post("/get",protect,GetTodo) 
router.post("/delete",protect,deleteTodo) 
router.post("/CheckTodo",protect,CheckTodo) 
router.post("/UpdateTodo",protect,UpdateTodo) 

export default router