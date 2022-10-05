/* 
	BACK ACTION
*/
function backAction() {
    history.back();
}


/*****  FUNCTION  *****/
/* 
	INITIALIZE MODAL
	@param status
	@param title
	@param message
	@param textButton1
	@param textButton2
*/
function setupModal(status, title, message, textButton1, textButton2) {
	// init view
    var modal = document.getElementById("myModal");
    var imageModal = document.getElementsByClassName("modal-image")[0];
    var titleModal = document.getElementsByClassName("title-modal")[0];
    var messageModal = document.getElementsByClassName("modal-message-detail")[0];
    var buttonConfirm = document.getElementsByClassName("button-confirm")[0];
    var closeButton = document.getElementsByClassName("modal-close-button")[0];

	// title and message
    titleModal.innerHTML = title;
    messageModal.innerHTML = message;
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
	}

	// button
	if (textButton1 != null) {
		buttonConfirm.style.display = "block";
		buttonConfirm.innerHTML = textButton1;
		buttonConfirm.onclick = function () {
			modal.style.display = "none";
		}
	}
    closeButton.onclick = function () {
        modal.style.display = "none";
    }

	modal.style.display = "block";
}


export {backAction, setupModal}