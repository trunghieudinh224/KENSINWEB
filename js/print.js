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


    console.log(getBrowserName());
    alert(getBrowserName());
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(prepareDataPrint());
    // navigator.clipboard.writeText("集　計　表&&1&&1/title/全 集 計 日/nl/検 針 件 数/nl/[/t/10000 /t/件 ]/nl/ガ ス 使 用 量/nl/[/t/200/t/m3 ]/nl/ガ ス 料 金/nl/[/t/10000/t/件 ]/nl/消 費 税/nl/[/t/100000/t/円 ]/nl/還 元 額/nl/[/t/10000/t/円 ]/nl/合 計/nl/[/t/20000/t/円 ]/nl/入 金 件 数/nl/[/t/1000/t/円 ]/nl/入 金 額/nl/[/t/7000/t/円 ]/nl/調 整 額/nl/[/t/1000/t/円 ]");
    window.location.href = "kensinkun://print&&0";
    try {
        // window.location.href ="printer://";
        // window.open("scan://")
    }
    catch (err) {
        adddlert(err);
    }
}

var titleSign = "/title/";
var titleSplit = "&&";
var lineSign = "/nl/";
var tabSign = "/t/";

//config
var textSize = ["0", "1"];
var textLayout = ["0", "1", "2"];

function prepareDataPrint() {
    let str = (document.getElementById("nameForm").innerText).trim() + titleSplit + "1" + titleSplit + "1" + titleSplit + "60" + titleSign +
        splitString(document.getElementById("Combobox").options[document.getElementById("Combobox").selectedIndex].innerText.trim()) + textLayout[0] + tabSign + textSize[0] + lineSign +
        prepareLine(document.getElementById("title1").innerText, document.getElementById("value1").value, document.getElementById("unit1").value) + lineSign +
        prepareLine(document.getElementById("title4").innerText, document.getElementById("value4").value, document.getElementById("unit4").value) + lineSign +
        prepareLine(document.getElementById("title3").innerText, document.getElementById("value3").value, document.getElementById("unit3").value) + lineSign +
        prepareLine(document.getElementById("title5").innerText, document.getElementById("value5").value, document.getElementById("unit5").value) + lineSign +
        prepareLine(document.getElementById("title6").innerText, document.getElementById("value6").value, document.getElementById("unit6").value) + lineSign +
        prepareLine(document.getElementById("title7").innerText, document.getElementById("value7").value, document.getElementById("unit7").value) + lineSign +
        prepareLine(document.getElementById("title2").innerText, document.getElementById("value2").value, document.getElementById("unit2").value) + lineSign +
        prepareLine(document.getElementById("title8").innerText, document.getElementById("value8").value, document.getElementById("unit8").value) + lineSign +
        prepareLine(document.getElementById("title9").innerText, document.getElementById("value9").value, document.getElementById("unit9").value);


    console.log(str);
    return str;
}

function prepareLine(subtile, value, unit) {
    let stringTitle = splitString(subtile) + tabSign + textLayout[0] + tabSign + textSize[0] + lineSign;
    let stringValue = splitString(subtile) + lineSign + "[" + tabSign + value + tabSign + unit + " ]" + tabSign + textLayout[0] + tabSign + textSize[0];
    let result = stringTitle +  stringValue;
    return result;
}

function splitString(title) {
    let arr = title.split("");
    let value = "";
    for (let i = 0; i < arr.length; i++) {
        if (i == 0) {
            value = value + arr[i]
        } else {
            value = value + " " + arr[i];
        }
    }
    return value;
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


const GOOGLE_VENDOR_NAME = 'Google Inc.';

function isOpera() {
    return Boolean(window.opr);
}

function isChromium() {
    return Boolean(window.chrome);
}

function getBrowserName() {
    const userAgent = window.navigator.userAgent;
    const vendor = window.navigator.vendor;
    switch (true) {
        case /Edge|Edg|EdgiOS/.test(userAgent):
            return 'Edge';
        case /OPR|Opera/.test(userAgent) && isOpera():
            return 'Opera';
        case /CriOS/.test(userAgent):
        case /Chrome/.test(userAgent) && vendor === GOOGLE_VENDOR_NAME && isChromium():
            return 'Chrome';
        case /Vivaldi/.test(userAgent):
            return 'Vivaldi';
        case /YaBrowser/.test(userAgent):
            return 'Yandex';
        case /Firefox|FxiOS/.test(userAgent):
            return 'Firefox';
        case /Safari/.test(userAgent):
            return 'Safari';
        case /MSIE|Trident/.test(userAgent):
            return 'Internet Explorer';
        default:
            return 'Unknown';
    }
}

function isChrome() {
    const name = getBrowserName();
    return name === 'Chrome';
}