import * as Common from './Common/common_function.js'

/* 
	SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("logoutOption").onclick = function() {Common.movePage('logout')};
}

/* 
	ONLOAD ACTION
*/
function onLoadAction() {
    setOptionMenu();
}


window.onload = onLoadAction;
