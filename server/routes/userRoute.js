const express = require('express')
const protectRoute = require('../middleware/protectRoute')
const getUsers = require('../controlers/userController')

const userRouter = express.Router()

userRouter.get("/",protectRoute,getUsers)


module.exports=userRouter

