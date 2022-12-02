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



const mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));
var mKokfDat = new Dat.KokfDat().parseData(mUserData.mKokfDat)
mKokfDat.mKtpcdat = new Dat.KtpcDat();
var sy2fDat = new Dat.Sy2fDat().parseData(mUserData.mSy2fDat)
var sysfDat = new Dat.SysfDat().parseData(mUserData.mSysfDat)
sysfDat.mGtpcDat = new Dat.GtpcDat();
var kouserDat = new Dat.KouserDat().parseData(mUserData.mKouserDat)


// var ko2fDat = mUserData.ko2fDat;;
var ko2fDat = new Dat.Ko2fDat().parseData(mUserData.mKo2fDat);
var busfDat = new Dat.BusfDat().parseData(mUserData.busfDat_hmcd13)

// var hmefDat0 = new Dat.HmefDat().setValue(true, 1, 1, 100, 8, 2314, 3, 80, 0, 5, 1, "警報器リース", 100, 10000, 0, 0, "YF-005N");
// var hmefDat1 = new Dat.HmefDat().setValue(true, 1, 0, 20000, 1600, 3001, 3, 80, 0, 5, 15, "ガスコンロ", 100, 0, 0, 0, "abv");
// var hmefList1 = [hmefDat0, hmefDat1];
// var hmefList = [];
// var hmefList2 = [];
var hanfDat = new Dat.HanfDat().parseData(mUserData.mHanfDat);
var gasfDat = new Dat.GasfDat().parseData(mUserData.mGasfDat)
gasfDat.mGextDat = new Dat.GextDat();

var kensin_date = new Date(mUserData.mKensinDate);
/** ガス使用量 */
var m_nGasuse = 0;
/** 簡ガス用日割日数 */
var mDays = 0;
/** 合計金額 */
var mTotal = 0;

//List<KnebDat> lstKnebDat = mUserData.getKnebiDat();
var lstKnebDat = new Array();
// var lstLeasHmefDat = mUserData.getLeasHmefDat();
var lstLeasHmefDat = new Array();
// var bdChosei = InputDat.getBusfDat(this, kouserDat.m_sChocode,  0);
// var bdNyukin = InputDat.getBusfDat(this, kouserDat.m_sNyucode, 0);
var bdChosei = new Dat.BusfDat().setValue(true, 2, "調整", 1, 3)
var bdNyukin = new Dat.BusfDat().setValue(true, 2, "調整", 1, 3)
/** 顧客値引きデータ */
var m_lstKnebDat = new Array();

