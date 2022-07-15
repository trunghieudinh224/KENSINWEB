function checkLogin() {
    // var data = sessionStorage.getItem('username');
    // if (data == null || data == '') {
    //     window.location.href = "/login_page.html";
    // } else {
    //     document.getElementById("userName").textContent = data;
    // }
}
window.onload = checkLogin;

function generatePDF() {
    // document.getElementById("selectOne").style.border = "none";
    // const titleContent = document.getElementsByClassName("title-content");
    // for (let i = 0; i < titleContent.length; i++) {
    //     titleContent[i].style.fontWeight = "normal";
    // }
    // const input = document.getElementsByClassName("input");
    // for (let i = 0; i < input.length; i++) {
    //     input[i].style.border = "none";
    // }

    // const element = document.getElementById("formPrint");
    // html2pdf(element, {
    //     jsPDF: { format: 'a6' }
    // }).save();


    notificationLogin?.classList.add("show");
}

function generatePDFFile() {
    // window.scrollTo(0, 0);
    // setTimeout(function () {
    //     const element = document.getElementById("finalForm");

    //     var opt = {
    //         margin: 0,
    //         filename: 'myfile.pdf',
    //         image: { type: 'jpeg', quality: 0.98 },
    //         html2canvas: { scale: 1 },
    //         jsPDF: { unit: 'in', format: 'a6', orientation: 'portrait' }
    //     };

    //     // New Promise-based usage:
    //     html2pdf().from(element).set(opt).save();
    // }, 1000);

    /* Copy the text inside the text field */
    navigator.clipboard.writeText("集　計　表&&1&&1/title/全 集 計 日/nl/検 針 件 数/nl/[/t/10000/t/件 ]/nl/ガ ス 使 用 量/nl/[/t/200/t/m3 ]/nl/ガ ス 料 金/nl/[/t/10000/t/件 ]/nl/消 費 税/nl/[/t/100000/t/円 ]/nl/還 元 額/nl/[/t/10000/t/円 ]/nl/合 計/nl/[/t/20000/t/円 ]/nl/入 金 件 数/nl/[/t/1000/t/円 ]/nl/入 金 額/nl/[/t/7000/t/円 ]/nl/調 整 額/nl/[/t/1000/t/円 ]/nl/");
    window.location.href = "kensinkun://";
    try {
        // window.location.href ="printer://";
        // window.open("scan://")
      }
      catch(err) {
        adddlert(err);
      }
}

function setInformation() {
    const inputValue = document.getElementsByClassName("inputValue");
    const inputValueEdit = document.getElementsByClassName("inputValueEdit");
    for (let i = 0; i < inputValue.length; i++) {
        console.log(inputValueEdit[i].value);
        let value = inputValueEdit[i].value;
        inputValue[i].innerHTML = value + " " + inputValue[i].textContent.trim();
    }
}


function hideView() {
    setInformation();
    document.getElementById("editView").style.display = "none";
    document.getElementById("printView").style.display = "block";
}

function backAction() {
    const inputValue = document.getElementsByClassName("inputValue");
    for (let i = 0; i < inputValue.length; i++) {
        let arr = inputValue[i].textContent.split(' ');
        if (arr.length > 1) {
            inputValue[i].innerHTML = arr[1];
        }
    }
    document.getElementById("printView").style.display = "none";
    document.getElementById("editView").style.display = "block";
}