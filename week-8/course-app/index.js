require('dotenv').config();

const express = require('express');
const PORT = 3000;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const { userRouter } = require('./routes/user');
const { adminRouter } = require('./routes/admin');
const { courseRouter } = require('./routes/course');

const app = express();


app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);

async function main(){
    console.log("connected to db");
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})

}

main();

