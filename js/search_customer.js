import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'
import * as Other from './Common/other_util.js'

/*****  VIEW VARIABLE  *****/
/* searchType */
const searchType = document.getElementById("search-type");
/* searchPart */
const searchPart = document.getElementById("search-part");
/* searchOrder */
const searchOrder = document.getElementById("search-order");
/* searchKey */
const searchKey = document.getElementById("search-key");
/* resultTable */
const table = document.getElementsByClassName("result-tb")[0];
/* dataMessage */
const dataMessage = document.getElementById("data-messages");
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* systemdat */
var systemDat = JSON.parse(sessionStorage.getItem(StringCS.SYSTEMDAT));
/* setting data */
var dataSetting = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));
/* hanku list */
var hankuList;
/* shuku list */
var shukuList;
/* tantname list */
var tantnameList;
/* tantname item */
var tantnameItem = ["kentan", "shutan", "uritan"];

var cuslList = JSON.parse(sessionStorage.getItem(StringCS.CUSTLIST));

var searchMode = sessionStorage.getItem(StringCS.SEARCHMODE);

var conditionData = {
	searchKind: "",
	searchKey: "",
	searchPart: "",
	searchOrder: "",
	kenstat: "",
	shustat: "",
	uristat: "",
	hanku: "",
	shuku: "",
	kentan: "",
	shutan: "",
	uritan: ""
};


/*****  FUNCTION  *****/
/**
   * SETUP LAYOUT
*/
function setupLayout() {
	var title = document.getElementById("titleForm");
	if (searchMode == "1") {
		title.innerHTML = "検針顧客一覧";
		var itemSearch = document.getElementsByClassName("searchItem2");
		for (var i = itemSearch.length - 1; i >= 0; i--) {
			itemSearch[i].remove();
		}

		var searchKeyArea = document.getElementById("searchKeyArea");
		searchKeyArea.classList.remove("col-8")
		searchKeyArea.classList.remove("pd-r-0")
		searchKeyArea.classList += " col-12";
		searchKeyArea.style.paddingRight = "none"
	} else {
		var itemSearch = document.getElementsByClassName("searchItem1");
		for (var i = itemSearch.length - 1; i >= 0; i--) {
			itemSearch[i].remove();
		}
	}
}


/**
   * INITIALIZE COMBOBOX
*/
function initCombobox() {
	hankuList = systemDat.lstHanku;
	shukuList = systemDat.lstShuku;
	tantnameList = systemDat.m_lstTantName;
	setdataCbb("dropdown-hanku", hankuList, "hanku");
	setdataCbb("dropdown-shuku", shukuList, "shuku");
	setdataCbb("dropdown-tantname", tantnameList, null);
}


/**
   * SET DATA FOR COMBOBOX
   *
   * @param dropdownName     [STRING]
   * @param data     [LIST]
   * @param itemName     [STRING]
*/
function setdataCbb(dropdownName, data, itemName) {
	if (data == null || data.length == 0) {
		return;
	}
	const dropdownList = document.getElementsByClassName(dropdownName);
	for (var idx = 0; idx < dropdownList.length; idx++) {
		const dropdown = dropdownList[idx];
		for (var i = 0; i < data.length; i++) {
			const li = document.createElement("li");
			li.className += "checkbox-in-ddl";
			const label = document.createElement("label");
			label.className += "text";
			const input = document.createElement("input");
			input.className += "chb-item";
			if (dropdownList.length > 1) {
				input.className += " " + tantnameItem[idx];
			} else {
				input.className += " " + itemName;
			}

			input.setAttribute("type", "checkbox");
			li.appendChild(label);
			label.appendChild(input);
			input.after(data[i].name.trim());
			dropdown.appendChild(li);
		}
	}
}


/**
   * SET MAX LENGTH SEARCHING DATA
*/
function setMaxLengthInput() {
	var searchInput = document.getElementById("search-key");
	searchInput.value = "";
	switch (searchType.value) {
		case "0":
			searchInput.maxLength = (systemDat.mSystemDat != null) ? systemDat.mSystemDat.KCDLEN : 15;
			searchInput.type = "tel";
			break;
		case "1":
			searchInput.maxLength = 20;
			searchInput.type = "text";
			break;
		case "2":
			searchInput.maxLength = 15;
			searchInput.type = "tel";
			break;
		case "3":
			searchInput.maxLength = 10;
			searchInput.type = "text";
			break;
	}
}


