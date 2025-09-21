const mongoose = require('mongoose');
const {Schema, ObjectId ,model } = require('mongoose');

const userSchema = new Schema({
    email : {type : String , unqiue : true},
    password : String,
    firstName : String,
    lastName : String
})

const adminSchema = new Schema({
    email : {type : String , unqiue : true},
    password : String,
    firstName : String,
    lastName : String
})
const courseSchema = new Schema({
    creatorId : {
        type : ObjectId,
        ref : 'Admin'
    },
    title : String,
    description : String,
    price : Number,
    imageUrl : String 
})

const purchaseSchema = new Schema({
    userId : {
        type : ObjectId,
        ref : 'User'
    },
    courseId : {
        type : ObjectId,
        ref : 'Course'
    }
})


const userModel = model('User',userSchema);
const adminModel = model('Admin',adminSchema);
const courseModel = model('Course',courseSchema);
const purchaseModel = model('Purchase',purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}