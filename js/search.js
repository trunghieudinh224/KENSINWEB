import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'

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
/* data setting */
var userData = JSON.parse(localStorage.getItem("UserData"));
/* hanku list */
var hankuList;
/* shuku list */
var shukuList;
/* tantname list */
var tantnameList;
/* tantname item */
var tantnameItem = ["kentan", "shutan", "uritan"];


/*****  FUNCTION  *****/
/* 
	INITIALIZE COMBOBOX
*/
function initCombobox() {
	hankuList = userData.lstHanku;
	shukuList = userData.lstShuku;
	tantnameList = userData.m_lstTantName;
	setdataCbb("dropdown-hanku", hankuList, "hanku");
	setdataCbb("dropdown-shuku", shukuList, "shuku");
	setdataCbb("dropdown-tantname", tantnameList, null);
}


/* 
	SET DATA FOR COMBOBOX
	@param dropdownName
	@param data
	@param itemName
*/
function setdataCbb(dropdownName, data, itemName) {
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


/* 
	SET MAX LENGTH SEARCHING DATA
*/
function setMaxLengthInput() {
	var searchInput = document.getElementById("search-key");
	searchInput.value = "";
	switch (searchType.value) {
		case "0":
			searchInput.maxLength = 6;
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


/* 
	GET VALUE RADIO
	@param radioName
*/
function getValueRadio(radioName) {
	var radio = document.getElementsByName(radioName);
	for (var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			return String(i);
		}
	}
}


/* 
	GET VALUE CHECKBOX
	@param checkboxName
	@param data
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


/* 
	SHOW PREVIOUS DATA
*/
function checkPreviousData() {
	const previousCuslist = JSON.parse(localStorage.getItem(StringCS.CUSTLIST));
	if (previousCuslist != null) {
		if (previousCuslist.length > 0) {
			document.getElementById("countList").innerHTML = "検索件数：" + previousCuslist.length + "件";
			document.getElementById("countList").style.display = "block";
		} else {
			document.getElementById("countList").style.display = "none";
		}

		for (var i = 0; i < previousCuslist.length; i++) {
			const newElement = document.createElement("tr");
			const newName = document.createElement("td");
			newName.className += " text";
			const newAddress = document.createElement("td");
			newAddress.className += " text";
			const newKenshin = document.createElement("td");
			newKenshin.className += " text";
			const newShuukin = document.createElement("td");
			newShuukin.className += " text";
			newName.appendChild(document.createTextNode(previousCuslist[i].name.trim()));
			newAddress.appendChild(document.createTextNode(previousCuslist[i].add_0.trim()));
			newKenshin.appendChild(document.createTextNode(previousCuslist[i].kenstat == 1 ? "済" : "未"));
			newShuukin.appendChild(document.createTextNode(previousCuslist[i].shustat == 1 ? "済" : "未"));
			newElement.appendChild(newName);
			newElement.appendChild(newAddress);
			newElement.appendChild(newKenshin);
			newElement.appendChild(newShuukin);
			table.appendChild(newElement);
			var object = previousCuslist[i];
			newElement.onclick = function () {
				object.taishoo = searchOrder.options[searchOrder.selectedIndex].text;
				const cusdat = Object.assign({}, object);
				localStorage.setItem(StringCS.CUSDAT, JSON.stringify(cusdat));
				window.location.href = "/customer_page.html";
			};
		}

		if (previousCuslist.length !== 0) {
			document.getElementsByClassName("table-container")[0].style.display = "block";
		}
	} else {
		document.getElementsByClassName("table-container")[0].style.display = "block";
	}
}


/* 
	SEARCH CUSTOMER
*/
function searchCus() {
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

	Common.setupModal("load", null, Mess.I00001, null, null);
	$.ajax({
		// url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
		url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
			"&srch_kind=" + searchKindVal +
			(searchKeyVal != "" ? "&srch_string=" + searchKeyVal : "") +	
			"&match_kind=" + searchPartVal +	
			"&kenstat=" + kenstat +	
			"&shustat=" + shustat +
			"&uristat=" + uristat +
			(hanku != "" ? "&hanku=" + hanku : "") +
			(kentan != "" ? "&kentan=" + kentan : "") +
			(shutan != "" ? "&shutan=" + shutan : "") +
			(uritan != "" ? "&uritan=" + uritan : "") +
			(shuku != "" ? "&shuku=" + shuku : "") +
			"&order_kind=" + searchOrderVal +	
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
					localStorage.setItem("cuslist", JSON.stringify(data.cuslist));
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
						newName.appendChild(document.createTextNode(data.cuslist[i].name.trim()));
						newAddress.appendChild(document.createTextNode(data.cuslist[i].add_0.trim()));
						newKenshin.appendChild(document.createTextNode(data.cuslist[i].kenstat == 1 ? "済" : "未"));
						newShuukin.appendChild(document.createTextNode(data.cuslist[i].shustat == 1 ? "済" : "未"));
						newElement.appendChild(newName);
						newElement.appendChild(newAddress);
						newElement.appendChild(newKenshin);
						newElement.appendChild(newShuukin);
						table.appendChild(newElement);
						var object = data.cuslist[i];
						newElement.onclick = function () {
							object.taishoo = searchOrder.options[searchOrder.selectedIndex].text;
							const cusdat = Object.assign({}, object);
							localStorage.setItem(StringCS.CUSDAT, JSON.stringify(cusdat));
							window.location.href = "/customer_page.html";
						};
					}

					if (table.hasChildNodes()) {
						document.getElementsByClassName("table-container")[0].style.display = "block";
						document.getElementById("data-messages").style.display = "none";
						document.getElementById("countList").innerHTML = "検索件数：" + table.childElementCount + "件";
						document.getElementById("countList").style.display = "block";
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
					Common.setupModal("success", null, Mess.E00005, StringCS.OK, null);
				}
			} else {
				dataMessage.innerText = Mess.E00001;
				dataMessage.style.display = "block";
				Common.setupModal("success", null, Mess.E00005, StringCS.OK, null);
			}
		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00003, StringCS.OK, null);
		},
		timeout: ValueCS.VL_LONG_TIMEOUT
	});
}