/**
   * GET VALUE RADIO
   *
   * @param radioName     [STRING]
*/
function getValueRadio(radioName) {
	var radio = document.getElementsByName(radioName);
	for (var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			return String(i);
		}
	}
}


/**
   * GET VALUE CHECKBOX
   *
   * @param checkboxName     [STRING]
   * @param data     [LIST]
*/
function getValueCheckbox(checkboxName, data) {
	var result = "";
	var checkbox = document.getElementsByClassName(checkboxName);
	for (var i = 0; i < checkbox.length; i++) {
		if (checkbox[i].checked == true) {
			if (result.length > 0) {
				result += ",";
			}
			result = result + String(data[i].code);
		}
	}
	return result;
}


/**
   * GET CUSTOMER LIST TYPE 1
*/
function getCuslistType1() {
	sessionStorage.setItem(StringCS.SEARCHSTRING, searchKey.value.trim());

	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	$.ajax({
		url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_CUSLIST + StringCS.PR_KEY +
			// url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_CUSLIST + StringCS.PR_KEY +
			"&tancd=" + dataSetting.tancd + "&htset=" + sessionStorage.getItem(StringCS.HTSETDATCODE) + "&order=" + dataSetting.order +
			"&login_id=" + sessionStorage.getItem(StringCS.USERNAME) +
			"&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		headers: {
			'Content-Type': StringCS.PR_CONTENT_TYPE
		},
		success: function (result) {
			while (table.hasChildNodes()) {
				table.removeChild(table.firstChild);
			}

			const data = JSON.parse(result);
			if (data.cuslist != null) {
				if (data.cuslist.length > 0) {
					modal.style.display = "none";
					cuslList = data.cuslist;
					sessionStorage.setItem(StringCS.CUSTLIST, JSON.stringify(data.cuslist));
					for (var i = 0; i < data.cuslist.length; i++) {
						const newElement = document.createElement("tr");
						const newName = document.createElement("td");
						newName.className += " text";
						const newAddress = document.createElement("td");
						newAddress.className += " text";
						const newKenshin = document.createElement("td");
						newKenshin.className += " text";
						const newShuuku = document.createElement("td");
						newShuuku.className += " text";
						newName.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(data.cuslist[i].name))));
						newAddress.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(data.cuslist[i].add_0))));
						var kenstatVal = document.createTextNode((data.cuslist[i].kenstat == 1 ? "済" : "未"));
						newKenshin.appendChild(kenstatVal);
						newShuuku.appendChild(document.createTextNode(getShuukuVal(newShuuku, data.cuslist[i].shuku, data.cuslist[i].shustat)));
						newElement.appendChild(newName);
						newElement.appendChild(newAddress);
						newElement.appendChild(newKenshin);
						newElement.appendChild(newShuuku);
						
						if (searchMode == "1") {
							if (sessionStorage.getItem(StringCS.CUSTOMERINDEX) != null) {
								if (parseInt(sessionStorage.getItem(StringCS.CUSTOMERINDEX)) == i) {
									newElement.style.background = "#d9a691";
								}
							}
						}
						table.appendChild(newElement);
						newElement.onclick = function () {
							var object = data.cuslist[this.rowIndex];
							sessionStorage.setItem(StringCS.CUSTOMERINDEX, this.rowIndex);
							if (searchMode == "1") {
								object.taishoo = searchOrder.options[searchOrder.selectedIndex].text;
							}
							
							if (object.kenstat == 1) {
								Common.setupModal("question", null, Mess.I00006, StringCS.IIE, StringCS.HAI, null, false);
								var buttonConfirm = document.getElementsByClassName("button-1")[0];
								buttonConfirm.onclick = function () {
									const cusdat = Object.assign({}, object);
									sessionStorage.setItem(StringCS.CUSDAT, JSON.stringify(cusdat));
									Common.movePage('/customer.html');
									modal.style.display = "none";
									table.style.display = "none";
								}
							} else {
								const cusdat = Object.assign({}, object);
								sessionStorage.setItem(StringCS.CUSDAT, JSON.stringify(cusdat));
								Common.movePage('/customer.html');
								table.style.display = "none";
							}

						};
					}

					if (table.hasChildNodes()) {
						document.getElementsByClassName("table-container")[0].style.display = "block";
						document.getElementById("data-messages").style.display = "none";
						document.getElementById("countList").innerHTML = "検索件数：" + table.childElementCount + "件";
						document.getElementById("countList").style.display = "block";
						if (sessionStorage.getItem(StringCS.CUSTOMERINDEX) != null) {
							scrollToItemList(parseInt(sessionStorage.getItem(StringCS.CUSTOMERINDEX)));
						} else {
							scrollToItemList(0);
						}

					} else {
						document.getElementsByClassName("table-container")[0].style.display = "none";
						document.getElementById("countList").style.display = "none";
						document.getElementById("data-messages").style.display = "block";
					}
					dataMessage.style.display = "none";
				} else {
					dataMessage.innerText = Mess.E00001;
					dataMessage.style.display = "block";
					document.getElementById("countList").style.display = "none";
					Common.setupModal("success", null, Mess.E00005, null, StringCS.OK, null, false);
				}
			} else {
				dataMessage.innerText = Mess.E00001;
				dataMessage.style.display = "block";
				document.getElementById("countList").style.display = "none";
				Common.setupModal("success", null, Mess.E00005, null, StringCS.OK, null, false);
			}
		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00003, null, StringCS.OK, null, false);
		},
		timeout: ValueCS.VL_LONG_TIMEOUT
	});
}

