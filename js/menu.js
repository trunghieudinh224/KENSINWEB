import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as CheckData from './Common/check_data.js'
import * as Mess from './Constant/message.js'

/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("logoutOption").onclick = function() {Common.movePage('logout')};
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("shuukeiButton").onclick = function() {
        Common.movePage('/total.html')
        // Common.setupModal("load", null, Mess.I00004, null, StringCS.OK, null, false);
    };
    document.getElementById("settingListButton").onclick = function() {Common.movePage('/meter_reading_setting.html')};
    document.getElementById("settingButton").onclick = function() {Common.movePage('/setting.html')};
}


/* 
	SHOW DIALOG
*/

function showDialog() {
	var btn = document.getElementById("gyoomuButton");
	var overlay = document.querySelector(".overlay");
	var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
	document.getElementById("close-icon").onclick = function () {
		overlay.style.zIndex = "-1";
		wrapMainForm.classList.remove("overlay-animate");
	};

	btn.onclick = function () {
		overlay.style.zIndex = "2";
		wrapMainForm.classList.remove("overlay-animate");
	};

    var overlay = document.querySelector(".overlay");
    document.getElementById("searchBtn1").onclick = function() {
        CheckData.clearDataSearch();
        sessionStorage.setItem(StringCS.SEARCHMODE, "1");
        Common.movePage('/search_customer.html');
        sessionStorage.removeItem(StringCS.SEARCHSTRING);
        overlay.style.zIndex = "-1";
        // Common.setupModal("load", null, Mess.I00004, null, StringCS.OK, null, false);
    };
    document.getElementById("searchBtn2").onclick = function() {
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
        var barcodeScannerOverlay = document.querySelector(".barcodeOverlay");
        var wrapBarcodeMainForm = document.querySelector(".barcodeOverlay .container-mainform .wrap-mainform");
        document.getElementById("close-barcode-icon").onclick = function () {
            barcodeScannerOverlay.style.zIndex = "-1";
            wrapBarcodeMainForm.classList.remove("overlay-animate");
            // Quagga.stop();
            overlay.style.zIndex = "2";
            wrapMainForm.classList.remove("overlay-animate");
        };
        barcodeScannerOverlay.style.zIndex = "3";
        wrapBarcodeMainForm.classList.remove("overlay-animate");
    }
}

/* 
	START CAMERA
*/
function startScan() {
    const camera = document.getElementById("camera");
    if (window.getComputedStyle(camera).display === "none") {
        camera.style.display = "block";
    } else {
        return;
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
        console.log(data.codeResult.code);
        document.getElementById("barcodeValue").value = data.codeResult.code;
    });
}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    setOptionMenu();
    onclickAction();
    showDialog();
}


window.onload = onLoadAction;

