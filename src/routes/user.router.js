import {Router} from 'express'

const userRouter = Router()

userRouter.post("/signup", function(req, res){
    res.json({
        message: "sign up done over here"
    })
})

userRouter.post("/signin", function(req, res){
    res.json({
        message: "sign in"
    })
})

userRouter.post("/purchase-course", function(req, res){

})
export {
    userRouter
}