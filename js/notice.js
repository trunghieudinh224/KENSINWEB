function checkLogin() {
    var data = sessionStorage.getItem('username');
    if (data == null || data == '') {
        window.location.href = "/login_page.html";
    } else {
        document.getElementById("userName").textContent = data;
    }
}
window.onload = checkLogin;

$(document).ready(function () {
    fetne();

    // const array = ["1", "2", "3", "4"]
    // const selectOne = document.getElementById("selectOne");
    // array.map(item => {
    //     let option = document.createElement("option");
    //     option.value = item;
    //     console.log(option.value);
    //     option.text = "Hand" + item;
    //     selectOne.add(option);
    // })
    $("#buttonSave").click(() => {
        notificationLogin?.classList.add("show");
    })
});

$('form').submit(false);
const closeModal = () => {
    document.getElementById('notificationLogin').classList.remove("show");
}


const fetne = () => {
    $.ajax({
        url: "https://192.168.200.218/DemoWeb/compackr/kubunlist?key=0582668301&login_id=67&login_pw=67",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
            console.log(result)

            if (result != null) {
                if (JSON.parse(result).m_lstKubun1 != null) {
                    const selectOne = document.getElementById("selectOne");
                    for (let i = 0; i < JSON.parse(result).m_lstKubun1.length; i++) {
                        let option = document.createElement("option");
                        option.value = JSON.parse(result).m_lstKubun1[i].code + " : " + JSON.parse(result).m_lstKubun1[i].name;
                        console.log(JSON.parse(result).m_lstKubun1[i].code + " : " + JSON.parse(result).m_lstKubun1[i].name);
                        option.text = JSON.parse(result).m_lstKubun1[i].code + " : " + JSON.parse(result).m_lstKubun1[i].name;
                        selectOne.add(option);
                    }
                }

                if (JSON.parse(result).m_lstKubun2 != null) {
                    const selectTwo = document.getElementById("selectTwo");
                    for (let i = 0; i < JSON.parse(result).m_lstKubun2.length; i++) {
                        let option = document.createElement("option");
                        option.value = JSON.parse(result).m_lstKubun2[i].code + " : " + JSON.parse(result).m_lstKubun2[i].name;
                        console.log(JSON.parse(result).m_lstKubun2[i].code + " : " + JSON.parse(result).m_lstKubun2[i].name);
                        option.text = JSON.parse(result).m_lstKubun2[i].code + " : " + JSON.parse(result).m_lstKubun2[i].name;
                        selectTwo.add(option);
                    }
                }

            } else {

            }
        },
        error: function (jqXHR, exception) {
            console.log(exception);
        }
    });
}

const takePhoto = (id) => {
    console.log(id);
    chooseFile(id);
}
const takeCamera = () => {
    document.getElementById('camera').classList.add("show");
}
const chooseFile = (id) => {
    document.getElementById(id).click();
}
imgInp1.onchange = evt => {
    const [file] = imgInp1.files;
    const buttonX = document.getElementById("buttonX_1");

    if (file) {
        console.log(buttonX)
        image1.src = URL.createObjectURL(file);
        buttonX.style.display = "block";
    }
}
imgInp2.onchange = evt => {
    const [file] = imgInp2.files
    const buttonX = document.getElementById("buttonX_2");
    if (file) {
        image2.src = URL.createObjectURL(file)
        buttonX.style.display = "block";
    }
}
imgInp3.onchange = evt => {
    const [file] = imgInp3.files
    const buttonX = document.getElementById("buttonX_3");
    if (file) {
        image3.src = URL.createObjectURL(file)
        buttonX.style.display = "block";
    }
}
function before(idButton, idPic) {
    const buttonX = document.getElementById(idButton);

    document.getElementById(idPic).src = "images/image.png";
    buttonX.style.display = "none";
}

const showTime = () => {
    var m = new Date();
    var dateString = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate() + " " + (m.getUTCHours() + 7) + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();

    document.getElementById('txtTimeValue').value = dateString;
}