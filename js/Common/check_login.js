import * as Common from '../Common/common_function.js'
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
   * SAVE DATA CUSTOMER
*/
function clearDataCus() {
    var path = window.location.pathname;
    var page = path.split("/").pop().replace(".html", "");
    if (page != "meter_reading_fillout_page" && page != "customer_page" && page != "product_search_page" && page != "purchase_page") {
        sessionStorage.removeItem(StringCS.CUSDAT);
    }
}


checkUser();
clearDataSearch();
clearDataCus();