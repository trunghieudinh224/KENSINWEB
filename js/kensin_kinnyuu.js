import * as Dat from './Dat/dat.js'
import * as Other from './Common/other_util.js'
import * as GasRaterCom from './Common/gasratercom.js'
import * as StringCS from './Constant/strings.js'
import * as HoanKinnyuu from './hoan_kinnyuu.js'

//kensin layout
const mTxtDate = document.getElementById("txtKensinMainKensinDate");
const mTxtNowMeter = document.getElementById("txtKensinMainNowMeter");
const mTxtPreMeter = document.getElementById("txtKensinMainPrevMeter");
const mTxtNowUse = document.getElementById("txtKensinMainNowSiyou");
const mTxtPreUse = document.getElementById("txtKensinMainPrevSiyou");
const mTxtGasPay = document.getElementById("txtKensinMainGasRyokin");
const mTitleGasPay = document.getElementById("txtKensinMainGasRyokin0");
const mTxtGasTax = document.getElementById("txtKensinMainShohi");
const mTxtCmt = document.getElementById("txtkensinMainInfo");
const mTxtNameUser = document.getElementById("txtKensinMainCusName");
const txtKensinMainInterUse = document.getElementById("txtKensinMainInterUse");
const mEditAdjust = document.getElementById("chouseigaku");
const mEditInputReceipt = document.getElementById("azukari-kin"); // 預かり金
const mEditReceipt = document.getElementById("nyuukin"); // 入金
const mTxtZandakaLabel = document.getElementById("txtKensinNyukinZandaka0");
const mTxtZandaka = document.getElementById("zandaka");
const tableKangen = document.getElementById("tableKangen");
const tableNebiki = document.getElementById("tableNebiki");
const txtKensinNyukinNowSeikyu = document.getElementById("seikyugaku");
const txtKensinNyukinPreZandaka = document.getElementById("txtKensinNyukinPreZandaka");
const txtKensinNyukinGasRyokin = document.getElementById("txtKensinNyukinGasRyokin");
const tvTax = document.getElementById("txtKensinNyukinShohizei");
const txtKensinNyukinKangen = document.getElementById("txtKensinNyukinKangen");
const txtKensinNyukinKangenKin = document.getElementById("txtKensinNyukinKangenKin");
const txtKensinNyukinNebiki = document.getElementById("txtKensinNyukinNebiki");
const txtKensinNyukinOtherUri = document.getElementById("txtKensinNyukinOtherUri");
const txtKensinNyukinOtherShohi = document.getElementById("txtKensinNyukinOtherShohi");
const txtKensinNyukinChosei = document.getElementById("txtKensinNyukinChosei");
const txtKensinNyukinNyukin = document.getElementById("txtKensinNyukinNyukin");
const div_otsuri = document.getElementById("div_otsuri");
const txtKensinNyukinOtsuri = document.getElementById("txtKensinNyukinOtsuri");

const teiseiBtn = document.querySelector("#teisei");
const cancelBtn = document.querySelector("#cancel");
const teiseiGroup = document.querySelector("#teisei-group");
const nyuukinGroup = document.querySelector("#nyuukin-group");
const teiseiNyuukin = document.querySelector("#teisei-nyuukin");
const Sashihiki_zandaka = document.querySelector("#Sashihiki_zandaka");
const teiseiSumi = document.querySelector("#teisei-sumi");
const saveButton = document.getElementById("createPrintingFormButton");

/** ユーザー情報 */ 
var mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));
mUserData.mKokfDat.mKtpcdat = new Dat.KtpcDat();
mUserData.mGasfDat.mGextDat = new Dat.GextDat();

/** tab display status */
var displayTab = [true, true, true];
/** kensin date */
var kensin_date = new Date(mUserData.mKensinDate);
/** ガス使用量 */
var m_nGasuse = 0;
/** 簡ガス用日割日数 */
var mDays = 0;
/** 合計金額 */
var mTotal = 0;
/** nyuukin */
let nyuukin = 0;
/** 訂正フラグ */
var mTeiseiFlg = false;
/** teisei nyuukin pre value */
var teiseiNyuukinPre = "0";
/** mode page */
var modePage = sessionStorage.getItem(StringCS.KINYUUMODE);
/** 顧客値引きデータ */
mUserData.m_lstKnebDat = new Array();
var knebDat = new Dat.KnebDat();
var kneb = knebDat.setValue( 1 , 0 , 0 , 0 , 0 , 1002 , 0 , 0 , 0 , 0 , 0 , 0 )
mUserData.m_lstKnebDat.push(kneb);
for (let i = 2; i < 17; i++) {
	var pos = i;
	if(i > 7 && i <= 10){
		pos = i + 4;
	}else if (i > 10){
		pos = 0;
	}
	kneb = knebDat.setValue(pos,0,0,0,0,0,0,0,0,0,0,0)
	mUserData.m_lstKnebDat.push(kneb);
}
// var lstLeasHmefDat = mUserData.getLeasHmefDat();
var lstLeasHmefDat = new Array();
// var bdChosei = InputDat.getBusfDat(this, mUserData.mKouserDat.m_sChocode,  0);
// var bdNyukin = InputDat.getBusfDat(this, mUserData.mKouserDat.m_sNyucode, 0);
var bdChosei = new Dat.BusfDat().setValue(true, 2, "調整", 1, 3)
var bdNyukin = new Dat.BusfDat().setValue(true, 2, "調整", 1, 3)



function setupCollapseTab() {
    // if (mUserData.mSysfDat.mCheckHoan && (mKokfDat.mGasKubun != 2 || mUserData.mSysfDat.mTenkenKgas == 1)) {
    //     document.getElementById("card2").style.pointerEvents = "auto";
    // } else {
    //     document.getElementById("card2").style.pointerEvents = "none";
    // }
    
    if ((mUserData.mSysfDat.mIfMoney && mUserData.mKokfDat.mSupplyForm != 2) == false) {
		$('.collapseOne').collapse();
        document.getElementById("card3").remove();
        displayTab[2] = false;
        setupButton();
        return;
    } else {
        setdataUchiWake();
        onclickAction();
    }

	if (modePage == 3) {
        displayTab[0] = false;
        displayTab[1] = false;
        document.getElementById("card1").remove();
        document.getElementById("card2").remove();
		$('.collapseThree').collapse()
        setupButtonNyukinMode();
	} else {
        document.getElementById("card2").style.pointerEvents = "none";
        document.getElementById("card3").style.pointerEvents = "none";
		$('.collapseOne').collapse()
        setupButton();
	}
}

function openKensinLayout() {
    setCusInfo();
}

function setdataNiukinLayout() {
    initComponents();
    init();
}

/**
 * 顧客情報等を設定する。
 *
 */
