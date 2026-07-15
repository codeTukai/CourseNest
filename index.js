import express from 'express'
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'
import { connectedDB } from './src/DB/db.js'

import { userRouter } from './src/routes/user.router.js'
import { courseRouter } from './src/routes/course.router.js'
import {adminRouter} from './src/routes/admin.router.js'

const app = express()

app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter)




const PORT = 3000
connectedDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`SERVER RUNNING ON: ${PORT}`);
    })
})
.catch((error)=>{
    console.log("DB connection Failed!!", error);
})