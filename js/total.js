import * as Common from './Common/common_function.js'
import * as Other from './Common/other_util.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'
import * as Dat from './Dat/dat.js'
import * as GasRaterCom from './Common/gasratercom.js'
class KokfDat {
  constructor() {
    /** 漢字氏名 */
    this.mName = "安藤　秀丸"; // NAME
    /** 検針月 */
    this.mKMonth = 5;
    /** 検針日 */
    this.mKDate = 1;
    /** 今回入力：ガス使用量 */
    this.mGasUse = 250;
    /** 顧客区分　 */
    this.mGasKubun = 1;
    /** 検針済み区分 */
    this.mKenSumi = true;
    /** 今回入力：今回指針 */
    this.mNowMeter = 250;
    /** 前回指針 */
    this.mPreMeter = 0;
    /** 前回検針日付:年 */
    this.mPuseYear = 0;
    /** 前回検針日付：月 */
    this.mPuseMonth = 0;
    /** 前回検針日付：日 */
    this.mPuseDate = 0;
    /** ガス料金No */
    this.mGasDiv = 654;
    /** 今回入力：消費税 */
    this.mConTax = 1230;
    /** 中間使用量(検針) */
    this.mBetwMeter = 0;
    /** 前回使用量 */
    this.mPreUse = 0;
    /** 今回入力：金額 */
    this.mFee = 15450;
    /** 日割り日数 */
    this.mHiwari = 0;
    /** 当月：消費税(分割) */
    this.mTaxDiv = 0;
    /** 締日処理フラグ */
    this.mSimeF = 0;
    /** 開栓日付：年 */
    this.mKaiYear = 0;
    /** 開栓日付：月 */
    this.mKaiMonth = 0;
    /** 開栓日付：日 */
    this.mKaiDate = 0;
    /** ガス料金内訳データ */
    this.mKtpcdat = new KtpcDat(15000000, 139500000, 0);
    /** 供給区分 */
    this.mSupplyForm = 1;
    /** 契約料金(基本) */
    this.mGasBase = 0; // GASBASE
    /** メーター桁数 */
    this.mMtKeta = 4;  //MTKETA
    /** 契約料金(単価) */
    this.mGasUnit = 0;
    /** ハイブリッド請求フラグ */
    this.mHybseikyu = 0;
    /** 今回入力：その他売上金額 */
    this.mUrikin = 0;
    /** 今回入力：その他売上消費税 */
    this.mUriTax = 0;
    /** 今回入力：還元額 */
    this.mReduce = 0;
    /** 今回入力：還元額の消費税 */
    this.mReduceTax = 0;
    /** 顧客灯油 */
    var mKotfDat = null;
    this.mKotfDat = mKotfDat;
    /** 当月：遅収料金 */
    this.mProcTisyuu = 0;
    /** 当月：消費税(遅収料金) */
    this.mTaxTisyuu = 0;
    /** 前月残高 */
    this.mPreBalance = 4620;
    /** 当月：調整額 */
    this.mTAdjust = 0;
    /** 当月：入金額 */
    this.mTReceipt = 0;
    /** 当月：売上額(リース) */
    this.mProcLease = 0;
    /** 当月：消費税(リース) */
    this.mTaxLease = 0;
    /** 当月：売上額(分割金) */
    this.mProcDiv = 0;
    /** 当月：売上額(灯油) */
    this.mProcLoil = 0;
    /** 当月：消費税(灯油) */
    this.mTaxLoil = 0;
    /** 当月：売上額(その他) */
    this.mProcEtc = 0;
    /** 当月：消費税(その他) */
    this.mTaxEtc = 0;
    /** 当月：売上額(ガス) */
    this.mProcGas = 0;
    /** 当月：消費税(ガス) */
    this.mTaxGas = 0;
    /** 当月：遅収料金 */
    this.mProcTisyuu = 0;
    /** 当月：消費税(遅収料金) */
    this.mTaxTisyuu = 0;
    /** 今回入力：入金額 */
    this.mReceipt = 0; 
    /** 今回入力：調整額 */
    this.mAdjust = 1000;
  }
}

class Ko2fDat {
  constructor() {
    /** ハイブリッド料金区分 */
    this.mGashyb;
    /** カウント値引:税区分 */
    this.mChoTaxku;
    /** カウント値引消費税 */
    this.mChoTax;
    /** カウンタ使用料 */
    this.mUseKin;
    /** カウンター使用料:税区分 */
    this.mUseTaxku;
    /** カウンタ使用料消費税 */
    this.mUseTax;
    /** カウント値引 */
    this.mChoKin;
  }
}

class KtpcDat {
  constructor(m_nBasekin, m_nAddkin, m_nFacilitykin) {
    this.m_nBasekin = m_nBasekin;
    this.m_nAddkin = m_nAddkin;
    this.m_nFacilitykin = m_nFacilitykin;
  }
}

