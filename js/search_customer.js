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
/* hanku list */
var hankuList;
/* shuku list */
var shukuList;
/* tantname list */
var tantnameList;
/* tantname item */
var tantnameItem = ["kentan", "shutan", "uritan"];

const cuslList = JSON.parse(sessionStorage.getItem(StringCS.CUSTLIST));

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
		for(var i = itemSearch.length-1; i >= 0; i--) {
			itemSearch[i].remove();
		}
	} else {
		var itemSearch = document.getElementsByClassName("searchItem1");
		for(var i = itemSearch.length-1; i >= 0; i--) {
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
   * SHOW PREVIOUS DATA
*/
function checkPreviousData(cuslList) {
	if (cuslList != null) {
		if (cuslList.length > 0) {
			document.getElementsByClassName("table-container")[0].style.display = "block";
			document.getElementById("countList").innerHTML = "検索件数：" + cuslList.length + "件";
			document.getElementById("countList").style.display = "block";
		} else {
			document.getElementById("countList").style.display = "none";
		}

		for (var i = 0; i < cuslList.length; i++) {
			const newElement = document.createElement("tr");
			const newName = document.createElement("td");
			newName.className += " text";
			const newAddress = document.createElement("td");
			newAddress.className += " text";
			const newKenshin = document.createElement("td");
			newKenshin.className += " text";
			const newShuukin = document.createElement("td");
			newShuukin.className += " text";
			newName.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(cuslList[i].name))));
			newAddress.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(cuslList[i].add_0))));
			newKenshin.appendChild(document.createTextNode(cuslList[i].kenstat == 1 ? "済" : "未"));
			newShuukin.appendChild(document.createTextNode(cuslList[i].shustat == 1 ? "済" : "未"));
			newElement.appendChild(newName);
			newElement.appendChild(newAddress);
			newElement.appendChild(newKenshin);
			newElement.appendChild(newShuukin);
			table.appendChild(newElement);
			if (searchMode == "1") {
				if (sessionStorage.getItem(StringCS.CUSTOMERINDEX) != null) {
					if (parseInt(sessionStorage.getItem(StringCS.CUSTOMERINDEX)) == i) {
						newElement.style.background = "#d9a691";
					}
				}
			}
			newElement.onclick = function () {
				sessionStorage.setItem(StringCS.CUSTOMERINDEX, this.rowIndex);
				var object = cuslList[this.rowIndex];
				object.taishoo = searchOrder.options[searchOrder.selectedIndex].text;
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

		if (sessionStorage.getItem(StringCS.CUSTOMERINDEX) != null) {
			
			const interval = setInterval(function () {
				scrollToItemList(parseInt(sessionStorage.getItem(StringCS.CUSTOMERINDEX)));
				clearInterval(interval);
				alert("Hieu");
			}, 300);
		} else {
			scrollToItemList(0);
		}
	} else {
		document.getElementsByClassName("table-container")[0].style.display = "block";
	}
}


/**
   * SEARCH CUSTOMER
*/
function searchCusType1(searchVal) {
	sessionStorage.setItem(StringCS.SEARCHSTRING, searchKey.value.trim());

	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	$.ajax({
		// url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
		url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
			"&srch_kind=0" + String(searchType.value) +
			(searchVal != "" ? "&srch_string=" + searchVal : "") +
			"&match_kind=0" +
			"&kenstat=0" +
			"&shustat=0" +
			"&uristat=0" +
			"&order_kind=0" +
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
					sessionStorage.setItem(StringCS.CUSTLIST, JSON.stringify(data.cuslist));
					for (var i = 0; i < data.cuslist.length; i++) {
						const newElement = document.createElement("tr");
						const newName = document.createElement("td");
						newName.className += " text";
						const newAddress = document.createElement("td");
						newAddress.className += " text";
						const newKenshin = document.createElement("td");
						newKenshin.className += " text";
						const newShuukin = document.createElement("td");
						newShuukin.className += " text";
						newName.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(data.cuslist[i].name))));
						newAddress.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(data.cuslist[i].add_0))));
						newKenshin.appendChild(document.createTextNode(data.cuslist[i].kenstat == 1 ? "済" : "未"));
						newShuukin.appendChild(document.createTextNode(data.cuslist[i].shustat == 1 ? "済" : "未"));
						newElement.appendChild(newName);
						newElement.appendChild(newAddress);
						newElement.appendChild(newKenshin);
						newElement.appendChild(newShuukin);
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
							object.taishoo = searchOrder.options[searchOrder.selectedIndex].text;
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
							scrollToItemList(parseInt(sessionStorage.getItem(StringCS.CUSTOMERINDEX)));
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