function setCusInfo() {
    // 顧客名
    mTxtNameUser.innerHTML = Other.getClearString(mUserData.mKokfDat.mName);
    // 検針日付

    mTxtDate.innerHTML = Other.MonthDayFormat(
        kensin_date.getMonth()+1,
        kensin_date.getDate(),
        false
    );
    m_nGasuse = mUserData.mKokfDat.mGasUse;

    if (mUserData.mKokfDat.mKenSumi) {
        // 検針済みの場合
        mTxtCmt.innerHTML = "検針済みです。";
        mTxtNowMeter.value = Other.Format(mUserData.mKokfDat.mNowMeter, 1);
		mTxtPreMeter.innerHTML = Other.Format(mUserData.mKokfDat.mPreMeter, 1);
        if (mUserData.mKokfDat.mGasDiv != 0 && mUserData.mGasfDat.mTaxDiv == 3) {
			mTxtGasTax.innerHTML = Other.KingakuFormat(mUserData.mKokfDat.mConTax);
        } else {
            mTxtGasTax.innerHTML = "***";
        }
        mTxtNowUse.innerHTML = Other.Format(
            GasRaterCom.getGasSuryo(mUserData.mKokfDat.mGasUse, mUserData.mSy2fDat, mUserData.mKouserDat),
            1
        );
        var strPreUseTitle;
        var strPreUseValue;
        if (mUserData.mKokfDat.mBetwMeter > 0) {
            strPreUseTitle = "前回/中間";
            strPreUseValue =
                Other.Format(
                    GasRaterCom.getGasSuryo(mUserData.mKokfDat.mPreUse, mUserData.mSy2fDat, mUserData.mKouserDat),
                    1
                ) +
                " / " +
                Other.Format(
                    GasRaterCom.getGasSuryo(mUserData.mKokfDat.mBetwMeter, mUserData.mSy2fDat, mUserData.mKouserDat),
                    1
                );
        } else {
            strPreUseTitle = "前回使用量";
            strPreUseValue = Other.Format(
                GasRaterCom.getGasSuryo(mUserData.mKokfDat.mPreUse, mUserData.mSy2fDat, mUserData.mKouserDat),
                1
            );
        }
        document.getElementById("txtKensinMainPrevSiyou0").innerHTML =
            strPreUseTitle;

        mTxtPreUse.innerHTML = strPreUseValue;

        // ガス料金
        // 顧客データからガス料金を取得する 12.04.24
        mTxtGasPay.innerHTML = Other.formatDecial(mUserData.mKokfDat.mFee);

        // 確認ボタンを押せるようにする 12.04.24
        mDays = mUserData.mKokfDat.mHiwari;
        if (mUserData.mKokfDat.mHiwari != 0) {
            // 日割り日数がある場合は予測使用量を計算
            mTitleGasPay.innerHTML = "日割料金";
        } else {
            mTitleGasPay.innerHTML = "ガス料金";
        }
    } else {
        // 今回指針
        if (mUserData.mKokfDat.mKenSumi) {
            mTxtNowMeter.innerHTML = Other.Format(mUserData.mKokfDat.mNowMeter, 1);
        } else {
            // 入力前は前回値
            mTxtNowMeter.innerHTML = "";
        }
        // 前回指針
		mTxtPreMeter.innerHTML = Other.Format(mUserData.mKokfDat.mPreMeter, 1);
        // 使用量(これも再入力で初期値が変わるかも)
        if (mUserData.mKokfDat.mKenSumi) {
            mTxtNowUse.innerHTML = Other.Format(
                GasRaterCom.getGasSuryo(mUserData.mKokfDat.mGasUse, mUserData.mSy2fDat, mUserData.mKouserDat),
                1
            );
        } else {
            mTxtNowUse.innerHTML = "";
        }
        // 前回使用量
        var tvPreUsetTitle = document.getElementById("txtKensinMainPrevSiyou0");
        if (mUserData.mKokfDat.mBetwMeter > 0) {
            // 中間使用量有
            //tvPreUsetTitle.innerHTML = "前回/中間";]
			if (mUserData.mKokfDat.metchg == true) {
				document.getElementById("chukan_shiyo_ryo_id").classList.remove("hidden");
			}
            var strPreUseValue =
                Other.Format(
                    GasRaterCom.getGasSuryo(mUserData.mKokfDat.mPreUse, mUserData.mSy2fDat, mUserData.mKouserDat),
                    1
                ) +
                "/" +
                Other.Format(
                    GasRaterCom.getGasSuryo(mUserData.mKokfDat.mBetwMeter, mUserData.mSy2fDat, mUserData.mKouserDat),
                    1
                );
           	txtKensinMainInterUse.innerHTML = strPreUseValue;

        } else {
            mTxtPreUse.innerHTML = Other.Format(
                GasRaterCom.getGasSuryo(mUserData.mKokfDat.mPreUse, mUserData.mSy2fDat, mUserData.mKouserDat),
                1
            ); //13.02.08
        }

        // ガス料金
        // 顧客データからガス料金を取得する 12.05.07 不具合対応票No.50対応
        if (mUserData.mKokfDat.mKenSumi) {
            mTxtGasPay.innerHTML = Other.KingakuFormat(mUserData.mKokfDat.mFee);
        } else {
            mTxtGasPay.innerHTML = "";
        }

        // 消費税
        // 内税の場合は***
        mTxtGasTax.innerHTML = mUserData.mKokfDat.mTaxDiv == 3 ? "" : "***";
        mTxtCmt.innerHTML = "今回指針を入力してください。";
    }
}


/**
 * check gas now is a number?
 *
 */
function checkNowGas() {
    var strSisin = mTxtNowMeter.value;
    if (isNaN(strSisin)) {
        // mTxtNowMeter.classList.add("edtError");
    } else {
        // mTxtNowMeter.classList.remove("edtError");
        setGasInfo();
        afterCheckLease();
        setdataNiukinLayout();
    }
}


/**
 * * 入力された今回指針から使用量、ガス料金を表示する。
 */
