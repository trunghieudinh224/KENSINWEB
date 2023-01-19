import * as Common from './Common/common_function.js'
import * as GasRaterCom from './Common/gasratercom.js'
import * as Dat from './Dat/dat.js'
import * as Other from './Common/other_util.js'
import * as StringCS from './Constant/strings.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");
/* kerosene layout */
const txtCusName = document.getElementById("txtCusName");
const txtDate = document.getElementById("txtDate");
const txtNowMeter = document.getElementById("txtNowMeter");
const txtPrevMeter = document.getElementById("txtPrevMeter");
const txtNowSiyou = document.getElementById("txtNowSiyou");
const txtPrevSiyou = document.getElementById("txtPrevSiyou");
const txtTouyuRyokin = document.getElementById("txtTouyuRyokin");
const txtShohi = document.getElementById("txtShohi");
const txtInfo = document.getElementById("txtInfo");
const txtPrevSiyouText = document.getElementById("txtPrevSiyouText");
const kakuninButton = document.getElementById("kakuninButton");


/** ユーザー情報 */
var mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));
/** kensin date */
var kensin_date = new Date(mUserData.mKensinDate);
/** 灯油使用量 */
var m_nToyuuse = 0;



/** 
	SETUP OPTION MENU
*/
function setOptionMenu() {
	document.getElementById("menuOption").onclick = function () { Common.movePage('/menu.html') };
	document.getElementById("settingOption").onclick = function () { Common.movePage('/setting.html') };
	document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/** 
	GET DATA
*/
function getData() {
	txtCusName.innerHTML = Other.getClearString(mUserData.mKokfDat.mName);

	if (mUserData.mKokfDat.mKDate == 0 && mUserData.mKokfDat.mKMonth == 0) {
		txtDate.innerHTML = Other.MonthDayFormat(
			kensin_date.getMonth() + 1,
			kensin_date.getDate(),
			false
		);
	} else {
		txtDate.innerHTML = Other.MonthDayFormat(
			mUserData.mKokfDat.mKMonth,
			mUserData.mKokfDat.mKDate,
			false
		);
	}

	m_nToyuuse = mUserData.mKokfDat.mGasUse;
	var kotfDat = mUserData.mKokfDat.mKotfDat;
	if (kotfDat.m_bKen_sumi == 1) {
		txtInfo.innerHTML = "検針済みです。";
		txtNowMeter.innerHTML = Other.Format(kotfDat.m_nNow_meter, 1);
		txtPrevMeter.innerHTML = Other.Format(kotfDat.m_nPre_meter, 1);
		txtShohi.innerHTML = Other.formatDecial(kotfDat.m_nCon_tax);
		txtNowSiyou.innerHTML = Other.Format(kotfDat.m_nLoil_use, 1);

		var strPreuseItemname;
		var strPreuseItemvalue;

		if (kotfDat.m_nBetw_meter > 0) {
			strPreuseItemname = "前回/中間";
			strPreuseItemvalue = Other.Format(kotfDat.m_nPre_use, 1) +
				" / " + Other.Format(kotfDat.m_nBetw_meter, 1);
		} else {
			strPreuseItemname = "前回使用量";
			strPreuseItemvalue = Other.Format(kotfDat.m_nPre_use, 1);
		}
		txtPrevSiyouText.innerHTML = strPreuseItemname;
		txtPrevSiyou.innerHTML = strPreuseItemvalue;
		txtTouyuRyokin.innerHTML = Other.formatDecial(kotfDat.m_nFee);
		kakuninButton.disabled = false;
	} else {
		txtNowMeter.innerHTML = "";
		txtPrevMeter.innerHTML = Other.Format(kotfDat.m_nPre_meter, 1);
		txtNowSiyou.innerHTML = "";

		if (kotfDat.m_nBetw_meter > 0) {
			txtPrevSiyouText.innerHTML = "前回/中間";
			var wkStrPreUse = Other.Format(kotfDat.m_nPre_meter, 1) +
				" / " + Other.Format(kotfDat.m_nBetw_meter, 1);
			txtPrevSiyou.innerHTML = wkStrPreUse;
		} else {
			strPreuseItemname = "前回使用量";
			txtPrevSiyou.innerHTML = Other.Format(kotfDat.m_nPre_meter, 1);
		}

		txtTouyuRyokin.innerHTML = "";
		txtShohi.innerHTML = "";
		txtInfo.innerHTML = "今回指針を入力してください。";
		kakuninButton.disabled = true;
	}
}


/**
	* 入力された今回指針から使用量、ガス料金を表示する。
*/
function setToyuInfo() {
	// 灯油使用量計算
	var strNowmeter = txtNowMeter.value;
	if (strNowmeter == "") {
		// 空欄なのでなにもしない。
		txtInfo.innerHTML = "今回指針を入力してください。";
		txtInfo.style.color = "black";
		txtNowSiyou.innerHTML = "";
		txtTouyuRyokin.innerHTML = "";
		txtShohi.innerHTML = (mUserData.mKokfDat.mTaxDiv == 3 ? "" : "***");
		return;
	}
	var kokfDat = mUserData.mKokfDat;
	var kouserDat = mUserData.mKouserDat;

	var kotfDat = kokfDat.mKotfDat;
	var nNowMeter = parseInt(parseFloat(strNowmeter) * 10);
	m_nToyuuse = kotfDat.m_nBetw_meter;
	if (kotfDat.m_nPre_meter <= nNowMeter) {
		m_nToyuuse += nNowMeter - kotfDat.m_nPre_meter;
	} else {
		m_nToyuuse += Math.pow(10, kotfDat.m_bMt_keta + 1) + nNowMeter - kotfDat.m_nPre_meter;
		txtInfo.innerHTML = "メーター周り";
		txtInfo.style.color = "blue";
	}
	txtNowSiyou.innerHTML = Other.formatLocalJS(m_nToyuuse, 1, 1);

	if (kouserDat.m_nKoubetsu == 1) {
		txtInfo.innerHTML = "ガス料金を入力してください。";
	}

	setToyuFee(m_nToyuuse, kokfDat);
}


/**
	  * ガス料金を出力する
	  * 
	  * @param nSiyou    [in] int                今回使用料
	  * @param kokfDat   [in] {@link KokfDat}    顧客データ
*/
function setToyuFee(nSiyou, kokfDat) {
	var lToyuFee;
	var nToyuTax;
	var kotfDat = kokfDat.mKotfDat;
	try {
		// 灯油料金の計算
		lToyuFee = nSiyou * kokfDat.mLoilUnit + kotfDat.m_nLoil_base;
		if (lToyuFee != 0) {
			lToyuFee = Other.Double2Long(Other.hasCom(lToyuFee, kokfDat.mLoilAdd, kokfDat.mLoilMulti, 1000.) / 1000.);
			if (lToyuFee == 0) {
				if ((nSiyou * kokfDat.mLoilUnit + kotfDat.m_nLoil_base * 10.) < 0) {
					lToyuFee = -1;
				}
			}
		}
		txtTouyuRyokin.value = Other.formatDecial(lToyuFee);
		// 灯油消費税の計算
		if (kotfDat.m_bLoil_taxku == 3) {
			var dToyuTax = lToyuFee * kotfDat.m_sLoil_taxr;
			var sysfDat = mUserData.mSysfDat;
			var nFracAdd = parseInt(sysfDat.mFracAddTax);
			var nFracMul = parseInt(sysfDat.mFracMulTax);
			if (kotfDat.m_nLoil_fracadd_tax != 0 || kotfDat.m_nLoil_fracmul_tax != 0) {
				nFracAdd = kotfDat.m_nLoil_fracadd_tax;
				nFracMul = kotfDat.m_nLoil_fracmul_tax;
			}
			nToyuTax = parseInt(Other.Double2Long(Other.hasCom(dToyuTax, nFracAdd, nFracMul, 1000.) / 1000.));
			txtShohi.innerHTML = Other.formatDecial(nToyuTax);
		}
		else {
			txtShohi.innerHTML = "***";
		}
		kakuninButton.disabled = false;
	}
	catch (ex) {
		console.log(ex);
	}
}


/**
	KEY PRESS ACTION
*/
function keyPressAction(value, length, event) {
	if (value.replaceAll(",", "").includes(".")) {
		if (value.indexOf(".") > length) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		}

		if (value.length - value.indexOf(".") > 2) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		}
	} else {
		if (value.replaceAll(",", "").length > length) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		}
	}
}


