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
/* view item list */
var viewItemtList;
/* default text size of printting form */
var defaultPrintSize = window.getComputedStyle(document.getElementsByClassName("text")[0]).fontSize;
/* default title size of printting form */
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



/** 
    * SETUP LAYOUT EDIT VIEW
*/
function setupLayoutEditView() {
    if (userData.systemDat.FBUNRUI_3 == 0 && userData.systemDat.FHMCODE_3 == 0 && userData.systemDat.FHBCODE_3 == 0) {
        document.getElementById("ShukeiToyuCnt").style.display = "none";
        document.getElementById("ToyuTable").style.display = "none";
        document.getElementById("ToyuTablePrint").style.display = "none";
    }
}


/** 
    * SET DEFAULT VALUE SELECT DATE
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


/** 
    * SETUP SELECT DATE VIEW
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


/** 
    * GET SHUUKEI DATA
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

    Common.setupModal("load", null, Mess.I00001, null);
    $.ajax({
        url: urlString,
        headers: {
            'Content-Type': StringCS.PR_CONTENT_TYPE
        },
        success: function (result) {
            shuukeiData = JSON.parse(result);
            viewItemtList = setViewItemtList("edt");
            setShuukeiData();
            modal.style.display = "none";

        },
        error: function (jqXHR, exception) {
            console.log(exception);
            Common.setupModal("error", null, Mess.E00003, StringCS.OK);
        },
        timeout: ValueCS.VL_LONG_TIMEOUT
    });
}


/** 
    * SET VIEW ITEM LIST
*/
function setViewItemtList(type) {
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


/** 
    * SET SHUUKEI DATA
*/
function setShuukeiData() {
    viewItemtList[0].innerHTML = Other.KingakuFormat(shuukeiData.mKensu);
    viewItemtList[1].innerHTML = Other.KingakuFormat(shuukeiData.mToyuCnt);
    viewItemtList[2].innerHTML = Other.KingakuFormat(shuukeiData.mNyucnt);
    viewItemtList[3].innerHTML = Other.KingakuFormat(shuukeiData.mUricnt);
    viewItemtList[4].innerHTML = Other.Format(shuukeiData.mGsiyou, 1);
    viewItemtList[5].innerHTML = Other.KingakuFormat(shuukeiData.mGryokin);
    viewItemtList[6].innerHTML = Other.KingakuFormat(shuukeiData.mShohi);
    viewItemtList[7].innerHTML = Other.KingakuFormat(shuukeiData.mKang);
    viewItemtList[8].innerHTML = Other.KingakuFormat(shuukeiData.mTotal);

    viewItemtList[9].innerHTML = Other.Format(shuukeiData.mToyuUse, 1);
    viewItemtList[10].innerHTML = Other.KingakuFormat(shuukeiData.mToyuKin);
    viewItemtList[11].innerHTML = Other.KingakuFormat(shuukeiData.mToyuTax);
    viewItemtList[12].innerHTML = Other.KingakuFormat(shuukeiData.mToyuTotal);

    viewItemtList[13].innerHTML = Other.KingakuFormat(shuukeiData.mNyukin);
    viewItemtList[14].innerHTML = Other.KingakuFormat(shuukeiData.mChosei);
    viewItemtList[15].innerHTML = shuukeiData.mUrisur; //Other.Format("#,###,##0.00", shuukeiData.mUrisur, 2);
    viewItemtList[16].innerHTML = Other.KingakuFormat(shuukeiData.mUrikin);
    viewItemtList[17].innerHTML = Other.KingakuFormat(shuukeiData.mUritax);
    viewItemtList[18].innerHTML = Other.KingakuFormat(shuukeiData.mUrikin + shuukeiData.mUritax);
}


/** 
    * SET DATA SHUUKEI PRINT FORM
*/
function setDataPrintForm() {
    let tempList = viewItemtList;
    viewItemtList = setViewItemtList("prt");
    for (var i = 0; i < viewItemtList.length; i++) {
        viewItemtList[i].innerHTML = tempList[i].textContent + viewItemtList[i].textContent;
    }
}


/** 
    * SHOW NIPPOU DIALOG
*/
function showNippouDialog() {
    overlay.style.zIndex = "2";
    overlay.classList.add("overlay-animate");
}


/** 
    * CLOSE NIPPOU DIALOG
*/
function closeNippouDialog() {
    overlay.style.zIndex = "-1";
    overlay.classList.remove("overlay-animate");
}


/** 
    * BACK TO EDIT VIEW
*/
function backToEditView() {
    document.getElementById('editView').style.display = "block";
    document.getElementById('printView').style.display = "none";
    document.getElementById('shuukeiForm').style.display = "none";
    document.getElementById('nippouArea').style.display = "none";
    document.getElementById('kensinNippouForm').style.display = "none";
    document.getElementById('shuukeiNippouForm').style.display = "none";
}


/** 
    * SET TITLE PRINT FORM
    * 
    * @param type     [INT]
*/
function setTitlePrintForm(type) {
    var titleForm = "";
    switch (type) {
        case 0:
            titleForm = "検 針 日 報";
            break;
        case 1:
            titleForm = "集 金 日 報";
            break;
        case 2:
            titleForm = "売 上 日 報";
            break;
    }
    document.getElementById("titleNippouPrintView").innerHTML = titleForm;
}


/** 
    * CONVERT IMAGE TO BASE64
*/
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


/**
   * SETUP PRINT FORM
   *
   * @param widthScreen     [STRING]
   * @param widthForm     [STRING]
   * @param sizeTitle     [STRING]
   * @param sizeSingleLine     [STRING]
   * @param lineHeightSingleLine     [STRING]
   * @param sizeItem     [STRING]
   * @param lineheightItem     [STRING]
   * @param showEndPage     [STRING]
   * @param paddingForm     [STRING]
*/
function setupPrintForm(widthScreen, widthForm, sizeTitle, sizeSingleLine, lineHeightSingleLine, sizeItem, lineheightItem, showEndPage, paddingForm) {
    if (Common.checkDevice() < 2) {
        document.getElementById('form').style.width = widthScreen;
        const form = document.getElementsByClassName("wrap-mainform");
        form[0].style.width = widthForm;
    }

    var title = document.getElementsByClassName("title-printView");
    for (let i = 0; i < title.length; i++) {
        title[i].style.fontSize = sizeTitle;
    }

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
        
        if (showEndPage == true) {
            endspace[i].style.display = "block";
        } else {
            endspace[i].style.display = "none";
        }
    }

    document.getElementById("printContentDetail").padding = paddingForm;
}


