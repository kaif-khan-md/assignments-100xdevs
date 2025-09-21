const {Router} = require('express');
const userRouter = Router();
const {z} = require('zod');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {userModel, purchaseModel, courseModel} = require('../db');

const {userMiddleware} = require('../middlewares/user'); 
const { JWT_USER_PASSWORD } = require('../config');

userRouter.post('/signup', async (req,res)=>{
    
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
        await userModel.create({
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
            message : 'Signed in Sucessfully'
        })
    }

})

userRouter.post('/signin',async (req,res)=>{

    const {email , password} =  req.body;

    const user = await userModel.findOne({
        email : email
    })

    const comparedPassword = await bcrypt.compare(password,user.password)

    if(user && comparedPassword){
        const token = jwt.sign({
            id : user._id.toString()
        },JWT_USER_PASSWORD)

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

userRouter.get('/purchases',userMiddleware, async (req,res)=>{
        const userId = req.userId;

        const purchases = await purchaseModel.find({
            userId
        })

        const coursesData = await courseModel.find({
            _id : { $in : purchases.map(x => x.courseId)}
        })

        res.json({
            purchases,
            coursesData

        })

})

module.exports = {
    userRouter : userRouter
}