class Sy2fDat {
  constructor() {
    /** 中圧係数での使用量端数処理(0:切り捨て, 1:四捨五入, 2:切り上げ) */
    this.mCaHas = 0;
    /** 中圧ガス料金計算有無 */
    this.mCaFlg = 0;
    /** 差益還元品番コード */
    this.mKangHbcd = 0;
    /** 差益還元コード */
    this.mKangHcd = 0;
    /** 入金・調整取引区分設定フラグ */
    this.mNyucho = 0;
    /** ハイブリッド料金区分 */
    this.mGashyb;
    /** オプション3 */
    var mSysOption = [
      1, 1, -1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 5, 0, 0,
    ];
    this.mSysOption = mSysOption;
  }
}

class SysfDat {
  constructor() {
    /** 管ガス:最低検針日数 */
    this.mKgasDays0 = 25;
    /** 管ガス:最大検針日数 */
    this.mKgasDays1 = 35;
    /** 管ガス:閉開栓時日数 */
    this.mKgasDays2 = 29;
    /** 消費税変更日付 */
    this.mTax_yy = 1970;
    this.mTax_mm = 1;
    this.mTax_dd = 1;
    /** 消費税率 */
    this.mConsumTax = 80;
    /** 消費税変更旧税率 */
    this.mTaxr_old = 50;
    this.mTaxr_new = 80;
    /** ガス料金透明化対応フラグ */
    this.mVisibleGas = 1;
    /** ガス料金透明化設備料金対応フラグ */
    this.mVisibleFacility = 0;
    /** リース計上機能有無 */
    this.mLesUmu = 1;
    /** 売上用端数処理:加算 */
    this.mFracAddKin = 0;
    /** 売上用端数処理:乗算 */
    this.mFracMulKin = 1000;
    /** 消費税:端数処理(加算) */
    this.mFracAddTax = 0;
    /** 消費税:端数処理(乗算) */
    this.mFracMulTax = 1000;
    //
    this.mFracAddMult = null;
    /** システム年 */
    this.mSysYear = 2019;
    /** 処理日付(月) */
    this.mMonth = 5;
    /** 処理日付(日) */
    this.mDate = 1;
    /** 差益還元:有無 */
    this.mIfReduce = false;
    /** 商品消費税の使用依頼 */
    this.mShoTaxcom = 0;
    /** 入力有無:保安点検 */
    this.mCheckHoan = true;
    /** 入力有無:入金 */
    this.mIfMoney = true;
    /** 簡ガス日常点検有無 */
    this.mTenkenKgas = 0;
    /** 灯油検針フラグ */
    this.m_isToyukeninFlg = false;
    /** 使用率チェック:倍率 */
    this.mSrChkr = [50, 250, 50, 200, 60, 180];
    /** 使用率チェック:使用率 */
    this.mSrChkm = [20, 60];
    /** 値引きシステムフラグ */
    this.mKnebFlg = 0;
    /** 伝票出力フラグ:入金・調整 */
    this.mIfAdjust = true;
    /** 伝票出力フラグ:警報機リース */
    this.mIfAlarm = true;
    /** 伝票出力フラグ:分割金 */
    this.mIfDiv = true;
    /** 伝票出力フラグ:灯油 */
    this.mIfLampoil = true;
    /** 伝票出力フラグ:その他売上 */
    this.mIfProceeds = true;
    /** 伝票出力フラグ:前月請求額 */
    this.mIfDemand = true;

  }
}

class KouserDat {
  constructor() {
    /** 中圧係数 */
    this.m_nChuatu = 0;
    /** 個別検針顧客 */
    this.m_nKoubetsu = 0;
    /** ハイブリッドカウンター有無 */
    this.mHyc5 = 0;
    /** 調整取引区分 */
    this.m_sChocode = 0;
    /** 入金取引区分 */
    this.m_sNyucode = 0;
  }
}

class GasfDat {
  constructor(m_lstGstpDat) {
    /** 計算方法 */
    this.mSum = 1;
    /** 料金表種別 */
    this.mSyu = 0;
    /** 端数処理1：加算 */
    this.mFrac1Add = 0;
    /** 端数処理2:加算 */
    this.mFrac2Add = 0;
    /** 端数処理1:乗算 */
    this.mFrac1Mult = 1000;
    /** 端数処理2:乗算 */
    this.mFrac2Mult = 10000;
    /** 増減率 */
    this.mRiseFall = 0;
    /** ガス料金ステップデータ */
    this.m_lstGstpDat = m_lstGstpDat;
    /** 消費税区分 */
    this.mTaxDiv = 3;
    /** 消費税端数処理：加算 */
    this.mTaxAdd = 0;
    /** 消費税端数処理：乗算 */
    this.mTaxMult = 10000;
    /** 調整単価 */
    this.mChoTanka = 0;
    /** ガス料金拡張データ */
    var mGextDat = new GextDat();
    this.mGextDat = mGextDat;
  }
}

class GstpDat {
  constructor(mUplimit, mAdd, mBase) {
    /** 上限値 */
    this.mUplimit = mUplimit;
    /** 加算値 */
    this.mAdd = mAdd;
    /** 基準料金 */
    this.mBase = mBase;
  }
}

class KnebDat {
  constructor() {
    /** コード */
    this.m_nCode;
    /** 有無 */
    this.m_nUmu;
    /** 結果 */
    this.m_nRes;
    /** 金額 */
    this.m_nKin;
    /** 消費税 */
    this.m_nTax;
  }
}

