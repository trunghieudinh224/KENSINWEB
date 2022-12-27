import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* data setting */
var dataSetting;


/*****  FUNCTION  *****/
/**
   * GET DATA SETTING
*/
function getDataSetting() {
	Common.setupModal("load", null, Mess.I00001, null, null);
	$.ajax({
		url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING + StringCS.PR_KEY + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		// url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING + StringCS.PR_KEY + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		headers: {
			'Content-Type': StringCS.PR_CONTENT_TYPE
		},
		success: function (result) {
			try {
				dataSetting = JSON.parse(result);
				setCommentCbb(1);
				setCommentCbb(2);
				setTantnameCbb();
				setPrintModeCbb();
				modal.style.display = "none";
			} catch {
				Common.setupModal("error", null, Mess.E00007, StringCS.OK, null);
			}
		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00003, StringCS.OK, null);
		},
		timeout: ValueCS.VL_SHORT_TIMEOUT
	});
}


/**
   * SET DATA FOR COMMENT COMBOBOX
   *
   * @param cbb     [INT]
*/
function setCommentCbb(cbb) {
	if (dataSetting != null) {
		if (dataSetting.m_lstComment != null) {
			var optionSpace = document.createElement("option");
			optionSpace.classList.add("text")
			optionSpace.text = "";
			optionSpace.value = 0;
			document.getElementById("cbb_comment" + cbb).add(optionSpace);
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


/**
   * SET DATA FOR TANTNAME COMBOBOX
*/
function setTantnameCbb() {
	if (dataSetting != null) {
		if (dataSetting.m_lstTantName != null) {
			document.getElementById("cbb_tantname").textContent = dataSetting.m_lstTantName[0].name;
		}
	}
}


/**
   * SET DATA FOR PRINT MODE COMBOBOX
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


/**
   * PREPARE NEW DATA SETTING
*/
function prepareNewDataSetting() {
	let comment1 = document.getElementById("cbb_comment1").value;
	let comment2 = document.getElementById("cbb_comment2").value;
	let tancd = dataSetting.m_lstTantName[0].code;
	let print_mode = document.getElementById("combobox_print_mode").value;
	const newData = {
		wrt_tancd: dataSetting.wrt_tancd,
		tancd: tancd,
		prnt_mode: print_mode,
		comment1: comment1,
		comment2: comment2,
		m_lstTantName: dataSetting.m_lstTantName,
		m_lstComment: dataSetting.m_lstComment,
		m_nMode: dataSetting.wrt_tancd > 0 ? 1 : 0,
		login_id: sessionStorage.getItem(StringCS.USERNAME),
		login_pw: sessionStorage.getItem(StringCS.PASSWORD)
	}
	return newData;
}


/**
   * SAVE DATA SETTING
*/
function saveDataSetting() {
	Common.setupModal("load", null, Mess.I00002, null, null);
	$.ajax({
		type: "POST",
		data: JSON.stringify(prepareNewDataSetting()),
		url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING,
		// url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING,
		contentType: "application/json",
		timeout: ValueCS.VL_LONG_TIMEOUT,
		success: function (response) {
			console.log(response);
			Common.setupModal("load", null, Mess.I00002, null, null);
		},
		error: function (xmlhttprequest, textstatus, message) {
			if (textstatus === "timeout") {
				console.log("timeout")
			} else {
				console.log(textstatus)
			}
			Common.setupModal("error", null, Mess.E00004, StringCS.OK, null);
		}
	}).done(function (res) {
		console.log('res', res);
		sessionStorage.setItem(StringCS.SETTINGDATA, JSON.stringify(prepareNewDataSetting()));
		Common.setupModal("success", null, Mess.I00003, StringCS.OK, null);
	});
}


/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
	document.getElementById("menuOption").onclick = function () { Common.movePage('/menu.html') };
	document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
	document.getElementById("backPageButton").onclick = Common.backAction;
	document.getElementById("saveButton").onclick = saveDataSetting;
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	setOptionMenu();
	getDataSetting();
	onclickAction();
}


window.onload = onLoadAction;