/**
	ONCHANGE ACTION
*/
function onChangeAction() {
	var kotfDat = mUserData.mKokfDat.mKotfDat;
	txtNowMeter.addEventListener('keypress', event => {
		var value = `${event.target.value}${event.key}`;
		if (!`${Other.getNumFromString(event.target.value)}${event.key}`.match(/^[0-9]*\.?[0-9]*$/)) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		} else {
			keyPressAction(value, kotfDat.m_bMt_keta, event);
		}
	});

	txtNowMeter.onchange = function () {
		var strSisin = txtNowMeter.value;

		if (strSisin.length > 0) {
			txtNowMeter.value = Other.Format(
				parseFloat(txtNowMeter.value) * 10,
				1
			);
			setToyuInfo();
		} 

		if (txtTouyuRyokin.value != "" && txtNowMeter.value != "") {
			kakuninButton.disabled = false;
		} else {
			txtNowSiyou.innerHTML = "";
			txtTouyuRyokin.value = "";
			txtShohi.innerHTML = "";
			txtInfo.innerHTML = "今回指針を入力してください。";
			txtInfo.style.color = "black";
			kakuninButton.disabled = true;
		}
	};


	txtTouyuRyokin.addEventListener('keypress', event => {
		var value = `${event.target.value}${event.key}`;
		if (!`${Other.getNumFromString(event.target.value)}${event.key}`.match(/^[0-9]*\.?[0-9]*$/)) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		} else {
			keyPressAction(value, 8, event);
		}
	});

	txtTouyuRyokin.onchange = function () {
		var strSisin = txtTouyuRyokin.value;

		if (strSisin.length > 0) {
			txtTouyuRyokin.value = Other.formatDecial(strSisin);

			var lToyuFee = parseInt(Other.getClearString(Other.getNumFromString(txtTouyuRyokin.value)));
			var lToyuTax = GasRaterCom.calcConTax(lToyuFee, mUserData.mKokfDat, mUserData.mGasfDat, mUserData.mSysfDat);
			// 消費税設定
			if (mUserData.mGasfDat.mTaxDiv == 3) {
				// 外税の場合のみ税額表示
				txtShohi.innerHTML = Other.formatDecial(lToyuTax);
			}
			else {
				txtShohi.innerHTML = "***";
			}
			txtInfo.innerHTML = "";
		}

		if (txtTouyuRyokin.value != "" && txtNowMeter.value != "") {
			kakuninButton.disabled = false;
		} else {
			txtNowMeter.value = "";
			txtNowSiyou.innerHTML = "";
			txtShohi.innerHTML = "";
			txtInfo.innerHTML = "今回指針を入力してください。";
			txtInfo.style.color = "black";
			kakuninButton.disabled = true;
		}
	};
}