class HmefDat {
  constructor() {
    /** 使用有無 */
    this.mUsef;
    /** 明細種別 0:締後、1:締前、9:ﾊﾝﾃﾞｨ、2：残高明細 */
    this.mHmeKind;
    /** リース明細かどうか */
    this.mLeasKind;
    /** 金額 */
    this.mKin;
    /** 消費税額 */
    this.mTax;
  }
}

class BusfDat {
  constructor() {}
}

class KotfDat {
  constructor() {
    /** 灯油検針済み区分(0:未, 1:済) */
    this.m_bKen_sumi;
    /** 灯油料金 */
    this.m_nFee;
    /** 灯油消費税額 */
    this.m_nCon_tax;
  }
}

class GextDat {
  constructor() {
    /** ガス基本料金 */
    this.m_nBasekin = 0;
    /** ガス設備料 */
    this.m_nFacilitykin = 0;
  }
}


class ShukeiKensinData{
        // constructor(m_strKcode,m_strName,m_nSs,m_nSr,m_nKin,m_nTax,m_nKng,m_nToyuSs,m_nToyuSr,m_lToyuKin,m_lToyuTax,m_isToyu,m_isKensin,m_lNyu,m_lCho){
        //     // this.m_strKcode = m_strKcode;
        //     // this.m_strName  = m_strName;
        //     // this.m_nSs = m_nSs;
        //     // this.m_nSr = m_nSr;
        //     // this.m_nKin = m_nKin;
        //     // this.m_nTax = m_nTax;
        //     // this.m_nKng = m_nKng;
        //     // this.m_nToyuSs = m_nToyuSs;
        //     // this.m_nToyuSr = m_nToyuSr;
        //     // this.m_lToyuKin = m_lToyuKin;
        //     // this.m_lToyuTax = m_lToyuTax;
            
        // }
        constructor(){}

        get get_m_strKcode(){
            return this.m_strKcode;
        }

        set set_m_strKcode(m_strKcode){
            this.m_strKcode = m_strKcode;
        }

        get get_m_strName(){
            return this.m_strName;
        }

        get get_m_nSs(){
            return this.m_nSs;
        }

        get get_m_nSs(){
            return this.m_nSs;
        }

        get get_m_nSs(){
            return this.m_nSs;
        }

        get get_m_nSs(){
            return this.m_nSs;
        }

        get get_m_nSs(){
            return this.m_nSs;
        }

        get get_m_strKcode(){
            return this.m_strKcode;
        }

        get get_m_strName(){
            return this.m_strName;
        }

        get get_m_nSs(){
            return this.m_nSs;
        }

        get get_m_nSs(){
            return this.m_nSs;
        }

        get get_m_nSs(){
            return this.m_nSs;
        }

        get get_m_nSs(){
            return this.m_nSs;
        }

        get get_m_nSs(){
            return this.m_nSs;
        }

        get get_m_nSs(){
            return this.m_nSs;
        }
}
/*****  VIEW VARIABLE  *****/
/* dialog */
const overlay = document.getElementsByClassName("overlay")[0];
/* select datepicker */
var selectDate = document.getElementById('selectDate');
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* user data */
var userData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));
/* shuukei data */
var shuukeiData = Dat.shukeiItem;
/* shuukei data all*/
var shukeiItemAll;

/* image string */
var imgString = "";
/* view item list */
var viewItemtList;
/* default text size of printting form */
var defaultPrintSize = window.getComputedStyle(document.getElementsByClassName("text")[0]).fontSize;
/* default title size of printting form */
var defaultPaddingPrintForm = window.getComputedStyle(document.getElementById("printContentDetail"), null).getPropertyValue('padding');
var dateStartArea = document.getElementById("date-start-area");
        var dateEndArea = document.getElementById("date-end-area");

let mItemList = new Map();
let m_mapKensinData = new Map();
let m_mapUriageData = new Map();
var sysfDat = new SysfDat();
var sy2fDat = new Sy2fDat();
var kouserDat = new KouserDat();
/* shuukei data */
var shukeiItem = {
    mKensu: 0,  /** 件数 */
    mGsiyou: 0,  /** ガス使用量 */
    mGryokin: 0,  /** ガス料金 */
    mShohi: 0,  /** 消費税 */
    mKang: 0,  /** 還元額 */
    mTotal: 0,  /** 合計 */
    mNyukin: 0,  /** 入金額 */
    mChosei: 0,  /** 調整額 */
    mNyucnt: 0,  /** 入金件数 */
    mUricnt: 0,  /** 売上件数 */
    mUrisur: 0,  /** 売上数量 */
    mUrikin: 0,  /** 売上金額 */
    mUritax: 0,  /** 売上消費税金額 */
    mToyuCnt: 0,  /** 灯油検針件数 */
    mToyuUse: 0,  /** 灯油使用量 */
    mToyuKin: 0,  /** 灯油金額 */
    mToyuTax: 0,  /** 灯油消費税 */
    mToyuTotal: 0  /** 灯油金額合計 */
};


/** 
    * SETUP LAYOUT EDIT VIEW
*/
function setupLayoutEditView() {
    if (userData.systemDat.FBUNRUI_3 == 0 && userData.systemDat.FHMCODE_3 == 0 && userData.systemDat.FHBCODE_3 == 0) {
        document.getElementById("ShukeiToyuCnt").style.display = "none";
        document.getElementById("ToyuTable").style.display = "none";
        document.getElementById("ToyuTablePrint").style.display = "none";
    }
}


