const {Router} = require('express');
const { adminModel, courseModel } = require('../db');
const adminRouter = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {z} = require('zod');
const { JWT_ADMIN_PASSWORD } = require('../config');
const {adminMiddleware} = require('../middlewares/admin');

adminRouter.post('/signup',async (req,res)=>{
      
    const requiredData = z.object({
        email : z.string().min(8).max(30).email(),
        password : z.string().min(8).max(15),
        firstName : z.string().min(4).max(15),
        lastName : z.string().min(4).max(15)
    })

    const parsedData = requiredData.safeParse(req.body);

    if(!parsedData.success){
        res.json({
            message : 'Incorrect format'
        })
        return 
    }

    const {email , password, firstName , lastName} = req.body;

    const hashedPassword = await bcrypt.hash(password , 10);

    let errorThrown = false;
    
    try{
        await adminModel.create({
            email : email,
            password : hashedPassword,
            firstName : firstName,
            lastName : lastName            
        })
    }
    catch(e){
        res.status(409).send({
            message : 'email exists'
        })
        errorThrown = true;
    }

    if(!errorThrown){
        res.status(200).send({
            message : 'Signed up Sucessfully'
        })
    }
  
})

adminRouter.post('/signin',async (req,res)=>{

    const {email,password} =  req.body;

    const admin = await adminModel.findOne({
        email : email
    })

    const comparedPassword = await bcrypt.compare(password,admin.password)

    if(admin && comparedPassword){
        const token = jwt.sign({
            id : admin._id.toString()
        },JWT_ADMIN_PASSWORD)

        res.json({
            token : token,
            message : "You are signed in"
        })
    }
    else{
        res.json({
            message : "Invalid Credentials"
        })
    }


})

adminRouter.post('/course',adminMiddleware ,async (req,res)=>{
    const adminId = req.adminId;

    const {title , description , price , imageUrl } = req.body;

    const course  = await courseModel.create({
        creatorId : adminId,
        title : title,
        description : description,
        price : price,
        imageUrl : imageUrl
    })

    res.json({
        message : 'Course created',
        courseId : course._id
    })
})

adminRouter.put('/course',adminMiddleware,async (req,res)=>{
    const adminId = req.adminId;

    const {courseId, title, description , price, imageUrl} = req.body;

    const course = await courseModel.updateOne({
        _id : courseId,
        creatorId : adminId
    },{
        title : title,
        description : description,
        price : price,
        imageUrl : imageUrl
    })

    res.json({
        message : "Course updated",
        courseId : course._id
    })
})          


adminRouter.get('/courses/bulk',adminMiddleware,async (req,res)=>{
    const adminId  = req.adminId;

    const courses = await courseModel.find({
        creatorId : adminId
    })
    res.json({
        courses
    })
})

module.exports = {
    adminRouter : adminRouter
}