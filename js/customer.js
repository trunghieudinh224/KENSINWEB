import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* customer data */
var cusDat = JSON.parse(sessionStorage.getItem(StringCS.CUSDAT));
/* customer detail data */
var cusDetailData;


/** 
    * SETUP DATEPICKER
*/
function setupDatePicker() {
    $(document).ready(function() {
        $("#jisshi-bi").datepicker({ 
            format: 'yyyy/mm/dd'
        });
        $("#jisshi-bi").on("change", function () {
            var fromdate = $(this).val();
        });
    }); 
}


/**
   * SET DEFAULT DATE
*/
function setDefaultDate() {
    document.getElementById("recentTime").innerText = "現在の日時：" + moment().format('YYYY/MM/DD HH:mm');
    document.getElementById("jisshi-bi").value = moment().format('YYYY/MM/DD');
}


/**
   * GET CUSTOMER INFORMATION
*/
function getInformation() {
    if (cusDat != null) {
        Common.setupModal("load", null, Mess.I00001, null, null);
        $.ajax({
            // url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_READDATA + StringCS.PR_KEY + "&cusrec=" + cusDat.cusrec + "&login_id=" + sessionStorage.getItem(StringCS.PASSWORD) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		    url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_READDATA + StringCS.PR_KEY + "&cusrec=" + cusDat.cusrec + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
            headers: {
                'Content-Type': StringCS.PR_CONTENT_TYPE
            },
            success: function (result) {
                cusDetailData = JSON.parse(result);
                if (cusDetailData != null) {
                    setInformation();
                }
                modal.style.display = "none";
            },
            error: function (jqXHR, exception) {
                console.log(exception);
                Common.setupModal("error", null, Mess.E00003, StringCS.OK, null);
            },
            timeout: ValueCS.VL_LONG_TIMEOUT
        });
    } else {
        // history.back();
    }
}


/**
   * SET CUSTOMER INFORMATION
*/
function setInformation() {
    if (cusDat != null) {
        document.getElementById("taishoo").innerHTML = cusDat.taishoo;
        document.getElementById("kokyaku_kodo").innerHTML = cusDat.kcode.trim();
        document.getElementById("kokyaku-mei").innerHTML = cusDat.name.trim();
        document.getElementById("juusho").innerHTML = cusDat.add_0.trim() + "\n" + cusDat.add_1.trim();
        document.getElementById("denwabango").innerHTML = cusDat.tel_0;
        document.getElementById("mtban").innerHTML = cusDetailData.kokfDat.mtban;
    }

    if (cusDetailData != null) {
        setCustomerDetail();
        getShuukei();
        getKyookyuu();
        getRyookin();
        if (cusDetailData.kokfDat.mark != null) {
            document.getElementById("mokuhyoo").innerHTML = cusDetailData.kokfDat.mark;
        }

        if (cusDetailData.koukanDat != null) {
            showKenshinJoohoo();
            showHaisooJoohoo();
        } 

        showMemo();
        
        if (document.getElementById("kenshin-joohoo-area").style.display == "none" &&
            document.getElementById("kenshin-haisoo-area").style.display == "none" &&
            document.getElementById("memo-area").style.display == "none") {
            document.getElementsByClassName("card-2")[0].style.display = "none";
        }
    }
}


/**
   * SET CUSTOMER DETAIL INFORMATION
*/
function setCustomerDetail() {
    if (cusDetailData.kokfDat.ccode != null) {
        var ccodeList = document.getElementsByClassName("ccode");
        for (var i = 0; i < ccodeList.length; i++) {
            ccodeList[i].innerHTML = cusDetailData.kokfDat.mCCode[i];
        }
    }

    if (cusDetailData.kokfDat.juncd != null) {
        var juncdList = document.getElementsByClassName("juncd");
        for (var i = 0; i < juncdList.length; i++) {
            juncdList[i].innerHTML = cusDetailData.kokfDat.mJunCd[i];
        }
    }
}



/**
   * SET SHUUKEI DATA
*/
function getShuukei() {
    var shuukei = "";
    let listSyuku = cusDetailData.lstShuku;

    for (var idx = 0; idx < listSyuku.length; idx++) {
        if (listSyuku[idx].code == cusDetailData.kokfDat.mShuku) {
            shuukei = listSyuku[idx].name.trim();
            break;
        }
    }

    if (cusDetailData.kokfDat.mShuku == 0 || cusDetailData.kokfDat.mShuku == 4 || cusDat.m_nBkcd != 0) {
        if (cusDetailData.kokfDat.fkin != 0) {
            shuukei = "依頼中";
        } else {
            shuukei = formatShuku(cusDat.bkcd);
        }
    }
    document.getElementById("shuukei-mei").innerHTML = shuukei;
}