/** 
    * SETUP DATEPICKER
*/
function setupDatePicker() {
    $(document).ready(function() {
        $("#date-start").datepicker({ 
            format: 'yyyy/mm/dd'
        });
        $("#date-start").on("change", function () {
            var fromdate = $(this).val();
        });
    
        $("#date-end").datepicker({ 
            format: 'yyyy/mm/dd'
        });
        $("#date-end").on("change", function () {
            var fromdate = $(this).val();
        });
    }); 
}


/** 
    * SET DEFAULT VALUE SELECT DATE
*/
function setDefaultValueSelectDate() {
    if (userData != null) {
        var startDay = String(userData.systemDat.HANSYSYM);
        startDay = startDay.substring(0, 10);
        startDay = startDay.replaceAll("-", "/");
        document.getElementById("date-start").value = startDay;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '/' + mm + '/' + dd;
        document.getElementById("date-end").value = today;
    }
}


/** 
    * SETUP SELECT DATE VIEW
*/
function setupSelectDateView() {
    selectDate.onchange = function () {
        var dateStartArea = document.getElementById("date-start-area");
        var dateEndArea = document.getElementById("date-end-area");
        if (selectDate.value == "1") {
            dateStartArea.style.display = "none";
            dateEndArea.classList.remove('col-sm-6');
            dateEndArea.classList.remove('col-md-6');
            dateEndArea.classList.remove('col-lg-6');
            dateEndArea.classList.remove('col-xl-6');

            document.getElementsByClassName("date-end-title")[0].innerHTML = "日付";
        } else {
            dateStartArea.style.display = "block";
            dateEndArea.classList.add('col-sm-6');
            dateEndArea.classList.add('col-md-6');
            dateEndArea.classList.add('col-lg-6');
            dateEndArea.classList.add('col-xl-6');

            document.getElementsByClassName("date-end-title")[0].innerHTML = "終了";
        }
    }
}


/** 
    * GET SHUUKEI DATA
*/
function getShuukeiData() {
    var urlString;
    if (selectDate.value == "1") {
        let date = document.getElementById("date-end").value;
       urlString = StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + date.replaceAll("-", "/") + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
        //  urlString = StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + date.replaceAll("-", "/") + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
    } else {
        let dateStart = document.getElementById("date-start").value;
        let dateEnd = document.getElementById("date-end").value;
        urlString = StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + dateStart.replaceAll("-", "/") + "&date2=" + dateEnd.replaceAll("-", "/") + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
        //  urlString = StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_READSYUKEI + StringCS.PR_KEY + "&date1=" + dateStart.replaceAll("-", "/") + "&date2=" + dateEnd.replaceAll("-", "/") + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD);
    }
    shuukeiData = Dat.shukeiItem;
   // console.log(shuukeiData.mKensu + " abc");
    Common.setupModal("load", null, Mess.I00001, null);
    $.ajax({
        url: urlString,
        headers: {
            'Content-Type': StringCS.PR_CONTENT_TYPE
        },
        success: function (result) {
            var shukeiData = JSON.parse(result);
            viewItemtList = setViewItemtList("edt");

            if (shukeiData != null) {
		        if (shukeiData.m_lstShukeiDat != null) {
			        for (var i = 0; i < shukeiData.m_lstShukeiDat.length; i++) {
                        shukeiItem.mGsiyou = shukeiData.m_lstShukeiDat[i].h_siyouryo;
                        shukeiItem.mGryokin = shukeiData.m_lstShukeiDat[i].h_kin;
                        shukeiItem.mKang = shukeiData.m_lstShukeiDat[i].u_kin + shukeiData.m_lstShukeiDat[i].u_tax;
                        shukeiItem.mShohi = shukeiData.m_lstShukeiDat[i].h_utax;
                        shukeiItem.mTotal = shukeiItem.mKang + shukeiItem.mTotal;
                        addShukeiData(shukeiItem ,sysfDat , sy2fDat, kouserDat);
			        }
		        }       
	        }

            setShuukeiData();
            modal.style.display = "none";

        },
        error: function (jqXHR, exception) {
            console.log(exception);
            Common.setupModal("error", null, Mess.E00003, StringCS.OK, null);
        },
        timeout: ValueCS.VL_LONG_TIMEOUT
    });
}


/** 
    * SET VIEW ITEM LIST
*/
function setViewItemtList(type) {
    var list = [
        document.getElementsByClassName("kenCnt-" + type)[0],
        document.getElementsByClassName("toyuCnt-" + type)[0],
        document.getElementsByClassName("nyuCnt-" + type)[0],
        document.getElementsByClassName("uriCnt-" + type)[0],
        document.getElementsByClassName("rowUses-" + type)[0],
        document.getElementsByClassName("rowPay-" + type)[0],
        document.getElementsByClassName("rowTax-" + type)[0],
        document.getElementsByClassName("rowKang-" + type)[0],
        document.getElementsByClassName("rowTotal-" + type)[0],
        document.getElementsByClassName("toyuUse-" + type)[0],
        document.getElementsByClassName("toyuPay-" + type)[0],
        document.getElementsByClassName("toyuTax-" + type)[0],
        document.getElementsByClassName("toyuTotal-" + type)[0],

        document.getElementsByClassName("rowInput-" + type)[0],
        document.getElementsByClassName("rowAdjust-" + type)[0],
        document.getElementsByClassName("rowUrisur-" + type)[0],
        document.getElementsByClassName("rowUrikin-" + type)[0],
        document.getElementsByClassName("rowUriTax-" + type)[0],
        document.getElementsByClassName("rowUriTotal-" + type)[0]
    ]
    return list;
}


