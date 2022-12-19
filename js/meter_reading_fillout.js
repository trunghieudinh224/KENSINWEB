import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'

/* 
	* SET DEFAULT COLLAPSE
*/
function setDefaultCollapse() {
	var mode = sessionStorage.getItem(StringCS.KINYUUMODE);
	if (mode == 3) {
		$('.collapseThree').collapse()
	} else {
		$('.collapseOne').collapse()
	}
}


/* 
	* CHECK OPERATING SYSTEM
*/
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

/* 
	* SET ALIGN COMBOBOX
*/
function setAlignCombobox(value) {
	if (value > 0) {
		var cbb = document.getElementsByClassName("combobox");
		for (var i = 0; i < cbb.length; i++) {
			var width = cbb[i].clientWidth / value;
			cbb[i].style.paddingLeft = width + "px";
		}
	}
}


/* 
	SETUP OPTION MENU
*/
function setOptionMenu() {
	document.getElementById("menuOption").onclick = function () { Common.movePage('/menu.html') };
	document.getElementById("settingOption").onclick = function () { Common.movePage('/setting.html') };
	document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


setAlignCombobox(isIOS());
setDefaultCollapse();
setOptionMenu();