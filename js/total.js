import * as Common from './Common/common_function.js'
import * as Other from './Common/other_util.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'
import * as Dat from './Dat/dat.js'
import * as GasRaterCom from './Common/gasratercom.js'
// import * as KensinKinyuu from './kensin_kinnyuu.js'

/*****  VIEW VARIABLE  *****/
/* dialog */
const overlay = document.getElementsByClassName("overlay")[0];
/* select datepicker */
var selectDate = document.getElementById('selectDate');
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* user data */
var systemDat = JSON.parse(sessionStorage.getItem(StringCS.SYSTEMDAT)).mSystemDat;
/* setting data */
var dataSetting = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));
/* shuukei data */
var shuukeiData = new Dat.ShukeiItem();
/* shuukei data all*/
var shukeiItemAll = new Dat.ShukeiItem();
var m_lstShukeiDat;
let mItemList = new Map();
let m_mapKensinData = new Map();
let m_mapUriageData = new Map();
var sysfDat = new Dat.SysfDat().setValue(25, 35, 29, 1970, 1, 1, 80, 50, 80, 1, 0, 1, 0, 1000, 0, 1000, 2019, 5, 1, false, 0, true, true, 0,
    false, [50, 250, 50, 200, 60, 180], [20, 60], 0, true, true, true, true, true, true);
var sy2fDat = new Dat.Sy2fDat().setValue(0, 0, 0, 0, 0, [1, 1, -1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 5, 0, 0]);
var kouserDat = new Dat.KouserDat();
var unitList = ["件 ]", "件 ]", "件 ]", "件 ]", "m３ ]", "円 ]", "円 ]", "円 ]", "円 ]", "L ]", "円 ]", "円 ]", "円 ]", "円 ]", "円 ]", " ]", "円 ]", "円 ]", "円 ]"];
// var kokfDat1 = new Dat.KokfDat().setValue("野村　洋子", 5, 1, 440, 1, true, 9990, 9550, 2019, 2, 7, 570, 1830, 0, 319, 22920, 0,
//                                             0, 0, 0, 0, 0, new Dat.KtpcDat().setValue(18000000, 211200000, 0), 1, 0, 4, 0, 0, 0,
//                                             0, 0, 0, null, 0, 0, 14884, 0, 0, 100, 8, 0, 0, 0, 20000, 1600, 0, 0, 0, 0, 0, 1000,
//                                             true, 0, "○児市△貫町３－３", "0010000375",  "", "野村　洋子", "様", new Dat.ZyksDat().setValue(261, 2018, 5, 8),
//                                             "---------��", 44, true);
// var kokfDat2 = kokfDat1;
// kokfDat2.mCusCode = "0010000370";
// kokfDat2.mName = "xyz";
// var kokfDat3 = kokfDat1;
// kokfDat3.mKDate = 7;
// var kokfDat4 = kokfDat1;
// kokfDat4.mKDate = 7;
// kokfDat4.mCusCode = "0010000370";
// kokfDat4.mName = "xyz";

/** list cusrec */
var lstCusrec = [];

var dateStart = null;
var dateEnd = null;



/*****  PRINT VARIABLE  *****/
/* image string */
var imgString = "";
/* view item list */
var viewItemtList;
/* default padding printting form */
var defaultPaddingPrintForm = window.getComputedStyle(document.getElementById("printContentDetail"), null).getPropertyValue('padding');
/* default text size of printting form */
var defaultPrintSize = window.getComputedStyle(document.getElementsByClassName("text")[0]).fontSize;


/** 
    * SETUP LAYOUT EDIT VIEW
*/
function setupLayoutEditView() {
    if (systemDat.FBUNRUI_3 == 0 && systemDat.FHMCODE_3 == 0 && systemDat.FHBCODE_3 == 0) {
        document.getElementById("ShukeiToyuCnt").style.display = "none";
        document.getElementById("ToyuTable").style.display = "none";
        document.getElementById("ToyuTablePrint").style.display = "none";
    }
}


/** 
    * SETUP DATEPICKER
*/
function setupDatePicker() {
    $(document).ready(function () {
        $(function () {
            $.datepicker.regional['jp'] = {
                closeText: "閉じる",
                prevText: "前",
                nextText: "次",
                currentText: "現在",
                monthNames: ["- 1月", "- 2月", "- 3月", "- 4月", "- 5月", "- 6月",
                    "- 7月", "- 8月", "- 9月", "- 10月", "- 11月", "- 12月"
                ],
                monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月",
                    "7月", "8月", "9月", "10月", "11月", "12月"
                ],
                dayNames: ["日", "月", "火", "水", "木", "金", "土"],
                dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
                dayNamesMin: ["日", "月", "火", "水", "木", "金", "土"],
                dateFormat: "yy/mm/dd",
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
            };
            $.datepicker.setDefaults($.datepicker.regional['jp']);

            $('#date-start').datepicker();
            $('#date-end').datepicker();
            Common.setupDatePicker("date-start");
            Common.setupDatePicker("date-end");
        });

        $("#date-start").on("change", function () {
            if (selectDate.value == "0") {
                var _dateStart = $(this).val();
                var _dateEnd = $("#date-end").val();
                if (_dateStart > _dateEnd) {
                    Common.setupModal("info", null, Mess.I00011, null, StringCS.OK, null, false);

                    if (systemDat != null) {
                        document.getElementById("date-start").value = dateStart;
                    }
                }
            }
        });

        $("#date-start").on("focus", function () {
            dateStart = $(this).val();
        });


        $("#date-end").on("change", function () {
            if (selectDate.value == "0") {
                var _dateEnd = $(this).val();
                var _dateStart = $("#date-start").val();
                if (_dateStart > _dateEnd) {
                    Common.setupModal("info", null, Mess.I00011, null, StringCS.OK, null, false);

                    if (systemDat != null) {
                        document.getElementById("date-end").value = dateEnd;
                    }
                }
            }
        });

        $("#date-end").on("focus", function () {
            dateEnd = $(this).val();
        });
    });
}