/**
	* 検針指針の結果を登録して次のアクティビティを呼び出す。
*/
function save() {
	try {
		if (txtNowMeter.value == "") {
			txtInfo.innerHTML = "今回指針を入力してください。";
			return;
		}
		if (txtTouyuRyokin.value == "") {
			txtInfo.innerHTML = "ガス料金を入力してください。";
			return;
		}
		const kokfDat = mUserData.mKokfDat;
		var kotfDat = kokfDat.mKotfDat;
		kotfDat.m_bKen_sumi = 1;

		kokfDat.mKMonth = new Date(mUserData.mKensinDate).getMonth() + 1;
		kokfDat.mKDate = new Date(mUserData.mKensinDate).getDate();

		kotfDat.m_nNow_meter = parseInt(parseFloat(Other.CvtString2Num(txtNowMeter.value)) * 10);
		kotfDat.m_nLoil_use = m_nToyuuse;
		kotfDat.m_nFee = parseInt(Other.getNumFromString(txtTouyuRyokin.value));
		if (kotfDat.m_bLoil_taxku == 3) {
			kotfDat.m_nCon_tax = parseInt(Other.getNumFromString(txtShohi.textContent)); 
		} else {
			kotfDat.m_nCon_tax = 0;
		}

		// setKensinData();
		

		// 印刷する、しないを確認する
		if(kokfDat.mKenSumi){
			// ガス検針有り
			Common.setupModal("load", null, "検針伝票を印刷しますか", "いいえ", "ガス灯油", "灯油のみ", false);
			var lZandaka;
			if(kokfDat.mSyuSumi){
				lZandaka = GasRaterCom.calcTotal(mUserData, mUserData.mSysfDat, kokfDat, mUserData.mKo2fDat, mUserData.mSy2fDat, mUserData.mKouserDat, null) //lstLeasHmefDat  Hieu
							+ kokfDat.mAdjust - kokfDat.mReceipt;
			}
			else {
				lZandaka = 0;
			}

			// いいえ
			document.getElementsByClassName("button-0")[0].onclick = function () {
				modal.style.display = "none";
			}
			
			// ガス灯油
			document.getElementsByClassName("button-1")[0].onclick = function () {
				var printStatus = getPrintStatus(kokfDat, mUserData.mSysfDat, true, kokfDat.mReceipt, lZandaka, true, true);
				createPrintForm(printStatus, kokfDat.mHybseikyu != 2);
			}

			// 灯油のみ
			document.getElementsByClassName("button-2")[0].onclick = function () {
				var printStatus = getPrintStatus(kokfDat, mUserData.mSysfDat, true, kokfDat.mReceipt, lZandaka, false, true);
				createPrintForm(printStatus, kokfDat.mHybseikyu != 2);
			}
		}
		else {
			Common.setupModal("load", null, "検針伝票を印刷しますか。", StringCS.IIE, StringCS.HAI, null, false);
			
			// いいえ
			document.getElementsByClassName("button-0")[0].onclick = function () {
				modal.style.display = "none";
			}

			// はい
			document.getElementsByClassName("button-1")[1].onclick = function () {
				var printStatus = getPrintStatus(kokfDat, mUserData.mSysfDat, false, 0, 0, false, true);
				createPrintForm(printStatus, kokfDat.mHybseikyu != 2);
			}
		}

	} catch (ex) {
		console.log(ex);
		console.log("灯油検針データの登録時にエラーが発生.");
	}
}


