localStorage.removeItem("cuslist");
var systemDat;
const modal = document.getElementById("myModal");

function setupModal(status, title, message, textButton1, textButton2) {
    var imgModal = document.getElementsByClassName("modal-image")[0];
    var titleModal = document.getElementsByClassName("title-modal")[0];
    var messageModal = document.getElementsByClassName("modal-message-detail")[0];
    var buttonConfirm = document.getElementsByClassName("button-confirm")[0];
    var closeButton = document.getElementsByClassName("modal-close-button")[0];
  
    titleModal.innerHTML = title;
    messageModal.innerHTML = message;
  
    if (status == "load") {
      imgModal.src = "../images/gif/gif_loading_data.gif";
      titleModal.style.display = "none";
      closeButton.style.display = "none";
      buttonConfirm.style.display = "none";
    } else {
      if (status == "info") {
  
      } else if (status == "warning") {
        imgModal.src = "../images/gif/gif_warning.gif";
      } else if (status == "error") {
        imgModal.src = "../images/gif/gif_fail.gif";
      }
  
      if (textButton1 != null) {
        buttonConfirm.style.display = "block";
      }
    }
  
    buttonConfirm.onclick = function () {
      modal.style.display = "none";
    }
    // When the user clicks on <span> (x), close the modal
    closeButton.onclick = function () {
      modal.style.display = "none";
    }
  
    modal.style.display = "block";
  }