function searchCusType1(searchVal) {
	var list = [];
	if (Other.cutStringSpace(searchVal) == "") {
		list = cuslList;
	} else {
		let type = String(searchType.value);
		for (var i = 0; i < cuslList.length; i++) {
			if (type == "0") {
				if (Other.cutStringSpace(cuslList[i].kcode).includes(Other.cutStringSpace(searchVal))) {
					list.push(cuslList[i]);
				}
			} else if (type == "1") {
				if (Other.cutStringSpace(cuslList[i].name).includes(Other.cutStringSpace(searchVal))) {
					list.push(cuslList[i]);
				}
			}
		}
	}

	if (list.length > 0) {
		while (table.hasChildNodes()) {
			table.removeChild(table.firstChild);
		}

		for (var i = 0; i < list.length; i++) {
			const newElement = document.createElement("tr");
			const newName = document.createElement("td");
			newName.className += " text";
			const newAddress = document.createElement("td");
			newAddress.className += " text";
			const newKenshin = document.createElement("td");
			newKenshin.className += " text";
			const newShuuku = document.createElement("td");
			newShuuku.className += " text";
			newName.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(list[i].name))));
			newAddress.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(list[i].add_0))));
			var kenstatVal = document.createTextNode((list[i].kenstat == 1 ? "済" : "未"));
			newKenshin.appendChild(kenstatVal);
			newShuuku.appendChild(document.createTextNode(getShuukuVal(newShuuku, list[i].shuku, list[i].shustat)));
			newElement.appendChild(newName);
			newElement.appendChild(newAddress);
			newElement.appendChild(newKenshin);
			newElement.appendChild(newShuuku);
			
			if (searchMode == "1") {
				if (sessionStorage.getItem(StringCS.CUSTOMERINDEX) != null) {
					if (parseInt(sessionStorage.getItem(StringCS.CUSTOMERINDEX)) == i) {
						newElement.style.background = "#d9a691";
					}
				}
			}
			table.appendChild(newElement);
			newElement.onclick = function () {
				var object = list[this.rowIndex];
				sessionStorage.setItem(StringCS.CUSTOMERINDEX, getIndexCustomer(object.cusrec));
				if (searchMode == "1") {
					object.taishoo = searchOrder.options[searchOrder.selectedIndex].text;
				}

				if (object.kenstat == 1) {
					Common.setupModal("question", null, Mess.I00006, StringCS.IIE, StringCS.HAI, null, false);
					var buttonConfirm = document.getElementsByClassName("button-1")[0];
					buttonConfirm.onclick = function () {
						const cusdat = Object.assign({}, object);
						sessionStorage.setItem(StringCS.CUSDAT, JSON.stringify(cusdat));
						Common.movePage('/customer.html');
						modal.style.display = "none";
						table.style.display = "none";
					}
				} else {
					const cusdat = Object.assign({}, object);
					sessionStorage.setItem(StringCS.CUSDAT, JSON.stringify(cusdat));
					Common.movePage('/customer.html');
					table.style.display = "none";
				}

			};
		}

		if (table.hasChildNodes()) {
			document.getElementsByClassName("table-container")[0].style.display = "block";
			document.getElementById("data-messages").style.display = "none";
			document.getElementById("countList").innerHTML = "検索件数：" + table.childElementCount + "件";
			document.getElementById("countList").style.display = "block";
			if (sessionStorage.getItem(StringCS.CUSTOMERINDEX) != null) {
				scrollToItemList(parseInt(sessionStorage.getItem(StringCS.CUSTOMERINDEX)));
			} else {
				scrollToItemList(0);
			}

		} else {
			dataMessage.innerText = Mess.E00001;
			document.getElementsByClassName("table-container")[0].style.display = "none";
			document.getElementById("countList").style.display = "none";
			document.getElementById("data-messages").style.display = "block";
		}
	} else {
		dataMessage.innerText = Mess.E00001;
		document.getElementsByClassName("table-container")[0].style.display = "none";
		document.getElementById("countList").style.display = "none";
		document.getElementById("data-messages").style.display = "block";
	}
}