function createPrintForm(printStatus, isHybseikyu) {
	
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
	// var overlay = document.querySelector(".overlay");
	// var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
	// document.getElementById("btnKensinNyukinUchiwake").onclick = setdataUchiWake;
	// document.getElementById("close-icon").onclick = function () {
	//     overlay.style.zIndex = "-1";
	//     wrapMainForm.classList.remove("overlay-animate");
	// };

	// document.getElementById("detail-btn").onclick = function () {
	//     overlay.style.zIndex = "2";
	//     wrapMainForm.classList.remove("overlay-animate");
	// };

	kakuninButton.onclick = function () {
		save();
	}
}


/** 
	* GET PRINT STATUS
*/
function getPrintStatus(kokfDat, sysfDat, isPrintNyukin, lReceipt, lZandaka, isPrintKensin, isToyu) {
	var printStatus = new Dat.PrintStatus();
	var isPrintHoan = sysfDat.mCheckHoan && (kokfDat.mGasKubun != 2 || kokfDat.mTenkenKgas == 1);
	printStatus.m_isPrintHoan = isPrintHoan;
	printStatus.m_isPrintNyukin = isPrintNyukin;
	printStatus.m_lReceipt = lReceipt;
	printStatus.m_lZandaka = lZandaka;
	printStatus.m_isPrintKensin = isPrintKensin;
	printStatus.m_isPrintToyu = isToyu;
	return printStatus;
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	setOptionMenu();
	getData();
	onChangeAction();
	onclickAction();
}


onLoadAction();