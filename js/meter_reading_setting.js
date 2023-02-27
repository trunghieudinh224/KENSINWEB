import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'

/*****  VIEW VARIABLE  *****/
/* resultTable */
const table = document.getElementById("htsetTable");

/*****  DATA VARIABLE  *****/
/* systemdat */
var systemDat = JSON.parse(sessionStorage.getItem(StringCS.SYSTEMDAT));


/*****  FUNCTION  *****/
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
				const col5 = document.createElement("td");
				col5.className += " text";
				const icon = document.createElement("i");
				icon.className += "ic-check ";
				icon.className += "fas ";
				icon.className += "fa-check-circle";
				col1.appendChild(document.createTextNode(list[i].code));
				col2.appendChild(document.createTextNode(list[i].name.trim()));
				col3.appendChild(document.createTextNode(list[i].kind.trim()));
				col4.appendChild(document.createTextNode(list[i].tanname.trim()));
				if (sessionStorage.getItem(StringCS.HTSETDATCODE) == String(list[i].code)) {
					col5.appendChild(icon);
				} else {
					col5.appendChild(document.createTextNode(""));
				}
				newElement.appendChild(col1);
				newElement.appendChild(col2);
				newElement.appendChild(col3);
				newElement.appendChild(col4);
				newElement.appendChild(col5);
				table.appendChild(newElement);
				newElement.onclick = function () {	
					var object = list[this.rowIndex];
					sessionStorage.setItem(StringCS.HTSETDATCODE, object.code);
					Common.movePage('/menu.html');
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


window.addEventListener('popstate', function(event) {
    // The popstate event is fired each time when the current history entry changes.

    var r = confirm("You pressed a Back button! Are you sure?!");

    if (r == true) {
        // Call Back button programmatically as per user confirmation.
        history.back();
        // Uncomment below line to redirect to the previous page instead.
        // window.location = document.referrer // Note: IE11 is not supporting this.
    } else {
        // Stay on the current page.
        history.pushState(null, null, window.location.pathname);
    }

    history.pushState(null, null, window.location.pathname);

}, false);