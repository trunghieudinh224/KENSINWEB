import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as Dat from './Dat/dat.js'
import * as Other from './Common/other_util.js'
import * as GasRaterCom from './Common/gasratercom.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'

/*****  VIEW VARIABLE  *****/
/* modal */
const modal = document.getElementById("myModal");
/* layout */
const uriage_name = document.getElementById("kokyaku-mei");
const uriage_kcode = document.getElementById("kokyaku_kodo");
const uriage_hmname = document.getElementById("hinmoku");
const uriage_hbname = document.getElementById("hinban");
const uriage_sur = document.getElementById("sur");
const uriage_unit = document.getElementById("uriage_unit");
const uriage_tanka = document.getElementById("tank");
const uriage_kin = document.getElementById("kin");
const uriage_taxku = document.getElementById("uriage_tax_select");
const uriage_taxr = document.getElementById("uriage_tax_val");
const uriage_tax = document.getElementById("taxkin");
const uriage_total = document.getElementById("total");
const uriage_cho = document.getElementById("cho_val");
const uriage_cho_name = document.getElementById("cho_text");
const uriage_recept = document.getElementById("azukari");
const uriage_nyu_name = document.getElementById("receipt_text");
const uriage_nyu = document.getElementById("receipt_val");
const uriage_gen_name = document.getElementById("uriage_gen_name");
const uriage_gen = document.getElementById("zandaka");
const select_shohin_list_urimode = document.getElementById("modeForm");
const cash_sale = document.getElementById("genkin_uri_area");
const group_prezandaka = document.getElementById("group_prezandaka");
const preZandaka = document.getElementById("preZandaka");
const uriage_edit = document.getElementById("editButton");
const uriage_back = document.getElementById("layout_back");
const uriage_submit = document.getElementById("kakuninButton");
const titleDialog = document.getElementById("titleDialog");

/* setting data */
var dataSetting = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));
/** keyboard property */
var keyboardProp = new Dat.KeyboardProp();
/** ユーザー情報 */
var mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));
/* kensin date */
var kensinDate = new Date(sessionStorage.getItem(StringCS.KENSINDATE));
// 顧客料金透明化データクラス
mUserData.mKokfDat.mKtpcdat = new Dat.KtpcDat();
// ガス料金透明化データクラス
mUserData.mSysfDat.mGtpcDat = new Dat.GtpcDat();

// value of teisei Nyuukin prev
var teiseiNyuukinPre = "0";

/** 商品マスタデータ */
var mShofDat = JSON.parse(sessionStorage.getItem(StringCS.SHOFDATITEM));
/** 品目データ */
var mBusfDat = JSON.parse(sessionStorage.getItem(StringCS.BUSFDATITEM));
/** 販売明細データ */
var mHmefDat = null;
/** 拡張販売明細データ */
var mHme2Dat = null;
/** 調整額 */
var m_nCho;
/** 入金額 */
var m_nNyu;
/** 預り金 */
var m_nReceipt;
/** 現金売りフラグ */
var m_isGenuri = false;
/** 調整取引区分 */
var m_bdCho;
/** 入金取引区分 */
var m_bdNyu;
var printGenuriInfo = new Dat.PrintGenuriInfo();
var lstBusfCho = JSON.parse(sessionStorage.getItem(StringCS.LISTBUSTCHO));
var lstBusfNyu = JSON.parse(sessionStorage.getItem(StringCS.LISTBUSTNYU));

var CHOMODE = 1;
var NYUMODE = 2;

/*****  ANDROID DATA  *****/
var androidData = new Dat.AndroidData();
var lstComment = ["", ""];


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
var konkaiSeikyuuGakuTS = window.getComputedStyle(document.getElementsByClassName("konkaiSeikyuuGaku-text")[0]).fontSize;
var kkValTS = window.getComputedStyle(document.getElementsByClassName("kk-val")[0]).fontSize;
/* default line height text of printting form */
var itemLH = window.getComputedStyle(document.getElementsByClassName("item")[0]).lineHeight;
var ryooshuuTextLH = window.getComputedStyle(document.getElementsByClassName("ryooshuu-text")[0]).lineHeight;
var hmInfoTableItemLH = window.getComputedStyle(document.getElementsByClassName("hmInfoTable-item")[0]).lineHeight;
var konkaiSeikyuuGakuLH = window.getComputedStyle(document.getElementsByClassName("konkaiSeikyuuGaku-text")[0]).lineHeight;
var kkValLH = window.getComputedStyle(document.getElementsByClassName("kk-val")[0]).lineHeight;


/**
	* 符号の設定.
	*
	* @param nSign [in] int    符号
	* @param nKin  [in] int    金額
	* @return  int 符号設定後の金額
*/
function calcSign(nSign, nKin) {
	if (nSign == 1) {
		return nKin * -1;
	}
	return nKin;
}