function getIndexCustomer(cusrec) {
	for (var i = 0; i < cuslList.length; i++) {
		if (cuslList[i].cusrec == cusrec) {
			return i;
		}
	}
}


/**
   * SEARCH CUSTOMER TYPE 2
*/
function searchCusType2() {
	setConditionData();
	sessionStorage.setItem(StringCS.SEARCHSTRING, searchKey.value.trim());

	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	$.ajax({
		url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
			// url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
			"&srch_kind=" + conditionData.searchKind +
			(conditionData.searchKey != "" ? "&srch_string=" + conditionData.searchKey : "") +
			"&match_kind=" + conditionData.searchPart +
			"&kenstat=" + conditionData.kenstat +
			"&shustat=" + conditionData.shustat +
			"&uristat=" + conditionData.uristat +
			(conditionData.hanku != "" ? "&hanku=" + conditionData.hanku : "") +
			(conditionData.kentan != "" ? "&kentan=" + conditionData.kentan : "") +
			(conditionData.shutan != "" ? "&shutan=" + conditionData.shutan : "") +
			(conditionData.uritan != "" ? "&uritan=" + conditionData.uritan : "") +
			(conditionData.shuku != "" ? "&shuku=" + conditionData.shuku : "") +
			"&order_kind=" + conditionData.searchOrder +
			"&login_id=" + sessionStorage.getItem(StringCS.USERNAME) +
			"&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		headers: {
			'Content-Type': StringCS.PR_CONTENT_TYPE
		},
		success: function (result) {
			while (table.hasChildNodes()) {
				table.removeChild(table.firstChild);
			}
			var checkRecord = false;

			const data = JSON.parse(result);
			if (data.cuslist != null) {
				if (data.cuslist.length > 0) {
					checkRecord = compareObjectList(data.cuslist, JSON.parse(sessionStorage.getItem(StringCS.CUSTLIST)));
					sessionStorage.setItem(StringCS.CUSTLIST, JSON.stringify(data.cuslist));
					for (var i = 0; i < data.cuslist.length; i++) {
						const newElement = document.createElement("tr");
						const newName = document.createElement("td");
						newName.className += " text";
						const newAddress = document.createElement("td");
						newAddress.className += " text";
						const newKenshin = document.createElement("td");
						newKenshin.className += " text";
						const newShuuku = document.createElement("td");
						newShuuku.className += " text";
						newName.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(data.cuslist[i].name))));
						newAddress.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(data.cuslist[i].add_0))));
						var kenstatVal = document.createTextNode((data.cuslist[i].kenstat == 1 ? "済" : "未"));
						newKenshin.appendChild(kenstatVal);
						newShuuku.appendChild(document.createTextNode(getShuukuVal(newShuuku, data.cuslist[i].shuku, data.cuslist[i].shustat)));
						newElement.appendChild(newName);
						newElement.appendChild(newName);
						newElement.appendChild(newAddress);
						newElement.appendChild(newKenshin);
						newElement.appendChild(newShuuku);
						table.appendChild(newElement);

						if (sessionStorage.getItem(StringCS.CUSTOMERINDEX) != null) {
							if (parseInt(sessionStorage.getItem(StringCS.CUSTOMERINDEX)) == i) {
								newElement.style.background = "#d9a691";
							}
						}
						newElement.onclick = function () {
							var object = data.cuslist[this.rowIndex];
							sessionStorage.setItem(StringCS.CUSTOMERINDEX, this.rowIndex);
							if (searchMode == "1") {
								object.taishoo = searchOrder.options[searchOrder.selectedIndex].text;
							}
				
							if (object.kenstat == 1) {
								Common.setupModal("question", null, Mess.I00006, StringCS.IIE, StringCS.HAI, null, false);
								var buttonConfirm = document.getElementsByClassName("button-1")[0];
								buttonConfirm.onclick = function () {
									const cusdat = Object.assign({}, object);
									sessionStorage.setItem(StringCS.CUSDAT, JSON.stringify(cusdat));
									Common.movePage('/customer.html');
									modal.style.display = "none";
								}
							} else {
								const cusdat = Object.assign({}, object);
								sessionStorage.setItem(StringCS.CUSDAT, JSON.stringify(cusdat));
								Common.movePage('/customer.html');
							}

						};
					}

					if (table.hasChildNodes()) {
						document.getElementsByClassName("table-container")[0].style.display = "block";
						document.getElementById("data-messages").style.display = "none";
						document.getElementById("countList").innerHTML = "検索件数：" + table.childElementCount + "件";
						document.getElementById("countList").style.display = "block";
						if (sessionStorage.getItem(StringCS.CUSTOMERINDEX) != null) {
							if (checkRecord == true) {
								scrollToItemList(parseInt(sessionStorage.getItem(StringCS.CUSTOMERINDEX)));
							}
						} else {
							scrollToItemList(0);
						}

					} else {
						document.getElementsByClassName("table-container")[0].style.display = "none";
						document.getElementById("countList").style.display = "none";
						document.getElementById("data-messages").style.display = "block";
					}
					modal.style.display = "none";
					dataMessage.style.display = "none";
				} else {
					dataMessage.innerText = Mess.E00001;
					dataMessage.style.display = "block";
					document.getElementById("countList").style.display = "none";
					Common.setupModal("success", null, Mess.E00005, null, StringCS.OK, null, false);
				}
			} else {
				dataMessage.innerText = Mess.E00001;
				dataMessage.style.display = "block";
				document.getElementById("countList").style.display = "none";
				Common.setupModal("success", null, Mess.E00005, null, StringCS.OK, null, false);
			}
		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00003, null, StringCS.OK, null, false);
		},
		timeout: ValueCS.VL_LONG_TIMEOUT
	});
}


