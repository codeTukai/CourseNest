import { Router } from "express";
import { adminMiddleware } from "../middleware/auth.middleware.js";
import { Course } from "../models/course.model.js";
import { adminLogin, adminRegister, createCourse, updateCourse } from "../controller/admin.controller.js";


const adminRouter = Router()

adminRouter.post("/signup", adminRegister)
    




adminRouter.post("/signin",adminLogin)

adminRouter.post("/create-course", adminMiddleware, createCourse )
  
adminRouter.put("/update-course", adminMiddleware,updateCourse)

adminRouter.get("/allCourse/bulk",adminMiddleware, async function(req, res){
  const adminId = req.adminId

  const getAllCourse = await Course.find({
    owner: adminId
  })

  res.json({
    getAllCourse,
    message: "true"
  })

})


export  {adminRouter}