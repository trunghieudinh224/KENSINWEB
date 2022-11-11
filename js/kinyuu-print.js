import * as Common from './Common/common_function.js'
import * as Other from './Common/other_util.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'
import * as GasRaterCom from './Common/gasratercom.js'
import * as Dat from './Dat/dat.js'
// import * as KensinKinyuu from './kensin_kinnyuu'

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

		//bien moi
		this.mAdd = "○武市△冬町３－２";
		this.mCusCode = "0010000375";
		this.mSName0 = "";
		this.mSName1 = "安藤　秀丸";
		this.mKName = "様";

		this.mZyksDat = Dat.mZyksDat;

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
			1, 1, -1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0
		];
		this.mSysOption = mSysOption;
		this.mSysfHmcd13 = 2;



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


		//them moi
		this.mGtpcDat = Dat.mGtpc;

		this.mHtOption = [0, 0, -1, 1, 1, 1, 1, 1, 5, 1];
		this.mSnvalue = 100;
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

class BusfDat {
	constructor() {
		this.mUsef = true
		this.mHinno = 2
		this.mName = "調整"
		this.mSign = 1
		this.mKind = 3
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

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* setting data */
var settingData = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));

/* kensin date */
var kensinDate = sessionStorage.getItem(StringCS.KENSINDATE);


/** 日常点検項目 */
var HOAN_ITEMS = ["①容器設置場所", "②容器設置状況", "③火気禁止２ｍ", "④調整器", "⑤配管状況", "⑥ガス栓", "⑦危険標識", "⑧マイコンメーター"];

var mUserData;
var ko2fDat;
var printStatus = Dat.printStatus;
var mUserData = Dat.mUserData;
var kokfDat = new KokfDat();
var sysfDat = new SysfDat();
var kouserDat = new KouserDat();
var sy2fDat = new Sy2fDat();
var gstpDat1 = new GstpDat(1, 0, 0);
var gstpDat2 = new GstpDat(50, 15600000, 6000000);
var gstpDat3 = new GstpDat(100, 45000000, 5700000);
var gstpDat4 = new GstpDat(250, 73500000, 5400000);
var gstpDat5 = new GstpDat(999999, 154500000, 5100000);
// var gstpDat6 = new GstpDat(999999,3000000,198000000);
var gasfDatlist = [gstpDat1, gstpDat2, gstpDat3, gstpDat4, gstpDat5];
var gasfDat = new GasfDat(gasfDatlist);
var busfDat = new BusfDat();
mUserData.mKokfDat = kokfDat;
mUserData.mSysfDat = sysfDat;
mUserData.mGasfDat = gasfDat;
mUserData.mKouserDat = kouserDat;
mUserData.mSy2fDat = sy2fDat;
mUserData.mNyukinMode = false;
mUserData.busfDat = busfDat;
mUserData.mKo2fDat = null;

// hmefDat = null

mUserData.mHmefDat = [];


var kensinData = Dat.kensinData;
var SysOption = Dat.SysOption;

/* cus data */
var cusData = getCusData();



/****  print   ****/
/* image string */
var imgString = "";
/* default title size of printting form */
var defaultPaddingPrintForm = window.getComputedStyle(document.getElementById("printContentDetail"), null).getPropertyValue('padding');

var itemTS = window.getComputedStyle(document.getElementsByClassName("item")[0]).fontSize;
var lgTextTS = window.getComputedStyle(document.getElementsByClassName("lg-text")[0]).fontSize;
var tbItemTS = window.getComputedStyle(document.getElementsByClassName("tb-item")[0]).fontSize;
var ryooshuuTextTS = window.getComputedStyle(document.getElementsByClassName("ryooshuu-text")[0]).fontSize;
var hmInfoTableItemTS = window.getComputedStyle(document.getElementsByClassName("hmInfoTable-item")[0]).fontSize;
var hybTableItemTS = window.getComputedStyle(document.getElementsByClassName("hybTable-item")[0]).fontSize;
var hoanItemTS = window.getComputedStyle(document.getElementsByClassName("hoan-item")[0]).fontSize;

var itemLH = window.getComputedStyle(document.getElementsByClassName("item")[0]).lineHeight;
var lgTextLH = window.getComputedStyle(document.getElementsByClassName("lg-text")[0]).lineHeight;
var tbItemLH = window.getComputedStyle(document.getElementsByClassName("tb-item")[0]).lineHeight;
var ryooshuuTextLH = window.getComputedStyle(document.getElementsByClassName("ryooshuu-text")[0]).lineHeight;
var hmInfoTableItemLH = window.getComputedStyle(document.getElementsByClassName("hmInfoTable-item")[0]).lineHeight;
var hybTableItemLH = window.getComputedStyle(document.getElementsByClassName("hybTable-item")[0]).lineHeight;
var hoanItemLH = window.getComputedStyle(document.getElementsByClassName("hoan-item")[0]).lineHeight;




/**
	* 印刷データを作成する
*/
function createPrintData(printStatus, isHybseikyu, isHikae) {
	var sysfDat = mUserData.mSysfDat;
	var kokfDat = mUserData.mKokfDat;
	setTitlePrintForm(printStatus.m_lReceipt != 0, isHikae);
	createCusInfo(getCusData());

	var wkKensinData = setKensinData(mUserData, isHybseikyu, printStatus.m_isPrintKensin, printStatus.m_isPrintToyu);
	// sysfDat.m_isToyukeninFlg = mUserData.systemDat.FBUNRUI_3 == 0 && mUserData.systemDat.FHMCODE_3 == 0 && mUserData.systemDat.FHBCODE_3 == 0
	if (sysfDat.m_isToyukeninFlg) {
		var kotfDat = mUserData.mKokfDat.mKotfDat;
		if (printStatus.m_isPrintKensin && !printStatus.m_isPrintToyu) {
			// 検針のみ 
			printStatus.m_lZandaka -= kotfDat.m_nFee + kotfDat.m_nCon_tax;
		}
		else if (!printStatus.m_isPrintKensin && printStatus.m_isPrintToyu) {
			// 灯油のみ
			printStatus.m_lZandaka = kotfDat.m_nFee + kotfDat.m_nCon_tax + kokfDat.mAdjust - kokfDat.mReceipt;
		}
	}
	wkKensinData.m_Zandaka = printStatus.m_lZandaka;
	createKensinInfo(wkKensinData);

	if (printStatus.m_isPrintNyukin) {
		if (printStatus.m_lReceipt > 0) {
			createRyoshu(Other.KingakuFormat(printStatus.m_lReceipt));
		}
	}

	var wkSy2fDat = mUserData.mSy2fDat;
	if (!mUserData.mNyukinMode) {
		if (kokfDat.mBankCode != 0) {
			createBank();
		}

		// 振替不能コメント
		createFunouComment();
	}
	if (!mUserData.mNyukinMode || !mUserData.mNyukinOnly) {
		if (wkSy2fDat.mSysOption[SysOption.PRINT_HANMEISAI] == 0) {	//SysOption.PRINT_HANMEISAI.getIdx() = 14
			createHmInfo_(mUserData);
		}
	}
	if (wkSy2fDat.mSysOption[SysOption.PRINT_COMMENT] == 1) {	//SysOption.PRINT_COMMENT.getIdx() = 25
		createComment(new CommentData(getComment()));
	}


	if (!mUserData.mNyukinMode) {
		if (printStatus.m_isPrintKensin) {
			createHybComment(wkKensinData);
			createHybTblPrint(wkKensinData);

			if (printStatus.m_isPrintHoan) {
				if (this.mUserData.mKokfDat.mNoKensin) {
					// 保安点検
					if (sysfDat.mCheckHoan && wkSy2fDat.mSysOption[SysOption.PRINT_HOAN] == 1) { 		// SysOption.PRINT_HOAN.getIdx() = 21
						createHoanInfo(kokfDat.mHoan);
					}
				}
			}
		} else {
			document.getElementById("hybCommentArea").style.display = "none";
		}

		// 標準ポイント
		createPoint(wkKensinData);
		// 宮野式ポイント
		createMiyaPoint();

		createCnComment(wkKensinData);
	}

	// 店舗データ
	if (sysfDat.mIfChitUser) {
		var nTancd = mUserData.mSysfDat.mTanCd;
		if (nTancd == 0) {
			// 顧客別担当者
			nTancd = mUserData.mKokfDat.mTanCd;
		}
		var wkTan = mUserData.getTntfDat(mUserData.mSysfDat.mTanKen);
		createUserInfo(mUserData.mHanfDat, wkTan.get(nTancd));
	}
}


/** 
	* SET TITLE PRINT FORM
	* 
	* @param isNyukin     [BOOLEAN]
	* @param isHikae     [BOOLEAN]
*/
function setTitlePrintForm(isNyukin, isHikae) {
	var strTitle = "";
	if (mUserData.mNyukinMode == true) {
		strTitle = "領　収　書";
	} else {
		var sysfdat = mUserData.mSysfdat;
		var gtpc = sysfDat.mGtpcDat;
		if (isNyukin == true) {
			if (isHikae == true) {
				if (sysfdat.mVisibleGas == 1 && !Other.isEmpty(Other.cutStringSpace(gtpc.m_strTitle_3))) {
					strTitle == gtpc.m_strTitle_3;
				} else {
					strTitle = "検針伝票 (兼　領収書)(控)";
				}
			} else {
				if (sysfDat.mVisibleGas == 1 && !Other.isEmpty(Other.cutStringSpace(gtpc.m_strTitle_1))) {
					strTitle = gtpc.m_strTitle_1;
				} else {
					strTitle = "検針伝票 (兼　領収書)";
				}
			}
		} else {
			if (isHikae == true) {
				if (sysfDat.mVisibleGas == 1 && !Other.isEmpty(Other.cutStringSpace(gtpc.m_strTitle_2))) {
					strTitle = gtpc.m_strTitle_2;
				} else {
					strTitle = "検 針 伝 票(控)";
				}
			}
			else {
				if (sysfDat.mVisibleGas == 1 && !Other.isEmpty(Other.cutStringSpace(gtpc.m_strTitle_0))) {
					strTitle = gtpc.m_strTitle_0;
				} else {
					strTitle = "検　針　伝　票";
				}
			}
		}
	}
	document.getElementById("titlePrintView").innerHTML = strTitle;
}


/** 
	* SET DATA CUSTOMER
	*
	* @return cusData
*/
function getCusData() {
	var kokfDat = mUserData.mKokfDat;
	var date = moment(kensinDate).format('YYYY年 MM月 DD日');
	var data = {
		m_strDate: date,
		m_strKcode: kokfDat.mCusCode,
		m_strName0: kokfDat.mSName0,
		m_strName1: kokfDat.mSName1,
		m_strKname: kokfDat.mKName,
		m_strAdd0: Other.getClearString(kokfDat.mAdd.substring(0, 20)),
		m_strAdd1: Other.getClearString(kokfDat.mAdd.substring(20))
	};
	return data;
}


/** 
	* CREATE CUSTOMER INFORMATION
	*
	* @param cusData     [Object]
*/
function createCusInfo(cusData) {
	document.getElementById("hakkooBiKenshinBiTitle").innerHTML = mUserData.mNyukinMode ? "発行日　　" : "検針日　　";
	document.getElementById("hakkooBiKenshinBi").innerHTML = cusData.m_strDate;

	document.getElementById("codeVal").innerHTML = cusData.m_strKcode;

	if (Other.getClearString(cusData.m_strName0).length > 0 && Other.getClearString(cusData.m_strName1).length > 0) {
		document.getElementById("nameVal").innerHTML = Other.getClearString(cusData.m_strName0) + Other.getClearString(cusData.m_strName1);
		document.getElementById("kNameVal").innerHTML = Other.getClearString(cusData.m_strKname);
	} else if (Other.getClearString(cusData.m_strName0).length > 0) {
		document.getElementById("nameVal").innerHTML = Other.getClearString(cusData.m_strName0);
		document.getElementById("kNameVal").innerHTML = Other.getClearString(cusData.m_strKname);
	} else {
		document.getElementById("nameVal").innerHTML = Other.getClearString(cusData.m_strName1);
		document.getElementById("kNameVal").innerHTML = Other.getClearString(cusData.m_strKname);
	}

	document.getElementById("address0Val").innerHTML = cusData.m_strAdd0;
	if (Other.getClearString(cusData.m_strName0) != "") {
		document.getElementById("address1Val").innerHTML = cusData.m_strAdd1;
	} else {
		document.getElementById("address1Val").style.display = "none";
	}
}


