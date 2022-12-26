import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as Dat from './Dat/dat.js'
import * as Other from './Common/other_util.js'
import * as GasRaterCom from './Common/gasratercom.js'
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
const uriage_genm_nReceipt = Number(uriage_recept.value);
const uriage_gen = document.getElementById("zandaka");
const mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));
const select_shohin_list_urimode = document.getElementById("modeForm");
const cash_sale = document.getElementById("genkin_uri_area");
const group_prezandaka = document.getElementById("group_prezandaka");
const preZandaka = document.getElementById("preZandaka");
const otsuri = document.getElementById("teisei-group");
const uriage_edit = document.getElementById("editButton");
var kokf = new Dat.KokfDat().parseData(mUserData.mKokfDat)
kokf.mKtpcdat = new Dat.KtpcDat();
var sy2fDat = new Dat.Sy2fDat().parseData(mUserData.mSy2fDat)
var sysfDat = new Dat.SysfDat().parseData(mUserData.mSysfDat)
sysfDat.mGtpcDat = new Dat.GtpcDat();
var kouserDat = new Dat.KouserDat().parseData(mUserData.mKouserDat)
var kensinDate_ss = sessionStorage.getItem(StringCS.KENSINDATE);
var kensinDate = new Date(kensinDate_ss);
var ko2fDat = new Dat.Ko2fDat().parseData(mUserData.mKo2fDat);

/** 商品マスタデータ */
//var mShofDat = new Dat.ShofDat().setValue(1, 100, 0, "", "", 2, 80, 0, 0, 1000, 2014, 4, 1, 50, 80);
var mShofDat = JSON.parse(sessionStorage.getItem(StringCS.SHOFDATITEM));
/** 品目データ */
// var mBusfDat = new Dat.BusfDat().setValue(true, 100, "灯　油  ", 0, 0);
var mBusfDat = JSON.parse(sessionStorage.getItem(StringCS.BUSFDATITEM));
/** 販売明細データ */
var mHmefDat = null;
/** 拡張販売明細データ */
var mHme2Dat;
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
var lstBusfCho = JSON.parse(sessionStorage.getItem(StringCS.LISTBUSTCHO));
var lstBusfNyu = JSON.parse(sessionStorage.getItem(StringCS.LISTBUSTNYU));

var CHOMODE = 1;
var NYUMODE = 2;


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
		var nAdd = sysfDat.mFracAddKin;
		var nMul = sysfDat.mFracMulKin;
		if (mHmefDat.mHmCode == sysfDat.mHinCd9 && mHmefDat.mHbCode == 0) {
			// 灯油・・・端数処理は顧客var kokfDat = mUserData.getKokfDat();
			nAdd = kokf.mLoilAdd;
			nMul = kokf.mLoilMulti;
		}
		mHmefDat.mKin = Other.hasCom(dKin, nAdd, nMul, 10000) / 10000;

		uriage_kin.value = Other.format("#,##0", calcSign(mHmefDat.mSign, mHmefDat.mKin), 0);
		uriage_kin.disabled = true;
		calcTax();
	} else {
		uriage_kin.disabled = false;
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
			var sysfDat = sysfDat;
			nFracAddTax = sysfDat.mFracAddTax;
			nFracMulTax = sysfDat.mFracMulTax;
		}
		mHmefDat.mTax = (Other.hasCom(dTax, nFracAddTax, nFracMulTax, 1000.) / 1000.);
	}

	uriage_tax.textContent = Other.formatDecial(calcSign(mHmefDat.mSign, mHmefDat.mTax));
	dispTotal();
}


/**
 * 請求金額の設定.
 *
 */
function dispTotal() {
	uriage_total.textContent = Other.formatDecial(calcSign(mHmefDat.mSign, mHmefDat.mKin + mHmefDat.mTax));
	dispGen();
}


