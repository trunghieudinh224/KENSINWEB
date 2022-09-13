"use strict"

import * as constant from './Constant/message.js'

const closeBtn = document.querySelector("#close-icon");
const overlay = document.querySelector(".overlay");
const detail = document.querySelector("#detail-btn");

closeBtn.onclick = function(){
    overlay.classList.remove("overlay-animate");
}
detail.onclick = function(){
    overlay.classList.add("overlay-animate");
}