function setGasInfo() {
    // ガス使用量計算
    var strSisin = mTxtNowMeter.value;
    //sua lai strSisin == ""
    if (strSisin == "") {
        // 空欄なのでなにもしない。
        mTxtCmt.innerHTML = "今回指針を入力してください。";
        mTxtCmt.classList.add("text_black");
        mTxtCmt.classList.remove("text_red");
        mTxtCmt.classList.remove("text_blue");
        //mTxtCmt.setTextColor(Color.BLACK);
        mTxtNowUse.innerHTML = "";
        mTxtGasPay.innerHTML = "";
        mTxtGasTax.innerHTML = mUserData.mKokfDat.mTaxDiv == 3 ? "" : "***";
        return;
    }
	var nSisin = parseFloat(strSisin) * 10;
	m_nGasuse = GasRaterCom.calcGasUse(mUserData.mKokfDat, nSisin);
    mTxtNowUse.innerHTML = Other.Format(
        GasRaterCom.getGasSuryo(m_nGasuse, mUserData.mSy2fDat, mUserData.mKouserDat),
        1
    );

    // 使用率チェック
    if (
        GasRaterCom.checkSrpday(
            mUserData.mSysfDat,
            mUserData.mKokfDat,
            m_nGasuse,
            kensin_date.getMonth() + 1,
            kensin_date.getDate(),
            mUserData.mSy2fDat,
            mUserData.mKouserDat
        )
    ) {
        mTxtCmt.innerHTML = "使用率チェック";
        mTxtCmt.classList.add("text_red");
        mTxtCmt.classList.remove("text_blue");
        mTxtCmt.classList.remove("text_black");
    } else {
        mTxtCmt.innerHTML = "今回指針を入力してください。";
        mTxtCmt.classList.add("text_black");
        mTxtCmt.classList.remove("text_blue");
        mTxtCmt.classList.remove("text_red");
    }

    // メーター一回り確認
    if (mUserData.mKokfDat.mPreMeter > nSisin) {
        mTxtCmt.innerHTML = "メーター周り";
        mTxtCmt.classList.add("text_blue");
        mTxtCmt.classList.remove("text_red");
        mTxtCmt.classList.remove("text_black");
    }

    if (mUserData.mGasfDat.mSum == 4) {
        mTxtCmt.innerHTML = "ガス料金を入力してください。";
        return;
    } else if (mUserData.mKouserDat.m_nKoubetsu == 1) {
        mTxtCmt.innerHTML = "ガス料金を入力してください。";
    }

    if (GasRaterCom.checkKgas(mUserData.mKokfDat, mUserData.mKouserDat.m_nKoubetsu)) {
        // 13.03.18
        // if (true) { // 13.03.18
        // 簡ガス日割りチェック

        var nDays = GasRaterCom.getKgasday(
            mUserData.mSysfDat,
            mUserData.mKokfDat,
            kensin_date.getMonth() + 1,
            kensin_date.getDate()
        );

        if (mUserData.mSysfDat.mKgasDays0 == 0) {
            mUserData.mSysfDat.mKgasDays0 = 25;
        }
        if (mUserData.mSysfDat.mKgasDays1 == 0) {
            mUserData.mSysfDat.mKgasDays1 = 35;
        }
        if (mUserData.mSysfDat.mKgasDays2 == 0) {
            mUserData.mSysfDat.mKgasDays2 = 29;
        }

        if (
            nDays < mUserData.mSysfDat.mKgasDays0 || // 通常の最低日数より小さいときには日割り有効
            nDays > mUserData.mSysfDat.mKgasDays1 || // 通常の最大日数より大きいときには日割り有効
            (mUserData.mKokfDat.mPuseMonth == 0 && nDays <= mUserData.mSysfDat.mKgasDays2)
        ) {
            // 前回検針がないときのみkgasDays2のチェックが入る
            // var wkStrDays = new StringBuilder();
            // wkStrDays.append("今回検針: ").append(Other.DataFormat(mUserData.getKensinDate(),  0)).append("\n");
            // if (mUserData.mKokfDat.mKaiYear + mUserData.mKokfDat.mKaiMonth + mUserData.mKokfDat.mKaiDate > 0) {
            //     wkStrDays.append("検針開始日: ").append(Other.DateFormat(mUserData.mKokfDat.mKaiYear, mUserData.mKokfDat.mKaiMonth, mUserData.mKokfDat.mKaiDate, true)).append("\n");
            // }
            // if (mUserData.mKokfDat.mPuseYear + mUserData.mKokfDat.mPuseMonth + mUserData.mKokfDat.mPuseDate > 0) {
            //     wkStrDays.append("前回検針日: ").append(Other.DateFormat(mUserData.mKokfDat.mPuseYear, mUserData.mKokfDat.mPuseMonth, mUserData.mKokfDat.mPuseDate, true)).append("\n");
            // }
            // wkStrDays.append("日割り日数: ").append(nDays).append("\n\n");
            // wkStrDays.append("日割計算をしますか？\n");
            // if (mUserData.mKokfDat.mPuseMonth == 0 && nDays <= mUserData.mSysfDat.mKgasDays2) {
            //     wkStrDays.append("閉開栓時には").append(mUserData.mSysfDat.mKgasDays2).append("日以下が対象です。");
            // }
            // else {
            //     wkStrDays.append("日割対象の検針期間\n( ").append(mUserData.mSysfDat.mKgasDays0 - 1).append("日数以下、").append(mUserData.mSysfDat.mKgasDays1 + 1).append("日数以上) ");
            // }

            // final Dialog wkDlg = Other.createAlertDialog(this, "日割計算", wkStrDays.toString(), true);
            // wkDlg.findViewById(R.id.yes).setOnClickListener(new View.OnClickListener() {
            //     @Override
            //     public void onClick(View v) {
            //         MLog.INFO(KensinMainActivity.this, TAG, "[確認ダイアログ:終了][YES]");
            //         // 日割計算する
            //         setGasPay(m_nGasuse, nDays, mUserData.mKokfDat, mUserData.mGasfDat, mUserData.mSysfDat, mUserData.mSy2fDat, mUserData.mKouserDat);
            //         wkDlg.dismiss();
            //     }
            // });
            // wkDlg.findViewById(R.id.no).setOnClickListener(new View.OnClickListener() {
            //     @Override
            //     public void onClick(View v) {
            //         MLog.INFO(KensinMainActivity.this, TAG, "[確認ダイアログ:終了][NO]");
            //         // 日割計算しない
            //         setGasPay(m_nGasuse, 0, mUserData.mKokfDat, mUserData.mGasfDat, mUserData.mSysfDat, mUserData.mSy2fDat, mUserData.mKouserDat);
            //         wkDlg.dismiss();
            //     }
            // });
            // wkDlg.show();
        } else {
            setGasPay(m_nGasuse, 0, mUserData.mKokfDat, mUserData.mGasfDat, mUserData.mSysfDat, mUserData.mSy2fDat, mUserData.mKouserDat);
        }
    } else {
        setGasPay(m_nGasuse, 0, mUserData.mKokfDat, mUserData.mGasfDat, mUserData.mSysfDat, mUserData.mSy2fDat, mUserData.mKouserDat);
    }
}


/**
 * ガス料金を出力する
 * @param nSiyou    [in] int                使用量
 * @param nDays     [in] int                日割り日数
 * @param kokfDat   [in] {@link kokfDat}    顧客データ
 * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
 * @param sysfDat   [in] {@link SysfDat}    システムデータ
 * @param sy2fDat   [in] {@link Sy2fDat}    システム2データ
 * @param kouserDat [in] {@link KouserDat}  顧客拡張データ
 */
function setGasPay(
    nSiyou,
    nDays,
    kokfDat,
    gasfDat,
    sysfDat,
    sy2fDat,
    kouserDat
) {
    var lGasFee;
    var nGasTax;
    mDays = nDays;

    // 数量は中圧係数考慮
    nSiyou = GasRaterCom.getGasSuryo(nSiyou, sy2fDat, kouserDat);

    lGasFee = GasRaterCom.dailyGasrate(nSiyou, nDays, kokfDat, gasfDat);

    nGasTax = GasRaterCom.calcConTax(lGasFee, kokfDat, gasfDat, sysfDat);

    // ガス料金設定
    if (nDays > 0) {
        mTitleGasPay.innerHTML = "日割料金";
    } else {
        mTitleGasPay.innerHTML = "ガス料金";
    }
    mTxtGasPay.innerHTML = Other.KingakuFormat(lGasFee);
    // mTxtGasPay.innerHTML = ((lGasFee));
    // 消費税設定
    if (gasfDat.mTaxDiv == 3) {
        // 外税の場合のみ税額表示
        mTxtGasTax.innerHTML = Other.KingakuFormat(nGasTax);
        // mTxtGasTax.innerHTML = ((nGasTax));
    } else {
        mTxtGasTax.innerHTML = "***";
    }
    //      mBtnCheck.setEnabled(true);

    // ガス料金内訳計算のため必要な情報を一旦格納
    kokfDat.mHiwari = nDays;
    kokfDat.mGasUse = nSiyou;
    kokfDat.mFee = lGasFee;
    // ガス料金内訳金額の算出
    //基本料金などは、検針前に初期化
    // reset gas detail
    kokfDat.mKtpcdat.m_nBasekin = 0;
    kokfDat.mKtpcdat.m_nFacilitykin = 0;
    kokfDat.mKtpcdat.m_nAddkin = 0;
    GasRaterCom.calcGasBaseKin(sysfDat, gasfDat, kokfDat, sy2fDat, kouserDat);
}

