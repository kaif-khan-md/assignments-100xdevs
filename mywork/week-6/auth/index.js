const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "randomgeneratednumber";
const PORT = 3000;
const app = express();

const users = [];

app.use(express.json());

// function generateToken() {
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//     let token = "";
//     for(let i = 0 ; i < 32 ;i++){
//         token += options[Math.floor(Math.random()*options.length)];
//     }
//     return token;
   
// }
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/signup",(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  
  users.push({
    username,
    password
   })

   res.json({
    message:"Signed Up Successfully."
   })
})

app.post("/signin",(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;

  let user = users.find(user => user.username === username && user.password === password);

  if(user){
    let token = jwt.sign({
        username : username
    },JWT_SECRET);
    // user.token = token;
    res.json({
        token
    })
  }
  else{
    res.status(403).send({
        message : "Invalid Credentials"
    })
  }
})

function auth(req,res,next){
    const token = req.headers.authorization;
    const decodedUrl = jwt.verify(token,JWT_SECRET);
    if(decodedUrl.username){
        req.username = decodedUrl.username
        next();
    }
    else{
        res.json({
            message : "Unauthorized"
        })
    }
}

app.get("/me",auth,(req,res)=>{
    
    const user = users.find(user => user.username === req.username);

    if(user){
        res.json({
            username : user.username

        })
    }
    else{
        res.status(401).send({
            message : "Unauthorized."
        })
    }
})

app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})