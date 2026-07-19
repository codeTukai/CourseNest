import { Router } from "express";
import { adminMiddleware } from "../middleware/auth.middleware.js";
import { Course } from "../models/course.model.js";
import { adminLogin, adminRegister } from "../controller/admin.controller.js";


const adminRouter = Router()

adminRouter.post("/signup", adminRegister)
    




adminRouter.post("/signin",adminLogin)

adminRouter.post("/create-course", adminMiddleware,async function(req, res){
     const adminId = req.adminId
     const { title, description, imgUrl, price } = req.body

     const course = await Course.create({
      title: title,
      description: description,
      price:price,
      imgUrl: imgUrl,
      owner: adminId
     })

    return res.json({
        message: "course created",
        courseId: course._id
     })
})
adminRouter.put("/update-course", adminMiddleware,async function(req, res){
  const adminId = req.adminId
  const { title, description, imgUrl, price, courseId } = req.body

  const updateCourse = await Course.findByIdAndUpdate(
    {
      _id: courseId,
      owner: adminId

    },
     
    {
      $set:{
        title,
         description,
          imgUrl, 
          price
      }
      
    },{
      new: true
    }
  )
 return res.status(201).json({
  updateCourse,
  message: "course updated"
})

})

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