/**
   * SEARCH CUSTOMER TYPE 1
*/
function searchCusType2() {
	setConditionData();
	sessionStorage.setItem(StringCS.SEARCHSTRING, searchKey.value.trim());

	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	$.ajax({
		// url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
		url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
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

			const data = JSON.parse(result);
			if (data.cuslist != null) {
				if (data.cuslist.length > 0) {
					sessionStorage.setItem(StringCS.CUSTLIST, JSON.stringify(data.cuslist));
					for (var i = 0; i < data.cuslist.length; i++) {
						const newElement = document.createElement("tr");
						const newName = document.createElement("td");
						newName.className += " text";
						const newAddress = document.createElement("td");
						newAddress.className += " text";
						const newKenshin = document.createElement("td");
						newKenshin.className += " text";
						const newShuukin = document.createElement("td");
						newShuukin.className += " text";
						newName.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(data.cuslist[i].name))));
						newAddress.appendChild(document.createTextNode(Other.cutStringSpace(Other.nullToString(data.cuslist[i].add_0))));
						newKenshin.appendChild(document.createTextNode(data.cuslist[i].kenstat == 1 ? "済" : "未"));
						newShuukin.appendChild(document.createTextNode(data.cuslist[i].shustat == 1 ? "済" : "未"));
						newElement.appendChild(newName);
						newElement.appendChild(newAddress);
						newElement.appendChild(newKenshin);
						newElement.appendChild(newShuukin);
						table.appendChild(newElement);
						newElement.onclick = function () {
							var object = data.cuslist[this.rowIndex];
							sessionStorage.setItem(StringCS.CUSTOMERINDEX, this.rowIndex);
							object.taishoo = searchOrder.options[searchOrder.selectedIndex].text;
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
							scrollToItemList(parseInt(sessionStorage.getItem(StringCS.CUSTOMERINDEX)));
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



/**
   * ACCESS FIRST CUSTOMER
*/
function firstCustomerAction() {
	setConditionData();

	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	$.ajax({
		// url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
		url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
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
	document.getElementById("kensakuButton").onclick = function () {
		// sessionStorage.setItem(StringCS.CUSTOMERINDEX, 0);
		// if (searchMode == "1") {
		// 	var valueSearch = Other.cutStringSpace(String(searchKey.value));
		// 	for (var i = 0; i < cuslList.length; i++) {
		// 		if (String(searchType.value) == 0) {
		// 			if (valueSearch == Other.cutStringSpace(Other.nullToString(cuslList[i].kcode))) {
		// 				scrollToItemList(i);
		// 				table.rows.item(i).style.background = "#d9a691";
		// 				break;
		// 			}
		// 		} else if (String(searchType.value) == 1) {
		// 			if (valueSearch == Other.cutStringSpace(Other.nullToString(cuslList[i].name))) {

		// 			}
		// 		} else if (String(searchType.value) == 2) {
		// 			if (valueSearch == Other.cutStringSpace(Other.nullToString(cuslList[i].tel_0))) {

		// 			}
		// 		}
		// 	}
		// } else {
		// 	searchCusType2();
		// }

		var valueSearch = Other.cutStringSpace(String(searchKey.value));
		searchCusType1(valueSearch);
	}
	if (searchMode == "2") {
		document.getElementById("backPage2Button").onclick = Common.backAction;
		document.getElementById("firstCustomerButton").onclick = firstCustomerAction;
	} else {
		document.getElementById("backPage1Button").onclick = Common.backAction;
		document.getElementById("previousButton").onclick = function () {
			sessionStorage.setItem(StringCS.CUSTOMERINDEX, 0);
			if (searchMode == "1") {
				searchCusType1(Other.cutStringSpace(String(searchKey.value)));
			} else {
				searchCusType2();
			}
		}
		document.getElementById("nextButton").onclick = function () {
			sessionStorage.setItem(StringCS.CUSTOMERINDEX, 0);
			if (searchMode == "1") {
				searchCusType1("");
			} else {
				searchCusType2();
			}
		}
	}
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
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
			searchCusType2();
			sessionStorage.removeItem(StringCS.SAVINGSTATUS);
		}
	} else {
		if (cuslList != null) {
			checkPreviousData(cuslList);
		} else {
			searchCusType1("");
		}
	}
	alert("hieu")
}


window.onload = onLoadAction;