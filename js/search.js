
"use strict";
const firstCustomer = document.getElementById("first-customer");
const searchType = document.getElementById("search-type");
const searchPart = document.getElementById("search-part");
const searchOrder = document.getElementById("search-order");
const searchKey = document.getElementById("search-key");
const searchStatus = document.getElementById("search-status");
const searchBtn = document.getElementById("kensaku");
const searchBackBtn = document.getElementById("search-back-btn");
const warningField = document.getElementById("warning-field");
const table = document.getElementsByClassName("result-tb")[0];
const modal = document.getElementById("myModal");
var userData = JSON.parse(localStorage.getItem("UserData"));

//--------------------Show previous data------------------------------->
function checkPreviousData() {
	const previousCuslist = JSON.parse(localStorage.getItem("cuslist"));
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
				localStorage.setItem("cusdat", JSON.stringify(cusdat));
				window.location.href = "/kokyaku_sentaku_page.html";
			};
		}

		if (previousCuslist.length !== 0) {
			document.getElementsByClassName("table-container")[0].style.display = "block";
		}
	} else {
		document.getElementsByClassName("table-container")[0].style.display = "block";
	}
}
checkPreviousData();


//--------------------  Search  -------------------------->
function search() {
	const searchTypeValue = searchType.value;
	const searchKeyValue = searchKey.value;
	let isCheck = false;

	// ----------------Check valid input --------------->
	switch (searchTypeValue) {
		case "0":
			isCheck = searchKeyValue.match(/^\d+$/) ? true : false;
			break;
		case "1":
			isCheck = searchKeyValue.match(
				/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
			)
				? true
				: false;
			break;
		case "2":
			isCheck = searchKeyValue.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{4}$/)
				? true
				: false;
			break;
		case "3":
			isCheck = searchKeyValue.match(/^\d+$/) ? true : false;
			break;
		default:
			console.log("ok");
	}

	let kenstat = getValueRadio("kenstat_radio");
	let shustat = getValueRadio("shustat_radio");
	let uristat = getValueRadio("uristat_radio");

	let hanku = getValueCheckbox("hanku", hankuList);
	let shuku = getValueCheckbox("shuku", shukuList);
	let kentan = getValueCheckbox("kentan", tantnameList);
	let shutan = getValueCheckbox("shutan", tantnameList);
	let uritan = getValueCheckbox("uritan", tantnameList);

	setupModal("load", null, "しばらくお待ちください。。。", null, null);
	$.ajax({
		url: "http://192.168.200.218:8080/Webkensin/compackr/cussearch?key=0582668301" +
			"&srch_kind=" + String(searchType.value) +
			"&srch_string=" + String(searchKey.value) +
			"&match_kind=" + String(searchPart.value) +
			"&kenstat=" + kenstat +
			"&shustat=" + shustat +
			"&uristat=" + uristat +
			"&hanku=" + hanku +
			"&kentan=" + kentan +
			"&shutan=" + shutan +
			"&uritan=" + uritan +
			"&shuku=" + shuku +
			"&&order_kind=" + String(searchOrder.value) +
			"&login_id=7" +
			"&login_pw=7",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		success: function (result) {
			while (table.hasChildNodes()) {
				table.removeChild(table.firstChild);
			}

			const data = JSON.parse(result);
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
					localStorage.setItem("cusdat", JSON.stringify(cusdat));
					window.location.href = "/kokyaku_sentaku_page.html";
				};
			}

			//-----------------Show data------------------------>

			modal.style.display = "none";
			if (table.hasChildNodes()) {
				document.getElementsByClassName("table-container")[0].style.display = "block";
				document.getElementById("data-messages").style.display = "none";
				document.getElementById("countList").innerHTML = "検索件数：" + table.childElementCount + "件";
				document.getElementById("countList").style.display = "block";
			} else {
				document.getElementsByClassName("table-container")[0].style.display = "none";
				document.getElementById("countList").style.display = "none";
				document.getElementById("data-messages").style.display = "block";
				// setupModal("error", "顧客検索", "ログインに失敗しました", "確認", null);
			}
		},
		error: function (jqXHR, exception) {
			console.log(exception);
		}
	});
}

