import mongoose, {Schema} from "mongoose";

const purchaseSchema = new Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export const Purchase = mongoose.model("Purchase", purchaseSchema)