import * as StringCS from '../Constant/strings.js'

/* 
	CHECK USER IS LOGIN
*/
function checkUser() {
    var data = sessionStorage.getItem(StringCS.USERNAME);
    if (data == null || data == '') {
        window.location.href = "/login_page.html";
    } else {
        document.getElementById("name").innerText = data;
    }
}


/* 
	CLEAR DATA SEARCHING
*/
function clearDataSearch() {
    var path = window.location.pathname;
    var page = path.split("/").pop().replace(".html", "");
    if (page != "search_page" && page != "kokyaku_sentaku_page" && page != "kinyuu_page") {
        localStorage.removeItem(StringCS.CUSTLIST);
    }
}


/* 
	SAVE DATA CUSTOMER
*/
function clearDataCus() {
    var path = window.location.pathname;
    var page = path.split("/").pop().replace(".html", "");
    if (page != "kinyuu_page" && page != "kokyaku_sentaku_page") {
        localStorage.removeItem(StringCS.CUSDAT);
    }
}



/* 
	ONLOAD ACTION
*/
function onLoadAction() {
	checkUser();
    clearDataSearch();
    clearDataCus();
}

window.onload = onLoadAction;