/** 
	* SET KENSIN DATA
	*
	* @param cusData     [Object]
	* @param isHybSeikyu     [Boolean]
	* @param isPrintKensin     [Boolean]
	* @param isPrintToyu     [Boolean]
*/
function setKensinData(userData, isHybSeikyu, isPrintKensin, isPrintToyu) {

	const kokfDat = userData.mKokfDat;
	const sysfDat = userData.mSysfDat;
	const sy2fDat = userData.mSy2fDat;
	const kouserDat = userData.mKouserDat;
	kensinData.m_GasfDat = userData.mGasfDat;

	kensinData.m_Sisin = kokfDat.mNowMeter;// 今回指針
	kensinData.m_KensinPrevMonth = kokfDat.mPuseMonth;// 前回検針日
	kensinData.m_KensinPrevDay = kokfDat.mPuseDate;
	kensinData.m_SisinPrev = kokfDat.mPreMeter; // 前回指針
	kensinData.m_NowUse = GasRaterCom.getGasSuryo(kokfDat.mGasUse, sy2fDat, kouserDat);// 今回使用量
	kensinData.m_PreUse = GasRaterCom.getGasSuryo(kokfDat.mPreUse, sy2fDat, kouserDat);// 前回使用量

	kensinData.m_GasPay = kokfDat.mFee;// ガス売上
	kensinData.m_GasTax = kokfDat.mConTax;// ガス消費税

	kensinData.m_nOnlyGas = kokfDat.mFee + kokfDat.mConTax;

	kensinData.m_Reduce = kokfDat.mReduce + kokfDat.mReduceTax;// 還元額
	kensinData.m_PreReceipt = GasRaterCom.readPrebalance(sysfDat, kokfDat, sy2fDat);
	kensinData.m_HmDay = kokfDat.mUrikin + kokfDat.mUriTax;// 本日売上
	if (kokfDat.mKenSumi && isPrintKensin) {
		// 検針済みの場合は検針時リース金額加算
		for (var i = 0; i < userData.m_lstLeasHmefDat.length; i++) {
			const hmefDat = userData.m_lstLeasHmefDat[i];
			// 有効な明細、ハンディ売上、リース明細フラグ=1
			if (hmefDat.mUsef && hmefDat.mHmeKind == 9 && hmefDat.mLeasKind == 1) {
				kensinData.m_HmDay += hmefDat.mKin + hmefDat.mTax;
			}
		}
	}

	kensinData.m_HmMonth = GasRaterCom.calcEtcUri(sysfDat, kokfDat) + GasRaterCom.calcEtcTax(sysfDat, kokfDat);// 当月売上

	kensinData.m_isHybrid = kouserDat.mHyc5 == 1 && isHybSeikyu;
	if (kensinData.m_isHybrid) {
		// ハイブリッドカウンタの名称取得
		kensinData.mCounterName = new Array(ko2fDat.kHyb_MAX);		//ko2fDat
		for (var i = 0; i < kensinData.mCounterName.length; i++) {
			kensinData.mCounterName[i] = getCounterName(context, i);
		}
		// 顧客ハイブリッドデータの取得
		kensinData.mKo2fDat = userData.mKo2fDat;

		// ハイブリッド料金データの取得
		try {
			kensinData.mHybfDat = userData.getHybfDat(kensinData.mKo2fDat.mGashyb);
		} catch (err) {
			console.log(err);
		}

		kensinData.m_nNorSr = GasRaterCom.getGasSuryo(parseInt(kensinData.mKo2fDat.mNorSr), sy2fDat, kouserDat);
		kensinData.m_nHybGasUse = new Array[ko2fDat.kHyb_MAX];
		for (var i = 0; i < ko2fDat.kHyb_MAX; i++) {
			kensinData.m_nHybGasUse[i] = GasRaterCom.getGasSuryo(parseInt(kensinData.mKo2fDat.mGasUse[i]), sy2fDat, kouserDat);
		}
	}

	calcTotalKin();
	// 値引き金額はガス料金総額に含める
	if (sysfDat.mKnebFlg == 1) {
		// 漢の値引きシステム有り
		kensinData.m_nGasTotalKin += GasRaterCom.calcNebiki(sysfDat, userData.m_lstKnebDat);
	}

	// 今回請求額
	var lTotal = GasRaterCom.calcSeikyu(sysfDat, kokfDat, sy2fDat, !userData.mNyukinMode);
	if (isPrintKensin) {
		lTotal += kensinData.m_nGasTotalKin;
	}
	lTotal += kensinData.m_HmDay;
	kensinData.m_Receipt = lTotal;
	kensinData.m_Azukarikin = parseInt(kokfDat.mInpReceipt); // 預かり金
	kensinData.m_Nyukin = parseInt(kokfDat.mReceipt); // 入金
	kensinData.m_Chosei = parseInt(kokfDat.mAdjust); // 調整

	kensinData.mCnp = false;
	kensinData.mCnpMemberCmt = userData.mSy2fDat.mSy2fCnpMemberDat;
	kensinData.mCnpTempCmt = userData.mSy2fDat.mSy2fCnpTempDat;
	kensinData.mCnpCusDat = kokfDat.mCnpCusDat;
	if (sy2fDat.mCnp == 1 && kensinData.mCnpCusDat != null && (kensinData.mCnpCusDat.mCnpMembers == 1 || kensinData.mCnpCusDat.mCnpTemp == 1)) {
		// CNポイントを使用し、仮会員か、本会員の場合はtrueを設定
		kensinData.mCnp = true;
	}


	kensinData.m_bChgMeter = false;
	if (kokfDat.mBetwMeter > 0) {
		// メーター交換有り
		kensinData.m_bChgMeter = true;
		kensinData.m_ChgMonth = kokfDat.mMtChgM;
		kensinData.m_ChgDay = kokfDat.mMtChgD;
		kensinData.m_ChgZsisin = kokfDat.mMtChgZknss;
		kensinData.m_ChgSisin = kokfDat.mMtChgOldss;
		kensinData.m_ChukanSur = GasRaterCom.getGasSuryo(kokfDat.mBetwMeter, sy2fDat, kouserDat);
	}

	// 前回使用量印字フラグを設定
	kensinData.mPrnZensr = kokfDat.mKaiYear <= kokfDat.mPuseYear && kokfDat.mKaiMonth <= kokfDat.mPuseMonth && kokfDat.mKaiDate <= kokfDat.mPuseDate;

	if (sysfDat.mHtOption[7] == 1 && kensinData.m_GasfDat != null && kensinData.m_GasfDat.mSum != 4) {
		kensinData.mPrnGasBaseKin = true;
		kensinData.mGasBaseKin = GasRaterCom.calcGasBase(sysfDat, kokfDat, userData.mGasfDat, sy2fDat, kouserDat);
	}


	kensinData.m_isVisibleGas = sysfDat.mVisibleGas == 1;
	if (sysfDat.mVisibleGas == 1 && kensinData.m_GasfDat != null) {
		if (sysfDat.mGtpcDat.m_nPrintGasRyokinTotal == 0) {
			// ガス料金総額
			kensinData.m_bPrintGasRyokinTotal = true;
		}
		// ガス料金式印字フラグ設定
		if (kensinData.m_GasfDat.mGextDat.m_nPrintGasryokinSiki == 1 && kensinData.m_GasfDat.mSum != 4) {
			kensinData.m_bPrintGasRyokinSiki = true;
		}
		// ガス料金式印字パターン
		kensinData.m_nPrintGasRyokinSikiPtn = sysfDat.mGtpcDat.m_nPrintGastablePtn;

		// 設備料金印字フラグ設定
		if (sysfDat.mVisibleFacility == 1 && kokfDat.mKtpcdat.m_nFacilitykin != 0) {
			// システム設定のフラグが1、設備料金を設定している場合印字する
			kensinData.m_bPrintGasFacilityKin = true;
		}

		const zyksDat = kokfDat.mZyksDat;
		const calKai = new Date();
		if (kokfDat.mKaiYear > 0 && kokfDat.mKaiMonth > 0 && kokfDat.mKaiDate > 0) {
			calKai = new Date(kokfDat.mKaiYear, kokfDat.mKaiMonth - 1, kokfDat.mKaiDate);
		}
		const calZyks = new Date();
		if (zyksDat.mKaiYear > 0 && zyksDat.mKaiMonth > 0 && zyksDat.mKaiDate > 0) {
			calZyks = new Date(zyksDat.mKaiYear, zyksDat.mKaiMonth - 1, zyksDat.mKaiDate);
		}
		if (sysfDat.mGtpcDat.m_nPrintZenyearkensr == 0 && calKai.getTime() - calZyks.getTime() <= 0 && zyksDat.m_nDenymd_year != 0) {
			// 前年同月使用量
			kensinData.m_bPrintZenYearKenSr = true;
			kensinData.m_nZenYearKenSr = GasRaterCom.getGasSuryo(kokfDat.mZyksDat.m_nSr, sy2fDat, kouserDat);
		}

		if (sysfDat.mGtpcDat.m_nPrintHiwariComment == 0 && kokfDat.mHiwari != 0) {
			// 日割りコメント印字
			kensinData.m_bPrintHiwariComment = true;
			kensinData.m_strHiwariComment_0 = sysfDat.mGtpcDat.m_strHiwariComment_0;
			kensinData.m_strHiwariComment_1 = sysfDat.mGtpcDat.m_strHiwariComment_1;
			if (Other.cutStringSpace(kensinData.m_strHiwariComment_0).length() == 0 && Other.cutStringSpace(kensinData.m_strHiwariComment_1).length() == 0) {
				kensinData.m_bPrintHiwariComment = false;
			}
		}

		kensinData.m_nStartIdx = GasRaterCom.calcGasBaseKin(sysfDat, kensinData.m_GasfDat, kokfDat, sy2fDat, kouserDat);

		kensinData.mGasBaseKin = kokfDat.mKtpcdat.m_nBasekin / 10;
		kensinData.m_nFacilityKin = kokfDat.mKtpcdat.m_nFacilitykin / 10;

		if (kensinData.m_GasfDat.mSum == 2 || kensinData.m_GasfDat.mSum == 3) {
			kensinData.m_bSingleStep = true;
			if (kensinData.m_GasfDat.mSum == 3) {
				// 契約単価
				kensinData.mGasAddKin = kokfDat.mGasUnit;
			}
		} else {
			if (kensinData.m_GasfDat.m_lstGstpDat != null &&
				kensinData.m_GasfDat.m_lstGstpDat.length <= kensinData.m_nStartIdx + 1) {
				kensinData.m_bSingleStep = true;
			}
		}
	}

	if (sysfDat.m_isToyukeninFlg) {
		kensinData.mKotfDat = kokfDat.mKotfDat;
		kensinData.m_isPrintKensin = isPrintKensin;
		kensinData.m_isPrintToyu = isPrintToyu;
		if (isPrintToyu) {
			kensinData.m_Receipt += kensinData.mKotfDat.m_nFee + kensinData.mKotfDat.m_nCon_tax;
		}
	}
	else {
		kensinData.m_isPrintKensin = true;
		kensinData.m_isPrintToyu = false;
	}
	kensinData.m_isToyuKinSep = sy2fDat.m_isToyuSep;
	kensinData.m_nLoilUnit = kokfDat.mLoilUnit / 100;

	return kensinData;
}


/** 
	* GET COUNTER NAME
	*
	* @param nCounterNo     [Int]
	* @return strCounterName
*/
function getCounterName(nCounterNo) {
	const hyb_cnt_nm = ["指定時間１", "指定時間２"
		, "大流量使用", "長時間使用"
		, "基本料金　", "通常使用　"];

	var strCounterName = "";
	try {
		strCounterName = InputDat.getHymnDat(ctx, nCounterNo).mName;
	}
	catch (err) {
		console.log(err);
	}


	if (strCounterName.length == 0) {
		strCounterName = hyb_cnt_nm[nCounterNo];
	}
	return strCounterName;
}


/** 
	* calcTotalKin
	*
	* @param nCounterNo     [Int]
	* @return strCounterName
*/
function calcTotalKin() {
	if (kensinData.m_isHybrid && kensinData.mKo2fDat.mGashyb > 0) {
		kensinData.m_GasPay = parseInt(kensinData.mKo2fDat.mNorKin);
		for (var i = 0; i < ko2fDat.kHyb_MAX; i++) {
			if (kensinData.mHybfDat.mCusef[i] == 1 && kensinData.mKo2fDat.mFee[i] != 0) {
				kensinData.m_GasPay += kensinData.mKo2fDat.mFee[i];
			}
		}
		kensinData.m_nGasTotalKinWithoutTax = m_GasPay;
		kensinData.m_GasTax = parseInt(kensinData.mKo2fDat.mHybTax) / 1000;
		// カウンタ使用料
		if (kensinData.mKo2fDat.mUseKin > 0 && kensinData.mHybfDat.mUseSncode > 0) {
			kensinData.m_nGasTotalKinWithoutTax += kensinData.mKo2fDat.mUseKin;
			if (kensinData.mHybfDat.mUseTaxku == 3) {
				kensinData.m_nGasTotalKinWithoutTax += kensinData.mKo2fDat.mUseTax;
			}
		}
	} else {
		kensinData.m_nGasTotalKinWithoutTax = kensinData.m_GasPay;
	}

	kensinData.m_nGasTotalKin = kensinData.m_nGasTotalKinWithoutTax + kensinData.m_GasTax + kensinData.m_Reduce;
}


function createKensinInfo(kensinData) {
	if (mUserData.mKokfDat.mKenSumi && !mUserData.mNyukinMode && kensinData.m_isPrintKensin) {
		// document.getElementById("KensinInfoArea").style.display = "block";
		document.getElementById("ToyuKensinInfoArea").style.display = "none";
		createKensinInfoBase(kensinData);
	}
	const kotfDat = kensinData.mKotfDat;
	if (kotfDat != null && kotfDat.m_bKen_sumi == 1 && !mUserData.mNyukinMode && kensinData.m_isPrintToyu) {
		// document.getElementById("ToyuKensinInfoArea").style.display = "block";
		document.getElementById("KensinInfoArea").style.display = "none";
		createToyuKensinInfoBase(kensinData);
	}

	createKinInfo(kensinData);
	if (!mUserData.mNyukinMode) {
		// 内税を印字する
		if (mUserData.mSy2fDat.mSysOption.NOT_PRINT_UTIZEI == 0) { // 内税コメントの抑制フラグ	//SysOption.NOT_PRINT_UTIZEI.getIdx() = 15
			createUTaxComment(kensinData);
		}
		if (mUserData.mKokfDat.mKenSumi || (kotfDat != null && kotfDat.m_bKen_sumi == 1)) {
			createSeikyuComment(kensinData);
		}

		if (mUserData.mKokfDat.mKenSumi && !mUserData.mNyukinMode && kensinData.m_isPrintKensin) {
			createGasryokinSiki(kensinData);

			if (kensinData.m_bPrintHiwariComment) {
				createHiwariComment(kensinData);
			}
		}
	}
}


