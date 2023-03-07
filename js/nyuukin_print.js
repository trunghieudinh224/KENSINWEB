import * as Common from './Common/common_function.js'
import * as Other from './Common/other_util.js'
import * as StringCS from './Constant/strings.js'
import * as Mess from './Constant/message.js'
import * as GasRaterCom from './Common/gasratercom.js'
import * as Dat from './Dat/dat.js'
import * as KensinKinyuu from './kensin_kinnyuu.js'
import * as KensinPrint from './kensin_print.js'
import * as ValueCS from './Constant/values.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* kensin date */
var kensinDate = sessionStorage.getItem(StringCS.KENSINDATE);
/* setting data */
var dataSetting = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));
/** ユーザー情報 */ 
var mUserData = KensinKinyuu.mUserData;
mUserData.m_lstLeasHmefDat = null;
mUserData.mNyukinOnly = false;
/** 印刷情報 */ 
var printStatus = new Dat.PrintStatus();
/** 検針情報 */
var kensinData = new Dat.KensinData();


/****  PRINT   ****/
/* image string */
var imgString = "";
/* default padding printting form */
var defaultPaddingPrintForm = window.getComputedStyle(document.getElementById("printContentDetail"), null).getPropertyValue('padding');
/* default title size of printting form */
var itemTS = window.getComputedStyle(document.getElementsByClassName("item")[0]).fontSize;
var lgTextTS = window.getComputedStyle(document.getElementsByClassName("lg-text")[0]).fontSize;
var tbItemTS = window.getComputedStyle(document.getElementsByClassName("tb-item")[0]).fontSize;
var ryooshuuTextTS = window.getComputedStyle(document.getElementsByClassName("ryooshuu-text")[0]).fontSize;
var hmInfoTableItemTS = window.getComputedStyle(document.getElementsByClassName("hmInfoTable-item")[0]).fontSize;
var hybTableItemTS = window.getComputedStyle(document.getElementsByClassName("hybTable-item")[0]).fontSize;
var hoanItemTS = window.getComputedStyle(document.getElementsByClassName("hoan-item")[0]).fontSize;
var hoanValTS = window.getComputedStyle(document.getElementsByClassName("hoan-val")[0]).fontSize;
var konkaiSeikyuuGakuTS = window.getComputedStyle(document.getElementsByClassName("konkaiSeikyuuGaku-text")[0]).fontSize;
var titlePrintViewTS = window.getComputedStyle(document.getElementsByClassName("titlePrintView")[0]).fontSize;
var kkValTS = window.getComputedStyle(document.getElementsByClassName("kk-val")[0]).fontSize;
/* default line height text of printting form */
var itemLH = window.getComputedStyle(document.getElementsByClassName("item")[0]).lineHeight;
var lgTextLH = window.getComputedStyle(document.getElementsByClassName("lg-text")[0]).lineHeight;
var tbItemLH = window.getComputedStyle(document.getElementsByClassName("tb-item")[0]).lineHeight;
var ryooshuuTextLH = window.getComputedStyle(document.getElementsByClassName("ryooshuu-text")[0]).lineHeight;
var hmInfoTableItemLH = window.getComputedStyle(document.getElementsByClassName("hmInfoTable-item")[0]).lineHeight;
var hybTableItemLH = window.getComputedStyle(document.getElementsByClassName("hybTable-item")[0]).lineHeight;
var hoanItemLH = window.getComputedStyle(document.getElementsByClassName("hoan-item")[0]).lineHeight;
var hoanValLH = window.getComputedStyle(document.getElementsByClassName("hoan-val")[0]).lineHeight;
var konkaiSeikyuuGakuLH = window.getComputedStyle(document.getElementsByClassName("konkaiSeikyuuGaku-text")[0]).lineHeight;
var kkValLH = window.getComputedStyle(document.getElementsByClassName("kk-val")[0]).lineHeight;




/**
	* 印刷データを作成する
	*
	* @param printStatus              [in] PrintStatus                印刷情報
	* @param isHikae              	  [in] bool                       
*/
function createPrintData(printStatus, isHikae) {
	try {
		createHeaderData(printStatus.m_lReceipt != 0, isHikae);
		createCusInfo(getCusData());

		var wkKensinData = setKensinData(mUserData, false, true, true);

		createRyosyuInfo(wkKensinData, mUserData.mNyukinOnly);

		if (!mUserData.mNyukinOnly) {
			createHmInfo_();
		} else {
			document.getElementById("hmInfoArea_NK").style.display = "none";
		}

		createRyoshu(Other.formatDecial(printStatus.m_lReceipt));

		// コメント
		if (mUserData.mSy2fDat.mSysOption[Dat.SysOption.PRINT_COMMENT_RYOSHU] == 1) {
			createComment(getComment());
		}

		// 店舗データ
		if (mUserData.mSysfDat.mIfChitUser) {
			var tantname = dataSetting.m_lstTantName[0].name;
			createUserInfo(mUserData.mHanfDat, tantname);
		}

	} catch (error) {
		console.log(error);
	}
}


