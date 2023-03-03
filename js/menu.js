import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as CheckData from './Common/check_data.js'
import * as Mess from './Constant/message.js'
import * as ValueCS from './Constant/values.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");
const settingModal = document.getElementById("settingModal");


/*****  DATA VARIABLE  *****/
/* data setting */
var dataSetting = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));
var overlay = document.querySelector(".overlay");
var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
var barcodeScannerOverlay = document.querySelector(".barcodeOverlay");
var wrapBarcodeMainForm = document.querySelector(".barcodeOverlay .container-mainform .wrap-mainform");
var settingOverlay = document.querySelector(".settingOverlay");
var wrapSettingMainForm = document.querySelector(".settingOverlay .container-mainform .wrap-mainform");
var startLetter = document.getElementById("startLetter").value;
var numberLetter = document.getElementById("numberLetter").value;
var cusrec;

/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("shuukeiButton").onclick = function () {
        Common.movePage('/total.html')
        // Common.setupModal("load", null, Mess.I00004, null, StringCS.OK, null, false);
    };
    document.getElementById("settingListButton").onclick = function () { Common.movePage('/meter_reading_setting.html') };
    document.getElementById("settingButton").onclick = function () { Common.movePage('/setting.html') };
}


/* 
    SHOW DIALOG
*/

function showDialog() {
    var btn = document.getElementById("gyoomuButton");
    var tempStartLetter = dataSetting.barcd_from;
    var tempNumberLetter = dataSetting.barcd_len;
    var tempBarcodeType = dataSetting.barcd_kode;

    document.getElementById("close-icon").onclick = function () {
        overlay.style.zIndex = "-1";
        wrapMainForm.classList.remove("overlay-animate");
    };

    btn.onclick = function () {
        overlay.style.zIndex = "2";
        wrapMainForm.classList.remove("overlay-animate");
    };

    document.getElementById("searchBtn1").onclick = function () {
        CheckData.clearDataSearch();
        sessionStorage.setItem(StringCS.SEARCHMODE, "1");
        Common.movePage('/search_customer.html');
        sessionStorage.removeItem(StringCS.SEARCHSTRING);
        overlay.style.zIndex = "-1";
        // Common.setupModal("load", null, Mess.I00004, null, StringCS.OK, null, false);
    };
    document.getElementById("searchBtn2").onclick = function () {
        CheckData.clearDataSearch();
        sessionStorage.setItem(StringCS.SEARCHMODE, "2");
        Common.movePage('/search_customer.html');
        sessionStorage.removeItem(StringCS.SEARCHSTRING);
        overlay.style.zIndex = "-1";
    };

    document.getElementById("barcodeScannerBtn").onclick = function () {
        startScan();
        overlay.style.zIndex = "-1";
        wrapMainForm.classList.remove("overlay-animate");
        barcodeScannerOverlay.style.zIndex = "3";
        wrapBarcodeMainForm.classList.remove("overlay-animate");
        setBarcodeType();
        setBarcodeStart();
        setBarcodeNumber();
        if (dataSetting.barcd_kode === 0)
            document.getElementById("barcodeType").innerHTML = '顧客コード';
        else
            document.getElementById("barcodeType").innerHTML = 'バーコード';

    }

    document.getElementById("barcodeBackBtn").onclick = function () {
        barcodeScannerOverlay.style.zIndex = "-1";
        wrapBarcodeMainForm.classList.remove("overlay-animate");
        Quagga.stop();
        overlay.style.zIndex = "2";
        wrapMainForm.classList.remove("overlay-animate");
    };

    document.getElementById("pauseBtn").onclick = function () {
        // var pauseBtnValue = document.getElementById("pauseBtn").value;
        var barcode = document.getElementById("barcodeValue").value;
        if (barcode)
            getCustomerData(tempBarcodeType,barcode);
    }

    document.getElementById("settingBtn").onclick = function () {
        barcodeScannerOverlay.style.zIndex = "-1";
        wrapBarcodeMainForm.classList.remove("overlay-animate");
        settingOverlay.style.zIndex = "4";
        wrapSettingMainForm.classList.remove("overlay-animate");
        Quagga.stop();
        if (tempBarcodeType === 0)
            document.getElementById("kcode").setAttribute("checked", "");
        else
            document.getElementById("barcode").setAttribute("checked", "");
    }

    document.getElementById("settingBackBtn").onclick = function () {
        settingOverlay.style.zIndex = "-1";
        wrapSettingMainForm.classList.remove("overlay-animate");
        document.getElementById("startLetter").value = tempStartLetter;
        document.getElementById("numberLetter").value = tempNumberLetter;
        if (tempBarcodeType === 0)
            document.getElementById("kcode").setAttribute("checked", "");
        else
            document.getElementById("barcode").setAttribute("checked", "");
        startScan();
        barcodeScannerOverlay.style.zIndex = "3";
        wrapBarcodeMainForm.classList.remove("overlay-animate");
    }

    document.getElementById("settingSaveBtn").onclick = function () {
        settingOverlay.style.zIndex = "-1";
        wrapSettingMainForm.classList.remove("overlay-animate");
        startLetter = parseInt(document.getElementById("startLetter").value);
        numberLetter = parseInt(document.getElementById("numberLetter").value);
        tempStartLetter = startLetter;
        tempNumberLetter = numberLetter;
        saveBarcodeDataSetting();
        if (document.getElementById("barcode").checked) {
            tempBarcodeType = 4;
            document.getElementById("barcodeType").innerHTML = 'バーコード';
        }
        else {
            document.getElementById("barcodeType").innerHTML = '顧客コード';
            tempBarcodeType = 0;
        }
        startScan();
        barcodeScannerOverlay.style.zIndex = "3";
        wrapBarcodeMainForm.classList.remove("overlay-animate");
    }

    document.getElementById("confirmBtn").onclick = function () {
        console.log(document.getElementById("barcodeValue").value);
        sessionStorage.setItem(StringCS.SEARCHMODE, "3");
        Common.movePage("/customer.html");
    }
}

