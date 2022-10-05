import * as Common from './Common/common_function.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* data setting */
var dataSetting;



/* 
	GET DATA SETTING
*/
function getDataSetting() {
	Common.setupModal("load", null, "データを保存しています。。。", null, null);
	$.ajax({
		url: "http://192.168.200.218:8080/Webkensin/compackr/getSetting?key=0582668301&login_id=" + sessionStorage.getItem('username') + "&login_pw=" + sessionStorage.getItem('password'),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		success: function (result) {
			dataSetting = JSON.parse(result);
			setCommentCbb(1);
			setCommentCbb(2);
			setTantnameCbb();
			setPrintModeCbb();
			modal.style.display = "none";
		},
		error: function (jqXHR, exception) {
			console.log(exception);
		},
		timeout: 10000
	});
}


/* 
	SET DATA FOR COMMENT COMBOBOX
	@param cbb
*/
function setCommentCbb(cbb) {
	if (dataSetting != null) {
		if (dataSetting.m_lstComment != null) {
			for (var i = 0; i < dataSetting.m_lstComment.length; i++) {
				var option = document.createElement("option");
				option.classList.add("text")
				option.text = dataSetting.m_lstComment[i].name;
				option.value = dataSetting.m_lstComment[i].code;
				document.getElementById("cbb_comment" + cbb).add(option);

				let commentSelected = cbb == 1 ? dataSetting.comment1 : dataSetting.comment2;
				if (commentSelected == dataSetting.m_lstComment[i].code) {
					option.selected = 'selected';
				}
			}
		}
	}
}


/* 
	SET DATA FOR TANTNAME COMBOBOX
*/
function setTantnameCbb() {
	if (dataSetting != null) {
		if (dataSetting.m_lstTantName != null) {
			for (var i = 0; i < dataSetting.m_lstTantName.length; i++) {
				var option = document.createElement("option");
				option.classList.add("text")
				option.text = dataSetting.m_lstTantName[i].name;
				option.value = dataSetting.m_lstTantName[i].code;
				document.getElementById("cbb_tantname").add(option);
				if (dataSetting.tancd == dataSetting.m_lstTantName[i].code) {
					option.selected = true;
				}
			}
		}
	}
}


/* 
	SET DATA FOR PRINT MODE COMBOBOX
*/
function setPrintModeCbb() {
	if (dataSetting != null) {
		if (dataSetting.prnt_mode == 0) {
			document.getElementById("combobox_print_mode").value = "0";
		} else {
			document.getElementById("combobox_print_mode").value = "1";
		}
	}
}


/* 
	PREPARE NEW DATA SETTING
*/
function prepareNewDataSetting() {
	let comment1 = document.getElementById("cbb_comment1").value;
	let comment2 = document.getElementById("cbb_comment2").value;
	let tancd = document.getElementById("cbb_tantname").value;
	let print_mode = document.getElementById("combobox_print_mode").value;
	const newData = {
		wrt_tancd: dataSetting.wrt_tancd,
		tancd: tancd,
		prnt_mode: print_mode,
		comment1: comment1,
		comment2: comment2,
		m_nMode: dataSetting.wrt_tancd > 0 ? 1 : 0,
		login_id: sessionStorage.getItem('username'),
		login_pw: sessionStorage.getItem('password')
	}
	return newData;
}


/* 
	SAVE DATA SETTING
*/
function saveDataSetting() {
	Common.setupModal("load", null, "データを保存しています。。。", null, null);
	$.ajax({
		type: "POST",
		data: JSON.stringify(prepareNewDataSetting()),
		url: "http://192.168.200.218:8080/Webkensin/compackr/getSetting",
		contentType: "application/json",
		timeout: 100000,
		success: function (response) {
			console.log(response);
			Common.setupModal("load", null, "データを保存しています。。。", null, null);
		},
		error: function (xmlhttprequest, textstatus, message) {
			if (textstatus === "timeout") {
				console.log("timeout")
			} else {
				console.log(textstatus)
			}
			// updateDialog("./images/gif/gif_fail.gif", "データ保存に失敗しました。", "red", true)
			Common.setupModal("error", null, "データ保存に失敗しました。", "OK", null);
		}
	}).done(function (res) {
		console.log('res', res);
		Common.setupModal("success", null, "データ保存に成功しました。", "OK", null);
	});
}


/* 
	ONCLICK ACTION
*/
function onclickAction() {
	document.getElementById("backPageButton").onclick = Common.backAction;
	document.getElementById("saveButton").onclick = saveDataSetting;
}


/* 
	ONLOAD ACTION
*/
function onLoadAction() {
	getDataSetting();
	onclickAction();
}


window.onload = onLoadAction;