/** 
* SET DEFAULT VALUE SELECT DATE
*/
function setDefaultValueSelectDate() {
    var modeTimeshukei = sessionStorage.getItem(StringCS.MODETIMESHUKEI);
    var startDay = sessionStorage.getItem(StringCS.SHUKEISTARTDAY);
    var endDay = sessionStorage.getItem(StringCS.SHUKEIENDDAY);
    if (startDay == null) {
        startDay = String(systemDat.HANSYSYM);
        startDay = startDay.substring(0, 10);
        startDay = startDay.replaceAll("-", "/");
        sessionStorage.setItem(StringCS.SHUKEISTARTDAY, startDay);
    }

    if (endDay == null) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;
        endDay = today;
        sessionStorage.setItem(StringCS.SHUKEIENDDAY, endDay);
    }
    if (modeTimeshukei != null) {
        selectDate.value = modeTimeshukei;
        document.getElementById("date-start").value = sessionStorage.getItem(StringCS.SHUKEISTARTDAY);
        document.getElementById("date-end").value = sessionStorage.getItem(StringCS.SHUKEIENDDAY);


    } else {
        selectDate.value = "1";
        if (systemDat != null) {
            // var startDay = String(systemDat.HANSYSYM);
            // startDay = startDay.substring(0, 10);
            // startDay = startDay.replaceAll("-", "/");
            document.getElementById("date-start").value = startDay;

            // var today = new Date();
            // var dd = String(today.getDate()).padStart(2, '0');
            // var mm = String(today.getMonth() + 1).padStart(2, '0');
            // var yyyy = today.getFullYear();

            // today = yyyy + '/' + mm + '/' + dd;
            document.getElementById("date-end").value = endDay;
        }
    }
    var dateStartArea = document.getElementById("date-start-area");
    var dateEndArea = document.getElementById("date-end-area");
    if (selectDate.value == "1") {
        dateStartArea.style.display = "none";
        dateEndArea.classList.remove('col-sm-6');
        dateEndArea.classList.remove('col-md-6');
        dateEndArea.classList.remove('col-lg-6');
        dateEndArea.classList.remove('col-xl-6');
        document.getElementsByClassName("date-end-title")[0].innerHTML = "集計日";
    } else {
        dateStartArea.style.display = "block";
        dateEndArea.classList.add('col-sm-6');
        dateEndArea.classList.add('col-md-6');
        dateEndArea.classList.add('col-lg-6');
        dateEndArea.classList.add('col-xl-6');
        document.getElementsByClassName("date-end-title")[0].innerHTML = "終了日";
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

            document.getElementsByClassName("date-end-title")[0].innerHTML = "集計日";
        } else {
            dateStartArea.style.display = "block";
            dateEndArea.classList.add('col-sm-6');
            dateEndArea.classList.add('col-md-6');
            dateEndArea.classList.add('col-lg-6');
            dateEndArea.classList.add('col-xl-6');

            document.getElementsByClassName("date-end-title")[0].innerHTML = "終了日";
        }
    }
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
    viewItemtList[0].innerHTML = Other.formatDecial(shuukeiData.mKensu);
    viewItemtList[1].innerHTML = Other.formatDecial(shuukeiData.mToyuCnt);
    viewItemtList[2].innerHTML = Other.formatDecial(shuukeiData.mNyucnt);
    viewItemtList[3].innerHTML = Other.formatDecial(shuukeiData.mUricnt);
    viewItemtList[4].innerHTML = Other.formatLocalJS(shuukeiData.mGsiyou, 1, 1);
    viewItemtList[5].innerHTML = Other.formatDecial(shuukeiData.mGryokin);
    viewItemtList[6].innerHTML = Other.formatDecial(shuukeiData.mShohi);
    viewItemtList[7].innerHTML = Other.formatDecial(shuukeiData.mKang);
    viewItemtList[8].innerHTML = Other.formatDecial(shuukeiData.mTotal);

    viewItemtList[9].innerHTML = Other.formatLocalJS(shuukeiData.mToyuUse, 1, 1);
    viewItemtList[10].innerHTML = Other.formatDecial(shuukeiData.mToyuKin);
    viewItemtList[11].innerHTML = Other.formatDecial(shuukeiData.mToyuTax);
    viewItemtList[12].innerHTML = Other.formatDecial(shuukeiData.mToyuTotal);

    viewItemtList[13].innerHTML = Other.formatDecial(shuukeiData.mNyukin);
    viewItemtList[14].innerHTML = Other.formatDecial(shuukeiData.mChosei);
    viewItemtList[15].innerHTML = Other.formatLocalJS(shuukeiData.mUrisur, 2, 2);
    viewItemtList[16].innerHTML = Other.formatDecial(shuukeiData.mUrikin);
    viewItemtList[17].innerHTML = Other.formatDecial(shuukeiData.mUritax);
    viewItemtList[18].innerHTML = Other.formatDecial(shuukeiData.mUrikin + shuukeiData.mUritax);
}


