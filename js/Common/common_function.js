import * as StringCS from '../Constant/strings.js'
import * as Mess from '../Constant/message.js'

/** 
   * BACK ACTION
*/
function backAction() {
    history.back();
}


/**
   * INITIALIZE MODAL
   *
   * @param status     [STRING]
   * @param title     [STRING]
   * @param message     [STRING]
   * @param textButton0     [STRING]
   * @param textButton1     [STRING]
   * @param textButton2     [STRING]
   * @param isClose     [BOOL]
*/
function setupModal(status, title, message, textButton0, textButton1, textButton2, isClose) {
    // init view
    var modal = document.getElementById("myModal");
    var imageModal = document.getElementsByClassName("modal-image")[0];
    var titleModal = document.getElementsByClassName("title-modal")[0];
    var messageModal = document.getElementsByClassName("modal-message-detail")[0];
    var button0 = document.getElementsByClassName("button-0")[0];
    var button1 = document.getElementsByClassName("button-1")[0];
    var button2 = document.getElementsByClassName("button-2")[0];
    var closeButton = document.getElementsByClassName("modal-close-button")[0];

    // title and message
    if (title != null) {
        titleModal.innerHTML = title;
    }
    if (message != null) {
        messageModal.innerHTML = message;
    }

    // status
    if (status == "load") {
        titleModal.style.display = "none";
        imageModal.src = "./images/gif/gif_loading_data.gif";
    } else if (status == "success") {
        titleModal.style.display = "none";
        imageModal.src = "./images/gif/gif_success.gif";
    } else if (status == "error") {
        titleModal.style.display = "none";
        imageModal.src = "./images/gif/gif_fail.gif";
    } else if (status == "question") {
        titleModal.style.display = "none";
        imageModal.src = "./images/gif/gif_question.gif";
    } else if (status == "info") {
        titleModal.style.display = "none";
        imageModal.src = "./images/gif/gif_info.gif";
    }

    // button
    if (textButton0 != null) {
        button0.style.display = "block";
        button0.innerHTML = textButton0;
        button0.onclick = function () {
            modal.style.display = "none";
        }
    } else {
        button0.style.display = "none";
    }

    if (textButton1 != null) {
        button1.style.display = "block";
        button1.innerHTML = textButton1;
        button1.onclick = function () {
            modal.style.display = "none";
        }
    } else {
        button1.style.display = "none";
    }

    if (textButton2 != null) {
        button2.style.display = "block";
        button2.innerHTML = textButton2;
        button2.onclick = function () {
            modal.style.display = "none";
        }
    } else {
        button2.style.display = "none";
    }

    if (isClose == true) {
        closeButton.style.display = "block";
        closeButton.onclick = function () {
            modal.style.display = "none";
        }
    } else {
        closeButton.style.display = "none";
    }

    modal.style.display = "block";
}


/**
   * MOVING TO ANOTHER PAGE
   *
   * @param page     [STRING]
*/
function movePage(page) {
    if (page != 'logout') {
        window.location.href = page;
    } else {
        // Remove saved data from sessionStorage
        sessionStorage.removeItem(StringCS.USERNAME);

        // Remove all saved data from sessionStorage
        sessionStorage.clear();
        window.location.href = "/login.html";
    }
}


/**
   * MOVING TO ANOTHER PAGE
   *
   * @param page     [STRING]
*/
function changePage(page) {
    if (page != 'logout') {
        page = StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME_M + page;
        window.location.href = page;
    } else {
        // Remove saved data from sessionStorage
        sessionStorage.removeItem(StringCS.USERNAME);

        // Remove all saved data from sessionStorage
        sessionStorage.clear();
        window.location.href = StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME_M + "login.html";
    }
}


// /**
//    * CHECK DEVICE
//    *
//    * @param page     [STRING]
//    * @return [INT]
// */
// function checkDevice() {
// 	if (['iPhone Simulator', 'iPhone'].includes(navigator.platform) == true) {
// 		// return "iphone";
// 		return 0;
// 	} else if (['iPad Simulator', 'iPad'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document) == true) {
// 		// return "ipad";
// 		return 1;
// 	} else if ((navigator.userAgent.includes("Mac") && "ontouchend" in document) == true) {
// 		// return "mac";
// 		return 2;
// 	} else {
// 		// return "window and android";
// 		return 3;
// 	}
// }


