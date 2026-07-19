import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";

const userPurchase = async (req, res) => {
    const userId = req.userId

    const {courseId} = req.body

    const purchase = await Purchase.create({
        userId,
        courseId
    })

    res.json({
        courseId,
        message: "course purchased successfully done"
    })


}

const previewAllCourses = async (req, res) => {
    const prevAllCourses = await Course.find({
        
    })

    res.json({
        prevAllCourses
    })

}

export {
    userPurchase,
    previewAllCourses
}