/* 
    START CAMERA
*/
function startScan() {
    const camera = document.getElementById("camera");

    if (window.getComputedStyle(camera).display === "none") {
        camera.style.display = "block";
    }

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#camera')
        },
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader",
                "i2of5_reader",
                "2of5_reader",
                "code_93_reader"
            ]
        },
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function (data) {
        var startLetter = document.getElementById("startLetter").value;
        var numberLetter = document.getElementById("numberLetter").value;
        var endLetter = parseInt(startLetter) + parseInt(numberLetter);
        if ((startLetter) && (numberLetter))
            document.getElementById("barcodeValue").value = data.codeResult.code.slice(startLetter, endLetter);
        else
            document.getElementById("barcodeValue").value = data.codeResult.code;
    });
}

/* 
    SET BARCODE TYPE
*/
function setBarcodeType() {
    if (dataSetting.barcd_kode === 0)
        document.getElementById("barcode").setAttribute("checked", "");
    else
        document.getElementById("kcode").setAttribute("checked", "");
}

/* 
    SET BARCODE START LETTER
*/
function setBarcodeStart() {
    document.getElementById("startLetter").value = dataSetting.barcd_from;
}

/* 
    SET BARCODE NUMBER LETTER
*/
function setBarcodeNumber() {
    document.getElementById("numberLetter").value = dataSetting.barcd_len;
}

/**
   * PREPARE NEW DATA SETTING
*/
function prepareNewBarcodeDataSetting() {
    let setBarcodeType;
    if (document.getElementById("barcode").checked)
        setBarcodeType = 4;
    else
        setBarcodeType = 0;
    dataSetting.barcd_from = parseInt(startLetter);
    dataSetting.barcd_len = parseInt(numberLetter);
    dataSetting.barcd_kode = setBarcodeType;
    console.log(dataSetting)
    return dataSetting;
}

/** 
   * SAVE BARCODE DATA SETTING
*/
function saveBarcodeDataSetting() {
    Common.setupModal("load", null, Mess.I00002, null, null, null, false);
    $.ajax({
        type: "POST",
        data: JSON.stringify(prepareNewBarcodeDataSetting()),
        url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING +
        // url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING,
        "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) +
        "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: ValueCS.VL_LONG_TIMEOUT,
        success: function (response) {
            console.log(response);
            Common.setupModal("load", null, Mess.I00002, null, null, null, false);
        },
        error: function (xmlhttprequest, textstatus, message) {
            if (textstatus === "timeout") {
                console.log("timeout")
            } else {
                console.log(textstatus)
            }
            Common.setupModal("error", null, Mess.E00004, null, StringCS.OK, null, false);
        }
    }).done(function (res) {
        console.log('res', res);
        sessionStorage.setItem(StringCS.SETTINGDATA, JSON.stringify(prepareNewBarcodeDataSetting()));
        Common.setupModal("success", null, Mess.I00003, null, StringCS.OK, null, false);
    });
}

/**
    * GET CUSTOMER DATA
 */
function getCustomerData(type, string) {
    $.ajax({
        url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
            // url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
            "&srch_kind=" + type +
            "&srch_string=" + string +
            "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) +
            "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
        headers: {
            'Content-Type': StringCS.PR_CONTENT_TYPE
        },
        success: function (result) {
            let tempResult =  JSON.parse(result);
            if (tempResult) {
                document.getElementById("confirmBtn").removeAttribute("disabled");
                Quagga.stop();
            }
            else    
                Common.setupModal("error", null, Mess.E00005, null, StringCS.OK, null, false);
        },
        error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00003, null, StringCS.OK, null, false);
		},
		timeout: ValueCS.VL_LONG_TIMEOUT
    })
}

/*
   * ONLOAD ACTION
*/
function onLoadAction() {
    setOptionMenu();
    onclickAction();
    showDialog();
    // console.log(dataSetting);
}

window.onload = onLoadAction;