/**
   * SET BACKGROUND DIALOG SCREEN
   *
   * @param display     [STRING]
   * @param color     [STRING]
*/
function setBackgroundDialogScreen(display, color) {
    document.getElementsByClassName('modal-content')[0].style.display = display;
    document.getElementById('myModal').style.backgroundColor = color;
}


/**
   * CHECK PRINT FUNCTION
*/
function checkPrintable() {
    if (checkDevice() != 0 && checkDevice() != 1) {
        setupModal("error", null, Mess.E00006, null, StringCS.OK, null, false);
        return false;
    } else {
        return true;
    }
}


/**
   * SET FOCUS SELECT STRING
*/
function setFocusSelectString() {
    var inputs = document.getElementsByClassName('t-ip');
    for (var index = 0; index < inputs.length; index++) {
        inputs[index].onclick = function () {
            this.setSelectionRange(0, this.value.length)
        }
    }
}


/**
   * CALCULATING ITEM'S VALUE OF LIST
*/
function calcValOfList(list, prop) {
    var result = 0;
    for (var i = 0; i < list.length; i++) {
        var obj = list[i];
        for (var name in obj) {
            if (prop == name) {
                result += obj[name];
            }
        }
    }
    return result;
}


// function detectBrowser() {
// 	let userAgent = navigator.userAgent;
// 	let browserName;

// 	if (userAgent.match(/android/i)) {
// 		browserName = "Android";
// 	} else if (userAgent.match(/iphone/i)) {
// 		browserName = "iPhone";
// 	} else {
// 		browserName = "desktop";
// 	}

// 	alert(browserName);
// }


