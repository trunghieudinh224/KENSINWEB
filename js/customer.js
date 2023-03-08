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
/** list customer */
var cusList = JSON.parse(sessionStorage.getItem(StringCS.CUSTLIST))
/** search mode */
var searchMode = sessionStorage.getItem(StringCS.SEARCHMODE);


/** 
    * SETUP DATEPICKER
*/
function setupDatePicker() {
    $(document).ready(function () {
        $(function () {
            $.datepicker.regional['jp'] = {
                closeText: "閉じる",
                prevText: "前",
                nextText: "次",
                currentText: "現在",
                monthNames: ["- 1月", "- 2月", "- 3月", "- 4月", "- 5月", "- 6月",
                    "- 7月", "- 8月", "- 9月", "- 10月", "- 11月", "- 12月"
                ],
                monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月",
                    "7月", "8月", "9月", "10月", "11月", "12月"
                ],
                dayNames: ["日", "月", "火", "水", "木", "金", "土"],
                dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
                dayNamesMin: ["日", "月", "火", "水", "木", "金", "土"],
                dateFormat: "yy/mm/dd",
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
            };
            $.datepicker.setDefaults($.datepicker.regional['jp']);

            $('#jisshi-bi').datepicker();
            Common.setupDatePicker("jisshi-bi");
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


        $('#jisshi-bi').change(function () {
            recentDay = moment($(this).val()).format('YYYY/MM/DD');
            var kensinDate = recentDay;
            sessionStorage.setItem(StringCS.KENSINDATE, String(kensinDate));
            mUserData.mKensinDate = String(kensinDate);
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
                    $('.collapseOne').collapse();
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
            $('.collapseOne').collapse();
        }
    }
}


/**
   * SET CUSTOMER INFORMATION
*/
function setInformation() {
    if (cusDat != null) {
        if (cusDat.taishoo != null) {
            document.getElementById("taishoo").innerHTML = cusDat.taishoo;
        } else {
            document.getElementById("taishooArea").style.display = "none";
            document.getElementById("taishooArea").classList.remove('col-sm-12');
            document.getElementById("taishooArea").classList.remove('col-md-6');
            document.getElementById("taishooArea").classList.remove('col-lg-6');
            document.getElementById("taishooArea").classList.remove('col-xl-6');
            document.getElementById("jisshiBiArea").classList.remove('col-sm-12');
            document.getElementById("jisshiBiArea").classList.remove('col-md-6');
            document.getElementById("jisshiBiArea").classList.remove('col-lg-6');
            document.getElementById("jisshiBiArea").classList.remove('col-xl-6');
        }
        if (searchMode == "3") {
            document.getElementById("barcode").innerHTML = Other.cutStringSpace(cusDat.barcd);
        } else {
            document.getElementById("barcodeArea").style.display = "none";
        }

        if (Other.nullToString(cusDat.kcode) != "") {
            document.getElementById("kokyaku_kodo").innerHTML = Other.cutStringSpace(cusDat.kcode);
        }
        if (Other.nullToString(cusDat.name) != "") {
            document.getElementById("kokyaku-mei").innerHTML = Other.cutStringSpace(cusDat.name);
        }
        if (Other.nullToString(cusDat.add_0) != "" || Other.nullToString(cusDat.add_1) != "") {
            document.getElementById("kokyaku-mei").innerHTML = Other.cutStringSpace(cusDat.name);
            document.getElementById("juusho").innerHTML = Other.cutStringSpace(Other.nullToString(cusDat.add_0))
                + "\n"
                + Other.cutStringSpace(Other.nullToString(cusDat.add_1));
        }
        document.getElementById("denwabango").innerHTML = Other.nullToString(cusDat.tel_0);
        document.getElementById("mtban").innerHTML = Other.nullToString(cusDetailData.mKokfDat.mtban);
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
        jikkoBtn.classList.remove("disabled-div");
    } else {
        jikkoBtn.disabled = true;
        jikkoBtn.classList.add("disabled-div");
    }

    var toyuBtn = document.getElementById("toyuPageButton");
    if (cusDetailData.mSysfDat.m_isToyukensinFlg == true) {
        if (mUserData.mKokfDat.mKotfDat.m_bNo_kensin == 0) {
            toyuBtn.disabled = false;
            if (toyuBtn.classList.contains("disabled-div")) {
                toyuBtn.classList.remove("disabled-div");
            }
        } else {
            toyuBtn.disabled = true;
            toyuBtn.classList.add("disabled-div");
        }
    } else {
        if (document.getElementById("toyuPageButtonArea") != null) {
            document.getElementById("toyuPageButtonArea").remove();
        }
    }

    if (cusList == null || cusList.length <= 1) {
        document.getElementById("previousButtonArea").remove();
        document.getElementById("nextButtonArea").remove();
    }

    var isEnabled = cusDetailData.mKokfDat.mSupplyForm != 2;
    document.getElementById("uriageButton").disabled = !isEnabled;
    document.getElementById("nyuukinButton").disabled = !isEnabled;
    if (!isEnabled == true) {
        document.getElementById("uriageButton").classList.add("disabled-div");
        document.getElementById("nyuukinButton").classList.add("disabled-div");
    } else {
        if (document.getElementById("uriageButton").classList.contains("disabled-div")) {
            document.getElementById("uriageButton").classList.remove("disabled-div");
        }
        if (document.getElementById("nyuukinButton").classList.contains("disabled-div")) {
            document.getElementById("nyuukinButton").classList.remove("disabled-div");
        }
    }
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
   * GET PREVIOUS/NEXT CUSTOMER'S DATA
   * @param isPrevious     [BOOLEAN]
*/
function getCustomer(isPrevious) {
    var index = 0;
    if (sessionStorage.getItem(StringCS.CUSTOMERINDEX) != null) {
        index = parseInt(sessionStorage.getItem(StringCS.CUSTOMERINDEX));
    }

    if (isPrevious) {
        if (index == 0) {
            index = cusList.length - 1;
        } else {
            index--;
        }
    } else {
        if (index == cusList.length - 1) {
            index = 0;
        } else {
            index++;
        }
    }


    var object = cusList[index];
    sessionStorage.setItem(StringCS.CUSTOMERINDEX, index);
    object.taishoo = cusDat.taishoo;
    sessionStorage.setItem(StringCS.CUSDAT, JSON.stringify(object));
    cusDat = object;
    getInformation();
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
    document.getElementById("backPageButton").onclick = function () {
        if (searchMode == "3") {
            Common.movePage('/menu.html');
        } else {
            Common.movePage('/search_customer.html');
        }
    };
    document.getElementById("uriageButton").onclick = function () {
        Common.movePage('/product_search.html');
    };
    document.getElementById("nyuukinButton").onclick = function () { kinyuuMove(3); };
    document.getElementById("jikkoButton").onclick = function () { kinyuuMove(1); };
    document.getElementById("toyuPageButtonArea").onclick = function () {
        saveUserData();
        Common.movePage('/kerosene.html')
    };


    if (cusList != null && cusList.length > 1) {
        document.getElementById("previousButton").onclick = function () {
            getCustomer(true)
        };

        document.getElementById("nextButton").onclick = function () {
            getCustomer(false)
        };
    }
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    setOptionMenu();
    setupDatePicker();
    setDefaultDate();
    if (sessionStorage.getItem(StringCS.DIRECTIONDATA) == "1") {
        sessionStorage.removeItem(StringCS.DIRECTIONDATA);
        getCustomer(false);
    } else {
        getInformation();
    }
    onclickAction();
}


window.onload = onLoadAction;
