import * as Common from './Common/common_function.js'
import * as StringCS from './Constant/strings.js'
import * as Dat from './Dat/dat.js'
import * as Other from './Common/other_util.js'
import * as GasRaterCom from './Common/gasratercom.js'
import * as ValueCS from './Constant/values.js'
import * as Mess from './Constant/message.js'
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
const teiseiBtn = document.querySelector("#teisei");
const cancelBtn = document.querySelector("#cancel");
const teiseiGroup = document.querySelector("#teisei-group");
const uriage_edit = document.getElementById("editButton");
const uriage_back = document.getElementById("layout_back");
const uriage_submit = document.getElementById("kakuninButton");
const titleDialog = document.getElementById("titleDialog");
const teiseiSumi = document.querySelector("#teisei-sumi");
const nyuukinGroup = document.querySelector("#nyuukin-group");
var kokf = new Dat.KokfDat().parseData(mUserData.mKokfDat)
kokf.mKtpcdat = new Dat.KtpcDat();
var sy2fDat = new Dat.Sy2fDat().parseData(mUserData.mSy2fDat)
var sysfDat = new Dat.SysfDat().parseData(mUserData.mSysfDat)
sysfDat.mGtpcDat = new Dat.GtpcDat();
var kouserDat = new Dat.KouserDat().parseData(mUserData.mKouserDat)
var kensinDate_ss = sessionStorage.getItem(StringCS.KENSINDATE);
var kensinDate = new Date(kensinDate_ss);
var ko2fDat = new Dat.Ko2fDat().parseData(mUserData.mKo2fDat);
var teiseiNyuukinPre = "0";

/** 商品マスタデータ */
//var mShofDat = new Dat.ShofDat().setValue(1, 100, 0, "", "", 2, 80, 0, 0, 1000, 2014, 4, 1, 50, 80);
var mShofDat = JSON.parse(sessionStorage.getItem(StringCS.SHOFDATITEM));
/** 品目データ */
// var mBusfDat = new Dat.BusfDat().setValue(true, 100, "灯　油  ", 0, 0);
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
	m_nNyu = 0;
	m_nReceipt = 0;
	uriage_cho.value = 0;
	uriage_recept.value = 0;
	uriage_nyu.textContent = 0;

	// 顧客コード
	uriage_kcode.textContent = kokf.mCusCode;
	// 顧客名
	uriage_name.value = kokf.mName;
	mHme2Dat.mBikou = kokf.mName;
	// 品目名
	var strHmname = mBusfDat.mName;
	if (mShofDat.mHinno == sysfDat.mHinCd9 && mShofDat.mShono == 0) {
		// 固定品目灯油
		strHmname += "　　　T";
	}
	uriage_hmname.textContent = Other.nullToString(strHmname);
	// 品番名
	uriage_hbname.textContent = Other.nullToString(mShofDat.mHinban).trim();

	// 数量
	uriage_sur.value = Other.formatLocalJS(mHmefDat.mSuryo, 2, 3);

	// 単位
	uriage_unit.textContent = Other.nullToString(mShofDat.mUnit);
	// 単価
	uriage_tanka.value = Other.formatLocalJS(mHmefDat.mTanka, 2, 3);
	// 金額

	uriage_kin.value = Other.format("#,##0", mHmefDat.mKin, 0);
	// 税区分
	uriage_taxku.value = mHmefDat.mTaxKu;

	// 税率
	uriage_taxr.value = Other.formatLocalJS(mHmefDat.mTaxR, 1, 1);

	// 消費税
	uriage_tax.textContent = Other.formatDecial(mHmefDat.mTax);


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
	//otsuri.style.display = "none";
	teiseiGroup.classList.add("hidden");
	changeLayoutButton();
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
			titleDialog.textContent = "調整取引区分選択"
			generateTable(listItem, tittle, CHOMODE);
		} else {
			titleDialog.textContent = "入金取引区分選択"
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
			changeLayoutButton();
		} else {
			cash_sale.style.display = "none";
			changeLayoutButton();
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

	teiseiBtn.onclick = function () {
		if (teiseiGroup.classList.contains("hidden") == false) {
			return;
		}
		teiseiNyuukinPre = uriage_nyu.value;
		teiseiGroup.classList.remove("hidden");
		nyuukinGroup.classList.add("hidden");
		// if (isValidNumber(uriage_nyu.value)) {
		//   otsuri.textContent =
		//     Number(azukariKin.value) - Number(uriage_nyu.value);
		// }
		checkValue();
	};

	cancelBtn.onclick = function () {
		teiseiGroup.classList.add("hidden");
		nyuukinGroup.classList.remove("hidden");
		uriage_nyu.value = teiseiNyuukinPre;
		teiseiNyuukinPre = "0";

		if (uriage_nyu.value - Other.getNumFromString(Sashihiki_zandaka.textContent) > 0) {
			document.getElementById("txtErrorTeisei").style.display = "block";
			uriage_nyu.classList.add("text_red");
			document.getElementById("txtErrorTeiseiDetail").classList.add("text_red");
			document.getElementById("teisei-sumi").disabled = true;
			document.getElementById("createPrintingFormButton").disabled = true;
		} else {
			document.getElementById("txtErrorTeisei").style.display = "none";
			uriage_nyu.classList.remove("text_red");
			document.getElementById("txtErrorTeiseiDetail").classList.remove("text_red");
			document.getElementById("teisei-sumi").disabled = false;
			document.getElementById("createPrintingFormButton").disabled = false;
		}

	};

	teiseiSumi.onclick = function () {
		var uriage_nyuVal = Other.getNumFromString(uriage_nyu.value);
		if (isValidNumber(Other.getNumFromString(uriage_nyu.value).replaceAll("-", ""))) {
			const chousei = Number(mEditAdjust.value);
			nyuukin = Number(uriage_nyuVal);
			mEditReceipt.textContent = Other.formatDecial(String(nyuukin));
			txtKensinNyukinOtsuri.textContent = Number(Other.getNumFromString(mEditInputReceipt.value)) - nyuukin;
			//  setZandaka(chousei, nyuukin);
			// nyuukinGaku.textContent = nyuukin;
			teiseiGroup.classList.add("hidden");
			nyuukinGroup.classList.remove("hidden");
			// setOtsuri();
			// calCutaleTotal();
			mTeiseiFlg = true;
			// setZandaka();
			// updatePrintData();
		}
	};

	uriage_name.onchange = function () {
		mHme2Dat.mBikou = uriage_name.value;
	}

	uriage_submit.onclick = function () {
		sendDataToServer();
		// history.back();
	}

}

