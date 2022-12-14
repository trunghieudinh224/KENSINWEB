import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'

/*****  VIEW VARIABLE  *****/
/* resultTable */
const table = document.getElementById("htsetTable");
/* dataMessage */
const dataMessage = document.getElementById("data-messages");
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* systemdat */
var systemDat = JSON.parse(sessionStorage.getItem(StringCS.SYSTEMDAT));


/*****  FUNCTION  *****/
/**
   * INITIALIZE COMBOBOX
*/


/**
   * SET DATA
*/
function setData() {
	while (table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}

	if (systemDat.m_lstHtSetDat != null) {
		if (systemDat.m_lstHtSetDat.length > 0) {
			var list = systemDat.m_lstHtSetDat;
			for (var i = 0; i < list.length; i++) {
				const newElement = document.createElement("tr");
				const col1 = document.createElement("td");
				col1.className += " text";
				const col2 = document.createElement("td");
				col2.className += " text";
				const col3 = document.createElement("td");
				col3.className += " text";
				const col4 = document.createElement("td");
				col4.className += " text";
				col1.appendChild(document.createTextNode(list[i].code));
				col2.appendChild(document.createTextNode(list[i].name.trim()));
				col3.appendChild(document.createTextNode(list[i].kind.trim()));
				col4.appendChild(document.createTextNode(list[i].tanname.trim()));
				newElement.appendChild(col1);
				newElement.appendChild(col2);
				newElement.appendChild(col3);
				newElement.appendChild(col4);
				table.appendChild(newElement);
				newElement.onclick = function () {	
					var object = list[this.rowIndex];
					sessionStorage.setItem(StringCS.HTSETDATCODE, object.code);
					Common.movePage('/menu_page.html');
				};
			}
		} else {

		}
	} else {

	}
}


/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
	document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	setOptionMenu();
	setData();
}


window.onload = onLoadAction;