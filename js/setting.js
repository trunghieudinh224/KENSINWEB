import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* data setting */
var dataSetting;


/*****  FUNCTION  *****/
/* 
	GET DATA SETTING
*/
function getDataSetting() {
	Common.setupModal("load", null, "データを保存しています。。。", null, null);
	$.ajax({
        url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING + StringCS.PR_KEY + "&login_id=" + sessionStorage.getItem('username') + "&login_pw=" + sessionStorage.getItem('password'),
        // url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING + StringCS.PR_KEY + "&login_id=" + sessionStorage.getItem('username') + "&login_pw=" + sessionStorage.getItem('password'),
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
			Common.setupModal("error", null, "データが取得できませんでした。", "OK", null);
		},
        timeout: ValueCS.VL_SHORT_TIMEOUT
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
        url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING,
        // url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING,
		contentType: "application/json",
        timeout: ValueCS.VL_LONG_TIMEOUT,
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