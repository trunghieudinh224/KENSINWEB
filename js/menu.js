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
var overlay = document.querySelector(".overlay");
var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
var barcodeScannerOverlay = document.querySelector(".barcodeOverlay");
var wrapBarcodeMainForm = document.querySelector(".barcodeOverlay .container-mainform .wrap-mainform");
var settingOverlay = document.querySelector(".settingOverlay");
var wrapSettingMainForm = document.querySelector(".settingOverlay .container-mainform .wrap-mainform");
var startLetter = document.getElementById("startLetter").value;
var numberLetter = document.getElementById("numberLetter").value;
var tempStartLetter = dataSetting.barcd_from;
var tempNumberLetter = dataSetting.barcd_len;
var tempBarcodeType = dataSetting.barcd_kcode;

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
    
    document.getElementById("settingListButton").onclick = function () { 
        Common.movePage('/meter_reading_setting.html') 
    };

    document.getElementById("settingButton").onclick = function () { 
        Common.movePage('/setting.html') 
    };

    
    document.getElementById("close-icon").onclick = function () {
        overlay.style.zIndex = "-1";
        wrapMainForm.classList.remove("overlay-animate");
    };

    document.getElementById("gyoomuButton").onclick = function () {
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
        document.querySelector("link[href='images/icons/ic_home.png']").href = "images/icons/ic_barcode.png";
        startScan();
        overlay.style.zIndex = "-1";
        wrapMainForm.classList.remove("overlay-animate");
        barcodeScannerOverlay.style.zIndex = "3";
        wrapBarcodeMainForm.classList.remove("overlay-animate");
        setBarcodeType();
        setBarcodeStart();
        setBarcodeNumber();
        document.getElementById("confirmBtn").classList.add("disabled-div");
        if (dataSetting.barcd_kcode == 0) {
            document.getElementById("barcodeType").innerHTML = '顧客コード';
        }
        else{
            document.getElementById("barcodeType").innerHTML = 'バーコード';
        } 
    }

    document.getElementById("barcodeBackBtn").onclick = function () {
        document.querySelector("link[href='images/icons/ic_barcode.png']").href = "images/icons/ic_home.png";
        barcodeScannerOverlay.style.zIndex = "-1";
        wrapBarcodeMainForm.classList.remove("overlay-animate");
        Quagga.stop();
        overlay.style.zIndex = "2";
        wrapMainForm.classList.remove("overlay-animate");
        document.getElementById("barcodeValue").value = null;
        document.getElementById("confirmBtn").setAttribute("disabled","");
        document.getElementById("pauseBtn").removeAttribute("disabled");
        document.getElementById("pauseBtn").classList.remove("disabled-div");
    };

    document.getElementById("pauseBtn").onclick = function () {
        var barcode = document.getElementById("barcodeValue").value;
        if (barcode){
            getCustomerData(tempBarcodeType,barcode);
        }
    }

    document.getElementById("settingBtn").onclick = function () {
        barcodeScannerOverlay.style.zIndex = "-1";
        wrapBarcodeMainForm.classList.remove("overlay-animate");
        settingOverlay.style.zIndex = "4";
        wrapSettingMainForm.classList.remove("overlay-animate");
        Quagga.stop();
        if (tempBarcodeType == 0) {
            $('input[value="kcode"]').prop('checked', 'checked');
        }
        else {
            $('input[value="barcode"]').prop('checked', 'checked');
        }
    }

    document.getElementById("settingBackBtn").onclick = function () {
        settingOverlay.style.zIndex = "-1";
        wrapSettingMainForm.classList.remove("overlay-animate");
        barcodeScannerOverlay.style.zIndex = "3";
        wrapBarcodeMainForm.classList.remove("overlay-animate");
        document.getElementById("startLetter").value = tempStartLetter;
        document.getElementById("numberLetter").value = tempNumberLetter;
        document.getElementById("msgError1").style.display = "none";
		document.getElementById("msgError2").style.display = "none";
        $('input[type=radio]').prop('checked', function () {
            return this.getAttribute('checked') == 'checked';
        });
        if ((!document.getElementById("barcodeValue").value) || (document.getElementById("confirmBtn").hasAttribute("disabled"))) {
            startScan();
        }
    }

    document.getElementById("settingSaveBtn").onclick = function () {
        var regex = new RegExp("^[0-9]{1,2}$");
        startLetter = document.getElementById("startLetter").value;
        numberLetter = document.getElementById("numberLetter").value;
        if (regex.test(startLetter) && regex.test(numberLetter)) {
            tempStartLetter = startLetter;
            tempNumberLetter = numberLetter;
            settingOverlay.style.zIndex = "-1";
            wrapSettingMainForm.classList.remove("overlay-animate");
            barcodeScannerOverlay.style.zIndex = "3";
            wrapBarcodeMainForm.classList.remove("overlay-animate");
            saveBarcodeDataSetting();
            if (document.getElementById("barcode").checked) {
                tempBarcodeType = 4;
                document.getElementById("barcodeType").innerHTML = 'バーコード';
            }
            else {
                document.getElementById("barcodeType").innerHTML = '顧客コード';
                tempBarcodeType = 0;
            };
            document.getElementById("confirmBtn").setAttribute("disabled","");
            document.getElementById("confirmBtn").classList.add("disabled-div");
            document.getElementById("pauseBtn").removeAttribute("disabled");
            document.getElementById("pauseBtn").classList.remove("disabled-div");
            document.getElementById("msgError1").style.display = "none";
            document.getElementById("msgError2").style.display = "none";
            startScan();
        }
        else {
            document.getElementById("msgError1").style.display = "none";
            document.getElementById("msgError2").style.display = "none";
            if (!regex.test(startLetter)) {
                document.getElementById("msgError1").style.display = "block";
            };
            if (!regex.test(numberLetter)) {
                document.getElementById("msgError2").style.display = "block";
            };
        }

    }

    document.getElementById("confirmBtn").onclick = function () {
        if (tempBarcodeType == 4) {
            sessionStorage.setItem(StringCS.SEARCHMODE, "3");
            Common.movePage("/customer.html");
        } else {
            sessionStorage.setItem(StringCS.SEARCHMODE, "2");
            Common.movePage("/customer.html");
        }
    }
}