/**
   * SEND IMAGE TO PRINTER
*/
function sendImage() {
    imgString = imgString.replace("data:image/png;base64,", "");
    navigator.clipboard.writeText(imgString);
    window.location.href = "printermarutou://print&&1";
}


/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("menuOption").onclick = function () { Common.movePage('/menu_page.html') };
    document.getElementById("settingOption").onclick = function () { Common.movePage('/setting_page.html') };
    document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/**
    * ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("backPageButton").onclick = Common.backAction;
    document.getElementById("insatsuButton").onclick = createImageShuukeiForm;
    document.getElementById("getShuukeiDataButton").onclick = getShuukeiData;
    document.getElementById("backPrintButton").onclick = backToEditView;
    document.getElementById("sendToAppButton").onclick = sendImage;

    document.getElementById("nippouButton").onclick = showNippouDialog;
    document.getElementById("closeNippouButton").onclick = closeNippouDialog;
    document.getElementById("kenshinNippouButton").onclick = createImageKenshinNippouForm;
    document.getElementById("shuukeiNippouButton").onclick = createImageShuukeiNippouForm;
}


/** 
    * CREATE IMAGE FILE OF SHUUKEI FORM
*/
function createImageShuukeiForm() {
    if (Common.checkPrintable() == false) {
        return;
    }
    Common.setupModal("load", null, Mess.I00001, null);
    Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('shuukeiForm').style.display = "block";
    setDataPrintForm();
    setupPrintForm("100vh", "650px", "55px", "31px", "37px", "31px", "37px", true, "20px");
    domtoimage.toBlob(document.getElementById('printContentDetail'))
        .then(function (blob) {
            getBase64(blob).then(
                data => {
                    console.log(data)
                    imgString = data;
                    window.scrollTo(0, 0);

                    const interval = setInterval(function () {
                        setupPrintForm("100%", "600px", "45px", defaultPrintSize, "25px", defaultPrintSize, "25px", false, defaultPaddingPrintForm)
                        Common.setBackgroundDialogScreen("block", "rgba(0,0,0,0.4)");
                        clearInterval(interval);
                        modal.style.display = "none";
                    }, 100);
                }
            );
        })
}


