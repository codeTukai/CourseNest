import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userRegister = async (req, res) => {
    const { email, firstName, lastName, password} = req.body

    try {
        const existedUser = await User.findOne({ email });
    
        if (existedUser) {
          res.json({
            message: "user already register with this email",
          });
        }
    
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);
    
        const user = await User.create({
          email: email,
          password: hashPassword,
          firstName: firstName,
          lastName: lastName,
        });
    
        return res.status(201).json({
          user,
          message: "user registration successfully done",
        });
      } catch (error) {
        res.status(501).json({
          error: error.message,
          message: "Something with wrong",
        });
      }
   
}

const userLogin = async (req, res) => {
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
}

export {
    userRegister,
    userLogin
}