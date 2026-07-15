import { Router } from "express";
import { Admin } from "../models/admin.model.js";
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";

import { adminMiddleware } from "../middleware/auth.middleware.js";
import { Course } from "../models/course.model.js";


const adminRouter = Router()






adminRouter.post("/signup",async function(req, res){
    const { email, firstName, lastName, password } = req.body;


  try {
    const existedAdmin = await Admin.findOne({ email });

    if (existedAdmin) {
      res.json({
        message: "admin already register with this email",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      email: email,
      password: hashPassword,
      firstName: firstName,
      lastName: lastName,
    });

    return res.status(201).json({
      admin,
      message: "admin registration successfully done",
    });
  } catch (error) {
    res.status(501).json({
      error: error.message,
      message: "Something with wrong",
    });
  }
})

adminRouter.post("/signin",async function(req, res){
   const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      res.json({
        message: "admin not found",
      });
    }

    const correctPassword = await bcrypt.compare(password, admin.password);

    if (correctPassword) {
      const token = jwt.sign(
        {
          email,
          id: admin._id,
        },
        process.env.ADMIN_JSON_SECRET
      );

      return res.status(201).json({
        token,
        message: "admin log in successfully",
      });
    } else {
      res.status(401).json({
        message: "password does't match",
      });
    }
  } catch (error) {
    res.status(501).json({
      error: error.message,
      message: "Something with wrong",
    });
  }
})

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