/** 
    * SET DATA SHUUKEI PRINT FORM
*/
function setDataPrintForm() {
    var shukeiTime = document.getElementById("shukeiTime");
    if (selectDate.value == "0") {
        shukeiTime.textContent = "全 集 計 日 " + "(" + document.getElementById("date-start").value + " - " + document.getElementById("date-end").value + ")"
    } else {
        shukeiTime.textContent = "全 集 計 日 " + "(" + document.getElementById("date-end").value + ")"
    }
    viewItemtList = setViewItemtList("edt");
    let tempList = viewItemtList;
    viewItemtList = setViewItemtList("prt");
    for (var i = 0; i < viewItemtList.length; i++) {
        viewItemtList[i].innerHTML = tempList[i].textContent + unitList[i];
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
    document.getElementById('shuukinNippouForm').style.display = "none";
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
    if (true) { //Common.checkDevice() < 2
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
    window.location.href = "printermarutou://print&&1" + "&&" + window.location.href.replace("https://", "");
}


/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("menuOption").onclick = function () { Common.movePage('/menu.html') };
    document.getElementById("settingOption").onclick = function () { Common.movePage('/setting.html') };
    document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/**
    * ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("backPageButton").onclick = function () {

        Common.movePage('/menu.html');
    };
    document.getElementById("insatsuButton").onclick = createImageShuukeiForm;
    document.getElementById("getShuukeiDataButton").onclick = getShuukeiData;
    document.getElementById("backPrintButton").onclick = backToEditView;
    document.getElementById("sendToAppButton").onclick = sendImage;

    document.getElementById("nippouButton").onclick = showNippouDialog;
    document.getElementById("closeNippouButton").onclick = closeNippouDialog;
    document.getElementById("kenshinNippouButton").onclick = createImageKenshinNippouForm;
    document.getElementById("shuukinNippouButton").onclick = createImageShuukinNippouForm;
    document.getElementById("UriageNippouButton").onclick = createImageUriageNippouForm;
}


/**
   * SETUP PRINT FORM
   *
   * @param sizeSingleLine     [STRING]
   * @param lineHeightSingleLine     [STRING]
*/
function setupTextSizeDetail(nameItem, textSize, lineHeight, fontWeight) {
    const element = document.getElementsByClassName(nameItem);
    for (let i = 0; i < element.length; i++) {
        element[i].style.setProperty("font-size", textSize, "important")
        element[i].style.lineHeight = lineHeight;
        element[i].style.fontWeight = fontWeight;
    }
}


/** 
    * CREATE IMAGE FILE OF SHUUKEI FORM
*/
function createImageShuukeiForm() {
    Common.setupModal("load", null, Mess.I00001, null, null, null, false);
    Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('shuukeiForm').style.display = "block";
    setDataPrintForm();
    setupPrintForm("100vh", "670px", "55px", "31px", "38px", "31px", "38px", true, "20px");
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
    if (m_mapKensinData.size == 0) {
        Common.setupModal("info", null,  "検針" + Mess.I00013, null, StringCS.OK, null, false);
        return;
    }
    setTitlePrintForm(0);

    Common.setupModal("load", null, Mess.I00001, null, null, null, false);
    Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('nippouArea').style.display = "block";
    document.getElementById('kensinNippouForm').style.display = "block";
    document.getElementById('shuukinNippouForm').style.display = "none";
    createPrintDataKenshinNippou(m_mapKensinData, sysfDat.m_isToyukensinFlg);
    /* default title size of printting form */
    var smTextTS = document.getElementsByClassName("sm-text")[0].fontSize;
    /* default line height text of printting form */
    var smTextLH = document.getElementsByClassName("sm-text")[0].lineHeight;
    setupPrintForm("100vh", "670px", "55px", "31px", "37px", "31px", "37px", true, "20px");
    setupTextSizeDetail("sm-text", "23px", "30px", "normal");
    domtoimage.toBlob(document.getElementById('printContentDetail'))
        .then(function (blob) {
            getBase64(blob).then(
                data => {
                    console.log(data)
                    imgString = data;
                    window.scrollTo(0, 0);

                    const interval = setInterval(function () {
                        setupPrintForm("100%", "600px", "37px", defaultPrintSize, "25px", defaultPrintSize, "25px", false, defaultPaddingPrintForm);
                        setupTextSizeDetail("sm-text", smTextTS, smTextLH, "normal");
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
function createImageShuukinNippouForm() {
    closeNippouDialog();
    if (m_mapKensinData.size == 0) {
        Common.setupModal("info", null,  "集金" + Mess.I00013, null, StringCS.OK, null, false);
        return;
    }
    setTitlePrintForm(1);

    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('nippouArea').style.display = "block";
    Common.setupModal("load", null, Mess.I00001, null, null, null, false);
    Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
    document.getElementById('shuukinNippouForm').style.display = "block";
    document.getElementById('kensinNippouForm').style.display = "none";
    createPrintDataShuukinNippou(m_mapKensinData);
    /* default title size of printting form */
    var smTextTS = window.getComputedStyle(document.getElementsByClassName("sm-text")[0]).fontSize;
    /* default line height text of printting form */
    var smTextLH = window.getComputedStyle(document.getElementsByClassName("sm-text")[0]).lineHeight;
    setupPrintForm("100vh", "670px", "55px", "31px", "38px", "31px", "38px", true, "20px");
    setupTextSizeDetail("sm-text", "23px", "30px", "normal");
    domtoimage.toBlob(document.getElementById('printContentDetail'))
        .then(function (blob) {
            getBase64(blob).then(
                data => {
                    console.log(data)
                    imgString = data;
                    window.scrollTo(0, 0);

                    const interval = setInterval(function () {
                        setupPrintForm("100%", "600px", "37px", defaultPrintSize, "25px", defaultPrintSize, "25px", false, defaultPaddingPrintForm);
                        setupTextSizeDetail("sm-text", smTextTS, smTextLH, "normal");
                        Common.setBackgroundDialogScreen("block", "rgba(0,0,0,0.4)");
                        clearInterval(interval);
                        modal.style.display = "none";
                    }, 100);
                }
            );
        })
}


/** 
    * CREATE IMAGE FILE OF URIAGE NIPPOU FORM
*/
function createImageUriageNippouForm() {
    closeNippouDialog();
    if (m_mapUriageData.size == 0) {
        Common.setupModal("info", null, "売上" + Mess.I00013, null, StringCS.OK, null, false);
        return;
    }
    setTitlePrintForm(2);

    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('nippouArea').style.display = "block";
    Common.setupModal("load", null, Mess.I00001, null, null, null, false);
    Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
    document.getElementById('uriageNippouForm').style.display = "block";
    document.getElementById('kensinNippouForm').style.display = "none";
    document.getElementById('shuukinNippouForm').style.display = "none";
    createPrintDataUriageNippou(m_mapUriageData);
    /* default title size of printting form */
    var smTextTS = document.getElementsByClassName("sm-text")[0].fontSize;
    /* default line height text of printting form */
    var smTextLH = document.getElementsByClassName("sm-text")[0].lineHeight;
    setupPrintForm("100vh", "670px", "55px", "31px", "38px", "31px", "38px", true, "20px");
    setupTextSizeDetail("sm-text", "23px", "30px", "normal");
    domtoimage.toBlob(document.getElementById('printContentDetail'))
        .then(function (blob) {
            getBase64(blob).then(
                data => {
                    console.log(data)
                    imgString = data;
                    window.scrollTo(0, 0);

                    const interval = setInterval(function () {
                        setupPrintForm("100%", "600px", "37px", defaultPrintSize, "25px", defaultPrintSize, "25px", false, defaultPaddingPrintForm);
                        setupTextSizeDetail("sm-text", smTextTS, smTextLH, "normal");
                        Common.setBackgroundDialogScreen("block", "rgba(0,0,0,0.4)");
                        clearInterval(interval);
                        modal.style.display = "none";
                    }, 100);
                }
            );
        })
}

/**
  * 集計データ一覧の設定.
  * cách phân biệt data shukei gửi về:
  * vì data gửi về gồm kensin , kensin no nyukin , kensin no chokin , uriage, nyu và cho của uriage nên có những cách thức phân biệt :
  * kensin: có buskind = 0, sisin > 0 vì số ghi đồng hồ nên sẽ có số dương, kenku > 0
  * nyukin và chokin của kensin: thường sẽ có lnk_dencnt là dencnt của kensin data.
  * bất kỳ chokin cũng sẽ có buskind = 3
  * bất kỳ nyukin cũng sẽ có buskind = 1
  *
  * @throws MException   エラーがあった場合に発生.
  */
function setShukeiDateList() {
    var shukeiItem = null;
    // var nSearchNo;
    // var nIdx;
    var item;
    // var idxfDat;
    mItemList = new Map();
    m_mapKensinData = new Map();
    m_mapUriageData = new Map();

    if (m_lstShukeiDat.length > 0) {
        for (var i = 0; i < m_lstShukeiDat.length; i++) {
            // 顧客データ取得
            item = m_lstShukeiDat[i];

            if (item.h_sisin > 0 || item.h_lnk_dencnt != 0) {
                item.receipt = 0;
                item.adjust = 0;

                if (checkCusrec(item.h_cusrec)) {
                    continue;
                } else {
                    lstCusrec.push(item.h_cusrec);
                }

                if (i < m_lstShukeiDat.length - 1) {
                    for (let j = 0; j < m_lstShukeiDat.length; j++) {
                        if (m_lstShukeiDat[j].h_lnk_dencnt == item.h_dencnt) {
                            if (m_lstShukeiDat[j].h_kin > 0) {
                                item.adjust = m_lstShukeiDat[j].h_kin;
                            } else {
                                item.receipt = m_lstShukeiDat[j].h_kin * (-1);
                            }
                        }
                    }
                }

                var shukeiItem1 = new Dat.ShukeiItem();
                shukeiItem1.mGsiyou = item.h_siyouryo;
                shukeiItem1.mGryokin = item.h_kin;
                // kokfDat.mReduce + kokfDat.mReduceTax chua tim ra field; can ghi data cua kangen de lay 2 gia tri nay
                // gia tri duoc luu tai dieu kien  kokfDat.getKng_uri() != 0 function ReceiveJobBase
                shukeiItem1.mKang = 0 + 0
                shukeiItem1.mShohi = item.u_tax / 1000;
                shukeiItem1.mTotal = shukeiItem1.mKang + shukeiItem1.mGryokin + shukeiItem1.mShohi;
                shukeiItem1.mNyukin = item.receipt;
                shukeiItem1.mChosei = item.adjust;
                // addShukeiData(shukeiItem1, sysfDat, sy2fDat, kouserDat);

                var kotfDat = null;
                if (sysfDat.m_isToyukeninFlg) {
                    kotfDat = item.mKotfDat;
                }
                // date kensin
                var kensinDate = new Date(m_lstShukeiDat[i].h_denymd);
                var strKey = (kensinDate.getMonth() + 1) + "/" + kensinDate.getDate();
                var lstKensinData;
                if (m_mapKensinData.has(strKey)) {
                    lstKensinData = m_mapKensinData.get(strKey);
                    if (lstKensinData == null) {
                        lstKensinData = [];
                    }
                }
                else {
                    lstKensinData = [];
                }
                let kensinData = new Dat.ShukeiKensinData();


                kensinData.m_strKcode = item.mCusCode;
                kensinData.m_strName = item.mName;
                kensinData.m_isKensin = true;
                kensinData.m_nSs = item.h_sisin;
                kensinData.m_nSr = item.h_siyouryo;
                kensinData.m_nKin = item.h_kin;
                kensinData.m_nTax = item.h_stax / 1000;
                // kokfDat.mReduce + kokfDat.mReduceTax chua tim ra field; can ghi data cua kangen de lay 2 gia tri nay
                // gia tri duoc luu tai dieu kien  kokfDat.getKng_uri() != 0 function ReceiveJobBase
                kensinData.m_nKng = 0 + 0;    //kokfDat.mReduce + kokfDat.mReduceTax
                kensinData.m_lNyu = item.receipt;
                kensinData.m_lCho = item.adjust;
                if (kotfDat != null && kotfDat.m_bKen_sumi == 1) {
                    kensinData.m_isToyu = true;
                    kensinData.m_nToyuSs = kotfDat.m_nNow_meter;
                    kensinData.m_nToyuSr = kotfDat.m_nLoil_use;
                    kensinData.m_lToyuKin = kotfDat.m_nFee;
                    kensinData.m_lToyuTax = kotfDat.m_nCon_tax;
                }
                if (mItemList.has(strKey))
                    shukeiItem = mItemList.get(strKey);
                else {
                    shukeiItem = new Dat.ShukeiItem();
                    mItemList.set(strKey, shukeiItem);
                }
                addShukeiData(shukeiItem1, sysfDat, sy2fDat, kouserDat);
                lstKensinData.push(kensinData);
                m_mapKensinData.set(strKey, lstKensinData);

            } else {
                if (item.h_kin > 0 && item.u_buskind == 0) {
                    addUriageShukeiData(item);
                } else if (item.u_buskind == 1 || item.u_buskind == 3) {
                    shuukeiData.mUricnt++;
                }

                var den_uriage = new Date(item.h_denymd);
                var strKey = (den_uriage.getMonth() + 1) + "/" + den_uriage.getDate();
                addShukeiUriageData(strKey, item);
            }
        }
    }
    setShuukeiData();

}


/** 
    * GET SHUUKEI DATA
*/
function getShuukeiData() {
    var urlString;
    m_lstShukeiDat = [];
    viewItemtList = setViewItemtList("edt");
    if (selectDate.value == "1") {
        let date = document.getElementById("date-end").value;
        urlString = StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + date.replaceAll("-", "/") + "&date2=" + date.replaceAll("-", "/") + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
        // urlString = StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + date.replaceAll("-", "/") + "&date2=" + date.replaceAll("-", "/")+ "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
    } else {
        let dateStart = document.getElementById("date-start").value;
        let dateEnd = document.getElementById("date-end").value;
        urlString = StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + dateStart.replaceAll("-", "/") + "&date2=" + dateEnd.replaceAll("-", "/") + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
        // urlString = StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + dateStart.replaceAll("-", "/") + "&date2=" + dateEnd.replaceAll("-", "/") + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
    }
    var modeTimeShukei = selectDate.value;
    sessionStorage.setItem(StringCS.MODETIMESHUKEI, modeTimeShukei);
    sessionStorage.setItem(StringCS.SHUKEISTARTDAY, document.getElementById("date-start").value);
    sessionStorage.setItem(StringCS.SHUKEIENDDAY, document.getElementById("date-end").value);
    shuukeiData = new Dat.ShukeiItem();
    Common.setupModal("load", null, Mess.I00001, null, null, null, false);
    $.ajax({
        url: urlString,
        headers: {
            'Content-Type': StringCS.PR_CONTENT_TYPE
        },
        success: function (result) {
            modal.style.display = "none";
            var shukeiData = JSON.parse(result);
            m_lstShukeiDat = shukeiData.m_lstShukeiDat;
            selectionSort();

            // if (shukeiData != null) {
            //     if (shukeiData.m_lstShukeiDat != null) {
            //         for (var i = 0; i < shukeiData.m_lstShukeiDat.length; i++) {
            //             var shukeiItem = new Dat.ShukeiItem();
            //             shukeiItem.mGsiyou = shukeiData.m_lstShukeiDat[i].h_siyouryo;
            //             shukeiItem.mGryokin = shukeiData.m_lstShukeiDat[i].h_kin;
            //             shukeiItem.mKang = shukeiData.m_lstShukeiDat[i].u_kin + shukeiData.m_lstShukeiDat[i].u_tax;
            //             shukeiItem.mShohi = shukeiData.m_lstShukeiDat[i].h_utax;
            //             shukeiItem.mTotal = shukeiItem.mKang + shukeiItem.mTotal;
            //             addShukeiData(shukeiItem, sysfDat, sy2fDat, kouserDat);
            //         }
            //     }
            // }


            setShukeiDateList();

        },
        error: function (jqXHR, exception) {
            console.log(exception);
            Common.setupModal("error", null, Mess.E00003, null, StringCS.OK, null, false);
            setShukeiDateList();
        },
        timeout: ValueCS.VL_LONG_TIMEOUT
    });
}

/**
 * 集計データの計上.
 */
function addAllShukeiData() {

    var keylist = mItemList.values();
    for (let i = 0; i < mItemList.size; i++) {
        shuukeiData = keylist.next().value;
    }

    if (mItemList.size != 0) {
        for (var i = 0; i < mItemList.size; i++) {
            if (keylist.next().value != null) {

                mSelectCal[nCnt++] = strKey;

                var shukeiItem = keylist.next().value;
                if (shukeiItem == null) {
                    continue;
                }
                shukeiItemAll.mKensu += shukeiItem.mKensu;
                shukeiItemAll.mGsiyou += shukeiItem.mGsiyou;
                shukeiItemAll.mGryokin += shukeiItem.mGryokin;
                shukeiItemAll.mKang += shukeiItem.mKang;
                shukeiItemAll.mShohi += shukeiItem.mShohi;
                shukeiItemAll.mTotal += shukeiItem.mTotal;
                shukeiItemAll.mNyukin += shukeiItem.mNyukin;
                shukeiItemAll.mChosei += shukeiItem.mChosei;
                shukeiItemAll.mNyucnt += shukeiItem.mNyucnt;
                shukeiItemAll.mUricnt += shukeiItem.mUricnt;
                shukeiItemAll.mUrisur += shukeiItem.mUrisur;
                shukeiItemAll.mUrikin += shukeiItem.mUrikin;
                shukeiItemAll.mUritax += shukeiItem.mUritax;
                shukeiItemAll.mToyuCnt += shukeiItem.mToyuCnt;
                shukeiItemAll.mToyuUse += shukeiItem.mToyuUse;
                shukeiItemAll.mToyuKin += shukeiItem.mToyuKin;
                shukeiItemAll.mToyuTax += shukeiItem.mToyuTax;
                shukeiItemAll.mToyuTotal += shukeiItem.mToyuTotal;
            }
        }
    }
}


/**
   * KENSIN NIPPOU PRINT INITIALIZATION
   *
   * @param mapKensinData     [MAP]
   * @param isPrintToyu     [INT]
 */
function createPrintDataKenshinNippou(mapKensinData, isPrintToyu) {
    var oldItemList = document.getElementsByClassName("list-item");
    for (var i = 0; i < oldItemList.length; i++) {
        oldItemList[i].remove();
    }
    var oldTotalDiv = document.getElementsByClassName("kensin-total");
    for (var i = 0; i < oldTotalDiv.length; i++) {
        oldTotalDiv[i].remove();
    }

    var time = moment().format('YYYY年 MM月 DD日 HH:mm:ss');
    document.getElementById("insatsuBiNP").innerHTML = time;

    var tantname = "";
    tantname = Other.cutStringSpace(dataSetting.m_lstTantName[0].name);
    // 担当
    document.getElementById("tantNameNP").innerHTML = tantname;

    const keys = mapKensinData.keys();
    var nCnt = 0;
    var nToyuCnt = 0;
    var footerKensinData = new Dat.ShukeiKensinData();
    var listKensin = document.getElementById("listKensin");
    for (var idx = 0; idx < mapKensinData.size; idx++) {
        var keyVal = keys.next().value;
        console.log(keyVal);

        //Khởi tạo ngày
        var listItemList = document.createElement("div");
        listItemList.className = "list-item";
        listItemList.id = "listItemKS" + idx;
        listKensin.appendChild(listItemList);
        var dateAreaKS = document.createElement("div");
        dateAreaKS.className = "text-print ta-l wsp-text sg-line";
        dateAreaKS.id = "dateAreaKS" + idx;
        dateAreaKS.innerHTML = "検針日";

        var dateVal = document.createElement("span");
        dateVal.className = "text-print item mr-5";
        dateVal.innerHTML = keyVal;

        dateAreaKS.appendChild(dateVal);
        listItemList.appendChild(dateAreaKS);


        //list
        for (var i = 0; i < mapKensinData.get(keyVal).length; i++) {
            var kensinData = mapKensinData.get(keyVal)[i];

            //show name
            var listItemDetail = document.createElement("div");
            listItemDetail.className = "list-item-detail";
            listItemDetail.id = "listItemDetail_KS" + i;
            dateAreaKS.appendChild(listItemDetail);
            var shortLine = createShortLine(i);
            listItemDetail.appendChild(shortLine);

            var dayDetail = document.createElement("div");
            dayDetail.className = "day-detail pd-0";
            dayDetail.id = "dayDetail" + i;
            shortLine.after(dayDetail);

            var rowName = document.createElement("div");
            rowName.className = "row";
            dayDetail.appendChild(rowName);

            var kcode = document.createElement("div");
            kcode.className = "col-5 text-print ta-l wsp-text item codeVal-KS";
            kcode.innerHTML = kensinData.m_strKcode.trim();

            var name = document.createElement("div");
            name.className = "col-7 text-print ta-l wsp-text item NameVal-KS";
            name.innerHTML = kensinData.m_strName.trim();

            rowName.appendChild(kcode);
            kcode.after(name);

            var row1 = document.createElement("div");
            row1.className = "row";
            if (kensinData.m_isKensin) {
                nCnt++;

                var shishinText = document.createElement("div");
                shishinText.className = "col-3 sm-text ta-l wsp-text item pd-0";
                shishinText.innerHTML = "指針";

                var shishinVal = document.createElement("div");
                shishinVal.className = "col-3 sm-text ta-r wsp-text item pd-0";
                shishinVal.innerHTML = Other.formatLocalJS(kensinData.m_nSs, 1, 1) + "m3";

                var shiyouRyouText = document.createElement("div");
                shiyouRyouText.className = "col-3 sm-text ta-l wsp-text item pd-0 pd-l-5";
                shiyouRyouText.innerHTML = "使用量";

                var shiyouRyouVal = document.createElement("div");
                shiyouRyouVal.className = "col-3 sm-text ta-r wsp-text item pd-0";
                shiyouRyouVal.innerHTML = Other.formatLocalJS(kensinData.m_nSr, 1, 1) + "m3";

                var gasuRyoukinText = document.createElement("div");
                gasuRyoukinText.className = "col-3 sm-text ta-l wsp-text item pd-0";
                gasuRyoukinText.innerHTML = "ガス料金";

                var gasuRyoukinVal = document.createElement("div");
                gasuRyoukinVal.className = "col-3 sm-text ta-r wsp-text item pd-0";
                gasuRyoukinVal.innerHTML = Other.formatDecial(kensinData.m_nKin) + "円";

                var shouhizeiGakuText = document.createElement("div");
                shouhizeiGakuText.className = "col-3 sm-text ta-l wsp-text item pd-0 pd-l-5";
                shouhizeiGakuText.innerHTML = "消費税額";

                var shouhizeiGakuVal = document.createElement("div");
                shouhizeiGakuVal.className = "col-3 sm-text ta-r wsp-text item pd-0";
                shouhizeiGakuVal.innerHTML = Other.formatDecial(kensinData.m_nTax) + "円";

                row1.appendChild(shishinText);
                shishinText.after(shishinVal);
                shishinVal.after(shiyouRyouText);
                shiyouRyouText.after(shiyouRyouVal);
                shiyouRyouVal.after(gasuRyoukinText);
                gasuRyoukinText.after(gasuRyoukinVal);
                gasuRyoukinVal.after(shouhizeiGakuText);
                shouhizeiGakuText.after(shouhizeiGakuVal);
                rowName.after(row1);
            }

            var row2 = document.createElement("div");
            row2.className = "row";
            if (kensinData.m_nKng != 0) {
                var kangenGakuText = document.createElement("div");
                kangenGakuText.className = "col-3 sm-text ta-l wsp-text item pd-0";
                kangenGakuText.innerHTML = "還元額";

                var kangenGakuVal = document.createElement("div");
                kangenGakuVal.className = "col-3 sm-text ta-r wsp-text item pd-0";
                kangenGakuVal.innerHTML = Other.formatDecial(kensinData.m_nKng) + "円";
                row2.appendChild(kangenGakuText);
                kangenGakuText.after(kangenGakuVal);
                row1.after(row2);
            }

            var row3 = document.createElement("div");
            row3.className = "row";
            if (isPrintToyu && kensinData.m_isToyu) {
                nToyuCnt++;
                var toyu = document.createElement("div");
                toyu.className = "col-12 sm-text ta-l wsp-text item";
                toyu.innerHTML = "灯油";
                row3.appendChild(toyu);

                var shishinText = document.createElement("div");
                shishinText.className = "col-3 sm-text ta-l wsp-text item pd-0";
                shishinText.innerHTML = "指針";

                var shishinVal = document.createElement("div");
                shishinVal.className = "col-3 sm-text ta-r wsp-text item pd-0";
                shishinVal.innerHTML = Other.formatDecial(kensinData.m_nToyuSs) + "m3";

                var shiyouRyouText = document.createElement("div");
                shiyouRyouText.className = "col-3 sm-text ta-l wsp-text item pd-0";
                shiyouRyouText.innerHTML = "使用量";

                var shiyouRyouVal = document.createElement("div");
                shiyouRyouVal.className = "col-3 sm-text ta-r wsp-text item pd-0";
                shiyouRyouVal.innerHTML = Other.formatDecial(kensinData.m_nToyuSr) + "m3";

                var gasuRyoukinText = document.createElement("div");
                gasuRyoukinText.className = "col-3 sm-text ta-l wsp-text item pd-0";
                gasuRyoukinText.innerHTML = "ガス料金";

                var gasuRyoukinVal = document.createElement("div");
                gasuRyoukinVal.className = "col-3 sm-text ta-r wsp-text item pd-0";
                gasuRyoukinVal.innerHTML = Other.formatDecial(kensinData.m_lToyuKin) + "円";

                var shouhizeiGakuText = document.createElement("div");
                shouhizeiGakuText.className = "col-3 sm-text ta-l wsp-text item pd-0";
                shouhizeiGakuText.innerHTML = "消費税額";

                var shouhizeiGakuVal = document.createElement("div");
                shouhizeiGakuVal.className = "col-3 sm-text ta-r wsp-text item pd-0";
                shouhizeiGakuVal.innerHTML = Other.formatDecial(kensinData.m_lToyuTax) + "円";

                toyu.after(shishinText);
                shishinText.after(shishinVal);
                shishinVal.after(shiyouRyouText);
                shiyouRyouText.after(shiyouRyouVal);
                shiyouRyouVal.after(gasuRyoukinText);
                gasuRyoukinText.after(gasuRyoukinVal);
                gasuRyoukinVal.after(shouhizeiGakuText);
                shouhizeiGakuText.after(shouhizeiGakuVal);
                row2.after(row3);
            }

            // footerKensinData.push(kensinData);
            footerKensinData.add(kensinData);
        }


        var longline = createStrongLine(i);
        listItemList.appendChild(longline);
    }

    var totalDiv = document.createElement("div");
    totalDiv.className = "kensin-total";
    listKensin.after(totalDiv);

    var rowTotal = document.createElement("div");
    rowTotal.className = "row";
    totalDiv.appendChild(rowTotal);

    var kenshinKensuuText = document.createElement("div");
    kenshinKensuuText.className = "col-6 text-print ta-l wsp-text item";
    kenshinKensuuText.innerHTML = "検針件数";

    var kenshinKensuuVal = document.createElement("div");
    kenshinKensuuVal.className = "col-6 text-print ta-r wsp-text item";
    kenshinKensuuVal.innerHTML = Other.formatDecial(nCnt) + "件";

    var gasuShiyouRyouText = document.createElement("div");
    gasuShiyouRyouText.className = "col-6 text-print ta-l wsp-text item";
    gasuShiyouRyouText.innerHTML = "ガス使用量";

    var gasuShiyouRyouVal = document.createElement("div");
    gasuShiyouRyouVal.className = "col-6 text-print ta-r wsp-text item";
    gasuShiyouRyouVal.innerHTML = Other.formatLocalJS(footerKensinData.m_nSr, 1, 1) + "m3";

    var gasuRyoukinText = document.createElement("div");
    gasuRyoukinText.className = "col-6 text-print ta-l wsp-text item";
    gasuRyoukinText.innerHTML = "ガス料金";

    var gasuRyoukinVal = document.createElement("div");
    gasuRyoukinVal.className = "col-6 text-print ta-r wsp-text item";
    gasuRyoukinVal.innerHTML = Other.formatDecial(footerKensinData.m_nKin) + "円";

    var shouhizeiGakuText = document.createElement("div");
    shouhizeiGakuText.className = "col-6 text-print ta-l wsp-text item";
    shouhizeiGakuText.innerHTML = "消費税額";

    var shouhizeiGakuVal = document.createElement("div");
    shouhizeiGakuVal.className = "col-6 text-print ta-r wsp-text item";
    shouhizeiGakuVal.innerHTML = Other.formatDecial(footerKensinData.m_nTax) + "円";

    var kangenGakuText = document.createElement("div");
    kangenGakuText.className = "col-6 text-print ta-l wsp-text item";
    kangenGakuText.innerHTML = "還元額";

    var kangenGakuVal = document.createElement("div");
    kangenGakuVal.className = "col-6 text-print ta-r wsp-text item";
    kangenGakuVal.innerHTML = Other.formatDecial(footerKensinData.m_nKng) + "円";

    rowTotal.appendChild(kenshinKensuuText);
    kenshinKensuuText.after(kenshinKensuuVal);
    kenshinKensuuVal.after(gasuShiyouRyouText);
    gasuShiyouRyouText.after(gasuShiyouRyouVal);
    gasuShiyouRyouVal.after(gasuRyoukinText);
    gasuRyoukinText.after(gasuRyoukinVal);
    gasuRyoukinVal.after(shouhizeiGakuText);
    shouhizeiGakuText.after(shouhizeiGakuVal);
    shouhizeiGakuVal.after(kangenGakuText);
    kangenGakuText.after(kangenGakuVal);

    if (isPrintToyu && nToyuCnt != 0) {
        var touyuKensuuText = document.createElement("div");
        touyuKensuuText.className = "col-6 text-print ta-l wsp-text item";
        touyuKensuuText.innerHTML = "灯油件数";

        var touyuKensuuVal = document.createElement("div");
        touyuKensuuVal.className = "col-6 text-print ta-r wsp-text item";
        touyuKensuuVal.innerHTML = Other.formatDecial(nToyuCnt) + "件";

        var touyuShiyouRyouText = document.createElement("div");
        touyuShiyouRyouText.className = "col-6 text-print ta-l wsp-text item";
        touyuShiyouRyouText.innerHTML = "灯油使用量";

        var touyuShiyouRyouVal = document.createElement("div");
        touyuShiyouRyouVal.className = "col-6 text-print ta-r wsp-text item";
        touyuShiyouRyouVal.innerHTML = Other.formatLocalJS(footerKensinData.m_nToyuSr, 1, 1) + "m3";

        var touyuRyoukinText = document.createElement("div");
        touyuRyoukinText.className = "col-6 text-print ta-l wsp-text item";
        touyuRyoukinText.innerHTML = "灯油料金";

        var touyuRyoukinVal = document.createElement("div");
        touyuRyoukinVal.className = "col-6 text-print ta-r wsp-text item";
        touyuRyoukinVal.innerHTML = Other.formatDecial(footerKensinData.m_lToyuKin) + "円";

        var shouhizeiGakuText = document.createElement("div");
        shouhizeiGakuText.className = "col-6 text-print ta-l wsp-text item";
        shouhizeiGakuText.innerHTML = "消費税額";

        var shouhizeiGakuVal = document.createElement("div");
        shouhizeiGakuVal.className = "col-6 text-print ta-r wsp-text item";
        shouhizeiGakuVal.innerHTML = Other.formatDecial(footerKensinData.m_lToyuTax) + "円";

        kangenGakuVal.after(touyuKensuuText);
        touyuKensuuText.after(touyuKensuuVal);
        touyuKensuuVal.after(touyuShiyouRyouText);
        touyuShiyouRyouText.after(touyuShiyouRyouVal);
        touyuShiyouRyouVal.after(touyuRyoukinText);
        touyuRyoukinText.after(touyuRyoukinVal);
        touyuRyoukinVal.after(shouhizeiGakuText);
        shouhizeiGakuText.after(shouhizeiGakuVal);
    }
}


/**
   * SHUUKIN NIPPOU PRINT INITIALIZATION
   *
   * @param mapKensinData     [MAP]
 */
function createPrintDataShuukinNippou(mapKensinData) {
    var oldItemList = document.getElementsByClassName("list-item");
    for (var i = 0; i < oldItemList.length; i++) {
        oldItemList[i].remove();
    }
    var oldTotalDiv = document.getElementsByClassName("shuukin-total");
    for (var i = 0; i < oldTotalDiv.length; i++) {
        oldTotalDiv[i].remove();
    }


    var time = moment().format('YYYY年 MM月 DD日 HH:mm:ss');
    document.getElementById("insatsuBiNP").innerHTML = time;

    var tantname = "";
    for (var i = 0; i < dataSetting.m_lstTantName.length; i++) {
        if (dataSetting.m_lstTantName[i].code == dataSetting.tancd) {
            tantname = dataSetting.m_lstTantName[i].name;
            break;
        }
    }
    // 担当
    document.getElementById("tantNameNP").innerHTML = tantname;

    const keys = mapKensinData.keys();
    var nCnt = 0;
    var footerKensinData = new Dat.ShukeiKensinData();
    var listShuukin = document.getElementById("listShuukin");
    for (var idx = 0; idx < mapKensinData.size; idx++) {
        var keyVal = keys.next().value;
        console.log(keyVal);

        //Khởi tạo ngày
        var listItemList = document.createElement("div");
        listItemList.className = "list-item";
        listItemList.id = "listItemKS" + idx;
        listShuukin.appendChild(listItemList);
        var dateAreaKS = document.createElement("div");
        dateAreaKS.className = "text-print ta-l wsp-text sg-line";
        dateAreaKS.id = "dateAreaKS" + idx;
        dateAreaKS.innerHTML = "集金日";

        var dateVal = document.createElement("span");
        dateVal.className = "text-print item mr-5";
        dateVal.innerHTML = keyVal;

        dateAreaKS.appendChild(dateVal);
        listItemList.appendChild(dateAreaKS);


        //list
        for (var i = 0; i < mapKensinData.get(keyVal).length; i++) {
            var kensinData = mapKensinData.get(keyVal)[i];
            if (kensinData.m_lNyu == 0 && kensinData.m_lCho == 0) {
                continue;
            }

            //show phần name
            var listItemDetail = document.createElement("div");
            listItemDetail.className = "list-item-detail";
            listItemDetail.id = "listItemDetail_KS" + i;
            dateAreaKS.appendChild(listItemDetail);
            var shortLine = createShortLine(i);
            listItemDetail.appendChild(shortLine);

            var dayDetail = document.createElement("div");
            dayDetail.className = "day-detail pd-0";
            dayDetail.id = "dayDetail" + i;
            shortLine.after(dayDetail);

            var rowName = document.createElement("div");
            rowName.className = "row";
            dayDetail.appendChild(rowName);

            var kcode = document.createElement("div");
            kcode.className = "col-5 text-print ta-l wsp-text item codeVal-KS";
            kcode.innerHTML = kensinData.m_strKcode.trim();

            var name = document.createElement("div");
            name.className = "col-7 text-print ta-l wsp-text item NameVal-KS";
            name.innerHTML = kensinData.m_strName.trim();

            rowName.appendChild(kcode);
            kcode.after(name);

            var row1 = document.createElement("div");
            row1.className = "row";
            if (kensinData.m_isKensin) {
                nCnt++;

                var shishinText = document.createElement("div");
                shishinText.className = "col-3 sm-text ta-l wsp-text item pd-0";
                shishinText.innerHTML = "入金額";

                var shishinVal = document.createElement("div");
                shishinVal.className = "col-3 sm-text ta-r wsp-text item pd-0";
                shishinVal.innerHTML = Other.formatDecial(kensinData.m_lNyu) + "円";

                var shiyouRyouText = document.createElement("div");
                shiyouRyouText.className = "col-3 sm-text ta-l wsp-text item pd-0 pd-l-5";
                shiyouRyouText.innerHTML = "調整額";

                var shiyouRyouVal = document.createElement("div");
                shiyouRyouVal.className = "col-3 sm-text ta-r wsp-text item pd-0";
                shiyouRyouVal.innerHTML = Other.formatDecial(kensinData.m_lCho) + "円";


                row1.appendChild(shishinText);
                shishinText.after(shishinVal);
                shishinVal.after(shiyouRyouText);
                shiyouRyouText.after(shiyouRyouVal);
                rowName.after(row1);
            }

            footerKensinData.add(kensinData);
        }


        var longline = createStrongLine(i);
        listItemList.appendChild(longline);
    }

    var totalDiv = document.createElement("div");
    totalDiv.className = "shuukin-total";
    listShuukin.after(totalDiv);

    var rowTotal = document.createElement("div");
    rowTotal.className = "row";
    totalDiv.appendChild(rowTotal);

    var kenshinKensuuText = document.createElement("div");
    kenshinKensuuText.className = "col-6 text-print ta-l wsp-text item";
    kenshinKensuuText.innerHTML = "集金件数";

    var kenshinKensuuVal = document.createElement("div");
    kenshinKensuuVal.className = "col-6 text-print ta-r wsp-text item";
    kenshinKensuuVal.innerHTML = Other.formatDecial(nCnt) + "件";

    var gasuShiyouRyouText = document.createElement("div");
    gasuShiyouRyouText.className = "col-6 text-print ta-l wsp-text item";
    gasuShiyouRyouText.innerHTML = "入金額";

    var gasuShiyouRyouVal = document.createElement("div");
    gasuShiyouRyouVal.className = "col-6 text-print ta-r wsp-text item";
    gasuShiyouRyouVal.innerHTML = Other.formatDecial(footerKensinData.m_lNyu) + "円";

    var gasuRyoukinText = document.createElement("div");
    gasuRyoukinText.className = "col-6 text-print ta-l wsp-text item";
    gasuRyoukinText.innerHTML = "調整額";

    var gasuRyoukinVal = document.createElement("div");
    gasuRyoukinVal.className = "col-6 text-print ta-r wsp-text item";
    gasuRyoukinVal.innerHTML = Other.formatDecial(footerKensinData.m_lCho) + "円";

    rowTotal.appendChild(kenshinKensuuText);
    kenshinKensuuText.after(kenshinKensuuVal);
    kenshinKensuuVal.after(gasuShiyouRyouText);
    gasuShiyouRyouText.after(gasuShiyouRyouVal);
    gasuShiyouRyouVal.after(gasuRyoukinText);
    gasuRyoukinText.after(gasuRyoukinVal);
}


/**
   * SHUUKIN NIPPOU PRINT INITIALIZATION
   *
   * @param mapUriageData     [MAP]
 */
function createPrintDataUriageNippou(mapUriageData) {
    var oldItemList = document.getElementsByClassName("list-item");
    for (var i = 0; i < oldItemList.length; i++) {
        oldItemList[i].remove();
    }
    var oldTotalDiv = document.getElementsByClassName("uriage-total");
    for (var i = 0; i < oldTotalDiv.length; i++) {
        oldTotalDiv[i].remove();
    }


    var time = moment().format('YYYY年 MM月 DD日 HH:mm:ss');
    document.getElementById("insatsuBiNP").innerHTML = time;

    var tantname = "";
    for (var i = 0; i < dataSetting.m_lstTantName.length; i++) {
        if (dataSetting.m_lstTantName[i].code == dataSetting.tancd) {
            tantname = dataSetting.m_lstTantName[i].name;
            break;
        }
    }
    // 担当
    document.getElementById("tantNameNP").innerHTML = tantname;

    const keys = mapUriageData.keys();
    var listUriage = document.getElementById("listUriage");
    for (var idx = 0; idx < mapUriageData.size; idx++) {
        var keyVal = keys.next().value;
        console.log(keyVal);

        //Khởi tạo ngày
        var listItemList = document.createElement("div");
        listItemList.className = "list-item";
        listItemList.id = "listItemUr" + idx;
        listUriage.appendChild(listItemList);
        var dateAreaUr = document.createElement("div");
        dateAreaUr.className = "text-print ta-l wsp-text sg-line";
        dateAreaUr.id = "dateAreaUr" + idx;
        dateAreaUr.innerHTML = "売上日";

        var dateVal = document.createElement("span");
        dateVal.className = "text-print item mr-5";
        dateVal.innerHTML = keyVal;

        dateAreaUr.appendChild(dateVal);
        listItemList.appendChild(dateAreaUr);


        //list
        mapUriageData.get(keyVal).forEach((values, keys) => {
            console.log(values, keys);

            var uriageDataList = values;
            var nTax = 0;
            var idx = 0;
            var previousID;


            //show phần name
            var listItemDetail = document.createElement("div");
            listItemDetail.className = "list-item-detail";
            listItemDetail.id = "listItemDetail_Ur" + idx;
            dateAreaUr.appendChild(listItemDetail);
            var shortLine = createShortLine(idx);
            listItemDetail.appendChild(shortLine);

            var dayDetail = document.createElement("div");
            dayDetail.className = "day-detail pd-0";
            dayDetail.id = "dayDetail" + idx;
            shortLine.after(dayDetail);
            for (var i = 0; i < uriageDataList.length; i++) {
                var uriageData = uriageDataList[i];

                var rowName = document.createElement("div");
                rowName.className = "row name-area-ur";

                var kcode = document.createElement("div");
                kcode.className = "col-5 text-print ta-l wsp-text item codeVal-Ur";
                kcode.innerHTML = Other.cutStringSpace(Other.nullToString(uriageData.mCusCode).trim());


                var name = document.createElement("div");
                name.className = "col-7 text-print ta-l wsp-text item NameVal-Ur";
                name.innerHTML = Other.cutStringSpace(Other.nullToString(uriageData.mName).trim());

                if (uriageData.u_buskind == 0 && i == 0) {
                    dayDetail.appendChild(rowName);
                    rowName.appendChild(kcode);
                    kcode.after(name);
                }


                // show sanpham
                var rowDetail = document.createElement("div");
                rowDetail.className = "row";
                rowDetail.id = "rowDetail-ur-" + idx + "-" + i;
                previousID = rowDetail.id;
                if (uriageData.u_buskind == 0 && i == 0) {
                    rowName.after(rowDetail)
                } else {
                    dayDetail.appendChild(rowDetail);
                }

                var hmNameText = document.createElement("div");
                hmNameText.className = "col-4 sm-text ta-l wsp-text item pd-0";
                if (uriageData.u_buskind == 0) {
                    hmNameText.innerHTML = Other.cutStringSpace(Other.nullToString(uriageData.u_hmname).trim());
                } else if (uriageData.u_buskind == 3) {
                    hmNameText.innerHTML = "現金";
                } else if (uriageData.u_buskind == 1) {
                    hmNameText.innerHTML = "調整";
                }

                var suryouText = document.createElement("div");
                suryouText.className = "col-3 sm-text ta-r wsp-text item pd-r-0";
                if (uriageData.m_lNyu != 0 && uriageData.u_buskind == 0) {
                    suryouText.innerHTML = Other.formatDecial(uriageData.u_suryo);
                }

                var shiyouRyouText = document.createElement("div");
                shiyouRyouText.className = "col-2 sm-text ta-r wsp-text item pd-r-0";
                if (uriageData.u_tank != 0 && uriageData.u_buskind == 0) {
                    // 単価印字有り
                    if (uriageData.u_tank % 100 == 0) {
                        shiyouRyouText.innerHTML = Other.formatDecial(uriageData.u_tank / 100);
                    } else if (hmefDat.mTanka % 10 == 0) {
                        shiyouRyouText.innerHTML = Other.formatLocalJS(uriageData.u_tank, 1, 2);
                    } else {
                        shiyouRyouText.innerHTML = Other.formatLocalJS(uriageData.u_tank, 2, 2);
                    }
                }

                var kinVal = document.createElement("div");
                kinVal.className = "col-3 sm-text ta-r wsp-text item pd-r-0";
                kinVal.innerHTML = Other.formatDecial(uriageData.u_kin);

                rowDetail.appendChild(hmNameText);
                hmNameText.after(suryouText);
                suryouText.after(shiyouRyouText);
                shiyouRyouText.after(kinVal);

                nTax += uriageData.u_tax;
            }
            idx++;

            var rowTax = document.createElement("div");
            rowTax.className = "row";
            var taxTitle = document.createElement("div");
            taxTitle.className = "col-3 sm-text text-print ta-l wsp-text item";
            taxTitle.innerHTML = "消費税";
    
            var taxVal = document.createElement("div");
            taxVal.className = "col-9 sm-text text-print ta-r wsp-text item";
            taxVal.innerHTML = Other.formatDecial(nTax/1000);;
    
            document.getElementById(previousID).after(rowTax);
            rowTax.appendChild(taxTitle);
            taxTitle.after(taxVal);
        })

        if (mapUriageData.size+1 < mapUriageData.size) {
            var longline = createStrongLine(i);
            listItemList.appendChild(longline);
        }
    }
}


function createStrongLine() {
    var line = document.createElement("div");
    line.className = "line-form mg-0 mt-20 lh-4";
    return line;
}

function createShortLine(countLine) {
    var line = document.createElement("div");
    line.className = "line-form mt-20 mb-0 lh-2";
    line.id = "line" + countLine;
    return line;
}


/**
 * 集計データの計上.
 *
 * @param shukeiItem    [in] {@link ShukeiItem} 集計データ
 * @param kokfDat       [in] {@link KokfDat}    顧客データ
 * @param sysfDat       [in] {@link SysfDat}    システムデータ
 * @param sy2fDat       [in] {@link Sy2fDat}    システム2データ
 * @param kouserDat     [in] {@link KouserDat}  顧客拡張データ
 */
function addShukeiData(shukeiItem, sysfDat, sy2fDat, kouserDat) {

    shuukeiData.mKensu += 1;
    shuukeiData.mGsiyou += GasRaterCom.getGasSuryo(shukeiItem.mGsiyou, sy2fDat, kouserDat);     // lấy data từ api
    shuukeiData.mGryokin += shukeiItem.mGryokin;
    shuukeiData.mKang += shukeiItem.mKang;
    shuukeiData.mShohi += shukeiItem.mShohi;
    shuukeiData.mTotal += shukeiItem.mTotal;

    // if(sysfDat.m_isToyukeninFlg){
    //     var kotfDat = kokfDat.mKotfDat;
    //     if(kotfDat != null && kotfDat.m_bKen_sumi == 1){
    //         shukeiItem.mToyuCnt++;
    //         shukeiItem.mToyuUse += kotfDat.m_nLoil_use;
    //         shukeiItem.mToyuKin += kotfDat.m_nFee;
    //         shukeiItem.mToyuTax += kotfDat.m_nCon_tax;
    //         shukeiItem.mToyuTotal += kotfDat.m_nFee + kotfDat.m_nCon_tax;
    //     }
    // }
    shuukeiData.mNyukin += shukeiItem.mNyukin;
    shuukeiData.mChosei += shukeiItem.mChosei;
    if (shukeiItem.mNyukin != 0) {
        shuukeiData.mNyucnt++;
    }
}

/**
 * 売上日報用データの追加.
 *
 * @param strKey    [in] String             明細日付
 * @param kokfDat   [in] {@link KokfDat}    顧客データ
 * @param hmefDat   [in] {@link HmefDat}    販売明細データ
 */
function addShukeiUriageData(strKey, item) {
    var mapShukeiUriageData;
    // 対象の日付に集計用売上データが存在するか確認
    if (m_mapUriageData.has(strKey)) {
        // 存在する場合はそのデータを使用
        mapShukeiUriageData = m_mapUriageData.get(strKey);
    }
    else {
        // 存在しない場合は新規作成後追加
        mapShukeiUriageData = new Map();
        m_mapUriageData.set(strKey, mapShukeiUriageData);
    }
    var shukeiUriageData;
    // 対象顧客のデータが存在するか確認
    if (mapShukeiUriageData.has(item.h_cusrec)) {
        // 存在する場合はそのデータを使用
        shukeiUriageData = mapShukeiUriageData.get(item.h_cusrec);
    }
    else {
        // 存在しない場合は新規作成後追加
        shukeiUriageData = new Array();
    }
    shukeiUriageData.push(item);
    mapShukeiUriageData.set(item.h_cusrec, shukeiUriageData);
}

/**
 * check cusrec are duplicate?
 * @param {*} cusrec int cusrec 
 * @returns boolean 
*/
function checkCusrec(cusrec) {
    for (let i = 0; i < lstCusrec.length; i++) {
        if (lstCusrec[i] == cusrec) {
            return true;
        }
    }
    return false;
}

function selectionSort() {
    var pos;
    for (let i = 0; i < m_lstShukeiDat.length; i++) {
        for (let j = 0; j < m_lstShukeiDat.length; j++) {
            if (m_lstShukeiDat[j].h_dencnt > m_lstShukeiDat[i].h_dencnt) {
                pos = m_lstShukeiDat[j];
                m_lstShukeiDat[j] = m_lstShukeiDat[i];
                m_lstShukeiDat[i] = pos;
            }
        }
    }
    lstCusrec = [];
}

/**
 * 売上データの計上.
 *
 * @param shukeiItem    [in] {@link ShukeiItem} 集計データ
 * @param hmefDat       [in] {@link HmefDat}    販売明細データ
 */
function addUriageShukeiData(item) {
    shuukeiData.mUricnt++;
    shuukeiData.mUrisur += item.u_suryo;
    shuukeiData.mUrikin += item.h_kin;
    shuukeiData.mUritax += item.h_stax / 1000;
}


/** 
    * ONLOAD ACTION
*/
function onLoadAction() {
    setupLayoutEditView();
    setupDatePicker();
    setOptionMenu();
    setDefaultValueSelectDate();
    setupSelectDateView();
    onclickAction();
    getShuukeiData();
}


window.onload = onLoadAction;
