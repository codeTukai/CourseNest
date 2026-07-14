import mongoose, {Schema} from "mongoose";


const courseSchema = new Schema({
   title:{
    type: String,
    require: true
   },
   description:{
    type: String,
    require: true
   },
   imgUrl:{
    type: String,
    require: true
   },
   owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
   }
   
},{timestamps: true})

export const Course = mongoose.model("Course", courseSchema)