const {Router} = require('express');
const { purchaseModel, courseModel } = require('../db');
const { userMiddleware } = require('../middlewares/user');
const courseRouter = Router();

courseRouter.post('/purchase',userMiddleware,async (req,res)=>{
    const userId = req.userId;

    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId : userId,
        courseId : courseId
    })

    res.json({
        message : 'course has been purchased'
    })

})

courseRouter.get('/preview',async(req,res)=>{
    const userId = req.userId;

    const courses = await courseModel.find({});

    res.json({
        message : "All courses available here",
        courses
    })
    
})

module.exports = {
    courseRouter: courseRouter
}