/**
 * コンポーネントの初期設定を実施する。
 */
function initComponents() {
    // インスタンス設定

    // クリックイベントリスナーへ登録
    // findViewById(R.id.btnKensinNyukinUchiwake).setOnClickListener(new View.OnClickListener() {
    //     @Override
    //     public void onClick(View v) {
    //         Intent intent = new Intent(getApplicationContext(), KensinUchiwakeActivity.class);
    //         intent.putExtra(DEFINE.PARCEL_USER_DATA, mUserData);
    //         startActivity(intent);
    //     }
    // });

    var isHybrid = mUserData.mKouserDat.mHyc5 == 1 && mUserData.mKo2fDat.mGashyb > 0;
    // SysfDat sysfDat = mUserData.getSysfDat();
    var nVisible = 1;
    if (!mUserData.mSysfDat.mIfReduce) {
        nVisible = 0;
    }
    if (nVisible == 1) {
        tableKangen.classList.remove("hidden");
    } else {
        tableKangen.classList.add("hidden");
    }

    nVisible = 1;
    if (mUserData.mSysfDat.mKnebFlg == 0 && (!isHybrid || mUserData.mKokfDat.mHybseikyu == 2)) {
        // 値引きシステム無し
        // 値引き項目のビューを取り除く
        nVisible = 0;
    }

    if (nVisible == 1) {
        tableNebiki.classList.remove("hidden");
    } else {
        tableNebiki.classList.add("hidden");
    }

    // btnHyCUchiwake.setOnClickListener(this);
    // nVisible = 0;
    // if(isHybrid){
    //     nVisible = 1;
    // }
    // btnHyCUchiwake.setVisibility(nVisible);

    // if(mUserData.getSy2fDat().mNyucho == 1) {
    //     findViewById(R.id.txtKensinNyukinChosei).setOnClickListener(this);
    //     findViewById(R.id.txtKensinNyukinNyukin).setOnClickListener(this);
    // }
}

/**
 * データの初期設定を実施する。
 */
function init() {
    mTeiseiFlg = false; // 13.02.12

    // 今回請求額
    // 当月請求
    var nRyokin = GasRaterCom.calcTotal(
        mUserData,
        mUserData.mSysfDat,
        mUserData.mKokfDat,
        mUserData.mKo2fDat,
        mUserData.mSy2fDat,
        mUserData.mKouserDat,
        lstLeasHmefDat,
        false
    );
    txtKensinNyukinNowSeikyu.innerHTML = nRyokin > 0 ? Other.KingakuFormat(nRyokin) : 0;

    mTotal = nRyokin;

    // @当月請求
    nRyokin = GasRaterCom.calcSeikyu(mUserData.mSysfDat, mUserData.mKokfDat, mUserData.mSy2fDat, false);
    txtKensinNyukinPreZandaka.innerHTML = Other.formatDecial(nRyokin);

    // 当月ガス売上
    nRyokin = mUserData.mKokfDat.mFee;
    var nKangen = 0;
    if (mUserData.mSysfDat.mIfReduce) {
        nKangen = mUserData.mKokfDat.mReduce;
    }

    txtKensinNyukinGasRyokin.innerHTML = nRyokin > 0 ? Other.KingakuFormat(nRyokin) : 0;
    //txtKensinNyukinGasRyokin.innerHTML = nRyokin;

    // 消費税
    // その他消費税

    if (mUserData.mGasfDat != null) {
        if (mUserData.mGasfDat.mTaxDiv == 3) {
            // 13.01.16
            nRyokin = mUserData.mKokfDat.mConTax;
            if (mUserData.mSysfDat.mIfReduce) {
                // 還元額消費税
                nKangen += mUserData.mKokfDat.mReduceTax;
            }
            tvTax.innerHTML = nRyokin > 0 ? Other.KingakuFormat(nRyokin) : 0;
            //tvTax.innerHTML = (nRyokin);
        } else {
            tvTax.innerHTML = "***";
        }
    } else {
        tvTax.innerHTML = "***";
    }

    // 還元額名称設定
    txtKensinNyukinKangen.innerHTML = (Other.getKangcontname(mUserData));
    // txtKensinNyukinKangen.innerHTML = mUserData.mSy2fDat;
    // 還元額
    txtKensinNyukinKangenKin.innerHTML = Other.KingakuFormat(nKangen);
    //txtKensinNyukinKangenKin.innerHTML = (nKangen);

    // 値引き
    // 値引き
    var nNebiki = 0;
    if (mUserData.mSysfDat.mKnebFlg == 1) {
        // 漢の値引き有り
        nNebiki = GasRaterCom.calcNebiki(mUserData.mSysfDat, m_lstKnebDat);
    }
    txtKensinNyukinNebiki.innerHTML = Other.KingakuFormat(nNebiki);
    //txtKensinNyukinNebiki.innerHTML = (nNebiki);

    // その他売上
    var nEtcUri = mUserData.mKokfDat.mUrikin;
    var nEtcUriTax = mUserData.mKokfDat.mUriTax;
    if (mUserData.mKokfDat.mKenSumi) {
        // 13.12.10 検針済みの場合はリース金額を計上する
        // 検針済みの場合は検針時リース金額加算

        for (let i = 0; i < lstLeasHmefDat.length; i++) {
            const hmefDat = lstLeasHmefDat[i];
            if (hmefDat.mUsef && hmefDat.mHmeKind == 9 && hmefDat.mLeasKind == 1) {
                nEtcUri += hmefDat.mKin;
                nEtcUriTax += hmefDat.mTax;
            }
        }
    }
    if (mUserData.mKouserDat.mHyc5 == 1 && mUserData.mKo2fDat.mGashyb > 0 && mUserData.mKokfDat.mHybseikyu != 2) {
        nEtcUri += mUserData.mKo2fDat.mUseKin;
        if (mUserData.mKo2fDat.mUseTaxku == 3) {
            nEtcUriTax += mUserData.mKo2fDat.mUseTax;
        }
    }

    txtKensinNyukinOtherUri.innerHTML = Other.KingakuFormat(nEtcUri);
    txtKensinNyukinOtherShohi.innerHTML = Other.KingakuFormat(nEtcUriTax);
    //txtKensinNyukinOtherUri.innerHTML = ((nEtcUri));
    //txtKensinNyukinOtherShohi.innerHTML = ((nEtcUriTax));

    if (mUserData.mKokfDat.mSyuSumi) {
        // 13.02.13
        // 検針済み or 再入力の場合は入力して編集不可
        mEditAdjust.value = Other.KingakuFormat(mUserData.mKokfDat.mAdjust);
        mEditInputReceipt.innerHTML = Other.KingakuFormat(mUserData.mKokfDat.mInpReceipt);
        mEditReceipt.innerHTML = Other.formatDecial(mUserData.mKokfDat.mReceipt);
        // mTeiseiFlg = getLongValue(mEditInputReceipt) != getLongValue(mEditReceipt);
        // mEditAdjust.innerHTML = ((mUserData.mKokfDat.mAdjust));
        // mEditInputReceipt.innerHTML = ((mUserData.mKokfDat.mInpReceipt));
        // mEditReceipt.innerHTML = ((mUserData.mKokfDat.mReceipt));
        // mTeiseiFlg = getLongValue(mEditInputReceipt) != getLongValue(mEditReceipt);
    } else {
        mEditAdjust.innerHTML = Other.KingakuFormat(0); // 調整額
        mEditInputReceipt.innerHTML = Other.KingakuFormat(0); // 預かり金
        mEditReceipt.innerHTML = Other.formatDecial(0); // 入金額
        // mEditAdjust.value = "0";// 調整額
        // mEditInputReceipt.value = "0";// 預かり金
        // mEditReceipt.value = "0";// 入金額
    }
    // 残高、おつり確認
    setZandaka();

    if (mUserData.mSy2fDat.mNyucho == 1) {
        if (mUserData.mKouserDat.m_sChocode != 0) {
            if (bdChosei != null) {
                txtKensinNyukinChosei.innerHTML = Other.cutSpace(
                    bdChosei.mName
                ).trim();
            }
        }
        if (mUserData.mKouserDat.m_sNyucode != 0) {
            if (bdNyukin != null) {
                txtKensinNyukinNyukin.innerHTML = Other.cutSpace(
                    bdNyukin.mName
                ).trim();
            }
        }
    }
}