/* 
    START CAMERA
*/
function startScan() {
    const camera = document.getElementById("camera");

    if (window.getComputedStyle(camera).display == "none") {
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
    if (dataSetting.barcd_kcode == 0) {
        $('input[value="kcode"]').prop('checked', 'checked');
    }
    else {
        $('input[value="barcode"]').prop('checked', 'checked');
    }
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
    if (document.getElementById("barcode").checked) {
        setBarcodeType = "4";
    }
    else {
        setBarcodeType = "0";
    }
    dataSetting.barcd_from = document.getElementById("startLetter").value;
    dataSetting.barcd_len = document.getElementById("numberLetter").value;
    dataSetting.barcd_kcode = setBarcodeType;
    dataSetting.login_id = sessionStorage.getItem(StringCS.USERNAME);
    dataSetting.login_pw = sessionStorage.getItem(StringCS.PASSWORD);
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
        url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING,
        // url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_GETSETTING,
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
            // url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_CUSSEARCH + StringCS.PR_KEY +
            "&srch_kind=" + type +
            "&srch_string=" + string +
            "&match_kind=3" +
            "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) +
            "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
        headers: {
            'Content-Type': StringCS.PR_CONTENT_TYPE
        },
        success: function (result) {
            let tempResult =  JSON.parse(result);
            if (tempResult.cuslist.length > 0) {
                var object = tempResult.cuslist[0];
                document.getElementById("pauseBtn").setAttribute("disabled","");
                document.getElementById("pauseBtn").classList.add("disabled-div");
                document.getElementById("confirmBtn").removeAttribute("disabled");
                document.getElementById("confirmBtn").classList.remove("disabled-div");
                const cusdat = Object.assign({}, object);
                sessionStorage.setItem(StringCS.CUSDAT, JSON.stringify(cusdat));
                document.querySelector("#video").pause();
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
    console.log(dataSetting);
}

window.onload = onLoadAction;