function getValueRadio(radioName) {
	var radio = document.getElementsByName(radioName);
	for (var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			return String(i);
		}
	}
}

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


//-------------------Direct to First Customer info page-------------->
function firstCustomerAction() {
	const kcode = searchType.value;
	const part = searchPart.value;
	const key = searchKey.value;
	const order = searchOrder.value;
	fetch(
		`http://192.168.200.218:8080/Webkensin/compackr/cussearch?key=0582668301&srch_kind=${kcode || 0}&srch_string=${key || 0}&match_kind=${part || 0}&status=0&order_kind=${order || 0}&login_id=7&login_pw=7`
	)
		.then((res) => res.json())
		.then((json) => {
			const cusdat = Object.assign({}, json.cuslist[0]);
			cusdat.taishoo = searchOrder[order].innerHTML;
			localStorage.setItem("cusdat", JSON.stringify(cusdat));
			window.location.href = "/kokyaku_sentaku_page.html";
		})

	// $.ajax({
	// 	url: "http://192.168.200.218:8080/Webkensin/compackr/cussearch?key=0582668301&srch_kind=0" +
	// 																				"&srch_string=0" +
	// 																				"&match_kind=0" +
	// 																				"&kenstat=1" +
	// 																				"&shustat=1" +
	// 																				"&uristat=1" +
	// 																				"&hanku=1" +
	// 																				"&kentan=44,55" +
	// 																				"&shutan=19,90" +
	// 																				"&uritan=24" +
	// 																				"&shuku=2,4" +
	// 																				"&&order_kind=0" +
	// 																				"&login_id=7" +
	// 																				"&login_pw=7",
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	},
	// 	success: function (result) {

	// 	},
	// 	error: function (jqXHR, exception) {
	// 		console.log(exception);
	// 	}
	// });
}


searchBackBtn.onclick = function () {
	window.location.href = "/menu_page.html";
};

function setupModal(status, title, message, textButton1, textButton2) {
	var imgModal = document.getElementsByClassName("modal-image")[0];
	var titleModal = document.getElementsByClassName("title-modal")[0];
	var messageModal = document.getElementsByClassName("modal-message-detail")[0];
	var buttonConfirm = document.getElementsByClassName("button-confirm")[0];
	var closeButton = document.getElementsByClassName("modal-close-button")[0];

	titleModal.innerHTML = title;
	messageModal.innerHTML = message;

	if (status == "load") {
		imgModal.src = "../images/gif/gif_loading_data.gif";
		titleModal.style.display = "none";
		closeButton.style.display = "none";
		buttonConfirm.style.display = "none";
	} else {
		if (status == "info") {

		} else if (status == "warning") {
			imgModal.src = "../images/gif/gif_warning.gif";
		} else if (status == "error") {
			imgModal.src = "../images/gif/gif_fail.gif";
		}

		if (textButton1 != null) {
			buttonConfirm.style.display = "block";
		}
	}

	buttonConfirm.onclick = function () {
		modal.style.display = "none";
	}
	// When the user clicks on <span> (x), close the modal
	closeButton.onclick = function () {
		modal.style.display = "none";
	}

	modal.style.display = "block";
}


var hankuList;
var shukuList;
var tantnameList;
var tantnameItem = ["kentan", "shutan", "uritan"];
function initCombobox() {
	hankuList = userData.lstHanku;
	shukuList = userData.lstShuku;
	tantnameList = userData.m_lstTantName;
	setdataCbb("dropdown-hanku", hankuList, "hanku");
	setdataCbb("dropdown-shuku", shukuList, "shuku");
	setdataCbb("dropdown-tantname", tantnameList, null);
}


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


initCombobox();