/**
 * 差引残高を設定する。
 */
function setZandaka() {
    // const txtKensinNyukinNowSeikyu = document.getElementById("seikyugaku");
    //   const mEditAdjust = document.getElementById("chouseigaku");
    // const mEditInputReceipt = document.getElementById("azukari-kin"); // 預かり金
    // const mEditReceipt = document.getElementById("nyuukin"); // 入金

    var lAdjust = getLongValue(mEditAdjust.value); // 調整額
    var lAzukari = getLongValue(mEditInputReceipt.value); // 預かり金
    var lReceipt = getLongValue(mEditReceipt.textContent); // 入金額

    if (!mTeiseiFlg) {
        lReceipt = lAzukari;
        if (lReceipt != 0) {
            if (mTotal + lAdjust < lReceipt && mTotal + lAdjust > 0) {
                lReceipt = mTotal + lAdjust;
            }
        }
        mEditReceipt.innerHTML = Other.formatDecial(lReceipt);
    }

    var mZandaka = mTotal + lAdjust - lReceipt; // 13.02.12
    if (lAzukari == lReceipt) {
        mTxtZandakaLabel.innerHTML = "差引残高";
        mTxtZandaka.innerHTML = mZandaka > 0 ? Other.formatDecial(mZandaka) : 0;
        div_otsuri.classList.add("hidden");
    } else {
        div_otsuri.classList.remove("hidden");
        txtKensinNyukinOtsuri.innerHTML = Other.formatDecial(lAzukari - lReceipt);
        mTxtZandaka.innerHTML = mZandaka > 0 ? Other.formatDecial(mZandaka) : 0;
    }
    if (mTeiseiFlg) {
        mTeiseiFlg = false;
    }
}


/**
 * 入力フォームからlong値の取得
 *
 * @param tvSrc [in] {@link TextView}   入力値(123,456,789,012)
 * @return long ,を取り除いたlong値
 */
function getLongValue(tvSrc) {
    var strValue = Other.getClearString(tvSrc);
    return strValue == "" ? 0 : parseInt(Other.getNumFromString(strValue));
}


/**
 * 検針指針の結果を登録して次のアクティビティを呼び出す。
 */
function startKensinNextIntent() {
    try {
        if (mTxtNowMeter.getText().toString().equals("")) {
            mTxtCmt.setText("今回指針を入力してください。");
            return;
        }
        if (mTxtGasPay.getText().toString().equals("")) {
            mTxtCmt.setText("ガス料金を入力してください。");
            return;
        }
        setLeasInfo();
    } catch (ex) {
        console.log(ex);
        // ErrorDialog.createErrorDialog(this, ErrorDialog.ERROR_KENSIN_INPUT_REGIST, getResources().getString(R.string.appKensin), getResources()
        //         .getString(R.string.ERROR_KENSIN_GAS_PAY_GET) + ": " + ex.getMessage());
    }
}

/**
 * リース形状.
 */
function setLeasInfo() {
    //2017.02.07 個別指定の時には、リース計上を確認します。
    //リースの計上有無を確認します。
    if (mUserData.mSysfDat.mLesUmu != 0) {
        //個別指定の顧客
        if (mUserData.mKouserDat.m_nKoubetsu == 1) {
            //リース計上を確認
            if (checkLeasUmu()) {
                //リース計上の対象があれば、確認する。
                // final Dialog wkDlg = Other.createAlertDialog(this, "確認", "検針時リースが未計上です。リースを計上しますか？", true);
                // wkDlg.findViewById(R.id.yes).setOnClickListener(new View.OnClickListener() {
                //     @Override
                //     public void onClick(View v) {
                //         MLog.INFO(KensinMainActivity.this, TAG, "[確認ダイアログ:終了][YES]");
                //         wkDlg.dismiss();
                //         lesUriAdd();
                //     }
                // });
                // wkDlg.findViewById(R.id.no).setOnClickListener(new View.OnClickListener() {
                //     @Override
                //     public void onClick(View v) {
                //         MLog.INFO(KensinMainActivity.this, TAG, "[確認ダイアログ:終了][NO]");
                //         wkDlg.dismiss();
                //         whenLeasFalse();
                //     }
                // });
                // wkDlg.show();
            } else {
                whenLeasFalse();
            }
        } else {
            if (checkLeasUmu()) {
                lesUriAdd();
            } else {
                whenLeasFalse();
            }
        }
    } else {
        whenLeasFalse();
    }
}

/**
 * リース計上チェック後の処理.
 */
