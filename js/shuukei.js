"use strict";
const overlay = document.querySelector(".overlay");
const nippou = document.querySelector("#nippou");
const closeBtn = document.querySelector(".overlay .container-mainform .wrap-mainform span");
console.log(nippou);
console.log(closeBtn);

nippou.onclick = function(){
    overlay.style.zIndex = "2";
    overlay.classList.add("overlay-animate");
}

closeBtn.onclick = function(){
    overlay.style.zIndex = "-1";
    overlay.classList.remove("overlay-animate");
}