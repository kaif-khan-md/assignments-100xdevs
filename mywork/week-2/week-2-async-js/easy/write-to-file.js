const fs = require('fs');


function exp_op(){
    let sum = 0;
    for(let i = 0;i<100000;i++ )
    {
        sum +=1;
     }
     console.log(sum);
}




const data = "The data to be written is this.";
fs.writeFile('b.txt',data,(err)=>{
     if(err)
     {
        console.log(err);
        return; 
    }
     console.log('the data has been added to the file');
});

exp_op();