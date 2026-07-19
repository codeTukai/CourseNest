import { Router } from "express";
import { User } from "../models/user.models.js";
import { Purchase } from "../models/purchase.model.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middleware/auth.middleware.js";

import { Course } from "../models/course.model.js";
import { userLogin, userRegister } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/signup", userRegister);

userRouter.post("/signin", userLogin);

userRouter.get("/purchase-course", userMiddleware, async function (req, res) {
  const userId = req.userId;

const purchase = await Purchase.find({
  userId
})

const courseData = await Course.find({
  _id:{$in: purchase.map(c=>c.courseId)}
})

  // const purchasesCourse = await Purchase.aggregate([
  //   {
  //     $match: {
  //       userId: new mongoose.Types.ObjectId(userId)
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "courses",
  //       localField: "courseId", //search
  //       foreignField: "_id", //matching user or log-in user
  //       as: "course",
  //     },
  //   },
  //   {
  //     $unwind: "$course",
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       purchaseId: "$_id",
  //       courseId: "$course._id",
  //       title: "$course.title",
  //       description: "$course.description",
  //       imgUrl: "$course.imgUrl",
  //       price: "$course.price",
  //     },
  //   },
  // ]);


  res.json({
  
    courseData
  });
});

export { userRouter };
