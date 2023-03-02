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
/* listBustCho */
var listBustCho;
/* list bustnyu */
var listBustNyu;
/* User Data */
const mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));

/* 
	SETUP OPTION MENU
*/
function setOptionMenu() {
	document.getElementById("menuOption").onclick = function () { Common.movePage('/menu.html') };
	document.getElementById("settingOption").onclick = function () { Common.movePage('/setting.html') };
	document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/* 
	SET ONCLICK ITEM
*/
function setOnClickItem() {
	var listTableItem = document.getElementsByClassName("card");
	for (var i = 0; i < listTableItem.length; i++) {
		var card = document.getElementById('card' + String(i));

		if (card.querySelector('#collapseItem' + String(i)) != null) {
			var item = document.getElementsByClassName("detailItem" + String(i));
			for (var idx = 0; idx < item.length; idx++) {
				item[idx].onclick = function () {
					Common.movePage("/purchase.html")
				}
			}
		} else {
			card.onclick = function () {
				Common.movePage("/purchase.html")
			}
		}
	}
}


/**
   * SEARCH CUSTOMER
*/
function getData() {
	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	$.ajax({
		url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_EARNING + StringCS.PR_KEY +
		// url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_EARNING + StringCS.PR_KEY +
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
			var listBusfcho = data.listBusfcho;
			var listBusfNyu = data.listBusfNyu;
			sessionStorage.setItem(StringCS.BUSFDATLIST, JSON.stringify(busfDatList));
			sessionStorage.setItem(StringCS.SHOFDATLIST, JSON.stringify(Array.from(shofDatList.entries())));
			sessionStorage.setItem(StringCS.LISTBUSTCHO, JSON.stringify(listBusfcho));
			sessionStorage.setItem(StringCS.LISTBUSTNYU, JSON.stringify(listBusfNyu));
			sessionStorage.setItem(StringCS.BUSFCHOITEM, JSON.stringify(data.mBusfDat_hmcd13));
			sessionStorage.setItem(StringCS.BUSFNYUITEM, JSON.stringify(data.mBusfDat_hmcd12));
			setData(shofDatList, busfDatList);
		},
		error: function (exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00003, null, StringCS.OK, null, false);
		},
		timeout: ValueCS.VL_LONG_TIMEOUT
	});
}


function setCusData() {
	document.getElementById("codeVal").innerHTML = Other.cutStringSpace(mUserData.mKokfDat.mCusCode);
	document.getElementById("nameVal").innerHTML = Other.cutStringSpace(mUserData.mKokfDat.mName);
}