function afterCheckLease() {
    try {
        mUserData.mKokfDat.mHiwari = mDays;
        mUserData.mKokfDat.mKenSumi = true;
        mUserData.mKokfDat.mKMonth = kensin_date.getMonth() + 1;
        mUserData.mKokfDat.mKDate = kensin_date.getDate();

        mUserData.mKokfDat.mNowMeter =
            Other.getNumFromString(mTxtNowMeter.value) * 10; 
        mUserData.mKokfDat.mGasUse = m_nGasuse;
        mUserData.mKokfDat.mFee = parseInt(Other.getNumFromString(mTxtGasPay.textContent));

        if (mUserData.mGasfDat.mTaxDiv == 3) {
            mUserData.mKokfDat.mConTax = parseInt(
                Other.getNumFromString(mTxtGasTax.textContent)
            );
        } else {
            mUserData.mKokfDat.mConTax = 0;
        }
        if (mUserData.mSysfDat.mKnebFlg == 1) {
            // 値引き
            // GasRaterCom.calcGasWaribiki(this, mUserData.mSysfDat, mUserData.getmKokfDat(), mUserData.getKnebiDat(), mUserData.mKo2fDat, mUserData.mSy2fDat, mUserData.mKouserDat, mUserData.mGasfDat);
        }
        // 還元
        GasRaterCom.calcGasKangen(mUserData.mKokfDat, mUserData.mGasfDat, mUserData.mSysfDat, mUserData.mSy2fDat, mUserData.mKouserDat);

        // 配送使用量の計算
        if (mUserData.mKokfDat.mSupplyForm != 2) {
            // 親以外
            mUserData.mKokfDat.mKhaiSs = mUserData.mKokfDat.mNowMeter;
            mUserData.mKokfDat.mKhaiSr = mUserData.mKokfDat.mHaiMsr;
            if (mUserData.mKokfDat.mHaiSs <= mUserData.mKokfDat.mKhaiSs) {
                mUserData.mKokfDat.mKhaiSr = mUserData.mKokfDat.mKhaiSr + mUserData.mKokfDat.mKhaiSs - mUserData.mKokfDat.mHaiSs;
            } else {
                mUserData.mKokfDat.mKhaiSr =
                    mUserData.mKokfDat.mKhaiSr +
                    Math.pow(10, mUserData.mKokfDat.mMtKeta + 1) +
                    mUserData.mKokfDat.mKhaiSs -
                    mUserData.mKokfDat.mHaiSs;
            }
        }

        if (
            mUserData.mSysfDat.mCheckHoan &&
            (mUserData.mKokfDat.mGasKubun != 2 || mUserData.mSysfDat.mTenkenKgas == 1)
        ) {
            //note Cong
            // 保安点検有
            // intent = new Intent(this, KensinHoanActivity.class);
            // intent.putExtra(DEFINE.PARCEL_USER_DATA, mUserData);
            // startActivityForResult(intent, KensinActivity.REQUEST_CODE_KENSIN_GROUP);
        } else if (mUserData.mSysfDat.mIfMoney) {
            //note Cong
            // 保安点検無し、入金有
            // intent = new Intent(this, KensinNyukinActivity.class);
            // intent.putExtra(DEFINE.PARCEL_USER_DATA, mUserData);
            // startActivityForResult(intent, KensinActivity.REQUEST_CODE_KENSIN_GROUP);
        } else {
            //note Cong
            // 保安点検無し→入金
            // 保安点検無し、入金無し
            // 印刷する、しないを確認する
            // saveAndCheckPrint(0L, 0L);
        }
    } catch (mex) {
        confirm.log(mex);
    }
}

function setdataUchiWake() {
    document.getElementById("txtKensinNaiyakuCusName").innerHTML =
        Other.getClearString(mUserData.mKokfDat.mName);
    var nKin = 0;
    // 前残印字
    if (mUserData.mSysfDat.mIfDemand) {
        // 前残印字有りの場合のみ
        nKin = mUserData.mKokfDat.mPreBalance;
    }
    document.getElementById("txtKensinNaiyakuZandaka").innerHTML =
        Other.formatDecial(nKin);

    // 当月ガス料金
    document.getElementById("txtKensinNaiyakuGasRyokin").innerHTML =
        Other.formatDecial(mUserData.mKokfDat.mProcGas);

    // 当月ガス料金消費税
    document.getElementById("txtKensinNaiyakuShohizei").innerHTML =
        Other.formatDecial(mUserData.mKokfDat.mTaxGas);

    // その他売上
    document.getElementById("txtKensinNaiyakuOtherUri").innerHTML =
        Other.formatDecial(GasRaterCom.calcEtcUri(mUserData.mSysfDat, mUserData.mKokfDat));

    // その他売上消費税
    document.getElementById("txtKensinNaiyakuOtherShohi").innerHTML =
        Other.formatDecial(GasRaterCom.calcEtcTax(mUserData.mSysfDat, mUserData.mKokfDat));

    // 当月調整
    document.getElementById("txtKensinNaiyakuChosei").innerHTML =
        Other.formatDecial(mUserData.mKokfDat.mTAdjust);
    // 当月入金
    document.getElementById("txtKensinNaiyakuNyukin").innerHTML =
        Other.formatDecial(mUserData.mKokfDat.mTReceipt);

    // 当月請求金額
    document.getElementById("txtKensinNaiyakuSeikyu").innerHTML =
        Other.formatDecial(
            GasRaterCom.calcSeikyu(mUserData.mSysfDat, mUserData.mKokfDat, mUserData.mSy2fDat, false)
        );

    if (mUserData.mSysfDat.mKnebFlg == 1) {
        // 漢の値引きシステム有り
        document.getElementById("txtKensinNaiyakuNebiki").innerHTML =
            Other.formatDecial(GasRaterCom.calcNebiki(knebDat));
    } else {
        // 値引き項目のビューを取り除く
        document.getElementById("nebiki").classList.add("hidden");
    }
}


//-------------------Enter Input Sting event--------------------------------->

mEditAdjust.addEventListener('keypress', event => {
    var cursorPosition = mEditAdjust.selectionStart;
    var value = "";
    if (cursorPosition == 0) {
        var value = `${event.key}${event.target.value}`;
    } else {
        value = `${event.target.value}${event.key}`;
    }
    if (!value.match(/^[0-9]*\.?[0-9]*\-?[0-9]*$/)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    } else {
        keyPressMinus(value, 8, event);
    }
});

mEditAdjust.onchange = function () {
    if (isValidNumber(Other.getNumFromString(mEditAdjust.value).replaceAll("-",""))) {
        setZandaka();
        updatePrintData();
        mEditAdjust.value = onChangeMinus(mEditAdjust.value);
        setupButtonNyukinMode();
    } else {
        console.log("value err");
    }
};


mEditInputReceipt.addEventListener('keypress', event => {
    var cursorPosition = mEditInputReceipt.selectionStart;
    var value = "";
    if (cursorPosition == 0) {
        var value = `${event.key}${event.target.value}`;
    } else {
        value = `${event.target.value}${event.key}`;
    }
    if (!value.match(/^[0-9]*\.?[0-9]*\-?[0-9]*$/)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    } else {
        keyPressMinus(value, 8, event);
    }
});

mEditInputReceipt.onchange = function () {
    if (isValidNumber(Other.getNumFromString(mEditInputReceipt.value).replaceAll("-",""))) {
        nyuukin = Number(mEditInputReceipt.value);
        mEditReceipt.textContent = Other.formatDecial(nyuukin);
        Sashihiki_zandaka.textContent = Other.formatDecial(nyuukin);
        setZandaka();
        updatePrintData();
        mEditInputReceipt.value = onChangeMinus(mEditInputReceipt.value);
        setupButtonNyukinMode();
    } else {
        console.log("value err");
    }
};


teiseiNyuukin.addEventListener('keypress', event => {
    var cursorPosition = teiseiNyuukin.selectionStart;
    var value = "";
    if (cursorPosition == 0) {
        var value = `${event.key}${event.target.value}`;
    } else {
        value = `${event.target.value}${event.key}`;
    }
    if (!value.match(/^[0-9]*\.?[0-9]*\-?[0-9]*$/)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    } else {
        keyPressMinus(value, 8, event);
    }
});