/**
	 * 検針情報印刷データの生成.
	 *
	 * @param kensinData        [in] {@link KensinData}     検針印刷データ
	 * @param printImageList    [in] {@link PrintImageList} 印刷データ格納先
	 * @throws MException 印刷データ生成時にエラーがあった場合に発生
*/
function createKensinInfoBase(kensinData) {
	var strLine = "";
	var sysfDat = mUserData.mSysfDat;
	var sy2fDat = mUserData.mSy2fDat;

	// 今回検針 ==> done
	const konkaiSSVal = document.getElementById("konkaiSSVal");
	konkaiSSVal.innerHTML = Other.Format(kensinData.m_Sisin, 1);

	const toritsukjJiZenkaiSSText = document.getElementById("toritsukjJiZenkaiSSText");
	if (kensinData.m_bChgMeter) {
		// メーター取替有
		toritsukjJiZenkaiSSText.innerHTML = "取付指針";
		if (kensinData.m_ChgMonth != 0 && kensinData.m_ChgDay != 0) {
			strLine = "(" + Other.DateFormat(kensinData.m_ChgMonth, kensinData.m_ChgDay, true) + ")";
		}
	}
	else {
		// 前回指針
		toritsukjJiZenkaiSSText.innerHTML = "前回指針";
		if (kensinData.m_KensinPrevMonth != 0 && kensinData.m_KensinPrevDay != 0) {
			strLine = "(" + Other.DateFormat(kensinData.m_KensinPrevMonth, kensinData.m_KensinPrevDay, true) + ")";
		}
	}
	if (strLine.length > 0) {
		const toritsukjJiZenkaiSSDate = document.getElementById("toritsukjJiZenkaiSSDate");
		toritsukjJiZenkaiSSDate.innerHTML = strLine;
	}


	strLine = Other.Format(kensinData.m_SisinPrev, 1);
	const toritsukjJiZenkaiSSVal = document.getElementById("toritsukjJiZenkaiSSVal");
	toritsukjJiZenkaiSSVal.innerHTML = strLine;

	if (kensinData.m_bChgMeter) {
		// メーター取替有は中間使用量を印字
		document.getElementById("chuukanShiyooRyooArea").style.display = "block";
		const chuukanShiyooRyooVal = document.getElementById("chuukanShiyooRyooVal");
		chuukanShiyooRyooVal.innerHTML = Other.Format(kensinData.m_ChukanSur, 1);
	} else {
		document.getElementById("chuukanShiyooRyooArea").style.display = "none";
	}





	// 使用量
	const shiyooRyooVal = document.getElementById("shiyooRyooVal");
	shiyooRyooVal.innerHTML = Other.Format(kensinData.m_NowUse, 1);

	// 矩形印字
	if (kensinData.mPrnZensr) {
		// document.getElementById("zenkaiShiyooRyooArea").style.display = "block";
		const zenkaiShiyooRyooVal = document.getElementById("zenkaiShiyooRyooVal");
		zenkaiShiyooRyooVal.innerHTML = Other.Format(kensinData.m_PreUse, 1);
	} else {
		document.getElementById("zenkaiShiyooRyooArea").style.display = "none";
	}
	if (kensinData.m_bPrintZenYearKenSr) {
		createZenYearkenSr(kensinData);
	} else {
		document.getElementById("zenYearkenSrArea").style.display = "none";
	}

	if (kensinData.m_bChgMeter) {
		document.getElementById("torihazuZenkaiSSArea").style.display = "block";
		// メーター交換有りは取外指針と前回指針を印字
		if (kensinData.m_ChgMonth != 0 && kensinData.m_ChgDay != 0) {
			strLine = "(" + Other.DateFormat(kensinData.m_ChgMonth, kensinData.m_ChgDay, true) + ")";
		}
		const torihazuSSDate = document.getElementById("torihazuSSDate");
		torihazuSSDate.innerHTML = strLine;
		const torihazuSSVal = document.getElementById("torihazuSSVal");
		torihazuSSVal.innerHTML = Other.Format(kensinData.m_ChgSisin, 1);


		if (kensinData.m_KensinPrevMonth != 0 && kensinData.m_KensinPrevDay != 0) {
			strLine = "(" + Other.DateFormat(kensinData.m_KensinPrevMonth, kensinData.m_KensinPrevDay, true) + ")";
			const zenkaiSSDate = document.getElementById("zenkaiSSDate");
			zenkaiSSDate.innerHTML = strLine;
		}

		const zenkaiSSVal = document.getElementById("zenkaiSSVal");
		zenkaiSSVal.innerHTML = Other.Format(kensinData.m_ChgZsisin, 1);
	} else {
		document.getElementById("torihazuZenkaiSSArea").style.display = "none";
	}

	if (document.getElementById("zenkaiShiyooRyooArea").style.display == "none" &&
		document.getElementById("zenYearkenSrArea").style.display == "none" &&
		document.getElementById("torihazuZenkaiSSArea").style.display == "none") {

	}


	//ガス料金
	//通常料金
	const gasuRyookinVal = document.getElementById("gasuRyookinVal");
	gasuRyookinVal.innerHTML = Other.KingakuFormat(kensinData.m_GasPay);

	var ko2fDat = kensinData.mKo2fDat;
	var hybfDat = kensinData.mHybfDat;
	if (kensinData.mPrnGasBaseKin) {
		document.getElementById("gasBaseKinArea").style.display = "block";
		//基本料金
		const kihonRyookinVal = document.getElementById("kihonRyookinVal");
		kihonRyookinVal.innerHTML = Other.KingakuFormat(kensinData.mGasBaseKin / 1000 + kensinData.m_nFacilityKin / 1000);

		if (kensinData.m_isHybrid && ko2fDat.mGashyb > 0) {
			// document.getElementById("tsuujooJuuryooRyookinArea").style.display = "block";
			document.getElementById("juuryooRyookinArea").style.display = "none";
			//通常従量料金
			const tsuujooJuuryooRyookinVal = document.getElementById("tsuujooJuuryooRyookinVal");
			tsuujooJuuryooRyookinVal.innerHTML = Other.KingakuFormat(kensinData.mGasBaseKin / 1000 + kensinData.m_nFacilityKin / 1000)
		} else {
			// document.getElementById("juuryooRyookinArea").style.display = "block";
			document.getElementById("tsuujooJuuryooRyookinArea").style.display = "none";
			//従量料金
			strLine = Other.KingakuFormat(kensinData.m_GasPay - kensinData.mGasBaseKin / 1000 - kensinData.m_nFacilityKin / 1000);
			const juuryooRyookinVal = document.getElementById("juuryooRyookinVal");
			juuryooRyookinVal.innerHTML = strLine;
		}

		if (kensinData.m_isHybrid && ko2fDat.mGashyb > 0) {
			var str;
			var nGasTotal;
			var hasData = false;
			for (var j = 0; j < 4; j++) {		//Ko2fDat.kHyb_MAX = 4
				if (hybfDat.mCusef[j] == 1 && ko2fDat.mFee[j] != 0) {

					//カウンタ名称
					str = kensinData.mCounterName[j].trim();
					nGasTotal = ko2fDat.mFee[j];
					strLine = Other.KingakuFormat(nGasTotal);
					const area = document.getElementById("counterNameArea");
					const row = document.createElement("div");
					row.className = "row";

					const text = document.createElement("div");
					text.className = "col-6 text-print ta-l fw-b wsp-text item";
					text.innerHTML = str;


					const valueArea = document.createElement("div");
					valueArea.className = "col-6";
					const value = document.createElement("div");
					value.className = "text-print ta-r fw-b wsp-text item valLine";
					value.innerHTML = strLine;

					const unit = document.createElement("div");
					unit.className = "text-print ta-r fw-b wsp-text item unitLine";
					unit.innerHTML = "円";

					valueArea.appendChild(value);
					valueArea.appendChild(unit);
					row.appendChild(text);
					row.appendChild(valueArea);
					area.appendChild(row);

					hasData = true;
				}
			}
			if (hasData) {
				document.getElementById("counterNameArea").style.display = "block";
			} else {
				document.getElementById("counterNameArea").style.display = "none";
			}
		} else {
			document.getElementById("counterNameArea").style.display = "none";
		}
	}

	if (kensinData.m_isHybrid) {
		//カウンター使用料 (nType is unnecessary, let it be zero)
		printCounterUseKin(ko2fDat, hybfDat);
	} else {
		document.getElementById("counterUseKinArea").style.display = "none";
	}

	// 消費税有り
	var gasfDat = mUserData.mGasfDat;
	if (gasfDat != null) {
		if (gasfDat.mTaxDiv == 3 && kensinData.m_GasTax != 0) {
			// document.getElementById("gasuShoohizeiArea").style.display = "block";
			const gasuShoohizeiVal = document.getElementById("gasuShoohizeiVal");
			gasuShoohizeiVal.innerHTML = Other.KingakuFormat(kensinData.m_GasTax);
		} else {
			document.getElementById("gasuShoohizeiArea").style.display = "none";
		}
	}

	if (sysfDat.mKnebFlg == 1) {
		var hasData = false;
		// 漢の値引き有り
		for (var i = 0; mUserData.m_lstKnebDat.length; i++) {
			var knebDat = mUserData.m_lstKnebDat[i];
			if (knebDat.m_nCode > 0 &&  // 割引コード設定有
				knebDat.m_nUmu == 1 &&  // 割引フラグ有
				knebDat.m_nRes == 1 &&  // 割引実績有
				knebDat.m_nKin != 0) {  // 割引金額有
				var warifDat = mUserData.getWarifDat(knebDat.m_nCode);
				const hinName = document.getElementById("hinName");
				hinName.innerHTML = warifDat.m_strHinName;

				strLine = Other.KingakuFormat(knebDat.m_nKin + knebDat.m_nTax);
				const nKinVal = document.getElementById("nKinVal");
				nKinVal.innerHTML = strLine;

				hasData = true;
			}
		}
		if (hasData) {
			document.getElementById("hinNameArea").style.display = "block";
		} else {
			document.getElementById("hinNameArea").style.display = "none";
		}
	} else {
		document.getElementById("hinNameArea").style.display = "none";
	}

	// 還元額有り
	if (sysfDat.mIfReduce && kensinData.m_Reduce != 0) {
		document.getElementById("kangconTnameArea").style.display = "block";
		// 差益還元額名称取得
		strLine = Other.getKangcontname(sy2fDat, mUserData);
		const kangconTnameVal = document.getElementById("kangconTnameVal");
		kangconTnameVal.innerHTML = strLine;

		strLine = Other.KingakuFormat(kensinData.m_Reduce);
		const reduceVal = document.getElementById("reduceVal");
		reduceVal.innerHTML = strLine;
	} else {
		document.getElementById("kangconTnameArea").style.display = "none";
	}

	if (kensinData.m_bPrintGasRyokinTotal) {
		document.getElementById("gasuRyookinSoogakuArea").style.display = "block";
		createGasryokinTotal(kensinData);
	} else {
		document.getElementById("gasuRyookinSoogakuArea").style.display = "none";
	}
}


function createZenYearkenSr(kensinData) {
	if (!kensinData.m_bPrintZenYearKenSr) {
		document.getElementById("zenYearkenSrArea").style.display = "none";
		return;
	}
	// document.getElementById("zenYearkenSrArea").style.display = "block";

	const zenYearkenSrVal = document.getElementById("zenYearkenSrVal");
	zenYearkenSrVal.innerHTML = Other.Format(kensinData.m_nZenYearKenSr, 1);
}


function createGasryokinTotal(kensinData) {
	const gasuRyookinSoogakuVal = document.getElementById("gasuRyookinSoogakuVal");
	gasuRyookinSoogakuVal.innerHTML = Other.KingakuFormat(kensinData.m_nGasTotalKin);
}


function createToyuKensinInfoBase(kensinData) {
	var strLine;
	var kotfDat = kensinData.mKotfDat;

	// 今回検針
	const nNowMeter = document.getElementById("nNowMeter");
	nNowMeter.innerHTML = Other.Format(kotfDat.m_nNow_meter, 1);

	const isMtChg = kotfDat.m_nBetw_meter > 0;
	const mtChgToyuPuseToyuText = document.getElementById("mtChgToyuPuseToyuText");
	const mtChgToyupPuseToyuDate = document.getElementById("mtChgToyupPuseToyuDate");
	const mtChgToyuPuseToyuSSVal = document.getElementById("mtChgToyuPuseToyuSSVal");
	if (isMtChg) {
		// メーター取替有
		//取付指針
		strLine = "取付指針";
		mtChgToyuPuseToyuText.innerHTML = strLine;
		if (kotfDat.m_bMtchg_m != 0 && kotfDat.m_bMtchg_d != 0) {
			strLine = " (" + Other.DateFormat(kotfDat.m_bMtchg_m, kotfDat.m_bMtchg_d, true) + ")";
		}
		mtChgToyupPuseToyuDate.innerHTML = strLine;
	}
	else {
		// 前回指針
		strLine = "前回指針";
		mtChgToyuPuseToyuText.innerHTML = strLine;
		if (kotfDat.m_bPuse_month != 0 && kotfDat.m_bPuse_day != 0) {
			strLine = " (" + Other.DateFormat(kotfDat.m_bPuse_month, kotfDat.m_bPuse_day, true) + ")";
		}
		mtChgToyupPuseToyuDate.innerHTML = strLine;
	}
	mtChgToyuPuseToyuSSVal.innerHTML = Other.Format(kotfDat.m_nPre_meter, 1);

	if (isMtChg) {
		document.getElementById("betwMeterArea").style.display = "block";
		// メーター取替有は中間使用量を印字
		const betwMeterVal = document.getElementById("betwMeterVal");
		betwMeterVal.innerHTML = Other.Format(kotfDat.m_nBetw_meter, 1);
	} else {
		document.getElementById("betwMeterArea").style.display = "none";
	}

	const loilUseVal = document.getElementById("loilUseVal");
	loilUseVal.innerHTML = Other.Format(kotfDat.m_nLoil_use, 1);


	if (kotfDat.m_bPuse_month != 0) {
		const preUseVal = document.getElementById("preUseVal");
		preUseVal.innerHTML = Other.Format(kotfDat.m_nPre_use, 1);
	}

	if (isMtChg) {
		// メーター交換有りは取外指針と前回指針を印字
		// 取外指針
		if (kotfDat.m_bMtchg_m != 0 && kotfDat.m_bMtchg_d != 0) {
			strLine = "(" + Other.DateFormat(kotfDat.m_bMtchg_m, kotfDat.m_bMtchg_d, true) + ")";
			const torihazuSSToyuDate = document.getElementById("torihazuSSToyuDate");
			torihazuSSToyuDate.innerHTML = torihazuSSToyuDate;
		}

		const torihazuSSToyuVal = document.getElementById("torihazuSSToyuVal");
		torihazuSSToyuVal.innerHTML = Other.Format(kotfDat.m_nMtchg_oldss, 1);

		if (kotfDat.m_bPuse_month != 0 && kotfDat.m_bPuse_day != 0) {
			strLine = "(" + Other.DateFormat(kotfDat.m_bPuse_month, kotfDat.m_bPuse_day, true) + ")";
			const zenkaiSSDate = document.getElementById("zenkaiSSDate");
			zenkaiSSDate.innerHTML = strLine;
		}

		const zenkaiSSVal = document.getElementById("zenkaiSSVal");
		zenkaiSSVal.innerHTML = Other.Format(kotfDat.m_nMtchg_zknss, 1);
	}


	//灯油メーター料金
	//通常料金
	const nFeeVal = document.getElementById("nFeeVal");
	nFeeVal.innerHTML = Other.Format(kotfDat.m_nFee, 1);

	if (kensinData.m_isToyuKinSep) {
		document.getElementById("toyuKinSepKinArea").style.display = "block";

		//基本料金
		const zenkaiSSVal = document.getElementById("zenkaiSSVal");
		zenkaiSSVal.innerHTML = Other.KingakuFormat(kotfDat.m_nLoil_base / 100);

		//従量料金(単価
		const loilUnitVal = document.getElementById("loilUnitVal");
		loilUnitVal.innerHTML = Other.KingakuFormat(kensinData.m_nLoilUnit);

		const juuryooRyookinToyuVal = document.getElementById("juuryooRyookinToyuVal");
		juuryooRyookinToyuVal.innerHTML = Other.KingakuFormat(kotfDat.m_nFee - (kotfDat.m_nLoil_base / 100));
	} else {
		document.getElementById("toyuKinSepKinArea").style.display = "none";
	}

	// 消費税有り
	if (kotfDat.m_nCon_tax != 0) {
		document.getElementById("conTaxToyuArea").style.display = "block";
		const conTaxToyuVal = document.getElementById("conTaxToyuVal");
		conTaxToyuVal.innerHTML = Other.KingakuFormat(kotfDat.m_nCon_tax);
	} else {
		document.getElementById("conTaxToyuArea").style.display = "none";
	}
}


function createKinInfo(kensinData) {
	var isPrint = false;
	var strLine;
	var sysfDat = mUserData.mSysfDat;

	if (!mUserData.mNyukinOnly) {
		// 入金のみの場合は前残等印字しない
		// 前月残高
		if (sysfDat.mIfDemand && kensinData.m_PreReceipt != 0) {
			document.getElementById("zengetsuZandakaArea").style.display = "block";
			// 前月御請求額
			const preReceiptVal = document.getElementById("preReceiptVal");
			preReceiptVal.innerHTML = Other.KingakuFormat(kensinData.m_PreReceipt);
		} else {
			document.getElementById("zengetsuZandakaArea").style.display = "none";
		}

		// その他売上
		if (sysfDat.mIfProceeds) {
			document.getElementById("sonohokaUriageArea").style.display = "block";
			if (kensinData.m_HmDay != 0) {
				document.getElementById("hmDayArea").style.display = "block";
				//本日お買い上げ額	
				const hmDayVal = document.getElementById("hmDayVal");
				hmDayVal.innerHTML = Other.KingakuFormat(kensinData.m_HmDay);
			} else {
				document.getElementById("hmDayArea").style.display = "none";
			}

			if (kensinData.m_HmMonth != 0) {
				document.getElementById("hmMonthArea").style.display = "block";
				//当月お買い上げ額
				const hmDayVal = document.getElementById("hmDayVal");
				hmDayVal.innerHTML = Other.KingakuFormat(kensinData.m_HmMonth);
			} else {
				document.getElementById("hmMonthArea").style.display = "none";
			}
		} else {
			document.getElementById("sonohokaUriageArea").style.display = "none";
		}

		var t_kokfdat = mUserData.mKokfDat;
		// 当月入金額
		if (sysfDat.mIfAdjust && t_kokfdat.mTReceipt != 0) {
			document.getElementById("toogetsuNyuuKingakuArea").style.display = "block";
			//当月入金額
			const hmDayVal = document.getElementById("hmDayVal");
			hmDayVal.innerHTML = Other.KingakuFormat(t_kokfdat.mTReceipt);
		} else {
			document.getElementById("toogetsuNyuuKingakuArea").style.display = "none";
		}

		// 当月調整額
		if (sysfDat.mIfAdjust && t_kokfdat.mTAdjust != 0) {
			document.getElementById("toogetsuChooseiGakuArea").style.display = "block";
			//当月調整額
			const tAdjustVal = document.getElementById("tAdjustVal");
			tAdjustVal.innerHTML = Other.KingakuFormat(t_kokfdat.mTAdjust);
		} else {
			document.getElementById("toogetsuChooseiGakuArea").style.display = "none";
		}

		// 今回請求額
		// 今回請求額用矩形生成
		strLine = Other.KingakuFormat(kensinData.m_Receipt) + "円";
		if (kensinData.m_Receipt >= 100000) {

		}
		const konkaiSeikyuuGakuVal = document.getElementById("konkaiSeikyuuGakuVal");
		konkaiSeikyuuGakuVal.innerHTML = strLine;

		// 調整額
		if (kensinData.m_Chosei != 0) {
			// 調整額有り
			isPrint = true;

			const choseiText = document.getElementById("choseiText");
			choseiText.innerHTML = getChoTitle();

			strLine = Other.KingakuFormat(kensinData.m_Chosei);
			const choseiVal = document.getElementById("choseiVal");
			choseiVal.innerHTML = strLine;
		}
	} else {
		document.getElementById("kinInfoArea").style.display = "block";
	}


	// 本日入金額
	if (kensinData.m_Nyukin != 0) {
		isPrint = true;
		if (kensinData.m_Azukarikin == kensinData.m_Nyukin) {
			strLine = "本日入金額";
		}
		else {
			strLine = "本日お預かり金額";
		}
		const honjitsuNyuuKingakuTitle = document.getElementById("honjitsuNyuuKingakuTitle");
		honjitsuNyuuKingakuTitle.innerHTML = strLine;


		strLine = Other.KingakuFormat(kensinData.getAzukarikin()) + "円";
		const honjitsuNyuuKingakuVal = document.getElementById("honjitsuNyuuKingakuVal");
		honjitsuNyuuKingakuVal.innerHTML = Other.KingakuFormat(kensinData.m_Azukarikin);
	}

	// おつり
	var t_otsuri = kensinData.m_Azukarikin - kensinData.m_Nyukin;
	if (t_otsuri > 0) {
		document.getElementById("honjitsuNyuuKingakuArea").style.display = "block";
		const otsuriVal = document.getElementById("otsuriVal");
		otsuriVal.innerHTML = Other.KingakuFormat(t_otsuri);
	} else {
		document.getElementById("honjitsuNyuuKingakuArea").style.display = "none";
	}

	// 差引残高
	if (kensinData.m_Zandaka != 0 && isPrint) {
		document.getElementById("sashihikiZandakaArea").style.display = "block";
		var lZandaka = kensinData.m_Zandaka() - GasRaterCom.calcPrebalance(sysfDat, mUserData.mKokfDat, mUserData.mSy2fDat);
		const sashihikiZandakaVal = document.getElementById("sashihikiZandakaVal");
		sashihikiZandakaVal.innerHTML = Other.KingakuFormat(lZandaka);
	} else {
		document.getElementById("sashihikiZandakaArea").style.display = "none";
	}
}