/**
   * SET DATA
*/
function setData(shofDatList, busfDatList) {
	var dataMessage = document.getElementById("data-messages");
	var area = document.getElementById("accordion");
	var previousId = "";
	var idx = 0;
	if (shofDatList.size > 0 && busfDatList.length > 0) {
		dataMessage.style.display = "none";
		shofDatList.forEach((value, key) => {
			var collapse;
			collapse = createCollapseTitle(getValueCollapse(key), idx, value.length);
	
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
						const busfDat = Object.assign({}, busfDatList[parseInt(id.replaceAll("collapseItem",""))]);
						sessionStorage.setItem(StringCS.BUSFDATITEM, JSON.stringify(busfDat));
						Common.movePage('/purchase.html');
					};
				}
			} else {
				collapse.onclick = function () {
					const shofdat = Object.assign({}, value[0]);
					sessionStorage.setItem(StringCS.SHOFDATITEM, JSON.stringify(shofdat));
					var id = collapse.id;
					const busfDat = Object.assign({}, busfDatList[parseInt(id.replaceAll("card",""))]);
					sessionStorage.setItem(StringCS.BUSFDATITEM, JSON.stringify(busfDat));
					Common.movePage('/purchase.html');
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
	} else {
		dataMessage.innerText = Mess.E00008;
		dataMessage.style.display = "block";
	}
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
function createCollapseTitle(text, idx, ken) {
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
	itemCollapse.className += "item-collapse ";
	itemCollapse.className += "w-100p";

	const divText = document.createElement("div");
	divText.className += "w-75p ";
	divText.className += "float-l";

	const itemCollapseText = document.createElement("span");
	itemCollapseText.className += "text";
	itemCollapseText.appendChild(document.createTextNode(Other.cutStringSpace(text)));

	const divCount = document.createElement("div");
	divCount.className += "w-25p ";
	divCount.className += "float-r ";
	divCount.className += "ta-r";

	const itemCollapseCount = document.createElement("span");
	itemCollapseCount.className += "text";
	if (ken > 1) {
		itemCollapseCount.appendChild(document.createTextNode("(" + String(ken)+ "件" + ")"));
	}

	card.appendChild(cardHeader);
	cardHeader.appendChild(cardLink);
	cardLink.appendChild(itemCollapse);
	divText.appendChild(itemCollapseText);
	itemCollapse.appendChild(divText);
	divCount.appendChild(itemCollapseCount);
	divText.after(divCount);
	return card;
}


/**
   * SEARCH PRODUCT
   * @param value     [STRING]
*/
function searchProduct(value) {
	var listView = document.getElementById("accordion");
	setData(shofDatList, busfDatList);
	if (value.length > 0) {
		var listItem = document.getElementsByClassName("card");
		var shofDatListTemp = new Map(shofDatList);
		for (var i = 0; i < listItem.length; i++) {
			const name = listItem[i].childNodes;
			var itemVal = name[0].childNodes[0].childNodes[0].childNodes[0].textContent;
			var codeVal = itemVal.split(" ")[0];

			if (Other.cutStringSpace(itemVal).includes(Other.cutStringSpace(value))) {
				console.log(itemVal);
			} else {
				shofDatListTemp.delete(codeVal);
			}
		}

		while (listView.hasChildNodes()) {
			listView.removeChild(listView.firstChild);
		}
		if (shofDatListTemp.size != shofDatList.size) {
			setData(shofDatListTemp, busfDatList);
			listView.scrollTop = 0;
		}
	} else {
		setData(shofDatList, busfDatList);
		listView.scrollTop = 0;
	}
}


function setLayoutDefault() {
	const value = Other.nullToString(sessionStorage.getItem(StringCS.PRODUCTSTRING));
	if (value != "") {
		searchProduct(value);
	}
}


function prepareUriageData(kind) {
	var list = new Array();
	for (var i = 0; i < busfDatList.length; i++) {
		if (busfDatList[i].mKind == kind) {
			list.push(busfDatList[i]);
		}
	}
	return list;
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
	document.getElementById("kensakuButton").onclick = function () {
		const val = Other.cutStringSpace(document.getElementById("searchString").value);
		sessionStorage.setItem(StringCS.PRODUCTSTRING, val);
		searchProduct(val);
	};
	
    document.getElementById("backPageButton").onclick = function () {
	    Common.backAction();
	};

	var isEnable = false;
	if (mUserData.mHmefList != null) {
		if (mUserData.mHmefList.length > 0) {
			for (var i = 0; i < mUserData.mHmefList.length; i++) {
				if (mUserData.mHmefList[i].mUsef) {
					isEnable = true;
					break;
				}
			}
		}
	}

	
	if (isEnable) {
		document.getElementById("uriageListButton").disabled = false;
		document.getElementById("uriageListButton").onclick = function () {
			Common.movePage('/sales_list.html');
		};
	} else {
		document.getElementById("uriageListButton").disabled = true;
	}
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	Common.setupModal("load", null, Mess.I00010, null, null, null, false);
	setOptionMenu();
	onclickAction();
	setCusData();
	if (Other.nullToString(sessionStorage.getItem(StringCS.BUSFDATLIST)) != "" && Other.nullToString(sessionStorage.getItem(StringCS.SHOFDATLIST)) != "") {
		busfDatList = JSON.parse(sessionStorage.getItem(StringCS.BUSFDATLIST));
		shofDatList = new Map(JSON.parse(sessionStorage.getItem(StringCS.SHOFDATLIST)));
		const searchString = Other.nullToString(sessionStorage.getItem(StringCS.PRODUCTSTRING));
		if (searchString.length > 0) {
			document.getElementById("searchString").value = searchString
			searchProduct(searchString);
		} else {
			setData(shofDatList, busfDatList);
		}
		modal.style.display = "none";
	} else {
		getData();
	}
	setLayoutDefault();
}


window.addEventListener("pageshow", function(evt){
	if(evt.persisted){
	setTimeout(function(){
		window.location.reload();
	},10);
}
}, false);


window.onload = onLoadAction;