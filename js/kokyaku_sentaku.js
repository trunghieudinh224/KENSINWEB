let storage = localStorage.getItem("cusdat");
var data = JSON.parse(storage);
var dataAPI;

function getInformation() {
    if (data != null) {
        setupModal("load", null, "データを読み込んでいます...", null, null);
        $.ajax({
            url: "http://192.168.200.218:8080/Webkensin/compackr/readData?key=0582668301&cusrec=" + data.cusrec + "&login_id=7&login_pw=7",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (result) {
                dataAPI = JSON.parse(result);
                setInformation();
                setupModal();
            },
            error: function (jqXHR, exception) {
                console.log(exception);
            }
        });
    } else {
        history.back();
    }
}


function setInformation() {
    console.log(data);

    if (data != null) {
        document.getElementById("taishoo").innerHTML = data.taishoo;

        document.getElementById("kokyaku_kodo").innerHTML = data.kcode.trim();
        document.getElementById("kokyaku-mei").innerHTML = data.name.trim();
        document.getElementById("juusho").innerHTML = data.add_0.trim() + "\n" + data.add_1.trim();
        document.getElementById("denwabango").innerHTML = data.tel_0;
        document.getElementById("mtban").innerHTML = dataAPI.cusmastrDat.mtban;
    }

    if (dataAPI != null) {
        getShuukei();
        getKyookyuu();
        getRyookin();
    }
}


function getShuukei() {
    var shuukei = "";
    let listSyuku = dataAPI.lstShuku;

    for (var idx = 0; idx < listSyuku.length; idx++) {
        if (listSyuku[idx].code == dataAPI.cusmastrDat.shuku) {
            shuukei = listSyuku[idx].name.trim();
            break;
        }
    }

    if (dataAPI.cusmastrDat.shuku == 0 || dataAPI.cusmastrDat.shuku == 4 || data.m_nBkcd != 0) {
        if (dataAPI.cusmastrDat.fkin != 0) {
            shuukei = "依頼中";
        } else {
            shuukei = formatShuku(data.bkcd);
        }
    }
    document.getElementById("shuukei").innerHTML = shuukei;
}


function formatShuku(value) {
    var result = "銀";
    if (value.toString().length == 1) {
        result = result + "00" + value.toString();
    } else if (value.toString().length == 2) {
        result = result + "0" + value.toString();
    } else {
        result = result + value.toString();
    }
    return result;
}


function getKyookyuu() {
    var result = "";
    switch (dataAPI.cusmastrDat.kyoku) {
        case 1:
            result = "一般";
            break;
        case 2:
            result = "供給親";
            break;
        case 3:
            result = "供給子";
            break;
        default:
            result = "";
    }
    document.getElementById("kyookyuu").innerHTML = result;
}

function kinyuuMove(mode) {
    sessionStorage.setItem('kinyuu_mode', mode);
    changePage('/kinyuu_page.html');
}

function getRyookin() {
    if (dataAPI.cusmastrDat.gasku == 0) {
        document.getElementById("ryookin").innerHTML = "未設定";
        return;
    }
    var result = "";
    switch (dataAPI.cusmastrDat.mSum) {
        case 0:
            result = "未設定";
            break;
        case 1:
            result = "通常";
            break;
        case 2:
            result = "簡ガス";
            break;
        case 3:
            result = "契約";
            break;
        case 4:
            result = "手入力";
            break;
        default:
            result = "";
            break;
    }
    result = result + ":" + dataAPI.cusmastrDat.gasku;
    document.getElementById("ryookin").innerHTML = result;
}


window.onload = getInformation()


function setupModal(status, title, message, textButton1, textButton2) {
    var modal = document.getElementById("myModal");
    var titleModal = document.getElementsByClassName("title-modal")[0];
    var messageModal = document.getElementsByClassName("modal-message-detail")[0];
    var buttonConfirm = document.getElementsByClassName("button-confirm")[0];
    var closeButton = document.getElementsByClassName("modal-close-button")[0];

    
    titleModal.innerHTML = title;
    messageModal.innerHTML = message;
    if (buttonConfirm != null) {
        buttonConfirm.innerHTML = message;
    }

    if (status == "load") {
        titleModal.style.display = "none";
        closeButton.style.display = "none";
        buttonConfirm.style.display = "none";
    }

    if (modal.style.display == "none" || modal.style.display == "") {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }

    // When the user clicks on <span> (x), close the modal
    closeButton.onclick = function () {
        modal.style.display = "none";
    }
}