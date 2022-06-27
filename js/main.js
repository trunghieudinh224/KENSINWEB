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
            window.location.href="/notice_page.html";
        }
    }
    const validate = (user, pass) => {
        const notificationLogin = document.getElementById("notificationLogin");

        console.log(user, pass)
        if (!user || !pass) {
            notificationLogin?.classList.add("show");
        }
    }
}

$('form').submit(false);
		const closeModal = () => {
			document.getElementById('notificationLogin').classList.remove("show");
		}