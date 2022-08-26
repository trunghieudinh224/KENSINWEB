function checkLogin() {
    // var data = sessionStorage.getItem('username');
    // if (data == null || data == '') {
    //     window.location.href = "/login_page.html";
    // } else {
    //     document.getElementById("userName").textContent = data;
    // }
}
window.onload = checkLogin;


// function generatePDF() {
    // window.scrollTo(0, 0);
    // setTimeout(function () {
    //     const element = document.getElementById("finalForm");

    //     var opt = {
    //         margin: 0,
    //         filename: 'myfile.pdf',
    //         image: { type: 'jpeg', quality: 0.98 },
    //         html2canvas: { scale: 1 },
    //         jsPDF: { unit: 'in', format: 'a6', orientation: 'portrait' },
    //         pageBreak: { mode: 'css', after:'.break-page'}
    //     };

    //     // New Promise-based usage:
    //     html2pdf().from(element).set(opt).save();
    // }, 1000);

    // notificationLogin?.classList.add("show");
// }


function sendCharacter() {
    console.log(getBrowserName());
    navigator.clipboard.writeText(prepareDataPrint());
    // navigator.clipboard.writeText("集　計　表&&1&&1/title/全 集 計 日/nl/検 針 件 数/nl/[/t/10000 /t/件 ]/nl/ガ ス 使 用 量/nl/[/t/200/t/m3 ]/nl/ガ ス 料 金/nl/[/t/10000/t/件 ]/nl/消 費 税/nl/[/t/100000/t/円 ]/nl/還 元 額/nl/[/t/10000/t/円 ]/nl/合 計/nl/[/t/20000/t/円 ]/nl/入 金 件 数/nl/[/t/1000/t/円 ]/nl/入 金 額/nl/[/t/7000/t/円 ]/nl/調 整 額/nl/[/t/1000/t/円 ]");
    
    try {
        window.location.href = "printermarutou://print&&0";
    }
    catch (err) {
        adddlert(err);
    }
}

var titleSign = "/title/";
var titleSplit = "&&";
var lineSign = "/nl/";
var tabSign = "/t/";
var spaceItem = " ";
var titleDistance = "60";
var subTitleDistance = "4";
var lineDistance = "2";

//config
var textSize = ["0", "1"];
var textLayout = ["0", "1", "2"];

function prepareDataPrint() {
    let str = (document.getElementById("nameForm").innerText).trim() + titleSplit + "1" + titleSplit + "1" + titleSplit + titleDistance + titleSign +
        splitString(document.getElementById("Combobox").options[document.getElementById("Combobox").selectedIndex].innerText.trim()) + tabSign + textLayout[0] + tabSign + textSize[0] + tabSign + subTitleDistance + lineSign +
        prepareLine(document.getElementById("title1").innerText, document.getElementById("value1").value.trim().length == 0 ? "0" : document.getElementById("value1").value.trim(), document.getElementById("unit1").innerText.trim()) + lineSign +
        prepareLine(document.getElementById("title4").innerText, document.getElementById("value4").value.trim().length == 0 ? "0" : document.getElementById("value4").value.trim(), document.getElementById("unit4").innerText.trim()) + lineSign +
        prepareLine(document.getElementById("title3").innerText, document.getElementById("value3").value.trim().length == 0 ? "0" : document.getElementById("value3").value.trim(), document.getElementById("unit3").innerText.trim()) + lineSign +
        prepareLine(document.getElementById("title5").innerText, document.getElementById("value5").value.trim().length == 0 ? "0" : document.getElementById("value5").value.trim(), document.getElementById("unit5").innerText.trim()) + lineSign +
        prepareLine(document.getElementById("title6").innerText, document.getElementById("value6").value.trim().length == 0 ? "0" : document.getElementById("value6").value.trim(), document.getElementById("unit6").innerText.trim()) + lineSign +
        prepareLine(document.getElementById("title7").innerText, document.getElementById("value7").value.trim().length == 0 ? "0" : document.getElementById("value7").value.trim(), document.getElementById("unit7").innerText.trim()) + lineSign +
        prepareLine(document.getElementById("title2").innerText, document.getElementById("value2").value.trim().length == 0 ? "0" : document.getElementById("value2").value.trim(), document.getElementById("unit2").innerText.trim()) + lineSign +
        prepareLine(document.getElementById("title8").innerText, document.getElementById("value8").value.trim().length == 0 ? "0" : document.getElementById("value8").value.trim(), document.getElementById("unit8").innerText.trim()) + lineSign +
        prepareLine(document.getElementById("title9").innerText, document.getElementById("value9").value.trim().length == 0 ? "0" : document.getElementById("value9").value.trim(), document.getElementById("unit9").innerText.trim());


    console.log(str);
    return str;
}