/**
* 現在高の設定.
*
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
		nGen += GasRaterCom.calcTotal(mUserData, sysfDat, kokf, ko2fDat, sy2fDat, kouserDat, false);
		group_prezandaka.style.display = "block";
		preZandaka.textContent = Other.format("#,###,##0", GasRaterCom.calcTotal(mUserData, sysfDat, kokf, ko2fDat, sy2fDat, kouserDat, false), 0);
	}
	uriage_gen_name.textContent = strGenName;
	uriage_gen.textContent = Other.formatDecial(nGen);
}

function createData() {

	if (mHmefDat == null) {
		// 販売明細データがない場合は新規記入
		// 必要なデータを予め設定
		mHmefDat = new Dat.HmefDat();
		mHmefDat.mUsef = true;
		mHmefDat.mCusRec = kokf.mCusRec;
		mHmefDat.mHmeKind = 9;
		mHmefDat.mTanka = mShofDat.mTanka;
		if (sysfDat.mHinCd9 == mBusfDat.mHinno && mShofDat.mShono == 0) {
			// 灯油は顧客の灯油単価
			mHmefDat.mTanka = kokf.mLoilUnit;
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
		mHmefDat.mPreHrec = kokf.mHmew0Erec; // 前明細レコードNo <-
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

function onCreateView() {
	m_nCho = 0;

	// 顧客コード
	uriage_kcode.textContent = kokf.mCusCode;
	// 顧客名
	uriage_name.textContent = kokf.mName;
	// 品目名
	var strHmname = mBusfDat.mName;
	if (mShofDat.mHinno == sysfDat.mHinCd9 && mShofDat.mShono == 0) {
		// 固定品目灯油
		strHmname += "　　　T";
	}
	uriage_hmname.textContent = (Other.nullToString(strHmname));
	// 品番名
	uriage_hbname.textContent = (Other.nullToString(mShofDat.mHinban).trim());

	// 数量
	uriage_sur.value = Other.formatLocalJS(mHmefDat.mSuryo, 2, 3);

	// 単位
	uriage_unit.textContent = (Other.nullToString(mShofDat.mUnit));
	// 単価
	uriage_tanka.value = Other.formatLocalJS(mHmefDat.mTanka, 2, 3);
	// 金額

	uriage_kin.value = (Other.format("#,##0", mHmefDat.mKin, 0));
	// 税区分
	uriage_taxku.value = mHmefDat.mTaxKu;

	// 税率
	uriage_taxr.value = Other.formatLocalJS(mHmefDat.mTaxR, 1, 1);

	// 消費税
	uriage_tax.textContent = Other.formatDecial(mHmefDat.mTax);



	//uriage_taxr.value = mHmefDat.mTaxR;

	// 合計
	dispTotal();

	// 現在高
	dispGen();


	// 調整取引区分デフォルト取得・設定
	// m_bdCho = InputDat.getBusfDat(getContext(), sChoHmcode, (byte)(sChoHmcode < sysfDat.mSnvalue ? 0 : 1));
	m_bdCho = JSON.parse(sessionStorage.getItem(StringCS.BUSFCHOITEM));
	if (m_bdCho != null) {
		uriage_cho_name.textContent = (Other.cutStringSpace(m_bdCho.mName));
	}
	// 入金取引区分デフォルト取得・設定
	// var sNyuHmcode = sy2fDat.mSysfHmcd12;
	m_bdNyu = JSON.parse(sessionStorage.getItem(StringCS.BUSFNYUITEM));
	if (m_bdNyu != null) {
		uriage_nyu_name.textContent = (Other.cutStringSpace(m_bdNyu.mName));
	}

	cash_sale.style.display = "none";
	otsuri.style.display = "none";
	uriage_edit.style.display = "none";
}

/* 
	SETUP OPTION MENU
*/
function setOptionMenu() {
	document.getElementById("menuOption").onclick = function () { Common.movePage('/menu_page.html') };
	document.getElementById("settingOption").onclick = function () { Common.movePage('/setting_page.html') };
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
			generateTable(listItem, tittle, CHOMODE);
		} else {
			generateTable(listItem, tittle, NYUMODE);
		}

	};
}

// close dialog

function closeDialog() {
	var overlay = document.querySelector(".overlay");
	var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
	overlay.style.zIndex = "-1";
	wrapMainForm.classList.remove("overlay-animate");
}


/* 
	SETUP TITLE CLICK
*/
function setupTitleClick() {
	titleOnclick("receipt_text", "receipt_form", lstBusfNyu);
	titleOnclick("cho_text", "receipt_form", lstBusfCho);
}

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
		span.textContent = Other.cutStringSpace(listItem[i].mName);
		span.onclick = function () {
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
 * onchangeData
 */
function changeData() {
	select_shohin_list_urimode.onchange = function () {
		m_isGenuri = !m_isGenuri;
		if (m_isGenuri) {
			cash_sale.style.display = "block";
			uriage_edit.style.display = "block";

		} else {
			cash_sale.style.display = "none";
			uriage_edit.style.display = "none";
		}
		dispGen();
	}

	uriage_recept.onchange = function () {
		m_nReceipt = Number(uriage_recept.value);
		var nKin = calcSign(mHmefDat.mSign, mHmefDat.mKin + mHmefDat.mTax);
		m_nNyu = m_nReceipt;
		if (nKin + m_nCho < m_nReceipt) {
			// 預り金が売上額より多い場合
			// 入金額は売上額まで
			m_nNyu = nKin + m_nCho;
		}


		uriage_nyu.textContent = Other.formatDecial(m_nNyu);
		dispGen();
	}

	uriage_cho.onchange = function () {
		m_nCho = Number(uriage_cho.value);
		dispGen();
	}

	uriage_taxku.onchange = function () {
		mHmefDat.mTaxKu = Number(uriage_taxku.value);
	}

	// 数量
	uriage_sur.onchange = function () {
		// 数量
		mHmefDat.mSuryo = Number(uriage_sur.value) * 100;
		uriage_sur.value = Other.formatLocalJS(mHmefDat.mSuryo, 2, 2);
		calcKin();
	}

	uriage_tanka.onchange = function () {
		mHmefDat.mTanka = Number(uriage_tanka.value) * 100;
		uriage_tanka.value = Other.formatLocalJS(mHmefDat.mTanka, 2, 2);
		calcKin();
	}

	uriage_taxr.onchange = function () {
		mHmefDat.mTaxR = Number(uriage_taxr.value) * 10;
		calcTax();
	}

	uriage_kin.onchange = function () {
		mHmefDat.mKin = Number(uriage_kin.value);
		calcTax();
	}




}

/**
   * ONLOAD ACTION
*/
function onLoadAction() {
	setOptionMenu();
	setupTitleClick();
	createData();
	onCreateView();
	changeData();
}


window.onload = onLoadAction;