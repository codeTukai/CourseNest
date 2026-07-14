import { Router } from "express";

const adminRouter = Router()

adminRouter.post("/signup", function(req, res){
    res.json({
        message: "sign up done over here"
    })
})

adminRouter.post("/signin", function(req, res){
    res.json({
        message: "sign in"
    })
})

adminRouter.post("/course", function(req, res){

})
adminRouter.put("/course", function(req, res){

})
adminRouter.get("/course/bulk", function(req, res){

})


export  {adminRouter}