/**
	* 金額計算処理.
*/
function calcKin() {
	if (mHmefDat.mTanka != 0 && mHmefDat.mSuryo != 0) {
		// 単価、数量の両方が入力済みの場合処理.
		var dKin = mHmefDat.mTanka * mHmefDat.mSuryo;
		var nAdd = mUserData.mSysfDat.mFracAddKin;
		var nMul = mUserData.mSysfDat.mFracMulKin;
		if (mHmefDat.mHmCode == mUserData.mSysfDat.mHinCd9 && mHmefDat.mHbCode == 0) {
			// 灯油・・・端数処理は顧客var mUserData.mKokfDatDat = mUserData.getKokfDat();
			nAdd = mUserData.mKokfDat.mLoilAdd;
			nMul = mUserData.mKokfDat.mLoilMulti;
		}
		mHmefDat.mKin = Other.hasCom(dKin, nAdd, nMul, 10000) / 10000;

		uriage_kin.textContent = Other.formatDecimal(calcSign(mHmefDat.mSign, mHmefDat.mKin));
		if (uriage_kin.classList.contains("disabled-inp") == false) {
			uriage_kin.classList.add("disabled-inp");
		}
		calcTax();
	} else {
		if (uriage_kin.classList.contains("disabled-inp")) {
			uriage_kin.classList.remove("disabled-inp");
		}
	}

}


/**
	* 消費税金額の計算処理.
*/
function calcTax() {
	mHmefDat.mTax = 0;
	if (mHmefDat.mTaxKu == 3) {
		// 販売明細の消費税額は外税のみ計算して設定
		var dTax = mHmefDat.mKin * mHmefDat.mTaxR;
		var nFracAddTax = mShofDat.mFracAddTax;
		var nFracMulTax = mShofDat.mFracAddMult;
		if (nFracAddTax == 0 && nFracMulTax == 0) {
			var sysfDat = mUserData.mSysfDat;
			nFracAddTax = sysfDat.mFracAddTax;
			nFracMulTax = sysfDat.mFracMulTax;
		}
		mHmefDat.mTax = (Other.hasCom(dTax, nFracAddTax, nFracMulTax, 1000.) / 1000.);
	}

	uriage_tax.textContent = Other.formatDecimal(calcSign(mHmefDat.mSign, mHmefDat.mTax));
	dispTotal();
}


/**
	* 請求金額の設定.
*/
function dispTotal() {
	uriage_total.textContent = Other.formatDecimal(calcSign(mHmefDat.mSign, mHmefDat.mKin + mHmefDat.mTax));
	dispGen();
}


/**
	* 現在高の設定.
*/
function dispGen() {
	var nGen = calcSign(mHmefDat.mSign, mHmefDat.mKin + mHmefDat.mTax);
	var strGenName = "差引残高";
	if (m_isGenuri) {
		// m_nCho = Other.getNumFromString(uriage_cho.value);
		m_nNyu = Number(Other.getNumFromString(uriage_nyu.textContent));

		nGen += m_nCho - m_nNyu;
		if (nGen == 0 && m_nReceipt > m_nNyu) {
			// 売上金額 + 調整額 - 入金額 == 0で
			// 預り金が入金額より多い場合
			// おつり有り
			strGenName = "おつり";
			nGen = m_nReceipt - m_nNyu;
		}
		group_prezandaka.style.display = "none";
	}
	else {
		nGen += GasRaterCom.calcTotal(mUserData, mUserData.mSysfDat, mUserData.mKokfDat, mUserData.mKo2fDat, mUserData.mSy2fDat, mUserData.mKouserDat, false);
		group_prezandaka.style.display = "block";
		preZandaka.textContent = Other.formatDecimal(GasRaterCom.calcTotal(mUserData, mUserData.mSysfDat, mUserData.mKokfDat, mUserData.mKo2fDat, mUserData.mSy2fDat, mUserData.mKouserDat, false));
	}
	uriage_gen_name.textContent = strGenName;
	uriage_gen.textContent = Other.formatDecimal(nGen);
}


/**
	* create hmefDat data from sessionstorage
*/
function createData() {

	if (mHmefDat == null) {
		// 販売明細データがない場合は新規記入
		// 必要なデータを予め設定
		mHmefDat = new Dat.HmefDat();
		mHmefDat.mUsef = true;
		mHmefDat.mCusRec = mUserData.mKokfDat.mCusRec;
		mHmefDat.mHmeKind = 9;
		mHmefDat.mTanka = mShofDat.mTanka;
		if (mUserData.mSysfDat.mHinCd9 == mBusfDat.mHinno && mShofDat.mShono == 0) {
			// 灯油は顧客の灯油単価
			mHmefDat.mTanka = mUserData.mKokfDat.mLoilUnit;
		}
		mHmefDat.mLeasKind = 0;
		mHmefDat.mDenKind = mBusfDat.mKind;
		mHmefDat.mSign = mBusfDat.mSign;
		mHmefDat.mSuryo = 0;
		mHmefDat.mHmCode = mBusfDat.mHinno;
		mHmefDat.mHmName = mBusfDat.mName;
		mHmefDat.mHbCode = mShofDat.mShono;
		mHmefDat.mHbName = mShofDat.mHinban;
		mHmefDat.mTax = 0;
		mHmefDat.mTaxKu = mShofDat.mTaxKu;
		mHmefDat.mTaxR = mShofDat.mTaxR;
		mHmefDat.mHbnmPrn = 0;
		mHmefDat.mKin = 0;
		mHmefDat.mPreHrec = mUserData.mKokfDat.mHmew0Erec; // 前明細レコードNo <-
		// 販売明細(ﾊﾝﾃﾞｨ)・終了レコード位置
		mHmefDat.mNxtHrec = 0; // 次明細レコードNo
		var dtKenymd = kensinDate;
		mHmefDat.mDeny = dtKenymd.getFullYear(); // 伝票日付(年)
		mHmefDat.mDenm = dtKenymd.getMonth() + 1; // (月)
		mHmefDat.mDend = dtKenymd.getDate();    // (日)
	}

	if (mHme2Dat == null) {
		mHme2Dat = new Dat.Hme2Dat();
		mHme2Dat.mBikou = "";
	}

}

