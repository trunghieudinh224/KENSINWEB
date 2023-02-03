import * as Common from './Common/common_function.js'
import * as Other from './Common/other_util.js'
import * as StringCS from './Constant/strings.js'
import * as Mess from './Constant/message.js'
import * as Dat from './Dat/dat.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");
/* resultTable */
const table = document.getElementById("htsetTable");

/*****  DATA VARIABLE  *****/
/* systemdat */
var systemDat = JSON.parse(sessionStorage.getItem(StringCS.SYSTEMDAT));
/* setting data */
var dataSetting = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));
/** 印刷情報 */ 
var printStatus = new Dat.PrintStatus();
/** ユーザー情報 */ 
var mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));
mUserData.mKokfDat.mKtpcdat = new Dat.KtpcDat();
mUserData.mSysfDat.mGtpcDat = new Dat.GtpcDat();
/* kensin date */
var kensinDate = new Date(sessionStorage.getItem(StringCS.KENSINDATE));



/****  PRINT   ****/
/* image string */
var imgString = "";
/* default padding printting form */
var defaultPaddingPrintForm = window.getComputedStyle(document.getElementById("printContentDetail"), null).getPropertyValue('padding');
/* default title size of printting form */
var itemTS = window.getComputedStyle(document.getElementsByClassName("item")[0]).fontSize;
var ryooshuuTextTS = window.getComputedStyle(document.getElementsByClassName("ryooshuu-text")[0]).fontSize;
var hmInfoTableItemTS = window.getComputedStyle(document.getElementsByClassName("hmInfoTable-item")[0]).fontSize;
var titlePrintViewTS = window.getComputedStyle(document.getElementsByClassName("titlePrintView")[0]).fontSize;
/* default line height text of printting form */
var itemLH = window.getComputedStyle(document.getElementsByClassName("item")[0]).lineHeight;
var ryooshuuTextLH = window.getComputedStyle(document.getElementsByClassName("ryooshuu-text")[0]).lineHeight;
var hmInfoTableItemLH = window.getComputedStyle(document.getElementsByClassName("hmInfoTable-item")[0]).lineHeight;


/*****  FUNCTION  *****/
/**
   * SET DATA
*/
function setData() {
	var dataMessage = document.getElementById("data-messages");

	while (table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}

	if (mUserData.mHmefList != null) {
		if (mUserData.mHmefList.length > 0) {
			dataMessage.style.display = "none";
			var list = mUserData.mHmefList;
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				const newElement = document.createElement("tr");
				const col1 = document.createElement("td");
				col1.className += " text";
				const col2 = document.createElement("td");
				col2.className += " text";
				const col3 = document.createElement("td");
				col3.className += " text";
				const col4 = document.createElement("td");
				col4.className += " text";
				col4.className += " del";
				const icon = document.createElement("i");
				icon.className += "ic-del ";
				icon.className += "fas ";
				icon.className += "fa-trash";
				col1.appendChild(document.createTextNode(item.mDenm + "/" + item.mDend));
				col2.appendChild(document.createTextNode(Other.cutStringSpace(item.mHmName)));
				col3.appendChild(document.createTextNode(Other.formatDecial(item.mKin + item.mTax) + " 円"));
				col4.appendChild(icon);
				newElement.appendChild(col1);
				newElement.appendChild(col2);
				newElement.appendChild(col3);
				newElement.appendChild(col4);
				table.appendChild(newElement);
				icon.onclick = function () {
					var mess = "品目:" + Other.cutStringSpace(item.mHmName) + "を削除しますか?";
					Common.setupModal("question", StringCS.SAKUJO_KAKUNIN, mess, StringCS.IIE, StringCS.HAI, null, false);
					var buttonConfirm = document.getElementsByClassName("button-1")[0];
					buttonConfirm.onclick = function () {
						modal.style.display = "none";
						table.deleteRow(this.rowIndex);
						if (table.rows.length == 0) {
							dataMessage.innerText = Mess.E00008;
							dataMessage.style.display = "block";
						}
					}
				};
			}
		} else {
			dataMessage.innerText = Mess.E00008;
			dataMessage.style.display = "block";
		}
	} else {
		dataMessage.innerText = Mess.E00008;
		dataMessage.style.display = "block";
	}
}


