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
   * @param textButton     [STRING]
*/
function setupModal(status, title, message, textButton, textButton2) {
	// init view
    var modal = document.getElementById("myModal");
    var imageModal = document.getElementsByClassName("modal-image")[0];
    var titleModal = document.getElementsByClassName("title-modal")[0];
    var messageModal = document.getElementsByClassName("modal-message-detail")[0];
    var buttonBack = document.getElementsByClassName("button-cancel")[0];
    var buttonConfirm = document.getElementsByClassName("button-confirm")[0];
    var closeButton = document.getElementsByClassName("modal-close-button")[0];

	// title and message
    if (title != null) {
        titleModal.innerHTML = title;
    }
    if (message != null) {
        messageModal.innerHTML = message;
    }
    if (buttonConfirm != null) {
        buttonConfirm.innerHTML = message;
    }

	// status
    if (status == "load") {
        titleModal.style.display = "none";
        closeButton.style.display = "none";
        buttonConfirm.style.display = "none";
		imageModal.src = "./images/gif/gif_loading_data.gif";
    } else if (status == "success") {
        titleModal.style.display = "none";
        closeButton.style.display = "none";
        buttonConfirm.style.display = "block";
		imageModal.src = "./images/gif/gif_success.gif";
	} else if (status == "error") {
        titleModal.style.display = "none";
        closeButton.style.display = "none";
        buttonConfirm.style.display = "block";
		imageModal.src = "./images/gif/gif_fail.gif";
	} else if (status == "question") {
        titleModal.style.display = "none";
        closeButton.style.display = "none";
        buttonConfirm.style.display = "block";
		imageModal.src = "./images/gif/gif_question.gif";
	}

	// button
	if (textButton != null) {
		buttonConfirm.style.display = "block";
		buttonConfirm.innerHTML = textButton;
		buttonConfirm.onclick = function () {
			modal.style.display = "none";
		}
	} 

    if (textButton2 != null) {
		buttonBack.style.display = "block";
		buttonBack.innerHTML = textButton2;
		buttonBack.onclick = function () {
			modal.style.display = "none";
		}
	} else {
		buttonBack.style.display = "none";
    }

    closeButton.onclick = function () {
        modal.style.display = "none";
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
        window.location.href = "/login_page.html";
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
        setupModal("error", null, Mess.E00006, StringCS.OK, null);
        return false;
    } else {
        return true;
    }
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

export {backAction, setupModal, movePage, checkDevice, setBackgroundDialogScreen, checkPrintable}