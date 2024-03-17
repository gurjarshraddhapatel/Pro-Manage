const express = require('express');
const protectRoute = require('../middleware/protectRoute');
const {todoList,getTodo} = require('../controlers/proManageRouter');



const todoRouter = express.Router();
 
todoRouter.post("/todo",todoList)
 
todoRouter.get("/gettodo",getTodo)

module.exports=todoRouter;