/** 
    * CREATE IMAGE FILE OF KENSHIN NIPPOU FORM
*/
function createImageKenshinNippouForm() {
    closeNippouDialog();
    if (Common.checkPrintable() == false) {
        return;
    }
    setTitlePrintForm(0);

    Common.setupModal("load", null, Mess.I00001, null);
    Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('nippouArea').style.display = "block";
    document.getElementById('kensinNippouForm').style.display = "block";
    document.getElementById('shuukeiNippouForm').style.display = "none";
    // setupPrintForm("100vh", "650px", "55px", "27px", "33px", "27px", "33px", true, "20px");
    setupPrintForm("100vh", "650px", "55px", "31px", "37px", "31px", "37px", true, "20px");
    domtoimage.toBlob(document.getElementById('printContentDetail'))
        .then(function (blob) {
            getBase64(blob).then(
                data => {
                    console.log(data)
                    imgString = data;
                    window.scrollTo(0, 0);

                    const interval = setInterval(function () {
                        setupPrintForm("100%", "600px", "45px", defaultPrintSize, "25px", defaultPrintSize, "25px", false, defaultPaddingPrintForm)
                        Common.setBackgroundDialogScreen("block", "rgba(0,0,0,0.4)");
                        clearInterval(interval);
                        modal.style.display = "none";
                    }, 100);
                }
            );
        })
}


/** 
    * CREATE IMAGE FILE OF SHUUKEI NIPPOU FORM
*/
function createImageShuukeiNippouForm() {
    closeNippouDialog();
    // if (Common.checkPrintable() == false) {
    //     return;
    // }
    setTitlePrintForm(1);

    Common.setupModal("load", null, Mess.I00001, null);
    Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('nippouArea').style.display = "block";
    document.getElementById('shuukeiNippouForm').style.display = "block";
    document.getElementById('kensinNippouForm').style.display = "none";
    setupPrintForm("100vh", "650px", "55px", "31px", "37px", "31px", "37px", true, "20px");
    domtoimage.toBlob(document.getElementById('printContentDetail'))
        .then(function (blob) {
            getBase64(blob).then(
                data => {
                    console.log(data)
                    imgString = data;
                    window.scrollTo(0, 0);

                    const interval = setInterval(function () {
                        setupPrintForm("100%", "600px", "45px", defaultPrintSize, "25px", defaultPrintSize, "25px", false, defaultPaddingPrintForm)
                        Common.setBackgroundDialogScreen("block", "rgba(0,0,0,0.4)");
                        clearInterval(interval);
                        modal.style.display = "none";
                    }, 100);
                }
            );
        })
}


/** 
    * ONLOAD ACTION
*/
function onLoadAction() {
    setupLayoutEditView();
    setOptionMenu();
    setDefaultValueSelectDate();
    setupSelectDateView();
    onclickAction();
}


window.onload = onLoadAction;