function compareObjectList(listObj1, listObj2) {
	var length = 0;
	if (listObj1 == null || listObj2 == null) {
		return false;
	} else {
		length = listObj1.length <= listObj2.length ? listObj1.length : listObj2.length;
	}
	for (var i = 0; i < length; i++) {
		var objectsAreSame = true;
		for (var propertyName in listObj1[i]) {
			if (listObj1[i][propertyName] !== listObj2[i][propertyName]) {
				objectsAreSame = false;
				break;
			}
		}
		return objectsAreSame;
	};
}

function getShuukuVal(element, code, shustat) {
	var name = "";
	for (var i = 0; i < systemDat.lstShuku.length; i++) {
		if (code == systemDat.lstShuku[i].code) {
			name = systemDat.lstShuku[i].name;

			// set color shuuku field
			if (code == 0 || code == 1) {
				element.style.background = ValueCS.VL_COLOR_CUSLIST[0];
			} else if (code == 2 || code == 3) {
				element.style.background = ValueCS.VL_COLOR_CUSLIST[1];
			} else if (code > 3) {
				element.style.background = ValueCS.VL_COLOR_CUSLIST[2];
			}

			if (shustat == 0) {
				element.style.color = "#ffffff";
			}
			break;
		}
	}
	return name;
}



/**
   * ACCESS FIRST CUSTOMER
*/
function firstCustomerAction() {
	setConditionData();

	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	$.ajax({
		url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
			// url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
			"&srch_kind=" + conditionData.searchKind +
			(conditionData.searchKey != "" ? "&srch_string=" + conditionData.searchKey : "") +
			"&match_kind=" + conditionData.searchPart +
			"&kenstat=2" +
			"&shustat=0" +
			"&uristat=0" +
			(conditionData.hanku != "" ? "&hanku=" + conditionData.hanku : "") +
			(conditionData.kentan != "" ? "&kentan=" + conditionData.kentan : "") +
			(conditionData.shutan != "" ? "&shutan=" + conditionData.shutan : "") +
			(conditionData.uritan != "" ? "&uritan=" + conditionData.uritan : "") +
			(conditionData.shuku != "" ? "&shuku=" + conditionData.shuku : "") +
			"&order_kind=" + conditionData.searchOrder +
			"&login_id=" + sessionStorage.getItem(StringCS.USERNAME) +
			"&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		headers: {
			'Content-Type': StringCS.PR_CONTENT_TYPE
		},
		success: function (result) {
			const data = JSON.parse(result);
			if (data.cuslist != null) {
				if (data.cuslist.length > 0) {
					const cusdat = Object.assign({}, data.cuslist[0]);
					cusdat.taishoo = searchOrder.options[searchOrder.selectedIndex].text
					sessionStorage.setItem(StringCS.CUSDAT, JSON.stringify(cusdat));
					Common.movePage('/customer.html');
					dataMessage.style.display = "none";
					modal.style.display = "none";
				} else {
					dataMessage.innerText = Mess.E00001;
					dataMessage.style.display = "block";
					Common.setupModal("success", null, Mess.E00005, null, StringCS.OK, null, false);
				}
			} else {
				dataMessage.innerText = Mess.E00001;
				dataMessage.style.display = "block";
				Common.setupModal("success", null, Mess.E00005, null, StringCS.OK, null, false);
			}

		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("success", null, Mess.E00005, null, StringCS.OK, null, false);
		},
		timeout: ValueCS.VL_LONG_TIMEOUT
	});
}


