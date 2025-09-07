function changebgcolor(index){
 if(index == 1){
   document.querySelector('body').setAttribute("style",'background-color:red;') 
}
else if(index == 2){
    document.querySelector('body').setAttribute("style",'background-color:blue;') 
 }
else if(index == 3){
    document.querySelector('body').setAttribute("style",'background-color:green;') 
 }
else if(index == 4){
    document.querySelector('body').setAttribute("style",'background-color:yellow;') 
 }
else if(index == 5){
    document.querySelector('body').setAttribute("style",'background-color:orangered;') 
 }
else if(index == 6){
    document.querySelector('body').setAttribute("style",'background-color:black;') 
 }
else{
    document.querySelector('body').setAttribute("style",'background-color:default;') 
 }

}