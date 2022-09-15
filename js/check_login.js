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

window.onload = checkUser;
