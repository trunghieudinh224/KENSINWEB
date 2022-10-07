import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'


/*****  FUNCTION  *****/
/* 
	CHECK ACCOUNT
*/
function checkAccount() {
    var data = sessionStorage.getItem('username');
    if (data != null) {
        window.location.href = "/menu_page.html";
    }
}


/* 
	LOGIN ACTION
*/
function login() {
    let user = document.getElementById("user"); 
    let password = document.getElementById("pass"); 
    if (user.value === "" || password.value === "") {
        if (user.value === "") {
            user.classList.add("warning");
        }
        if (password.value === "") {
            password.classList.add("warning");
        }
    } else {
        Common.setupModal("load", null, "しばらくお待ちください。。。", null, null);
        checkUser(user.value, password.value);
    }
}


/* 
	CHECK USER ACCOUNT
    @param username
    @param password
*/
function checkUser(username, password) {
    $.ajax({
        url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_LOGIN + StringCS.PR_KEY + "&login_id=" + username + "&login_pw=" + password,
        // url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_LOGIN + StringCS.PR_KEY + "&login_id=" + username + "&login_pw=" + password,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
            console.log(result)

            if (JSON.parse(result).err_code == 0) {
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('password', password);
                getSystemDat();
            } else {
                Common.setupModal("error", "ログイン", "ログインに失敗しました", "確認", null);
            }
        },
        error: function (jqXHR, exception) {
            console.log(exception);
        },
        timeout: ValueCS.VL_SHORT_TIMEOUT
    });
}


/* 
	SET FOCUS INPUT
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


/* 
	GET SYSTEM DATA
*/
function getSystemDat() {
    $.ajax({
        url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_READDATA + StringCS.PR_KEY + "&login_id=" + sessionStorage.getItem('username') + "&login_pw=" + sessionStorage.getItem('password'),
        // url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_READDATA + StringCS.PR_KEY + "&login_id=" + sessionStorage.getItem('username') + "&login_pw=" + sessionStorage.getItem('password'),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
            let systemDat = JSON.parse(result);
            localStorage.setItem("UserData", JSON.stringify(systemDat));
            window.location.href = "/menu_page.html";
        },
        error: function (jqXHR, exception) {
            console.log(exception);
        }, 
        timeout: ValueCS.VL_SHORT_TIMEOUT
    });
}


/* 
	ONCLICK ACTION
*/
function onclickAction() {
	document.getElementById("loginButton").onclick = login;
}


/* 
	ONLOAD ACTION
*/
function onLoadAction() {
    checkAccount();
	onclickAction();
    setFocusInput();
}

window.onload = onLoadAction;