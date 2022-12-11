import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'

/* 
	SETUP OPTION MENU
*/
function setOptionMenu() {
	document.getElementById("menuOption").onclick = function () { Common.movePage('/menu_page.html') };
	document.getElementById("settingOption").onclick = function () { Common.movePage('/setting_page.html') };
	document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/* 
	TITLE ONCLICK
*/
function titleOnclick(title, idForm) {
	var tableForm = document.getElementsByClassName("dialog_form");
	for (var i = 0 ; i < tableForm.length; i++) {
		tableForm[i].style.display = "none";
	}
	var form = document.getElementById(idForm);
	form.style.display = "block"

	var title = document.getElementById(title);
	var overlay = document.querySelector(".overlay");
	var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
	document.getElementById("close-icon").onclick = function () {
		overlay.style.zIndex = "-1";
		wrapMainForm.classList.remove("overlay-animate");
	};

	title.onclick = function () {
		overlay.style.zIndex = "2";
		wrapMainForm.classList.remove("overlay-animate");
	};
}


/* 
	SETUP TITLE CLICK
*/
function setupTitleClick() {
	titleOnclick("receipt_text", "receipt_form");
	titleOnclick("cho_text", "receipt_form");
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	setOptionMenu();
	setupTitleClick();
}


window.onload = onLoadAction;