/* 
	ACCESS FIRST CUSTOMER
*/
function firstCustomerAction() {
	let searchKindVal = String(searchType.value);
	let searchKeyVal = String(searchKey.value);
	let searchPartVal = String(searchPart.value);
	let searchOrderVal = String(searchOrder.value);

	let hanku = getValueCheckbox("hanku", hankuList);
	let shuku = getValueCheckbox("shuku", shukuList);
	let kentan = getValueCheckbox("kentan", tantnameList);
	let shutan = getValueCheckbox("shutan", tantnameList);
	let uritan = getValueCheckbox("uritan", tantnameList);

	Common.setupModal("load", null, Mess.I00001, null, null);
	$.ajax({
		// url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
		url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
			"&srch_kind=" + searchKindVal +
			(searchKeyVal != "" ? "&srch_string=" + searchKeyVal : "") +
			"&match_kind=" + searchPartVal +
			"&kenstat=2" +
			"&shustat=0" +
			"&uristat=0" +
			(hanku != "" ? "&hanku=" + hanku : "") +
			(kentan != "" ? "&kentan=" + kentan : "") +
			(shutan != "" ? "&shutan=" + shutan : "") +
			(uritan != "" ? "&uritan=" + uritan : "") +
			(shuku != "" ? "&shuku=" + shuku : "") +
			"&order_kind=" + searchOrderVal +
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
					localStorage.setItem(StringCS.CUSDAT, JSON.stringify(cusdat));
					window.location.href = "/customer_page.html";
					dataMessage.style.display = "none";
					modal.style.display = "none";
				} else {
					dataMessage.innerText = Mess.E00001;
					dataMessage.style.display = "block";
					Common.setupModal("success", null, Mess.E00005, StringCS.OK, null);
				}
			} else {
				dataMessage.innerText = Mess.E00001;
				dataMessage.style.display = "block";
				Common.setupModal("success", null, Mess.E00005, StringCS.OK, null);
			}

		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00003, StringCS.OK, null);
		},
		timeout: ValueCS.VL_LONG_TIMEOUT
	});
}


/* 
	SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("menuOption").onclick = function() {Common.movePage('/menu_page.html')};
    document.getElementById("settingOption").onclick = function() {Common.movePage('/setting_page.html')};
    document.getElementById("logoutOption").onclick = function() {Common.movePage('logout')};
}


/* 
	ONCLICK ACTION
*/
function onclickAction() {
	document.getElementById("backPageButton").onclick = Common.backAction;
	document.getElementById("kensakuButton").onclick = searchCus;
	document.getElementById("firstCustomerButton").onclick = firstCustomerAction;
}


/* 
	ONLOAD ACTION
*/
function onLoadAction() {
	setOptionMenu();
	checkPreviousData();
	initCombobox();
	setMaxLengthInput();
	onclickAction();
}


window.onload = onLoadAction;