/** 訂正フラグ */
var mTeiseiFlg = false;


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
    mTxtNameUser.innerHTML = Other.getClearString(mKokfDat.mName);
    // 検針日付

    mTxtDate.innerHTML = Other.MonthDayFormat(
        kensin_date.getMonth()+1,
        kensin_date.getDate(),
        false
    );
    m_nGasuse = mKokfDat.mGasUse;

    if (mKokfDat.mKenSumi) {
        // 検針済みの場合
        mTxtCmt.innerHTML = "検針済みです。";
        mTxtNowMeter.value = Other.Format(mKokfDat.mNowMeter, 1);
		mTxtPreMeter.innerHTML = Other.Format(mKokfDat.mPreMeter, 1);
        if (mKokfDat.mGasDiv != 0 && gasfDat.mTaxDiv == 3) {
			mTxtGasTax.innerHTML = Other.KingakuFormat(mKokfDat.mConTax);
        } else {
            mTxtGasTax.innerHTML = "***";
        }
        mTxtNowUse.innerHTML = Other.Format(
            GasRaterCom.getGasSuryo(mKokfDat.mGasUse, sy2fDat, kouserDat),
            1
        );
        var strPreUseTitle;
        var strPreUseValue;
        if (mKokfDat.mBetwMeter > 0) {
            strPreUseTitle = "前回/中間";
            strPreUseValue =
                Other.Format(
                    GasRaterCom.getGasSuryo(mKokfDat.mPreUse, sy2fDat, kouserDat),
                    1
                ) +
                " / " +
                Other.Format(
                    GasRaterCom.getGasSuryo(mKokfDat.mBetwMeter, sy2fDat, kouserDat),
                    1
                );
        } else {
            strPreUseTitle = "前回使用量";
            strPreUseValue = Other.Format(
                GasRaterCom.getGasSuryo(mKokfDat.mPreUse, sy2fDat, kouserDat),
                1
            );
        }
        document.getElementById("txtKensinMainPrevSiyou0").innerHTML =
            strPreUseTitle;

        mTxtPreUse.innerHTML = strPreUseValue;

        // ガス料金
        // 顧客データからガス料金を取得する 12.04.24
        mTxtGasPay.innerHTML = Other.KingakuFormat(mKokfDat.mFee);
        //mTxtGasPay.innerHTML = (mKokfDat.mFee);

        // 確認ボタンを押せるようにする 12.04.24
        // mBtnCheck.setEnabled(true);
        mDays = mKokfDat.mHiwari;
        if (mKokfDat.mHiwari != 0) {
            // 日割り日数がある場合は予測使用量を計算
            mTitleGasPay.innerHTML = "日割料金";
        } else {
            mTitleGasPay.innerHTML = "ガス料金";
        }
    } else {
        // 今回指針
        if (mKokfDat.mKenSumi) {
            mTxtNowMeter.innerHTML = Other.Format(mKokfDat.mNowMeter, 1);
        } else {
            // 入力前は前回値
            mTxtNowMeter.innerHTML = "";
        }
        // 前回指針
		mTxtPreMeter.innerHTML = Other.Format(mKokfDat.mPreMeter, 1);
        // 使用量(これも再入力で初期値が変わるかも)
        if (mKokfDat.mKenSumi) {
            mTxtNowUse.innerHTML = Other.Format(
                GasRaterCom.getGasSuryo(mKokfDat.mGasUse, sy2fDat, kouserDat),
                1
            );
        } else {
            mTxtNowUse.innerHTML = "";
        }
        // 前回使用量
        var tvPreUsetTitle = document.getElementById("txtKensinMainPrevSiyou0");
        if (mKokfDat.mBetwMeter > 0) {
            // 中間使用量有
            tvPreUsetTitle.innerHTML = "前回/中間";
            var strPreUseValue =
                Other.Format(
                    GasRaterCom.getGasSuryo(mKokfDat.mPreUse, sy2fDat, kouserDat),
                    1
                ) +
                "/" +
                Other.Format(
                    GasRaterCom.getGasSuryo(mKokfDat.mBetwMeter, sy2fDat, kouserDat),
                    1
                );
            mTxtPreUse.innerHTML = strPreUseValue;
        } else {
            mTxtPreUse.innerHTML = Other.Format(
                GasRaterCom.getGasSuryo(mKokfDat.mPreUse, sy2fDat, kouserDat),
                1
            ); //13.02.08
        }

        // ガス料金
        // 顧客データからガス料金を取得する 12.05.07 不具合対応票No.50対応
        if (mKokfDat.mKenSumi) {
            mTxtGasPay.innerHTML = Other.KingakuFormat(mKokfDat.mFee);
        } else {
            mTxtGasPay.innerHTML = "";
        }

        // 消費税
        // 内税の場合は***
        mTxtGasTax.innerHTML = mKokfDat.mTaxDiv == 3 ? "" : "***";
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
        mTxtGasTax.innerHTML = mKokfDat.mTaxDiv == 3 ? "" : "***";
        return;
    }
	var nSisin = parseFloat(strSisin) * 10;
	m_nGasuse = GasRaterCom.calcGasUse(mKokfDat, nSisin);
    mTxtNowUse.innerHTML = Other.Format(
        GasRaterCom.getGasSuryo(m_nGasuse, sy2fDat, kouserDat),
        1
    );

    // 使用率チェック
    if (
        GasRaterCom.checkSrpday(
            sysfDat,
            mKokfDat,
            m_nGasuse,
            kensin_date.getMonth() + 1,
            kensin_date.getDate(),
            sy2fDat,
            kouserDat
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
    if (mKokfDat.mPreMeter > nSisin) {
        mTxtCmt.innerHTML = "メーター周り";
        mTxtCmt.classList.add("text_blue");
        mTxtCmt.classList.remove("text_red");
        mTxtCmt.classList.remove("text_black");
    }

    if (gasfDat.mSum == 4) {
        mTxtCmt.innerHTML = "ガス料金を入力してください。";
        return;
    } else if (kouserDat.m_nKoubetsu == 1) {
        mTxtCmt.innerHTML = "ガス料金を入力してください。";
    }

    if (GasRaterCom.checkKgas(mKokfDat, kouserDat.m_nKoubetsu)) {
        // 13.03.18
        // if (true) { // 13.03.18
        // 簡ガス日割りチェック

        var nDays = GasRaterCom.getKgasday(
            sysfDat,
            mKokfDat,
            kensin_date.getMonth() + 1,
            kensin_date.getDate()
        );

        if (sysfDat.mKgasDays0 == 0) {
            sysfDat.mKgasDays0 = 25;
        }
        if (sysfDat.mKgasDays1 == 0) {
            sysfDat.mKgasDays1 = 35;
        }
        if (sysfDat.mKgasDays2 == 0) {
            sysfDat.mKgasDays2 = 29;
        }

        if (
            nDays < sysfDat.mKgasDays0 || // 通常の最低日数より小さいときには日割り有効
            nDays > sysfDat.mKgasDays1 || // 通常の最大日数より大きいときには日割り有効
            (mKokfDat.mPuseMonth == 0 && nDays <= sysfDat.mKgasDays2)
        ) {
            // 前回検針がないときのみkgasDays2のチェックが入る
            // var wkStrDays = new StringBuilder();
            // wkStrDays.append("今回検針: ").append(Other.DataFormat(mUserData.getKensinDate(),  0)).append("\n");
            // if (mKokfDat.mKaiYear + mKokfDat.mKaiMonth + mKokfDat.mKaiDate > 0) {
            //     wkStrDays.append("検針開始日: ").append(Other.DateFormat(mKokfDat.mKaiYear, mKokfDat.mKaiMonth, mKokfDat.mKaiDate, true)).append("\n");
            // }
            // if (mKokfDat.mPuseYear + mKokfDat.mPuseMonth + mKokfDat.mPuseDate > 0) {
            //     wkStrDays.append("前回検針日: ").append(Other.DateFormat(mKokfDat.mPuseYear, mKokfDat.mPuseMonth, mKokfDat.mPuseDate, true)).append("\n");
            // }
            // wkStrDays.append("日割り日数: ").append(nDays).append("\n\n");
            // wkStrDays.append("日割計算をしますか？\n");
            // if (mKokfDat.mPuseMonth == 0 && nDays <= sysfDat.mKgasDays2) {
            //     wkStrDays.append("閉開栓時には").append(sysfDat.mKgasDays2).append("日以下が対象です。");
            // }
            // else {
            //     wkStrDays.append("日割対象の検針期間\n( ").append(sysfDat.mKgasDays0 - 1).append("日数以下、").append(sysfDat.mKgasDays1 + 1).append("日数以上) ");
            // }

            // final Dialog wkDlg = Other.createAlertDialog(this, "日割計算", wkStrDays.toString(), true);
            // wkDlg.findViewById(R.id.yes).setOnClickListener(new View.OnClickListener() {
            //     @Override
            //     public void onClick(View v) {
            //         MLog.INFO(KensinMainActivity.this, TAG, "[確認ダイアログ:終了][YES]");
            //         // 日割計算する
            //         setGasPay(m_nGasuse, nDays, mKokfDat, gasfDat, sysfDat, sy2fDat, kouserDat);
            //         wkDlg.dismiss();
            //     }
            // });
            // wkDlg.findViewById(R.id.no).setOnClickListener(new View.OnClickListener() {
            //     @Override
            //     public void onClick(View v) {
            //         MLog.INFO(KensinMainActivity.this, TAG, "[確認ダイアログ:終了][NO]");
            //         // 日割計算しない
            //         setGasPay(m_nGasuse, 0, mKokfDat, gasfDat, sysfDat, sy2fDat, kouserDat);
            //         wkDlg.dismiss();
            //     }
            // });
            // wkDlg.show();
        } else {
            setGasPay(m_nGasuse, 0, mKokfDat, gasfDat, sysfDat, sy2fDat, kouserDat);
        }
    } else {
        setGasPay(m_nGasuse, 0, mKokfDat, gasfDat, sysfDat, sy2fDat, kouserDat);
    }
}


/**
 * ガス料金を出力する
 * @param nSiyou    [in] int                使用量
 * @param nDays     [in] int                日割り日数
 * @param mKokfDat   [in] {@link mKokfDat}    顧客データ
 * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
 * @param sysfDat   [in] {@link SysfDat}    システムデータ
 * @param sy2fDat   [in] {@link Sy2fDat}    システム2データ
 * @param kouserDat [in] {@link KouserDat}  顧客拡張データ
 */
function setGasPay(
    nSiyou,
    nDays,
    mKokfDat,
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

    lGasFee = GasRaterCom.dailyGasrate(nSiyou, nDays, mKokfDat, gasfDat);

    nGasTax = GasRaterCom.calcConTax(lGasFee, mKokfDat, gasfDat, sysfDat);

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
    mKokfDat.mHiwari = nDays;
    mKokfDat.mGasUse = nSiyou;
    mKokfDat.mFee = lGasFee;
    // ガス料金内訳金額の算出
    //基本料金などは、検針前に初期化
    // reset gas detail
    mKokfDat.mKtpcdat.m_nBasekin = 0;
    mKokfDat.mKtpcdat.m_nFacilitykin = 0;
    mKokfDat.mKtpcdat.m_nAddkin = 0;
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

    var isHybrid = kouserDat.mHyc5 == 1 && ko2fDat.mGashyb > 0;
    // SysfDat sysfDat = mUserData.getSysfDat();
    var nVisible = 1;
    if (!sysfDat.mIfReduce) {
        nVisible = 0;
    }
    if (nVisible == 1) {
        tableKangen.classList.remove("hidden");
    } else {
        tableKangen.classList.add("hidden");
    }

    nVisible = 1;
    if (sysfDat.mKnebFlg == 0 && (!isHybrid || mKokfDat.mHybseikyu == 2)) {
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
        sysfDat,
        mKokfDat,
        ko2fDat,
        sy2fDat,
        kouserDat,
        m_lstKnebDat,
        false
    );
    txtKensinNyukinNowSeikyu.innerHTML = Other.KingakuFormat(nRyokin);

    mTotal = nRyokin;

    // @当月請求
    nRyokin = GasRaterCom.calcSeikyu(sysfDat, mKokfDat, sy2fDat, false);
    txtKensinNyukinPreZandaka.innerHTML = Other.KingakuFormat(nRyokin);

    // 当月ガス売上
    nRyokin = mKokfDat.mFee;
    var nKangen = 0;
    if (sysfDat.mIfReduce) {
        nKangen = mKokfDat.mReduce;
    }

    txtKensinNyukinGasRyokin.innerHTML = Other.KingakuFormat(nRyokin);
    //txtKensinNyukinGasRyokin.innerHTML = nRyokin;

    // 消費税
    // その他消費税

    if (gasfDat != null) {
        if (gasfDat.mTaxDiv == 3) {
            // 13.01.16
            nRyokin = mKokfDat.mConTax;
            if (sysfDat.mIfReduce) {
                // 還元額消費税
                nKangen += mKokfDat.mReduceTax;
            }
            tvTax.innerHTML = Other.KingakuFormat(nRyokin);
            //tvTax.innerHTML = (nRyokin);
        } else {
            tvTax.innerHTML = "***";
        }
    } else {
        tvTax.innerHTML = "***";
    }

    // 還元額名称設定
    // txtKensinNyukinKangen.innerHTML = (Other.getKangcontname(sy2fDat));
    txtKensinNyukinKangen.innerHTML = sy2fDat;
    // 還元額
    txtKensinNyukinKangenKin.innerHTML = Other.KingakuFormat(nKangen);
    //txtKensinNyukinKangenKin.innerHTML = (nKangen);

    // 値引き
    // 値引き
    var nNebiki = 0;
    if (sysfDat.mKnebFlg == 1) {
        // 漢の値引き有り
        nNebiki = GasRaterCom.calcNebiki(sysfDat, lstKnebDat);
    }
    txtKensinNyukinNebiki.innerHTML = Other.KingakuFormat(nNebiki);
    //txtKensinNyukinNebiki.innerHTML = (nNebiki);

    // その他売上
    var nEtcUri = mKokfDat.mUrikin;
    var nEtcUriTax = mKokfDat.mUriTax;
    if (mKokfDat.mKenSumi) {
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
    if (kouserDat.mHyc5 == 1 && ko2fDat.mGashyb > 0 && mKokfDat.mHybseikyu != 2) {
        nEtcUri += ko2fDat.mUseKin;
        if (ko2fDat.mUseTaxku == 3) {
            nEtcUriTax += ko2fDat.mUseTax;
        }
    }

    txtKensinNyukinOtherUri.innerHTML = Other.KingakuFormat(nEtcUri);
    txtKensinNyukinOtherShohi.innerHTML = Other.KingakuFormat(nEtcUriTax);
    //txtKensinNyukinOtherUri.innerHTML = ((nEtcUri));
    //txtKensinNyukinOtherShohi.innerHTML = ((nEtcUriTax));

    if (mKokfDat.mSyuSumi) {
        // 13.02.13
        // 検針済み or 再入力の場合は入力して編集不可
        mEditAdjust.value = Other.KingakuFormat(mKokfDat.mAdjust);
        mEditInputReceipt.innerHTML = Other.KingakuFormat(mKokfDat.mInpReceipt);
        mEditReceipt.innerHTML = Other.formatDecial(mKokfDat.mReceipt);
        // mTeiseiFlg = getLongValue(mEditInputReceipt) != getLongValue(mEditReceipt);
        // mEditAdjust.innerHTML = ((mKokfDat.mAdjust));
        // mEditInputReceipt.innerHTML = ((mKokfDat.mInpReceipt));
        // mEditReceipt.innerHTML = ((mKokfDat.mReceipt));
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

    if (sy2fDat.mNyucho == 1) {
        if (kouserDat.m_sChocode != 0) {
            if (bdChosei != null) {
                txtKensinNyukinChosei.innerHTML = Other.cutSpace(
                    bdChosei.mName
                ).trim();
            }
        }
        if (kouserDat.m_sNyucode != 0) {
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
        // mEditReceipt.innerHTML = (lReceipt);
    }

    var mZandaka = mTotal + lAdjust - lReceipt; // 13.02.12
    if (lAzukari == lReceipt) {
        mTxtZandakaLabel.innerHTML = "差引残高";
        mTxtZandaka.innerHTML = Other.formatDecial(mZandaka);
        div_otsuri.classList.add("hidden");
        //mTxtZandaka.innerHTML = mZandaka;
    } else {
        div_otsuri.classList.remove("hidden");
        txtKensinNyukinOtsuri.innerHTML = Other.formatDecial(lAzukari - lReceipt);
        // mTxtZandakaLabel.innerHTML = "おつり";
        // mTxtZandaka.innerHTML = (Other.KingakuFormat(lAzukari - lReceipt));
        mTxtZandaka.innerHTML = Other.formatDecial(mZandaka);
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
    if (mUserData.getSysfDat().mLesUmu != 0) {
        //個別指定の顧客
        if (mUserData.getKouserDat().m_nKoubetsu == 1) {
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
        mKokfDat.mHiwari = mDays;
        mKokfDat.mKenSumi = true;
        mKokfDat.mKMonth = kensin_date.getMonth() + 1;
        mKokfDat.mKDate = kensin_date.getDate();

        mKokfDat.mNowMeter =
            Other.getNumFromString(mTxtNowMeter.value) * 10; 
        mKokfDat.mGasUse = m_nGasuse;
        mKokfDat.mFee = parseInt(Other.getNumFromString(mTxtGasPay.textContent));

        if (gasfDat.mTaxDiv == 3) {
            mKokfDat.mConTax = parseInt(
                Other.getNumFromString(mTxtGasTax.textContent)
            );
        } else {
            mKokfDat.mConTax = 0;
        }
        if (sysfDat.mKnebFlg == 1) {
            // 値引き
            // GasRaterCom.calcGasWaribiki(this, sysfDat, mUserData.getmKokfDat(), mUserData.getKnebiDat(), mUserData.getKo2fDat(), sy2fDat, kouserDat, mUserData.getGasfDat());
        }
        // 還元
        // GasRaterCom.calcGasKangen(mKokfDat, mUserData.getGasfDat(), sysfDat, sy2fDat, kouserDat);

        // 配送使用量の計算
        if (mKokfDat.mSupplyForm != 2) {
            // 親以外
            mKokfDat.mKhaiSs = mKokfDat.mNowMeter;
            mKokfDat.mKhaiSr = mKokfDat.mHaiMsr;
            if (mKokfDat.mHaiSs <= mKokfDat.mKhaiSs) {
                mKokfDat.mKhaiSr = mKokfDat.mKhaiSr + mKokfDat.mKhaiSs - mKokfDat.mHaiSs;
            } else {
                mKokfDat.mKhaiSr =
                    mKokfDat.mKhaiSr +
                    Math.pow(10, mKokfDat.mMtKeta + 1) +
                    mKokfDat.mKhaiSs -
                    mKokfDat.mHaiSs;
            }
        }

        if (
            sysfDat.mCheckHoan &&
            (mKokfDat.mGasKubun != 2 || sysfDat.mTenkenKgas == 1)
        ) {
            // 保安点検有
            // intent = new Intent(this, KensinHoanActivity.class);
            // intent.putExtra(DEFINE.PARCEL_USER_DATA, mUserData);
            // startActivityForResult(intent, KensinActivity.REQUEST_CODE_KENSIN_GROUP);
        } else if (sysfDat.mIfMoney) {
            // 保安点検無し、入金有
            // intent = new Intent(this, KensinNyukinActivity.class);
            // intent.putExtra(DEFINE.PARCEL_USER_DATA, mUserData);
            // startActivityForResult(intent, KensinActivity.REQUEST_CODE_KENSIN_GROUP);
        } else {
            // 保安点検無し→入金
            // 保安点検無し、入金無し
            // 印刷する、しないを確認する
            // saveAndCheckPrint(0L, 0L);
        }
    } catch (mex) {
        confirm.log(mex);
        //            ErrorDialog.createErrorDialog(this, mex.getErrorCode(), getResources().getString(R.string.appKensin), mex.getMessage());
    }
}

function setdataUchiWake() {
    document.getElementById("txtKensinNaiyakuCusName").innerHTML =
        Other.getClearString(mKokfDat.mName);
    var nKin = 0;
    // 前残印字
    if (sysfDat.mIfDemand) {
        // 前残印字有りの場合のみ
        nKin = mKokfDat.mPreBalance;
    }
    document.getElementById("txtKensinNaiyakuZandaka").innerHTML =
        Other.KingakuFormat(nKin);

    // 当月ガス料金
    document.getElementById("txtKensinNaiyakuGasRyokin").innerHTML =
        Other.KingakuFormat(mKokfDat.mProcGas);

    // 当月ガス料金消費税
    document.getElementById("txtKensinNaiyakuShohizei").innerHTML =
        Other.KingakuFormat(mKokfDat.mTaxGas);

    // その他売上
    document.getElementById("txtKensinNaiyakuOtherUri").innerHTML =
        Other.KingakuFormat(GasRaterCom.calcEtcUri(sysfDat, mKokfDat));

    // その他売上消費税
    document.getElementById("txtKensinNaiyakuOtherShohi").innerHTML =
        Other.KingakuFormat(GasRaterCom.calcEtcTax(sysfDat, mKokfDat));

    // 当月調整
    document.getElementById("txtKensinNaiyakuChosei").innerHTML =
        Other.KingakuFormat(mKokfDat.mTAdjust);
    // 当月入金
    document.getElementById("txtKensinNaiyakuNyukin").innerHTML =
        Other.KingakuFormat(mKokfDat.mTReceipt);

    // 当月請求金額
    document.getElementById("txtKensinNaiyakuSeikyu").innerHTML =
        Other.KingakuFormat(
            GasRaterCom.calcSeikyu(sysfDat, mKokfDat, sy2fDat, false)
        );

    if (sysfDat.mKnebFlg == 1) {
        // 漢の値引きシステム有り
        document.getElementById("txtKensinNaiyakuNebiki").innerHTML =
            Other.KingakuFormat(GasRaterCom.calcNebiki(knebDat));
    } else {
        // 値引き項目のビューを取り除く
        document.getElementById("nebiki").classList.add("hidden");
    }
}

//const div1_otsuri = document.querySelector("div_otsuri");

let seikyu = Other.getNumFromString(txtKensinNyukinNowSeikyu.textContent);
let zandaka = 0;
let nyuukin = 0;

//setZandaka(0, 0); // default zandaka

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
        if (teiseiNyuukin.value - Other.getNumFromString(Sashihiki_zandaka.textContent) > 0) {
            document.getElementById("txtErrorTeisei").style.display = "block";
            teiseiNyuukin.classList.add("text_red");
            document.getElementById("txtErrorTeiseiDetail").classList.add("text_red");
            document.getElementById("teisei-sumi").disabled = true;
        } else {
            document.getElementById("txtErrorTeisei").style.display = "none";
            teiseiNyuukin.classList.remove("text_red");
            document.getElementById("txtErrorTeiseiDetail").classList.remove("text_red");
            document.getElementById("teisei-sumi").disabled = false;
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
        keyPressAction(value, mKokfDat.mMtKeta, event);
    }
});

mTxtNowMeter.onchange = function () {
    var strSisin = mTxtNowMeter.value;

    if (!isNaN(strSisin)) {
        setGasInfo();
        afterCheckLease();
        setdataNiukinLayout();
        mTxtNowMeter.value = Other.Format(
            parseFloat(mTxtNowMeter.value) * 10,
            1
        );
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
        result = "-" + result;
    } else {
        result = Other.formatDecial(Other.getNumFromString(result));
    }
    return result;
}

//--------------Teisei button event--------------------->

teiseiBtn.onclick = function () {
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
        mTxtZandaka.textContent = total;
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
    var tienNhap = Number(Other.getNumFromString(mEditInputReceipt.textContent));
    if (moneyGasUse + moneyBonus > tienNhap) {
        moneyUserGet = tienNhap;
        mEditReceipt.textContent = Other.formatDecial(moneyUserGet);
    } else {
        moneyUserGet = moneyBonus + moneyGasUse;
        mEditReceipt.textContent = Other.formatDecial(moneyUserGet);
    }
}

function updatePrintData() {
    mKokfDat.mAdjust = getLongValue(mEditAdjust.value);
    mKokfDat.mReceipt = getLongValue(mEditReceipt.textContent);
    mKokfDat.mInpReceipt = getLongValue(mEditInputReceipt.value);
}




function sendDataToServer() {
    var dataSetting = JSON.parse(sessionStorage.getItem(StringCS.SETTINGDATA));
    var kensinDate_ss = sessionStorage.getItem(StringCS.KENSINDATE);
    var kensinDate = new Date(kensinDate);
    var m_oMetMeisaiDat = new Dat.MetMeisaiDat();
    var cusRec = mKokfDat.mCusRec;
    var dtSeiymd = kensinDate;
    var sysDate = new Date(sysfDat.mSysYear + "-" + sysfDat.mSysMonth + "-1");
    var dtSysymd = sysDate;
    var nOld_ss = mKokfDat.mPreMeter;
    var nNew_ss = mKokfDat.mNowMeter;
    var nKenmsr = mKokfDat.mBetwMeter;
    var nTancd = dataSetting.tancd;
    var strTanname = dataSetting.tanname;
    var nWrt_tancd = dataSetting.wrt_tancd;
    var dtWrt_ymd = kensinDate;

    m_oMetMeisaiDat.setValue(cusRec, dtSeiymd, dtSysymd, nOld_ss, nNew_ss, nKenmsr, nTancd, strTanname,
        nWrt_tancd, dtWrt_ymd);
    

    var mHnDenMeiDat = new Dat.HnDenMeiDat();
    mHnDenMeiDat.d_cusrec = mKokfDat.mCusRec;
    mHnDenMeiDat.d_cusrec = mKokfDat.mCusRec;
}


export {
    mKokfDat,
    sy2fDat,
    kouserDat,
    sysfDat,
    ko2fDat,
    gasfDat,
    kensin_date,
    m_nGasuse,
    mDays,
    mTotal,
    lstKnebDat,
    lstLeasHmefDat,
    bdChosei,
    bdNyukin,
    m_lstKnebDat,
    busfDat,
    hanfDat
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
    openKensinLayout();
    setdataNiukinLayout();
    setdataUchiWake();
    onclickAction();
}


onLoadAction();