function showKeyBoard(title, valElement) {
    document.getElementById("inputTitle").innerHTML = title;
    var inputVal = document.getElementById("inputVal");
    var number = document.getElementsByClassName("num-kb");
    var btnDel = document.getElementById("del-btn");
    var btnMinus = document.getElementById("minus-btn");
    var btnDot = document.getElementById("dot-btn");
    var btnEnter = document.getElementById("enter-btn");
    var keyboard = document.querySelector(".keyboard");
    var wrapMainForm = document.querySelector(".keyboard .container-mainform .wrap-mainform");
    var prop = JSON.parse(sessionStorage.getItem(StringCS.KEYBOARDPROP));
    document.body.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center'
    });


    //setup layout
    var view = document.getElementById("zenkaiSSKBArea");
    if (title != "今回指針") {
        if (view != null) {
            view.style.display = "none";
        }
    } else {
        if (view != null) {
            view.style.display = "block";
        }
    }

    document.getElementById("close-icon-keyboard").onclick = function () {
        keyboard.style.zIndex = "-2";
        wrapMainForm.classList.remove("overlay-animate");
        inputVal.textContent = "";
    };

    if (prop.minus == false) {
        btnMinus.classList.add("disabled-div");
    }
    if (prop.dot == false) {
        btnDot.classList.add("disabled-div");
    }

    btnDel.classList.add("disabled-div");


    inputVal.addEventListener('DOMSubtreeModified', function () {
        var _prop = JSON.parse(sessionStorage.getItem(StringCS.KEYBOARDPROP));

        if (inputVal.textContent.length > 0) {
            if (btnDel.classList.contains("disabled-div")) {
                btnDel.classList.remove("disabled-div");
            }
            if (btnMinus.classList.contains("disabled-div") == false && _prop.minus == true) {
                btnMinus.classList.add("disabled-div");
            }
            if (inputVal.textContent.includes(".") && _prop.dot == true) {
                if (btnDot.classList.contains("disabled-div") == false) {
                    btnDot.classList.add("disabled-div");
                }
                if (inputVal.textContent.substring(inputVal.textContent.indexOf("."), inputVal.textContent.length - 1).length < _prop.numAfterDot) {
                    disableNumberKeyboard(true);
                } else if (inputVal.textContent.substring(inputVal.textContent.indexOf("."), inputVal.textContent.length - 1).length == _prop.numAfterDot) {
                    disableNumberKeyboard(false);
                } else {
                    disableNumberKeyboard(false);
                }
            } else {
                if (btnDot.classList.contains("disabled-div") && _prop.dot == true) {
                    btnDot.classList.remove("disabled-div");
                }
                if (inputVal.textContent.length <= _prop.lengthVal) {
                    disableNumberKeyboard(true);
                } else {
                    disableNumberKeyboard(false);
                }
            }

        } else {
            disableNumberKeyboard(true);
            if (btnDel.classList.contains("disabled-div") == false) {
                btnDel.classList.add("disabled-div");
            }
            if (btnMinus.classList.contains("disabled-div") && _prop.minus == true) {
                btnMinus.classList.remove("disabled-div");
            }
            if (btnDot.classList.contains("disabled-div") && _prop.dot == true) {
                btnDot.classList.remove("disabled-div");
            }
        }
    });

    btnDel.onclick = function () {
        inputVal.innerHTML = inputVal.textContent.substring(0, inputVal.textContent.length - 1);
    }

    btnDot.onclick = function () {
        if (btnDot.classList.contains("disabled-div")) {
            return;
        }
        inputVal.innerHTML = inputVal.textContent + this.textContent;
    }

    btnMinus.onclick = function () {
        if (btnMinus.classList.contains("disabled-div")) {
            return;
        }
        if (inputVal.textContent.length == 0) {
            inputVal.innerHTML = "-" + inputVal.textContent;
        }
    }

    btnEnter.onclick = function () {
        if (inputVal.textContent.charAt(0) == ".") {
            inputVal.innerHTML = "0" + inputVal.textContent;
        }
        if (btnDel.classList.contains("disabled-div")) {
            btnDel.classList.remove("disabled-div");
        }
        if (btnMinus.classList.contains("disabled-div")) {
            btnMinus.classList.remove("disabled-div");
        }
        if (btnDot.classList.contains("disabled-div")) {
            btnDot.classList.remove("disabled-div");
        }
        inputVal.removeEventListener('DOMSubtreeModified', null)
        keyboard.style.zIndex = "-2";
        wrapMainForm.classList.remove("overlay-animate");
        if (inputVal.textContent != "") {
            valElement.textContent = inputVal.textContent;
        }
        inputVal.textContent = "";
        valElement.scrollIntoView();
    }

    for (var i = 0; i < number.length; i++) {
        number[i].onclick = function () {
            if (this.classList.contains("disabled-div")) {
                return;
            }

            if (inputVal.textContent.includes(".") && prop.dot == true) {
                if (inputVal.textContent.substring(inputVal.textContent.indexOf("."), inputVal.textContent.length - 1).length < prop.numAfterDot) {
                    disableNumberKeyboard(true);
                    inputVal.innerHTML = inputVal.textContent + this.textContent;
                } else if (inputVal.textContent.substring(inputVal.textContent.indexOf("."), inputVal.textContent.length - 1).length == prop.numAfterDot) {
                    disableNumberKeyboard(false);
                    inputVal.innerHTML = inputVal.textContent + this.textContent;
                } else {
                    disableNumberKeyboard(false);
                }
            } else {
                if (inputVal.textContent.length < prop.lengthVal - 1) {
                    disableNumberKeyboard(true);
                    inputVal.innerHTML = inputVal.textContent + this.textContent;
                } else {
                    inputVal.innerHTML = inputVal.textContent + this.textContent;
                    disableNumberKeyboard(false);
                }
            }
        }
    }
}


function disableNumberKeyboard(enable) {
    var number = document.getElementsByClassName("num-kb");
    for (var i = 0; i < number.length; i++) {
        if (enable == false) {
            if (number[i].classList.contains("disabled-div") == false) {
                number[i].classList.add("disabled-div");
            }
        } else {
            if (number[i].classList.contains("disabled-div")) {
                number[i].classList.remove("disabled-div");
            }
        }
    }
}


function getOS() {
    var result = bowser.getParser(window.navigator.userAgent);
    return result;
}


/* 
    * SET ALIGN COMBOBOX
*/
function setAlignCombobox(value) {
    if (value) {
        var cbb = document.getElementsByClassName("combobox");
        for (var i = 0; i < cbb.length; i++) {
            var width = cbb[i].clientWidth / 2;
            cbb[i].style.paddingLeft = width + "px";
        }
    }
}


function checkDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        alert("mobile");
    } else {
        alert("not mobile");
    }
}


function setupDatePicker(nameDatePicker) {
    var dpk = document.getElementById(nameDatePicker);
    dpk.setAttribute("readOnly", "true");
    dpk.style.backgroundColor = "White";
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}


export {
    backAction, setupModal, movePage, changePage, checkDevice, setBackgroundDialogScreen, checkPrintable, setFocusSelectString, calcValOfList,
    showKeyBoard, getOS, setAlignCombobox, setupDatePicker, getMobileOperatingSystem
}