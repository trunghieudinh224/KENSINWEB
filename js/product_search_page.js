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
		// url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_EARNING + StringCS.PR_KEY +
		url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_EARNING + StringCS.PR_KEY +
			"&login_id=" + sessionStorage.getItem(StringCS.USERNAME) +
			"&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		headers: {
			'Content-Type': StringCS.PR_CONTENT_TYPE
		},
		success: function (result) {
			modal.style.display = "none";
			const data = JSON.parse(result);
			busfDatList = data.m_lstBufDat;
			shofDatList = new Map(Object.entries(data.m_MapShofDat))
			setData();
		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00003, StringCS.OK, null);
		},
		timeout: ValueCS.VL_LONG_TIMEOUT
	});
}


/**
   * SET DATA
*/
function setData() {
	var area = document.getElementById("accordion");
	var previousId = "";
	var idx = 0;
	shofDatList.forEach((value, key) => {
		// console.log("values: " + values + " / " + "key: " + keys + "\n");
		var collapse;
		collapse = createCollapseTitle(getValueCollapse(key), idx);

		if (value.length > 1) {
			const collapseItem = document.createElement("div");
			collapseItem.className += "collapse ";
			collapseItem.className += "collapseItem" + String(idx);
			collapseItem.id = "collapseItem" + String(idx);
			collapseItem.setAttribute("data-parent", "#accordion");

			const cardBody = document.createElement("div");
			cardBody.className += "card-body";

			const tableContainer = document.createElement("div");
			tableContainer.className += "table-container";

			const table = document.createElement("table");
			table.className += "result-detail";
			table.id += "detail" + String(idx);

			collapse.appendChild(collapseItem);
			collapseItem.appendChild(cardBody);
			cardBody.appendChild(tableContainer);
			tableContainer.appendChild(table);
			for (var i = 0; i < value.length; i++) {
				const tr = document.createElement("tr");
				tr.className += "h-40 ";
				tr.className += "hover ";
				tr.className += "detailItem" + String(idx);
				tr.id = "detailItem" + String(idx) + "_" + String(i);

				const td = document.createElement("td");
				
				const span = document.createElement("span");
				span.className += "text ";
				span.className += "pd-l-20";
				var itemDetail = String(value[i].mShono);
				span.appendChild(document.createTextNode(itemDetail.length > 1 ? itemDetail : ("0" + itemDetail)));

				tr.appendChild(td);
				td.appendChild(span);
				table.appendChild(tr);
				tr.onclick = function () {
					const shofdat = Object.assign({}, value[this.rowIndex]);
					sessionStorage.setItem(StringCS.SHOFDATITEM, JSON.stringify(shofdat));
					var id = (this.parentElement).parentElement.parentElement.parentElement.id;
					const busfDat = Object.assign({}, busfDatList[parseInt(id.substring(id.length-1, id.length))]);
					sessionStorage.setItem(StringCS.BUSFDATITEM, JSON.stringify(busfDat));
					Common.movePage('/purchase_page.html');
				};
			}
		} else {
			collapse.onclick = function () {
				const shofdat = Object.assign({}, value[0]);
				sessionStorage.setItem(StringCS.SHOFDATITEM, JSON.stringify(shofdat));
				var id = collapse.id;
				const busfDat = Object.assign({}, busfDatList[parseInt(id.substring(id.length-1, id.length))]);
				sessionStorage.setItem(StringCS.BUSFDATITEM, JSON.stringify(busfDat));
				Common.movePage('/purchase_page.html');
			};
		}

		if (idx == 0) {
			area.appendChild(collapse);
			previousId = collapse.id;
		} else {
			const preElement = document.getElementById(previousId);
			preElement.after(collapse);
			previousId = collapse.id;
		}
		
		idx++;
	})
}


/**
   * GET VALUE COLLAPSE
   * @param hino     [STRING]
*/
function getValueCollapse(hino) {
	var result = hino + " ";
	for (var i = 0; i < busfDatList.length; i++) {
		if (busfDatList[i].mHinno == parseInt(hino)) {
			result += busfDatList[i].mName;
			break;
		}
	}
	return result;
}


/**
   * CREATE COLLAPSE TITLE
   * @param text     [STRING]
   * @param idx     [INT]
*/
function createCollapseTitle(text, idx) {
	const card = document.createElement("div");
	card.className += "card ";
	card.className += "card-" + String(idx);
	card.id = "card" + String(idx);

	const cardHeader = document.createElement("div");
	cardHeader.className += "card-header";

	const cardLink = document.createElement("span");
	cardLink.className += "card-link";
	cardLink.setAttribute("data-toggle", "collapse");
	cardLink.setAttribute("href", "#collapseItem" + String(idx));

	const itemCollapse = document.createElement("div");
	itemCollapse.className += "item-collapse";

	const itemCollapseText = document.createElement("span");
	itemCollapseText.className += "text";
	itemCollapseText.appendChild(document.createTextNode(Other.cutStringSpace(text)));

	card.appendChild(cardHeader);
	cardHeader.appendChild(cardLink);
	cardLink.appendChild(itemCollapse);
	itemCollapse.appendChild(itemCollapseText);
	return card;
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