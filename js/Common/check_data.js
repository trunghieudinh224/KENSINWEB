import * as Common from './common_function.js'
import * as StringCS from '../Constant/strings.js'
/**
   * CHECK USER IS LOGIN
*/
function checkUser() {
    var data = sessionStorage.getItem(StringCS.USERNAME);
    if (data == null || data == '') {
        Common.movePage('/login_page.html');
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
    if (page != "search_page" && page != "customer_page" && page != "meter_reading_fillout_page" && page != "product_search_page" && page != "purchase_page") {
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
    if (page != "meter_reading_fillout_page" && page != "customer_page" && page != "product_search_page" && page != "purchase_page") {
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
    if (page != "menu_page" && page != "meter_reading_setting_page" && page != "total_page" && page != "setting_page") {
        if (mode == null || mode == "0") {
            Common.movePage('/menu_page.html');
        }
    }
}


/**
   * CLEAR URIAGE STORAGE
*/
function clearUriageStorage() {
    var path = window.location.pathname;
    var page = path.split("/").pop().replace(".html", "");
    if (page != "purchase_page" && page != "product_search_page") {
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