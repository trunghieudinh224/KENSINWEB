import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'

/*****  FUNCTION  *****/
/**
   * CHECK ACCOUNT
*/
function checkAccount() {
    var data = sessionStorage.getItem(StringCS.USERNAME);
    if (data != null) {
        Common.movePage('/menu.html');
    }
}


/**
   * LOGIN ACTION
*/
function login() {
    let user = document.getElementById("user"); 
    let password = document.getElementById("pass"); 
    if (user.value === "" || password.value === "") {
        Common.setupModal("error", null, Mess.I00005, StringCS.CLOSE, null);
    } else {
        Common.setupModal("load", null, Mess.I00001, null, null);
        checkUser(user.value, password.value);
    }
}


/**
   * CHECK USER ACCOUNT
   * @param username     [INT]
   * @param password     [INT]
*/
function checkUser(username, password) {
    $.ajax({
        // url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_LOGIN + StringCS.PR_KEY + "&login_id=" + username + "&login_pw=" + password,
        url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_LOGIN + StringCS.PR_KEY + "&login_id=" + username + "&login_pw=" + password,
        headers: {
            'Content-Type': StringCS.PR_CONTENT_TYPE
        },
        success: function (result) {
            if (JSON.parse(result).err_code == 0) {
                sessionStorage.setItem(StringCS.USERNAME, username);
                sessionStorage.setItem(StringCS.PASSWORD, password);
                getSystemDat();
            } else {
                Common.setupModal("error", StringCS.LOGIN, JSON.parse(result).err_msg, StringCS.CONFIRM, null);
            }
        },
        error: function (jqXHR, exception) {
            console.log(exception);
        },
        timeout: ValueCS.VL_SHORT_TIMEOUT
    });
}


/**
   * SET FOCUS INPUT
*/
function setFocusInput() {
    let user = document.getElementById("user"); 
    let password = document.getElementById("pass"); 
    user.onfocus = function () {
        if (user.classList.contains("warning")) {
            user.classList.remove("warning");
        }
    }
    password.onfocus = function () {
        if (password.classList.contains("warning")) {
            password.classList.remove("warning");
        }
    }
}


/**
   * GET SYSTEM DATA
*/
function getSystemDat() {
    $.ajax({
        // url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_READDATA + StringCS.PR_KEY + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
        url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_READDATA + StringCS.PR_KEY + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
        headers: {
            'Content-Type': StringCS.PR_CONTENT_TYPE
        },
        success: function (result) {
            let systemDat = JSON.parse(result);
            sessionStorage.setItem(StringCS.SYSTEMDAT, JSON.stringify(systemDat));
            getDataSetting();
        },
        error: function (jqXHR, exception) {
            console.log(exception);
        }, 
        timeout: ValueCS.VL_SHORT_TIMEOUT
    });
}


/**
   * GET DATA SETTING
*/
function getDataSetting() {
	Common.setupModal("load", null, Mess.I00001, null, null);
	$.ajax({
        // url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING + StringCS.PR_KEY + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
        url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING + StringCS.PR_KEY + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		headers: {
			'Content-Type': StringCS.PR_CONTENT_TYPE
		},
		success: function (result) {
			let settingDat = JSON.parse(result);
            sessionStorage.setItem(StringCS.SETTINGDATA, JSON.stringify(settingDat));
            sessionStorage.setItem(StringCS.SEARCHMODE, "0");
            Common.movePage('/meter_reading_setting.html');
		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00003, StringCS.OK, null);
		},
        timeout: ValueCS.VL_SHORT_TIMEOUT
	});
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
	document.getElementById("loginButton").onclick = login;
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    checkAccount();
	onclickAction();
    setFocusInput();
}

window.onload = onLoadAction;