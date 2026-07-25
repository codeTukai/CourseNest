import { Router } from "express";
import { adminMiddleware } from "../middleware/auth.middleware.js";
import { Course } from "../models/course.model.js";
import { adminLogin, adminRegister, createCourse, getAllCourse, updateCourse } from "../controller/admin.controller.js";


const adminRouter = Router()

adminRouter.post("/signup", adminRegister)
    




adminRouter.post("/signin",adminLogin)

adminRouter.post("/create-course", adminMiddleware, createCourse )
  
adminRouter.put("/update-course", adminMiddleware,updateCourse)

adminRouter.get("/allCourse/bulk",adminMiddleware, getAllCourse)


export  {adminRouter}