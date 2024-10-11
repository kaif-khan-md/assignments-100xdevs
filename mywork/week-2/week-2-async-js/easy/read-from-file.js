const fs  = require('fs');

fs.readFile('a.txt','utf-8',(err,data)=>{
    if(err)
    {
        console.log(err);
    }
    console.log('content : ' + data);
});

function exp_op()
{
    let sum = 0;
    for(let i = 0; i < 10000 ; i++)
        {
            sum+=i;
        }
        console.log("The sum is : " + sum);
}

exp_op();