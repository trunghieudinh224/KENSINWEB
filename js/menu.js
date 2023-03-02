import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as CheckData from './Common/check_data.js'
import * as Mess from './Constant/message.js'
import * as ValueCS from './Constant/values.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* data setting */
var dataSetting = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));

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
    var regex = /^\d{1,2}$/;
    var btn = document.getElementById("gyoomuButton");
    var overlay = document.querySelector(".overlay");
    var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
    var barcodeScannerOverlay = document.querySelector(".barcodeOverlay");
    var wrapBarcodeMainForm = document.querySelector(".barcodeOverlay .container-mainform .wrap-mainform");
    var settingOverlay = document.querySelector(".settingOverlay");
    var wrapSettingMainForm = document.querySelector(".settingOverlay .container-mainform .wrap-mainform");
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
        if (dataSetting.barcd_kode === 0) {
            document.getElementById("barcodeType").style.display = "block";
            document.getElementById("kcodeType").style.display = "none";
        }
        else {
            document.getElementById("kcodeType").style.display = "block";
            document.getElementById("barcodeType").style.display = "none";
        }
    }

    document.getElementById("barcodeBackBtn").onclick = function () {
        barcodeScannerOverlay.style.zIndex = "-1";
        wrapBarcodeMainForm.classList.remove("overlay-animate");
        Quagga.stop();
        overlay.style.zIndex = "2";
        wrapMainForm.classList.remove("overlay-animate");
    };

    document.getElementById("pauseBtn").onclick = function () {
        var pauseBtnValue = document.getElementById("pauseBtn").value;
        var barcode = document.getElementById("barcodeValue").value;

        if ((!pauseBtnValue) || (pauseBtnValue == 0)) {
            Quagga.stop();
            document.getElementById("pauseBtn").value = 1;
        }
        else {
            startScan();
            document.getElementById("pauseBtn").value = 0;
        }
        if (barcode)
            document.getElementById("confirmBtn").removeAttribute("disabled");
    }

    document.getElementById("settingBtn").onclick = function () {
        overlay.style.zIndex = "-1";
        wrapMainForm.classList.remove("overlay-animate");
        settingOverlay.style.zIndex = "4";
        wrapSettingMainForm.classList.remove("overlay-animate");
        Quagga.stop();
        if (regex.test(tempStartLetter) && regex.test(tempNumberLetter))
            document.getElementById("settingSaveBtn").removeAttribute("disabled");
        console.log(tempBarcodeType)
        if (tempBarcodeType === 0)
            document.getElementById("barcode").setAttribute("checked", "");
        else
            document.getElementById("kcode").setAttribute("checked", "");
        document.getElementById("startLetter").oninput = function () {
            if (!regex.test(document.getElementById("startLetter").value))
                document.getElementById("settingSaveBtn").setAttribute("disabled", "");
            else
                document.getElementById("settingSaveBtn").removeAttribute("disabled");
        }
        document.getElementById("numberLetter").oninput = function () {
            if (!regex.test(document.getElementById("numberLetter").value))
                document.getElementById("settingSaveBtn").setAttribute("disabled", "");
            else
                document.getElementById("settingSaveBtn").removeAttribute("disabled");
        }

    }

    document.getElementById("settingBackBtn").onclick = function () {
        settingOverlay.style.zIndex = "-1";
        wrapSettingMainForm.classList.remove("overlay-animate");
        document.getElementById("startLetter").value = tempStartLetter;
        document.getElementById("numberLetter").value = tempNumberLetter;
        if (tempBarcodeType === 0)
            document.getElementById("barcode").setAttribute("checked", "");
        else
            document.getElementById("kcode").setAttribute("checked", "");
        startScan();
    }

    document.getElementById("settingSaveBtn").onclick = function () {
        var startLetter = document.getElementById("startLetter").value;
        var numberLetter = document.getElementById("numberLetter").value;
        settingOverlay.style.zIndex = "-1";
        wrapSettingMainForm.classList.remove("overlay-animate");
        startLetter = parseInt(document.getElementById("startLetter").value);
        numberLetter = parseInt(document.getElementById("numberLetter").value);
        tempStartLetter = startLetter;
        tempNumberLetter = numberLetter;
        saveBarcodeDataSetting();
        if (document.getElementById("barcode").checked) {
            document.getElementById("barcodeType").style.display = "block";
            document.getElementById("kcodeType").style.display = "none";
            tempBarcodeType = 0;
        }
        else {
            document.getElementById("kcodeType").style.display = "block";
            document.getElementById("barcodeType").style.display = "none";
            tempBarcodeType = 1;
        }
        startScan();
    }

    document.getElementById("confirmBtn").onclick = function () {
        console.log(document.getElementById("barcodeValue").value);
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
    let startLetter = document.getElementById("startLetter").value;
    let numberLetter = document.getElementById("numberLetter").value;
    let setBarcodeType;
    if (document.getElementById("barcode").checked)
        setBarcodeType = 0;
    else
        setBarcodeType = 1;
    const newBarcodeData = {
        barcd_from: parseInt(startLetter),
        barcd_kode: setBarcodeType,
        barcd_len: parseInt(numberLetter),
        login_id: sessionStorage.getItem(StringCS.USERNAME),
        login_pw: sessionStorage.getItem(StringCS.PASSWORD)
    }
    console.log(newBarcodeData)
    return newBarcodeData;
}

/** 
   * SAVE BARCODE DATA SETTING
*/
function saveBarcodeDataSetting() {
    Common.setupModal("load", null, Mess.I00002, null, null, null, false);
    $.ajax({
        type: "POST",
        data: JSON.stringify(prepareNewBarcodeDataSetting()),
        url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING,
        // url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING,
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

/*
   * ONLOAD ACTION
*/
function onLoadAction() {
    setOptionMenu();
    onclickAction();
    showDialog();
    console.log(dataSetting);
}



window.onload = onLoadAction;

