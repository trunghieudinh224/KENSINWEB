import * as Common from './Common/common_function.js'
import * as Other from './Common/other_util.js'
import * as StringCS from './Constant/strings.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'
import * as GasRaterCom from './Common/gasratercom.js'
import * as Dat from './Dat/dat.js'
import * as KensinKinyuu from './kensin_kinnyuu.js'
import * as HoanKinnyuu from './hoan_kinnyuu.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");

/*****  DATA VARIABLE  *****/
/* kensin date */
var kensinDate = sessionStorage.getItem(StringCS.KENSINDATE);
/* setting data */
var dataSetting = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));
/** 日常点検項目 */
var HOAN_ITEMS = ["①容器設置場所", "②容器設置状況", "③火気禁止２ｍ", "④調整器", "⑤配管状況", "⑥ガス栓", "⑦危険標識", "⑧マイコンメーター"];
/** ユーザー情報 */
var mUserData = KensinKinyuu.mUserData;
mUserData.mNyukinMode = false;
mUserData.m_lstLeasHmefDat = null;
/** 印刷情報 */
var printStatus = new Dat.PrintStatus();
/** 検針情報 */
var kensinData = new Dat.KensinData();
/** search mode */
var searchMode = sessionStorage.getItem(StringCS.SEARCHMODE);


/*****  ANDROID DATA  *****/
var androidData = new Dat.AndroidData();
var mKSIB = new Dat.KSIB();
var mKI = new Dat.KI();
var mUTC = new Dat.UTC();

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
var titlePrintViewLH = window.getComputedStyle(document.getElementsByClassName("titlePrintView")[0]).lineHeight;
var kkValLH = window.getComputedStyle(document.getElementsByClassName("kk-val")[0]).lineHeight;