/** 
    * SET SHUUKEI DATA
*/
function setShuukeiData() {
    viewItemtList[0].innerHTML = Other.KingakuFormat(shuukeiData.mKensu);
    viewItemtList[1].innerHTML = Other.KingakuFormat(shuukeiData.mToyuCnt);
    viewItemtList[2].innerHTML = Other.KingakuFormat(shuukeiData.mNyucnt);
    viewItemtList[3].innerHTML = Other.KingakuFormat(shuukeiData.mUricnt);
    viewItemtList[4].innerHTML = Other.Format(shuukeiData.mGsiyou, 1);
    viewItemtList[5].innerHTML = Other.KingakuFormat(shuukeiData.mGryokin);
    viewItemtList[6].innerHTML = Other.KingakuFormat(shuukeiData.mShohi);
    viewItemtList[7].innerHTML = Other.KingakuFormat(shuukeiData.mKang);
    viewItemtList[8].innerHTML = Other.KingakuFormat(shuukeiData.mTotal);

    viewItemtList[9].innerHTML = Other.Format(shuukeiData.mToyuUse, 1);
    viewItemtList[10].innerHTML = Other.KingakuFormat(shuukeiData.mToyuKin);
    viewItemtList[11].innerHTML = Other.KingakuFormat(shuukeiData.mToyuTax);
    viewItemtList[12].innerHTML = Other.KingakuFormat(shuukeiData.mToyuTotal);

    viewItemtList[13].innerHTML = Other.KingakuFormat(shuukeiData.mNyukin);
    viewItemtList[14].innerHTML = Other.KingakuFormat(shuukeiData.mChosei);
    viewItemtList[15].innerHTML = shuukeiData.mUrisur; //Other.Format("#,###,##0.00", shuukeiData.mUrisur, 2);
    viewItemtList[16].innerHTML = Other.KingakuFormat(shuukeiData.mUrikin);
    viewItemtList[17].innerHTML = Other.KingakuFormat(shuukeiData.mUritax);
    viewItemtList[18].innerHTML = Other.KingakuFormat(shuukeiData.mUrikin + shuukeiData.mUritax);
}


/** 
    * SET DATA SHUUKEI PRINT FORM
*/
function setDataPrintForm() {
    let tempList = viewItemtList;
    viewItemtList = setViewItemtList("prt");
    for (var i = 0; i < viewItemtList.length; i++) {
        viewItemtList[i].innerHTML = tempList[i].textContent + viewItemtList[i].textContent;
    }
}


/** 
    * SHOW NIPPOU DIALOG
*/
function showNippouDialog() {
    overlay.style.zIndex = "2";
    overlay.classList.add("overlay-animate");
}


/** 
    * CLOSE NIPPOU DIALOG
*/
function closeNippouDialog() {
    overlay.style.zIndex = "-1";
    overlay.classList.remove("overlay-animate");
}


/** 
    * BACK TO EDIT VIEW
*/
function backToEditView() {
    document.getElementById('editView').style.display = "block";
    document.getElementById('printView').style.display = "none";
    document.getElementById('shuukeiForm').style.display = "none";
    document.getElementById('nippouArea').style.display = "none";
    document.getElementById('kensinNippouForm').style.display = "none";
    document.getElementById('shuukeiNippouForm').style.display = "none";
}


/** 
    * SET TITLE PRINT FORM
    * 
    * @param type     [INT]
*/
function setTitlePrintForm(type) {
    var titleForm = "";
    switch (type) {
        case 0:
            titleForm = "検 針 日 報";
            break;
        case 1:
            titleForm = "集 金 日 報";
            break;
        case 2:
            titleForm = "売 上 日 報";
            break;
    }
    document.getElementById("titleNippouPrintView").innerHTML = titleForm;
}


/** 
    * CONVERT IMAGE TO BASE64
*/
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


