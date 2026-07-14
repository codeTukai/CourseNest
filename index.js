import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { userRouter } from './src/routes/user.router.js'
import { courseRouter } from './src/routes/course.router.js'
import {adminRouter} from './src/routes/admin.router.js'

const app = express()

app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter)




app.listen(3000, ()=>{
    console.log("port is running");
    
})