/**
 * 調整額名称の取得.
 *
 * @return String   調整額名称
 * @throws MException   エラー時に発生
 */
function getChoTitle() {
	var strChoTitle = "調整額";
	var sysfDat = mUserData.mSysfDat;
	var sy2fDat = mUserData.mSy2fDat;
	if (sy2fDat != null && sy2fDat.mSysfHmcd13 != 0) {
		const bFlag = 0;
		if (sy2fDat.mSysfHmcd13 > sysfDat.mSnvalue) {
			// 商品
			bFlag = 1;
		}
		const busfDat = mUserData.busfDat;
		if (busfDat != null) {
			strChoTitle = Other.cutStringSpace(busfDat.mName).trim();
		}
	}
	return strChoTitle;
}


function createUTaxComment(wkKensinData) {
	var wkStr;
	var wkTaxDat = Calc_UchiZei(wkKensinData, wkKensinData.m_isHybrid);

	if (wkTaxDat.mGUchiZei != 0 || wkTaxDat.mUchiZei != 0) {
		document.getElementById("uTaxCommentArea").style.display = "block";
		if (wkTaxDat.mGUchiZei != 0) {
			document.getElementById("uTaxComment1Area").style.display = "block";
			if (wkTaxDat.mUchiZei == 0) {
				//ガス売上には

				const gUchiZeiVal = document.getElementById("gUchiZeiVal");
				gUchiZeiVal.innerHTML = Other.KingakuFormat(wkTaxDat.mGUchiZei);

				const gUchiZeiText = document.getElementById("gUchiZeiText");
				gUchiZeiText.innerHTML = "円の消費税が含まれます。";
			} else {
				// ガス売上には
				const gUchiZeiVal = document.getElementById("gUchiZeiVal");
				gUchiZeiVal.innerHTML = Other.KingakuFormat(wkTaxDat.mGUchiZei);

				const gUchiZeiText = document.getElementById("gUchiZeiText");
				gUchiZeiText.innerHTML = "円、";
			}
		} else {
			document.getElementById("uTaxComment1Area").style.display = "none";
		}

		if (wkTaxDat.mUchiZei != 0) {
			document.getElementById("uTaxComment2Area").style.display = "block";
			if (wkTaxDat.mGUchiZei == 0) {
				wkStr = "他売上には";
			} else {
				wkStr = "売上には";
			}
			const taUriageUriageText = document.getElementById("taUriage-uriageText");
			taUriageUriageText.innerHTML = wkStr;


			const taUriageUriageVal = document.getElementById("taUriage-uriageVal");
			taUriageUriageVal.innerHTML = Other.KingakuFormat(wkTaxDat.mUchiZei);
		} else {
			document.getElementById("uTaxComment2Area").style.display = "none";
		}
	} else {
		document.getElementById("uTaxCommentArea").style.display = "none";
	}
}


/**
	* 内税の計算を実施.
	*
	* @param wkKensinData  [in] {@link KensinData} 印刷データ
	* @param isHybSeikyu   [in] boolean            ハイブリッド請求フラグ(true:有り, false:無し)
	* @return  {@link TaxDat}  内税計算後消費税データ
*/
function Calc_UchiZei(wkKensinData, isHybSeikyu) {
	//初期化
	var wTaxdat;	// wTaxdat
	var flo;
	var i;
	var wk_taxr;

	wTaxdat.mGUchiZei = 0;
	wTaxdat.mUchiZei = 0;

	var wkSysf = mUserData.mSysfDat;
	var wkSys2f = mUserData.mSy2fDat;
	var wkKokf = mUserData.mKokfDat;
	var wkKo2f = wkKensinData.mKo2fDat;
	var wkHybf = wkKensinData.mHybfDat;
	var wkGasf = wkKensinData.m_GasfDat;

	//ガスの内税
	if (wkKensinData.m_GasfDat.mTaxDiv == 2) {	//内税
		wk_taxr = GasRaterCom.getKenTaxr(wkKokf, wkSysf, wkSysf.mTax_yy, wkSysf.mTax_mm, wkSysf.mTax_dd
			, wkSysf.mConsumTax, wkSysf.mTaxr_old, wkSysf.mTaxr_new);
		ハイブリッドでの内税額の対応
		var wk_kin;
		wk_kin = wkKokf.mFee;
		if (isHybSeikyu && wkKo2f.mGashyb > 0) {
			if (wkKo2f.mChoKin != 0 || wkKo2f.mChoTax != 0) {//値引きが発生しないときには、通常料金とする。
				//ハイブリッド料金
				wk_kin = wkKo2f.mNorKin;
				for (var j = 0; j < 4; j++) {	////Ko2fDat.kHyb_MAX = 4
					if (wkHybf.mCusef[j] == 1 && wkKo2f.mFee[j] != 0) {
						wk_kin += wkKo2f.mFee[j];
					}
				}
			}
		}

		flo = (wk_kin * wk_taxr) / (1000. + wk_taxr);
		wTaxdat.mGUchiZei += (Other.hasCom(flo * 1000., wkGasf.mTaxAdd, wkGasf.mTaxMult, 1000.) / 1000.);
	}

	// 販売データ
	var wkHmefList = mUserData.getHmef(0);
	var wkHmefList1 = mUserData.getHmef(1);
	var wkHmefList2 = mUserData.getHmef(2);
	var mIsUriage;
	try {
		mIsUriage = isUriage(wkHmefList, wkHmefList1, wkHmefList2, wkSysf);


		//販売明細の内税
		if ((wkKokf.mUriSumi && mIsUriage) ||//売上済区分 0:未, 1:済み	かつ明細あり
			(wkKokf.mSimeF == 0 && wkKokf.mHme01Ken != 0) ||	//フラグ締日処理(0:未 1:済)//販売明細(締前) ・件数
			(wkKokf.mSimeF == 1 && wkKokf.mHme00Ken != 0)) {	//フラグ締日処理(0:未 1:済)//販売明細(締後) ・件数
			if (wkHmefList.length > 0) {
				wTaxdat.mUchiZei += calcUtaxHm(wkHmefList, wkSysf, wkSys2f);
			}
			if (wkHmefList1.length > 0) {
				wTaxdat.mUchiZei += calcUtaxHm(wkHmefList1, wkSysf, wkSys2f);
			}
			if (wkHmefList2.length > 0) {
				wTaxdat.mUchiZei += calcUtaxHm(wkHmefList2, wkSysf, wkSys2f);
			}
		}
	} catch (err) {
		console.log(err);
	}

	return wTaxdat;	//正常終了
}


/**
	* 売上明細の存在チェックを実施
	* @param   hmefDat0    [in]    HmefDat[]   締前明細一覧
	* @param   hmefDat1    [in]    HmefDat[]   締後明細一覧
	* @param   hmefDat2    [in]    HmefDat[]   ハンディ明細一覧
	* @param   sysfDat     [in]    SysfDat     システム設定データ
	* @return  boolean true: 売上明細有り, false: 売上明細無し
*/
function isUriage(hmefDat0, hmefDat1, hmefDat2, sysfDat) {
	return isUriage_(hmefDat0, sysfDat, false) || isUriage_(hmefDat1, sysfDat, false) || isUriage_(hmefDat2, sysfDat, false);
}


/**
	* 売上明細の存在チェック.
	*
	* @param hmefDats          [in] HmefDat[]          明細一覧
	* @param sysfDat           [in] {@link SysfDat}    システムデータ
	* @param isIncludeNyuCho   [in] boolean            入金・調整を含めるか(true:含める, false:含めない)
	* @return  boolean 対象明細の存在有無(true:存在する, false:存在しない)
*/
function isUriage_(hmefDats, sysfDat, isIncludeNyuCho) {
	if (hmefDats == null) {
		return false;
	}
	var sSnvalue = sysfDat.mSnvalue;
	for (var i = 0; i < hmefDats.length; i++) {
		var hmefDat = hmefDats[i];
		if (hmefDat.mUsef && (hmefDat.mHmCode >= sSnvalue || isIncludeNyuCho)) {
			return true;
		}
	}
	return false;
}



/**
	* 販売明細情報の内税を作成する。
	*
	* @param wkHmef    [in] HmefDat[]      販売明細データ
	* @param sysf      [in] SysfDat        システムデータ
	* @throws MException 印刷データ作成時にエラーがあった場合に発生
*/
function calcUtaxHm(wkHmef, sysf, sysf2) {
	var flo = 0;
	var wkUtax = 0;

	if (wkHmef == null) {
		return 0;
	}
	for (var i = 0; i < wkHmef.length; i++) {
		var wkHmefDat = wkHmef[i];
		if (!wkHmefDat.mUsef || wkHmefDat.mHmCode < sysf.mSnvalue) {
			continue;
		}
		// 金額
		if (wkHmefDat.mLeasKind == 1) {
			if (!sysf.mIfAlarm) {
				continue;
			}
		} // リースsys_fhmcd05
		else if (wkHmefDat.mHmCode == sysf.mHinCd9) {
			if (!sysf.mIfLampoil) {
				continue;
			}
		} // 灯油
		else if (wkHmefDat.mHmCode == sysf2.mSysfHbcd04) {
			if (!sysf.mIfDiv) {
				continue;
			}
		} // 分割金
		else if (wkHmefDat.mHmCode == sysf2.mSysfHmcd02) {
			if (!sysf.mIfProceeds) {
				continue;
			}
		} // ガスｺｰﾄﾞ
		else {
			if (!sysf.mIfProceeds && wkHmefDat.mHmCode != sysf2.mSysfHmcd14) {
				continue;
			}
		} // その他金額(遅収料金は必ず印字)
		wkUtax += calcUtax(sysf, wkHmefDat);
	}

	return wkUtax;
}


/**
	* 内税料金の取得.
	*
	* @param sysfDat   [in] {@link SysfDat}    システムデータ
	* @param hmefDat   [in] {@link HmefDat}    販売明細データ
	* @return  int 内税金額
	* @throws MException   計算失敗時に発生
*/
function calcUtax(sysfDat, hmefDat) {
	var nUtax = 0;
	if (hmefDat.mTaxKu == 2) {	//内税
		var flo = (parseFloat(hmefDat.mKin) * (parseFloat(hmefDat.mTaxR))) / parseFloat(hmefDat.mTaxR + 1000);
		//  商品マスタに端数処理が登録されていない時のみ、システムの端数処理を使用する。2012.09.26
		var shofDat = mUserData.getShofDat(hmefDat.mHmCode, hmefDat.mHbCode);

		if (shofDat.mFracAddTax == 0 && shofDat.mFracAddMult == 0) {
			//　消費税：端数処理　システムをしようする。 Ver2.4.13 以前
			nUtax = parseInt(Other.hasCom(flo * 1000., parseInt(sysfDat.mFracAddTax), parseInt(sysfDat.mFracMulTax), 1000.) / 1000.);
		} else {
			//　消費税：端数処理　　商品の端数処理を使用する。V2.4.14 以降
			nUtax = parseInt(Other.hasCom(flo * 1000., shofDat.mFracAddTax, shofDat.mFracAddMult, 1000.) / 1000.);
		}
	}
	return nUtax;
}


/**
	* 請求コメント印刷データの生成.
	*
	* @param kensinData        [in] {@link KensinData}     検針印刷データ
*/
function createSeikyuComment(kensinData) {
	// 入金額が0円の場合
	if (kensinData.m_Nyukin == 0) {
		document.getElementById("seiKyuCommentArea").style.display = "block";
	} else {
		document.getElementById("seiKyuCommentArea").style.display = "none";
	}
}




function createGasryokinSiki(kensinData) {
	var gasfDat = kensinData.m_GasfDat;
	if (gasfDat != null && kensinData.m_isVisibleGas) {
		if (kensinData.m_bPrintGasRyokinSiki) {
			if (gasfDat.mSum != 4) {
				document.getElementById("gasryokinSikiArea").style.display = "block";

				//ガス料金内訳
				var strTitle = "";
				if (gasfDat.mTaxDiv == 2) {
					strTitle = "（消費税込み）";
				} else if (gasfDat.mTaxDiv == 3) {
					strTitle = "（消費税抜き）";
				}
				const gasuRyookinUchiwakeText = document.getElementById("gasuRyookinUchiwakeText");
				gasuRyookinUchiwakeText.innerHTML = strTitle;

				//基本料金
				const gasBaseKinTBVal = document.getElementById("gasBaseKinTBVal");
				gasBaseKinTBVal.innerHTML = Other.KingakuFormat(kensinData.mGasBaseKin / 1000);
				if (kensinData.m_bPrintGasFacilityKin) {
					document.getElementById("facilityKinTBArea").style.display = "block";
					// 設備料金印字
					// 設備料金
					const facilityKinTBVal = document.getElementById("facilityKinTBVal");
					facilityKinTBVal.innerHTML = Other.KingakuFormat(kensinData.m_nFacilityKin / 1000);
				} else {
					document.getElementById("facilityKinTBArea").style.display = "none";
				}

				// ガス料金式印字
				switch (kensinData.m_nPrintGasRyokinSikiPtn) {
					case 0: // 秋元式
						document.getElementById("gasryokinAArea").style.display = "block";
						document.getElementById("gasryokinOArea").style.display = "none";
						printGasryokinA(kensinData);
						break;
					case 1: // 大口式
						document.getElementById("gasryokinOArea").style.display = "block";
						document.getElementById("gasryokinAArea").style.display = "none";
						printGasryokinO(kensinData);
						break;
				}

				if (kensinData.m_nPrintGasRyokinSikiPtn == 0) {
					// 合計
					document.getElementById("gasTotalKinWithoutTaxArea").style.display = "block";
					const gasTotalKinWithoutTaxVal = document.getElementById("gasTotalKinWithoutTaxVal");
					gasTotalKinWithoutTaxVal.innerHTML = Other.KingakuFormat(kensinData.m_nGasTotalKinWithoutTax);
				} else {
					document.getElementById("gasTotalKinWithoutTaxArea").style.display = "none";
				}
			} else {
				document.getElementById("gasryokinSikiArea").style.display = "none";
			}
		} else {
			document.getElementById("gasryokinSikiArea").style.display = "none";
		}
		// ガス料金コメントの印字
		printGasryokinComment(gasfDat.mGextDat);
	} else {
		document.getElementById("gasryokinSikiArea").style.display = "none";
	}
}



