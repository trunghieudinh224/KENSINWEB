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
var mShofDat = new Dat.ShofDat().setValue(1, 100, 0, "", "", 2, 80, 0, 0, 1000, 2014, 4, 1, 50, 80);
/** 品目データ */
var mBusfDat = new Dat.BusfDat().setValue(true, 100, "灯　油  ", 0, 0);
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
		calcTax();
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

	uriage_tax.textContent = (Other.Format(calcSign(mHmefDat.mSign, mHmefDat.mTax), 1));
	dispTotal();
}


/**
 * 請求金額の設定.
 *
 */
function dispTotal() {
	uriage_total.textContent = (Other.Format(calcSign(mHmefDat.mSign, mHmefDat.mKin + mHmefDat.mTax), 1));
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
		m_nNyu = Number(uriage_nyu.textContent);

		nGen += m_nCho - m_nNyu;
		if (nGen == 0 && m_nReceipt > m_nNyu) {
			// 売上金額 + 調整額 - 入金額 == 0で
			// 預り金が入金額より多い場合
			// おつり有り
			strGenName = "おつり";
			nGen = m_nReceipt - m_nNyu;
		}
	}
	else {
		nGen += GasRaterCom.calcTotal(mUserData, sysfDat, kokf, ko2fDat, sy2fDat, kouserDat, false);
	}
	uriage_gen_name.textContent = (strGenName);
	uriage_gen.textContent = Other.format("#,###,##0", nGen, 0);
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
	uriage_sur.value = Other.format("0.00", mHmefDat.mSuryo, 2);

	// 単位
	uriage_unit.textContent = (Other.nullToString(mShofDat.mUnit));
	// 単価
	uriage_tanka.value = (Other.format("0.00", mHmefDat.mTanka, 2));
	// 金額

	uriage_kin.value = (Other.format("#,##0", mHmefDat.mKin, 0));
	// 税区分
	uriage_taxku.value = mHmefDat.mTaxKu;

	// 税率
	uriage_taxr.value = (Other.format("0.0", mHmefDat.mTaxR, 1));

	// 消費税
	uriage_tax.textContent = Other.format("#,##0", mHmefDat.mTax, 0);



	//uriage_taxr.value = mHmefDat.mTaxR;

	// 合計
	dispTotal();

	// 現在高
	dispGen();


	// 調整取引区分デフォルト取得・設定
	// m_bdCho = InputDat.getBusfDat(getContext(), sChoHmcode, (byte)(sChoHmcode < sysfDat.mSnvalue ? 0 : 1));
	m_bdCho = mUserData.mBusfDat_hmcd13;
	if (m_bdCho != null) {
		uriage_cho_name.textContent = (Other.cutStringSpace(m_bdCho.mName));
	}
	// 入金取引区分デフォルト取得・設定
	// var sNyuHmcode = sy2fDat.mSysfHmcd12;
	m_bdNyu = mUserData.mBusfDat_hmcd12;
	if (m_bdNyu != null) {
		uriage_nyu_name.textContent = (Other.cutStringSpace(m_bdNyu.mName));
	}

	cash_sale.style.display = "none";
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
function titleOnclick(title, idForm) {
	var tableForm = document.getElementsByClassName("dialog_form");
	for (var i = 0; i < tableForm.length; i++) {
		tableForm[i].style.display = "none";
	}
	var form = document.getElementById(idForm);
	form.style.display = "block"

	var title = document.getElementById(title);
	var overlay = document.querySelector(".overlay");
	var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
	document.getElementById("close-icon").onclick = function () {
		overlay.style.zIndex = "-1";
		wrapMainForm.classList.remove("overlay-animate");
	};

	title.onclick = function () {
		overlay.style.zIndex = "2";
		wrapMainForm.classList.remove("overlay-animate");
	};
}


/* 
	SETUP TITLE CLICK
*/
function setupTitleClick() {
	titleOnclick("receipt_text", "receipt_form");
	titleOnclick("cho_text", "receipt_form");
}

/**
 * onchangeData
 */
function changeData() {
	select_shohin_list_urimode.onchange = function () {
		m_isGenuri = !m_isGenuri;
		if (m_isGenuri) {
			cash_sale.style.display = "block";
		} else {
			cash_sale.style.display = "none";
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


		uriage_nyu.textContent = m_nNyu;
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
		// uriage_sur.value = Other.format("0.00", mHmefDat.mSuryo, 2);
		calcKin();
	}

	uriage_tanka.onchange = function () {
		mHmefDat.mTanka = Number(uriage_tanka.value) * 100;
		// uriage_tanka.value = (Other.format("0.00", mHmefDat.mTanka, 2));
		calcKin();
	}

	uriage_taxr.onchange = function () {
		mHmefDat.mTaxR = Number(uriage_taxr.value) * 10;
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