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
    mnb.classList.remove('fa-caret-down');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-up');
})

$('#collapseOne').on('hidden.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[0];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-up');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-down');
})

$('#collapseTwo').on('show.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[1];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-down');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-up');
})

$('#collapseTwo').on('hidden.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[1];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-up');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-down');
})

$('#collapseThree').on('show.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[2];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-down');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-up');
})

$('#collapseThree').on('hidden.bs.collapse', function (e) {
    var mnb = document.getElementsByClassName("arrow-ic")[2];
    mnb.classList.remove('fas');
    mnb.classList.remove('fa-caret-up');
    mnb.classList.add('fas');
    mnb.classList.add('fa-caret-down');
})

function isIOS() {
	if (['iPhone Simulator', 'iPhone'].includes(navigator.platform) == true) {
		// return "iphone";
		return 5;
	} else if (['iPad Simulator', 'iPad'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document) == true) {
		// return "ipad";
		return 3;
	} else if ((navigator.userAgent.includes("Mac") && "ontouchend" in document) == true) {
		// return "mac";
		return 2
	} else {
		// return "window and android";
		return 0;
	}
}

function setAlignCombobox(value) {
	if (value > 0) {
		var cbb = document.getElementsByClassName("combobox");
		for (var i = 0; i < cbb.length; i++) {
			var width = cbb[i].clientWidth / value;
			cbb[i].style.paddingLeft = width + "px";
		}
	}
}

setAlignCombobox(isIOS());