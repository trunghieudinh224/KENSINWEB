import * as StringCS from '../Constant/strings.js'
import * as Mess from '../Constant/message.js'

/** 
   * BACK ACTION
*/
function backAction() {
    let previousURL = document.referrer;
    // if (previousURL.includes("http://127.0.0.1/")) {

    // }
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


/**
   * CHECK DEVICE
   *
   * @param page     [STRING]
   * @return [INT]
*/
function checkDevice() {
	if (['iPhone Simulator', 'iPhone'].includes(navigator.platform) == true) {
		// return "iphone";
		return 0;
	} else if (['iPad Simulator', 'iPad'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document) == true) {
		// return "ipad";
		return 1;
	} else if ((navigator.userAgent.includes("Mac") && "ontouchend" in document) == true) {
		// return "mac";
		return 2;
	} else {
		// return "window and android";
		return 3;
	}
}


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
		inputs[index].onclick = function() {
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
        for(var name in obj) {
            console.log(name);
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

export {backAction, setupModal, movePage, changePage, checkDevice, setBackgroundDialogScreen, checkPrintable, setFocusSelectString, calcValOfList}