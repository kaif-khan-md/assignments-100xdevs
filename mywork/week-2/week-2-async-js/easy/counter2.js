let counter = 0;

function Count(){
    console.log(counter);
    counter+=1;
    
setTimeout(Count,1000);

}

setTimeout(Count,1000);