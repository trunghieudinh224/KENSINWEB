const changePage = (page) => {
    if (page != 'logout') {
        window.location.href = page;
    } else {
        // Remove saved data from sessionStorage
        sessionStorage.removeItem('username');

        // Remove all saved data from sessionStorage
        sessionStorage.clear();
        window.location.href = "printdemo1://";
    }
}