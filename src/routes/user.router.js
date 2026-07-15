import { Router } from "express";
import { User } from "../models/user.models.js";
import { Purchase } from "../models/purchase.model.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middleware/auth.middleware.js";
import mongoose from "mongoose";
import { Course } from "../models/course.model.js";

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, firstName, lastName, password } = req.body;

  try {
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      res.json({
        message: "User already register with this email",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      email: email,
      password: hashPassword,
      firstName: firstName,
      lastName: lastName,
    });

    return res.status(201).json({
      message: "user registration successfully done",
    });
  } catch (error) {
    res.status(501).json({
      error: error.message,
      message: "Something with wrong",
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.json({
        message: "user not found",
      });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (correctPassword) {
      const token = jwt.sign(
        {
          email,
          userId: user._id,
        },
        process.env.USER_JSON_SECRET
      );

      return res.status(201).json({
        token,
        message: "user log in successfully",
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
});

userRouter.get("/purchase-course", userMiddleware, async function (req, res) {
  const userId = req.userId;

const purchase = await Purchase.find({
  userId
})

const allPurchaseCourse = await Course.find({
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
  
    allPurchaseCourse
  });
});

export { userRouter };