/**
   * SET MAXLENGTH INPUT WHEN CHANGE TYPE
*/
function selectChange() {
	searchType.onchange = function () {
		setMaxLengthInput();
	};
}


/**
   * SET CONDITION DATA
*/
function setConditionData() {
	let searchKindVal = String(searchType.value);
	let searchKeyVal = String(searchKey.value);
	let searchPartVal = String(searchPart.value);
	let searchOrderVal = String(searchOrder.value);

	let kenstat = getValueRadio("kenstat_radio");
	let shustat = getValueRadio("shustat_radio");
	let uristat = getValueRadio("uristat_radio");

	let hanku = getValueCheckbox("hanku", hankuList);
	let shuku = getValueCheckbox("shuku", shukuList);
	let kentan = getValueCheckbox("kentan", tantnameList);
	let shutan = getValueCheckbox("shutan", tantnameList);
	let uritan = getValueCheckbox("uritan", tantnameList);

	conditionData.searchKind = searchKindVal;
	conditionData.searchOrder = searchOrderVal;
	conditionData.searchKey = searchKeyVal;
	conditionData.searchPart = searchPartVal;

	conditionData.kenstat = kenstat;
	conditionData.shustat = shustat;
	conditionData.uristat = uristat;

	conditionData.hanku = hanku;
	conditionData.shuku = shuku;
	conditionData.kentan = kentan;
	conditionData.shutan = shutan;
	conditionData.uritan = uritan;

	sessionStorage.setItem(StringCS.CONDITIONDATA, JSON.stringify(conditionData));
}