/**
   * SETUP PRINT FORM
   *
   * @param widthScreen     [STRING]
   * @param widthForm     [STRING]
   * @param sizeTitle     [STRING]
   * @param sizeSingleLine     [STRING]
   * @param lineHeightSingleLine     [STRING]
   * @param sizeItem     [STRING]
   * @param lineheightItem     [STRING]
   * @param showEndPage     [STRING]
   * @param paddingForm     [STRING]
*/
function setupPrintForm(widthScreen, widthForm, sizeTitle, sizeSingleLine, lineHeightSingleLine, sizeItem, lineheightItem, showEndPage, paddingForm) {
    if (Common.checkDevice() < 2) {
        document.getElementById('form').style.width = widthScreen;
        const form = document.getElementsByClassName("wrap-mainform");
        form[0].style.width = widthForm;
    }

    var title = document.getElementsByClassName("title-printView");
    for (let i = 0; i < title.length; i++) {
        title[i].style.fontSize = sizeTitle;
    }

    const shukei_single_line = document.getElementsByClassName("sg-line");
    for (let i = 0; i < shukei_single_line.length; i++) {
        console.log(shukei_single_line[i].value);
        shukei_single_line[i].style.fontSize = sizeSingleLine;
        shukei_single_line[i].style.lineHeight = lineHeightSingleLine;
        shukei_single_line[i].style.fontWeight = "normal";
    }

    const item = document.getElementsByClassName("item");
    for (let i = 0; i < item.length; i++) {
        console.log(item[i].value);
        item[i].style.fontSize = sizeItem;
        item[i].style.lineHeight = lineheightItem;
    }

    var endspace = document.getElementsByClassName("end-space");
    for (let i = 0; i < endspace.length; i++) {
        
        if (showEndPage == true) {
            endspace[i].style.display = "block";
        } else {
            endspace[i].style.display = "none";
        }
    }

    document.getElementById("printContentDetail").padding = paddingForm;
}


/**
   * SEND IMAGE TO PRINTER
*/
function sendImage() {
    imgString = imgString.replace("data:image/png;base64,", "");
    navigator.clipboard.writeText(imgString);
    window.location.href = "printermarutou://print&&1";
}


/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
    document.getElementById("menuOption").onclick = function () { Common.movePage('/menu_page.html') };
    document.getElementById("settingOption").onclick = function () { Common.movePage('/setting_page.html') };
    document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/**
    * ONCLICK ACTION
*/
function onclickAction() {
    document.getElementById("backPageButton").onclick = Common.backAction;
    document.getElementById("insatsuButton").onclick = createImageShuukeiForm;
    document.getElementById("getShuukeiDataButton").onclick = getShuukeiData;
    document.getElementById("backPrintButton").onclick = backToEditView;
    document.getElementById("sendToAppButton").onclick = sendImage;

    document.getElementById("nippouButton").onclick = showNippouDialog;
    document.getElementById("closeNippouButton").onclick = closeNippouDialog;
    document.getElementById("kenshinNippouButton").onclick = createImageKenshinNippouForm;
    document.getElementById("shuukeiNippouButton").onclick = createImageShuukeiNippouForm;
}


/** 
    * CREATE IMAGE FILE OF SHUUKEI FORM
*/
function createImageShuukeiForm() {
    // Common.setupModal("load", null, Mess.I00004, StringCS.OK, null);
    // return;
    // if (Common.checkPrintable() == false) {
    //     return;
    // }
    Common.setupModal("load", null, Mess.I00001, null);
    Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('shuukeiForm').style.display = "block";
    // setDataPrintForm();
    setupPrintForm("100vh", "650px", "55px", "31px", "37px", "31px", "37px", true, "20px");
    domtoimage.toBlob(document.getElementById('printContentDetail'))
        .then(function (blob) {
            getBase64(blob).then(
                data => {
                    console.log(data)
                    imgString = data;
                    window.scrollTo(0, 0);

                    const interval = setInterval(function () {
                        setupPrintForm("100%", "600px", "45px", defaultPrintSize, "25px", defaultPrintSize, "25px", false, defaultPaddingPrintForm)
                        Common.setBackgroundDialogScreen("block", "rgba(0,0,0,0.4)");
                        clearInterval(interval);
                        modal.style.display = "none";
                    }, 100);
                }
            );
        })
}


/** 
    * CREATE IMAGE FILE OF KENSHIN NIPPOU FORM
*/
function createImageKenshinNippouForm() {
    closeNippouDialog();
    Common.setupModal("load", null, Mess.I00004, StringCS.OK, null);
    return;
    if (Common.checkPrintable() == false) {
        return;
    }
    setTitlePrintForm(0);

    Common.setupModal("load", null, Mess.I00001, null);
    Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('nippouArea').style.display = "block";
    document.getElementById('kensinNippouForm').style.display = "block";
    document.getElementById('shuukeiNippouForm').style.display = "none";
    setupPrintForm("100vh", "650px", "55px", "27px", "33px", "27px", "33px", true, "20px");
    // setupPrintForm("100vh", "650px", "55px", "31px", "37px", "31px", "37px", true, "20px");
    domtoimage.toBlob(document.getElementById('printContentDetail'))
        .then(function (blob) {
            getBase64(blob).then(
                data => {
                    console.log(data)
                    imgString = data;
                    window.scrollTo(0, 0);

                    const interval = setInterval(function () {
                        setupPrintForm("100%", "600px", "45px", defaultPrintSize, "25px", defaultPrintSize, "25px", false, defaultPaddingPrintForm)
                        Common.setBackgroundDialogScreen("block", "rgba(0,0,0,0.4)");
                        clearInterval(interval);
                        modal.style.display = "none";
                    }, 100);
                }
            );
        })
}