/**
	* set data for layout
*/
function onCreateView() {
	m_nCho = 0;
	m_nNyu = 0;
	m_nReceipt = 0;
	uriage_cho.value = 0;
	uriage_recept.textcontent = 0;
	uriage_nyu.textContent = 0;

	// 顧客コード
	uriage_kcode.textContent = mUserData.mKokfDat.mCusCode;
	// 顧客名
	uriage_name.value = mUserData.mKokfDat.mName;
	mHme2Dat.mBikou = mUserData.mKokfDat.mName;
	// 品目名
	var strHmname = mBusfDat.mName;
	if (mShofDat.mHinno == mUserData.mSysfDat.mHinCd9 && mShofDat.mShono == 0) {
		// 固定品目灯油
		strHmname += "　　　T";
	}
	uriage_hmname.textContent = Other.nullToString(strHmname);
	// 品番名
	uriage_hbname.textContent = Other.nullToString(mShofDat.mHinban).trim();

	// 数量
	uriage_sur.textContent = Other.formatLocalJS(mHmefDat.mSuryo, 2, 3);

	// 単位
	uriage_unit.textContent = Other.nullToString(mShofDat.mUnit);
	// 単価
	uriage_tanka.textContent = Other.formatLocalJS(mHmefDat.mTanka, 2, 3);
	// 金額

	uriage_kin.textContent = Other.formatDecimal(mHmefDat.mKin);
	// 税区分
	uriage_taxku.value = mHmefDat.mTaxKu;

	// 税率
	uriage_taxr.textContent = Other.formatLocalJS(mHmefDat.mTaxR, 1, 1);

	// 消費税
	uriage_tax.textContent = Other.formatDecimal(mHmefDat.mTax);


	// 合計
	dispTotal();

	// 現在高
	dispGen();


	// 調整取引区分デフォルト取得・設定
	// m_bdCho = InputDat.getBusfDat(getContext(), sChoHmcode, (byte)(sChoHmcode < mUserData.mSysfDat.mSnvalue ? 0 : 1));
	m_bdCho = JSON.parse(sessionStorage.getItem(StringCS.BUSFCHOITEM));
	if (m_bdCho != null) {
		uriage_cho_name.textContent = (Other.cutStringSpace(m_bdCho.mName));
	}
	// 入金取引区分デフォルト取得・設定
	// var sNyuHmcode = mUserData.mSy2fDat.mSysfHmcd12;
	m_bdNyu = JSON.parse(sessionStorage.getItem(StringCS.BUSFNYUITEM));
	if (m_bdNyu != null) {
		uriage_nyu_name.textContent = (Other.cutStringSpace(m_bdNyu.mName));
	}

	cash_sale.style.display = "none";
	changeLayoutButton();
}

/* 
	SETUP OPTION MENU
*/
function setOptionMenu() {
	document.getElementById("menuOption").onclick = function () { Common.movePage('/menu.html') };
	document.getElementById("settingOption").onclick = function () { Common.movePage('/setting.html') };
	document.getElementById("logoutOption").onclick = function () { Common.movePage('logout') };
}


/* 
	TITLE ONCLICK
*/
function titleOnclick(title, idForm, listItem) {
	var tableForm = document.getElementsByClassName("dialog_form");
	for (var i = 0; i < tableForm.length; i++) {
		tableForm[i].style.display = "none";
	}
	var form = document.getElementById(idForm);
	form.style.display = "block"

	var tittle = document.getElementById(title);
	var overlay = document.querySelector(".overlay");
	var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
	document.getElementById("close-icon").onclick = closeDialog;
	tittle.onclick = function () {
		overlay.style.zIndex = "2";
		wrapMainForm.classList.remove("overlay-animate");
		if (title == "cho_text") {
			titleDialog.textContent = "調整取引区分選択"
			generateTable(listItem, tittle, CHOMODE);
		} else {
			titleDialog.textContent = "入金取引区分選択"
			generateTable(listItem, tittle, NYUMODE);
		}

	};
}

/* 
	CLOSING DIALOG
*/
function closeDialog() {
	var overlay = document.querySelector(".overlay");
	var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
	overlay.style.zIndex = "-1";
	wrapMainForm.classList.remove("overlay-animate");
}


/* 
	* SETUP TITLE CLICK
*/
function setupTitleClick() {
	titleOnclick("receipt_text", "receipt_form", lstBusfNyu);
	titleOnclick("cho_text", "receipt_form", lstBusfCho);
}

