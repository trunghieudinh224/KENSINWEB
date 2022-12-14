import * as Common from './Common/common_function.js'
import * as Other from './Common/other_util.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'
import * as Dat from './Dat/dat.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* shofDatList */
var shofDatList;
/* busfDatList */
var busfDatList;

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
   * SEARCH CUSTOMER
*/
function getData() {

	Common.setupModal("load", null, Mess.I00001, null, null);
	$.ajax({
		// url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_EARNING + StringCS.PR_KEY + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_EARNING + StringCS.PR_KEY +
			"&login_id=" + sessionStorage.getItem(StringCS.USERNAME) +
			"&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		headers: {
			'Content-Type': StringCS.PR_CONTENT_TYPE
		},
		success: function (result) {
			
			const data = JSON.parse(result);
			shofDatList = data.m_MapShofDat;
			busfDatList = data.m_lstBufDat;
			modal.style.display = "none";
		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00003, StringCS.OK, null);
		},
		timeout: ValueCS.VL_LONG_TIMEOUT
	});
}


function setData() {
	for (var i = 0; i < shofDatList.length; i++) {
		
	}
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	setOptionMenu();
	setOnClickItem();
	getData();
}


window.onload = onLoadAction;