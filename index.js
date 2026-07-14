import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {User} from './model/user.model.js'

const app = express()

app.post("/signup",async function(req, res){
    const {username, email, password} = req.body

    const salt = await bcrypt.genSalt(10) 

    const hashPassword = await bcrypt.hash(password, salt)

    await User.create({
        username: username,
        email: email,
        password: hashPassword
    })

    res.json({
        message: "user sign up"
    })
})
app.post("/signin", function(req, res){

})
app.post("/purchase-course", function(req, res){

})
app.get("/all-course", function(req, res){

})
app.get("/my-course", function(req, res){

})


app.listen(3000, ()=>{
    console.log("port is running");
    
})