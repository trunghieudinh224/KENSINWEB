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


$('#collapseOne').on('show.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[0];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-up');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-down');
})

$('#collapseOne').on('hidden.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[0];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-down');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-up');
})

$('#collapseTwo').on('show.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[1];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-up');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-down');
})

$('#collapseTwo').on('hidden.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[1];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-down');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-up');
})

$('#collapseThree').on('show.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[2];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-up');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-down');
})

$('#collapseThree').on('hidden.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[2];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-down');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-up');
})