teiseiNyuukin.onchange = function () {
    if (isValidNumber(Other.getNumFromString(teiseiNyuukin.value).replaceAll("-",""))) {
        if (modePage == 3) {
            setupButtonNyukinMode();
        }
        if (teiseiNyuukin.value - Other.getNumFromString(Sashihiki_zandaka.textContent) > 0) {
            document.getElementById("txtErrorTeisei").style.display = "block";
            teiseiNyuukin.classList.add("text_red");
            document.getElementById("txtErrorTeiseiDetail").classList.add("text_red");
            document.getElementById("teisei-sumi").disabled = true;
            document.getElementById("createPrintingFormButton").disabled = true;
        } else {
            document.getElementById("txtErrorTeisei").style.display = "none";
            teiseiNyuukin.classList.remove("text_red");
            document.getElementById("txtErrorTeiseiDetail").classList.remove("text_red");
            document.getElementById("teisei-sumi").disabled = false;
            document.getElementById("createPrintingFormButton").disabled = false;
        }
        teiseiNyuukin.value = onChangeMinus(teiseiNyuukin.value);
    } else {
        console.log("value err");
    }
};


mTxtNowMeter.addEventListener('keypress', event => {
    var value = `${event.target.value}${event.key}`;
    if (!`${Other.getNumFromString(event.target.value)}${event.key}`.match(/^[0-9]*\.?[0-9]*$/)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    } else {
        keyPressAction(value, mUserData.mKokfDat.mMtKeta, event);
    }
});

mTxtNowMeter.onchange = function () {
    var strSisin = mTxtNowMeter.value;

    if (!isNaN(strSisin)) {
        setGasInfo();
        afterCheckLease();
        setdataNiukinLayout();
        if (strSisin != "") {
            mTxtNowMeter.value = Other.Format(
                parseFloat(mTxtNowMeter.value) * 10,
                1
            );
        }

        if (mTxtNowMeter.value != "") {
            document.getElementById("createPrintingFormButton").disabled = false;
            document.getElementById("card2").style.pointerEvents = "auto";
            if (displayTab[2] == true) {
                document.getElementById("card3").style.pointerEvents = "auto";
            }
        } else {
            document.getElementById("createPrintingFormButton").disabled = true;
            document.getElementById("card2").style.pointerEvents = "none";
            if (displayTab[2] == true) {
                document.getElementById("card3").style.pointerEvents = "none";
            }
        }
    }
};

function keyPressAction(value, length, event) {
    if (value.replaceAll(",","").includes(".")) {
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
        if (value.replaceAll(",","").length > length) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        } 
    }
}

function keyPressMinus(value, length, event) {
    if (value.includes("-")) {
        if (value.indexOf("-") != 0) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        } else if (value.replaceAll(",","").length > length) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        } 
    } else {
        if (value.replaceAll(",","").length > length) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        } 
    }
}

function onChangeMinus(value) {
    var result = value;
    if (result.includes("-")) {
        result = result.replace("-", "");
        result = Other.formatDecial(Other.getNumFromString(result));
        if (result != 0) {
            result = "-" + result;
        }
    } else {
        result = Other.formatDecial(Other.getNumFromString(result));
    }
    return result;
}

//--------------Teisei button event--------------------->

teiseiBtn.onclick = function () {
    if (teiseiGroup.classList.contains("hidden") == false) {
        return;
    }
    teiseiNyuukinPre = teiseiNyuukin.value;
    teiseiGroup.classList.remove("hidden");
    nyuukinGroup.classList.add("hidden");
    // if (isValidNumber(teiseiNyuukin.value)) {
    //   otsuri.textContent =
    //     Number(azukariKin.value) - Number(teiseiNyuukin.value);
    // }
    checkValue();
};

cancelBtn.onclick = function () {
    teiseiGroup.classList.add("hidden");
    nyuukinGroup.classList.remove("hidden");
    teiseiNyuukin.value = teiseiNyuukinPre;
    teiseiNyuukinPre = "0";

    if (teiseiNyuukin.value - Other.getNumFromString(Sashihiki_zandaka.textContent) > 0) {
        document.getElementById("txtErrorTeisei").style.display = "block";
        teiseiNyuukin.classList.add("text_red");
        document.getElementById("txtErrorTeiseiDetail").classList.add("text_red");
        document.getElementById("teisei-sumi").disabled = true;
        document.getElementById("createPrintingFormButton").disabled = true;
    } else {
        document.getElementById("txtErrorTeisei").style.display = "none";
        teiseiNyuukin.classList.remove("text_red");
        document.getElementById("txtErrorTeiseiDetail").classList.remove("text_red");
        document.getElementById("teisei-sumi").disabled = false;
        document.getElementById("createPrintingFormButton").disabled = false;
    }
    
};

teiseiSumi.onclick = function () {
    var teiseiNyuukinVal = Other.getNumFromString(teiseiNyuukin.value);
    if (isValidNumber(Other.getNumFromString(teiseiNyuukin.value).replaceAll("-",""))) {
        const chousei = Number(mEditAdjust.value);
        nyuukin = Number(teiseiNyuukinVal);
        mEditReceipt.textContent = Other.formatDecial(String(nyuukin));
        txtKensinNyukinOtsuri.textContent = Number(Other.getNumFromString(mEditInputReceipt.value)) - nyuukin;
        //  setZandaka(chousei, nyuukin);
        // nyuukinGaku.textContent = nyuukin;
        teiseiGroup.classList.add("hidden");
        nyuukinGroup.classList.remove("hidden");
        // setOtsuri();
        // calCutaleTotal();
        mTeiseiFlg = true;
        setZandaka();
        updatePrintData();
    }
};



// -------------check valid string----------------------->

function isValidNumber(inputString) {
    const isnum = /^\d+$/.test(inputString);
    return isnum;
}

function calCutaleTotal() {
    checkValue();
    var total;
    var first = Number(Other.getNumFromString(txtKensinNyukinNowSeikyu.textContent));
    var second = Number(mEditAdjust.value);
    var third = Number(Other.getNumFromString(mEditReceipt.textContent));

    if (third >= (first + second)) {
        div_otsuri.classList.remove("hidden");
        txtKensinNyukinOtsuri.textContent = third - (first + second);
    } else {

        div_otsuri.classList.add("hidden");
        total = Number(first) + Number(second) - Number(third);
        mTxtZandaka.textContent = total > 0 ? Other.formatDecial(total) : 0;
    }

}

function setOtsuri() {
    var nyuukin = teiseiNyuukin.value;
    var zakanda = Other.getNumFromString(Sashihiki_zandaka.textContent);
    if (isValidNumber(nyuukin)) {
        if (nyuukin < zakanda) {
            div_otsuri.classList.remove("hidden");
            txtKensinNyukinOtsuri.textContent = zakanda - nyuukin;
            mEditReceipt.textContent = nyuukin;
        }
    }
}

function checkValue() {
    var moneyGasUse = Number(Other.getNumFromString(txtKensinNyukinNowSeikyu.textContent));
    var moneyBonus = Number(Other.getNumFromString(mEditAdjust.value));
    var moneyUserGet = Number(Other.getNumFromString(mEditReceipt.textContent));
    var inputMoney = Number(Other.getNumFromString(mEditInputReceipt.textContent));
    if (moneyGasUse + moneyBonus > inputMoney) {
        moneyUserGet = inputMoney;
        mEditReceipt.textContent = Other.formatDecial(moneyUserGet);
    } else {
        moneyUserGet = moneyBonus + moneyGasUse;
        mEditReceipt.textContent = Other.formatDecial(moneyUserGet);
    }
}

function updatePrintData() {
    mUserData.mKokfDat.mAdjust = getLongValue(mEditAdjust.value);
    mUserData.mKokfDat.mReceipt = getLongValue(mEditReceipt.textContent);
    mUserData.mKokfDat.mInpReceipt = getLongValue(mEditInputReceipt.value);
}


