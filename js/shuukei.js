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



function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


function sendImage() {
    // setupFormPrint("100vh", "650px", "60px", "28px", "32px", "28px", "32px");
    domtoimage.toBlob(document.getElementById('printContentDetail'))
    .then(function(blob){
        // window.saveAs(blob, "output.pdf");
        console.log(blob)
        const interval = setInterval(function() {
            // method to be executed;
            // setupFormPrint("100%", "600px", "45px", "20px", "25px", "20px", "25px")
            window.scrollTo(0, 0);
            clearInterval(interval);
            try {
                window.location.href = "printermarutou://print&&1";
            }
            catch (err) {
                adddlert(err);
            }    
          }, 10);
        getBase64(blob).then(
            data => {
                console.log(data)
                navigator.clipboard.writeText(data);
            }
        );
    })
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