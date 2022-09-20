localStorage.removeItem("cuslist");
var systemDat;
const modal = document.getElementById("myModal");

window.onload = getInformation;

function getInformation() {
    setupModal("load", null, "しばらくお待ちください。。。", null, null);
    $.ajax({
        url: "http://192.168.200.218:8080/Webkensin/compackr/readData?key=0582668301&cusrec=0&login_id=7&login_pw=7",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
            systemDat = JSON.parse(result);
            localStorage.setItem("UserData", JSON.stringify(systemDat));
            modal.style.display = "none";
        },
        error: function (jqXHR, exception) {
            console.log(exception);
        }
    });
}

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