/** 
    * CREATE IMAGE FILE OF SHUUKEI NIPPOU FORM
*/
function createImageShuukeiNippouForm() {
    closeNippouDialog();
    Common.setupModal("load", null, Mess.I00004, StringCS.OK, null);
    return;
    if (Common.checkPrintable() == false) {
        return;
    }
    setTitlePrintForm(1);

    Common.setupModal("load", null, Mess.I00001, null);
    Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
    document.getElementById('editView').style.display = "none";
    document.getElementById('printView').style.display = "block";
    document.getElementById('nippouArea').style.display = "block";
    document.getElementById('shuukeiNippouForm').style.display = "block";
    document.getElementById('kensinNippouForm').style.display = "none";
    // setupPrintForm("100vh", "650px", "55px", "31px", "37px", "31px", "37px", true, "20px");
    setupPrintForm("100vh", "650px", "55px", "27px", "33px", "27px", "33px", true, "20px");
    domtoimage.toBlob(document.getElementById('printContentDetail'))
        .then(function (blob) {
            getBase64(blob).then(
                data => {
                    console.log(data)
                    imgString = data;
                    window.scrollTo(0, 0);

                    const interval = setInterval(function () {
                        setupPrintForm("100%", "600px", "45px", defaultPrintSize, "25px", defaultPrintSize, "25px", false, defaultPaddingPrintForm)
                        Common.setBackgroundDialogScreen("block", "rgba(0,0,0,0.4)");
                        clearInterval(interval);
                        modal.style.display = "none";
                    }, 100);
                }
            );
        })
}



   /**
     * 集計データ一覧の設定.
     *
     * @throws MException   エラーがあった場合に発生.
     */