/**
   * SETUP OPTION MENU
*/
function setOptionMenu() {
	document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/* 
	ONCLICK ACTION
*/
function onClickAction() {
	document.getElementById("backPageButton").onclick = function () {
		Common.backAction();
	};


	document.getElementById("printButton").onclick = function () {
		// modal.style.display = "none";
		// document.getElementById("editView").style.display = "none";
		// document.getElementById("printView").style.display = "block";
		// modal.style.display = "none";
		// document.getElementById("editView").style.display = "none";
		// document.getElementById("printView").style.display = "block";
		// preparePrintData();
		// createImageForm();
		Common.setupModal("load", null, Mess.I00004, null, StringCS.OK, null, false);
	}


	// document.getElementById("backPrintButton").onclick = function () { Common.backAction() };
}


/* 
	* PREPARING PRINTING DATA
*/
function preparePrintData() {
	var strSname_0 = Other.getClearString(Other.nullToString(mUserData.mKokfDat.mName));
	var strSname_1 = "";
	if(Other.getClearString(strSname_0) == Other.getClearString(mUserData.mKokfDat.mName)){
		strSname_0 = mUserData.mKokfDat.mSName0;
		strSname_1 = mUserData.mKokfDat.mSName1;
		var printGenuriInfo = new Dat.PrintGenuriInfo().setValue(strSname_0, strSname_1, false, 0, 0, 0, mUserData.mHmefList);
		getPrintStatus(false, 0, 0, false, false);
		createPrintData(false, printGenuriInfo, false);
	}
}


function createPrintData(isHybseikyu, printGenuriInfo, isHikae) {
	// ヘッダー
	createHeaderData(isHikae, printGenuriInfo.m_isGenuri)
	
	// 顧客情報
	createCusInfo(getCusData());

	// 売上明細
	if (mUserData.mSy2fDat.mSysOption[Dat.SysOption.PRINT_HANMEISAI] == 0) {
		createMeisaiInfo(printGenuriInfo.m_lstHmefDat);
	} else {
		
	}

	if (printGenuriInfo.m_isGenuri) {
		var lSeikyu = 0;
		printGenuriInfo.m_lstHmefDat.forEach(item => {
			if (item.mUsef && item.mHmCode > 100) {		//mUserData.mSysfDat.mSnvalue (100)	//Hieu
				lSeikyu += item.mKin + item.mTax;
			}
        });

		createRyoshu(printGenuriInfo.m_nChokin, printGenuriInfo.m_nNyukin, printGenuriInfo.m_nReceipt, lSeikyu)
	} else {
		document.getElementById("RyoSyuInfo").style.display = "none";
	}

	// コメント
	if (mUserData.mSy2fDat.mSysOption[Dat.SysOption.PRINT_COMMENT_NOUHIN] == 1) {
		createComment(getComment());
	}

	// 店舗データ
	if (mUserData.mSysfDat.mIfChitUser) {
		var tantname = dataSetting.m_lstTantName[0].name;
		createUserInfo(mUserData.mHanfDat, tantname);
	}
}


/** 
	* CREATE HEADER DATA
	* 
	* @param isHikae     [BOOLEAN]
	* @param isGenuri     [BOOLEAN]
*/
function createHeaderData(isHikae, isGenuri) {
	var strTitle = "納　品　書";
	if(isGenuri){
		strTitle += " 兼 領 収 書";
	}
	if(isHikae){
		strTitle += " (控)";
	}
	document.getElementById("titlePrintView").innerHTML = strTitle;
}


/** 
	* SET DATA CUSTOMER
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
	document.getElementById("hakkooBiKenshinBiTitle").innerHTML = "発行日　　";
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
    * 販売明細印刷データの作成.
    *
    * @param lstHmefDat    [in] {@code List<HmefDat>}  販売明細一覧
*/
function createMeisaiInfo(lstHmefDat) {
	var uriage = isUriage(lstHmefDat[0], lstHmefDat[0], [lstHmefDat[0]], mUserData.mSysfDat);
	if (uriage) {
		var isTanka = mUserData.mSy2fDat.mSysOption[Dat.SysOption.PRINT_TANKA] == 1;
		var mapHmefDat = new Map();
		calcKeigen(mapHmefDat, lstHmefDat[0]);
		createHmInfoHeader("", isTanka);
		var lKin = 0;
		var lTax = 0;
		for (var i = 0; i < lstHmefDat.length; i++) {
			var item = lstHmefDat[i];
			if (item.mUsef && item.mHmCode > 100){		//mUserData.mSysfDat.mSnvalue (100)	//Hieu
				lKin += item.mKin;
				lTax += item.mTax;
			}
		}

		createHmInfo(lstHmefDat, mUserData.mSysfDat, mapHmefDat, isTanka);
		createHmInfoTax(mapHmefDat, mUserData.mKokfDat.mUriTax);
		createHmInfoFooter(lKin);
	}
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
	var sSnvalue = 100;	//sysfDat.mSnvalue (100)	//Hieu
	for (var i = 0; i < hmefDats.length; i++) {
		var hmefDat = hmefDats[i];
		if (hmefDat.mUsef && (hmefDat.mHmCode >= sSnvalue || isIncludeNyuCho)) {	
			return true;
		}
	}
	return false;
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
*/
function addKeigenTax(sysfDat, hmefDats, mapHmefDat) {
	var nIdx = 1;
	for (var i = 0; i < hmefDats.length; i++) {
		var hmefDat = hmefDats[i];
		if (!hmefDat.mUsef || hmefDat.mHmCode <= 100) {	//sysfDat.mSnvalue (100)	//Hieu
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
		if (!wkHmefDat.mUsef || wkHmefDat.mHmCode < 100) {	//sysf.mSnvalue (100)	//Hieu
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
    * 販売明細ヘッダーの印字.
    *
    * @param strTitle          [in] String                     タイトル
    * @param isTanka           [in] boolean                    単価印字フラグ(true: 印字有り, false: 印字無し)
*/
function createHmInfoHeader(strTitle, isTanka) {
	if (strTitle.length != 0) {
		document.getElementById("hmInfoHeaderVal").innerHTML = strTitle
	}

	if (isTanka) {
		document.getElementsByClassName("hinmoku")[0].classList.remove("hmw-40");
		document.getElementsByClassName("hinmoku")[0].classList.add(" hmw-20");
		document.getElementsByClassName("hinmoku")[1].classList.remove("hmw-40");
		document.getElementsByClassName("hinmoku")[1].classList.add(" hmw-20");
	} else {
		document.getElementsByClassName("tanka")[0].style.display = "none";
		document.getElementsByClassName("hinmoku")[0].classList.remove("hmw-20");
		document.getElementsByClassName("hinmoku")[0].classList.add("hmw-40");
		document.getElementsByClassName("tanka")[1].style.display = "none";
		document.getElementsByClassName("hinmoku")[1].classList.remove("hmw-20");
		document.getElementsByClassName("hinmoku")[1].classList.add("hmw-40");
	}
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
	var strPrint;
	var previousId = "hmInfoHeaderText";
	for (var i = 0; i < lstHmefDat.length; i++) {
		const area = document.getElementById(previousId);
		var hmefDat = lstHmefDat[i];
		if (!hmefDat.mUsef || hmefDat.mHmCode < 100) {		//sysfDat.mSnvalue (100)	//Hieu
			continue;
		}

		// 日付
		const row = document.createElement("tr");
		row.id = "hmInfoTableItem" + String(i);

		strPrint = hmefDat.mDenm + "/" + hmefDat.mDend;
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
		if (isTanka && hmefDat.mTanka != 0) {
			suryo.after(tanka);
			tanka.after(kin);
		} else {
			suryo.after(kin);
		}
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
			const nTaxVal = document.getElementById("nTaxVal");
			nTaxVal.innerHTML = Other.formatDecial(nTax);
		} else {
			document.getElementById("hmInfoTotal").style.display = "none";
			document.getElementById("infoTaxArea").style.display = "none";
		}
	}
	else {
		document.getElementById("hmInfoTotal").style.display = "none";
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
    * CREATING HMINFO FOOTER
*/
function createHmInfoFooter(lKin){
	document.getElementById("honjitsuUriageKingakuVal").innerHTML = Other.formatDecial(lKin);
}


/**
    * 領収書印刷データの作成.
    *
    * @param nChokin   [in] int    調整額
    * @param nNyukin   [in] int    入金額
    * @param nRecept   [in] int    領収額
    * @param lSeikyu   [in] int    請求金額
*/
function createRyoshu(nChokin, nNyukin, nRecept, lSeikyu) {
	document.getElementById("konkaiSeikyuGakuVal").innerHTML = Other.formatDecial(lSeikyu);

	// 調整額
	if (nChokin != 0) {
		document.getElementById("choTitleText").innerHTML = getChoTitle();
		document.getElementById("choTitleVal").innerHTML = Other.formatDecial(nChokin);
	} else {
		document.getElementById("choTitleArea").style.display = "none";
	}

	// 本日入金額
	if (nNyukin != 0) {
		if (nRecept == nNyukin) {
			document.getElementById("honjitsuNyuuKingakuText").innerHTML = "本日入金額";
		} else {
			document.getElementById("honjitsuNyuuKingakuText").innerHTML = "本日お預かり金額";
		}
		document.getElementById("honjitsuNyuuKingakuVal").innerHTML = Other.formatDecial(nRecept);
	} else {
		document.getElementById("honjitsuNyuuKingakuArea").style.display = "none";
	}

	// おつり
	var lOtsuri = nRecept - (lSeikyu + nChokin);
	if (lOtsuri > 0) {
		document.getElementById("otsuriVal").innerHTML = Other.formatDecial(lOtsuri);
	} else {
		document.getElementById("otsuriArea").style.display = "none";
	}

	// 差引残高
	var lZandaka = lSeikyu + nChokin - nNyukin;
	if (lZandaka != 0) {
		document.getElementById("sashihikiZandakaVal").innerHTML = Other.formatDecial(lZandaka);
	} else {
		document.getElementById("sashihikiZandakaArea").style.display = "none";
	}

	document.getElementById("ryooshuuKingakuVal").innerHTML = Other.formatDecial(nNyukin) + "円";
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
		if (mUserData.mKouserDat != null) {
			if (Other.cutStringSpace(mUserData.mKouserDat.m_strCmt).length > 0) {
				commentData.push(Other.cutStringSpace(mUserData.mKouserDat.m_strCmt));
			}
		}

		if (commentData.length == 0) { 
			document.getElementById("commentArea").style.display = "none";
			return;
		}
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
function getPrintStatus(isPrintNyukin, lReceipt, lZandaka, isPrintKensin, isToyu) {
	printStatus.m_isPrintHoan = false;
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
	* CREATE IMAGE FILE OF SHUUKEI NIPPOU FORM
*/
function createImageForm() {
	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
	document.getElementById('editView').style.display = "none";
	document.getElementById('printView').style.display = "block";
	setupPrintForm("100vh", "670px", "55px", "31px", "38px", "31px", "38px", true, "20px");
	setupTextSizeDetail("ryooshuu-text", "50px", "58px", "bold");
	setupTextSizeDetail("hmInfoTable-item", "24px", "31px", "normal");
	domtoimage.toBlob(document.getElementById('printContentDetail'))
		.then(function (blob) {
			getBase64(blob).then(
				data => {
					console.log(data)
					imgString = data;
					window.scrollTo(0, 0);

					const interval = setInterval(function () {
						setupPrintForm("100%", "600px", titlePrintViewTS, itemTS, itemLH, itemTS, itemLH, false, defaultPaddingPrintForm);
						setupTextSizeDetail("ryooshuu-text", ryooshuuTextTS, ryooshuuTextLH, "bold");
						setupTextSizeDetail("hmInfoTable-item", hmInfoTableItemTS, hmInfoTableItemLH, "normal");

						Common.setBackgroundDialogScreen("block", "rgba(0,0,0,0.4)");
						clearInterval(interval);
						modal.style.display = "none";
					}, 100);
				}
			);
		})
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	setOptionMenu();
	onClickAction();
	setData();
}


window.onload = onLoadAction;