/**
   * FORMAT SHUKU DATA
   * @param value     [INT]
*/
function formatShuku(value) {
    var result = "銀";
    if (value.toString().length == 1) {
        result = result + "00" + value.toString();
    } else if (value.toString().length == 2) {
        result = result + "0" + value.toString();
    } else {
        result = result + value.toString();
    }
    return result;
}


/**
   * SET KYOOKYUU DATA
*/
function getKyookyuu() {
    var result = "";
    switch (cusDetailData.kokfDat.mSupplyForm) {
        case 1:
            result = "一般";
            break;
        case 2:
            result = "供給親";
            break;
        case 3:
            result = "供給子";
            break;
        default:
            result = "";
    }
    document.getElementById("kyookyuu").innerHTML = result;
}


/**
   * SET KENSHIN JOOHOO DATA
*/
function showKenshinJoohoo() {
    if (cusDetailData.koukanDat.HN_DENCNT > 0) {
        document.getElementById("kenshin-joohoo-area").style.display = "block";
        document.getElementById("kenshin-bii").innerText = String(cusDetailData.koukanDat.HN_DENYMD).substring(0, 10).replaceAll("-", "/");
        document.getElementById("shishin").innerText = cusDetailData.koukanDat.HN_SISIN;
        document.getElementById("shiyoo-ryoo").innerText = cusDetailData.koukanDat.HN_SIYOURYO;
        document.getElementById("gasu-ryookin").innerText = cusDetailData.hndenpyoDat.zkn_kin;
    } else {
        document.getElementById("kenshin-joohoo-area").style.display = "none";
    }
}


/**
   * SET HAISOO JOOHOO DATA
*/
function showHaisooJoohoo() {
    if (cusDetailData.koukanDat.HA_DENCNT > 0) {
        document.getElementById("kenshin-haisoo-area").style.display = "block";
        document.getElementById("haisoo-bi").innerText = String(cusDetailData.koukanDat.HA_DENYMD).substring(0, 10).replaceAll("-", "/");
        document.getElementById("haisoo-shishin").innerText = cusDetailData.koukanDat.HA_SISIN;
        document.getElementById("haisoo-shiyoo-ryoo").innerText = cusDetailData.koukanDat.HA_SIYOURYO;
    } else {
        document.getElementById("kenshin-haisoo-area").style.display = "none";
    }
}


/**
   * SET MEMO DATA
*/
function showMemo() {
    if (cusDetailData.kokfDat.memo != null) {
        if (cusDetailData.kokfDat.memo.length > 0) {
            document.getElementById("memo-area").style.display = "block";
            var valueMemo = "";
            for (var i = 0; i < cusDetailData.kokfDat.memo.length; i++) {
                valueMemo = valueMemo + cusDetailData.kokfDat.memo[i] + "\n";
            }
            document.getElementById("memo-naiyoo").innerText = valueMemo;
        } else {
            document.getElementById("memo-area").style.display = "none";
        }
    } else {
        document.getElementById("memo-area").style.display = "none";
    }
}


/**
   * SET RYOOKIN DATA
*/
function getRyookin() {
    if (cusDetailData.kokfDat.mGasDiv == 0) {
        document.getElementById("ryookin").innerHTML = "未設定";
        return;
    }
    var result = "";
    switch (cusDetailData.kokfDat.mSum) {
        case 0:
            result = "未設定";
            break;
        case 1:
            result = "通常";
            break;
        case 2:
            result = "簡ガス";
            break;
        case 3:
            result = "契約";
            break;
        case 4:
            result = "手入力";
            break;
        default:
            result = "";
            break;
    }
    result = result + ":" + cusDetailData.kokfDat.mGasDiv;
    document.getElementById("ryookin").innerHTML = result;
}


/**
   * MOVE TO KINYUU PAGE WITH MODE
*/
function kinyuuMove(mode) {
    var kensinDate = document.getElementById("jisshi-bi").value;
    sessionStorage.setItem(StringCS.KENSINDATE, String(kensinDate));
    Common.movePage('/meter_reading_fillout_page.html');
    sessionStorage.setItem(StringCS.KINYUUMODE, mode);
}


/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("menuOption").onclick = function() {Common.movePage('/menu_page.html')};
    document.getElementById("settingOption").onclick = function() {Common.movePage('/setting_page.html')};
    document.getElementById("logoutOption").onclick = function() {Common.movePage('logout')};
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
	document.getElementById("backPageButton").onclick = Common.backAction;
	document.getElementById("nyuukinButton").onclick = function() { kinyuuMove(3);};
	document.getElementById("jikkoButton").onclick = function() { kinyuuMove(1);};
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    setOptionMenu();
    setupDatePicker();
    setDefaultDate();
    getInformation();
	onclickAction();
}


window.onload = onLoadAction;
