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
	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
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
				setKokyakuJunCbb();
				setPrintModeCbb();
				setBarcodeNumber();
				setBarcodeStart();
				setBarcodeTypeCbb();
				setCNPointCbb();
				$('.collapseOne').collapse('show');
				modal.style.display = "none";
			} catch {
				Common.setupModal("error", null, Mess.E00007, null, StringCS.OK, null, false);
			}
		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00003, null, StringCS.OK, null, false);
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
   * SET DATA FOR KOKYAKUJUN COMBOBOX
*/
function setKokyakuJunCbb() {
	if (dataSetting != null) {
		document.getElementById("cbb_kokyaku_jun").value = dataSetting.order;
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

/* 
	SET BARCODE START LETTER
*/
function setBarcodeStart() {
	document.getElementById("startLetter").value = dataSetting.barcd_from;
}

/* 
	SET BARCODE NUMBER LETTER
*/
function setBarcodeNumber() {
	document.getElementById("numberLetter").value = dataSetting.barcd_len;
}

/**
   * SET DATA FOR BARCODE TYPE COMBOBOX
   *
*/
function setBarcodeTypeCbb() {
	if (dataSetting != null) {
		if (dataSetting.barcd_kcode == 0) {
			document.getElementById("barcodeTypeCbb").value = "0";
		} else {
			document.getElementById("barcodeTypeCbb").value = "4";
		}
	}
}


/**
   * PREPARE NEW DATA SETTING
*/
function prepareNewDataSetting() {
	let comment1 = document.getElementById("cbb_comment1").value;
	let comment2 = document.getElementById("cbb_comment2").value;
	let orderVal = document.getElementById("cbb_kokyaku_jun").value;
	let tancd = dataSetting.m_lstTantName[0].code;
	let print_mode = document.getElementById("combobox_print_mode").value;
	let startLetter = document.getElementById("startLetter").value;
	let numberLetter = document.getElementById("numberLetter").value;
	let barcodeType = document.getElementById("barcodeTypeCbb").value;

	var listCNPCbb = document.getElementsByClassName("cnp-cbb");
	var cnpList = new Array(6);
	for (var idx = 0; idx < listCNPCbb.length; idx++) {
		cnpList[idx] = listCNPCbb[idx].value;
	}

	const newData = {
		wrt_tancd: dataSetting.wrt_tancd,
		tancd: tancd,
		prnt_mode: print_mode,
		comment1: comment1,
		comment2: comment2,
		m_lstTantName: dataSetting.m_lstTantName,
		m_lstComment: dataSetting.m_lstComment,
		order: orderVal,
		m_nMode: dataSetting.wrt_tancd > 0 ? 1 : 0,
		barcd_from: startLetter,
		barcd_len: numberLetter,
		barcd_kcode: barcodeType,
		cnp_comment: cnpList,
		login_id: sessionStorage.getItem(StringCS.USERNAME),
		login_pw: sessionStorage.getItem(StringCS.PASSWORD)
	}
	return newData;
}


/**
   * SAVE DATA SETTING
*/
function saveDataSetting() {
	var regex = new RegExp("^[0-9]{1,2}$");
	var startLetter = document.getElementById("startLetter").value;
	var numberLetter = document.getElementById("numberLetter").value;
	if (regex.test(startLetter) && regex.test(numberLetter)) {
		Common.setupModal("load", null, Mess.I00002, null, null, null, false);
		$.ajax({
			type: "POST",
			data: JSON.stringify(prepareNewDataSetting()),
			url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING,
			// url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			timeout: ValueCS.VL_LONG_TIMEOUT,
			success: function (response) {
				console.log(response);
				Common.setupModal("load", null, Mess.I00002, null, null, null, false);
			},
			error: function (xmlhttprequest, textstatus, message) {
				if (textstatus === "timeout") {
					console.log("timeout")
				} else {
					console.log(textstatus)
				}
				Common.setupModal("error", null, Mess.E00004, null, StringCS.OK, null, false);
			}
		}).done(function (res) {
			console.log('res', res);
			sessionStorage.setItem(StringCS.SETTINGDATA, JSON.stringify(prepareNewDataSetting()));
			Common.setupModal("success", null, Mess.I00003, null, StringCS.OK, null, false);
			document.getElementById("msgError1").style.display = "none";
			document.getElementById("msgError2").style.display = "none";
		});
	}
	else {
		document.getElementById("msgError1").style.display = "none";
		document.getElementById("msgError2").style.display = "none";
		if (!regex.test(startLetter)) {
			document.getElementById("msgError1").style.display = "block";
		};
		if (!regex.test(numberLetter)) {
			document.getElementById("msgError2").style.display = "block";
		};
	}
}


function setCNPointCbb() {
	if (dataSetting != null) {
		if (dataSetting.m_lstCnpCmt != null) {
			var listCNPCbb = document.getElementsByClassName("cnp-cbb");
			for (var idx = 0; idx < listCNPCbb.length; idx++) {
				var optionSpace = document.createElement("option");
				optionSpace.classList.add("text")
				optionSpace.text = "";
				optionSpace.value = 0;
				listCNPCbb[idx].add(optionSpace);
				for (var i = 0; i < dataSetting.m_lstCnpCmt.length; i++) {
					var option = document.createElement("option");
					option.classList.add("text")
					option.text = dataSetting.m_lstCnpCmt[i].name;
					option.value = dataSetting.m_lstCnpCmt[i].code;
					document.getElementById("cbb_cnp" + idx).add(option);

					if (dataSetting.cnp_comment[idx] == dataSetting.m_lstCnpCmt[i].code) {
						option.selected = 'selected';
					}
				}
			}
		} else {
			document.getElementById("card3").remove();
		}
	} else {
		document.getElementById("card3").remove();
	}
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
	document.getElementById("backPageButton").onclick = function () {
		Common.movePage('/menu.html');
	};
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