/**
	* 印刷データを作成する
*/
function createPrintData(printStatus, isHybseikyu, isHikae) {
	var sysfDat = mUserData.mSysfDat;
	var kokfDat = mUserData.mKokfDat;
	setTitlePrintForm(printStatus.m_lReceipt != 0, isHikae);
	createCusInfo(getCusData());

	var wkKensinData = setKensinData(mUserData, isHybseikyu, printStatus.m_isPrintKensin, printStatus.m_isPrintToyu);
	if (sysfDat.m_isToyukensinFlg) {
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
		} else {
			document.getElementById("ryoshuArea").style.display = "none";
		}
	} else {
		document.getElementById("ryoshuArea").style.display = "none";
	}

	var wkSy2fDat = mUserData.mSy2fDat;
	if (!mUserData.mNyukinMode) {
		if (kokfDat.mBankCode != 0) {
			createBank();
		} else {
			document.getElementById("bankArea").style.display = "none";
		}

		// 振替不能コメント
		createFunouComment();
	}
	if (!mUserData.mNyukinMode || !mUserData.mNyukinOnly) {
		if (wkSy2fDat.mSysOption[Dat.SysOption.PRINT_HANMEISAI] == 0) {
			// Data chua co de test (hieu)
			// document.getElementById("hmInfoArea").style.display = "none";
			createHmInfo_(mUserData);
		} else {
			document.getElementById("hmInfoArea").style.display = "none";
		}
	} else {
		document.getElementById("hmInfoArea").style.display = "none";
	}
	if (wkSy2fDat.mSysOption[Dat.SysOption.PRINT_COMMENT] == 1) {
		createComment(getComment());
	}


	if (!mUserData.mNyukinMode) {
		if (printStatus.m_isPrintKensin) {
			createHybComment(wkKensinData);
			createHybTblPrint(wkKensinData);

			if (printStatus.m_isPrintHoan) {
				if (mUserData.mKokfDat.mNoKensin == 0) {
					// 保安点検
					if (sysfDat.mCheckHoan && wkSy2fDat.mSysOption[Dat.SysOption.PRINT_HOAN] == 1) { 		// Dat.SysOption.PRINT_HOAN.getIdx() = 21
						createHoanInfo(HoanKinnyuu.hoanString);
					} else {
						document.getElementById("hoanInfoArea").style.display = "none";
					}
				}
			}
		} else {
			document.getElementById("hybCommentArea").style.display = "none";
			document.getElementById("hybTblArea").style.display = "none";
			document.getElementById("hoanInfoArea").style.display = "none";
		}

		// 標準ポイント
		createPoint();
		// 宮野式ポイント
		createMiyaPoint();

		createCnComment(wkKensinData);
	} else {
		document.getElementById("hybCommentArea").style.display = "none";
		document.getElementById("hybTblArea").style.display = "none";
		document.getElementById("hoanInfoArea").style.display = "none";
		document.getElementById("pointArea").style.display = "none";
		document.getElementById("miyaPointArea").style.display = "none";
		document.getElementById("cnCommentArea").style.display = "none";
	}

	// 店舗データ
	if (sysfDat.mIfChitUser) {
		var tantname = dataSetting.m_lstTantName[0].name;
		createUserInfo(mUserData.mHanfDat, tantname);
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
		var gtpc = mUserData.mSysfDat.mGtpcDat;
		if (isNyukin == true) {
			if (isHikae == true) {
				if (sysfdat.mVisibleGas == 1 && !Other.isEmpty(Other.cutStringSpace(gtpc.m_strTitle_3))) {
					strTitle == gtpc.m_strTitle_3;
				} else {
					strTitle = "検針伝票 (兼　領収書)(控)";
				}
			} else {
				if (mUserData.mSysfDat.mVisibleGas == 1 && !Other.isEmpty(Other.cutStringSpace(gtpc.m_strTitle_1))) {
					strTitle = gtpc.m_strTitle_1;
				} else {
					strTitle = "検針伝票 (兼　領収書)";
				}
			}
		} else {
			if (isHikae == true) {
				if (mUserData.mSysfDat.mVisibleGas == 1 && !Other.isEmpty(Other.cutStringSpace(gtpc.m_strTitle_2))) {
					strTitle = gtpc.m_strTitle_2;
				} else {
					strTitle = "検 針 伝 票(控)";
				}
			}
			else {
				if (mUserData.mSysfDat.mVisibleGas == 1 && !Other.isEmpty(Other.cutStringSpace(gtpc.m_strTitle_0))) {
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
	* @param userData  [in] {@link UserData}   アプリデータ
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
	kensinData.m_HmMonth = GasRaterCom.calcEtcUri(sysfDat, kokfDat) + GasRaterCom.calcEtcTax(sysfDat, kokfDat);// 当月売上

	if (sysfDat.mIfAdjust) {
		kensinData.m_nTReceipt = kokfDat.mTReceipt;
		kensinData.m_nTAdjust = kokfDat.mTAdjust;
	}
	if (sysfDat.m_isLtas) {
		// これまでの残高 = 前残 + 当月売上
		kensinData.m_PreReceipt += kensinData.m_HmMonth;
		kensinData.m_PreReceipt -= kensinData.m_nTReceipt;
		kensinData.m_nTReceipt = 0;
		kensinData.m_PreReceipt += kensinData.m_nTAdjust;
		kensinData.m_nTAdjust = 0;
		kensinData.m_HmMonth = 0;
		kensinData.m_strZanTitle = "これまでの残高";
	}
	kensinData.m_isFuriDemand = GasRaterCom.isFuriDemand(sysfDat, sy2fDat, kokfDat);
	if (!kensinData.m_isFuriDemand && kokfDat.mBankCode != 0 && kokfDat.mFriKin != 0 && (kokfDat.mFristat == 2 || kokfDat.mFristat == 3) && sysfDat.mIfDemand) {
		kensinData.m_strIrai = "上記請求額の内￥" +
			Other.formatDecial(kokfDat.mFriKin) +
			".-は振替依頼中です。";
	}
	else {
		kensinData.m_strIrai = "";
	}

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
	*
	* @param nCounterNo     [Int]
	* @return strCounterName
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
	* @param kensinData  [in] {@link KensinData} 検針データ
*/
function createKensinInfo(kensinData) {
	document.getElementById("KensinInfoArea").style.display = "none";
	if (mUserData.mKokfDat.mKenSumi && !mUserData.mNyukinMode && kensinData.m_isPrintKensin) {
		document.getElementById("KensinInfoArea").style.display = "block";
		createKensinInfoBase(kensinData);
	}
	const kotfDat = kensinData.mKotfDat;

	createKinInfo(kensinData);
	if (!mUserData.mNyukinMode) {
		// 内税を印字する
		if (mUserData.mSy2fDat.mSysOption[Dat.SysOption.NOT_PRINT_UTIZEI] == 0) { // 内税コメントの抑制フラグ
			createUTaxComment(kensinData);
		} else {
			document.getElementById("uTaxCommentArea").style.display = "none";
		}
		if (mUserData.mKokfDat.mKenSumi || (kotfDat != null && kotfDat.m_bKen_sumi == 1)) {
			createSeikyuComment(kensinData);
		}

		if (mUserData.mKokfDat.mKenSumi && !mUserData.mNyukinMode && kensinData.m_isPrintKensin) {
			createGasryokinSiki(kensinData);

			if (kensinData.m_bPrintHiwariComment) {
				createHiwariComment(kensinData);
			} else {
				document.getElementById("HiwariCommentArea").style.display = "none";
			}
		} else {
			document.getElementById("gasryokinSikiArea").style.display = "none";
			document.getElementById("HiwariCommentArea").style.display = "none";
		}
	}
}


/**
	 * 検針情報印刷データの生成.
	 *
	 * @param kensinData        [in] {@link KensinData}     検針印刷データ
*/
function createKensinInfoBase(kensinData) {
	var strLine = "";
	var sysfDat = mUserData.mSysfDat;
	var sy2fDat = mUserData.mSy2fDat;

	// 今回検針
	const konkaiSSVal = document.getElementById("konkaiSSVal");
	konkaiSSVal.innerHTML = Other.Format(kensinData.m_Sisin, 1);
	mKSIB.sSisin = Other.Format(kensinData.m_Sisin, 1) + "  ";

	const toritsukjJiZenkaiSSText = document.getElementById("toritsukjJiZenkaiSSText");
	mKSIB.bIsChgMeter = kensinData.m_bChgMeter;
	if (kensinData.m_bChgMeter) {
		// メーター取替有
		toritsukjJiZenkaiSSText.innerHTML = "取付指針";
		if (kensinData.m_ChgMonth != 0 && kensinData.m_ChgDay != 0) {
			strLine = " (" + Other.DateFormat(kensinData.m_ChgMonth, kensinData.m_ChgDay, true) + ")";
		}
	}
	else {
		// 前回指針
		toritsukjJiZenkaiSSText.innerHTML = "前回指針";
		if (kensinData.m_KensinPrevMonth != 0 && kensinData.m_KensinPrevDay != 0) {
			strLine = " (" + Other.DateFormat(kensinData.m_KensinPrevMonth, kensinData.m_KensinPrevDay, true) + ")";
		}
	}
	mKSIB.sToritsukjJiZenkaiSiSin = strLine;
	if (strLine.length > 0) {
		const span = document.createElement("span");
		span.className = "text-print item";
		span.id = "toritsukjJiZenkaiSSDate";
		span.innerHTML = strLine;
		toritsukjJiZenkaiSSText.appendChild(span)
	}


	strLine = Other.Format(kensinData.m_SisinPrev, 1);
	const toritsukjJiZenkaiSSVal = document.getElementById("toritsukjJiZenkaiSSVal");
	toritsukjJiZenkaiSSVal.innerHTML = strLine;
	mKSIB.sSisinPrev = strLine + "  ";

	if (kensinData.m_bChgMeter) {
		// メーター取替有は中間使用量を印字
		document.getElementById("chuukanShiyooRyooArea").style.display = "block";
		const chuukanShiyooRyooVal = document.getElementById("chuukanShiyooRyooVal");
		chuukanShiyooRyooVal.innerHTML = Other.Format(kensinData.m_ChukanSur, 1);
		mKSIB.sChukanSur = Other.Format(kensinData.m_ChukanSur, 1) + "  ";
	} else {
		document.getElementById("chuukanShiyooRyooArea").style.display = "none";
	}





	// 使用量
	const shiyooRyooVal = document.getElementById("shiyooRyooVal");
	shiyooRyooVal.innerHTML = Other.Format(kensinData.m_NowUse, 1);
	mKSIB.sNowUse = Other.Format(kensinData.m_NowUse, 1) + "m3";

	var countZenkaiSS = 0;
	// 矩形印字
	mKSIB.bIsPrnZensr = kensinData.mPrnZensr;
	if (kensinData.mPrnZensr) {
		const zenkaiShiyooRyooVal = document.getElementById("zenkaiShiyooRyooVal");
		zenkaiShiyooRyooVal.innerHTML = Other.Format(kensinData.m_PreUse, 1);
		mKSIB.sPreUse = Other.Format(kensinData.m_PreUse, 1) + "m3";
	} else {
		document.getElementById("zenkaiShiyooRyooArea").style.display = "none";
		countZenkaiSS++;
	}
	mKSIB.bIsPrintZenYearKenSr = kensinData.m_bPrintZenYearKenSr;
	if (kensinData.m_bPrintZenYearKenSr) {
		createZenYearkenSr(kensinData);
	} else {
		document.getElementById("zenYearkenSrArea").style.display = "none";
		countZenkaiSS++;
	}

	if (kensinData.m_bChgMeter) {
		document.getElementById("torihazuZenkaiSSArea").style.display = "block";
		// メーター交換有りは取外指針と前回指針を印字
		if (kensinData.m_ChgMonth != 0 && kensinData.m_ChgDay != 0) {
			strLine = "(" + Other.DateFormat(kensinData.m_ChgMonth, kensinData.m_ChgDay, true) + ")";
		}
		mKSIB.sTorihazuSiSinDate = strLine;
		const torihazuSSDate = document.getElementById("torihazuSSDate");
		torihazuSSDate.innerHTML = strLine;
		const torihazuSSVal = document.getElementById("torihazuSSVal");
		torihazuSSVal.innerHTML = Other.Format(kensinData.m_ChgSisin, 1);
		mKSIB.sTorihazuSiSin = Other.Format(kensinData.m_ChgSisin, 1);


		if (kensinData.m_KensinPrevMonth != 0 && kensinData.m_KensinPrevDay != 0) {
			strLine = " (" + Other.DateFormat(kensinData.m_KensinPrevMonth, kensinData.m_KensinPrevDay, true) + ")";
			const zenkaiSSDate = document.getElementById("zenkaiSSDate");
			zenkaiSSDate.innerHTML = strLine;
		}
		mKSIB.sZenkaiSiSinDate = strLine;

		const zenkaiSSVal = document.getElementById("zenkaiSSVal");
		zenkaiSSVal.innerHTML = Other.Format(kensinData.m_ChgZsisin, 1);
		mKSIB.sChgZsisin = Other.Format(kensinData.m_ChgZsisin, 1);
	} else {
		document.getElementById("torihazuZenkaiSSArea").style.display = "none";
		countZenkaiSS++;
	}

	if (countZenkaiSS == 3) {
		document.getElementById("zenkaiSSArea").style.display = "none";
	}


	//ガス料金
	//通常料金
	const gasuRyookinVal = document.getElementById("gasuRyookinVal");
	gasuRyookinVal.innerHTML = Other.KingakuFormat(kensinData.m_GasPay);
	mKSIB.sGasPay = Other.KingakuFormat(kensinData.m_GasPay) + "円";

	var ko2fDat = kensinData.mKo2fDat;
	var hybfDat = kensinData.mHybfDat;
	var previousIdCounter = "";
	mKSIB.bIsPrnGasBaseKin = kensinData.mPrnGasBaseKin;
	if (kensinData.mPrnGasBaseKin) {
		document.getElementById("gasBaseKinArea").style.display = "block";
		//基本料金
		const kihonRyookinVal = document.getElementById("kihonRyookinVal");
		kihonRyookinVal.innerHTML = Other.KingakuFormat(kensinData.mGasBaseKin / 1000 + kensinData.m_nFacilityKin / 1000);
		mKSIB.sKihonRyookin = Other.KingakuFormat(kensinData.mGasBaseKin / 1000 + kensinData.m_nFacilityKin / 1000) + "円";
		previousIdCounter = "kihonRyookinValArea";

		mKSIB.bIsHybrid = kensinData.m_isHybrid;
		mKSIB.nGashyb = ko2fDat.mGashyb;
		if (kensinData.m_isHybrid && ko2fDat.mGashyb > 0) {
			document.getElementById("juuryooRyookinArea").style.display = "none";
			//通常従量料金
			const tsuujooJuuryooRyookinVal = document.getElementById("tsuujooJuuryooRyookinVal");
			tsuujooJuuryooRyookinVal.innerHTML = Other.KingakuFormat(kensinData.mGasBaseKin / 1000 + kensinData.m_nFacilityKin / 1000);
			mKSIB.sRyookin = Other.KingakuFormat(kensinData.mGasBaseKin / 1000 + kensinData.m_nFacilityKin / 1000) + "円";
			previousIdCounter = "tsuujooJuuryooRyookinArea";
		} else {
			document.getElementById("tsuujooJuuryooRyookinArea").style.display = "none";
			//従量料金
			strLine = Other.KingakuFormat(kensinData.m_GasPay - kensinData.mGasBaseKin / 1000 - kensinData.m_nFacilityKin / 1000);
			mKSIB.sRyookin = strLine + "円";
			const juuryooRyookinVal = document.getElementById("juuryooRyookinVal");
			juuryooRyookinVal.innerHTML = strLine;
			previousIdCounter = "juuryooRyookinArea";
		}

		//Hieu android
		if (kensinData.m_isHybrid && ko2fDat.mGashyb > 0) {
			var str;
			var nGasTotal;
			var count = 0;
			for (var j = 0; j < ko2fDat.kHyb_MAX; j++) {
				if (hybfDat.mCusef[j] == 1 && ko2fDat.mFee[j] != 0) {

					//カウンタ名称
					str = kensinData.mCounterName[j].trim();
					nGasTotal = ko2fDat.mFee[j];
					strLine = Other.KingakuFormat(nGasTotal);
					const row = document.createElement("div");
					row.id = "counterNameDetail" + String(count);
					row.className = "row";

					const text = document.createElement("div");
					text.className = "col-6 text-print ta-l fw-b wsp-text item";
					text.innerHTML = "hieu";


					const valueArea = document.createElement("div");
					valueArea.className = "col-6";
					const value = document.createElement("div");
					value.className = "text-print ta-r fw-b wsp-text item valLine";
					value.innerHTML = "3";

					const unit = document.createElement("div");
					unit.className = "text-print ta-r fw-b wsp-text item unitLine";
					unit.innerHTML = "円";

					valueArea.appendChild(value);
					valueArea.appendChild(unit);
					row.appendChild(text);
					row.appendChild(valueArea);

					hasData = true;
					document.getElementById(previousIdCounter).after(row);
					previousIdCounter = row.id;
					count++;
				}
			}
		}
	} else {
		document.getElementById("gasBaseKinArea").style.display = "none";
	}

	var countCounterNameArea = 0;
	if (kensinData.m_isHybrid) {
		//カウンター使用料 (nType is unnecessary, let it be zero)
		printCounterUseKin(ko2fDat, hybfDat);
		mKSIB.counterUseKinDat.nUseKin = ko2fDat.mUseKin;
		mKSIB.counterUseKinDat.mUseSncode = hybfDat.mUseKin;
		mKSIB.counterUseKinDat.sKin = document.getElementById("counterUseKinVal").textContent + "円";
	} else {
		document.getElementById("counterUseKinArea").style.display = "none";
		countCounterNameArea++;
	}

	// 消費税有り
	var gasfDat = mUserData.mGasfDat;
	mKSIB.gasfDat = gasfDat;
	mKSIB.nGasTax = kensinData.m_GasTax
	if (gasfDat != null) {
		if (gasfDat.mTaxDiv == 3 && kensinData.m_GasTax != 0) {
			const gasuShoohizeiVal = document.getElementById("gasuShoohizeiVal");
			gasuShoohizeiVal.innerHTML = Other.KingakuFormat(kensinData.m_GasTax);
		} else {
			document.getElementById("gasuShoohizeiArea").style.display = "none";
			countCounterNameArea++;
		}
	} else {
		document.getElementById("gasuShoohizeiArea").style.display = "none";
		countCounterNameArea++;
	}

	mKSIB.nKnebFlg = sysfDat.mKnebFlg;
	if (sysfDat.mKnebFlg == 1) {		//Hieu android
		var hasData = false;
		// 漢の値引き有り
		for (var i = 0; mUserData.m_lstKnebDat.length; i++) {
			var knebDat = mUserData.m_lstKnebDat[i];
			if (knebDat.m_nCode > 0 &&  // 割引コード設定有
				knebDat.m_nUmu == 1 &&  // 割引フラグ有
				knebDat.m_nRes == 1 &&  // 割引実績有
				knebDat.m_nKin != 0) {  // 割引金額有
				var warifDat = mUserData.getWarifDat(knebDat.m_nCode);		//Hieu
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
			countCounterNameArea++;
		}
	} else {
		document.getElementById("hinNameArea").style.display = "none";
		countCounterNameArea++;
	}

	// 還元額有り
	mKSIB.bIfReduce = sysfDat.mIfReduce;
	mKSIB.nReduce = kensinData.m_Reduce;
	if (sysfDat.mIfReduce && kensinData.m_Reduce != 0) {
		// 差益還元額名称取得
		strLine = Other.getKangcontname(sy2fDat, mUserData);
		const kangconTnameVal = document.getElementById("kangconTnameVal");
		kangconTnameVal.innerHTML = strLine;
		mKSIB.sKangcontname = strLine

		strLine = Other.KingakuFormat(kensinData.m_Reduce);
		const reduceVal = document.getElementById("reduceVal");
		reduceVal.innerHTML = strLine;
	} else {
		document.getElementById("kangconTnameArea").style.display = "none";
		countCounterNameArea++;
	}

	mKSIB.bIsPrintGasRyokinTotal = kensinData.m_bPrintGasRyokinTotal;
	if (kensinData.m_bPrintGasRyokinTotal) {
		document.getElementById("gasuRyookinSoogakuArea").style.display = "block";
		createGasryokinTotal(kensinData);
	} else {
		document.getElementById("gasuRyookinSoogakuArea").style.display = "none";
		countCounterNameArea++;
	}

	if (countCounterNameArea == 4) {
		document.getElementById("counterNameArea").style.display = "none";
	}
}


/**
	* 前年同月使用量を印字
	*
	* @param kensinData        [in] KensinData     検針印字データ
*/
function createZenYearkenSr(kensinData) {
	if (!kensinData.m_bPrintZenYearKenSr) {
		document.getElementById("zenYearkenSrArea").style.display = "none";
		return;
	}

	const zenYearkenSrVal = document.getElementById("zenYearkenSrVal");
	zenYearkenSrVal.innerHTML = Other.Format(kensinData.m_nZenYearKenSr, 1);
	mKSIB.sZenYearKenSr = Other.Format(kensinData.m_nZenYearKenSr, 1) + "m3";
}


/**
	* 伝票にガス料金総額を印字
	*
	* @param kensinData        [in] KensinData     印刷用検針データ
*/
function createGasryokinTotal(kensinData) {
	const gasuRyookinSoogakuVal = document.getElementById("gasuRyookinSoogakuVal");
	gasuRyookinSoogakuVal.innerHTML = Other.KingakuFormat(kensinData.m_nGasTotalKin);
	mKSIB.sGasTotalKin = Other.KingakuFormat(kensinData.m_nGasTotalKin) + "円";
}


/**
	* 灯油検針情報の印字
	*
	* @param kensinData    [in] {@link KensinData} 検針データ
*/
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


/**
	* 金額関係印刷データの生成.
	*
	* @param kensinData    [in] {@link KensinData} 検針印刷データ
*/
function createKinInfo(kensinData) {
	var isPrint = false;
	var strLine;
	var sysfDat = mUserData.mSysfDat;

	mKI.bNyukinOnly = mUserData.mNyukinOnly;
	if (!mUserData.mNyukinOnly) {
		var countDisplay = 0;
		//kinInfoTop
		// 入金のみの場合は前残等印字しない
		// 前月残高
		mKI.mIfDemand = sysfDat.mIfDemand;
		mKI.nPreReceipt = kensinData.m_PreReceipt;
		if (sysfDat.mIfDemand && kensinData.m_PreReceipt != 0) {
			document.getElementById("zengetsuZandakaArea").style.display = "block";
			const preReceiptTitle = document.getElementById("preReceiptTitle");
			preReceiptTitle.innerHTML = kensinData.m_strZanTitle;
			mKI.sZanTitle = kensinData.m_strZanTitle;

			// 前月御請求額
			const preReceiptVal = document.getElementById("preReceiptVal");
			preReceiptVal.innerHTML = Other.formatDecial(kensinData.m_PreReceipt);
		} else {
			document.getElementById("zengetsuZandakaArea").style.display = "none";
			countDisplay++;
		}

		// その他売上
		var countProceed = 0;
		mKI.bIfProceeds = sysfDat.mIfProceeds;
		if (sysfDat.mIfProceeds) {
			document.getElementById("sonohokaUriageArea").style.display = "block";
			mKI.nHmDay = kensinData.m_HmDay;
			if (kensinData.m_HmDay != 0) {
				//本日お買い上げ額	
				const hmDayVal = document.getElementById("hmDayVal");
				hmDayVal.innerHTML = Other.formatDecial(kensinData.m_HmDay);
			} else {
				document.getElementById("hmDayArea").style.display = "none";
				countProceed++;
			}

			mKI.nHmMonth = kensinData.m_HmMonth;
			if (kensinData.m_HmMonth != 0) {
				//当月お買い上げ額
				const hmDayVal = document.getElementById("hmMonthVal");
				hmDayVal.innerHTML = Other.formatDecial(kensinData.m_HmMonth);
			} else {
				document.getElementById("hmMonthArea").style.display = "none";
				countProceed++;
			}

			if (countProceed == 2) {
				countDisplay++;
			}
		} else {
			document.getElementById("sonohokaUriageArea").style.display = "none";
			countDisplay++;
		}

		var t_kokfdat = mUserData.mKokfDat;
		// 当月入金額
		mKI.nTReceipt = t_kokfdat.mTReceipt;
		if (sysfDat.mIfAdjust && t_kokfdat.mTReceipt != 0) {
			//当月入金額
			const hmDayVal = document.getElementById("tReceiptVal");
			hmDayVal.innerHTML = Other.formatDecial(t_kokfdat.mTReceipt);
		} else {
			document.getElementById("toogetsuNyuuKingakuArea").style.display = "none";
			countDisplay++;
		}

		// 当月調整額
		mKI.nTAdjust = t_kokfdat.mTAdjust;
		if (sysfDat.mIfAdjust && t_kokfdat.mTAdjust != 0) {
			// document.getElementById("toogetsuChooseiGakuArea").style.display = "block";
			//当月調整額
			const tAdjustVal = document.getElementById("tAdjustVal");
			tAdjustVal.innerHTML = Other.formatDecial(t_kokfdat.mTAdjust);
		} else {
			document.getElementById("toogetsuChooseiGakuArea").style.display = "none";
			countDisplay++;
		}

		if (countDisplay == 4) {
			document.getElementById("kinInfoTop").style.display = "none";
		}

		// 今回請求額
		// 今回請求額用矩形生成
		mKI.nReceipt = kensinData.m_Receipt;
		strLine = Other.KingakuFormat(kensinData.m_Receipt);
		const konkaiSeikyuuGakuVal = document.getElementById("konkaiSeikyuuGakuVal");
		konkaiSeikyuuGakuVal.innerHTML = strLine;

		mKI.bIsFuriDemand = kensinData.isFuriDemand;
		var strSeiTitle = "今回請求";
		if (kensinData.isFuriDemand) {
			strSeiTitle += "予定";
		}
		strSeiTitle += "額";
		const konkaiSeikyuuGakuTitle = document.getElementById("konkaiSeikyuuGakuTitle");
		konkaiSeikyuuGakuTitle.innerHTML = strLine;

		//sIraimsg
		mKI.sIraimsg = Other.cutStringSpace(Other.nullToString(kensinData.m_strIrai));
		if (Other.cutStringSpace(Other.nullToString(kensinData.m_strIrai)).length > 0) {
			document.getElementById("iraiMsgText").innerHTML = Other.cutStringSpace(Other.nullToString(kensinData.m_strIrai))
		} else {
			document.getElementById("iraiMsgText").style.display = "none";
		}


		// 調整額
		mKI.nChosei = kensinData.m_Chosei;
		if (kensinData.m_Chosei != 0) {
			// 調整額有り
			isPrint = true;

			const choseiText = document.getElementById("choseiText");
			choseiText.innerHTML = getChoTitle();
			mKI.sChoseiTitle = getChoTitle();

			strLine = Other.formatDecial(kensinData.m_Chosei);
			const choseiVal = document.getElementById("choseiVal");
			choseiVal.innerHTML = strLine;
		} else {
			document.getElementById("chooseiGakuArea").style.display = "none";
		}
	} else {
		document.getElementById("kinInfoArea").style.display = "block";
	}


	// 本日入金額
	mKI.nNyukin = kensinData.m_Nyukin;
	if (kensinData.m_Nyukin != 0) {
		isPrint = true;
		mKI.nAzukarikin = kensinData.m_Azukarikin;
		if (kensinData.m_Azukarikin == kensinData.m_Nyukin) {
			strLine = "本日入金額";
		}
		else {
			strLine = "本日お預かり金額";
		}
		const honjitsuNyuuKingakuTitle = document.getElementById("honjitsuNyuuKingakuTitle");
		honjitsuNyuuKingakuTitle.innerHTML = strLine;


		strLine = Other.KingakuFormat(kensinData.m_Azukarikin) + "円";
		const honjitsuNyuuKingakuVal = document.getElementById("honjitsuNyuuKingakuVal");
		honjitsuNyuuKingakuVal.innerHTML = Other.KingakuFormat(kensinData.m_Azukarikin);
	} else {
		document.getElementById("honjitsuNyuuKingakuArea").style.display = "none";
	}

	// おつり
	var t_otsuri = kensinData.m_Azukarikin - kensinData.m_Nyukin;
	if (t_otsuri > 0) {
		const otsuriVal = document.getElementById("otsuriVal");
		otsuriVal.innerHTML = Other.KingakuFormat(t_otsuri);
	} else {
		document.getElementById("otsuriArea").style.display = "none";
	}

	// 差引残高
	mKI.nKZandaka = kensinData.m_Zandaka;
	if (kensinData.m_Zandaka != 0 && isPrint) {
		var lZandaka = kensinData.m_Zandaka - GasRaterCom.calcPrebalance(sysfDat, mUserData.mKokfDat, mUserData.mSy2fDat);
		mKI.nLZandaka = lZandaka;
		const sashihikiZandakaVal = document.getElementById("sashihikiZandakaVal");
		sashihikiZandakaVal.innerHTML = Other.KingakuFormat(lZandaka);
	} else {
		document.getElementById("sashihikiZandakaArea").style.display = "none";
		document.getElementById("sashihikiZandakaFrames").style.display = "none";
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
   * 内税コメントの生成.
   *
   * @param kensinData    [in] {@link KensinData} 検針印刷データ
*/
function createUTaxComment(wkKensinData) {
	var wkStr;
	var wkTaxDat = Calc_UchiZei(wkKensinData, wkKensinData.m_isHybrid);

	mUTC.nGUchiZei = wkTaxDat.mGUchiZei;
	mUTC.nUchiZei = wkTaxDat.mUchiZei;
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
	* @return  {TaxDat}  内税計算後消費税データ
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
				for (var j = 0; j < mUserData.mKo2fDat.kHyb_MAX; j++) {
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
	var sSnvalue = sysfDat.mSnvalue
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
	* @param sysf2     [in] Sy2fDat        システム2データ
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


/**
	* 伝票にガス料金式を印字
	*
	* @param kensinData        [in] KensinData 印刷用検針データ
*/
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
				gasBaseKinTBVal.innerHTML = Other.KingakuFormat(kensinData.mGasBaseKin / 1000) + " 円";
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
					if (document.getElementById("gasTotalKinWithoutTaxArea").style.display == "none") {
						document.getElementById("gasTotalKinWithoutTaxArea").style.display = "contents";
					}
					const gasTotalKinWithoutTaxVal = document.getElementById("gasTotalKinWithoutTaxVal");
					gasTotalKinWithoutTaxVal.innerHTML = Other.KingakuFormat(kensinData.m_nGasTotalKinWithoutTax) + " 円";
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
	* @param kensinData        [in] {@link KensinData}     検針データ
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
	var gstpDat;
	document.getElementById("singleStepArea").style.display = "none";
	document.getElementById("singleStepValArea").style.display = "none";

	if (gasfDat.mSum != 3) {
		gstpDat = lstGstpDat[nStartIdx];
	}
	else {
		gstpDat = new Dat.GstpDat();
		gstpDat.m_nUpLimit = 999999;
		gstpDat.m_nAddp = parseInt(kensinData.mGasAddKin * 10);
		gstpDat.m_nBase = parseInt(kensinData.mGasBaseKin);
		gstpDat.m_nBase = parseInt(kensinData.mGasBaseKin);
	}
	var nGasTotalKin = parseInt(kensinData.m_GasPay - kensinData.mGasBaseKin / 1000 - kensinData.m_nFacilityKin / 1000);

	const gasryokinOFirstRow = document.getElementById("gasryokinOFirstRow");
	gasryokinOFirstRow.style.display = "none";
	if (kensinData.m_isHybrid && ko2f.mGashyb != 0) {
		strStep = "通常使用分従量料金";
	} else {
		strStep = "従量料金";
	}
	const gasryokinAText = document.getElementById("gasryokinAText");
	gasryokinAText.innerHTML = strStep;

	var nAddKin = gstpDat.m_nAddp;
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

	var nGasStepKin = parseInt(nAddKin * gstpDat.m_nUpLimit * 0.00001 + 0.0001);
	if (kensinData.m_bSingleStep || nSur <= gstpDat.m_nUpLimit) {
		nGasStepKin = nGasTotalKin;
	}
	else {
		if (nAddKin == 0) {
			// 単価無し
			nGasStepKin = 0;
			if (gasfDat.mSum == 1 && nStartIdx < gasfDat.mLine) {
				// 通常料金式では、次のステップの基本料金迄の金額を計算
				nWorkKin = lstGstpDat[nStartIdx + 1].m_nBase;
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

	var previousRowId = "gasryokinASecondRow";
	printGasRyokinStep_A(1, gstpDat.m_nUpLimit, nAddKin, nGasStepKin, previousRowId);

	if (!kensinData.m_bSingleStep && nSur > gstpDat.m_nUpLimit) {
		nStartIdx++;
		var countList = 0;
		for (var i = nStartIdx; i < lstGstpDat.length; i++) {
			var prevGstpDat = gstpDat;
			gstpDat = lstGstpDat[i];

			// ステップの単価を印字(増減率を考慮)
			nAddKin = gstpDat.m_nAddp;
			if (gasfDat.mSum == 2 || nAddKin > 0) {
				nAddKin += gasfDat.mChoTanka;
			}
			nAddKin = Other.hasCom(nAddKin, gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000.);
			nAddKin += nAddKin * gasfDat.mRiseFall / 1000;

			if (nSur < gstpDat.m_nUpLimit) {
				nGasStepKin = nGasTotalKin;
			} else {
				if (nAddKin == 0) {
					// 単価無し
					nGasStepKin = 0;
					if (gasfDat.mSum == 1 && i < gasfDat.mLine) {
						// 通常料金式では、次のステップの基本料金迄の金額を計算
						nWorkKin = lstGstpDat[i + 1].m_nBase;
						nWorkKin = Other.hasCom(nWorkKin, gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000.);
						nWorkKin *= 1000 + gasfDat.mRiseFall;
						nNextBaseKin = (Other.hasCom(nWorkKin, gasfDat.mFrac2Add, gasfDat.mFrac2Mult, 10000000.) / 10000000.);
						// ステップ間の金額 = 次ステップの基本料金 - 印字した前までの金額
						nGasStepKin = nNextBaseKin - nPrnGasKin / 1000;
					}
				}
				else {
					nGasStepKin = (nAddKin * (gstpDat.m_nUpLimit - prevGstpDat.m_nUpLimit) * 0.00001 + 0.0001);
				}
				nGasTotalKin -= nGasStepKin;
			}
			nPrnGasKin += nGasStepKin * 1000;

			const previouRow = document.getElementById(previousRowId);
			const newRow = document.createElement("tr");
			newRow.id = "gasryokinAList-row" + String(countList);
			previouRow.after(newRow);
			previousRowId = "gasryokinAList-row" + String(countList);

			printGasRyokinStep_A(prevGstpDat.m_nUpLimit + 1, gstpDat.m_nUpLimit, nAddKin, nGasStepKin, newRow.id);
			countList++;

			if (nSur <= gstpDat.m_nUpLimit) {
				break;
			}
		}
	}

	printGasryokin_Hybrid(kensinData, 0, previousRowId);
}



/**
	* ガス料金式(A式)印刷データの生成.
	*
	* @param dLowLimit         [in] double                 下限値
	* @param dUpLimit          [in] double                 上限値
	* @param dAddKin           [in] double                 加算値
	* @param dTotalKin         [in] double                 ステップ金額
	* @param areaName          [in] string                 項目名
*/
function printGasRyokinStep_A(dLowLimit, dUpLimit, dAddKin, dTotalKin, areaName) {
	var area = document.getElementById(areaName);

	const td = document.createElement("td");
	td.className = "text-print ta-r wsp-text";

	const dLowLimitStepA = document.createElement("span");
	dLowLimitStepA.className = "text-print ta-r wsp-text tb-item tb-item-ts tbw-16";
	dLowLimitStepA.appendChild(document.createTextNode(Other.formatLocalJS(parseInt(dLowLimit), 1, 1)));


	const arrow = document.createElement("span");
	arrow.className = "text-print ta-r wsp-text tb-item tb-item-ts tbw-6";
	arrow.appendChild(document.createTextNode("→"));

	const dUpLimitStepA = document.createElement("span");
	dUpLimitStepA.className = "text-print ta-r wsp-text tb-item tb-item-ts tbw-21";
	dUpLimitStepA.appendChild(document.createTextNode(Other.formatLocalJS(parseInt(dUpLimit), 1, 1)));

	const tanka = document.createElement("span");
	tanka.className = "text-print ta-r wsp-text tb-item tb-item-ts tbw-27";
	tanka.appendChild(document.createTextNode("m3 単価"));

	const dAddKinStepA = document.createElement("span");
	dAddKinStepA.className = "text-print ta-r wsp-text tb-item tb-item-ts tbw-21";
	dAddKinStepA.appendChild(document.createTextNode(Other.formatLocalJS(dAddKin, 2, 4)));

	const unitRow = document.createElement("span");
	unitRow.className = "text-print ta-r wsp-text tb-item tb-item-ts tbw-8";
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
	divTotal.className = "text-print ta-r wsp-text item tb-item tb-item-ts";
	divTotal.appendChild(document.createTextNode(Other.KingakuFormat(dTotalKin) + " 円"));

	// const spanTotal = document.createElement("span");
	// spanTotal.className = "text-print ta-r wsp-text tb-item tb-item-ts";
	// spanTotal.appendChild(document.createTextNode("円"));
	// divTotal.after(spanTotal);
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
	* @param areaName         	[in] string                 項目名
	 */
function printGasRyokinStep_O(dLowLimit, dUpLimit, dAddKin, areaName) {
	var area = document.getElementById(areaName);

	const td = document.createElement("td");
	td.className = "text-print ta-r wsp-text item";

	const dLowLimitHybrid = document.createElement("span");
	dLowLimitHybrid.className = "text-print ta-r wsp-text item tb-item tb-item-ts tbw-35";
	dLowLimitHybrid.appendChild(document.createTextNode(Other.formatLocalJS(parseInt(dLowLimit), 1, 1)));

	const rangeHybrid = document.createElement("span");
	rangeHybrid.className = "text-print ta-r wsp-text item tb-item tb-item-ts tbw-20";
	rangeHybrid.appendChild(document.createTextNode("m3 ～ "));

	const dUpLimitHybrid = document.createElement("span");
	dUpLimitHybrid.className = "text-print ta-r wsp-text item tb-item tb-item-ts tbw-35";
	dUpLimitHybrid.appendChild(document.createTextNode(Other.formatLocalJS(parseInt(dUpLimit), 1, 1)));

	const unitHybrid = document.createElement("span");
	unitHybrid.className = "text-print ta-r wsp-text item tb-item tb-item-ts tbw-10";
	unitHybrid.appendChild(document.createTextNode("m3"));

	td.appendChild(dLowLimitHybrid);
	dLowLimitHybrid.after(rangeHybrid);
	rangeHybrid.after(dUpLimitHybrid);
	dUpLimitHybrid.after(unitHybrid);


	const tdRight = document.createElement("td");
	tdRight.className = "text-print item td-r";
	const divTotal = document.createElement("div");
	divTotal.className = "text-print ta-r wsp-text item tb-item tb-item-ts";
	divTotal.appendChild(document.createTextNode(Other.formatLocalJS(dAddKin, 2, 4) + " 円"));

	// const spanTotal = document.createElement("span");
	// spanTotal.className = "text-print ta-r wsp-text item tb-item tb-item-ts";
	// spanTotal.appendChild(document.createTextNode("円"));
	// divTotal.after(spanTotal);
	tdRight.appendChild(divTotal);

	area.appendChild(td);
	td.after(tdRight);
}


/**
	* ハイブリッドガス料金式の印字(秋元式)
	*
	* @param kensinData        	 [in] {@link KensinData}     印字データ
	* @param nType        		 [in] int     				 タイプ
	* @param previouRowId        [in] string     			 以前のID
*/
function printGasryokin_Hybrid(kensinData, nType, previouRowId) {
	var ko2fDat = kensinData.mKo2fDat;
	if (kensinData.m_isHybrid && ko2fDat.mGashyb > 0) {
		var hybf = kensinData.mHybfDat; //ﾊｲﾌﾞﾘｯﾄﾞﾒｰﾀｰ料金表
		var nAddKin;
		var nTotalKin;
		var nStep;
		var nGasTotal;
		var bSingleStep;
		var str;

		for (var j = 0; j < ko2fDat.kHyb_MAX; j++) {
			var area = document.getElementById(previouRowId);
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
				row.id = "counterNameRow" + String(j);
				row.appendChild(gasryokinHybridText);
				gasryokinHybridText.after(space);
				area.after(row);
				previouRowId = "counterNameRow" + String(j);




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
				var previousArea = document.getElementById(previouRowId);
				const newRow = document.createElement("tr");
				newRow.id = "gasryokinValHybrid" + String(j);
				if (nType == 0) {
					// A式
					printGasRyokinStep_A(1, hybf.mGasLimit[j][nStep], nAddKin, nTotalKin, previouRowId);
				}
				else {
					// O式
					printGasRyokinStep_O(1, hybf.mGasLimit[j][nStep], nAddKin, previouRowId);
				}
				previousArea.after(newRow);
				previouRowId = "gasryokinValHybrid" + String(j);

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
						var previousArea1 = document.getElementById(previouRowId);
						previousArea1.after(newRow);
						newRow.id = "gasryokinHybrid_ValSG" + String(nStep);

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
	} else {
		document.getElementById("counterUseKinGasryokinArea").style.display = "none";
		document.getElementById("gasTotalKinWithoutTaxArea").style.display = "none";
	}
}


/**
	* カウンタ使用料
	*
	* @param ko2fDat              [in] {@link Ko2fDat}        顧客ハイブリッドデータ
	* @param hybfDat              [in] {@link HybfDat}        ハイブリッド料金表データ
*/
function printCounterUseKin(ko2fDat, hybfDat) {
	if (ko2fDat.mUseKin > 0 && hybfDat.mUseSncode > 0) {
		//カウンタ使用料
		document.getElementById("counterUseKinGasryokinArea").style.display = "block";

		var nKin = ko2fDat.mUseKin;
		if (ko2fDat.mUseTaxku == 3) {
			nKin += ko2fDat.mUseTax;
		}
		const counterUseKinVal = document.getElementById("counterUseKinVal");
		counterUseKinVal.innerHTML = Other.KingakuFormat(nKin);
	} else {
		document.getElementById("counterUseKinGasryokinArea").style.display = "none";
	}
}


/**
	* 大口式ガス料金式印字
	*
	* @param kensinData        [in] {@link KensinData}      検針データ
*/
function printGasryokinO(kensinData) {
	var gasfDat = kensinData.m_GasfDat;
	var ko2fDat = kensinData.mKo2fDat;
	var strStep = "";

	var nStartIdx = kensinData.m_nStartIdx;
	var lstGstpDat = gasfDat.m_lstGstpDat;
	var gstpDat;
	if (gasfDat.mSum != 3) {
		gstpDat = lstGstpDat[kensinData.m_nStartIdx];
	}
	else {
		gstpDat = null;
		gstpDat.m_nUpLimit = 999999;
		gstpDat.m_nBase = parseInt(kensinData.mGasBaseKin * 10);
		gstpDat.m_nAddp = parseInt(kensinData.mGasAddKin);
	}

	const gasryokinAFirstRow = document.getElementById("gasryokinAFirstRow");
	gasryokinAFirstRow.style.display = "none";
	if (kensinData.m_isHybrid && ko2fDat.mGashyb != 0) {
		strStep += "通常使用分従量料金";
	} else {
		strStep += "従量料金";
	}
	const gasryokinOText = document.getElementById("gasryokinOText");
	gasryokinOText.innerHTML = strStep;

	strStep = "";
	var previousRowId = "";
	if (kensinData.m_bSingleStep) {
		strStep += "一律";
		document.getElementById("singleStepValArea").style.display = "none";
		previousRowId = "singleStepArea";
	}
	else {
		document.getElementById("singleStepArea").style.display = "none";
		previousRowId = "singleStepValArea";

		const dLowLimitSingleStepVal = document.getElementById("dLowLimitSingleStepVal");
		dLowLimitSingleStepVal.innerHTML = Other.formatLocalJS(1, 1, 1);


		const dUpLimitSingleStepVal = document.getElementById("dUpLimitSingleStepVal");
		dUpLimitSingleStepVal.innerHTML = Other.formatLocalJS(gstpDat.m_nUpLimit, 1, 1);
	}

	var nAddKin = gstpDat.m_nAddp;
	if (gasfDat.mSum == 2 || nAddKin > 0) {
		nAddKin += gasfDat.mChoTanka;
	}
	nAddKin = Other.hasCom(nAddKin, gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000.);
	if (gasfDat.mRiseFall != 0) {
		nAddKin += (nAddKin * gasfDat.mRiseFall / 1000);
	}

	// add new start
	var nSur = kensinData.m_NowUse;
	if (kensinData.m_isHybrid && ko2fDat.mGashyb > 0) {
		// ハイブリッドの場合は通常カウンタ使用量を設定
		nSur = kensinData.m_nNorSr;
	}

	strStep = "";
	strStep = Other.formatLocalJS(nAddKin, 2, 4);
	if (kensinData.m_bSingleStep) {
		const singleStepAreaVal = document.getElementById("singleStepAreaVal");
		singleStepAreaVal.innerHTML = strStep + " 円";
	} else {
		const addKinSingleStepVal = document.getElementById("addKinSingleStepVal");
		addKinSingleStepVal.innerHTML = strStep + " 円";
	}

	if (!kensinData.m_bSingleStep && nSur > gstpDat.m_nUpLimit) {
		nStartIdx++;
		var countList = 0;
		for (var i = nStartIdx; i < lstGstpDat.length; i++) {
			var prevGstpDat = gstpDat;
			gstpDat = lstGstpDat[i];
			nAddKin = gstpDat.m_nAddp;
			if (gasfDat.mSum == 2 || nAddKin > 0) {
				nAddKin += gasfDat.mChoTanka;
			}
			nAddKin = Other.hasCom(nAddKin, gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000.);
			if (gasfDat.mRiseFall != 0) {
				nAddKin += (nAddKin * gasfDat.mRiseFall / 1000);
			}

			const previouRow = document.getElementById(previousRowId);
			const newRow = document.createElement("tr");
			newRow.id = "gasryokinORow" + String(countList);
			previouRow.after(newRow);
			previousRowId = "gasryokinORow" + String(countList);
			printGasRyokinStep_O(prevGstpDat.m_nUpLimit + 1, gstpDat.m_nUpLimit, nAddKin, "gasryokinORow" + String(countList));
			countList++;

			if (nSur <= gstpDat.m_nUpLimit) {
				break;
			}
		}
	}

	printGasryokin_Hybrid(kensinData, 0, previousRowId);
}


/**
	* ガス料金コメントの印字
	*
	* @param gextDat              [in] GextDat        ガス料金拡張データ
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


/**
	* 伝票に日割りコメントを印字
	*
	* @param kensinData        [in] Kensindata     印刷用検針データ
*/
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
		document.getElementById("HiwariCommentArea").style.display = "none";
	} else {
		document.getElementById("HiwariCommentArea").style.display = "block";
	}
}



/**
	* 領収印印字.
	*
	* @param strInpReceipt   [in] String 領収金額
*/
function createRyoshu(strInpReceipt) {
	var wkStr;
	wkStr = Other.formatDecial(strInpReceipt) + "円";
	const ryooshuuKingakuVal = document.getElementById("ryooshuuKingakuVal");
	ryooshuuKingakuVal.innerHTML = wkStr;
}


/**
	* 伝票の自振関連データ印字部分の作成
*/
function createBank() {
	var kokfDat = mUserData.mKokfDat;
	var kouserDat = mUserData.mKouserDat;
	var sy2fDat = mUserData.mSy2fDat;
	var wkStr;
	var countNull = 0;

	// 前回引き落とし結果
	if (sy2fDat.mSysOption[Dat.SysOption.PRINT_JIFURI] != 0 && kokfDat.mTransFee != 0 && kokfDat.mTransFee < 50000) {
		document.getElementById("zenkaiHikiotoshiKekkaArea").style.display = "block";

		wkStr = Other.MonthDayFormat(kokfDat.mTransMonth, kokfDat.mTransDate);
		const transMonthDateVal = document.getElementById("transMonthDateVal");
		transMonthDateVal.innerHTML = wkStr;

		wkStr = Other.formatDecial(kokfDat.mTransFee);
		const zenkaiHikiotoshiGakuVal = document.getElementById("zenkaiHikiotoshiGakuVal");
		zenkaiHikiotoshiGakuVal.innerHTML = wkStr;
	} else {
		countNull++;
		document.getElementById("zenkaiHikiotoshiKekkaArea").style.display = "none";
	}

	// 依頼中
	if (sy2fDat.mSysOption[Dat.SysOption.PRINT_JIFURI] != 0 && (kouserDat.m_nIraiStat == 1 || kouserDat.m_nIraiStat == 2 || kouserDat.m_nIraiStat == 3)) {
		wkStr = Other.MonthDayFormat(kouserDat.m_nIraiMonth, kouserDat.m_nIraiDay);
		const iraiMonthDateVal = document.getElementById("iraiMonthDateVal");
		iraiMonthDateVal.innerHTML = wkStr;

		wkStr = Other.formatDecial(kouserDat.m_nIraiKin);
		const iraiKinVal = document.getElementById("iraiKinVal");
		iraiKinVal.innerHTML = wkStr;
	} else {
		countNull++;
		document.getElementById("iraiChuuArea").style.display = "none";
	}

	// 次回予定日
	if (sy2fDat.mJifuriNext == 1 && kouserDat.m_nNextTransYear != 0 && kouserDat.m_nNextTransMonth != 0 && kouserDat.m_nNextTransDay != 0) {
		document.getElementById("jikaiYoteiBiArea").style.display = "block";

		wkStr = Other.MonthDayFormat(kouserDat.m_nNextTransMonth, kouserDat.m_nNextTransDay);
		const nextMonthDateVal = document.getElementById("nextMonthDateVal");
		nextMonthDateVal.innerHTML = wkStr;
	} else {
		countNull++;
		document.getElementById("jikaiYoteiBiArea").style.display = "none";
	}

	if (countNull == 3) {
		document.getElementById("bankArea").style.display = "none";
	}
}


/**
	* 銀行不能コメントの印字.
*/
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


/**
	* 伝票の明細部分の作成
	*
	* @param userData    [in] {@link UserData}   共通データ
*/
function createHmInfo_(userData) {
	// 販売データ
	var hmefList = userData.getHmef0;
	var hmefList1 = userData.getHmef1;
	var hmefList2 = userData.getHmef2;
	var sysfDat = userData.mSysfDat;
	var isTanka = userData.mSy2fDat.mSysOption[Dat.SysOption.PRINT_TANKA] == 1;	//Dat.SysOption.PRINT_TANKA.getIdx() = 33
	var mIsUriage = isUriage(hmefList, hmefList1, hmefList2, sysfDat);
	//function isUriage(hmefDat0, hmefDat1, hmefDat2, sysfDat)
	if (mIsUriage) { // 販売実績がある場合のみ印刷する   
		var mapHmefDat = new Map();
		calcKeigen(mapHmefDat, hmefList);
		calcKeigen(mapHmefDat, hmefList1);
		calcKeigen(mapHmefDat, hmefList2);
		var nTax = 0;
		if (hmefList != null) {
			if (hmefList.length > 0) {
				nTax = createHmInfo(hmefList, sysfDat, mapHmefDat, isTanka);
			}
		}
		if (hmefList1 != null) { 
			if (hmefList1.length > 0) {
				nTax += createHmInfo(hmefList1, sysfDat, mapHmefDat, isTanka);
			}
		}
		if (hmefList2 != null) { 
			if (hmefList2.length > 0) {
				createHmInfo(hmefList2, sysfDat, mapHmefDat, isTanka);
			}
		}
		
		createHmInfoTax(mapHmefDat, userData.mKokfDat.mUriTax + nTax);
	} else {
		document.getElementById("hmInfoArea").style.display = "none";
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
			continue;
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
		if (!hmefDat.mUsef || hmefDat.mHmCode < mUserData.mSysfDat.mSnvalue) {
		}

		// 日付
		const row = document.createElement("tr");
		row.id = "hmInfoTableItem" + String(i);

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
			document.getElementById("infoTaxArea").style.display = "none";
			// document.getElementById("hmInfoTotal").style.display = "block";
			const nTaxVal = document.getElementById("nTaxVal");
			nTaxVal.innerHTML = Other.formatDecial(nTax);
		} else {
			document.getElementById("hmInfoTotal").style.display = "none";
			document.getElementById("infoTaxArea").style.display = "none";
		}
	}
	else {
		document.getElementById("hmInfoTotal").style.display = "none";
		// document.getElementById("infoTaxArea").style.display = "block";
		for (let hmefDat of mapHmefDat.values()) {

			const hmefTaxKeigenTotalVal = document.getElementById("hmefTaxKeigenTotalVal");
			hmefTaxKeigenTotalVal.innerHTML = getHmefTaxKeigenTotal(hmefDat);

			const hmefKinVal = document.getElementById("hmefKinVal");
			hmefKinVal.innerHTML = Other.formatDecial(hmefDat.mKin) + ")";

			const hmefTaxKeigenTaxVal = document.getElementById("hmefTaxKeigenTaxVal");
			hmefTaxKeigenTaxVal.innerHTML = getHmefTaxkeigenTax(hmefDat);

			const hmefTaXVal = document.getElementById("hmefTaXVal");
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
		document.getElementById("commentArea").style.display = "none";
		return;
	}

	const commentDetailArea = document.getElementById("commentDetailArea");
	for (var i = 0; i < commentData.length; i++) {
		if (commentData[i].length == 0) continue;
		document.getElementById("commentArea").style.display = "block";

		const comment = document.createElement("div");
		comment.className = "col-12 text-print ta-l wsp-text item commentVal";
		comment.appendChild(document.createTextNode(commentData[i]));
		commentDetailArea.appendChild(comment);
	}
}


/**
	* ハイブリッドコメントの印字.
	*
	* @param kensinData    [in] {@link KensinData} 検針印字データ
*/
function createHybComment(kensinData) {
	var str;
	var lGaskin;
	var lHybkin;

	var ko2fDat = kensinData.mKo2fDat;


	if (!kensinData.m_isHybrid || ko2fDat.mGashyb == 0) {
		document.getElementById("hybCommentArea").style.display = "none";
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


/**
	* ハイブリッド料金式の印字.
	*
	* @param kensinData    [in] {@link KensinData} 検針印字データ
*/
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
	for (var nIdx = 0; nIdx < ko2fDat.kHyb_MAX; nIdx++) {
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


/**
	* 通常ポイント印字部分の作成.
	*
	* @param kensinData    [in] {@link KensinData} 検針データ
*/
function createPoint() {
	var sy2fDat = mUserData.mSy2fDat;
	var kokfDat = mUserData.mKokfDat;

	if (sy2fDat.mPntVer > 0 && kokfDat.mPoint > 0) {
		if (sy2fDat.pntDatName == null || sy2fDat.pntDatName.length == 0) {
			// ポイント名が空の場合は印字しない
			return;
		}
		const pointPntNameVal = document.getElementById("pointPntNameVal");
		pointPntNameVal.innerHTML = Other.cutStringSpace(Other.nullToString(sy2fDat.pntDatName));

		const pointVal = document.getElementById("pointVal");
		pointVal.innerHTML = Other.formatDecial(kokfDat.mPoint);
	} else {
		document.getElementById("pointArea").style.display = "none";
	}

}


/**
	* 伝票：宮野式ポイント印字部分の作成
*/
function createMiyaPoint() {
	if (mUserData.mSy2fDat.mMiyanoFlg == 0 ||
		(mUserData.mSy2fDat.mSysOption[Dat.SysOption.PRINT_MIYANO_GET] == 0 &&
			mUserData.mSy2fDat.mSysOption[Dat.SysOption.PRINT_MIYANO_USE] == 0 &&
			mUserData.mSy2fDat.mSysOption[Dat.SysOption.PRINT_MIYANO_RUI] == 0)) {
		document.getElementById("miyaPointArea").style.display = "none";
		return;
	}
	var kouserDat = mUserData.mKouserDat;

	if (mUserData.mSy2fDat.mSysOption[Dat.SysOption.PRINT_MIYANO_GET] == 1) {
		// 獲得ポイント
		const kakutokuPointoVal = document.getElementById("kakutokuPointoVal");
		kakutokuPointoVal.innerHTML = Other.formatDecial(kouserDat.m_nMiyanoGetpnt);
	}
	if (mUserData.mSy2fDat.mSysOption[Dat.SysOption.PRINT_MIYANO_USE] == 1) {
		// 使用ポイント
		const shiyooPointoVal = document.getElementById("shiyooPointoVal");
		shiyooPointoVal.innerHTML = Other.formatDecial(kouserDat.m_nMiyanoUsepnt);
	}
	if (mUserData.mSy2fDat.mSysOption[Dat.SysOption.PRINT_MIYANO_RUI] == 1) {
		// 累計ポイント
		const genzaiPointoVal = document.getElementById("genzaiPointoVal");
		genzaiPointoVal.innerHTML = Other.formatDecial(kouserDat.m_nMiyanoZanpnt);
	}
}


/**
	* 伝票のCNポイント用コメント印字部分の作成
	*
	* @param kensinData  [in] {@link KensinData}   検針データ
*/
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
		cnpZpointVal.innerHTML = Other.formatDecial(cnpCusDat.mCnpZpoint);

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
		cnpPointVal.innerHTML = Other.formatDecial(cnpCusDat.mCnpPoint);

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
	* @param kensinData  [in] {@link KensinData}   検針データ
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


/**
	* 店舗情報の印刷データを作成する。
	*
	* @param hanfDat 	 [in] HanfDat    店舗データ
	* @param strTantname [in] string     担当者名
*/
function createUserInfo(hanfDat, strTantname) {
	var wkStr;
	var countNull = 0;

	wkStr = hanfDat.mName;
	const mNameVal = document.getElementById("mNameVal");
	mNameVal.innerHTML = Other.cutStringSpace(wkStr);

	const add1Val = document.getElementById("add1Val");
	if (Other.getClearString(hanfDat.mAdd1) != "") {
		add1Val.style.display = "block";
		add1Val.innerHTML = Other.cutStringSpace(hanfDat.mAdd1);
	} else {
		add1Val.style.display = "none";
	}

	const add2Val = document.getElementById("add2Val");
	if (Other.getClearString(hanfDat.add2Val) != "") {
		add2Val.style.display = "block";
		add2Val.innerHTML = Other.cutStringSpace(hanfDat.add2Val);
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
				strBkinfo += " / ";
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
	} else {
		document.getElementById("bkname0&Shiten0").style.display = "none";
		document.getElementById("bkKubun0&Ban0").style.display = "none";
		countNull += 2;
	}
	if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkname_1).trim()) > 0) {
		// 銀行２名称有り
		strBkinfo = Other.getClearString(hanf2Dat.mBkname_1).trim();
		if (Other.getBytesLen(Other.getClearString(hanf2Dat.mBkshiten_1).trim()) > 0) {
			// 銀行２支店名有り
			strBkinfo += " / " + Other.getClearString(hanf2Dat.mBkshiten_1).trim();
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
			if (strBkinfo.length != 0) {
				// 区分有りの場合
				strBkinfo += " / ";
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
	} else {
		document.getElementById("bkname1&Shiten1").style.display = "none";
		document.getElementById("bkKubun1&Ban1").style.display = "none";
		countNull += 2;
	}

	if (countNull == 4) {
		document.getElementById("bkInfoArea").style.display = "none";
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
	var check = Common.getMobileOperatingSystem();
	if (check == "Ios") {
		window.location.href = "printermarutou://print&&1" + "&&" + window.location.href.replace("https://", "");
	} else if (check == "Android") {
		// var hieudat = new Dat.HieuDat().setValue("Hieu","0902622737", "0001-2940","vo van kiet", "p16", "quan 8")
		// window.location.href = "https://www.example.com/path?param="+JSON.stringify(hieudat);


		window.location.href = "https://www.example.com/path?param=" + JSON.stringify(androidData);
	}
}


/**
	* ONCLICK ACTION
*/
function onclickAction() {
	if (KensinKinyuu.modePage == 1) {
		document.getElementById("backPrintButton").onclick = function () {
			if (searchMode == "1") {
				Common.setupModal("question", null, Mess.I00012, StringCS.IIE, StringCS.HAI, StringCS.ICHIRANE, false);
				document.getElementsByClassName("button-0")[0].onclick = function () {
					modal.style.display = "none";
					Common.movePage('/customer.html');
				}
				document.getElementsByClassName("button-1")[0].onclick = function () {
					modal.style.display = "none";
					Common.movePage('/customer.html');
					sessionStorage.setItem(StringCS.DIRECTIONDATA, "1");
				}

				document.getElementsByClassName("button-2")[0].onclick = function () {
					modal.style.display = "none";
					Common.movePage('/search_customer.html');
				}
			} else {
				Common.movePage('/search_customer.html');
			}
		};
		document.getElementById("sendToAppButton").onclick = function () {
			sendImage();
		};
		KensinKinyuu.saveButton.onclick = function () {
			var mReciept = 0;
			var mZandaka = 0;
			if (KensinKinyuu.displayTab[2] == true) {
				mReciept = Other.getNumFromString(document.getElementById("nyuukin").textContent);
				mZandaka = Other.getNumFromString(document.getElementById("zandaka").textContent);
				getPrintStatus(mUserData.mKokfDat, mUserData.mSysfDat, true, mReciept, mZandaka, true, mUserData.mSysfDat.m_isToyukensinFlg);
			} else {
				getPrintStatus(mUserData.mKokfDat, mUserData.mSysfDat, true, 0, 0, true, mUserData.mSysfDat.m_isToyukensinFlg);
			}
			createPrintData(printStatus, mUserData.mSysfDat.is_m_isToyukensinFlg, false);
			androidData.type = "kensin";
			androidData.printStatus = printStatus;
			androidData.isHybseikyu = mUserData.mSysfDat.is_m_isToyukensinFlg;
			androidData.isHikae = false;
			androidData.mUserData.mSysfDat = mUserData.mSysfDat;
			androidData.mUserData.mKokfDat = mUserData.mKokfDat;
			androidData.mUserData.mSy2fDat = mUserData.mSy2fDat;
			androidData.mUserData.mKouserDat = mUserData.mKouserDat;
			androidData.kensinData = kensinData;
			androidData.mUserData.mKensinDate = mUserData.mKensinDate;
			androidData.mKSIB = mKSIB;
			androidData.mKI = mKI;
			androidData.mUTC = mUTC;
			window.location.href = "https://www.example.com/path?param=" + JSON.stringify(androidData);
			// createImageKensinForm();
			// savingData();

			// sessionStorage.setItem(StringCS.SAVINGSTATUS, "1");
			// document.getElementById("editView").style.display = "none";
			// document.getElementById("printView").style.display = "block";
			// document.getElementById("nyuukinForm").style.display = "none";
			// var mReciept = 0;
			// var mZandaka = 0;
			// if (KensinKinyuu.displayTab[2] == true) {
			// 	mReciept = Other.getNumFromString(document.getElementById("nyuukin").textContent);
			// 	mZandaka = Other.getNumFromString(document.getElementById("zandaka").textContent);
			// 	getPrintStatus(mUserData.mKokfDat, mUserData.mSysfDat, true, mReciept, mZandaka, true, mUserData.mSysfDat.m_isToyukensinFlg);
			// } else {
			// 	getPrintStatus(mUserData.mKokfDat, mUserData.mSysfDat, true, 0, 0, true, mUserData.mSysfDat.m_isToyukensinFlg);
			// }
			// createPrintData(printStatus, mUserData.mSysfDat.is_m_isToyukensinFlg, false);
		};
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
	setupTextSizeDetail("hoan-item", "25px", "31px", "normal");
	setupTextSizeDetail("hoan-val", "25px", "31px", "normal");
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
	var finalData = KensinKinyuu.sendDataToServer();
	$.ajax({
		type: "POST",
		data: JSON.stringify(finalData),
		url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_WRITEDATA,
		// url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_WRITEDATA,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		timeout: ValueCS.VL_LONG_TIMEOUT,
		success: function (response) {
			console.log(response);
			sessionStorage.setItem(StringCS.SAVINGSTATUS, "1");
			document.getElementById("editView").style.display = "none";
			document.getElementById("printView").style.display = "block";
			document.getElementById("nyuukinForm").style.display = "none";
			var mReciept = 0;
			var mZandaka = 0;
			if (KensinKinyuu.displayTab[2] == true) {
				mReciept = Other.getNumFromString(document.getElementById("nyuukin").textContent);
				mZandaka = Other.getNumFromString(document.getElementById("zandaka").textContent);
				getPrintStatus(mUserData.mKokfDat, mUserData.mSysfDat, true, mReciept, mZandaka, true, mUserData.mSysfDat.m_isToyukensinFlg);
			} else {
				getPrintStatus(mUserData.mKokfDat, mUserData.mSysfDat, true, 0, 0, true, mUserData.mSysfDat.m_isToyukensinFlg);
			}
			createPrintData(printStatus, mUserData.mSysfDat.is_m_isToyukensinFlg, false);
			androidData.type = "kensin";
			androidData.printStatus = printStatus;
			androidData.isHybseikyu = mUserData.mSysfDat.is_m_isToyukensinFlg;
			androidData.isHikae = false;
			androidData.mUserData.mSysfDat = finalData.mSysfDat;
			androidData.mUserData.mKokfDat = finalData.mKokfDat;

			Common.setupModal("load", null, Mess.I00002, null, null, null, false);
			createImageKensinForm();
		},
		error: function (xmlhttprequest, textstatus, message) {
			if (textstatus === "timeout") {
				console.log("timeout")
			} else {
				console.log(textstatus)
			}
			sessionStorage.setItem(StringCS.SAVINGSTATUS, "0");
			Common.setupModal("error", null, Mess.E00004, null, StringCS.OK, null, false);
		}
	}).done(function (res) {
		console.log('res', res);
		sessionStorage.setItem(StringCS.SAVINGSTATUS, "1");
		Common.setupModal("success", null, Mess.I00003, null, StringCS.OK, null, false);
	});
}


/** 
	* ONLOAD ACTION
*/
function onLoadAction() {
	onclickAction();
	Common.setFocusSelectString();
	if (sessionStorage.getItem(StringCS.SAVINGSTATUS) == "1") {
		if (searchMode == "1") {
			Common.setupModal("question", null, Mess.I00012, StringCS.IIE, StringCS.HAI, StringCS.ICHIRANE, false);
			document.getElementsByClassName("button-0")[0].onclick = function () {
				modal.style.display = "none";
				Common.changePage('customer.html');
			}
			document.getElementsByClassName("button-1")[0].onclick = function () {
				modal.style.display = "none";
				Common.changePage('customer.html');
				sessionStorage.setItem(StringCS.DIRECTIONDATA, "1");
			}

			document.getElementsByClassName("button-2")[0].onclick = function () {
				modal.style.display = "none";
				Common.changePage('search_customer.html');
			}
		} else {
			Common.changePage('search_customer.html');
		}
	}
}


onLoadAction();


export { savingData }