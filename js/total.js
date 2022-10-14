import * as Common from './Common/common_function.js'
import * as Other from './Common/other_util.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'

/*****  VIEW VARIABLE  *****/
/* dialog */
const overlay = document.getElementsByClassName("overlay")[0];
/* select datepicker */
var selectDate = document.getElementById('selectDate');
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* user data */
var userData = JSON.parse(localStorage.getItem("UserData"));
/* shuukei data */
var shuukeiData;
/* image string */
var imgString = "";

var defaultPrintSize = window.getComputedStyle(document.getElementsByClassName("text-print")[0]).fontSize;
var defaultPaddingPrintForm = window.getComputedStyle(document.getElementById("printContentDetail"), null).getPropertyValue('padding');

/* shuukei data */
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



/* 
    SETUP LAYOUT EDIT VIEW
*/
function setupLayoutEditView() {
    if (userData.systemDat.FBUNRUI_3 == 0 && userData.systemDat.FHMCODE_3 == 0 && userData.systemDat.FHBCODE_3 == 0) {
        document.getElementById("ShukeiToyuCnt").style.display = "none";
        document.getElementById("ToyuTable").style.display = "none";
        document.getElementById("ToyuTablePrint").style.display = "none";
    }
}


/* 
    SET DEFAULT VALUE SELECT DATE
*/
function setDefaultValueSelectDate() {
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


/* 
    SETUP SELECT DATE VIEW
*/
function setupSelectDateView() {
    selectDate.onchange = function () {
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
}


/* 
    GET SHUUKEI DATA
*/
function getShuukeiData() {
    var urlString;
    if (selectDate.value == "1") {
        let date = document.getElementById("date-end").value;
        // urlString = StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + date.replaceAll("-", "/") + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
        urlString = StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + date.replaceAll("-", "/") + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
    } else {
        let dateStart = document.getElementById("date-start").value;
        let dateEnd = document.getElementById("date-end").value;
        // urlString = StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + dateStart.replaceAll("-", "/") + "&date2=" + dateEnd.replaceAll("-", "/") + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
        urlString = StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + dateStart.replaceAll("-", "/") + "&date2=" + dateEnd.replaceAll("-", "/") + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
    }

    Common.setupModal("load", null, Mess.I00001, null, null);
    $.ajax({
        url: urlString,
        headers: {
            'Content-Type': StringCS.PR_CONTENT_TYPE
        },
        success: function (result) {
            shuukeiData = JSON.parse(result);

            // if (shuukeiData != null) {
            //     if (selectDate.value == "0") {

            //     } else {

            //     }
            // }
            viewList = setViewList("edt");
            setShuukeiData();
            modal.style.display = "none";

        },
        error: function (jqXHR, exception) {
            console.log(exception);
            Common.setupModal("error", null, Mess.E00003, StringCS.OK, null);
        },
        timeout: ValueCS.VL_LONG_TIMEOUT
    });
}


var viewList;

function setViewList(type) {
    var list = [
        document.getElementsByClassName("kenCnt-" + type)[0],
        document.getElementsByClassName("toyuCnt-" + type)[0],
        document.getElementsByClassName("nyuCnt-" + type)[0],
        document.getElementsByClassName("uriCnt-" + type)[0],
        document.getElementsByClassName("rowUses-" + type)[0],
        document.getElementsByClassName("rowPay-" + type)[0],
        document.getElementsByClassName("rowTax-" + type)[0],
        document.getElementsByClassName("rowKang-" + type)[0],
        document.getElementsByClassName("rowTotal-" + type)[0],
        document.getElementsByClassName("toyuUse-" + type)[0],
        document.getElementsByClassName("toyuPay-" + type)[0],
        document.getElementsByClassName("toyuTax-" + type)[0],
        document.getElementsByClassName("toyuTotal-" + type)[0],

        document.getElementsByClassName("rowInput-" + type)[0],
        document.getElementsByClassName("rowAdjust-" + type)[0],
        document.getElementsByClassName("rowUrisur-" + type)[0],
        document.getElementsByClassName("rowUrikin-" + type)[0],
        document.getElementsByClassName("rowUriTax-" + type)[0],
        document.getElementsByClassName("rowUriTotal-" + type)[0]
    ]
    return list;
}

function setShuukeiData() {
    viewList[0].innerHTML = Other.KingakuFormat(shuukeiData.mKensu);
    viewList[1].innerHTML = Other.KingakuFormat(shuukeiData.mToyuCnt);
    viewList[2].innerHTML = Other.KingakuFormat(shuukeiData.mNyucnt);
    viewList[3].innerHTML = Other.KingakuFormat(shuukeiData.mUricnt);
    viewList[4].innerHTML = Other.Format(shuukeiData.mGsiyou, 1);
    viewList[5].innerHTML = Other.KingakuFormat(shuukeiData.mGryokin);
    viewList[6].innerHTML = Other.KingakuFormat(shuukeiData.mShohi);
    viewList[7].innerHTML = Other.KingakuFormat(shuukeiData.mKang);
    viewList[8].innerHTML = Other.KingakuFormat(shuukeiData.mTotal);

    viewList[9].innerHTML = Other.Format(shuukeiData.mToyuUse, 1);
    viewList[10].innerHTML = Other.KingakuFormat(shuukeiData.mToyuKin);
    viewList[11].innerHTML = Other.KingakuFormat(shuukeiData.mToyuTax);
    viewList[12].innerHTML = Other.KingakuFormat(shuukeiData.mToyuTotal);

    viewList[13].innerHTML = Other.KingakuFormat(shuukeiData.mNyukin);
    viewList[14].innerHTML = Other.KingakuFormat(shuukeiData.mChosei);
    viewList[15].innerHTML = shuukeiData.mUrisur; //Other.Format("#,###,##0.00", shuukeiData.mUrisur, 2);
    viewList[16].innerHTML = Other.KingakuFormat(shuukeiData.mUrikin);
    viewList[17].innerHTML = Other.KingakuFormat(shuukeiData.mUritax);
    viewList[18].innerHTML = Other.KingakuFormat(shuukeiData.mUrikin + shuukeiData.mUritax);
}


function setDataPrintForm() {
    let tempList = viewList;
    viewList = setViewList("prt");
    for (var i = 0; i < viewList.length; i++) {
        viewList[i].innerHTML = tempList[i].textContent + viewList[i].textContent;
    }
}


/* 
    SHOW NIPPOU DIALOG
*/
function showNippouDialog() {
    overlay.style.zIndex = "2";
    overlay.classList.add("overlay-animate");
}


/* 
    CLOSE NIPPOU DIALOG
*/
function closeNippouDialog() {
    overlay.style.zIndex = "-1";
    overlay.classList.remove("overlay-animate");
}


/* 
    BACK TO EDIT VIEW
*/
function backToEditView() {
    document.getElementById('editView').style.display = "block";
    document.getElementById('printView').style.display = "none";
    document.getElementById('shuukeiForm').style.display = "none";
    document.getElementById('nippouArea').style.display = "none";
    document.getElementById('kensinForm').style.display = "none";
}


/* 
    CONVERT IMAGE TO BASE64
*/
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


/* 
    SETUP PRINT FORM
*/
function setupPrintForm(widthScreen, widthForm, sizeTitle, sizeSingleLine, lineHeightSingleLine, sizeItem, lineheightItem, endSpace, paddingForm) {
    if (Common.checkDevice() < 2) {
        document.getElementById('form').style.width = widthScreen;
        const form = document.getElementsByClassName("wrap-mainform");
        form[0].style.width = widthForm;
    }

    document.getElementById("titlePrintView").style.fontSize = sizeTitle;

    const shukei_single_line = document.getElementsByClassName("sg-line");
    for (let i = 0; i < shukei_single_line.length; i++) {
        console.log(shukei_single_line[i].value);
        shukei_single_line[i].style.fontSize = sizeSingleLine;
        shukei_single_line[i].style.lineHeight = lineHeightSingleLine;
        shukei_single_line[i].style.fontWeight = "normal";
    }

    const item = document.getElementsByClassName("item");
    for (let i = 0; i < item.length; i++) {
        console.log(item[i].value);
        item[i].style.fontSize = sizeItem;
        item[i].style.lineHeight = lineheightItem;
    }

    var endspace = document.getElementsByClassName("end-space");
    for (let i = 0; i < endspace.length; i++) {
        endspace[i].style.height = endSpace;
    }

    document.getElementById("printContentDetail").padding = paddingForm;
}


/* 
    CREATE IMAGE FILE
*/
function createImageFile() {
    // Common.setupModal("load", null, Mess.I00001, null, null);
    // document.getElementsByClassName('modal-content')[0].style.display = "none";
    // document.getElementById('myModal').style.backgroundColor = "rgba(0,0,0,0.9)";
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('shuukeiForm').style.display = "block";
    setDataPrintForm();
    setupPrintForm("100vh", "650px", "55px", "31px", "37px", "31px", "37px", "50px", "20px");
    // domtoimage.toBlob(document.getElementById('printContentDetail'))
    //     .then(function (blob) {
    //         getBase64(blob).then(
    //             data => {
    //                 console.log(data)
    //                 imgString = data;
    //                 window.scrollTo(0, 0);

    //                 const interval = setInterval(function () {
    //                     setupPrintForm("100%", "600px", "45px", defaultPrintSize, "25px", defaultPrintSize, "25px", "0px", defaultPaddingPrintForm)
                        
    //                     modal.style.display = "none";
    //                     document.getElementsByClassName('modal-content')[0].style.display = "block";
    //                     document.getElementById('myModal').style.backgroundColor = "rgba(0,0,0,0.4)";
    //                     clearInterval(interval);

    //                 }, 100);
    //             }
    //         );
    //     })
}


/* 
    SEND IMAGE
*/
function sendImage() {
    imgString = imgString.replace("data:image/png;base64,", "");
    navigator.clipboard.writeText(imgString);
    window.location.href = "printermarutou://print&&1";
}


/* 
    SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("menuOption").onclick = function () { Common.movePage('/menu_page.html') };
    document.getElementById("settingOption").onclick = function () { Common.movePage('/setting_page.html') };
    document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/* 
    ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("backPageButton").onclick = Common.backAction;
    document.getElementById("insatsuButton").onclick = createImageFile;
    document.getElementById("getShuukeiDataButton").onclick = getShuukeiData;
    document.getElementById("backPrintButton").onclick = backToEditView;
    document.getElementById("sendToAppButton").onclick = sendImage;

    document.getElementById("nippouButton").onclick = showNippouDialog;
    document.getElementById("closeNippouButton").onclick = closeNippouDialog;
    document.getElementById("kenshinNippouButton").onclick = showKenshinNippou;
}


function showKenshinNippou() {
    closeNippouDialog();

    // Common.setupModal("load", null, Mess.I00001, null, null);
    // document.getElementsByClassName('modal-content')[0].style.display = "none";
    // document.getElementById('myModal').style.backgroundColor = "rgba(0,0,0,0.9)";
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('nippouArea').style.display = "block";
    document.getElementById('kensinForm').style.display = "block";
    setupPrintForm("100vh", "650px", "55px", "31px", "37px", "31px", "37px", "50px", "20px");
    domtoimage.toBlob(document.getElementById('printContentDetail'))
        .then(function (blob) {
            getBase64(blob).then(
                data => {
                    console.log(data)
                    imgString = data;
                    window.scrollTo(0, 0);

                    // const interval = setInterval(function () {
                    //     setupPrintForm("100%", "600px", "45px", defaultPrintSize, "25px", defaultPrintSize, "25px", "0px", defaultPaddingPrintForm)
                        
                    //     modal.style.display = "none";
                    //     document.getElementsByClassName('modal-content')[0].style.display = "block";
                    //     document.getElementById('myModal').style.backgroundColor = "rgba(0,0,0,0.4)";
                    //     clearInterval(interval);

                    // }, 100);
                }
            );
        })
}


/* 
    ONLOAD ACTION
*/
function onLoadAction() {
    setupLayoutEditView();
    setOptionMenu();
    setDefaultValueSelectDate();
    setupSelectDateView();
    onclickAction();
}


window.onload = onLoadAction;