/** 
	* CREATE HEADER DATA
	* 
	* @param isHikae     [BOOLEAN]
*/
function createHeaderData(isHikae) {
	var strTitle = "領　収　書";
	if (isHikae) {
		strTitle += " (控)";
	}
	document.getElementById("titlePrintView_NK").innerHTML = strTitle;
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
		m_strAdd0: Other.getClearString(kokfDat.mAdd_0.substring(0, 20)),
		m_strAdd1: Other.getClearString(kokfDat.mAdd_1.substring(20))
	};
	return data;
}


/** 
	* CREATE CUSTOMER INFORMATION
	*
	* @param cusData     [Object]
*/
function createCusInfo(cusData) {
	document.getElementById("hakkooBiKenshinBiTitle_NK").innerHTML = "発行日　　";
	document.getElementById("hakkooBiKenshinBi_NK").innerHTML = cusData.m_strDate;

	document.getElementById("codeVal_NK").innerHTML = cusData.m_strKcode;

	if (Other.getClearString(cusData.m_strName0).length > 0 && Other.getClearString(cusData.m_strName1).length > 0) {
		document.getElementById("nameVal_NK").innerHTML = Other.getClearString(cusData.m_strName0) + Other.getClearString(cusData.m_strName1);
		document.getElementById("kNameVal_NK").innerHTML = Other.getClearString(cusData.m_strKname);
	} else if (Other.getClearString(cusData.m_strName0).length > 0) {
		document.getElementById("nameVal_NK").innerHTML = Other.getClearString(cusData.m_strName0);
		document.getElementById("kNameVal_NK").innerHTML = Other.getClearString(cusData.m_strKname);
	} else {
		document.getElementById("nameVal_NK").innerHTML = Other.getClearString(cusData.m_strName1);
		document.getElementById("kNameVal_NK").innerHTML = Other.getClearString(cusData.m_strKname);
	}

	document.getElementById("address0Val_NK").innerHTML = cusData.m_strAdd0;
	if (Other.getClearString(cusData.m_strName0) != "") {
		document.getElementById("address1Val_NK").innerHTML = cusData.m_strAdd1;
	} else {
		document.getElementById("address1Val_NK").style.display = "none";
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
		if (userData.m_lstLeasHmefDat != null) {
			for (var i = 0; i < userData.m_lstLeasHmefDat.length; i++) {
				const hmefDat = userData.m_lstLeasHmefDat[i];
				// 有効な明細、ハンディ売上、リース明細フラグ=1
				if (hmefDat.mUsef && hmefDat.mHmeKind == 9 && hmefDat.mLeasKind == 1) {
					kensinData.m_HmDay += hmefDat.mKin + hmefDat.mTax;
				}
			}
		}
	}

	kensinData.m_HmMonth = GasRaterCom.calcEtcUri(sysfDat, kokfDat) + GasRaterCom.calcEtcTax(sysfDat, kokfDat);// 当月売上

	kensinData.m_isHybrid = kouserDat.mHyc5 == 1 && isHybSeikyu;
	if (kensinData.m_isHybrid) {
		// ハイブリッドカウンタの名称取得
		kensinData.mCounterName = new Array(userData.mKo2fDat.kHyb_MAX);		//ko2fDat
		for (var i = 0; i < kensinData.mCounterName.length; i++) {
			kensinData.mCounterName[i] = getCounterName(i);
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
		kensinData.m_nHybGasUse = new Array(kensinData.mKo2fDat.kHyb_MAX);
		for (var i = 0; i < kensinData.mKo2fDat.kHyb_MAX; i++) {
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
		kensinData.mGasBaseKin = GasRaterCom.calcGasBase(sysfDat, kokfDat, kensinData.m_GasfDat, sy2fDat, kouserDat);
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
		var calKai = new Date();
		if (kokfDat.mKaiYear > 0 && kokfDat.mKaiMonth > 0 && kokfDat.mKaiDate > 0) {
			calKai = new Date(kokfDat.mKaiYear, kokfDat.mKaiMonth - 1, kokfDat.mKaiDate);
		}
		var calZyks = new Date();
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
			kensinData.m_strHiwariComment_0 = Other.nullToString(sysfDat.mGtpcDat.m_strHiwariComment_0);
			kensinData.m_strHiwariComment_1 = Other.nullToString(sysfDat.mGtpcDat.m_strHiwariComment_1);
			if (Other.cutStringSpace(kensinData.m_strHiwariComment_0).length == 0 && Other.cutStringSpace(kensinData.m_strHiwariComment_1).length == 0) {
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

	if (sysfDat.m_isToyukensinFlg) {
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
		strCounterName = mUserData.mmHynmDat[nCounterNo].mName;
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
*/
function calcTotalKin() {
	if (kensinData.m_isHybrid && kensinData.mKo2fDat.mGashyb > 0) {
		kensinData.m_GasPay = parseInt(kensinData.mKo2fDat.mNorKin);
		for (var i = 0; i < kensinData.mKo2fDat.kHyb_MAX; i++) {
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


/**
	* 伝票の検針データ印字部分の作成
	*
	* @param wkKensinData  [in]    KensinData  検針データ
	* @param isKinOnly     [in]    boolean     入金のみ
*/
function createRyosyuInfo(wkKensinData, isNyukinOnly) {
	if (!isNyukinOnly) {
		if (wkKensinData.m_Receipt != 0) {
			document.getElementById("konkaiSeikyuGakuVal_NK").innerHTML = Other.formatDecial(wkKensinData.m_Receipt);
		} else {
			document.getElementById("konkaiSeikyuGakuArea_NK").style.display = "none";
		}

		if (wkKensinData.m_Chosei != 0) {
			document.getElementById("choTitleText_NK").innerHTML = getChoTitle();
			document.getElementById("choTitleVal_NK").innerHTML = Other.formatDecial(wkKensinData.m_Chosei);
		} else {
			document.getElementById("choTitleArea_NK").style.display = "none";
		}
	}

	var isJust = wkKensinData.m_Azukarikin == wkKensinData.m_Nyukin;
	document.getElementById("isJustText").innerHTML = isJust ? "ご入金" : "お預り額";
	document.getElementById("isJustVal").innerHTML = Other.formatDecial(wkKensinData.m_Azukarikin);

	if (wkKensinData.m_Azukarikin > wkKensinData.m_Nyukin) {
		document.getElementById("otsuriVal_NK").innerHTML = Other.formatDecial(wkKensinData.m_Azukarikin - wkKensinData.m_Nyukin);
	} else {
		document.getElementById("otsuriArea_NK").style.display = "none";
	}


	if (!isNyukinOnly) {
		var lZandaka = wkKensinData.m_Receipt + wkKensinData.m_Chosei - wkKensinData.m_Nyukin;
		if (isJust || lZandaka != 0) {
			document.getElementById("sashihikiZandakaVal_NK").innerHTML = Other.formatDecial(lZandaka);
		} else {
			document.getElementById("sashihikiZandakaArea_NK").style.display = "none";
		}
	}

	if (mUserData.mSy2fDat.mSysOption[Dat.SysOption.NOT_PRINT_UTIZEI] == 0) {
		createUTaxComment(wkKensinData);
	}
}


/**
	* 内税コメントの生成.
	*
	* @param kensinData    [in] {@link KensinData} 検針印刷データ
*/
function createUTaxComment(wkKensinData) {
	var wkStr;
	var wkTaxDat = Calc_UchiZei(wkKensinData, wkKensinData.m_isHybrid);

	if (wkTaxDat.mGUchiZei != 0 || wkTaxDat.mUchiZei != 0) {
		document.getElementById("uTaxCommentArea_NK").style.display = "block";
		if (wkTaxDat.mGUchiZei != 0) {
			document.getElementById("uTaxComment1Area_NK").style.display = "block";
			if (wkTaxDat.mUchiZei == 0) {
				//ガス売上には

				const gUchiZeiVal = document.getElementById("gUchiZeiVal_NK");
				gUchiZeiVal.innerHTML = Other.KingakuFormat(wkTaxDat.mGUchiZei);

				const gUchiZeiText = document.getElementById("gUchiZeiText_NK");
				gUchiZeiText.innerHTML = "円の消費税が含まれます。";
			} else {
				// ガス売上には
				const gUchiZeiVal = document.getElementById("gUchiZeiVal_NK");
				gUchiZeiVal.innerHTML = Other.KingakuFormat(wkTaxDat.mGUchiZei);

				const gUchiZeiText = document.getElementById("gUchiZeiText_NK");
				gUchiZeiText.innerHTML = "円、";
			}
		} else {
			document.getElementById("uTaxComment1Area_NK").style.display = "none";
		}

		if (wkTaxDat.mUchiZei != 0) {
			document.getElementById("uTaxComment2Area_NK").style.display = "block";
			if (wkTaxDat.mGUchiZei == 0) {
				wkStr = "他売上には";
			} else {
				wkStr = "売上には";
			}
			const taUriageUriageText = document.getElementById("taUriage-uriageText_NK");
			taUriageUriageText.innerHTML = wkStr;


			const taUriageUriageVal = document.getElementById("taUriage-uriageVal_NK");
			taUriageUriageVal.innerHTML = Other.KingakuFormat(wkTaxDat.mUchiZei);
		} else {
			document.getElementById("uTaxComment2Area_NK").style.display = "none";
		}
	} else {
		document.getElementById("uTaxCommentArea_NK").style.display = "none";
	}
}


/**
 	* 調整額名称の取得.
 	*
 	* @return String   調整額名称
*/
function getChoTitle() {
	var strChoTitle = "調整額";
	var sy2fDat = mUserData.mSy2fDat;
	if (sy2fDat != null && sy2fDat.mSysfHmcd13 != 0) {
		const mBusfDat_hmcd13 = mUserData.mBusfDat_hmcd13;
		if (mBusfDat_hmcd13 != null) {
			strChoTitle = Other.cutStringSpace(mBusfDat_hmcd13.mName).trim();
		}
	}
	return strChoTitle;
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
	var wTaxdat = new Dat.TaxDat(0, 0);	// wTaxdat
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
		// ハイブリッドでの内税額の対応
		var wk_kin;
		wk_kin = wkKokf.mFee;
		if (isHybSeikyu && wkKo2f.mGashyb > 0) {
			if (wkKo2f.mChoKin != 0 || wkKo2f.mChoTax != 0) {//値引きが発生しないときには、通常料金とする。
				//ハイブリッド料金
				wk_kin = wkKo2f.mNorKin;
				for (var j = 0; j < wkKo2f.kHyb_MAX; j++) {
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
	var wkHmefList = mUserData.getHmef0;
	var wkHmefList1 = mUserData.getHmef1;
	var wkHmefList2 = mUserData.getHmef2;
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
	* @param sysf2     [in] Sy2fDat    	   システム2データ
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
	* 伝票の明細部分の作成
*/
function createHmInfo_() {
	var kokfDat = JSON.parse(JSON.stringify(mUserData.mKokfDat));
	var sysfDat = JSON.parse(JSON.stringify(mUserData.mSysfDat));
	var sy2fDat = JSON.parse(JSON.stringify(mUserData.mSy2fDat));
	var isTanka = sy2fDat.mSysOption[Dat.SysOption.PRINT_TANKA] == 1;

	// 販売データ
	var wkHmefList = kokfDat.mSimeF == 1 ? mUserData.getHmef0 : mUserData.getHmef1;
	var wkHmefList2 = mUserData.getHmef2;
	var isUriage = isUriage_(wkHmefList, sysfDat, true) || isUriage_(wkHmefList2, sysfDat, true);
	if (isUriage) {
		createHmInfoHeader(isTanka);
		var mapHmefDat = new Map();
		calcKeigen(mapHmefDat, wkHmefList);
		calcKeigen(mapHmefDat, wkHmefList2);
		var lstHmefDat;
		if (kokfDat.mFee > 0) {
			// ガス料金有り⇒軽減税率チェック実施
			var hmefDatGas = new Dat.HmefDat();

			hmefDatGas.mUsef = true;
			hmefDatGas.mHmName = "ガス使用量";
			hmefDatGas.mHmCode = 9999;
			hmefDatGas.mDeny = parseInt(mUserData.mKensinDate.substring(0, 4));
			hmefDatGas.mDenm = kokfDat.mKMonth;
			hmefDatGas.mDend = kokfDat.mKDate;
			hmefDatGas.mKin = kokfDat.mFee;
			hmefDatGas.mTax = kokfDat.mConTax;
			hmefDatGas.mTaxKu = mUserData.mGasfDat.mTaxDiv;
			if (hmefDatGas.mTaxKu > 1) {
				hmefDatGas.mTaxR = GasRaterCom.getKenTaxr(kokfDat, sysfDat, sysfDat.mTax_yy, sysfDat.mTax_mm, sysfDat.mTax_dd, sysfDat.mConsumTax, sysfDat.mTaxr_old, sysfDat.mTaxr_new);
				if (getKeigenKubun(sysfDat, hmefDatGas.mTaxR) > 0) {
					hmefDatGas.mKeigenKubun = 1;
				}
			}
			lstHmefDat.push(hmefDatGas);

			if (kokfDat.mReduce > 0) {
				// 還元額有り
				var shofDat;
				try {
					shofDat = mUserData;		//Hieu
				}
				catch (ex) {
					console.log(ex);
				}
				var hmefDatKng = new Dat.HmefDat();
				hmefDatKng.mUsef = true;
				hmefDatKng.mHmCode = shofDat.mHinno;
				hmefDatKng.mHmName = Other.getKangcontname(mUserData);
				hmefDatKng.mDeny = parseInt(new Date().getFullYear());
				hmefDatKng.mDenm = kokfDat.mKMonth;
				hmefDatKng.mDend = kokfDat.mKDate;
				hmefDatKng.mKin = kokfDat.mReduce;
				hmefDatKng.mTax = kokfDat.mReduceTax;
				hmefDatKng.mTaxKu = shofDat.mTaxKu;
				if (hmefDatKng.mTaxKu > 1) {
					hmefDatKng.mTaxR = GasRaterCom.getKenTaxr(kokfDat, sysfDat, shofDat.mTax_yy, shofDat.mTax_mm, shofDat.mTax_dd, shofDat.mTaxR, shofDat.mTaxr_old, sysfDat.mTaxr_new);
					if (getKeigenKubun(sysfDat, hmefDatKng.mTaxR) > 0) {
						hmefDatKng.mKeigenKubun = 1;
					}
				}
				lstHmefDat.push(hmefDatKng);
			}
			calcKeigen(mapHmefDat, lstHmefDat);
		}

		var nTax = 0;
		// 前残
		var nPreBalance = GasRaterCom.readPrebalance(sysfDat, kokfDat, sy2fDat);
		if (nPreBalance != 0) {
			var hmefDatZan = new Dat.HmefDat();
			hmefDatZan.mUsef = true;
			hmefDatZan.mHmCode = 9999;
			if (kokfDat.mSimeF == 0) {
				hmefDatZan.mHmName = "前月残高";
				hmefDatZan.mKin = kokfDat.mPreBalance;
			}
			else {
				hmefDatZan.mHmName = "前月繰越額";
				hmefDatZan.mKin = GasRaterCom.calcSeikyu(sysfDat, kokfDat, sy2fDat, false);
				hmefDatZan.mKin -= (kokfDat.mGUri2 + kokfDat.mUri2 + kokfDat.mTax2 - kokfDat.mNyu2 + kokfDat.mCho2);
			}
			createHmInfo(new Array(hmefDatZan), sysfDat, mapHmefDat, isTanka);
		}
		if (wkHmefList.length > 0) nTax = createHmInfo(wkHmefList, sysfDat, mapHmefDat, isTanka);
		if (lstHmefDat.length == 0) nTax = createHmInfo(lstHmefDat, sysfDat, mapHmefDat, isTanka);
		if (wkHmefList2.length > 0) createHmInfo(wkHmefList2, sysfDat, mapHmefDat, isTanka);

		// 消費税
		createHmInfoTax(mapHmefDat, kokfDat.mUriTax + nTax);
	} else {
		document.getElementById("hmInfoArea_NK").style.display = "none";
	}
}


/**
	* 販売明細ヘッダーの印字.
	*
	* @param isTanka           [in] boolean                    単価印字フラグ(true: 印字有り, false: 印字無し)
*/
function createHmInfoHeader(isTanka) {
	if (isTanka) {
		document.getElementsByClassName("hinmoku-nk")[0].classList.remove("hmw-20");
		document.getElementsByClassName("hinmoku-nk")[0].classList.add(" hmw-40");
	} else {
		document.getElementsByClassName("tanka-nk")[0].style.display = "none";
		document.getElementsByClassName("hinmoku-nk")[0].classList.remove("hmw-40");
		document.getElementsByClassName("hinmoku-nk")[0].classList.add(" hmw-20");
	}
}


/**
	* 軽減税率の計算処理.
	*
	* @param mapHmefDat    [in] {@code Map<Integer, HmefDat>}  軽減税率マップ
	* @param lstHmefDat    [in] HmefDat[]                      販売明細一覧
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
*/
function addKeigenTax(sysfDat, hmefDats, mapHmefDat) {
	var nIdx = 1;
	for (var i = 0; i < hmefDats.length; i++) {
		var hmefDat = hmefDats[i];
		if (!hmefDat.mUsef || hmefDat.mHmCode <= sysfDat.mSnvalue) {
		}
		setKeigenKubun(hmefDat, sysfDat);
		var nKey = hmefDat.mKeigenKubun * 1000 + hmefDat.mTaxR;
		var hmefDatKeigen = mapHmefDat[nKey];
		if (hmefDatKeigen == null) {
			hmefDatKeigen = new Map();	//Khoi tao HmefDat Hieu
			if (hmefDat.mKeigenKubun != 0) {
				hmefDatKeigen.mCusrec = nIdx++;
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
	* @return int 軽減税率区分
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
	* @param sysfDat           [in] SysfDat        システムデータ
	* @param mapHmefDat        [in] {@code Map<Integer, HmefDat>}  軽減税率区分毎データ
	* @param isTanka           [in] boolean    単価印字フラグ(true:有り/false:無し)
*/
function createHmInfo(lstHmefDat, sysfDat, mapHmefDat, isTanka) {
	if (lstHmefDat == null || lstHmefDat.length == 0) {
		return 0;
	}
	var nTax = 0;
	var strPrint = "";
	var previousId = "hmInfoHeaderText";
	for (var i = 0; i < lstHmefDat.length; i++) {
		const area = document.getElementById(previousId);
		var hmefDat = lstHmefDat[i];
		if (!hmefDat.mUsef || hmefDat.mHmCode < sysfDat.mSnvalue) {
			continue;
		}

		// 日付
		const row = document.createElement("tr");
		row.id = "hmInfoTableItem_NK" + String(i);

		if (hmefDat.mDenm != 0) {
			strPrint = hmefDat.mDenm + "/" + hmefDat.mDend;
		}
		const date = document.createElement("td");
		date.className = "text-print ta-c w-16 hmInfoTable-item";
		date.appendChild(document.createTextNode(strPrint));


		// 品目
		strPrint = Other.getClearString(hmefDat.mHmName);
		const name = document.createElement("td");
		name.className = "text-print ta-l w-20 hmInfoTable-item";
		const hmName = document.createElement("span");
		hmName.className = "text-print ta-l w100 hmInfoTable-item";
		hmName.appendChild(document.createTextNode(strPrint));
		name.appendChild(hmName);


		// 数量
		if (hmefDat.mSuryo != 0) {
			strPrint = Other.formatLocalJS(hmefDat.mSuryo, 2, 2);
		}
		else {
			strPrint = " ";
		}
		const suryo = document.createElement("td");
		suryo.className = "text-print ta-r w-20 hmInfoTable-item";
		suryo.appendChild(document.createTextNode(strPrint));



		const tanka = document.createElement("td");
		tanka.className = "text-print ta-r w-20 hmInfoTable-item";
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
		if (nKin < 1000) {
			strPrint = Other.formatLocalJS(nKin, 0, 0);
		} else {
			strPrint = Other.formatDecial(nKin);
		}
		var hmefDatKeigen = mapHmefDat.get(hmefDat.mKeigenKubun * 1000 + hmefDat.mTaxR);
		if (hmefDatKeigen != null && hmefDatKeigen.mKeigenKubun != 0) {
			strPrint += String(hmefDatKeigen.mCusrec);
		}
		nTax += hmefDat.mTax;
		const kin = document.createElement("td");
		kin.className = "text-print ta-r w-24 hmInfoTable-item";
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
		area.after(row);
		previousId = row.id;
	}
	return nTax;
}



/**
	* 消費税明細の印字データ生成.
	* <br>軽減税率対応(Sy2fDat.msyskeigen == 1)の場合は軽減税率区分、税率毎の消費税を印字.
	* <br>非対応の場合は明細の合計消費税額を印字.
	*
	* @param mapHmefDat        [in] {@code Map<Integer, HmefDat>}  軽減税率区分、税率毎の消費税金額
	* @param nTax              [in] int                            消費税金額
*/
function createHmInfoTax(mapHmefDat, nTax) {
	// 消費税
	if (mUserData.mSy2fDat.mSyskeigen == 0) {
		if (nTax != 0) {
			document.getElementById("infoTaxArea_NK").style.display = "none";
			// document.getElementById("hmInfoTotal").style.display = "block";
			const nTaxVal = document.getElementById("nTaxVal_NK");
			nTaxVal.innerHTML = Other.formatDecial(nTax);
		} else {
			document.getElementById("hmInfoTotal_NK").style.display = "none";
			document.getElementById("infoTaxArea_NK").style.display = "none";
		}
	}
	else {
		document.getElementById("hmInfoTotal_NK").style.display = "none";
		// document.getElementById("infoTaxArea").style.display = "block";
		for (let hmefDat of mapHmefDat.values()) {

			const hmefTaxKeigenTotalVal = document.getElementById("hmefTaxKeigenTotalVal_NK");
			hmefTaxKeigenTotalVal.innerHTML = getHmefTaxKeigenTotal(hmefDat);

			const hmefKinVal = document.getElementById("hmefKinVal_NK");
			hmefKinVal.innerHTML = Other.formatDecial(hmefDat.mKin) + ")";

			const hmefTaxKeigenTaxVal = document.getElementById("hmefTaxKeigenTaxVal_NK");
			hmefTaxKeigenTaxVal.innerHTML = getHmefTaxkeigenTax(hmefDat);

			const hmefTaXVal = document.getElementById("hmefTaXVal_NK");
			hmefTaXVal.innerHTML = Other.formatDecial(hmefDat.mTax) + ")";
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
		strTax += String(hmefDat.mCusrec);
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
	* 領収印印字.
	*
	* @param strInpReceipt   [in] String 領収金額
*/
function createRyoshu(strInpReceipt) {
	var wkStr;
	wkStr = strInpReceipt + "円";
	const ryooshuuKingakuVal = document.getElementById("ryooshuuKingakuVal_NK");
	ryooshuuKingakuVal.innerHTML = wkStr;
}


/**
	* コメントの取得.
	*
	* @return  String[]    コメント
*/
function getComment() {
	var strComments = [];
	for (var i = 0; i < dataSetting.m_lstComment.length; i++) {
		if (dataSetting.comment1 == dataSetting.m_lstComment[i].code) {
			strComments[0] = dataSetting.m_lstComment[i].name;
		}

		if (dataSetting.comment2 == dataSetting.m_lstComment[i].code) {
			strComments[1] = dataSetting.m_lstComment[i].name;
		}
	}
	return strComments;
}


/**
	* コメント印字
	*
	* @param commentData [in] CommentData    コメントデータ
*/
function createComment(commentData) {
	if (commentData.length == 0) {
		document.getElementById("commentArea_NK").style.display = "none";
		return;
	}

	const commentDetailArea = document.getElementById("commentDetailArea_NK");
	for (var i = 0; i < commentData.length; i++) {
		if (commentData[i].length == 0) continue;
		document.getElementById("commentArea_NK").style.display = "block";

		const comment = document.createElement("div");
		comment.className = "col-12 text-print ta-l wsp-text item commentVal";
		comment.appendChild(document.createTextNode(commentData[i]));
		commentDetailArea.appendChild(comment);
	}
}


/**
	* 店舗情報の印刷データを作成する。
	*
	* @param hanfDat [in] HanfDat    店舗データ
*/
function createUserInfo(hanfDat, strTantname) {
	var wkStr;
	var countNull = 0;

	wkStr = hanfDat.mName;
	const mNameVal = document.getElementById("mNameVal_NK");
	mNameVal.innerHTML = Other.cutStringSpace(wkStr);

	const add1Val = document.getElementById("add1Val_NK");
	if (Other.getClearString(hanfDat.mAdd1) != "") {
		add1Val.style.display = "block";
		add1Val.innerHTML = Other.cutStringSpace(hanfDat.mAdd1);
	} else {
		add1Val.style.display = "none";
	}

	const add2Val = document.getElementById("add2Val_NK");
	if (Other.getClearString(hanfDat.add2Val) != "") {
		add2Val.style.display = "block";
		add2Val.innerHTML = Other.cutStringSpace(hanfDat.add2Val);
	} else {
		add2Val.style.display = "none";
	}

	//TEL
	const telVal = document.getElementById("telVal_NK");
	telVal.innerHTML = hanfDat.mTel;

	//FAX
	const faxVal = document.getElementById("faxVal_NK");
	faxVal.innerHTML = hanfDat.mFax;

	//tantnameFaxVal
	const tantnameFaxVal = document.getElementById("tantnameFaxVal_NK");
	tantnameFaxVal.innerHTML = Other.cutStringSpace(strTantname);


	var strBkinfo;
	var hanf2Dat = hanfDat;;
	if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkname_0).trim()) > 0) {
		// 銀行１名称有り
		strBkinfo = Other.getClearString(hanf2Dat.mBkname_0).trim();
		if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkshiten_0).trim()) > 0) {
			// 銀行１支店名有り
			strBkinfo += " / " + Other.getClearString(hanf2Dat.mBkshiten_0).trim();
		}
		const bkname0Shiten0 = document.getElementById("bkname0&Shiten0_NK");
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
				strBkinfo += " / ";
			}
			strBkinfo += Other.getClearString(hanf2Dat.mBkban_0).trim();
		}

		const bkKubun0Ban0 = document.getElementById("bkKubun0&Ban0_NK");
		if (strBkinfo.length != 0) {
			bkKubun0Ban0.innerHTML = strBkinfo;
			bkKubun0Ban0.style.display = "block";
		} else {
			bkKubun0Ban0.style.display = "none";
		}
	} else {
		document.getElementById("bkname0&Shiten0_NK").style.display = "none";
		document.getElementById("bkKubun0&Ban0_NK").style.display = "none";
		countNull += 2;
	}
	if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkname_1).trim()) > 0) {
		// 銀行２名称有り
		strBkinfo = Other.getClearString(hanf2Dat.mBkname_1).trim();
		if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkshiten_1).trim()) > 0) {
			// 銀行２支店名有り
			strBkinfo += " / " + Other.getClearString(hanf2Dat.mBkshiten_1).trim();
		}
		const bkname1Shiten1 = document.getElementById("bkname1&Shiten1_NK");
		bkname1Shiten1.innerHTML = strBkinfo;


		strBkinfo = "";
		if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkkubun_1).trim()) > 0) {
			// 銀行２区分有り
			strBkinfo = Other.getClearString(hanf2Dat.mBkkubun_1).trim();
		}
		if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkban_1).trim()) > 0) {
			// 銀行２口座番号有り
			if (strBkinfo.length != 0) {
				// 区分有りの場合
				strBkinfo += " / ";
			}
			strBkinfo += Other.getClearString(hanf2Dat.mBkban_1).trim();
		}

		const bkKubun1Ban1 = document.getElementById("bkKubun1&Ban1_NK");
		if (strBkinfo.length != 0) {
			bkKubun1Ban1.innerHTML = strBkinfo;
			bkKubun1Ban1.style.display = "block";
		} else {
			bkKubun1Ban1.style.display = "none";
		}
	} else {
		document.getElementById("bkname1&Shiten1_NK").style.display = "none";
		document.getElementById("bkKubun1&Ban1_NK").style.display = "none";
		countNull += 2;
	}

	if (countNull == 4) {
		document.getElementById("bkInfoArea_NK").style.display = "none";
	}
}


