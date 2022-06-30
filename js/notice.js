function checkLogin() {
    var data = sessionStorage.getItem('username');
    if (data == null || data == '') {
        window.location.href = "/login_page.html";
    } else {
        document.getElementById("userName").textContent = data;
        getDataCombobox();
    }
}
window.onload = checkLogin;

$(document).ready(function () {
    $("#buttonSave").click(() => {
        showDialog(true, "データを保存しています。。。", "black", false)
        sendAPI();
    })
});

$('form').submit(false);
const closeModal = () => {
    document.getElementById('notificationLogin').classList.remove("show");
}


const getDataCombobox = () => {
    $.ajax({
        url: "https://192.168.200.218/DemoWeb/compackr/kubunlist?key=0582668301&login_id="+sessionStorage.getItem('username')+"&login_pw=" + sessionStorage.getItem('password'),
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


const listPicture = [];
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
    const myNewFile = new File([file], getFormattedDate() + ".png");
    listPicture.push(myNewFile);
    noticeDat.m_strImageNm1 = myNewFile.name;
    const buttonX = document.getElementById("buttonX_1");

    if (file) {
        console.log(buttonX)
        image1.src = URL.createObjectURL(file);
        buttonX.style.display = "block";
    }
}

imgInp2.onchange = evt => {
    const [file] = imgInp2.files
    const myNewFile = new File([file], getFormattedDate() + ".png");
    listPicture.push(myNewFile);
    noticeDat.m_strImageNm2 = myNewFile.name;
    const buttonX = document.getElementById("buttonX_2");
    if (file) {
        image2.src = URL.createObjectURL(file)
        buttonX.style.display = "block";
    }
}
imgInp3.onchange = evt => {
    const [file] = imgInp3.files
    const myNewFile = new File([file], getFormattedDate() + ".png");
    listPicture.push(myNewFile);
    noticeDat.m_strImageNm3 = myNewFile.name;
    const buttonX = document.getElementById("buttonX_3");
    if (file) {
        image3.src = URL.createObjectURL(file)
        buttonX.style.display = "block";
    }
}

function before(idButton, idPic) {
    const buttonX = document.getElementById(idButton);

    if (idPic == 'image1') {
        noticeDat.m_strImage1 = '';
        noticeDat.m_strImageNm1 = '';
    } else if (idPic == 'image2') {
        noticeDat.m_strImage2 = '';
        noticeDat.m_strImageNm2 = '';
    } else {
        noticeDat.m_strImage3 = '';
        noticeDat.m_strImageNm3 = '';
    }

    document.getElementById(idPic).src = "images/image.png";
    buttonX.style.display = "none";
}

const showTime = () => {
    var date = new Date();
    var str = date.getFullYear() + "/" + formatNumTime(date.getMonth() + 1) + "/" + formatNumTime(date.getDate()) + " " + formatNumTime(date.getHours()) + ":" + formatNumTime(date.getMinutes()) + ":" + formatNumTime(date.getSeconds());


    document.getElementById('txtTimeValue').value = str;
}

function formatNumTime(value) {
    return (value.toString().length == 1 ? ("0" + (value + 1)) : (value + 1));
}


var noticeDat = {
    m_lId: 0,
    m_nKB1CD: 0,
    m_strKB1NM: "",
    m_nKB2CD: 0,
    m_strKB2NM: "",
    m_strMemo: "",
    m_tsTime: "",
    m_strImage1: "",
    m_strImage2: "",
    m_strImage3: "",
    m_strImageNm1: "",
    m_strImageNm2: "",
    m_strImageNm3: "",
    m_nMode: 0,
    login_id: "",
    login_pw: "",
};
const sendAPI = () => {
    getData();
    var delayInMilliseconds = 1500;

    setTimeout(function () {
        console.log(noticeDat);
        $.ajax({
            type: "POST",
            data: JSON.stringify(noticeDat),
            url: "https://192.168.200.218/DemoWeb/compackr/notice",
            contentType: "application/json",
            timeout: 15000,
            success: function (response) {
                console.log(response);
                updateDialog("./images/gif/gif_success.gif", "データ保存に成功しました。", "black", true)
                resetPage();
            },
            error: function (xmlhttprequest, textstatus, message) {
                if (textstatus === "timeout") {
                    console.log("timeout")
                } else {
                    console.log(textstatus)
                }
                updateDialog("./images/gif/gif_fail.gif", "データ保存に失敗しました。", "red", true)
            }
        }).done(function (res) {
            console.log('res', res);
        });
    }, delayInMilliseconds);

}

const getData = () => {
    const cbb1 = document.getElementById('selectOne');
    const valueCbb1 = cbb1.options[cbb1.selectedIndex].text;
    if ((valueCbb1.split(' : ')).length > 1) {
        noticeDat.m_nKB1CD = parseInt((valueCbb1.split(' : '))[0]);
        noticeDat.m_strKB1NM = (valueCbb1.split(' : '))[1];
    } else {
        noticeDat.m_nKB1CD = 0;
        noticeDat.m_strKB1NM = '';
    }
    const cbb2 = document.getElementById('selectTwo');
    const valueCbb2 = cbb2.options[cbb2.selectedIndex].text;
    if ((valueCbb2.split(' : ')).length > 1) {
        noticeDat.m_nKB2CD = parseInt((valueCbb2.split(' : '))[0]);
        noticeDat.m_strKB2NM = (valueCbb2.split(' : '))[1];
    } else {
        noticeDat.m_nKB2CD = 0;
        noticeDat.m_strKB2NM = '';
    }
    noticeDat.m_strMemo = document.getElementById('memo').value;
    noticeDat.m_tsTime = new Date(document.getElementById('txtTimeValue').value);

    getBase64(listPicture[0]).then(
        data => {
            noticeDat.m_strImage1 = data;
            console.log(data)
        }
    );
    getBase64(listPicture[1]).then(
        data => {
            noticeDat.m_strImage2 = data;
            console.log(data)
        }
    );
    getBase64(listPicture[2]).then(
        data => {
            noticeDat.m_strImage3 = data;
            console.log(data)
        }
    );
    noticeDat.m_nMode = 0;
    noticeDat.login_id = sessionStorage.getItem('username');
    noticeDat.login_pw = sessionStorage.getItem('password');
}

function getBase64(file) {
    // var fileInput = document.getElementById('image1');
    // var reader = new FileReader();
    // reader.readAsDataURL(listPicture[0]);
    // reader.onload = function () {
    //     console.log(reader.result);//base64encoded string
    // };
    // reader.onerror = function (error) {
    //     console.log('Error: ', error);
    // };

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


const resetPage = () => {
    document.getElementById('image1').src = "images/image.png";
    document.getElementById("buttonX_1").style.display = "none";
    document.getElementById('image2').src = "images/image.png";
    document.getElementById("buttonX_2").style.display = "none";
    document.getElementById('image3').src = "images/image.png";
    document.getElementById("buttonX_3").style.display = "none";

    document.getElementById("selectOne").options[0].selected = true;
    document.getElementById("selectTwo").options[0].selected = true;
    document.getElementById("memo").value = "";
    document.getElementById('txtTimeValue').value = "";
}

function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "" + formatNumTime(date.getMonth() + 1) + "" + formatNumTime(date.getDate()) + "_" + formatNumTime(date.getHours()) + "" + formatNumTime(date.getMinutes()) + "" + formatNumTime(date.getSeconds());

    return str;
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