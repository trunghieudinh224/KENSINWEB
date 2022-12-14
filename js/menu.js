import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'

/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("logoutOption").onclick = function() {Common.movePage('logout')};
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("shuukeiButton").onclick = function() {Common.movePage('/total_page.html')};
    document.getElementById("settingListButton").onclick = function() {Common.movePage('/meter_reading_setting_page.html')};
    document.getElementById("settingButton").onclick = function() {Common.movePage('/setting_page.html')};
}


/* 
	SHOW DIALOG
*/
function showDialog() {
	var btn = document.getElementById("gyoomuButton");
	var overlay = document.querySelector(".overlay");
	var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
	document.getElementById("close-icon").onclick = function () {
		overlay.style.zIndex = "-1";
		wrapMainForm.classList.remove("overlay-animate");
	};

	btn.onclick = function () {
		overlay.style.zIndex = "2";
		wrapMainForm.classList.remove("overlay-animate");
	};

    document.getElementById("searchBtn1").onclick = function() {
        sessionStorage.setItem(StringCS.SEARCHMODE, "1");
        Common.movePage('/search_page.html');
    };
    document.getElementById("searchBtn2").onclick = function() {
        sessionStorage.setItem(StringCS.SEARCHMODE, "2");
        Common.movePage('/search_page.html');
    };
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    setOptionMenu();
    onclickAction();
    showDialog();
}


window.onload = onLoadAction;