var coordinate0 = "2";
var coordinate1 = "34";
var maxLength13 = "13";
var maxLength14 = "14";
function prepareLine(subtile, value, unit) {
    let stringTitle = splitString(subtile) + tabSign + textLayout[0] + tabSign + textSize[0] + tabSign + subTitleDistance + lineSign;
    let stringValue = "[" + tabSign + value + spaceItem + unit + " ]" + tabSign + coordinate0 + tabSign + coordinate1 + tabSign + (value.includes("m3") ? maxLength14 : maxLength13) + tabSign + textLayout[0] + tabSign + textSize[0] + tabSign + lineDistance;
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
        let value = inputValueEdit[i].value.trim().length == 0 ? "0" : inputValueEdit[i].value.trim();
        inputValue[i].innerHTML = value + " " + inputValue[i].textContent.trim();
    }
}


function hideView() {
    setInformation();
    document.getElementById("editView").style.display = "none";
    document.getElementById("printView").style.display = "block";
    createImage();
    window.scrollTo(0, 0);
}

function backAction() {
    document.getElementById("closeButton").style.display = "none";
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



function sendCharacter2() {
    // console.log(getBrowserName());
    let value = "領　収　書&&1&&1&&10/title/発行日　　2022年　3月 1日/t/0/t/0/t/4/nl/s-rectangle/t/-1/t/0/t/573/t/1/t/5/t/10/nl/コード：　5015/t/0/t/0/t/2/nl/ディン ツーン ヒエウ/t/様/t/2/t/34/t/11/t/0/t/0/t/2/nl/Vo Van Kiet Q8/t/0/t/0/t/2/nl/e-rectangle/t/-1/t/0/t/573/t/1/t/10/t/10/nl/s-rectangle/t/-1/t/0/t/573/t/0/t/5/t/10/nl/今回請求額/t/0円/t/2/t/12/t/11/t/0/t/1/t/2/nl/調整額/t/100円/t/2/t/34/t/11/t/0/t/0/t/2/nl/本日入金額/t/6円/t/2/t/34/t/11/t/0/t/0/t/2/nl/e-rectangle/t/-1/t/0/t/573/t/0/t/10/t/1/nl/s-rectangle/t/-1/t/0/t/573/t/0/t/5/t/10/nl/差引残高/t/94円/t/2/t/12/t/12/t/0/t/1/t/2/nl/e-rectangle/t/-1/t/0/t/573/t/1/t/10/t/10/nl/ryoshu/spf/6円/t/50/t/10/t/0/t/100/t/400/t/173/t/70/t/180/nl/s-rectangle/t/-1/t/0/t/573/t/1/t/10/t/10/nl/コード：　5015/t/0/t/0/t/2/nl/コード：　5015/t/0/t/0/t/2/nl/e-rectangle/t/-1/t/0/t/573/t/1/t/10/t/0/nl/s-rectangle/t/-1/t/0/t/573/t/1/t/10/t/10/nl/Tel 999-0001/t/(担当)/t/2/t/28/t/0/t/0/t/0/t/2/nl/Fax /t/Hieu ne/t/2/t/28/t/0/t/0/t/0/t/2/nl/e-rectangle/t/-1/t/0/t/573/t/1/t/10/t/20";
    navigator.clipboard.writeText(value);
    try {
        window.location.href = "printermarutou://print&&0";
    }
    catch (err) {
        adddlert(err);
    }
}

function sendCharacter3() {
    // console.log(getBrowserName());
    let value = "検針伝票 (兼　領収書)&&1&&1&&10/title/" +
                        "毎度ありがとうございます。/t/1/t/0/t/2/nl/" +
                        "今月の検針は次の通りです。/t/1/t/0/t/2/nl/" +
                        "検針日　　2022年　3月 1日/t/0/t/0/t/4/nl/" +

                        "s-rectangle/t/-1/t/0/t/573/t/1/t/5/t/6/nl/" +
                        "コード：　5015/t/0/t/0/t/2/nl/" +
                        "ディン ツーン ヒエウ/t/様/t/2/t/34/t/11/t/0/t/0/t/2/nl/" +
                        "  Vo Van Kiet Q8/t/0/t/0/t/2/nl/" +
                        "e-rectangle/t/-1/t/0/t/573/t/1/t/10/t/6/nl/" +

                        "s-rectangle/t/-1/t/0/t/573/t/0/t/5/t/0/nl/" +
                        "今回指針/t/102.8　　 /t/2/t/34/t/11/t/0/t/0/t/2/nl/" +
                        "前回指針( 2/22)/t/52.8　　 /t/2/t/34/t/11/t/0/t/0/t/2/nl/" +
                        "使用量/t/50.0 m3/t/2/t/34/t/11/t/0/t/0/t/2/nl/" +
                        "e-rectangle/t/-1/t/0/t/573/t/0/t/10/t/0/nl/" +

                        "s-rectangle/t/-1/t/0/t/573/t/0/t/5/t/0/nl/" +
                        "前回使用量/t/50.0 m3/t/2/t/34/t/11/t/0/t/0/t/2/nl/" +
                        "e-rectangle/t/-1/t/0/t/573/t/0/t/10/t/0/nl/" +

                        "s-rectangle/t/-1/t/0/t/573/t/1/t/5/t/0/nl/" +
                        "ガス料金/t/35,310円/t/2/t/34/t/11/t/0/t/0/t/2/nl/" +
                        "e-rectangle/t/-1/t/0/t/573/t/1/t/10/t/0/nl/" +

                        "s-rectangle/t/-1/t/0/t/573/t/1/t/5/t/10/nl/" +
                        "ガス料金総額/t/35,310円/t/2/t/34/t/11/t/0/t/0/t/2/nl/" +
                        "e-rectangle/t/-1/t/0/t/573/t/1/t/10/t/0/nl/" +

                        "s-rectangle/t/-1/t/0/t/573/t/0/t/5/t/0/nl/" +
                        "今回請求額/t/35,310円/t/2/t/12/t/11/t/0/t/1/t/2/nl/" +
                        "調整額/t/100円/t/2/t/34/t/11/t/0/t/0/t/2/nl/" +
                        "本日入金額/t/35,410円/t/2/t/34/t/11/t/0/t/0/t/2/nl/" +
                        "e-rectangle/t/-1/t/0/t/573/t/0/t/10/t/0/nl/" +

                        "s-rectangle/t/-1/t/0/t/573/t/1/t/3/t/1/nl/" +
                        "ガス売上には3,210円の消費税が含まれます。/t/0/t/0/t/2/nl/" +
                        "e-rectangle/t/-1/t/0/t/573/t/1/t/10/t/5/nl/" +

                        "table/spf/" +
                        "0/tbnl/" +
                        "ガス料金内訳（消費税込み)/t/0/t/0/t/2/t/10/tbnl/" +
                        "0/t/573/t/0/tbnl/" +
                        "基本料金/t/1,760円  /t/13/t/ 0/t/0/t/true/t/2/t/34/t/12/tbnl/" +
                        "0/t/385/t/573/t/0/tbnl/" +
                        "従量料金/t/0/t/0/t/2/t/true/tbnl/" +
                        "0.1→   10.0m3 単価 693.00円/t/6,930円  /t/2/t/34/t/26/t/13/t/0/t/0/t/2/t/true/tbnl/" +
                        "10.1→   20.0m3 単価 682.00円/t/6,820円  /t/2/t/34/t/26/t/13/t/0/t/0/t/2/t/true/tbnl/" +
                        "20.1→   30.0m3 単価 671.00円/t/6,710円  /t/2/t/34/t/26/t/13/t/0/t/0/t/2/t/true/tbnl/" +
                        "40.1→99999.9m3 単価 649.00円/t/6,290円  /t/2/t/34/t/26/t/13/t/0/t/0/t/2/t/true/tbnl/" +
                        "rectangle12/t/0/t/385/t/573/t/0/tbnl/" +
                        "合計/t/35,310円  /t/2/t/34/t/0/t/13/t/0/t/0/t/2/t/true/tbnl/" +
                        "rectangle0/t/573/t/1/t/12/nl/" +

                        "ryoshu/spf/6円/t/50/t/0/t/13/t/100/t/400/t/173/t/70/t/180/nl/" +

                        "s-rectangle/t/-1/t/0/t/573/t/0/t/5/t/0/nl/" +
                        "* * * 保　安　点　検 * * */t/1/t/0/t/2/nl/" +
                        "①容器設置場所　　[O]/t/②容器設置状況　　[O]/t/2/t/25/t/0/t/0/t/0/t/2/nl/" +
                        "③火気禁止２ｍ　　[O]/t/④調整器　　　　　[O]/t/2/t/25/t/0/t/0/t/0/t/2/nl/" +
                        "⑤配管状況　　　　[O]/t/⑥ガス栓　　　　　[O]/t/2/t/25/t/0/t/0/t/0/t/2/nl/" +
                        "⑦危険標識　　　　[O]/t/⑧マイコンメーター[O]/t/2/t/25/t/0/t/0/t/0/t/2/nl/" +
                        "e-rectangle/t/-1/t/0/t/573/t/0/t/20/t/0/nl/" +

                        "　基準に適合しない場合には速やかに措置を/t/0/t/0/t/2/nl/" +
                        "　講じる必要があります。/t/0/t/0/t/15/nl/" +

                        "s-rectangle/t/-1/t/0/t/573/t/1/t/0/t/10/nl/" +
                        "コード：　5015/t/0/t/0/t/2/nl/" +
                        "コード：　5015/t/0/t/0/t/2/nl/" +
                        "e-rectangle/t/-1/t/0/t/573/t/1/t/20/t/0/nl/" +

                        "s-rectangle/t/-1/t/0/t/573/t/1/t/0/t/10/nl/" +
                        "Tel 999-0001/t/(担当)/t/2/t/28/t/0/t/0/t/0/t/2/nl/" +
                        "Fax /t/Hieu ne/t/2/t/28/t/0/t/0/t/0/t/2/nl/" +
                        "e-rectangle/t/-1/t/0/t/573/t/1/t/15/t/20";
    navigator.clipboard.writeText(value);
    try {
        window.location.href = "printermarutou://print&&0";
    }
    catch (err) {
        adddlert(err);
    }
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
    stringImage = stringImage.replace("data:image/png;base64,", "");
    navigator.clipboard.writeText(stringImage);
    try {
        window.location.href = "printermarutou://print&&1";
    }
    catch (err) {
        adddlert(err);
    }    
}


var stringImage = "";
function createImage() {
    setupFormPrint("100vh", "650px", "60px", "29px", "38px", "29px", "38px");
    domtoimage.toBlob(document.getElementById('finalForm'))
    .then(function(blob){
        // window.saveAs(blob, "output.pdf");
        console.log(blob)
        const interval = setInterval(function() {
            getBase64(blob).then(
                data => {
                    console.log(data)
                    stringImage = data

                    setupFormPrint("100%", "600px", "45px", "20px", "25px", "20px", "25px")
                    window.scrollTo(0, 0);
                    clearInterval(interval);
                    document.getElementById("closeButton").style.display = "block";
                }
            );
            // method to be executed;
            
          }, 10);
        
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