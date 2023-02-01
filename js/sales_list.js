import * as Common from './Common/common_function.js'
import * as Other from './Common/other_util.js'
import * as StringCS from './Constant/strings.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");
/* resultTable */
const table = document.getElementById("htsetTable");

/*****  DATA VARIABLE  *****/
/* systemdat */
var systemDat = JSON.parse(sessionStorage.getItem(StringCS.SYSTEMDAT));
/** ユーザー情報 */
var mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));


/*****  FUNCTION  *****/
/**
   * SET DATA
*/
function setData() {
	while (table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}

	if (mUserData.mHmefList != null) {
		if (mUserData.mHmefList.length > 0) {
			var list = mUserData.mHmefList;
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				const newElement = document.createElement("tr");
				const col1 = document.createElement("td");
				col1.className += " text";
				const col2 = document.createElement("td");
				col2.className += " text";
				const col3 = document.createElement("td");
				col3.className += " text";
				const col4 = document.createElement("td");
				col4.className += " text";
				col4.className += " del";
				const icon = document.createElement("i");
				icon.className += "ic-del ";
				icon.className += "fas ";
				icon.className += "fa-trash";
				col1.appendChild(document.createTextNode(item.mDenm + "/" + item.mDend));
				col2.appendChild(document.createTextNode(Other.cutStringSpace(item.mHmName)));
				col3.appendChild(document.createTextNode(Other.formatDecial(item.mKin + item.mTax) + " 円"));
				col4.appendChild(icon);
				newElement.appendChild(col1);
				newElement.appendChild(col2);
				newElement.appendChild(col3);
				newElement.appendChild(col4);
				table.appendChild(newElement);
				icon.onclick = function () {
					var mess = "品目:" + Other.cutStringSpace(item.mHmName) + "を削除しますか?";
					Common.setupModal("question", StringCS.SAKUJO_KAKUNIN, mess, StringCS.IIE, StringCS.HAI, null, false);
					var buttonConfirm = document.getElementsByClassName("button-1")[0];
					buttonConfirm.onclick = function () {
						modal.style.display = "none";
						table.deleteRow(this.rowIndex);
					}
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


/* 
	ONCLICK ACTION
*/
function onClickAction() {
	document.getElementById("backPageButton").onclick = function () {
		Common.backAction();
	};


	document.getElementById("printButton").onclick = function () {
		modal.style.display = "none";
		document.getElementById("editView").style.display = "none";
		document.getElementById("printView").style.display = "block";
		// preparePrintData();
		// createImageForm();
	}


	// document.getElementById("backPrintButton").onclick = function () { Common.backAction() };
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	setOptionMenu();
	onClickAction();
	setData();
}


window.onload = onLoadAction;