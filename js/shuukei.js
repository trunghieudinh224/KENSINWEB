"use strict";
const overlay = document.querySelector(".overlay");

function nippou() {
    overlay.style.zIndex = "2";
    overlay.classList.add("overlay-animate");
}

function closeDialog() {
    overlay.style.zIndex = "-1";
    overlay.classList.remove("overlay-animate");
}

function backToEditView() {
    document.getElementById('editView').style.display = "block";
    document.getElementById('printView').style.display = "none";
}

var userData;
function setupLayoutEditView() {
    userData = JSON.parse(localStorage.getItem("UserData"));

    if (userData.systemDat.FBUNRUI_3 == 0 && userData.systemDat.FHMCODE_3 == 0 && userData.systemDat.FHBCODE_3 == 0) {
        document.getElementById("ShukeiToyuCnt").style.display = "none";
        document.getElementById("ToyuTable").style.display = "none";
    }
}


window.onload = setupLayoutEditView;





























var imgString = "";
function createImageFile() {
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    domtoimage.toBlob(document.getElementById('printContentDetail'))
    .then(function(blob){
        getBase64(blob).then(
            data => {
                console.log(data)
                imgString = data;
                // window.scrollTo(0, 0);
            }
        );
    })
}


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


function sendImage() {
    imgString = imgString.replace("data:image/png;base64,", "");
    navigator.clipboard.writeText(imgString);
    window.location.href = "printermarutou://print&&1";
}


function setupFormPrint(widthScreen, widthForm, sizeTitle, sizeSingleLine, lineHeightSingleLine, sizeItem, lineheightItem) {
    document.getElementById('form').style.width = widthScreen;
    const form = document.getElementsByClassName("wrap-login100");
    form[0].style.width = widthForm

    document.getElementById("shukeiTitle").style.fontSize = sizeTitle

    const shukei_single_line = document.getElementsByClassName("shukei-single-line");
    for (let i = 0; i < shukei_single_line.length; i++) {
        console.log(shukei_single_line[i].value);
        shukei_single_line[i].style.fontSize = sizeSingleLine
        shukei_single_line[i].style.lineHeight = lineHeightSingleLine
        shukei_single_line[i].style.fontWeight = "normal"
    }

    const item = document.getElementsByClassName("item");
    for (let i = 0; i < item.length; i++) {
        console.log(item[i].value);
        item[i].style.fontSize = sizeItem
        item[i].style.lineHeight = lineheightItem
    }
}