function updateDataNyuukin() {
    mUserData.mKokfDat.mSyuSumi = getLongValue(mEditReceipt.textContent) != 0 || getLongValue(mEditAdjust.value) != 0;
    mUserData.mKokfDat.mKMonth = parseInt(mUserData.mKensinDate.substring(5, 7)) + 1;
    mUserData.mKokfDat.mKDate = parseInt(mUserData.mKensinDate.substring(8, 10));
}



export function sendDataToServer() {
	var dataSetting = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));
	var kensinDate_ss = sessionStorage.getItem(StringCS.KENSINDATE);
	var kensinDate = new Date(kensinDate_ss);
	var m_oMetMeisaiDat = new Dat.MetMeisaiDat();
	var cusRec = mUserData.mKokfDat.mCusrec;
	var dtSeiymd = kensinDate;
	var sysDate = new Date(mUserData.mSysfDat.mSysYear + "-" + mUserData.mSysfDat.mSysMonth + "-1");
	var dtSysymd = sysDate;
	var nOld_ss = mUserData.mKokfDat.mPreMeter;
	var nNew_ss = mUserData.mKokfDat.mNowMeter;
	var nKenmsr = mUserData.mKokfDat.mBetwMeter;
	var nTancd = dataSetting.tancd;
	var strTanname = dataSetting.m_lstTantName[0].name;
	var nWrt_tancd = dataSetting.wrt_tancd;
	var dtWrt_ymd = kensinDate;

	m_oMetMeisaiDat.m_nCusrec = mUserData.mKokfDat.mCusrec;
	m_oMetMeisaiDat.m_dtSeiymd = kensinDate;
	m_oMetMeisaiDat.m_dtSysymd = sysDate;
	m_oMetMeisaiDat.m_nOld_ss = mUserData.mKokfDat.mPreMeter;
	m_oMetMeisaiDat.m_nNew_ss = mUserData.mKokfDat.mNowMeter;
	m_oMetMeisaiDat.m_nKenmsr = mUserData.mKokfDat.mBetwMeter;
	m_oMetMeisaiDat.m_nTancd = dataSetting.tancd;
	m_oMetMeisaiDat.m_strTanname = dataSetting.m_lstTantName[0].name;
	m_oMetMeisaiDat.m_nWrt_tancd = dataSetting.wrt_tancd;
	m_oMetMeisaiDat.m_dtWrt_ymd = kensinDate;
	m_oMetMeisaiDat.m_dtDenymd = kensinDate;
	m_oMetMeisaiDat.m_dtEntymd = kensinDate;

	// m_oMetMeisaiDat.setValue(cusRec, dtSeiymd, dtSysymd, nOld_ss, nNew_ss, nKenmsr, nTancd, strTanname,
	// 	nWrt_tancd, dtWrt_ymd);

	var m_lLawItem = HoanKinnyuu.m_lLawItem;
	var m_oSecLawDat = new Dat.SeclawDat();
	m_oSecLawDat.m_nCusrec = mUserData.mKokfDat.mCusrec;
	m_oSecLawDat.m_dtEntymd = kensinDate;
	m_oSecLawDat.m_bRes = HoanKinnyuu.m_bRes;
	m_oSecLawDat.m_strTanname = dataSetting.m_lstTantName[0].name;
	m_oSecLawDat.m_sTancd = dataSetting.tancd;

	var m_oDenpyoMeisaiDat = new Dat.HnDenMeiDat();
	m_oDenpyoMeisaiDat.d_cusrec = mUserData.mKokfDat.mCusrec;
	m_oDenpyoMeisaiDat.m_kin = mUserData.mKokfDat.mFee;
	m_oDenpyoMeisaiDat.d_seiymd = kensinDate;
	m_oDenpyoMeisaiDat.d_sysymd = sysDate;
	m_oDenpyoMeisaiDat.d_entymd = kensinDate;
	m_oDenpyoMeisaiDat.d_denymd = kensinDate;
	m_oDenpyoMeisaiDat.m_tax = mUserData.mKokfDat.mConTax * 1000;
	m_oDenpyoMeisaiDat.d_sisin = mUserData.mKokfDat.mNowMeter;
	m_oDenpyoMeisaiDat.d_siyouryo = mUserData.mKokfDat.mGasUse;
	m_oDenpyoMeisaiDat.d_wrt_tancd = dataSetting.tancd;
	m_oDenpyoMeisaiDat.d_wrt_prg = dataSetting.wrt_tancd;
	m_oDenpyoMeisaiDat.wrt_ymd = kensinDate;
	m_oDenpyoMeisaiDat.d_utax = mUserData.mKokfDat.mConTax;
	m_oDenpyoMeisaiDat.nGasrkcnt = mUserData.mKokfDat.nGasrkcnt;
    m_oDenpyoMeisaiDat.m_taxku = gasfDat.mTaxDiv;

	var writeDatadat = new Dat.WriteDataDat();
	writeDatadat.m_oSecLawDat = m_oSecLawDat;
	writeDatadat.m_lLawItem = m_lLawItem;
	writeDatadat.m_oDenpyoMeisaiDat = m_oDenpyoMeisaiDat;
	writeDatadat.m_oMetMeisaiDat = m_oMetMeisaiDat;
	writeDatadat.login_id = sessionStorage.getItem(StringCS.USERNAME);
	writeDatadat.login_pw =  sessionStorage.getItem(StringCS.PASSWORD);

	return writeDatadat;
}


/**
   * SETUP BUTTON
*/
function setupButton() {
    if (mTxtNowMeter.value == "") {
        document.getElementById("createPrintingFormButton").disabled = true;
    }
}

function setupButtonNyukinMode() {
    if (mEditAdjust.value != "0" || mEditInputReceipt.value != "0" || parseInt(Other.getNumFromString(teiseiNyuukin.value)) < 0) {
        document.getElementById("createPrintingFormButton").disabled = false;
    } else {
        document.getElementById("createPrintingFormButton").disabled = true;
    }
}


/**
   * ONCLICK ACTION
*/
function onclickAction() {
    var overlay = document.querySelector(".overlay");
    var wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
    document.getElementById("btnKensinNyukinUchiwake").onclick = setdataUchiWake;
    document.getElementById("close-icon").onclick = function () {
        overlay.style.zIndex = "-1";
        wrapMainForm.classList.remove("overlay-animate");
    };

    document.getElementById("detail-btn").onclick = function () {
        overlay.style.zIndex = "2";
        wrapMainForm.classList.remove("overlay-animate");
    };
}


/**
   * ONLOAD ACTION
*/
function onLoadAction() {
    setupCollapseTab();
    openKensinLayout();
    setdataNiukinLayout();
}


onLoadAction();



export {
    displayTab,
    // mKokfDat,
    // sy2fDat,
    // sysfDat,
    // kouserDat,
    // ko2fDat,
    // mBusfDat_kang,
    // mBusfDat_hmcd13,
    // gasfDat,
    // hanfDat,
    // m_lstKnebDat,
    mUserData,
    kensin_date,
    m_nGasuse,
    mDays,
    mTotal,
    lstLeasHmefDat,
    bdChosei,
    bdNyukin,
    modePage,
    saveButton,
    updateDataNyuukin
}