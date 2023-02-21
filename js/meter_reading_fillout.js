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
	SETUP OPTION MENU
*/
function setOptionMenu() {
	document.getElementById("menuOption").onclick = function () { Common.movePage('/menu.html') };
	document.getElementById("settingOption").onclick = function () { Common.movePage('/setting.html') };
	document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


setDefaultCollapse();
setOptionMenu();