/**
   * GET CONDITION DATA
*/
function getConditionData() {
	if (JSON.parse(sessionStorage.getItem(StringCS.CONDITIONDATA)) != null) {
		conditionData = JSON.parse(sessionStorage.getItem(StringCS.CONDITIONDATA));

		searchType.selectedIndex = conditionData.searchType;
		searchKey.selectedIndex = conditionData.searchKey;
		searchPart.selectedIndex = conditionData.searchPart;
		searchOrder.selectedIndex = conditionData.searchOrder;

		var list1 = [
			document.getElementsByName("kenstat_radio"),
			document.getElementsByName("shustat_radio"),
			document.getElementsByName("uristat_radio")
		]

		var list2 = [conditionData.kenstat, conditionData.shustat, conditionData.uristat];
		for (var i = 0; i < list1.length; i++) {
			for (var idx = 0; idx < list1[i].length; idx++) {
				if (parseInt((list1[i])[idx].value) == parseInt(list2[i])) {
					(list1[i])[idx].checked = true;
				}
			}
		}

		var list3 = [
			document.getElementsByClassName("hanku"),
			document.getElementsByClassName("shuku"),
			document.getElementsByClassName("kentan"),
			document.getElementsByClassName("shutan"),
			document.getElementsByClassName("uritan")
		]
		var list4 = [conditionData.hanku, conditionData.shuku, conditionData.kentan, conditionData.shutan, conditionData.uritan];
		for (var i = 0; i < list3.length; i++) {
			for (var idx = 0; idx < list3[i].length; idx++) {
				var item = list4[i].split(",");
				for (var j = 0; j < item.length; j++) {
					if (idx == parseInt(item[j])) {
						(list3[i])[idx].checked = true;
					}
				}
			}
		}
	}
}



function scrollToItemList(idx) {
	var rows = table.querySelectorAll('tr');
	rows[idx].scrollIntoView({
		behavior: 'smooth',
		block: 'center'
	});

	rows[idx].scrollIntoView(true);
}


/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
	document.getElementById("menuOption").onclick = function () { Common.movePage('/menu.html') };
	document.getElementById("settingOption").onclick = function () { Common.movePage('/setting.html') };
	document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/**
   * ONCHANGE ACTION
*/
function onChangeAction() {
	searchKey.onchange = function () {
		sessionStorage.setItem(StringCS.SEARCHSTRING, searchKey.value.trim());
	}
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
	if (searchMode == "2") {
		document.getElementById("backPage2Button").onclick = Common.backAction;
		document.getElementById("firstCustomerButton").onclick = firstCustomerAction;
		document.getElementById("kensakuButton").onclick = function () {
			sessionStorage.removeItem(StringCS.CUSTOMERINDEX);
			searchCusType2();
		}
	} else {
		document.getElementById("backPage1Button").onclick = Common.backAction;
		document.getElementById("filterButton").onclick = function () {
			var valueSearch = Other.cutStringSpace(String(searchKey.value));
			searchCusType1(valueSearch);
		}
	}
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	setOptionMenu();
	setupLayout();
	initCombobox();
	setMaxLengthInput();
	selectChange();
	onclickAction();
	if (searchMode == "2") {
		onChangeAction();
		getConditionData();
		if (sessionStorage.getItem(StringCS.SEARCHSTRING) != null) {
			searchKey.value = sessionStorage.getItem(StringCS.SEARCHSTRING);
			searchCusType2();
			sessionStorage.removeItem(StringCS.SAVINGSTATUS);
		} else {
			modal.style.display = "none";
		}
	} else {
		getCuslistType1();
	}
}




window.addEventListener("pageshow", function (evt) {
	if (evt.persisted) {
		setTimeout(function () {
			window.location.reload();
		}, 10);
	}
}, false);

window.onload = onLoadAction;