import * as Common from './Common/common_function.js'
import * as Other from './Common/other_util.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'
import * as Dat from './Dat/dat.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* customer data */
var cusDat = JSON.parse(sessionStorage.getItem(StringCS.CUSDAT));
/* customer detail data */
var cusDetailData = JSON.parse(sessionStorage.getItem(StringCS.CUSDETAILDATA));
/* ユーザー情報 */ 
var mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));
/** recent day */ 
var recentDay = moment().format('YYYY/MM/DD');


/** 
    * SETUP DATEPICKER
*/
function setupDatePicker() {
    $(document).ready(function () {
        $("#jisshi-bi").datepicker({
            format: 'yyyy/mm/dd',
            onSelect: function(dateText) {
                console.log("Selected date: " + dateText + "; input's current value: " + this.value);
            }
        });
    });

    $("#jisshi-bi").focus(function () {
        recentDay = moment($(this).val()).format('YYYY/MM/DD');
    });
    $("#jisshi-bi").focusout(function () {
        if ($(this).val() == "") {
            document.getElementById("jisshi-bi").value = moment(recentDay).format('YYYY/MM/DD');
            var kensinDate = recentDay;
            sessionStorage.setItem(StringCS.KENSINDATE, String(kensinDate));
            mUserData.mKensinDate = String(kensinDate);
        }
    });


    $('#jisshi-bi').change(function(){
        recentDay = moment($(this).val()).format('YYYY/MM/DD');
        var kensinDate = recentDay;
        sessionStorage.setItem(StringCS.KENSINDATE, String(kensinDate));
        mUserData.mKensinDate = String(kensinDate);
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
        Common.setupModal("load", null, Mess.I00001, null, null, null, false);
        console.log(cusDat.cusrec);
        $.ajax({
            url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_READDATA + StringCS.PR_KEY + "&cusrec=" + cusDat.cusrec + "&htset=" + sessionStorage.getItem(StringCS.HTSETDATCODE) + "&login_id=" + sessionStorage.getItem(StringCS.PASSWORD) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
            // url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_READDATA + StringCS.PR_KEY + "&cusrec=" + cusDat.cusrec + "&htset=" + sessionStorage.getItem(StringCS.HTSETDATCODE) + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
            headers: {
                'Content-Type': StringCS.PR_CONTENT_TYPE
            },
            success: function (result) {
                cusDetailData = JSON.parse(result);
                sessionStorage.setItem(StringCS.CUSDETAILDATA, JSON.stringify(cusDetailData));
                mUserData = new Dat.UserData().parseData(cusDetailData);
                mUserData.mKokfDat.mUrikin = Common.calcValOfList(mUserData.mHmefList, "mKin");
                mUserData.mKokfDat.mUriTax = Common.calcValOfList(mUserData.mHmefList, "mTax");
                if (sessionStorage.getItem(StringCS.KENSINDATE) == null) {
                    var kensinDate = document.getElementById("jisshi-bi").value;
                    sessionStorage.setItem(StringCS.KENSINDATE, String(kensinDate));
                    mUserData.mKensinDate = String(kensinDate);
                } else {
                    var kensinDate = sessionStorage.getItem(StringCS.KENSINDATE);
                    document.getElementById("jisshi-bi").value = kensinDate;
                    mUserData.mKensinDate = String(kensinDate);
                }
                saveUserData();
                modal.style.display = "none";

                if (cusDetailData != null) {
                    setInformation();
                }
            },
            error: function (jqXHR, exception) {
                console.log(exception);
                Common.setupModal("error", null, Mess.E00003, StringCS.OK, null, null, false);
            },
            timeout: ValueCS.VL_LONG_TIMEOUT
        });
    } else {
        if (cusDetailData != null) {
            setInformation();
        }
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
        document.getElementById("mtban").innerHTML = cusDetailData.mKokfDat.mtban;
    }

    if (cusDetailData != null) {
        setCustomerDetail();
        getShuukei();
        getKyookyuu();
        getRyookin();
        if (cusDetailData.mKokfDat.mark != null) {
            document.getElementById("mokuhyoo").innerHTML = cusDetailData.mKokfDat.mark;
        }

        if (cusDetailData.mKoukanDat != null) {
            showKenshinJoohoo();
            showHaisooJoohoo();
        } else {
            document.getElementById("kenshin-joohoo-area").style.display = "none";
            document.getElementById("kenshin-haisoo-area").style.display = "none";
        }

        showMemo();

        if (document.getElementById("kenshin-joohoo-area").style.display == "none" &&
            document.getElementById("kenshin-haisoo-area").style.display == "none" &&
            document.getElementById("memo-area").style.display == "none") {
            document.getElementsByClassName("card-2")[0].style.display = "none";
        }
    }


    var jikkoBtn = document.getElementById("jikkoButton");
    if (cusDetailData.mKokfDat.mNoKensin == 0) {
        jikkoBtn.disabled = false;
    } else {
        jikkoBtn.disabled = true;
    }

    var toyuBtn = document.getElementById("toyuPageButton");
    if (cusDetailData.mSysfDat.m_isToyukensinFlg == true) {
        toyuBtn.disabled = false;
    } else {
        document.getElementById("toyuPageButtonArea").remove();
        document.getElementById("uriageButtonArea").className = "col-6";
        document.getElementById("nyuukinButtonArea").className = "col-6";
    }

    var isEnabled = cusDetailData.mKokfDat.mSupplyForm != 2;
    document.getElementById("uriageButton").disabled = !isEnabled;
    document.getElementById("nyuukinButton").disabled = !isEnabled;
}


/**
   * SET CUSTOMER DETAIL INFORMATION
*/
function setCustomerDetail() {
    if (cusDetailData.mKokfDat.mCCode != null) {
        var ccodeList = document.getElementsByClassName("ccode");
        for (var i = 0; i < ccodeList.length; i++) {
            ccodeList[i].innerHTML = cusDetailData.mKokfDat.mCCode[i];
        }
    }

    if (cusDetailData.mKokfDat.mJunCd != null) {
        var juncdList = document.getElementsByClassName("juncd");
        for (var i = 0; i < juncdList.length; i++) {
            juncdList[i].innerHTML = cusDetailData.mKokfDat.mJunCd[i];
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
        if (listSyuku[idx].code == cusDetailData.mKokfDat.mShuku) {
            shuukei = listSyuku[idx].name.trim();
            break;
        }
    }

    if (cusDetailData.mKokfDat.mShuku == 0 || cusDetailData.mKokfDat.mShuku == 4 || cusDetailData.mKokfDat.mBankCode != 0) {
        if (cusDetailData.mKokfDat.fkin != 0) {
            shuukei = "依頼中";
        } else {
            shuukei = formatShuku(cusDetailData.mKokfDat.mBankCode);
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
    switch (cusDetailData.mKokfDat.mSupplyForm) {
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
    if (parseInt(cusDetailData.mKoukanDat.HN_DENCNT) > 0) {
        document.getElementById("kenshin-joohoo-area").style.display = "block";
        document.getElementById("kenshin-bii").innerText = String(cusDetailData.mKoukanDat.HN_DENYMD).substring(0, 10).replaceAll("-", "/");
        document.getElementById("shishin").innerText = Other.Format(cusDetailData.mKoukanDat.HN_SISIN, 1);
        document.getElementById("shiyoo-ryoo").innerText = Other.Format(cusDetailData.mKoukanDat.HN_SIYOURYO, 1);
        document.getElementById("gasu-ryookin").innerText = Other.formatDecial(cusDetailData.mHndenpyoDat.zkn_kin);
    } else {
        document.getElementById("kenshin-joohoo-area").style.display = "none";
    }
}


/**
   * SET HAISOO JOOHOO DATA
*/
function showHaisooJoohoo() {
    if (parseInt(cusDetailData.mKoukanDat.HA_DENCNT) > 0) {
        document.getElementById("kenshin-haisoo-area").style.display = "block";
        document.getElementById("haisoo-bi").innerText = String(cusDetailData.mKoukanDat.HA_DENYMD).substring(0, 10).replaceAll("-", "/");
        document.getElementById("haisoo-shishin").innerText = Other.Format(cusDetailData.mKoukanDat.HA_SISIN, 1);
        document.getElementById("haisoo-shiyoo-ryoo").innerText = Other.Format(cusDetailData.mKoukanDat.HA_SIYOURYO, 1);
    } else {
        document.getElementById("kenshin-haisoo-area").style.display = "none";
    }
}


/**
   * SET MEMO DATA
*/
function showMemo() {
    if (cusDetailData.mKokfDat.memo != null) {
        if (cusDetailData.mKokfDat.memo.length > 0) {
            document.getElementById("memo-area").style.display = "block";
            var valueMemo = "";
            for (var i = 0; i < cusDetailData.mKokfDat.memo.length; i++) {
                valueMemo = valueMemo + cusDetailData.mKokfDat.memo[i] + "\n";
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
    if (cusDetailData.mKokfDat.mGasDiv == 0) {
        document.getElementById("ryookin").innerHTML = "未設定";
        return;
    }
    var result = "";
    switch (cusDetailData.mKokfDat.mSum) {
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
    result = result + ":" + cusDetailData.mKokfDat.mGasDiv;
    document.getElementById("ryookin").innerHTML = result;
}


/**
   * MOVE TO KINYUU PAGE WITH MODE
*/
function kinyuuMove(mode) {
    saveUserData();
    sessionStorage.setItem(StringCS.KINYUUMODE, mode);
    Common.movePage('/meter_reading_fillout.html');
}


/**
   * SAVE USERDATA
*/
function saveUserData() {
    var kensinDate = document.getElementById("jisshi-bi").value;
    sessionStorage.setItem(StringCS.KENSINDATE, String(kensinDate));
    mUserData.mKensinDate = String(kensinDate);
    sessionStorage.setItem(StringCS.USERDATA, JSON.stringify(mUserData));
}


/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("menuOption").onclick = function () { Common.movePage('/menu.html') };
    document.getElementById("settingOption").onclick = function () { Common.movePage('/setting.html') };
    document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("backPageButton").onclick = Common.backAction;
    document.getElementById("uriageButton").onclick = function () { 
        Common.movePage('/product_search.html');
    };
    document.getElementById("nyuukinButton").onclick = function () { kinyuuMove(3); };
    document.getElementById("jikkoButton").onclick = function () { kinyuuMove(1); };
    document.getElementById("toyuPageButtonArea").onclick = function () { 
        saveUserData();
        Common.movePage('/kerosene.html') 
    };
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