/**
	* 秋元式ガス料金式印字
	*
	* @param printImageList    [in] {@link PrintImageList} 印字データ
	* @param kensinData        [in] {@link KensinData}     検針データ
	* @return int 伝票印字後の高さ
*/
function printGasryokinA(kensinData) {
	var nPrnGasKin = kensinData.mGasBaseKin + kensinData.m_nFacilityKin;
	var nNextBaseKin;
	var nWorkKin;
	var gasfDat = kensinData.m_GasfDat;
	var nStartIdx = kensinData.m_nStartIdx;
	var lstGstpDat = gasfDat.m_lstGstpDat;
	var ko2f = kensinData.mKo2fDat;
	var strStep;
	var gstpDat;	// khởi tạo gstDat Hieu

	if (gasfDat.mSum != 3) {
		gstpDat = lstGstpDat[nStartIdx];
	}
	else {
		gstpDat = null;
		gstpDat.mUplimit = 999999;
		gstpDat.mAdd = parseInt(kensinData.mGasAddKin * 10);
		gstpDat.mBase = parseInt(kensinData.mGasBaseKin);
		gstpDat.mBase = parseInt(kensinData.mGasBaseKin);
	}
	var nGasTotalKin = parseInt(kensinData.m_GasPay - kensinData.mGasBaseKin / 1000 - kensinData.m_nFacilityKin / 1000);

	if (kensinData.m_isHybrid && ko2f.mGashyb != 0) {
		strStep = "通常使用分従量料金";
	} else {
		strStep = "従量料金";
	}
	const gasryokinAText = document.getElementById("gasryokinAText");
	gasryokinAText.innerHTML = strStep;

	var nAddKin = gstpDat.mAdd;
	if (gasfDat.mSum == 2 || nAddKin > 0) {
		nAddKin += gasfDat.mChoTanka;
	}
	nAddKin = Other.hasCom(nAddKin, gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000.);
	nAddKin += (nAddKin * gasfDat.mRiseFall / 1000);

	// add new s
	var nSur = kensinData.m_NowUse;
	if (kensinData.m_isHybrid && ko2f.mGashyb > 0) {
		// ハイブリッドの場合は通常カウンタ使用量を設定
		nSur = kensinData.m_nNorSr;
		nGasTotalKin = (ko2f.mNorKin - kensinData.mGasBaseKin / 1000 - kensinData.m_nFacilityKin / 1000);
	}

	var nGasStepKin = parseInt(nAddKin * gstpDat.mUplimit * 0.00001 + 0.0001);
	if (kensinData.m_bSingleStep || nSur <= gstpDat.mUplimit) {
		nGasStepKin = nGasTotalKin;
	}
	else {
		if (nAddKin == 0) {
			// 単価無し
			nGasStepKin = 0;
			if (gasfDat.mSum == 1 && nStartIdx < gasfDat.mLine) {
				// 通常料金式では、次のステップの基本料金迄の金額を計算
				nWorkKin = lstGstpDat[nStartIdx + 1].mBase;
				nWorkKin = Other.hasCom(nWorkKin, gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000.);
				nWorkKin *= 1000 + gasfDat.mRiseFall;
				nNextBaseKin = parseInt(Other.hasCom(nWorkKin, gasfDat.mFrac2Add, gasfDat.mFrac2Mult, 10000000.) / 10000000.);
				// ステップ間の金額 = 次ステップの基本料金 - 印字した前までの金額
				nGasStepKin = nNextBaseKin - nPrnGasKin / 1000;
			}
		}
	}
	nGasTotalKin -= nGasStepKin;
	nPrnGasKin += nGasStepKin * 1000;

	printGasRyokinStep_A(1, gstpDat.mUplimit, nAddKin, nGasStepKin, "gasryokinASecondRow");

	if (!kensinData.m_bSingleStep && nSur > gstpDat.mUplimit) {
		nStartIdx++;
		const gasryokinAList = document.getElementById("gasryokinAList");
		for (var i = nStartIdx; i < lstGstpDat.length; i++) {
			var prevGstpDat = gstpDat;
			gstpDat = lstGstpDat[i];

			// ステップの単価を印字(増減率を考慮)
			nAddKin = gstpDat.mAdd;
			if (gasfDat.mSum == 2 || nAddKin > 0) {
				nAddKin += gasfDat.mChoTanka;
			}
			nAddKin = Other.hasCom(nAddKin, gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000.);
			nAddKin += nAddKin * gasfDat.mRiseFall / 1000;

			if (nSur < gstpDat.mUplimit) {
				nGasStepKin = nGasTotalKin;
			} else {
				if (nAddKin == 0) {
					// 単価無し
					nGasStepKin = 0;
					if (gasfDat.mSum == 1 && i < gasfDat.mLine) {
						// 通常料金式では、次のステップの基本料金迄の金額を計算
						nWorkKin = lstGstpDat[i + 1].mBase;
						nWorkKin = Other.hasCom(nWorkKin, gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000.);
						nWorkKin *= 1000 + gasfDat.mRiseFall;
						nNextBaseKin = (Other.hasCom(nWorkKin, gasfDat.mFrac2Add, gasfDat.mFrac2Mult, 10000000.) / 10000000.);
						// ステップ間の金額 = 次ステップの基本料金 - 印字した前までの金額
						nGasStepKin = nNextBaseKin - nPrnGasKin / 1000;
					}
				}
				else {
					nGasStepKin = (nAddKin * (gstpDat.mUplimit - prevGstpDat.mUplimit) * 0.00001 + 0.0001);
				}
				nGasTotalKin -= nGasStepKin;
			}
			nPrnGasKin += nGasStepKin * 1000;

			const newLine = document.createElement("tr");
			newLine.id = "gasryokinAList-row" + String(i);
			gasryokinAList.appendChild(newLine);
			printGasRyokinStep_A(prevGstpDat.mUplimit + 1, gstpDat.mUplimit, nAddKin, nGasStepKin, "gasryokinAList-row" + String(i));

			if (nSur <= gstpDat.mUplimit) {
				break;
			}
		}
	}

	printGasryokin_Hybrid(kensinData, 0, "gasryokinHybridAArea");
}



/**
	* ガス料金式(A式)印刷データの生成.
	*
	* @param dLowLimit         [in] double                 下限値
	* @param dUpLimit          [in] double                 上限値
	* @param dAddKin           [in] double                 加算値
	* @param dTotalKin         [in] double                 ステップ金額
	* @return int  印刷後の高さ
*/
function printGasRyokinStep_A(dLowLimit, dUpLimit, dAddKin, dTotalKin, areaName) {
	var area = document.getElementById(areaName);

	const td = document.createElement("td");
	td.className = "text-print ta-r wsp-text";

	const dLowLimitStepA = document.createElement("span");
	dLowLimitStepA.className = "text-print ta-r wsp-text tb-item tbw-16";
	dLowLimitStepA.appendChild(document.createTextNode(Other.printformat(parseInt(dLowLimit), "####0.0", 1)));


	const arrow = document.createElement("span");
	arrow.className = "text-print ta-r wsp-text tb-item tbw-6";
	arrow.appendChild(document.createTextNode("→"));

	const dUpLimitStepA = document.createElement("span");
	dUpLimitStepA.className = "text-print ta-r wsp-text tb-item tbw-22";
	dUpLimitStepA.appendChild(document.createTextNode(Other.printformat(parseInt(dUpLimit), "####0.0", 1)));

	const tanka = document.createElement("span");
	tanka.className = "text-print ta-r wsp-text tb-item tbw-28";
	tanka.appendChild(document.createTextNode("m3 単価"));

	const dAddKinStepA = document.createElement("span");
	dAddKinStepA.className = "text-print ta-r wsp-text tb-item tbw-22";
	dAddKinStepA.appendChild(document.createTextNode(Other.format("#,##0.00", dAddKin, 4)));

	const unitRow = document.createElement("span");
	unitRow.className = "text-print ta-r wsp-text tb-item tbw-6";
	unitRow.appendChild(document.createTextNode("円"));

	td.appendChild(dLowLimitStepA);
	dLowLimitStepA.after(arrow);
	arrow.after(dUpLimitStepA);
	dUpLimitStepA.after(tanka);
	tanka.after(dAddKinStepA);
	dAddKinStepA.after(unitRow);


	const tdRight = document.createElement("td");
	tdRight.className = "text-print item td-r";
	const divTotal = document.createElement("div");
	divTotal.className = "text-print ta-r wsp-text tb-item";
	divTotal.appendChild(document.createTextNode(Other.KingakuFormat(dTotalKin)));

	const spanTotal = document.createElement("span");
	spanTotal.className = "text-print ta-r wsp-text tb-item";
	spanTotal.appendChild(document.createTextNode("円"));
	divTotal.after(spanTotal);
	tdRight.appendChild(divTotal);

	area.appendChild(td);
	td.after(tdRight);
}


/**
	 * ガス料金式(O式)印刷データの生成.
	 *
	 * @param dLowLimit         [in] double                 下限値
	 * @param dUpLimit          [in] double                 上限値
	 * @param dAddKin           [in] double                 加算値
	 * @return  int 印刷後の高さ
	 */
function printGasRyokinStep_O(dLowLimit, dUpLimit, dAddKin, areaName) {
	var area = document.getElementById(areaName);

	const td = document.createElement("td");
	td.className = "text-print ta-r wsp-text item";

	const dLowLimitHybrid = document.createElement("span");
	dLowLimitHybrid.className = "text-print ta-r wsp-text item tb-item tbw-35";
	dLowLimitHybrid.appendChild(document.createTextNode(Other.printformat(parseInt(dLowLimit), "####0.0", 1)));

	const rangeHybrid = document.createElement("span");
	rangeHybrid.className = "text-print ta-r wsp-text item tb-item tbw-20";
	rangeHybrid.appendChild(document.createTextNode("m3 ～ "));

	const dUpLimitHybrid = document.createElement("span");
	dUpLimitHybrid.className = "text-print ta-r wsp-text item tb-item tbw-35";
	dUpLimitHybrid.appendChild(document.createTextNode(Other.printformat(parseInt(dUpLimit), "####0.0", 1)));

	const unitHybrid = document.createElement("span");
	unitHybrid.className = "text-print ta-r wsp-text item tb-item tbw-10";
	unitHybrid.appendChild(document.createTextNode("m3"));

	td.appendChild(dLowLimitHybrid);
	dLowLimitHybrid.after(rangeHybrid);
	rangeHybrid.after(dUpLimitHybrid);
	dUpLimitHybrid.after(unitHybrid);


	const tdRight = document.createElement("td");
	tdRight.className = "text-print item td-r";
	const divTotal = document.createElement("div");
	divTotal.className = "text-print ta-r wsp-text item tb-item";
	divTotal.appendChild(document.createTextNode(Other.format("#,##0.00", dAddKin, 4)));

	const spanTotal = document.createElement("span");
	spanTotal.className = "text-print ta-r wsp-text item tb-item";
	spanTotal.appendChild(document.createTextNode("円"));
	divTotal.after(spanTotal);
	tdRight.appendChild(divTotal);

	area.appendChild(td);
	td.after(tdRight);
}


// function test() {
// 	var area = document.getElementById("gasryokinASecondRow");
// 	const td = document.createElement("td");
// 	td.className = "text-print ta-r wsp-text item";

// 	const dLowLimitStepA = document.createElement("span");
// 	dLowLimitStepA.className = "text-print ta-r wsp-text item tb-item tbw-16";
// 	dLowLimitStepA.appendChild(document.createTextNode("121"));

// 	const arrow = document.createElement("span");
// 	arrow.className = "text-print ta-r wsp-text item tb-item tbw-6";
// 	arrow.appendChild(document.createTextNode("→"));

// 	const dUpLimitStepA = document.createElement("span");
// 	dUpLimitStepA.className = "text-print ta-r wsp-text item tb-item tbw-22";
// 	dUpLimitStepA.appendChild(document.createTextNode("123"));

// 	const tanka = document.createElement("span");
// 	tanka.className = "text-print ta-r wsp-text item tb-item tbw-28";
// 	tanka.appendChild(document.createTextNode("m3 単価"));

// 	const dAddKinStepA = document.createElement("span");
// 	dAddKinStepA.className = "text-print ta-r wsp-text item tb-item tbw-22";
// 	dAddKinStepA.appendChild(document.createTextNode("393"));

// 	const unitRow = document.createElement("span");
// 	unitRow.className = "text-print ta-r wsp-text item tb-item tbw-6";
// 	unitRow.appendChild(document.createTextNode("円"));

// 	td.appendChild(dLowLimitStepA);
// 	dLowLimitStepA.after(arrow);
// 	arrow.after(dUpLimitStepA);
// 	dUpLimitStepA.after(tanka);
// 	tanka.after(dAddKinStepA);
// 	dAddKinStepA.after(unitRow);




// 	const tdRight = document.createElement("td");
// 	tdRight.className = "text-print item td-r";
// 	const divTotal = document.createElement("div");
// 	divTotal.className = "text-print ta-r wsp-text item tb-item";
// 	divTotal.appendChild(document.createTextNode("2221"));

// 	const spanTotal = document.createElement("span");
// 	spanTotal.className = "text-print ta-r wsp-text item tb-item";
// 	spanTotal.appendChild(document.createTextNode("円"));
// 	divTotal.after(spanTotal);
// 	tdRight.appendChild(divTotal);

// 	area.appendChild(td);
// 	td.after(tdRight);
// }


// test();




/**
	 * ハイブリッドガス料金式の印字(秋元式)
	 *
	 * @param printImageList    [in] {@link PrintImageList} 帳票データ
	 * @param kensinData        [in] {@link KensinData}     印字データ
	 * @return int 印字後の伝票高さ
	 */
function printGasryokin_Hybrid(kensinData, nType, areaName) {
	var ko2fDat = kensinData.mKo2fDat;
	if (kensinData.m_isHybrid && ko2fDat.mGashyb > 0) {
		var hybf = kensinData.mHybfDat; //ﾊｲﾌﾞﾘｯﾄﾞﾒｰﾀｰ料金表
		var nAddKin;
		var nTotalKin;
		var nStep;
		var nGasTotal;
		var bSingleStep;
		var str;

		const gasryokinHybridArea = document.getElementById(areaName);
		for (var j = 0; j < 4; j++) {	//Ko2fDat.kHyb_MAX = 4 Hieu
			if (hybf.mCusef[j] == 1 && ko2fDat.mFee[j] != 0) {
				nStep = 0;
				//カウンタ名称 (counter name)
				str = kensinData.mCounterName[j];

				const gasryokinHybridText = document.createElement("td");
				gasryokinHybridText.className = "text-print item";
				gasryokinHybridText.appendChild(document.createTextNode(str));
				const space = document.createElement("td");
				space.className = "text-print item td-r";
				const row = document.createElement("tr");
				row.appendChild(gasryokinHybridText);
				gasryokinHybridText.after(space);
				gasryokinHybridArea.appendChild(row);




				nGasTotal = ko2fDat.mFee[j];
				nAddKin = hybf.mGasAdd[j][nStep] * 10;
				var nSur = kensinData.m_nHybGasUse[j];
				if (nSur <= hybf.mGasLimit[j][nStep]) {
					// 最終ステップのガス料金は残りの金額
					nTotalKin = nGasTotal;
					bSingleStep = true;
				} else {
					nTotalKin = nAddKin * hybf.mGasLimit[j][nStep];
					nTotalKin = nTotalKin * 0.00001 + 0.0001;
					nGasTotal -= nTotalKin;
					bSingleStep = false;
				}


				// ステップの下限値～上限値を印字
				const newRow = document.createElement("tr");
				newRow.id = "gasryokinHybrid_Val" + String(j);
				if (nType == 0) {
					// A式
					printGasRyokinStep_A(1, hybf.mGasLimit[j][nStep], nAddKin, nTotalKin, "gasryokinHybrid_Val" + String(j));
				}
				else {
					// O式
					printGasRyokinStep_O(1, hybf.mGasLimit[j][nStep], nAddKin, "gasryokinHybrid_Val" + String(j));
				}
				gasryokinHybridArea.appendChild(newRow);

				if (!bSingleStep) {
					nStep++;
					for (; nStep < 10; nStep++) {
						if (hybf.mGasLimit[j][nStep] == 0) {
							// ステップ上限が0の場合
							// 料金表の印字を終了
							break;
						}
						// ガス料金の従量料金
						var nStepSur = hybf.mGasLimit[j][nStep] - hybf.mGasLimit[j][nStep - 1];
						nAddKin = hybf.mGasAdd[j][nStep] * 10;
						if (nSur <= hybf.mGasLimit[j][nStep]) {
							// 最終ステップのガス料金は残りの金額
							nTotalKin = nGasTotal;
						} else {
							nTotalKin = nAddKin * nStepSur;
							nTotalKin = nTotalKin * 0.00001 + 0.0001;
							nGasTotal -= nTotalKin;
						}

						// ステップの下限値～上限値を印字
						const newRow = document.createElement("tr");
						newRow.id = "gasryokinHybrid_ValSG" + String(nStep);
						if (nType == 0) {
							// A式
							printGasRyokinStep_A(hybf.mGasLimit[j][nStep - 1] + 1, hybf.mGasLimit[j][nStep], nAddKin, nTotalKin, "gasryokinHybrid_ValSG" + String(nStep));
						}
						else {
							// O式
							printGasRyokinStep_O(hybf.mGasLimit[j][nStep - 1] + 1, hybf.mGasLimit[j][nStep], nAddKin, "gasryokinHybrid_ValSG" + String(nStep));
						}
						gasryokinHybridArea.appendChild(newRow);

						if (nSur <= hybf.mGasLimit[j][nStep]) {
							// ガス使用量がステップ上限より小さい場合
							// 料金式の印字を終了
							break;
						}
					}
				}
			}
		}

		//カウンター使用料
		printCounterUseKin(ko2fDat, hybf);
	}
}


