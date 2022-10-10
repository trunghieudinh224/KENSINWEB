"use strict"
import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'

const mUserData = JSON.parse(localStorage.getItem("UserData"));

const closeBtn = document.querySelector("#close-icon");
const overlay = document.querySelector(".overlay");
const detail = document.querySelector("#detail-btn");
const wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");

window.onload = setDefaultCollapse;

function setDefaultCollapse() {
    var mode = sessionStorage.getItem(StringCS.KINYUUMODE);
    if (mode == 3) {
        $('.collapseThree').collapse()
    } else {
        $('.collapseOne').collapse()
    }
}

closeBtn.onclick = function(){
    overlay.style.zIndex = "-1";
    wrapMainForm.classList.remove("overlay-animate");
}
detail.onclick = function(){
    overlay.style.zIndex = "2";
    wrapMainForm.classList.add("overlay-animate");
}

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

/* 
	SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("menuOption").onclick = function() {Common.movePage('/menu_page.html')};
    document.getElementById("settingOption").onclick = function() {Common.movePage('/setting_page.html')};
    document.getElementById("logoutOption").onclick = function() {Common.movePage('logout')};
}
setOptionMenu();