function setShukeiDateList() {
        var shukeiItem = null;
        // var nSearchNo;
        // var nIdx;
        var kokfDat;
        // var idxfDat;
        mItemList = new Map();
        m_mapKensinData = new Map();
        m_mapUriageData = new Map();

        // var sysfDat = userData.sysfDat;
        // var sy2fDat = userData.sy2fDat;
        // var kouserDat = userData.kouserDat;
        // var cuslist = userData.cuslist;

        var sysfDat = new SysfDat();
        var sy2fDat = new Sy2fDat();
        var kouserDat = new KouserDat();
        var cuslist = [new KokfDat()];

   

        for (var i = 0; i < cuslist.length; i++) {
            // 顧客データ取得
            // nSearchNo = sysfDat.mSearchNo;
            // idxfDat = this.mUserData.getIdxfDat().get(nSearchNo);
            // nIdx = Objects.requireNonNull(idxfDat).mRecId[i];
                kokfDat = cuslist[i];
            
            var kotfDat = null;
            if(sysfDat.m_isToyukeninFlg){
                kotfDat = kokfDat.mKotfDat;
            }
            if (kokfDat.mKenSumi || kokfDat.mSyuSumi || (kotfDat != null && kotfDat.m_bKen_sumi == 1)) {
                var strKey = kokfDat.mKMonth + "/" + kokfDat.mKDate;
                var lstKensinData;
                if(m_mapKensinData.has(strKey)){
                    lstKensinData = m_mapKensinData.get(strKey);
                    if(lstKensinData == null){
                        lstKensinData = new Array();
                    }
                }
                else {
                    lstKensinData = new Array();
                    m_mapKensinData.set(strKey, lstKensinData);
                }
                let kensinData = Dat.kensinData;          
                lstKensinData.push(kensinData);
               
                kensinData._m_strKcode = kokfDat.mCusCode;
                kensinData.m_strName = kokfDat.mName;
                kensinData.m_isKensin = kokfDat.mKenSumi;
                kensinData.m_nSs  = kokfDat.mNowMeter;
                kensinData.m_nSr  = kokfDat.mGasUse;
                kensinData.m_nKin = kokfDat.mFee;
                kensinData.m_nTax = kokfDat.mConTax;
                kensinData.m_nKng = kokfDat.mReduce + kokfDat.mReduceTax;
                kensinData.m_lNyu = kokfDat.mReceipt;
                kensinData.m_lCho = kokfDat.mAdjust;
                if(kotfDat != null && kotfDat.m_bKen_sumi == 1){
                    kensinData.m_isToyu = true;
                    kensinData.m_nToyuSs =  kotfDat.m_nNow_meter;
                    kensinData.m_nToyuSr =  kotfDat.m_nLoil_use;
                    kensinData.m_lToyuKin = kotfDat.m_nFee;
                    kensinData.m_lToyuTax = kotfDat.m_nCon_tax;
                }
                if (mItemList.has(strKey))
                    shukeiItem = mItemList.get(strKey);
                else {
                    shukeiItem = Dat.shukeiItem;
                    mItemList.set(strKey, shukeiItem);
                }
                addShukeiData(shukeiItem, kokfDat, sysfDat, sy2fDat, kouserDat);
            }
            // if(kokfDat.mUriSumi){
            //     HmefDat hmefDat = InputDat.getHmefDat(this, kokfDat.mHmew0Srec - 1,  2);
            //     if(hmefDat != null) {
                  
            //         String strKey = hmefDat.mDenm + "/" + hmefDat.mDend;
            //         addShukeiUriageData(strKey, kokfDat, hmefDat);
            //         if(mItemList.containsKey(strKey)){
            //             shukeiItem = mItemList.get(strKey);
            //         }
            //         else {
            //             shukeiItem = new ShukeiItem();
            //             mItemList.put(strKey, shukeiItem);
            //         }
            //         addUriageShukeiData(shukeiItem, hmefDat);
            //         while (hmefDat.mNxtHrec != 0) {
            //             hmefDat = InputDat.getHmefDat(this, hmefDat.mNxtHrec - 1, (byte) 2);
            //             if(hmefDat == null){
            //                 break;
            //             }
            //             strKey = hmefDat.mDenm + "/" + hmefDat.mDend;
            //             addShukeiUriageData(strKey, kokfDat, hmefDat);
            //             if(mItemList.containsKey(strKey)){
            //                 shukeiItem = mItemList.get(strKey);
            //             }
            //             else {
            //                 shukeiItem = new ShukeiItem();
            //                 mItemList.put(strKey, shukeiItem);
            //             }
            //             addUriageShukeiData(shukeiItem, hmefDat);
            //         }
            //     }
            // }
                 shuukeiData = shukeiItem;       
        }
        
    }


    /**
     * 集計データの計上.
     *
     * @param shukeiItem    [in] {@link ShukeiItem} 集計データ
     * @param kokfDat       [in] {@link KokfDat}    顧客データ
     * @param sysfDat       [in] {@link SysfDat}    システムデータ
     * @param sy2fDat       [in] {@link Sy2fDat}    システム2データ
     * @param kouserDat     [in] {@link KouserDat}  顧客拡張データ
     */
    function addShukeiData(shukeiItem,   sysfDat,  sy2fDat,  kouserDat) {
   
            shuukeiData.mKensu+= 1 ;
            shuukeiData.mGsiyou += GasRaterCom.getGasSuryo(shukeiItem.mGsiyou, sy2fDat, kouserDat);
            shuukeiData.mGryokin += shuukeiData.mGryokin;
            shuukeiData.mKang += shukeiItem.mKang;
            shuukeiData.mShohi += shukeiItem.mShohi;          
            shukeiItem.mTotal += shukeiItem.mTotal;
        
        // if(sysfDat.m_isToyukeninFlg){
        //     var kotfDat = kokfDat.mKotfDat;
        //     if(kotfDat != null && kotfDat.m_bKen_sumi == 1){
        //         shukeiItem.mToyuCnt++;
        //         shukeiItem.mToyuUse += kotfDat.m_nLoil_use;
        //         shukeiItem.mToyuKin += kotfDat.m_nFee;
        //         shukeiItem.mToyuTax += kotfDat.m_nCon_tax;
        //         shukeiItem.mToyuTotal += kotfDat.m_nFee + kotfDat.m_nCon_tax;
        //     }
        // }
        // shukeiItem.mNyukin += kokfDat.mReceipt;
        // shukeiItem.mChosei += kokfDat.mAdjust;
        // if (kokfDat.mReceipt != 0) {
        //     shukeiItem.mNyucnt++;
        // }
    }

    /**
     * 集計データの計上.
     */
    function  addAllShukeiData() {

        var keylist = mItemList.values();
        for (let i = 0; i < mItemList.size; i++) {
            shuukeiData = keylist.next().value;
        }

        if (mItemList.size != 0) {
            for (var i = 0; i < mItemList.size; i++) {
                if (keylist.next().value != null) {
                 
                    mSelectCal[nCnt++] = strKey;
                  
                    var shukeiItem = keylist.next().value;
                    if(shukeiItem == null){
                        continue;
                    }
                    shukeiItemAll.mKensu += shukeiItem.mKensu;
                    shukeiItemAll.mGsiyou += shukeiItem.mGsiyou;
                    shukeiItemAll.mGryokin += shukeiItem.mGryokin;
                    shukeiItemAll.mKang += shukeiItem.mKang;
                    shukeiItemAll.mShohi += shukeiItem.mShohi;
                    shukeiItemAll.mTotal += shukeiItem.mTotal;
                    shukeiItemAll.mNyukin += shukeiItem.mNyukin;
                    shukeiItemAll.mChosei += shukeiItem.mChosei;
                    shukeiItemAll.mNyucnt += shukeiItem.mNyucnt;
                    shukeiItemAll.mUricnt += shukeiItem.mUricnt;
                    shukeiItemAll.mUrisur += shukeiItem.mUrisur;
                    shukeiItemAll.mUrikin += shukeiItem.mUrikin;
                    shukeiItemAll.mUritax += shukeiItem.mUritax;
                    shukeiItemAll.mToyuCnt += shukeiItem.mToyuCnt;
                    shukeiItemAll.mToyuUse += shukeiItem.mToyuUse;
                    shukeiItemAll.mToyuKin += shukeiItem.mToyuKin;
                    shukeiItemAll.mToyuTax += shukeiItem.mToyuTax;
                    shukeiItemAll.mToyuTotal += shukeiItem.mToyuTotal;
                }
            }
        }
    }





/** 
    * ONLOAD ACTION
*/
function onLoadAction() {
    setupLayoutEditView();
    setupDatePicker();
    setOptionMenu();
    setDefaultValueSelectDate();
    setupSelectDateView();
    onclickAction();
    setShukeiDateList();
}


window.onload = onLoadAction;