/**
	* set data of nyu and cho to create table view
*/
function generateTable(listItem, tittle, pos) {
	// creates a <table> element and a <tbody> element

	const receipt_table = document.getElementById("receipt_table");
	$('#receipt_table > tr > td').remove();

	// creating all cells
	for (let i = 0; i < listItem.length; i++) {
		// creates a table row
		const row = document.createElement("tr");
		const cell = document.createElement("td");
		var span = document.createElement("span");
		span.id = "span_" + i;
		span.classList.add("h-40");
		span.classList.add("text");
		span.textContent = Other.cutStringSpace(listItem[i].mName);
		row.onclick = function () {
			tittle.textContent = Other.cutStringSpace(listItem[i].mName);
			closeDialog();
			if (pos == CHOMODE) {
				m_bdCho = lstBusfCho[i];
			} else {
				m_bdNyu = lstBusfNyu[i];
			}
		}
		cell.appendChild(span);
		row.appendChild(cell);


		// add the row to the end of the table body
		receipt_table.appendChild(row);
	}
}


/**
	* onChange Data
*/
function onChangeData() {
	select_shohin_list_urimode.onchange = function () {
		m_isGenuri = !m_isGenuri;
		if (m_isGenuri) {
			cash_sale.style.display = "block";
			changeLayoutButton();
		} else {
			cash_sale.style.display = "none";
			changeLayoutButton();
		}
		dispGen();
	}

	uriage_taxku.onchange = function () {
		mHmefDat.mTaxKu = Number(uriage_taxku.value);
		calcTax();
	}

	uriage_name.onchange = function () {
		mHme2Dat.mBikou = uriage_name.value;
	}

	// 数量
	uriage_sur.addEventListener('DOMSubtreeModified', function () {
		// 数量
		if (mHmefDat.mSuryo != Other.CvtString2Num(uriage_sur.textContent) * 100) {
			mHmefDat.mSuryo = Other.CvtString2Num(uriage_sur.textContent) * 100;
			uriage_sur.textContent = Other.formatLocalJS(mHmefDat.mSuryo, 2, 2);
			calcKin();
		}
	});

	uriage_tanka.addEventListener('DOMSubtreeModified', function () {
		if (mHmefDat.mTanka != Other.CvtString2Num(uriage_tanka.textContent) * 100) {
			mHmefDat.mTanka = Other.CvtString2Num(uriage_tanka.textContent) * 100;
			uriage_tanka.textContent = Other.formatLocalJS(mHmefDat.mTanka, 2, 2);
			calcKin();
		}

	});

	uriage_kin.addEventListener('DOMSubtreeModified', function () {
		if (uriage_kin.textContent != Other.getNumFromString(uriage_kin.textContent)) {
			uriage_kin.textContent = Other.formatDecimal(Other.getNumFromString(uriage_kin.textContent));
			mHmefDat.mKin = parseInt(Other.getNumFromString(uriage_kin.textContent));
			calcTax();
		}
	});

	uriage_taxr.addEventListener('DOMSubtreeModified', function () {
		if (mHmefDat.mTaxR != Other.CvtString2Num(uriage_taxr.textContent) * 10) {
			mHmefDat.mTaxR = Other.CvtString2Num(uriage_taxr.textContent) * 10;
			uriage_taxr.textContent = Other.formatLocalJS(mHmefDat.mTaxR, 1, 1);
			calcTax();
		}
	});

	uriage_cho.addEventListener('DOMSubtreeModified', function () {
		if (m_nCho != Other.getNumFromString(uriage_cho.textContent)) {
			m_nCho = parseInt(Other.getNumFromString(uriage_cho.textContent));
			uriage_cho.textContent = onChangeMinus(m_nCho);
			dispGen();
		} else {
			uriage_cho.textContent = Other.formatDecimal(Other.getNumFromString(uriage_cho.textContent));
			return;
		}
	});

	uriage_recept.addEventListener('DOMSubtreeModified', function () {
		var value = uriage_recept.textContent;
		if (m_nReceipt != Other.getNumFromString(value)) {
			m_nReceipt = parseInt(Other.getNumFromString(value));
			var nKin = calcSign(mHmefDat.mSign, mHmefDat.mKin + mHmefDat.mTax);
			m_nNyu = parseInt(m_nReceipt);
			teiseiNyuukinPre = m_nNyu;
			if (nKin + m_nCho < m_nReceipt) {
				// 預り金が売上額より多い場合
				// 入金額は売上額まで
				m_nNyu = nKin + m_nCho;
			}

			uriage_recept.textContent = Other.formatDecimal(m_nReceipt);
			uriage_nyu.textContent = Other.formatDecimal(m_nNyu);
			dispGen();
		}
	});

	uriage_nyu.addEventListener('DOMSubtreeModified', function () {
		if (m_nNyu != Other.getNumFromString(uriage_nyu.textContent)) {
			if (select_shohin_list_urimode.value == 1) {
				if (parseInt(Other.getNumFromString(uriage_nyu.textContent)) > parseInt(Other.getNumFromString(uriage_recept.textContent))) {
					var mess = "最大は" + uriage_recept.textContent + "です。"
					Common.setupModal("error", null, mess, StringCS.OK, null, null, false);
					uriage_nyu.textContent = onChangeMinus(teiseiNyuukinPre);
					return;
				}
			}
			m_nNyu = parseInt(Other.getNumFromString(uriage_nyu.textContent));
			uriage_nyu.textContent = onChangeMinus(m_nNyu);
			teiseiNyuukinPre = m_nNyu;
			dispGen();
		}

	});
}


