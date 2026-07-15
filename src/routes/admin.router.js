import { Router } from "express";
import { Admin } from "../models/admin.model.js";
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";

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
          adminId: admin._id,
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

adminRouter.post("/course", function(req, res){

})
adminRouter.put("/course", function(req, res){

})
adminRouter.get("/course/bulk", function(req, res){

})


export  {adminRouter}