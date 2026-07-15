import jwt from 'jsonwebtoken'
import { Admin } from '../models/admin.model.js'
import { User } from '../models/user.models.js'

const adminMiddleware = async (req, res, next) => {
    const token = req.headers.token
    const decodeData = jwt.verify(token, process.env.ADMIN_JSON_SECRET)
    console.log(decodeData);
    if (decodeData) {
        req.adminId = decodeData.id;
        next()
    } else {
        res.status(403).json({
            message: "you are not sign in"
        })
    }


}
const userMiddleware = async (req, res, next) => {
    const token = req.headers.token
    const decodeData = jwt.verify(token, process.env.USER_JSON_SECRET)
    console.log(decodeData);

   
    

    if (decodeData) {
        req.userId = decodeData.userId;
        next()
    } else {
        res.status(403).json({
            message: "you are not sign in"
        })
    }


}

export {
    adminMiddleware,
    userMiddleware
}