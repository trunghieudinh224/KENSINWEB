import * as Common from './common_function.js'
import * as StringCS from '../Constant/strings.js'
/**
   * CHECK USER IS LOGIN
*/
function checkUser() {
    var data = sessionStorage.getItem(StringCS.USERNAME);
    if (data == null || data == '') {
        Common.movePage('/login.html');
    } else {
        document.getElementById("name").innerText = data;
    }
}


/** 
   * CLEAR DATA SEARCHING
*/
function clearDataSearch() {
    var path = window.location.pathname;
    var page = path.split("/").pop().replace(".html", "");
    if (page != "search_customer" && page != "customer" && page != "meter_reading_fillout" && page != "product_search" && page != "purchase") {
        sessionStorage.removeItem(StringCS.CUSTLIST);
        sessionStorage.removeItem(StringCS.SEARCHSTRING);
    }
}


/** 
   * CLEAR DATA CUSTOMER
*/
function clearDataCus() {
    var path = window.location.pathname;
    var page = path.split("/").pop().replace(".html", "");
    if (page != "meter_reading_fillout" && page != "customer" && page != "product_search" && page != "purchase") {
        sessionStorage.removeItem(StringCS.CUSDAT);
    }
}


/**
   * CLEAR SEARCH MODE
*/
function clearSearchMode() {
    var mode = sessionStorage.getItem(StringCS.SEARCHMODE);
    var path = window.location.pathname;
    var page = path.split("/").pop().replace(".html", "");
    if (page != "menu" && page != "meter_reading_setting" && page != "total" && page != "setting") {
        if (mode == null || mode == "0") {
            Common.movePage('/menu.html');
        }
    }
}


/**
   * CLEAR URIAGE STORAGE
*/
function clearUriageStorage() {
    var path = window.location.pathname;
    var page = path.split("/").pop().replace(".html", "");
    if (page != "purchase" && page != "product_search") {
        sessionStorage.removeItem(StringCS.BUSFDATITEM);
        sessionStorage.removeItem(StringCS.SHOFDATITEM);
        sessionStorage.removeItem(StringCS.BUSFDATLIST);
        sessionStorage.removeItem(StringCS.SHOFDATLIST);
        sessionStorage.removeItem(StringCS.PRODUCTSTRING);
        sessionStorage.removeItem(StringCS.LISTBUSTNYU);
        sessionStorage.removeItem(StringCS.LISTBUSTCHO);
    } 
}


checkUser();
clearDataSearch();
clearDataCus();
clearSearchMode();
clearUriageStorage();