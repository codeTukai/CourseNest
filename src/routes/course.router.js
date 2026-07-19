import { Router } from "express";
import {userMiddleware} from '../middleware/auth.middleware.js'
import { previewAllCourses, userPurchase } from "../controller/course.controller.js";


const courseRouter = Router()


courseRouter.post("/purchase",userMiddleware, userPurchase)

courseRouter.get("/preview", previewAllCourses)
    

    
export {
    courseRouter
}