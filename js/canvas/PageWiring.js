function isSeededChanged(){
    if(document.getElementById("isSeeded").checked){
        document.getElementById("seed").disabled = false;
        document.getElementById("seededWidth").disabled = false;
        document.getElementById("seededHeight").disabled = false;
    }else{
        document.getElementById("seed").disabled = true;
        document.getElementById("seededWidth").disabled = true;
        document.getElementById("seededHeight").disabled = true;
    }
}