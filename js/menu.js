import * as Common from './Common/common_function.js'

/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("logoutOption").onclick = function() {Common.movePage('logout')};
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("gyoomuButton").onclick = function() {Common.movePage('/search_page.html')};
    document.getElementById("shuukeiButton").onclick = function() {Common.movePage('/total_page.html')};
    document.getElementById("settingButton").onclick = function() {Common.movePage('/setting_page.html')};
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    setOptionMenu();
    onclickAction();
}


window.onload = onLoadAction;
