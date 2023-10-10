import {Router} from 'express';
import {Todo} from '../models/todos';

const router=Router();

let todos:Todo[]=[];

type RequestBody={text:string}
type RequestParams={todoId:string}

router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos})
})

router.post('/todo',(req,res,next)=>{

    const body=req.body as RequestBody
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:body.text,
    }
    todos.push(newTodo);
    return res.status(200).json({message:'Added todo',todo:newTodo,todos:todos})
})

router.put('/todo/:todoId',(req,res,next)=>{
    const params=req.params as RequestParams
   const tid=params.todoId
   
   const body=req.body as RequestBody
   const todoIndex=todos.findIndex((todoItem)=>todoItem.id===tid);
   if(todoIndex>=0){
    todos[todoIndex]={id:todos[todoIndex].id,text:body.text}
    return res.status(200).json({message:'updated todo',todos:todos})
   }
   return res.status(401).json({message:'Couldn not find todo for this id'})
})

router.delete('/todo/:todoId',(req,res,next)=>{
    const tid=req.params.todoId;
     todos=todos.filter((todoItem)=>todoItem.id!==tid);
    
    return res.status(200).json({message:'Deleted todo',todos:todos})
 })

export default router;
