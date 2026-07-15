import { Router } from "express";
import {userMiddleware} from '../middleware/auth.middleware.js'
import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";

const courseRouter = Router()


courseRouter.post("/purchase",userMiddleware, async function(req, res){
    const userId = req.userId
    const {courseId} = req.body

    const purchaseCourse = await Purchase.create({
        userId,
        courseId
    })

    res.json({
        courseId,
        message: "course purchased successfully done"
    })
})
courseRouter.get("/preview", async function(req, res){
    

    const prevAllCourses = await Course.find({
        
    })

    res.json({
        prevAllCourses
    })
})

export {
    courseRouter
}