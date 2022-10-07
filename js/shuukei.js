"use strict";
const overlay = document.querySelector(".overlay");
var userData = JSON.parse(localStorage.getItem("UserData"));
var selectDate = document.getElementById('rangeDateSelect');

var shukeiItem = {
    mKensu: 0,  /** 件数 */
    mGsiyou: 0,  /** ガス使用量 */
    mGryokin: 0,  /** ガス料金 */
    mShohi: 0,  /** 消費税 */
    mKang: 0,  /** 還元額 */
    mTotal: 0,  /** 合計 */
    mNyukin: 0,  /** 入金額 */
    mChosei: 0,  /** 調整額 */
    mNyucnt: 0,  /** 入金件数 */
    mUricnt: 0,  /** 売上件数 */
    mUrisur: 0,  /** 売上数量 */
    mUrikin: 0,  /** 売上金額 */
    mUritax: 0,  /** 売上消費税金額 */
    mToyuCnt: 0,  /** 灯油検針件数 */
    mToyuUse: 0,  /** 灯油使用量 */
    mToyuKin: 0,  /** 灯油金額 */
    mToyuTax: 0,  /** 灯油消費税 */
    mToyuTotal: 0  /** 灯油金額合計 */
};

function nippou() {
    overlay.style.zIndex = "2";
    overlay.classList.add("overlay-animate");
}

function closeDialog() {
    overlay.style.zIndex = "-1";
    overlay.classList.remove("overlay-animate");
}

function backToEditView() {
    document.getElementById('editView').style.display = "block";
    document.getElementById('printView').style.display = "none";
}

/* 
	SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("menuOption").onclick = function() {Common.movePage('/menu_page.html')};
    document.getElementById("settingOption").onclick = function() {Common.movePage('/setting_page.html')};
    document.getElementById("logoutOption").onclick = function() {Common.movePage('logout')};
}

function initView() {
    setOptionMenu();
    setupLayoutEditView();
    setDefaultValueRangeDate();
}

function setupLayoutEditView() {
    if (userData.systemDat.FBUNRUI_3 == 0 && userData.systemDat.FHMCODE_3 == 0 && userData.systemDat.FHBCODE_3 == 0) {
        document.getElementById("ShukeiToyuCnt").style.display = "none";
        document.getElementById("ToyuTable").style.display = "none";
    }
}

function setDefaultValueRangeDate() {
    if (userData != null) {
        var startDay = String(userData.systemDat.HANSYSYM);
        startDay = startDay.substring(0, 10);
        document.getElementById("date-start").value = startDay;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("date-end").value = today;
    }
}

function initRangeDateView() {
    var dateStartArea = document.getElementById("date-start-area");
    var dateEndArea = document.getElementById("date-end-area");
    if (selectDate.value == "1") {
        dateStartArea.style.display = "none";
        dateEndArea.classList.remove('col-sm-6');
        dateEndArea.classList.remove('col-md-6');
        dateEndArea.classList.remove('col-lg-6');
        dateEndArea.classList.remove('col-xl-6');

        document.getElementsByClassName("date-end-title")[0].innerHTML = "日付";
    } else {
        dateStartArea.style.display = "block";
        dateEndArea.classList.add('col-sm-6');
        dateEndArea.classList.add('col-md-6');
        dateEndArea.classList.add('col-lg-6');
        dateEndArea.classList.add('col-xl-6');

        document.getElementsByClassName("date-end-title")[0].innerHTML = "終了";
    }
}

window.onload = initView;

function getData() {
    var urlString;
    if (selectDate.value == "1") {
        let date = document.getElementById("date-end").value;
        urlString = "https://192.168.200.218/Webkensin/compackr/readSyukei?key=0582668301&date1=" + date.replaceAll("-","/") +"&login_id=7&login_pw=7"
    } else {
        let dateStart = document.getElementById("date-start").value;
        let dateEnd = document.getElementById("date-end").value;
        urlString = "https://192.168.200.218/Webkensin/compackr/readSyukei?key=0582668301&date1=" + dateStart.replaceAll("-","/") + "&date2=" + dateEnd.replaceAll("-","/") + "&login_id=7&login_pw=7"
    }

    $.ajax({
        url: urlString,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
            let dataAPI = JSON.parse(result);

            if (selectDate.value == "0") {
                
            } else {
                
            }

        },
        error: function (jqXHR, exception) {
            console.log(exception);
        }
    });
}



















var imgString = "";
function createImageFile() {
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    domtoimage.toBlob(document.getElementById('printContentDetail'))
    .then(function(blob){
        getBase64(blob).then(
            data => {
                console.log(data)
                imgString = data;
                // window.scrollTo(0, 0);
            }
        );
    })
}


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


function sendImage() {
    imgString = imgString.replace("data:image/png;base64,", "");
    navigator.clipboard.writeText(imgString);
    window.location.href = "printermarutou://print&&1";
}


function setupFormPrint(widthScreen, widthForm, sizeTitle, sizeSingleLine, lineHeightSingleLine, sizeItem, lineheightItem) {
    document.getElementById('form').style.width = widthScreen;
    const form = document.getElementsByClassName("wrap-login100");
    form[0].style.width = widthForm

    document.getElementById("shukeiTitle").style.fontSize = sizeTitle

    const shukei_single_line = document.getElementsByClassName("shukei-single-line");
    for (let i = 0; i < shukei_single_line.length; i++) {
        console.log(shukei_single_line[i].value);
        shukei_single_line[i].style.fontSize = sizeSingleLine
        shukei_single_line[i].style.lineHeight = lineHeightSingleLine
        shukei_single_line[i].style.fontWeight = "normal"
    }

    const item = document.getElementsByClassName("item");
    for (let i = 0; i < item.length; i++) {
        console.log(item[i].value);
        item[i].style.fontSize = sizeItem
        item[i].style.lineHeight = lineheightItem
    }
}