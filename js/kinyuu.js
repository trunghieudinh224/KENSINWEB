"use strict"

import * as constant from './Constant/message.js'

const closeBtn = document.querySelector("#close-icon");
const overlay = document.querySelector(".overlay");
const detail = document.querySelector("#detail-btn");
const wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");

closeBtn.onclick = function(){
    overlay.style.zIndex = "-1";
    wrapMainForm.classList.remove("overlay-animate");
}
detail.onclick = function(){
    overlay.style.zIndex = "2";
    wrapMainForm.classList.add("overlay-animate");
}