/** 
	* GET PRINT STATUS
*/
function getPrintStatus(kokfDat, sysfDat, isPrintNyukin, lReceipt, lZandaka, isPrintKensin, isToyu) {
	var isPrintHoan = sysfDat.mCheckHoan && (kokfDat.mGasKubun != 2 || kokfDat.mTenkenKgas == 1);
	printStatus.m_isPrintHoan = isPrintHoan;
	printStatus.m_isPrintNyukin = isPrintNyukin;
	printStatus.m_lReceipt = lReceipt;
	printStatus.m_lZandaka = lZandaka;
	printStatus.m_isPrintKensin = isPrintKensin;
	printStatus.m_isPrintToyu = isToyu;
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
	const element = document.getElementsByClassName(nameItem);
	for (let i = 0; i < element.length; i++) {
		element[i].style.setProperty("font-size", textSize, "important")
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
	window.location.href = "printermarutou://print&&1" + "&&" + window.location.href.replace("https://", "");
}


/**
	* ONCLICK ACTION
*/
function onclickAction() {
	if (KensinKinyuu.modePage == 3) {
		document.getElementById("backPrintButton").onclick = function () {
			if (sessionStorage.getItem(StringCS.SAVINGSTATUS) != "1") {
				document.getElementById("editView").style.display = "block";
				document.getElementById("printView").style.display = "none";
				location.reload();
			} else {
				Common.movePage('/search_customer.html');
			}
		};
		document.getElementById("sendToAppButton").onclick = function () {
			sendImage();
		};
		KensinKinyuu.saveButton.onclick = function () {
			// Common.setupModal("load", null, Mess.I00004, null, StringCS.OK, null, false);
			savingData();
		}
	}
}


/** 
	* CREATE IMAGE FILE OF SHUUKEI NIPPOU FORM
*/
function createImageKensinForm() {
	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
	document.getElementById('editView').style.display = "none";
	document.getElementById('printView').style.display = "block";
	setupPrintForm("100vh", "670px", "55px", "31px", "38px", "31px", "38px", true, "20px");
	setupTextSizeDetail("lg-text", "40px", "47px", "bold");
	setupTextSizeDetail("tb-item", "22px", "29px", "normal");
	setupTextSizeDetail("konkaiSeikyuuGaku-text", "50px", "60px", "bold");
	setupTextSizeDetail("ryooshuu-text", "50px", "58px", "bold");
	setupTextSizeDetail("hmInfoTable-item", "24px", "31px", "normal");
	setupTextSizeDetail("hybTable-item", "24px", "31px", "normal");
	setupTextSizeDetail("hoan-item", "25px", "29px", "normal");
	setupTextSizeDetail("hoan-val", "25px", "29px", "normal");
	setupTextSizeDetail("kk-val", "40px", "48px", "bold");
	domtoimage.toBlob(document.getElementById('printContentDetail'))
		.then(function (blob) {
			getBase64(blob).then(
				data => {
					console.log(data)
					imgString = data;
					window.scrollTo(0, 0);

					const interval = setInterval(function () {
						setupPrintForm("100%", "600px", titlePrintViewTS, itemTS, itemLH, itemTS, itemLH, false, defaultPaddingPrintForm);
						setupTextSizeDetail("lg-text", lgTextTS, lgTextLH, "bold");
						setupTextSizeDetail("tb-item-ts", tbItemTS, tbItemLH, "normal");
						setupTextSizeDetail("ryooshuu-text", ryooshuuTextTS, ryooshuuTextLH, "bold");
						setupTextSizeDetail("konkaiSeikyuuGaku-text", konkaiSeikyuuGakuTS, konkaiSeikyuuGakuLH, "bold");
						setupTextSizeDetail("hmInfoTable-item", hmInfoTableItemTS, hmInfoTableItemLH, "normal");
						setupTextSizeDetail("hybTable-item", hybTableItemTS, hybTableItemLH, "normal");
						setupTextSizeDetail("hoan-item", hoanItemTS, hoanItemLH, "normal");
						setupTextSizeDetail("hoan-val", hoanValTS, hoanValLH, "normal");
						setupTextSizeDetail("kk-val", kkValTS, kkValLH, "bold");

						Common.setBackgroundDialogScreen("block", "rgba(0,0,0,0.4)");
						clearInterval(interval);
						modal.style.display = "none";
					}, 100);
				}
			);
		})
}

/** 
	* SENDING DATA
*/
function savingData() {
	Common.setupModal("load", null, Mess.I00002, null, null, null, false);
	$.ajax({
		type: "POST",
		data: JSON.stringify(KensinKinyuu.sendDataToServer()),
		url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_WRITEDATA,
		// url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_WRITEDATA,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		timeout: ValueCS.VL_LONG_TIMEOUT,
		success: function (response) {
			console.log(response);
			document.getElementById("editView").style.display = "none";
			document.getElementById("printView").style.display = "block";
			document.getElementById("kensinForm").style.display = "none";
			var mReciept = 0;
			var mZandaka = 0;
			if (KensinKinyuu.displayTab[2] == true) {
				mReciept = Other.getNumFromString(document.getElementById("nyuukin").textContent);
				mZandaka = Other.getNumFromString(document.getElementById("zandaka").textContent);
				getPrintStatus(mUserData.mKokfDat, mUserData.mSysfDat, true, mReciept, mZandaka, true, mUserData.mSysfDat.m_isToyukensinFlg);
				createPrintData(printStatus, false);
			} else {
				getPrintStatus(mUserData.mKokfDat, mUserData.mSysfDat, true, 0, 0, true, mUserData.mSysfDat.m_isToyukensinFlg);
				createPrintData(printStatus, false);
			}
			createImageKensinForm();
		},
		error: function (xmlhttprequest, textstatus, message) {
			if (textstatus === "timeout") {
				console.log("timeout")
			} else {
				console.log(textstatus)
			}
			Common.setupModal("error", null, Mess.E00004, null, StringCS.OK, null, false);
		}
	}).done(function (res) {
		console.log('res', res);
		Common.setupModal("success", null, Mess.I00003, null, StringCS.OK, null, false);
	});
}


/** 
	* ONLOAD ACTION
*/
function onLoadAction() {
	onclickAction();
}


onLoadAction();