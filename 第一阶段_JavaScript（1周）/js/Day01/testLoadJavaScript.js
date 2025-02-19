// window.onload=function(){
//     var btn=document.getElementById("btn");
//     btn.onclick=function() {
//         var input = document.getElementById("input");
//         console.log(input.value);
//     }

//教我写JavaScript 关于document.addeventlistener()
window.onload=function() {
    var btn=document.getElementById("btn");
    btn.addEventListener("click",function() {
        var input = document.getElementById("input");
        console.log(input.value);
    })
}



