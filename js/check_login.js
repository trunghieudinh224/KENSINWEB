function checkUser() {
    var data = sessionStorage.getItem('username');
    if (data == null || data == '') {
        window.location.href = "/login_page.html";
    } else {
        document.getElementById("name").innerText = data;
    }
}

const changePage = (page) => {
    if (page != 'logout') {
        window.location.href = page;
    } else {
        // Remove saved data from sessionStorage
        sessionStorage.removeItem('username');

        // Remove all saved data from sessionStorage
        sessionStorage.clear();
        window.location.href = "/login_page.html";
    }
}

function clearDataSearch() {
    var path = window.location.pathname;
    var page = path.split("/").pop().replace(".html", "");
    if (page != "search_page" && page != "kokyaku_sentaku_page" && page != "kinyuu_page") {
        localStorage.removeItem("cuslist");
    }
}

function clearDataCus() {
    var path = window.location.pathname;
    var page = path.split("/").pop().replace(".html", "");
    if (page != "kinyuu_page" && page != "kokyaku_sentaku_page") {
        localStorage.removeItem("cusdat");
    }
}

checkUser();
clearDataSearch();
clearDataCus();