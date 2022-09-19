
const user = document.querySelector("#user");
const password = document.querySelector("#pass");
const loginBtn = document.querySelector("#btnLogin");

function checkAccount() {
    var data = sessionStorage.getItem('username');
    if (data != null) {
        window.location.href = "/menu_page.html";
    }
}

window.onload = checkAccount;

function validate(user, pass) {
    if ((!user || !pass) && user !== "" && pass !== "") {
        setupModal("error", "ログイン", "ユーザIDとパスワードを入力してください", "確認", null);
        return false;
    }
    return true;
}

function checkUser(username, password) {
    $.ajax({
        url: "http://192.168.200.218:8080/DemoWeb/compackr/loginchk?key=0582668301&login_id=" + username + "&login_pw=" + password,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
            console.log(result)

            if (JSON.parse(result).err_code == 0) {
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('password', password);
                window.location.href = "/menu_page.html";
            } else {
                setupModal("error", "ログイン", "ログインに失敗しました", "確認", null);
            }
        },
        error: function (jqXHR, exception) {
            console.log(exception);
        },
        timeout: 10000
    });
}

// ----------------Check input value------------------>
function login() {
    if (user.value === "" || password.value === "") {
        if (user.value === "") {
            user.classList.add("warning");
        }
        if (password.value === "") {
            password.classList.add("warning");
        }
    } else {
        setupModal("load", null, "しばらくお待ちください。。。", null, null);
        checkUser(user.value, password.value);
    }
}
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



function setupModal(status, title, message, textButton1, textButton2) {
    var modal = document.getElementById("myModal");
    var imgModal = document.getElementsByClassName("modal-image")[0];
    var titleModal = document.getElementsByClassName("title-modal")[0];
    var messageModal = document.getElementsByClassName("modal-message-detail")[0];
    var buttonConfirm = document.getElementsByClassName("button-confirm")[0];
    var closeButton = document.getElementsByClassName("modal-close-button")[0];

    titleModal.innerHTML = title;
    messageModal.innerHTML = message;

    if (status == "load") {
        imgModal.src = "../images/gif/gif_loading_data.gif";
        titleModal.style.display = "none";
        closeButton.style.display = "none";
        buttonConfirm.style.display = "none";
    } else {
        if (status == "info") {

        } else if (status == "error") {
            imgModal.src = "../images/gif/gif_fail.gif";
        }

        if (textButton1 != null) {
            buttonConfirm.style.display = "block";
        }
    }

    buttonConfirm.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks on <span> (x), close the modal
    closeButton.onclick = function () {
        modal.style.display = "none";
    }

    modal.style.display = "block";
}