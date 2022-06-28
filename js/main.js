window.onload = async function () {
    $("#btnLogin").click(() => {
        login();
    })
    const login = () => {
        const user = document.getElementById("user").value;
        const pass = document.getElementById("pass").value;

        console.log("check user");
        validate(user, pass);
        if (user && pass) {
            fetne(user, pass);
            // window.location.href = "/notice_page.html";
        }
    }
    const validate = (user, pass) => {
        const notificationLogin = document.getElementById("notificationLogin");

        console.log(user, pass)
        if (!user || !pass) {
            notificationLogin?.classList.add("show");
        }
    }

    const fetne = (username, password) => {
        $.ajax({
            url: "http://192.168.200.218:8080/DemoWeb/compackr/loginchk?key=0582668301&login_id="+username+"&login_pw=" + password,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (result) {
                console.log(result)

                if (JSON.parse(result).err_code == 0) {
                    window.location.href = "/notice_page.html";
                } else {
                    document.getElementById("alertContent").innerText = JSON.parse(result).err_msg;
                    notificationLogin?.classList.add("show");
                }
            },
            error: function(jqXHR, exception) {
                console.log(exception);
            }
        });
    }
}

$('form').submit(false);
const closeModal = () => {
    document.getElementById('notificationLogin').classList.remove("show");
}