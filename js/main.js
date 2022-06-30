window.onload = async function () {
    var data = sessionStorage.getItem('username');
    if (data != null) {
        window.location.href = "/notice_page.html";
    }

    $("#btnLogin").click(() => {
        login();
    })
    const login = () => {
        const user = document.getElementById("user").value;
        const pass = document.getElementById("pass").value;

        console.log("check user");
        validate(user, pass);
        if (user && pass) {
            showDialog(true, "しばらくお待ちください。。。", "black", false)
            sendAPI(user, pass);
            // window.location.href = "/notice_page.html";
        }
    }
    const validate = (user, pass) => {
        const notificationLogin = document.getElementById("notificationLogin");

        console.log(user, pass)
        if (!user || !pass) {
            showDialog(true, "ユーザIDとパスワードを入力してください。", "red", true)
        }
    }

    const sendAPI = (username, password) => {
        $.ajax({
            url: "https://192.168.200.218/DemoWeb/compackr/loginchk?key=0582668301&login_id=" + username + "&login_pw=" + password,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (result) {
                console.log(result)

                if (JSON.parse(result).err_code == 0) {
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('password', password);
                } else {
                    updateDialog("./images/gif/gif_fail.gif", JSON.parse(result).err_msg, "red", true)
                }
            },
            error: function (jqXHR, exception) {
                console.log(exception);
            }
        });
    }
}

$('form').submit(false);
const closeModal = () => {
    document.getElementById('notificationLogin').classList.remove("show");
}


function showDialog(showIcon, mess, colorMess, showButton) {
    const gif = document.getElementById("loadingGif");
    if (showIcon == true) {
        gif.style.display = 'block';
    } else {
        gif.style.display = 'none';
    }
    const message = document.getElementById("alertContent");
    message.style.color = colorMess;
    message.innerText = mess;
    const button = document.getElementById("btnDialogOk");
    if (showButton == true) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
    notificationLogin?.classList.add("show");
}

function updateDialog(iconSrc, mess, colorMess, showButton) {
    const gif = document.getElementById("loadingGif");
    if (iconSrc != null) {
        gif.src = iconSrc;
    }
    const message = document.getElementById("alertContent");
    message.style.color = colorMess;
    message.innerText = mess;
    const button = document.getElementById("btnDialogOk");
    if (showButton == true) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
}