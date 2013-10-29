function isSeededChanged(){
    if(document.getElementById("isSeeded").checked){
        document.getElementById("seedOptions").style.display="block";
    }else{
        document.getElementById("seedOptions").style.display="none";
    }
}