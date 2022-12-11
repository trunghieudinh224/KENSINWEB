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
	SET ONCLICK ITEM
*/
function setOnClickItem() {
	var listTableItem = document.getElementsByClassName("card");
	for (var i = 0; i < listTableItem.length; i++) {
		var card = document.getElementById('card' + String(i));

		if (card.querySelector('#collapseItem' + String(i)) !== null) {
			var item = document.getElementsByClassName("detailItem" + String(i));
			for (var idx = 0; idx < item.length; idx++) {
				item[idx].onclick = function () {
					Common.movePage("/purchase_page.html")
				}
			}
		} else {
			card.onclick = function () {
				Common.movePage("/purchase_page.html")
			}
		}
	}
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	setOptionMenu();
	setOnClickItem();
}


window.onload = onLoadAction;