/**
	ON FOCUS INPUT FIELD
*/
function inputFocus() {
	var keyboard = document.querySelector(".keyboard");
	var wrapMainForm = document.querySelector(".keyboard .container-mainform .wrap-mainform");

	uriage_sur.onclick = function () {
		keyboard.style.zIndex = "4";
		wrapMainForm.classList.remove("overlay-animate");
		var title = document.getElementById("surTitle").textContent;
		keyboardProp = new Dat.KeyboardProp().setValue(true, true, 4, 2);
		sessionStorage.setItem(StringCS.KEYBOARDPROP, JSON.stringify(keyboardProp));
		Common.showKeyBoard(title, uriage_sur);
	};

	uriage_tanka.onclick = function () {
		keyboard.style.zIndex = "4";
		wrapMainForm.classList.remove("overlay-animate");
		var title = document.getElementById("tankTitle").textContent;
		keyboardProp = new Dat.KeyboardProp().setValue(true, true, 6, 2);
		sessionStorage.setItem(StringCS.KEYBOARDPROP, JSON.stringify(keyboardProp));
		Common.showKeyBoard(title, uriage_tanka);
	};

	uriage_kin.onclick = function () {
		if (uriage_kin.classList.contains("disabled-inp") == false) {
			keyboard.style.zIndex = "4";
			wrapMainForm.classList.remove("overlay-animate");
			var title = document.getElementById("kinTitle").textContent;
			keyboardProp = new Dat.KeyboardProp().setValue(true, false, 8, 0);
			sessionStorage.setItem(StringCS.KEYBOARDPROP, JSON.stringify(keyboardProp));
			Common.showKeyBoard(title, uriage_kin);
		}
	};

	uriage_taxr.onclick = function () {
		keyboard.style.zIndex = "4";
		wrapMainForm.classList.remove("overlay-animate");
		keyboardProp = new Dat.KeyboardProp().setValue(true, true, 2, 1);
		sessionStorage.setItem(StringCS.KEYBOARDPROP, JSON.stringify(keyboardProp));
		Common.showKeyBoard("", uriage_taxr);
	};

	uriage_cho.onclick = function () {
		keyboard.style.zIndex = "4";
		wrapMainForm.classList.remove("overlay-animate");
		var title = document.getElementById("cho_text").textContent;
		keyboardProp = new Dat.KeyboardProp().setValue(true, false, 8, 0);
		sessionStorage.setItem(StringCS.KEYBOARDPROP, JSON.stringify(keyboardProp));
		Common.showKeyBoard(title, uriage_cho);
	};

	uriage_recept.onclick = function () {
		keyboard.style.zIndex = "4";
		wrapMainForm.classList.remove("overlay-animate");
		var title = document.getElementById("azukariTitle").textContent;
		keyboardProp = new Dat.KeyboardProp().setValue(true, false, 8, 0);
		sessionStorage.setItem(StringCS.KEYBOARDPROP, JSON.stringify(keyboardProp));
		Common.showKeyBoard(title, uriage_recept);
	};

	document.getElementById("teisei").onclick = function () {
		keyboard.style.zIndex = "4";
		wrapMainForm.classList.remove("overlay-animate");
		var title = document.getElementById("receipt_text").textContent;
		keyboardProp = new Dat.KeyboardProp().setValue(true, false, Other.getNumFromString(uriage_recept.textContent).length, 0);
		sessionStorage.setItem(StringCS.KEYBOARDPROP, JSON.stringify(keyboardProp));
		Common.showKeyBoard(title, uriage_nyu);
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

		if (value.length - value.indexOf(".") > 3) {
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
	KEY PRESS MINUS ACTION
*/
function keyPressMinus(value, length, event) {
	if (value.includes("-")) {
		if (value.indexOf("-") != 0) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		} else if (value.replaceAll(",", "").length > length) {
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
	ONCHANGE MINUS ACTION
*/
function onChangeMinus(value) {
	var result = String(value);
	if (result.includes("-")) {
		result = result.replace("-", "");
		result = Other.formatDecimal(Other.getNumFromString(result));
		if (result != 0) {
			result = "-" + result;
		}
	} else {
		result = Other.formatDecimal(Other.getNumFromString(result));
	}
	return result;
}


/* 
	* CHECKING VALUE
*/
function checkValue() {
	var moneyGasUse = Number(Other.getNumFromString(txtKensinNyukinNowSeikyu.textContent));
	var moneyBonus = Number(Other.getNumFromString(mEditAdjust.value));
	var moneyUserGet = Number(Other.getNumFromString(mEditReceipt.textContent));
	var tienNhap = Number(Other.getNumFromString(mEditInputReceipt.textContent));
	if (moneyGasUse + moneyBonus > tienNhap) {
		moneyUserGet = tienNhap;
		mEditReceipt.textContent = Other.formatDecimal(moneyUserGet);
	} else {
		moneyUserGet = moneyBonus + moneyGasUse;
		mEditReceipt.textContent = Other.formatDecimal(moneyUserGet);
	}
}


/* 
	CHANGING LAYOUT BUTTON
*/
function changeLayoutButton() {
	if (m_isGenuri) {
		uriage_edit.style.display = "block";
		uriage_edit.classList.add("col-4");
		uriage_back.classList.remove("col-6");
		uriage_submit.classList.remove("col-6");
		uriage_back.classList.add("col-4");
		uriage_submit.classList.add("col-4");
	} else {
		uriage_edit.style.display = "none";
		uriage_edit.classList.remove("col-4");
		uriage_back.classList.remove("col-4");
		uriage_submit.classList.remove("col-4");
		uriage_back.classList.add("col-6");
		uriage_submit.classList.add("col-6");

	}
}


/* 
	ONCLICK ACTION
*/
function onClickAction() {
	document.getElementById("backPageButton").onclick = function () {
		Common.movePage('/product_search.html');
	};


	uriage_submit.onclick = function () {
		Common.setupModal("question", null, Mess.I00008, StringCS.IIE, StringCS.HAI, null, false);
		var buttonConfirm = document.getElementsByClassName("button-1")[0];
		buttonConfirm.onclick = function () {
			// sendDataToServer();
			preparePrintData();
			createImageForm();
			Common.setupModal("success", null, Mess.I00003, null, StringCS.OK, null, false);
		}
	}

	document.getElementById("backPrintButton").onclick = function () {
		Common.movePage('/product_search.html');
	};

	document.getElementById("sendToAppButton").onclick = function () { sendImage(); };
}


/* 
	* PREPARING PRINTING DATA
*/
function preparePrintData() {
	var strSname_0 = document.getElementById("kokyaku-mei").value;
	var strSname_1 = "";
	if (Other.getClearString(strSname_0) == Other.getClearString(mUserData.mKokfDat.mName)) {
		strSname_0 = mUserData.mKokfDat.mSName0;
		strSname_1 = mUserData.mKokfDat.mSName1;
		printGenuriInfo = new Dat.PrintGenuriInfo().setValue(strSname_0, strSname_1, m_isGenuri, m_nCho, m_nNyu, m_nReceipt, [mHmefDat]);
		createPrintData(false, printGenuriInfo, false);
	}
}


function createPrintData(isHybseikyu, printGenuriInfo, isHikae) {
	// ヘッダー
	createHeaderData(isHikae, printGenuriInfo.m_isGenuri)

	// 顧客情報
	createCusInfo(getCusData());

	// 売上明細
	createMeisaiInfo(printGenuriInfo.m_lstHmefDat);

	if (printGenuriInfo.m_isGenuri) {
		var lSeikyu = 0;
		printGenuriInfo.m_lstHmefDat.forEach(item => {
			if (item.mUsef && item.mHmCode > mUserData.mSysfDat.mSnvalue) {
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
	} else {
		document.getElementById("commentArea").style.display = "none";
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
	var strTitle = "納 品 書";
	if (isGenuri) {
		strTitle += " 兼 領 収 書";
	}
	if (isHikae) {
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
			if (item.mUsef && item.mHmCode > mUserData.mSysfDat.mSnvalue) {
				lKin += item.mKin;
				lTax += item.mTax;
			}
		}

		createHmInfo(lstHmefDat, mUserData.mSysfDat, mapHmefDat, isTanka);
		createHmInfoTax(mapHmefDat, lTax);
		createHmInfoFooter(lKin + lTax);
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
*/
function calcUtax(sysfDat, hmefDat) {
	var nUtax = 0;
	if (hmefDat.mTaxKu == 2) {	//内税
		var flo = (parseFloat(hmefDat.mKin) * (parseFloat(hmefDat.mTaxR))) / parseFloat(hmefDat.mTaxR + 1000);
		//  商品マスタに端数処理が登録されていない時のみ、システムの端数処理を使用する。2012.09.26
		var shofDat = hmefDat.mShofDat;

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
		if (String(nKin).length < 4) {
			strPrint = Other.formatLocalJS(nKin, 0, 0);
		} else {
			strPrint = Other.formatDecimal(nKin);
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
	var hmInfoTable = document.getElementById("hmInfoTable");
	if (mUserData.mSy2fDat.mSyskeigen == 0) {
		if (nTax != 0) {
			document.getElementById("infoTaxArea").style.display = "none";
			const nTaxVal = document.getElementById("nTaxVal");
			nTaxVal.innerHTML = Other.formatDecimal(nTax);
		} else {
			document.getElementById("hmInfoTotal").style.display = "none";
			document.getElementById("infoTaxArea").style.display = "none";
		}

		if (hmInfoTable.classList.contains("mg-bt-15") == false) {
			hmInfoTable.className += " mg-bt-15";
		}
	} else {
		document.getElementById("hmInfoTotal").style.display = "none";
		if (hmInfoTable.classList.contains("mg-bt-15")) {
			hmInfoTable.classList.remove("mg-bt-15");
		}

		for (let hmefDat of mapHmefDat.values()) {

			const hmefTaxKeigenTotalVal = document.getElementById("hmefTaxKeigenTotalVal");
			hmefTaxKeigenTotalVal.innerHTML = getHmefTaxKeigenTotal(hmefDat);

			const hmefKinVal = document.getElementById("hmefKinVal");
			hmefKinVal.innerHTML = Other.formatDecimal(hmefDat.mKin) + ")";

			const hmefTaxKeigenTaxVal = document.getElementById("hmefTaxKeigenTaxVal");
			hmefTaxKeigenTaxVal.innerHTML = getHmefTaxkeigenTax(hmefDat);

			const hmefTaXVal = document.getElementById("hmefTaXVal");
			hmefTaXVal.innerHTML = Other.formatDecimal(hmefDat.mTax) + ")";
		}
	}
}


/**
	* CREATING HMINFO FOOTER
*/
function createHmInfoFooter(lKin) {
	document.getElementById("honjitsuUriageKingakuVal").innerHTML = Other.formatDecimal(lKin);
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
	document.getElementById("konkaiSeikyuGakuVal").innerHTML = Other.formatDecimal(lSeikyu);

	// 調整額
	if (nChokin != 0) {
		document.getElementById("choTitleText").innerHTML = getChoTitle();
		document.getElementById("choTitleVal").innerHTML = Other.formatDecimal(nChokin);
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
		document.getElementById("honjitsuNyuuKingakuVal").innerHTML = Other.formatDecimal(nRecept);
	} else {
		document.getElementById("honjitsuNyuuKingakuArea").style.display = "none";
	}

	// おつり
	var lOtsuri = nRecept - (lSeikyu + nChokin);
	var genkinUriPrintArea = document.getElementById("genkin_uri_print_area");
	if (lOtsuri > 0) {
		document.getElementById("otsuriVal").innerHTML = Other.formatDecimal(lOtsuri);
		if (genkinUriPrintArea.classList.contains("mg-bt-15") == false) {
			genkinUriPrintArea.className += " mg-bt-15";
		}
	} else {
		document.getElementById("otsuriArea").style.display = "none";
		if (genkinUriPrintArea.classList.contains("mg-bt-15")) {
			genkinUriPrintArea.classList.remove("mg-bt-15");
		}
	}

	// 差引残高
	var lZandaka = lSeikyu + nChokin - nNyukin;
	if (lZandaka != 0) {
		document.getElementById("sashihikiZandakaVal").innerHTML = Other.formatDecimal(lZandaka);
	} else {
		document.getElementById("sashihikiZandakaArea").style.display = "none";
	}

	document.getElementById("ryooshuuKingakuVal").innerHTML = Other.formatDecimal(nNyukin) + "円";
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
	lstComment = strComments;
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
	* CALCULATING TAX LIST
	*
	* @param lstHmefDat   [in] [HmefDat]    販売明細データ
	* @param recentTax    [in] [int]    	recent tax
	* @return  int 
*/
function calcTaxList(lstHmefDat, recentTax) {
	if (lstHmefDat != null) {
		if (lstHmefDat.length > 0) {
			var result = 0;
			for (var i = 0; i < lstHmefDat.length; i++) {
				result += lstHmefDat[i].mTax;
			}
			return result + parseInt(recentTax);
		} else {
			return parseInt(recentTax);
		}
	} else {
		return parseInt(recentTax);
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
		window.location.href = "printermarutou://print&&1" + "&&" + Common.browserDetect();
	} else if (check == "Android") {
		window.location.href = "https://www.example.com/path?param=" + JSON.stringify(androidData);
	}
}


/** 
	* CREATE IMAGE FILE
*/
function createImageForm() {
	Common.setBackgroundDialogScreen("none", "rgba(0,0,0,0.95)");
	document.getElementById('editView').style.display = "none";
	document.getElementById('printView').style.display = "block";
	setupTextSizeDetail("konkaiSeikyuuGaku-text", "50px", "60px", "bold");
	setupTextSizeDetail("ryooshuu-text", "50px", "58px", "bold");
	setupTextSizeDetail("hmInfoTable-item", "24px", "31px", "normal");
	setupTextSizeDetail("kk-val", "40px", "48px", "bold");
	setupPrintForm("100vh", "670px", "55px", "31px", "38px", "31px", "38px", true, "20px");
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
						setupTextSizeDetail("konkaiSeikyuuGaku-text", konkaiSeikyuuGakuTS, konkaiSeikyuuGakuLH, "bold");
						setupTextSizeDetail("hmInfoTable-item", hmInfoTableItemTS, hmInfoTableItemLH, "normal");
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
export function sendDataToServer() {
	const mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));
	var mKokfDat = new Dat.KokfDat().parseData(mUserData.mKokfDat)
	var sysfDat = new Dat.SysfDat().parseData(mUserData.mSysfDat)
	mKokfDat.mKtpcdat = new Dat.KtpcDat();
	mHmefDat.m_strBikou = mHme2Dat.mBikou;
	mHmefDat.m_isToyukensin = sysfDat.m_isToyukensinFlg;
	var hmefWriteDat = new Dat.HmefWriteDat();
	hmefWriteDat.m_lstHmefDat = [mHmefDat];
	hmefWriteDat.m_kokfDat = mKokfDat;
	hmefWriteDat.login_id = sessionStorage.getItem(StringCS.USERNAME);
	hmefWriteDat.login_pw = sessionStorage.getItem(StringCS.PASSWORD);

	var nyu = parseInt(Other.getNumFromString(uriage_nyu.textContent));
	var cho = parseInt(Other.getNumFromString(uriage_cho.textContent));
	if (nyu > 0) {
		var hmefNyu = addHmefDat(m_bdNyu, nyu);
		hmefWriteDat.m_lstHmefDat.push(hmefNyu);
	}
	if (cho > 0) {
		var hmefCho = addHmefDat(m_bdCho, cho);
		hmefWriteDat.m_lstHmefDat.push(hmefCho);
	}

	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	$.ajax({
		type: "POST",
		data: JSON.stringify(hmefWriteDat),
		url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_EARNING,
		// url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_EARNING,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		timeout: ValueCS.VL_LONG_TIMEOUT,
		success: function (response) {
			console.log(response);
			modal.style.display = "none";
				preparePrintData();
				androidData.type = "uriage";
				androidData.printMode = dataSetting.prnt_mode;
				androidData.printStatus = null;
				androidData.isHybseikyu = mUserData.mSysfDat.is_m_isToyukensinFlg;
				androidData.isHikae = false;
				androidData.mUserData.mSysfDat = mUserData.mSysfDat;
				androidData.mUserData.mKokfDat = mUserData.mKokfDat;
				androidData.mUserData.mSy2fDat = mUserData.mSy2fDat;
				androidData.mUserData.mKouserDat = null;
				androidData.mUserData.getHmef0 = null;
				androidData.mUserData.getHmef1 = null;
				androidData.mUserData.getHmef2 = null;
				androidData.mUserData.mHanfDat = mUserData.mHanfDat;
				androidData.kensinData = null;
				androidData.mUserData.mKensinDate = document.getElementById("hakkooBiKenshinBi").textContent;
				androidData.androidKensinDat = null;
				androidData.androidNyukinDat.mUTC = null;
				androidData.lstComment = lstComment;
				androidData.sTantname = dataSetting.m_lstTantName[0].name;
				androidData.printGenuriInfo = printGenuriInfo;
				reloadUriageList();
		},
		error: function (textstatus) {
			if (textstatus === "timeout") {
				console.log("timeout")
			} else {
				console.log(textstatus)
			}
			Common.setupModal("error", null, Mess.E00004, null, StringCS.OK, null, false);
		}
	}).done(function (res) {
		console.log('res', res);
	});
}


function reloadUriageList() {
	Common.setupModal("load", null, Mess.I00001, null, null, null, false);
	$.ajax({
		url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_READDATA + StringCS.PR_KEY + "&cusrec=" + mUserData.mKokfDat.mCusrec + "&htset=" + sessionStorage.getItem(StringCS.HTSETDATCODE) + "&phase=3" + "&login_id=" + sessionStorage.getItem(StringCS.PASSWORD) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		// url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_READDATA + StringCS.PR_KEY + "&cusrec=" + mUserData.mKokfDat.mCusrec + "&htset=" + sessionStorage.getItem(StringCS.HTSETDATCODE) + "&phase=3" + "&login_id=" + sessionStorage.getItem(StringCS.USERNAME) + "&login_pw=" + sessionStorage.getItem(StringCS.PASSWORD),
		headers: {
			'Content-Type': StringCS.PR_CONTENT_TYPE
		},
		success: function (result) {
			let dataHmefList = JSON.parse(result);
			mUserData.mHmefList = dataHmefList.mHmefList;
			mUserData.mKokfDat.mUrikin = Common.calcValOfList(mUserData.mHmefList, "mKin");
			mUserData.mKokfDat.mUriTax = Common.calcValOfList(mUserData.mHmefList, "mTax");
			sessionStorage.setItem(StringCS.USERDATA, JSON.stringify(mUserData));
			createImageForm();
			Common.setupModal("success", null, Mess.I00003, null, StringCS.OK, null, false);
		},
		error: function (jqXHR, exception) {
			console.log(exception);
			Common.setupModal("error", null, Mess.E00004, null, StringCS.OK, null, false);
		},
		timeout: ValueCS.VL_SHORT_TIMEOUT
	});
}

/**
 * 入金、調整明細の書き込み.
 *
 * @param kokfDat   [in] {@link KokfDat}    顧客データ
 * @param sysfDat   [in] {@link SysfDat}    システムデータ
 * @param nKin      [in] int                金額
 * @param nUriRec   [in] int                1レコード前のレコード番号
 * @throws Exception    書き込み時にエラーがあった場合に発生
 */
function addHmefDat(busfDat, nKin) {

	var hmefDat = new Dat.HmefDat();

	if (busfDat != null) {
		hmefDat.mKin = nKin * (busfDat.mSign == 1 ? -1 : 1);
		hmefDat.mTax = 0;
		hmefDat.mTaxKu = 0;
		hmefDat.mTaxR = 0;
		hmefDat.mTanka = 0;
		hmefDat.mDenKind = busfDat.mKind;
		hmefDat.mSign = busfDat.mSign;
		hmefDat.mKeigenKubun = 0;
		hmefDat.mLeasKind = 0;
		hmefDat.mHmCode = busfDat.mHinno;
		hmefDat.mHmName = busfDat.mName;
		hmefDat.mHbCode = 0;
		hmefDat.mHbName = "";
		hmefDat.mSuryo = 0;
		hmefDat.mUsef = true;
		var dtKenymd = kensinDate;
		hmefDat.mDeny = dtKenymd.getFullYear(); // 伝票日付(年)
		hmefDat.mDenm = dtKenymd.getMonth() + 1; // (月)
		hmefDat.mDend = dtKenymd.getDate();    // (日)
	}
	return hmefDat;
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	setOptionMenu();
	setupTitleClick();
	createData();
	onCreateView();
	inputFocus();
	onChangeData();
	onClickAction();
}


window.onload = onLoadAction;