/**
	* カウンタ使用料
	*
	* @param ko2fDat              [in] {@link Ko2fDat}        顧客ハイブリッドデータ
	* @param hybfDat              [in] {@link HybfDat}        ハイブリッド料金表データ
   * @return  int 印字後の伝票高さ
*/
function printCounterUseKin(ko2fDat, hybfDat) {
	if (ko2fDat.mUseKin > 0 && hybfDat.mUseSncode > 0) {
		//カウンタ使用料
		document.getElementById("counterUseKinArea").style.display = "block";

		var nKin = ko2fDat.mUseKin;
		if (ko2fDat.mUseTaxku == 3) {
			nKin += ko2fDat.mUseTax;
		}
		const counterUseKinVal = document.getElementById("counterUseKinVal");
		counterUseKinVal.innerHTML = Other.KingakuFormat(nKin);
	} else {
		document.getElementById("counterUseKinArea").style.display = "none";
	}
}


/**
	* 大口式ガス料金式印字
	*
	* @param printImageList    [in] {@link PrintImageList} 印字データ
	* @param nYpos             [in] int                    伝票印字開始高さ
	* @param kensinData        [in] {@link KensinData      検針データ
	  * @return int 伝票印字後の高さ
*/
function printGasryokinO(kensinData) {
	var gasfDat = kensinData.m_GasfDat;
	var ko2fDat = kensinData.mKo2fDat;
	var strStep = "";

	var nStartIdx = kensinData.m_nStartIdx;
	var lstGstpDat = gasfDat.m_lstGstpDat;
	var gstpDat;
	if (gasfDat.mSum != 3) {
		gstpDat = lstGstpDat[kensinData.getStartIdx()];
	}
	else {
		gstpDat = null;
		gstpDat.mUplimit = 999999;
		gstpDat.mBase = parseInt(kensinData.mGasBaseKin * 10);
		gstpDat.mAdd = parseInt(kensinData.mGasAddKin);
	}

	if (kensinData.m_isHybrid && ko2fDat.mGashyb != 0) {
		strStep.append("通常使用分従量料金");
	} else {
		strStep.append("従量料金");
	}
	const gasryokinOText = document.getElementById("gasryokinOText");
	gasryokinOText.innerHTML = strStep;

	strStep = "";
	if (kensinData.m_bSingleStep) {
		strStep.append("一律");
		document.getElementById("singleStepArea").style.display = "block";
		document.getElementById("singleStepValArea").style.display = "none";
	}
	else {
		document.getElementById("singleStepValArea").style.display = "block";
		document.getElementById("singleStepArea").style.display = "none";

		const dLowLimitSingleStepVal = document.getElementById("dLowLimitSingleStepVal");
		dLowLimitSingleStepVal.innerHTML = Other.printformat(1, "####0.0", 1);


		const dUpLimitSingleStepVal = document.getElementById("dUpLimitSingleStepVal");
		dUpLimitSingleStepVal.innerHTML = Other.printformat(gstpDat.mUplimit, "####0.0", 1);
	}

	var nAddKin = gstpDat.mAdd;
	if (gasfDat.mSum == 2 || nAddKin > 0) {
		nAddKin += gasfDat.mChoTanka;
	}
	nAddKin = Other.hasCom(nAddKin, gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000.);
	if (gasfDat.mRiseFall != 0) {
		nAddKin += (nAddKin * gasfDat.mRiseFall / 1000);
	}

	// add new start
	var nSur = kensinData.getNowUse();
	if (kensinData.m_isHybrid && ko2fDat.mGashyb > 0) {
		// ハイブリッドの場合は通常カウンタ使用量を設定
		nSur = kensinData.m_nNorSr;
	}

	strStep = "";
	strStep = Other.format("#,##0.00", nAddKin, 4);
	const addKinSingleStepVal = document.getElementById("addKinSingleStepVal");
	addKinSingleStepVal.innerHTML = strStep;

	if (!kensinData.m_bSingleStep && nSur > gstpDat.mUplimit) {
		nStartIdx++;
		for (var i = nStartIdx; i < lstGstpDat.length; i++) {
			var prevGstpDat = gstpDat;
			gstpDat = lstGstpDat[i];
			nAddKin = gstpDat.mAdd;
			if (gasfDat.mSum == 2 || nAddKin > 0) {
				nAddKin += gasfDat.mChoTanka;
			}
			nAddKin = Other.hasCom(nAddKin, gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000.);
			if (gasfDat.mRiseFall != 0) {
				nAddKin += (nAddKin * gasfDat.mRiseFall / 1000);
			}
			const gasryokinOList = document.getElementById("gasryokinOList");
			const newRow = document.createElement("tr");
			newRow.id = "gasryokinORow" + String(nStartIdx);
			printGasRyokinStep_O(prevGstpDat.mUplimit + 1, gstpDat.mUplimit, nAddKin, "gasryokinORow" + String(nStartIdx));
			gasryokinOList.appendChild(newRow);

			if (nSur <= gstpDat.mUplimit) {
				break;
			}
		}
	}

	printGasryokin_Hybrid(kensinData, 0, "gasryokinHybridOArea");
}


/**
	* ガス料金コメントの印字
	*
	* @param printImageList    [in] PrintImageList 帳票印刷データ
	* @param gextDat              [in] GextDat        ガス料金拡張データ
	* @param nYpos             [in] int            印字開始高さ
	* @since 2017.05.23    S.iimura    新規作成
*/
function printGasryokinComment(gextDat) {
	var lstKinComment = [
		gextDat.m_strKin_comment_ht_0,
		gextDat.m_strKin_comment_ht_1,
		gextDat.m_strKin_comment_ht_2,
		gextDat.m_strKin_comment_ht_3,
		gextDat.m_strKin_comment_ht_4,
		gextDat.m_strKin_comment_ht_5,
		gextDat.m_strKin_comment_ht_6,
		gextDat.m_strKin_comment_ht_7,
		gextDat.m_strKin_comment_ht_8,
		gextDat.m_strKin_comment_ht_9
	];


	// ガス料金コメントが１行でも設定しているかチェック
	var isCommentAvailable = false;
	for (var i = 0; i < lstKinComment.length; i++) {
		var strKinComment = lstKinComment[i];
		if (Other.getClearString(strKinComment).length > 0) {
			isCommentAvailable = true;
			break;
		}
	}
	if (!isCommentAvailable) {
		// 1行も設定していない場合は印字処理から抜ける
		document.getElementById("GasryokinCommentArea").style.display = "none";
		return;
	}

	for (var i = 0; i < lstKinComment.length; i++) {
		var strKinComment = lstKinComment[i];
		if (Other.getClearString(strKinComment).length > 0) {
			document.getElementById("GasryokinCommentArea").style.display = "block";
			const area = document.getElementById("listItem");

			const item = document.createElement("div");
			item.className = "col-12 text-print ta-l wsp-text item";
			item.appendChild(document.createTextNode(strKinComment));
			area.appendChild(item);
		}
	}
}


function createHiwariComment(kensinData) {
	var countNull = 0;
	if (Other.getClearString(kensinData.m_strHiwariComment_0).length != 0) {
		const hiwariComment0Val = document.getElementById("hiwariComment0Val");
		hiwariComment0Val.innerHTML = m_strHiwariComment_0;
	} else {
		countNull++;
	}
	if (Other.getClearString(kensinData.m_strHiwariComment_1).length != 0) {
		const hiwariComment1Val = document.getElementById("hiwariComment1Val");
		hiwariComment1Val.innerHTML = m_strHiwariComment_1;
	} else {
		countNull++;
	}

	if (countNull == 2) {
		document.getElementById().style.display = "none";
	} else {
		document.getElementById().style.display = "block";
	}
}



/**
	* 領収印印字.
	*
	* @param strInpReceipt   [in] String 領収金額
*/
function createRyoshu(strInpReceipt) {
	var wkStr;
	wkStr = strInpReceipt + "円";
	const ryooshuuKingakuVal = document.getElementById(ryooshuuKingakuVal);
	ryooshuuKingakuVal.innerHTML = wkStr;
}



function createBank() {
	var kokfDat = mUserData.mKokfDat;
	var kouserDat = mUserData.mKouserDat;
	var sy2fDat = mUserData.mSy2fDat;
	var wkStr;

	// 前回引き落とし結果
	//SysOption.PRINT_JIFURI.getIdx() = 11
	if (sy2fDat.mSysOption[SysOption.PRINT_JIFURI] != 0 && kokfDat.mTransFee != 0 && kokfDat.mTransFee < 50000) {
		document.getElementById("zenkaiHikiotoshiKekkaArea").style.display = "block";

		wkStr = Other.MonthDayFormat(kokfDat.mTransMonth, kokfDat.mTransDate);
		const transMonthDateVal = document.getElementById("transMonthDateVal");
		transMonthDateVal.innerHTML = wkStr;

		wkStr = Other.printformat("#,###,##0", kokfDat.mTransFee);
		const zenkaiHikiotoshiGakuVal = document.getElementById("zenkaiHikiotoshiGakuVal");
		zenkaiHikiotoshiGakuVal.innerHTML = wkStr;
	} else {
		document.getElementById("zenkaiHikiotoshiKekkaArea").style.display = "none";
	}

	// 依頼中
	if (sy2fDat.mSysOption[SysOption.PRINT_JIFURI] != 0 && (kouserDat.m_nIraiStat == 1 || kouserDat.m_nIraiStat == 2 || kouserDat.m_nIraiStat == 3)) {
		document.getElementById("iraiChuuArea").style.display = "block";

		wkStr = Other.MonthDayFormat(kouserDat.m_nIraiMonth, kouserDat.m_nIraiDay);
		const iraiMonthDateVal = document.getElementById("iraiMonthDateVal");
		iraiMonthDateVal.innerHTML = wkStr;

		wkStr = Other.printformat("#,###,##0", kouserDat.m_nIraiKin);
		const iraiKinVal = document.getElementById("iraiKinVal");
		iraiKinVal.innerHTML = wkStr;
	} else {
		document.getElementById("iraiChuuArea").style.display = "none";
	}

	// 次回予定日
	if (sy2fDat.mJifuriNext == 1 && kouserDat.m_nNextTransYear != 0 && kouserDat.m_nNextTransMonth != 0 && kouserDat.m_nNextTransDay != 0) {
		document.getElementById("jikaiYoteiBiArea").style.display = "block";

		wkStr = Other.MonthDayFormat(kouserDat.m_nNextTransMonth, kouserDat.m_nNextTransDay);
		const nextMonthDateVal = document.getElementById("nextMonthDateVal");
		nextMonthDateVal.innerHTML = wkStr;
	} else {
		document.getElementById("jikaiYoteiBiArea").style.display = "none";
	}
}



function createFunouComment() {
	var sy2fDat = mUserData.mSy2fDat;
	if (sy2fDat.mFunouPrint == 0) {
		document.getElementById("funouCommentArea").style.display = "none";
		return;
	}
	var kouserDat = mUserData.mKouserDat;
	if (kouserDat.m_nIraiStat != 6) {
		document.getElementById("funouCommentArea").style.display = "none";
		return;
	}
	var strFunouComment0 = Other.getClearString(sy2fDat.mSy2fFunouComment.mFunouComment0);
	var strFunouComment1 = Other.getClearString(sy2fDat.mSy2fFunouComment.mFunouComment1);
	var countNull = 0;
	if (strFunouComment0.length > 0) {
		const funouComment0 = document.getElementById("funouComment0");
		funouComment0.innerHTML = strFunouComment0;
	} else {
		countNull++;
	}
	if (strFunouComment1.length > 0) {
		const funouComment1 = document.getElementById("funouComment1");
		funouComment1.innerHTML = funouComment1;
	} else {
		countNull++;
	}

	if (countNull == 2) {
		document.getElementById("funouCommentArea").style.display = "none";
	} else {
		document.getElementById("funouCommentArea").style.display = "block";
	}
}



function createHmInfo_(userData) {
	// 販売データ
	var hmefList = userData.mHmefDat;
	var hmefList1 = userData.mHmefDat;
	var hmefList2 = userData.mHmefDat;
	var sysfDat = userData.mSysfDat;
	var isTanka = userData.mSy2fDat.mSysOption[SysOption.PRINT_TANKA] == 1;	//SysOption.PRINT_TANKA.getIdx() = 33
	var isUriage = isUriage_(hmefList, hmefList1, hmefList2, sysfDat);
	if (isUriage) { // 販売実績がある場合のみ印刷する   
		var mapHmefDat = new Map();
		calcKeigen(mapHmefDat, hmefList);
		calcKeigen(mapHmefDat, hmefList1);
		calcKeigen(mapHmefDat, hmefList2);
		if (hmefList.length > 0) {
			nTax = createHmInfo(hmefList, t_lst, sysfDat, mapHmefDat, isTanka);
		}
		if (hmefList1.length > 0) {
			nTax += createHmInfo(hmefList1, t_lst, sysfDat, mapHmefDat, isTanka);
		}
		if (hmefList2.length > 0) {
			createHmInfo(hmefList2, t_lst, sysfDat, mapHmefDat, isTanka);
		}
		createHmInfoTax(t_lst, mapHmefDat, userData.getKokfDat().mUriTax + nTax);
		addPrintData(t_lst.getBitmap());
		t_lst.clear();
	}
}


/**
	* 軽減税率の計算処理.
	*
	* @param mapHmefDat    [in] {@code Map<Integer, HmefDat>}  軽減税率マップ
	* @param lstHmefDat    [in] HmefDat[]                      販売明細一覧
	* @throws MException   計算エラー時に発生
*/
function calcKeigen(mapHmefDat, lstHmefDat) {
	if (mapHmefDat == null) {
		mapHmefDat = new Map();
	}
	var sy2fDat = mUserData.mSy2fDat;
	var sysfDat = mUserData.mSysfDat;
	if (sy2fDat.mSyskeigen == 1) {
		// ハンディ明細
		addKeigenTax(sysfDat, lstHmefDat, mapHmefDat);
	}
}


/**
	* 売上明細を税率毎に税率、金額のmapに格納.
	*
	* @param sysfDat       [in] {@link SysfDat}                    システムデータ
	* @param hmefDats      [in] HmefDta[]                          売上明細一覧
	* @param mapHmefDat    [in/out] {@code Map<Integer, Hmefdat>}  軽減税率区分、税率毎の消費税金額
	* @throws MException   エラー時に発生
*/
function addKeigenTax(sysfDat, hmefDats, mapHmefDat) {
	var nIdx = 1;
	for (var i = 0; i < hmefDats.length; i++) {
		var hmefDat = hmefDats[i];
		if (!hmefDat.mUsef || hmefDat.mHmCode <= sysfDat.mSnvalue) {
			continue;
		}
		setKeigenKubun(hmefDat, sysfDat);
		var nKey = hmefDat.mKeigenKubun * 1000 + hmefDat.mTaxR;
		var hmefDatKeigen = mapHmefDat[nKey];
		if (hmefDatKeigen == null) {
			hmefDatKeigen = new Map();	//Khoi tao HmefDat Hieu
			if (hmefDat.mKeigenKubun != 0) {
				hmefDatKeigen.mCusRec = nIdx++;
			}
			mapHmefDat.set(nKey, hmefDatKeigen);
		}
		hmefDatKeigen.mKeigenKubun = hmefDat.mKeigenKubun;
		hmefDatKeigen.mKin += hmefDat.mKin + hmefDat.mTax;
		if (hmefDat.mTaxKu == 2) {
			// 内税
			hmefDatKeigen.mTax += calcUtax(sysfDat, hmefDat);
		}
		else {
			hmefDatKeigen.mTax += hmefDat.mTax;
		}
		hmefDatKeigen.mTaxR = hmefDat.mTaxR;
	}

}