function checkValue() {
	var moneyGasUse = Number(Other.getNumFromString(txtKensinNyukinNowSeikyu.textContent));
	var moneyBonus = Number(Other.getNumFromString(mEditAdjust.value));
	var moneyUserGet = Number(Other.getNumFromString(mEditReceipt.textContent));
	var tienNhap = Number(Other.getNumFromString(mEditInputReceipt.textContent));
	if (moneyGasUse + moneyBonus > tienNhap) {
		moneyUserGet = tienNhap;
		mEditReceipt.textContent = Other.formatDecial(moneyUserGet);
	} else {
		moneyUserGet = moneyBonus + moneyGasUse;
		mEditReceipt.textContent = Other.formatDecial(moneyUserGet);
	}
}

function changeLayoutButton() {
	teiseiGroup.classList.add("hidden");
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


export function sendDataToServer() {
	const mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));
	var mKokfDat = new Dat.KokfDat().parseData(mUserData.mKokfDat)
	var sysfDat = new Dat.SysfDat().parseData(mUserData.mSysfDat)
	mKokfDat.mKtpcdat = new Dat.KtpcDat();
	var dataSetting = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));
	var kensinDate_ss = sessionStorage.getItem(StringCS.KENSINDATE);
	var kensinDate = new Date(kensinDate_ss);


	var nTancd = dataSetting.tancd;
	var strTanname = dataSetting.tanname;
	var nWrt_tancd = dataSetting.wrt_tancd;
	var dtWrt_ymd = kensinDate;
	mHmefDat.m_strBikou = mHme2Dat.mBikou;
	mHmefDat.m_isToyukensin = sysfDat.m_isToyukeninFlg;


	var hmefWriteDat = new Dat.HmefWriteDat();
	hmefWriteDat.m_lstHmefDat = [mHmefDat];
	hmefWriteDat.m_kokfDat = mKokfDat;
	hmefWriteDat.login_id = sessionStorage.getItem(StringCS.USERNAME);
	hmefWriteDat.login_pw = sessionStorage.getItem(StringCS.PASSWORD);


	$.ajax({
		type: "POST",
		data: JSON.stringify(hmefWriteDat),
		// url: StringCS.PR_HTTPS + StringCS.PR_ADDRESS + StringCS.PR_WEBNAME + StringCS.PR_EARNING,
		url: StringCS.PR_HTTP + StringCS.PR_ADDRESS + StringCS.PR_PORT + StringCS.PR_WEBNAME + StringCS.PR_EARNING,
		contentType: "application/json",
		timeout: ValueCS.VL_LONG_TIMEOUT,
		success: function (response) {
			console.log(response);
			sessionStorage.setItem(StringCS.SAVINGSTATUS, "1");
			Common.setupModal("load", null, Mess.I00002, null, null);
		
		},
		error: function (textstatus) {
			if (textstatus === "timeout") {
				console.log("timeout")
			} else {
				console.log(textstatus)
			}
			sessionStorage.setItem(StringCS.SAVINGSTATUS, "0");
			Common.setupModal("error", null, Mess.E00004, StringCS.OK, null);
		}
	}).done(function (res) {
		console.log('res', res);
		sessionStorage.setItem(StringCS.SAVINGSTATUS, "1");
		Common.setupModal("success", null, Mess.I00003, StringCS.OK, null);
	});

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