var modePrint = sessionStorage.getItem("mode_print");
var time_kensin = sessionStorage.getItem("time_kensin");
var user_reader = sessionStorage.getItem("user_reader");

var form_mode_print = document.getElementById("get_print");
// api url
const api_url = "http://192.168.200.218:8080/Webkensin/compackr/getSetting?key=0582668301&login_id=7&login_pw=7";
var comment_1 = new Array();
var comment_2 = new Array();
var username = new Array();
var checkbox_format_date = document.getElementById("checkbox_format_date");

const date_picker_element = document.querySelector(".date-picker");

const dates_element = document.querySelector(".dates");
const date_select = document.getElementById("myDate");

const test = document.querySelector(".abcxyz");
const user_name = document.getElementById("Combobox");
const combobox_print_mode = document.getElementById("combobox_print_mode");
let isDate = true;


var date = new Date();
var formattedDate = moment(date).format('YYYY-MM-DD');

var settingData = {
	comment1: 0,
	comment2: 0,
	tanto: 0,
	insatsu_mode: 0,
	kensin_date: formattedDate
}
var settingDefault = settingData;

// Calling that async function
getapi(api_url);

if (modePrint == null) {
	modePrint = "画像印刷モード";
	sessionStorage.setItem("mode_print", modePrint);
}

var mode_image = document.getElementById("mode_image");
var mode_charactor = document.getElementById("mode_charactor");

if (modePrint.localeCompare("画像印刷モード") == 0) {
	combobox_print_mode.selectedIndex = 0;
} else {
	combobox_print_mode.selectedIndex = 1;
}

var data_comment;
var data_username;
// Defining async function
async function getapi(url) {
	// Storing response
	const response = await fetch(url);
	// Storing data in form of JSON
	var data = await response.json();
	data_comment = data.m_lstComment;
	data_username = data.m_lstTantName;

	for (let r of data_comment) {
		if (r.code == 1) {
			comment_1.push(r.name);
		} else if (r.code == 2) {
			comment_2.push(r.name);
		}
	}

	for (let r of data_username) {
		username.push(r.name);
	}

	populateClient();
	setCommentCbb(1);
	setCommentCbb(2);
}

//cancel button
function canCel() {
	window.location.href = "/menu.html";
}

//reset data in session when finish layout
function resetTing() {
	if (combobox_print_mode.value.localeCompare("画像印刷モード") == 0) {
		sessionStorage.setItem("mode_print", "画像印刷モード");
	} else {
		sessionStorage.setItem("mode_print", "文字列印刷モード");
	}

	date = new Date(date_select.value);
	sessionStorage.setItem("time_kensin", date);
	sessionStorage.setItem("user_reader", $("#Combobox option:selected").text());
	history.back();
}

//show comment
function showComment(abc) {

	if (abc == 1) {

		comment_1.forEach((item) => {
			setupModal('load', item, "Ok", null);
		});

	} else {

		comment_2.forEach((item) => {
			setupModal('load', item, null, null);
		});

	}

}

//close Dialog
function closeDialog() {
	document.getElementById("notificationComment").classList.remove("show");
}

// get user
function populateClient() {
	if (user_reader == null) {
	}
	console.log(username.length);
	for (var i = 0; i < username.length; i++) {
		var option = document.createElement("option");
		option.classList.add("text")
		if (user_reader == username[i]) {
			option.selected = true;
		}
		option.text = username[i];
		option.value = username[i];

		user_name.add(option);
	}

	document.getElementById('Combobox').getElementsByTagName('option')[0].selected = 'selected'
}


// get user
function setCommentCbb(cbb) {
	if (data_comment != null) {
		for (let item of data_comment) {
			var option = document.createElement("option");
			option.classList.add("text")
			option.text = item.name;
			option.value = item.name;
			document.getElementById("cbb_comment" + cbb).add(option);
		}
		document.getElementById("cbb_comment" + cbb).getElementsByTagName('option')[0].selected = 'selected';
	}
}

function getUserItem(text) {
	console.log(text);
}

function setupModal(status, title, message) {
	var modal = document.getElementById("myModal");
	var titleModal = document.getElementsByClassName("title-modal")[0];
	var buttonConfirm = document.getElementsByClassName("button-confirm")[0];
	var closeButton = document.getElementsByClassName("modal-close-button")[0];


	titleModal.innerHTML = title;

	if (status == "load") {
		//  titleModal.style.display = "none";
		closeButton.style.display = "none";
		//  buttonConfirm.style.display = "none";
	}

	if (modal.style.display == "none" || modal.style.display == "") {
		modal.style.display = "block";
	} else {
		modal.style.display = "none";
	}

	// When the user clicks on <span> (x), close the modal
	buttonConfirm.onclick = function () {
		modal.style.display = "none";
	}
}

function checkboxDate() {
	var checkBox = document.getElementById("checkbox");
	var datepicker = document.getElementById("input");
	if (checkBox.checked == true) {
		datepicker.disabled = true;
		document.getElementById("input").value = formattedDate;
	} else {
		datepicker.disabled = false;
	}
}


document.getElementById("input").defaultValue = formattedDate;


"use strict";
function commentDialog() {
	const overlay = document.querySelector(".overlay");
	overlay.style.zIndex = "2";
	overlay.classList.add("overlay-animate");
	const closeBtn = document.querySelector("ic-close");

	closeBtn.onclick = function () {
		overlay.style.zIndex = "-1";
		overlay.classList.remove("overlay-animate");
	}
}