/**
	* 売上明細データに軽減区分を設定.
	*
	* @param hmefDat   [in/out] {@link HmefDat}    売上データ
	* @param sysfDat   [in] {@link SysfDat}        システムデータ
*/
function setKeigenKubun(hmefDat, sysfDat) {
	if (hmefDat.mKeigenKubun != 0 || hmefDat.mTaxKu < 2) {
		// 軽減税率区分設定済み or 税区分が未設定、非課税
		// 何もしない
		return;
	}
	hmefDat.mKeigenKubun = getKeigenKubun(sysfDat, hmefDat.mTaxR);
}


/**
	* 軽減区分の取得.<br>
	* 消費税率から軽減税率区分の取得.
	*
	* @param sysfDat   [in] {@link SysfDat}    システムデータ
	* @param sTaxr     [in] short              消費税率
	* @return byte 軽減税率区分
*/
function getKeigenKubun(sysfDat, sTaxr) {
	var nSysTaxr = Other.getUriTaxr(sysfDat.mTax_yy, sysfDat.mTax_mm, sysfDat.mTax_dd,
		sysfDat.mSysYear, sysfDat.mSysMonth, 1,
		sysfDat.mTaxr_new, sysfDat.mTaxr_old, sysfDat.mTaxr_new);
	if (sTaxr != nSysTaxr) {
		// 軽減税率対象
		return 2;
	}
	return 0;
}



/**
	 * 販売明細情報の印刷データを作成する。
	 *
	 * @param lstHmefDat        [in] HmefDat[]      販売明細データ
	 * @param printImageList    [in] PrintImageList
	 * @param sysfDat           [in] SysfDat        システムデータ
	 * @param mapHmefDat        [in] {@code Map<Integer, HmefDat>}  軽減税率区分毎データ
	 * @param isTanka           [in] boolean    単価印字フラグ(true:有り/false:無し)
	 */
function createHmInfo(lstHmefDat, sysfDat, mapHmefDat, isTanka) {
	if (lstHmefDat == null || lstHmefDat.length == 0) {
		return 0;
	}
	var nTax = 0;
	var strPrint;
	const area = document.getElementById("hmInfoTableItem");
	for (var i = 0; i < lstHmefDat.length; i++) {
		hmefDat = lstHmefDat[i];
		if (!hmefDat.mUsef || hmefDat.mHmCode < sysfDat.mSnvalue) {
			continue;
		}

		// 日付
		const row = document.createElement("tr");
		row.id = "hmInfoTableItem" + String(i);

		strPrint = (hmefDat.mDenm < 10 ? " " + hmefDat.mDenm : hmefDat.mDenm) + "/"
			+ (hmefDat.mDend < 10 ? " " + hmefDat.mDend : hmefDat.mDend);
		const date = document.createElement("td");
		date.className = "text-print ta-c w-16 hmInfoTable-item";
		date.appendChild(document.createTextNode(strPrint));


		// 品目
		strPrint = Other.getClearString(hmefDat.mHmName);
		const name = document.createElement("td");
		name.className = "text-print ta-c w-20 hmInfoTable-item";
		const hmName = document.createElement("span");
		hmName.className = "text-print ta-l w100 hmInfoTable-item";
		hmName.appendChild(document.createTextNode(strPrint));
		name.appendChild(hmName);


		// 数量
		if (hmefDat.mSuryo != 0) {
			strPrint = Other.printformat(hmefDat.mSuryo, "###0.00", 2);
		}
		else {
			strPrint = " ";
		}
		const suryo = document.createElement("td");
		suryo.className = "text-print ta-c w-20 hmInfoTable-item";
		suryo.appendChild(document.createTextNode(strPrint));



		const tanka = document.createElement("td");
		tanka.className = "text-print ta-c w-20 hmInfoTable-item";
		if (isTanka && hmefDat.mTanka != 0) {
			// 単価印字有り
			if (hmefDat.mTanka % 100 == 0) {
				strPrint = Other.printformat(hmefDat.mTanka, "###,##0", 2);
			}
			else if (hmefDat.mTanka % 10 == 0) {
				strPrint = Other.printformat(hmefDat.mTanka, "##,##0.0", 2);
			}
			else {
				strPrint = Other.printformat(hmefDat.mTanka, "#,##0.00", 2);
			}
			tanka.appendChild(document.createTextNode(strPrint));
		} else {
			tanka.appendChild(document.createTextNode(""));
		}


		// 金額
		var nKin = hmefDat.mKin;
		if (mapHmefDat.size != 0) {
			// 軽減税率対応は税込み
			nKin += hmefDat.mTax;
		}
		strPrint = Other.printformat("#,###,##0", nKin);
		var hmefDatKeigen = mapHmefDat.get(hmefDat.mKeigenKubun * 1000 + hmefDat.mTaxR);
		if (hmefDatKeigen != null && hmefDatKeigen.mKeigenKubun != 0) {
			strPrint += String(hmefDatKeigen.mCusRec);
		}
		nTax += hmefDat.mTax;
		const kin = document.createElement("td");
		kin.className = "text-print ta-c w-24 hmInfoTable-item";
		kin.appendChild(document.createTextNode(strPrint));



		// リース割賦の残回数を印字する。
		if (hmefDat.mHbnmPrn == 1) {
			strPrint = hmefDat.mHbName;
			if (!strPrint.contains("(  ")) {
				continue; // 残回数 '(  ' というパターンがなければ以下を除外する。
			}
			strPrint = strPrint.replace("(  ", "(");
			strPrint = strPrint.replace("/ ", "/");

			//伝票日付
			//品目名
			const hbName = document.createElement("span");
			hbName.className = "text-print ta-l w100 hmInfoTable-item";
			hbName.appendChild(document.createTextNode(strPrint));
			hmName.after(hbName);
			//数量
			// 単価
			//金額
		}

		row.appendChild(date);
		date.after(name);
		name.after(suryo);
		suryo.after(tanka);
		tanka.after(kin);
		area.appendChild(row);
	}
	return nTax;
}



/**
	* 消費税明細の印字データ生成.
	* <br>軽減税率対応(Sy2fDat.msyskeigen == 1)の場合は軽減税率区分、税率毎の消費税を印字.
	* <br>非対応の場合は明細の合計消費税額を印字.
	*
	* @param printImageList    [in] {@link PrintImageList}         印刷データ
	* @param mapHmefDat        [in] {@code Map<Integer, HmefDat>}  軽減税率区分、税率毎の消費税金額
	* @param nTax              [in] int                            消費税金額
	* @param isTanka           [in] boolean                        単価印字フラグ
*/
function createHmInfoTax(mapHmefDat, nTax) {
	// 消費税
	if (mUserData.mSy2fDat.mSyskeigen == 0) {
		if (nTax != 0) {
			document.getElementById("infoTaxArea").style.display = "none";
			document.getElementById("hmInfoTotal").style.display = "block";
			const nTaxVal = document.getElementById("nTaxVal");
			nTaxVal.innerHTML = Other.printformat("#,###,##0", nTax);
		} else {
			document.getElementById("hmInfoTotal").style.display = "none";
			document.getElementById("infoTaxArea").style.display = "none";
		}
	}
	else {
		document.getElementById("hmInfoTotal").style.display = "none";
		document.getElementById("infoTaxArea").style.display = "block";
		for (let hmefDat of mapHmefDat.values()) {

			const hmefTaxKeigenTotalVal = document.getElementById("hmefTaxKeigenTotalVal");
			hmefTaxKeigenTotalVal.innerHTML = getHmefTaxKeigenTotal(hmefDat);

			const hmefKinVal = document.getElementById("hmefKinVal");
			hmefKinVal.innerHTML = Other.printformat("#,###,##0", hmefDat.mKin) + ")";

			const hmefTaxKeigenTaxVal = document.getElementById("hmefTaxKeigenTaxVal");
			hmefTaxKeigenTaxVal.innerHTML = getHmefTaxkeigenTax(hmefDat);

			const hmefTaXVal = document.getElementById("hmefTaXVal");
			hmefTaXVal.innerHTML = Other.printformat("#,###,##0", hmefDat.mTax) + ")";
		}
	}
}

/**
	* 軽減税率印字データの生成.
	*
	* @param hmefDat   [in] {@link HmefDat}    売上明細データ
	* @return String   軽減税率印字データ
*/
function getHmefTaxKeigenTotal(hmefDat) {
	var strTax = "";
	strTax += "(";
	if (hmefDat.mTaxR % 10 == 0) {
		strTax += String(hmefDat.mTaxR / 10);
	}
	else {
		strTax.append(String.format(Locale.JAPAN, "%2d.%d", hmefDat.mTaxR / 10, hmefDat.mTaxR % 10));
		strTax += String(hmefDat.mTaxR / 10) + "." + String(hmefDat.mTaxR % 10);
	}
	strTax += "%対象";
	switch (hmefDat.mKeigenKubun) {
		case 1: // 経過措置
			strTax += "　経過措置";
			break;
		case 2: // 軽減税率
			strTax += "　軽減税率";
			break;
	}
	if (hmefDat.mKeigenKubun != 0) {
		strTax += String(hmefDat.mCusRec);
	}
	return strTax;
}


/**
	* 軽減税率消費税印字データの生成.
	*
	* @param hmefDat   [in] {@link HmefDat}    売上明細データ
	* @return String   軽減税率消費税額印字データ
*/
function getHmefTaxkeigenTax(hmefDat) {
	var strTax = "";
	strTax + ("(");
	if (hmefDat.mTaxR % 10 == 0) {
		strTax += String(hmefDat.mTaxR / 10);
	}
	else {
		strTax += String(hmefDat.mTaxR / 10) + "." + String(hmefDat.mTaxR % 10);
	}
	strTax += "内消費税";
	return strTax;
}



/**
	* コメントの取得.
	*
	* @return  String[]    コメント
*/
function getComment() {
	var strComments = [];
	strComments[0] = mUserData.mSy2fDat.mComment1;
	strComments[1] = mUserData.mSy2fDat.mComment2;
	var kouserDat = mUserData.mKouserDat;
	if (Other.getBytesLen(Other.getClearString(kouserDat.m_strCmt).trim()) > 0) {
		// 顧客毎コメント有り
		var lstCmt = [];
		var strCmt = "";
		var strClearCmt = Other.getClearString(kouserDat.m_strCmt).trim();
		try {
			for (var i = 0; i < strClearCmt.length; i++) {
				strCmt += (strClearCmt.charAt(i));		//hieu kiểm tra lại
				if (strCmt.length > 40) {
					strCmt = strCmt.substring(0, strCmt.length - 2);
					i -= 2;
					if (Other.getBytesLen(Other.getClearString(strCmt.toString()).trim()) > 0) {
						lstCmt.push(strCmt);
					}
					strCmt = "";
				}
			}
			if (Other.getBytesLen(Other.getClearString(strCmt.toString()).trim()) > 0) {
				lstCmt.push(strCmt);
			}
			strComments = lstCmt;
		}
		catch (err) {
			console.log(err);
		}
	}
	return strComments;
}


/**
	* コメント印字
	*
	* @param commentData [in] CommentData    コメントデータ
	* @throws MException 印刷データ作成時にエラーがあった場合発生
*/
function createComment(commentData) {
	if (commentData.length == 0) {
		document.getElementById("commentArea").style.display = "none";
		return;
	}

	const commentDetailArea = document.getElementById(commentDetailArea);
	for (var i = 0; i < commentData.length; i++) {
		if (commentData[i].length == 0) continue;
		document.getElementById("commentArea").style.display = "block";

		const comment = document.createElement("div");
		comment.className = "col-12 text-print ta-l wsp-text item commentVal";
		comment.appendChild(document.createTextNode(commentData[i]));
		commentDetailArea.appendChild(comment);
	}
}


function createHybComment(kensinData) {
	var str;
	var lGaskin;
	var lHybkin;

	var ko2fDat = kensinData.mKo2fDat;


	if (!kensinData.m_isHybrid || ko2fDat.mGashyb == 0) {
		return; // 0
	}

	lGaskin = kensinData.m_nOnlyGas;

	//2010.06.08 ハイブリッド価格
	//           ガス料金（ハイブリッド使用量単位）
	//         ＋原料調整費（税込み）
	//         ＋消費税
	//         ＋カウンター料
	lHybkin = ko2fDat.mChoKin + ko2fDat.mChoTax;

	if (lHybkin < 0) {
		document.getElementById("hybCommentArea").style.display = "block";

		//　通常料金の場合 
		const gaskinVal = document.getElementById("gaskinVal");
		gaskinVal.innerHTML = Other.KingakuFormat(lGaskin);

		// 今回のガスご使用料金は、

		printImageList.add(str, 20, nYpos, TextSize.XSMALL);
		nYpos = printImageList.getHeightPrintLine();

		// 　当社標準価格より
		const hybkinVal = document.getElementById("hybkinVal");
		hybkinVal.innerHTML = Other.KingakuFormat((lHybkin * -1));

	} else {
		document.getElementById("hybCommentArea").style.display = "none";
	}
}



function createHybTblPrint(kensinData) {
	var strLine;
	var ko2fDat = kensinData.mKo2fDat;
	var hybfDat = kensinData.mHybfDat;

	if (!kensinData.m_isHybrid || ko2fDat.mGashyb == 0) {
		document.getElementById("hybTblArea").style.display = "none";
		return;
	} else {
		document.getElementById("hybTblArea").style.display = "block";
	}

	//----------------------------------------------------------------
	// ご使用量合計--------------------------------------
	// 今回指針
	strLine = Other.printformat(kensinData.m_Sisin, "#,##0.0", 1) + "m3";
	const hybTableSisin = document.getElementById("hybTableSisin");
	hybTableSisin.innerHTML = strLine;

	//----------------------------------------------------------------
	// 前回指針
	strLine = Other.printformat(kensinData.m_SisinPrev, "#,##0.0", 1) + "m3";
	const hybTableSisinPrev = document.getElementById("hybTableSisinPrev");
	hybTableSisinPrev.innerHTML = strLine;

	//----------------------------------------------------------------
	// 使用量
	strLine = Other.printformat(kensinData.m_NowUse, "#,##0.0", 1) + "m3";
	const hybTableNowUse = document.getElementById("hybTableNowUse");
	hybTableNowUse.innerHTML = strLine;

	//----------------------------------------------------------------
	// 通常使用
	//----------------------------------------------------------------
	// 使用量
	strLine = Other.printformat(ko2fDat.mNorSr, "#,##0.0", 1) + "m3";
	const sisinHybTableVal = document.getElementById("sisinHybTableVal");
	sisinHybTableVal.innerHTML = strLine;

	//----------------------------------------------------------------
	// ハイブリッドのカウンター
	const hybTable = document.getElementById("hybTable");
	for (var nIdx = 0; nIdx < 4; nIdx++) {		//Ko2fDat.kHyb_MAX = 4 Hieu
		if (hybfDat.mCusef[nIdx] == 1 && ko2fDat.mFee[nIdx] != 0) {
			const row = document.createElement("tr");
			row.id = "hybTableRow" + String(i);

			//カウンタ名称
			strLine = kensinData.getCounterName(nIdx);
			const countername = document.createElement("td");
			countername.className = "text-print ta-l hybTable-item";
			countername.appendChild(document.createTextNode(strLine));

			//----------------------------------------------------------------
			// 今回指針
			strLine = Other.printformat(ko2fDat.mNowMeter[nIdx], "#,##0.0", 1) + "m3";
			const nowMeter = document.createElement("td");
			nowMeter.className = "text-print ta-l hybTable-item";
			nowMeter.appendChild(document.createTextNode(strLine));

			//----------------------------------------------------------------
			// 前回指針
			strLine = Other.printformat(ko2fDat.mPreMeter[nIdx], "#,##0.0", 1) + "m3";
			const preMeter = document.createElement("td");
			preMeter.className = "text-print ta-l hybTable-item";
			preMeter.appendChild(document.createTextNode(strLine));


			//----------------------------------------------------------------
			// 使用量
			strLine = Other.printformat(kensinData.m_nHybGasUse[nIdx], "#,##0.0", 1) + "m3";
			const hybGasUse = document.createElement("td");
			hybGasUse.className = "text-print ta-l hybTable-item";
			hybGasUse.appendChild(document.createTextNode(strLine));

			row.appendChild(countername);
			countername.after(nowMeter);
			nowMeter.after(preMeter);
			preMeter.after(hybGasUse);
			hybTable.appendChild(row);
		}

	}
}


/**
   * 保安情報の印刷データを作成する。
   * 
   * @param strHoan    [in] String 保安点検情報
*/
function createHoanInfo(strHoan) {
	if (mUserData.mNyukinMode) {
		document.getElementById("hoanInfoArea").style.display = "none";
		return;
	} else {
		document.getElementById("hoanInfoArea").style.display = "block";
	}

	//* * * 保　安　点　検 * * *
	const hoanValList = document.getElementsByClassName("hoan-val");
	for (var i = 0; i < HOAN_ITEMS.length; i++) {
		hoanValList[i].innerHTML = "[" + strHoan.charAt(i) + "]";
	}
}



function createPoint(kensinData) {
	var sy2fDat = mUserData.mSy2fDat;
	var kokfDat = mUserData.mKokfDat;

	document.getElementById("pointArea").style.display = "none";
	if (sy2fDat.mPntVer > 0 && kokfDat.mPoint > 0) {
		if (sy2fDat.mSy2fPntDat.mPntName == null || sy2fDat.mSy2fPntDat.mPntName.trim().length == 0) {
			// ポイント名が空の場合は印字しない
			return;
		}
		document.getElementById("pointArea").style.display = "block";
		const pointPntNameVal = document.getElementById("pointPntNameVal");
		pointPntNameVal.innerHTML = Other.nullToString(sy2fDat.mSy2fPntDat.mPntName);

		const pointVal = document.getElementById("pointVal");
		pointVal.innerHTML = Other.printformat("#,###,##0", kokfDat.mPoint);
	}

}



function createMiyaPoint() {
	document.getElementById("miyaPointArea").style.display = "none";
	var sy2fDat = mUserData.mSy2fDat;
	if (sy2fDat.mMiyanoFlg == 0 ||
		(sy2fDat.mSysOption[SysOption.PRINT_MIYANO_GET] == 0 &&		//SysOption.PRINT_MIYANO_GET.getIdx() = 31
			sy2fDat.mSysOption[SysOption.PRINT_MIYANO_USE] == 0 &&		//SysOption.PRINT_MIYANO_USE.getIdx() = 32
			sy2fDat.mSysOption[SysOption.PRINT_MIYANO_RUI] == 0)) {		//SysOption.PRINT_MIYANO_RUI.getIdx() = 33
		// 宮野式ポイント未使用の場合
		// もしくは印字フラグが全てOFFの場合
		// は印字しない。
		return;
	}
	document.getElementById("miyaPointArea").style.display = "block";
	var kouserDat = mUserData.mKouserDat;

	if (sy2fDat.mSysOption[SysOption.PRINT_MIYANO_GET] == 1) {
		// 獲得ポイント
		const kakutokuPointoVal = document.getElementById("kakutokuPointoVal");
		kakutokuPointoVal.innerHTML = Other.format("#,###,##0", kouserDat.m_nMiyanoGetpnt);
	}
	if (sy2fDat.mSysOption[SysOption.PRINT_MIYANO_USE.getIdx()] == 1) {
		// 使用ポイント
		const shiyooPointoVal = document.getElementById("shiyooPointoVal");
		shiyooPointoVal.innerHTML = Other.format("#,###,##0", kouserDat.m_nMiyanoUsepnt);
	}
	if (sy2fDat.mSysOption[SysOption.PRINT_MIYANO_RUI.getIdx()] == 1) {
		// 累計ポイント
		const genzaiPointoVal = document.getElementById("genzaiPointoVal");
		genzaiPointoVal.innerHTML = Other.format("#,###,##0", kouserDat.m_nMiyanoZanpnt);
	}
}


function createCnComment(kensinData) {
	document.getElementById("cnCommentArea").style.display = "none";
	if (kensinData.mCnp) {
		var cnpCusDat = kensinData.mCnpCusDat;

		if (cnpCusDat.mCnpMembers > 0) {
			// CN会員ID
			const cnpMembersIdVal = document.getElementById("cnpMembersIdVal");
			cnpMembersIdVal.innerHTML = cnpCusDat.mCnpMembersId;
		}

		//前月獲得ポイント
		const cnpZpointVal = document.getElementById("cnpZpointVal");
		cnpZpointVal.innerHTML = Other.format("#,###,##0", cnpCusDat.mCnpZpoint);

		var strLine = "";
		if (cnpCusDat.mCnpMembers > 0) {
			// 本会員
			strLine = "利用可能ポイント";
		} else if (cnpCusDat.mCnpTemp > 0) {
			// 仮会員
			strLine = "お試しポイント";
		}

		const cnpMembersText = document.getElementById("cnpMembersText");
		cnpMembersText.innerHTML = strLine;
		const cnpPointVal = document.getElementById("cnpPointVal");
		cnpPointVal.innerHTML = Other.format("#,###,##0", cnpCusDat.mCnpPoint);

		if (cnpCusDat.mCnpMembers == 0 && cnpCusDat.mCnpTemp > 0) {
			// 仮会員はコメントを追加
			document.getElementById("membersTempCommentArea").style.display = "block";
		} else {
			document.getElementById("membersTempCommentArea").style.display = "none";
		}

		const cnpCmtListArea = document.getElementById("cnpCmtListArea");
		var lstCmt = getCnpCmt(kensinData);
		if (lstCmt.length == 0) {
			cnpCmtListArea.style.display = "none";
		} else {
			cnpCmtListArea.style.display = "block";
			for (var i = 0; i < i < lstCmt.length; i++) {
				var strCmt = lstCmt[i];

				const hybGasUse = document.createElement("div");
				hybGasUse.className = "col-12 text-print ta-l wsp-text item";
				hybGasUse.appendChild(document.createTextNode(strCmt));
				cnpCmtListArea.appendChild(hybGasUse);
			}
		}
	}
}


/**
	* CNポイント用コメントの取得
	*
	* @return  List<String>    CNポイント用コメント
*/
function getCnpCmt(kensinData) {
	var lstCnpCmt = [];
	if (kensinData.mCnp) {
		if (kensinData.mCnpCusDat.mCnpMembers > 0) {
			// 本会員用コメント
			if (kensinData.mCnpMemberCmt.mCnpComment_0.trim().length != 0) {
				lstCnpCmt.push(kensinData.mCnpMemberCmt.mCnpComment_0);
			}
			if (kensinData.mCnpMemberCmt.mCnpComment_1.trim().length != 0) {
				lstCnpCmt.push(kensinData.mCnpMemberCmt.mCnpComment_1);
			}
			if (kensinData.mCnpMemberCmt.mCnpComment_2.trim().length != 0) {
				lstCnpCmt.push(kensinData.mCnpMemberCmt.mCnpComment_2);
			}
		}
		else if (kensinData.mCnpCusDat.mCnpTemp > 0) {
			// 仮会員用コメント
			if (kensinData.mCnpTempCmt.mCnpComment_0.trim().length != 0) {
				lstCnpCmt.push(kensinData.mCnpTempCmt.mCnpComment_0);
			}
			if (kensinData.mCnpTempCmt.mCnpComment_1.trim().length != 0) {
				lstCnpCmt.push(kensinData.mCnpTempCmt.mCnpComment_1);
			}
			if (kensinData.mCnpTempCmt.mCnpComment_2.trim().length != 0) {
				lstCnpCmt.push(kensinData.mCnpTempCmt.mCnpComment_2);
			}
		}
	}
	return lstCnpCmt;
}


const byteSize = str => new Blob([str]).size;


/**
	* 店舗情報の印刷データを作成する。
	*
	* @param hanfDat [in] HanfDat    店舗データ
*/
function createUserInfo(hanfDat, strTantname) {
	var wkStr;

	wkStr = hanfDat.mName;
	const mNameVal = document.getElementById("mNameVal");
	mNameVal.innerHTML = wkStr;

	const add1Val = document.getElementById("add1Val");
	if (Other.getClearString(hanfDat.mAdd1) != "") {
		add1Val.style.display = "block";
		add1Val.innerHTML = hanfDat.mAdd1;
	} else {
		add1Val.style.display = "none";
	}

	const add2Val = document.getElementById("add2Val");
	if (Other.getClearString(hanfDat.add2Val) != "") {
		add2Val.style.display = "block";
		add2Val.innerHTML = hanfDat.add2Val;
	} else {
		add2Val.style.display = "none";
	}

	//TEL
	const telVal = document.getElementById("telVal");
	telVal.innerHTML = hanfDat.mTel;

	//FAX
	const faxVal = document.getElementById("faxVal");
	faxVal.innerHTML = hanfDat.mFax;

	//tantnameFaxVal
	const tantnameFaxVal = document.getElementById("tantnameFaxVal");
	tantnameFaxVal.innerHTML = strTantname;


	var strBkinfo;
	var hanf2Dat = hanfDat;;
	if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkname_0).trim()) > 0) {
		// 銀行１名称有り
		strBkinfo = Other.getClearString(hanf2Dat.mBkname_0).trim();
		if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkshiten_0).trim()) > 0) {
			// 銀行１支店名有り
			strBkinfo += "/" + Other.getClearString(hanf2Dat.mBkshiten_0).trim();
		}
		const bkname0Shiten0 = document.getElementById("bkname0&Shiten0");
		bkname0Shiten0.innerHTML = strBkinfo;


		strBkinfo = "";
		if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkkubun_0).trim()) > 0) {
			// 銀行１区分有り
			strBkinfo = Other.getClearString(hanf2Dat.mBkkubun_0).trim();
		}
		if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkban_0).trim()) > 0) {
			// 銀行１口座番号有り
			if (strBkinfo.length != 0) {
				// 区分有りの場合
				strBkinfo += "/";
			}
			strBkinfo += Other.getClearString(hanf2Dat.mBkban_0).trim();
		}

		const bkKubun0Ban0 = document.getElementById("bkKubun0&Ban0");
		if (strBkinfo.length != 0) {
			bkKubun0Ban0.innerHTML = strBkinfo;
			bkKubun0Ban0.style.display = "block";
		} else {
			bkKubun0Ban0.style.display = "none";
		}
	}
	if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkname_1).trim()) > 0) {
		// 銀行２名称有り
		strBkinfo = Other.getClearString(hanf2Dat.mBkname_1).trim();
		if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkshiten_1).trim()) > 0) {
			// 銀行２支店名有り
			strBkinfo += "/" + Other.getClearString(hanf2Dat.mBkshiten_1).trim();
		}
		const bkname1Shiten1 = document.getElementById("bkname1&Shiten1");
		bkname1Shiten1.innerHTML = strBkinfo;


		strBkinfo = "";
		if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkkubun_1).trim()) > 0) {
			// 銀行２区分有り
			strBkinfo = Other.getClearString(hanf2Dat.mBkkubun_1).trim();
		}
		if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkban_1).trim()) > 0) {
			// 銀行２口座番号有り
			if (strBkinfo.length() != 0) {
				// 区分有りの場合
				strBkinfo += "/";
			}
			strBkinfo += Other.getClearString(hanf2Dat.mBkban_1).trim();
		}

		const bkKubun1Ban1 = document.getElementById("bkKubun1&Ban1");
		if (strBkinfo.length != 0) {
			bkKubun1Ban1.innerHTML = strBkinfo;
			bkKubun1Ban1.style.display = "block";
		} else {
			bkKubun1Ban1.style.display = "none";
		}
	}

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
	if (true) {		//Common.checkDevice() < 2
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
   * SETUP PRINT FORM
   *
   * @param sizeSingleLine     [STRING]
   * @param lineHeightSingleLine     [STRING]
*/
function setupTextSizeDetail(nameItem, textSize, lineHeight, fontWeight) {
	// setupPrintForm("100vh", "650px", "55px", "27px", "33px", "27px", "33px", true, "20px");
	const element = document.getElementsByClassName(nameItem);
	for (let i = 0; i < element.length; i++) {
		element[i].style.setProperty("font-size", textSize, "important")
		// element[i].style.fontSize = textSize;
		// element[i].style.setAttribute('style', 'font-size:' + textSize + 'px' + '!important')
		element[i].style.lineHeight = lineHeight;
		element[i].style.fontWeight = fontWeight;
	}
}


/**
   * SEND IMAGE TO PRINTER
*/
function sendImage() {
	imgString = imgString.replace("data:image/png;base64,", "");
	navigator.clipboard.writeText(imgString);
	// window.location.href = "printermarutou://print&&1";
}

/**
	* ONCLICK ACTION
*/
function onclickAction() {
	document.getElementById("sendToAppButton").onclick = function () {
		// sendImage();
	alert(imgString);
	};
	document.getElementById("createPrintingFormButton").onclick = function () {
		document.getElementById("editView").style.display = "none";
		document.getElementById("printView").style.display = "block";
		//lấy 2 biến receipt vs zandaka bên file kensin_kinyuu.js Hieu
		//isToyu (biến cuối) xem lại ko đc set cứng Hieu
		// getPrintStatus(mUserData.mKokfDat, mUserData.mSysfDat, true, 0, 0, true, false);
		// mUserData.mSysfDat.is_m_isToyukeninFlg = false;
		// createPrintData(printStatus, mUserData.mSysfDat.is_m_isToyukeninFlg, false);
		createImageKensinForm();
	};
}

/** 
	* ONLOAD ACTION
*/
function onLoadAction() {
	onclickAction();
}



window.onload = onLoadAction;

/** 
	* CREATE IMAGE FILE OF SHUUKEI NIPPOU FORM
*/
function createImageKensinForm() {
	Common.setupModal("load", null, Mess.I00001, null);
	Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
	document.getElementById('editView').style.display = "none";
	document.getElementById('printView').style.display = "block";
	setupPrintForm("100vh", "650px", "55px", "27px", "35px", "27px", "35px", true, "20px");
	setupTextSizeDetail("lg-text", "30px", "40px", "bold");
	setupTextSizeDetail("tb-item", "24px", "35px", "normal");
	setupTextSizeDetail("ryooshuu-text", "38px", "49px", "bold");
	setupTextSizeDetail("hmInfoTable-item", "24px", "35px", "normal");
	setupTextSizeDetail("hybTable-item", "24px", "35px", "normal");
	setupTextSizeDetail("hoan-item", "24px", "35px", "normal");
	domtoimage.toBlob(document.getElementById('printContentDetail'))
		.then(function (blob) {
			getBase64(blob).then(
				data => {
					console.log(data)
					imgString = data;
					alert(imgString);
					window.scrollTo(0, 0);

					const interval = setInterval(function () {
						setupPrintForm("100%", "600px", "45px", itemTS, itemLH, itemTS, itemLH, false, defaultPaddingPrintForm);
						setupTextSizeDetail("lg-text", lgTextTS, lgTextLH, "bold");
						setupTextSizeDetail("tb-item", tbItemTS, tbItemLH, "normal");
						setupTextSizeDetail("ryooshuu-text", ryooshuuTextTS, ryooshuuTextLH, "bold");
						setupTextSizeDetail("hmInfoTable-item", hmInfoTableItemTS, hmInfoTableItemLH, "normal");
						setupTextSizeDetail("hybTable-item", hybTableItemTS, hybTableItemLH, "normal");
						setupTextSizeDetail("hoan-item", hoanItemTS, hoanItemLH, "normal");

						Common.setBackgroundDialogScreen("block", "rgba(0,0,0,0.4)");
						clearInterval(interval);
						modal.style.display = "none";
					}, 100);
				}
			);
		})
}

function getPrintStatus(kokfDat, sysfDat, isPrintNyukin, lReceipt, lZandaka, isPrintKensin, isToyu) {
	var isPrintHoan = sysfDat.mCheckHoan && (kokfDat.mGasKubun != 2 || kokfDat.mTenkenKgas == 1);
	printStatus.m_isPrintHoan = isPrintHoan;
	printStatus.m_isPrintNyukin = isPrintNyukin;
	printStatus.m_lReceipt = lReceipt;
	printStatus.lZandaka = lZandaka;
	printStatus.m_isPrintKensin = isPrintKensin;
	printStatus.m_isPrintToyu = isToyu;
}
