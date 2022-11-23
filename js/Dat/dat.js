/*
	******  FINAL DATA  ******
*/
export var SysOption = {
	/** [00]:検針時入金 */
	NYUKIN: 0,
	/** [01]:検針時点検 */
	TENKEN: 1,
	/** [02]:検針時配送 */
	HAISOU: 2,
	/** [05]:警報器リース出力 */
	PRINT_LEAS_KEI: 5,
	/** [06]:分割金出力 */
	PRINT_BUNKATU: 6,
	/** [07]:その他売上出力 */
	PRINT_OTHER_URI: 7,
	/** [08]:前月請求額出力 */
	PRINT_ZSEI: 8,
	/** [09]:入金・調整出力 */
	PRINT_NYUCHO: 9,
	/** [10]:灯油出力 */
	PRINT_TOYU: 10,
	/** [11]:自動引落出力 */
	PRINT_JIFURI: 11,
	/** [12]:当月検針済み作成 */
	OUT_KENSIN_ZUMI: 12,
	/** [13]:依頼中の前残の非出力 */
	PRINT_ZENZAN_IRAI: 13,
	/** [14]:販売明細の非出力 */
	PRINT_HANMEISAI: 14,
	/** [15]:内税コメント非出力 */
	NOT_PRINT_UTIZEI: 15,
	/** [16]:自動検針区分非対応 */
	AUTO_KENSIN: 16,
	/** [17]:リース割賦残回数出力 */
	PRINT_ZANKAI_LEASKAPPU: 17,
	/** [19]:当月検針済み含まない */
	RADIO_NO_ADD: 19,
	/** [20]:使用伝票種類　１：専用伝票 */
	PAPER_TYPE: 20,
	/** [21]:社名・伝票出力 */
	PRINT_HANINFO: 21,
	/** [22]:銀行用コメント出力 */
	PRINT_COMMENT_BANK: 22,
	/** [23]:検針伝票ガス料金出力方法 */
	GASMEISAI_TYPE: 23,
	/** [24]:保安点検結果出力 */
	PRINT_HOAN: 24,
	/** [25]:検針伝票コメント出力 */
	PRINT_COMMENT: 25,
	/** [26]:配送伝票コメント出力 */
	PRINT_COMMENT_HAISOU: 26,
	/** [27]:納品書コメント出力 */
	PRINT_COMMENT_NOUHIN: 27,
	/** [28]:領収書コメント出力 */
	PRINT_COMMENT_RYOSHU: 28,
	/** [32]:控え出力 */
	PRINT_HIKAE: 32,
	/** [31]:顧客の滞納月表示フラグ */
	DISP_TAINOU: 31,
	/** [33]:単価印字フラグ */
	PRINT_TANKA: 33,
	/** [34]:販売店の振込先銀行情報印字フラグ */
	PRINT_HANBANK: 34,
	/** [35]:転送顧客最大数(*100件) */
	SEND_CUS_NUM: 35,
	/** [36]:宮野式(獲得ポイント)印字フラグ */
	PRINT_MIYANO_GET: 36,
	/** [37]:宮野式(使用ポイント)印字フラグ */
	PRINT_MIYANO_USE: 37,
	/** [38]:宮野式(累計ポイント)印字フラグ */
	PRINT_MIYANO_RUI: 38,
	/** [39]:ハイブリッド拡張用（ko2f)読込み用 */
	HYBRID_READ: 39
}


/*
	******  CLASS  ******
*/
export class KokfDat {
	constructor() {
		/** 漢字氏名 */
		this.mName = ""; // NAME
		/** 検針月 */
		this.mKMonth = 0;
		/** 検針日 */
		this.mKDate = 0;
		/** 今回入力：ガス使用量 */
		this.mGasUse = 0;
		/** 顧客区分　 */
		this.mGasKubun = 0;
		/** 検針済み区分 */
		this.mKenSumi = true;
		/** 今回入力：今回指針 */
		this.mNowMeter = 0;
		/** 前回指針 */
		this.mPreMeter = 0;
		/** 前回検針日付:年 */
		this.mPuseYear = 0;
		/** 前回検針日付：月 */
		this.mPuseMonth = 0;
		/** 前回検針日付：日 */
		this.mPuseDate = 0;
		/** ガス料金No */
		this.mGasDiv = 0;
		/** 今回入力：消費税 */
		this.mConTax = 0;
		/** 中間使用量(検針) */
		this.mBetwMeter = 0;
		/** 前回使用量 */
		this.mPreUse = 0;
		/** 今回入力：金額 */
		this.mFee = 0;
		/** 日割り日数 */
		this.mHiwari = 0;
		/** 当月：消費税(分割) */
		this.mTaxDiv = 0;
		/** 締日処理フラグ */
		this.mSimeF = 0;
		/** 開栓日付：年 */
		this.mKaiYear = 0;
		/** 開栓日付：月 */
		this.mKaiMonth = 0;
		/** 開栓日付：日 */
		this.mKaiDate = 0;
		/** ガス料金内訳データ */
		this.mKtpcdat = null;
		/** 供給区分 */
		this.mSupplyForm = 0;
		/** 契約料金(基本) */
		this.mGasBase = 0; // GASBASE
		/** メーター桁数 */
		this.mMtKeta = 0;  //MTKETA
		/** 契約料金(単価) */
		this.mGasUnit = 0;
		/** ハイブリッド請求フラグ */
		this.mHybseikyu = 0;
		/** 今回入力：その他売上金額 */
		this.mUrikin = 0;
		/** 今回入力：その他売上消費税 */
		this.mUriTax = 0;
		/** 今回入力：還元額 */
		this.mReduce = 0;
		/** 今回入力：還元額の消費税 */
		this.mReduceTax = 0;
		/** 顧客灯油 */
		this.mKotfDat = null;
		/** 当月：遅収料金 */
		this.mProcTisyuu = 0;
		/** 当月：消費税(遅収料金) */
		this.mTaxTisyuu = 0;
		/** 前月残高 */
		this.mPreBalance = 0;
		/** 当月：調整額 */
		this.mTAdjust = 0;
		/** 当月：入金額 */
		this.mTReceipt = 0;
		/** 当月：売上額(リース) */
		this.mProcLease = 0;
		/** 当月：消費税(リース) */
		this.mTaxLease = 0;
		/** 当月：売上額(分割金) */
		this.mProcDiv = 0;
		/** 当月：売上額(灯油) */
		this.mProcLoil = 0;
		/** 当月：消費税(灯油) */
		this.mTaxLoil = 0;
		/** 当月：売上額(その他) */
		this.mProcEtc = 0;
		/** 当月：消費税(その他) */
		this.mTaxEtc = 0;
		/** 当月：売上額(ガス) */
		this.mProcGas = 0;
		/** 当月：消費税(ガス) */
		this.mTaxGas = 0;
		/** 今回入力：入金額 */
		this.mReceipt = 0;
		/** 今回入力：調整額 */
		this.mAdjust = 0;
		/** 集金済み区分 */
		this.mSyuSumi = true;
		/** 預かり金 */
		this.mInpReceipt = 0;
		/** 住所 */
		this.mAdd = "";
		/** 顧客コード */
		this.mCusCode = "";
		/** 伝票用氏名1 */
		this.mSName0 = "";
		/** 伝票用氏名2 */
		this.mSName1 = "";
		/** 呼称 */
		this.mKName = "";
		/** 前年同月使用量データ */
		this.mZyksDat = null;
		/** 今回入力：保安点検 */
		this.mHoan = "";
		/** 振替:銀行コード */
		this.mBankCode = 0;
		/** 検針対象区分 */
		this.mNoKensin = true;
		/** 顧客レコード */
    	this.mCusRec = 0;
	}

	setValue(Name, KMonth, KDate, GasUse, GasKubun, KenSumi, NowMeter, PreMeter, PuseYear, PuseMonth, PuseDate,
		GasDiv, ConTax, BetwMeter, PreUse, Fee, Hiwari, TaxDiv, SimeF, KaiYear, KaiMonth, KaiDate, Ktpcdat,
		SupplyForm, GasBase, MtKeta, GasUnit, Hybseikyu, Urikin, UriTax, Reduce, ReduceTax, KotfDat, ProcTisyuu,
		TaxTisyuu, PreBalance, TAdjust, TReceipt, ProcLease, TaxLease, ProcDiv, ProcLoil, TaxLoil, ProcEtc,
		TaxEtc, ProcGas, TaxGas, Receipt, Adjust, SyuSumi, InpReceipt, Add, CusCode, SName0,
		SName1, KName, ZyksDat, Hoan, BankCode, NoKensin, mCusRec) {

		var data = new KokfDat();

		data.mName = Name;
		data.mKMonth = KMonth;
		data.mKDate = KDate;
		data.mGasUse = GasUse;
		data.mGasKubun = GasKubun;
		data.mKenSumi = KenSumi;
		data.mNowMeter = NowMeter;
		data.mPreMeter = PreMeter;
		data.mPuseYear = PuseYear;
		data.mPuseMonth = PuseMonth;
		data.mPuseDate = PuseDate;
		data.mGasDiv = GasDiv;
		data.mConTax = ConTax;
		data.mBetwMeter = BetwMeter;
		data.mPreUse = PreUse;
		data.mFee = Fee;
		data.mHiwari = Hiwari;
		data.mTaxDiv = TaxDiv;
		data.mSimeF = SimeF;
		data.mKaiYear = KaiYear;
		data.mKaiMonth = KaiMonth;
		data.mKaiDate = KaiDate;
		data.mKtpcdat = Ktpcdat;
		data.mSupplyForm = SupplyForm;
		data.mGasBase = GasBase;
		data.mMtKeta = MtKeta;
		data.mGasUnit = GasUnit;
		data.mHybseikyu = Hybseikyu;
		data.mUrikin = Urikin;
		data.mUriTax = UriTax;
		data.mReduce = Reduce;
		data.mReduceTax = ReduceTax;
		data.mKotfDat = KotfDat;
		data.mProcTisyuu = ProcTisyuu;
		data.mTaxTisyuu = TaxTisyuu;
		data.mPreBalance = PreBalance;
		data.mTAdjust = TAdjust;
		data.mTReceipt = TReceipt;
		data.mProcLease = ProcLease;
		data.mTaxLease = TaxLease;
		data.mProcDiv = ProcDiv;
		data.mProcLoil = ProcLoil;
		data.mTaxLoil = TaxLoil;
		data.mProcEtc = ProcEtc;
		data.mTaxEtc = TaxEtc;
		data.mProcGas = ProcGas;
		data.mTaxGas = TaxGas;
		data.mReceipt = Receipt;
		data.mAdjust = Adjust;
		data.mSyuSumi = SyuSumi;
		data.mInpReceipt = InpReceipt;
		data.mAdd = Add;
		data.mCusCode = CusCode;
		data.mSName0 = SName0;
		data.mSName1 = SName1;
		data.mKName = KName;
		data.mZyksDat = ZyksDat;
		data.mHoan = Hoan;
		data.mBankCode = BankCode;
		data.mNoKensin = NoKensin;
		data.mCusRec = mCusRec;

		return data
	}
}


export class SysfDat {
	constructor() {
		/** 管ガス:最低検針日数 */
		this.mKgasDays0 = 0;
		/** 管ガス:最大検針日数 */
		this.mKgasDays1 = 0;
		/** 管ガス:閉開栓時日数 */
		this.mKgasDays2 = 0;
		/** 消費税変更日付 */
		this.mTax_yy = 0;
		this.mTax_mm = 0;
		this.mTax_dd = 0;
		/** 消費税率 */
		this.mConsumTax = 0;
		/** 消費税変更旧税率 */
		this.mTaxr_old = 0;
		this.mTaxr_new = 0;
		/** ガス料金透明化対応フラグ */
		this.mVisibleGas = 0;
		/** ガス料金透明化設備料金対応フラグ */
		this.mVisibleFacility = 0;
		/** リース計上機能有無 */
		this.mLesUmu = 0;
		/** 売上用端数処理:加算 */
		this.mFracAddKin = 0;
		/** 売上用端数処理:乗算 */
		this.mFracMulKin = 0;
		/** 消費税:端数処理(加算) */
		this.mFracAddTax = 0;
		/** 消費税:端数処理(乗算) */
		this.mFracMulTax = 0;
		/** システム年 */
		this.mSysYear = 0;
		/** 処理日付(月) */
		this.mMonth = 0;
		/** 処理日付(日) */
		this.mDate = 0;
		/** 差益還元:有無 */
		this.mIfReduce = false;
		/** 商品消費税の使用依頼 */
		this.mShoTaxcom = 0;
		/** 入力有無:保安点検 */
		this.mCheckHoan = false;
		/** 入力有無:入金 */
		this.mIfMoney = false;
		/** 簡ガス日常点検有無 */
		this.mTenkenKgas = 0;
		/** 灯油検針フラグ */
		this.m_isToyukeninFlg = false;
		/** 使用率チェック:倍率 */
		this.mSrChkr = [];
		/** 使用率チェック:使用率 */
		this.mSrChkm = [];
		/** 値引きシステムフラグ */
		this.mKnebFlg = 0;
		/** 伝票出力フラグ:入金・調整 */
		this.mIfAdjust = false;
		/** 伝票出力フラグ:警報機リース */
		this.mIfAlarm = false;
		/** 伝票出力フラグ:分割金 */
		this.mIfDiv = false;
		/** 伝票出力フラグ:灯油 */
		this.mIfLampoil = false;
		/** 伝票出力フラグ:その他売上 */
		this.mIfProceeds = false;
		/** 伝票出力フラグ:前月請求額 */
		this.mIfDemand = false;
		/** ガス料金透明化設定データ */
		this.mGtpcDat = null;
		/** オプションフラグ */
		this.mHtOption = [];
		/** コンパックＲより追加　取引区分、商品コード判別用 */
		this.mSnvalue = 0;
		/** 伝票出力フラグ:ユーザー名(店舗名) */
		this.mIfChitUser = false;
		/** システム月 */
    	this.mSysMonth = 0;  // Sys.hansysym
	}

	setValue(mKgasDays0, mKgasDays1, mKgasDays2, mTax_yy, mTax_mm, mTax_dd, mConsumTax, mTaxr_old, mTaxr_new, mVisibleGas, mVisibleFacility, mLesUmu,
		mFracAddKin, mFracMulKin, mFracAddTax, mFracMulTax, mSysYear, mMonth, mDate, mIfReduce, mShoTaxcom, mCheckHoan, mIfMoney, mTenkenKgas,
		m_isToyukeninFlg, mSrChkr, mSrChkm, mKnebFlg, mIfAdjust, mIfAlarm, mIfDiv, mIfLampoil, mIfProceeds, mIfDemand, mGtpcDat, mHtOption, mSnvalue, mIfChitUser , mSysMonth) {
		var data = new SysfDat();

		data.mKgasDays0 = mKgasDays0;
		data.mKgasDays1 = mKgasDays1;
		data.mKgasDays2 = mKgasDays2;
		data.mTax_yy = mTax_yy;
		data.mTax_mm = mTax_mm;
		data.mTax_dd = mTax_dd;
		data.mConsumTax = mConsumTax;
		data.mTaxr_old = mTaxr_old;
		data.mTaxr_new = mTaxr_new;
		data.mVisibleGas = mVisibleGas;
		data.mVisibleFacility = mVisibleFacility;
		data.mLesUmu = mLesUmu;
		data.mFracAddKin = mFracAddKin;
		data.mFracMulKin = mFracMulKin;
		data.mFracAddTax = mFracAddTax;
		data.mFracMulTax = mFracMulTax;
		data.mSysYear = mSysYear;
		data.mMonth = mMonth;
		data.mDate = mDate;
		data.mIfReduce = mIfReduce;
		data.mShoTaxcom = mShoTaxcom;
		data.mCheckHoan = mCheckHoan;
		data.mIfMoney = mIfMoney;
		data.mTenkenKgas = mTenkenKgas;
		data.m_isToyukeninFlg = m_isToyukeninFlg;
		data.mSrChkr = mSrChkr;
		data.mSrChkm = mSrChkm;
		data.mKnebFlg = mKnebFlg;
		data.mIfAdjust = mIfAdjust;
		data.mIfAlarm = mIfAlarm;
		data.mIfDiv = mIfDiv;
		data.mIfLampoil = mIfLampoil;
		data.mIfProceeds = mIfProceeds;
		data.mIfDemand = mIfDemand;
		data.mGtpcDat = mGtpcDat;
		data.mHtOption = mHtOption;
		data.mSnvalue = mSnvalue;
		data.mIfChitUser = mIfChitUser;
		data.mSysMonth = mSysMonth;
		return data;
	}
}


export class Sy2fDat {
	constructor() {
		/** 中圧係数での使用量端数処理(0:切り捨て, 1:四捨五入, 2:切り上げ) */
		this.mCaHas;
		/** 中圧ガス料金計算有無 */
		this.mCaFlg;
		/** 差益還元品番コード */
		this.mKangHbcd;
		/** 差益還元コード */
		this.mKangHcd;
		/** 入金・調整取引区分設定フラグ */
		this.mNyucho;
		/** オプション3 */
		this.mSysOption;
		/** 調整額コード */
		this.mSysfHmcd13;
		/** 次回予定日印字フラグ */
		this.mJifuriNext;
		/** 軽減税率対応 */
		this.mSyskeigen;
	}

	setValue(mCaHas, mCaFlg, mKangHbcd, mKangHcd, mNyucho, mSysOption, mSysfHmcd13, mJifuriNext, mSyskeigen) {
		var data = new Sy2fDat();

		data.mCaHas = mCaHas;
		data.mCaFlg = mCaFlg;
		data.mKangHbcd = mKangHbcd;
		data.mKangHcd = mKangHcd;
		data.mNyucho = mNyucho;
		data.mSysOption = mSysOption;
		data.mSysfHmcd13 = mSysfHmcd13;
		data.mJifuriNext = mJifuriNext;
		data.mSyskeigen = mSyskeigen;
		return data;
	}
}


export class Ko2fDat {
    /** ハイブリッドカウンタ数 */
    kHyb_MAX = 4;

	constructor() {
		/** ハイブリッド料金区分 */
		this.mGashyb = 0;
		/** カウント値引:税区分 */
		this.mChoTaxku = 0;
		/** カウント値引消費税 */
		this.mChoTax = 0;
		/** カウンタ使用料 */
		this.mUseKin = 0;
		/** カウンター使用料:税区分 */
		this.mUseTaxku = 0;
		/** カウンタ使用料消費税 */
		this.mUseTax = 0;
		/** カウント値引 */
		this.mChoKin = 0;
	}

	setValue(mGashyb, mChoTaxku, mChoTax, mUseKin, mUseTaxku, mUseTax, mChoKin) {
		var data = new Ko2fDat();

		data.mGashyb = mGashyb;
		data.mChoTaxku = mChoTaxku;
		data.mChoTax = mChoTax;
		data.mUseKin = mUseKin;
		data.mUseTaxku = mUseTaxku;
		data.mUseTax = mUseTax;
		data.mChoKin = mChoKin;
		return data;
	}
}


export class KouserDat {
	constructor() {
		/** 中圧係数 */
		this.m_nChuatu = 0;
		/** 個別検針顧客 */
		this.m_nKoubetsu = 0;
		/** ハイブリッドカウンター有無 */
		this.mHyc5 = 0;
		/** 調整取引区分 */
		this.m_sChocode = 0;
		/** 入金取引区分 */
		this.m_sNyucode = 0;
		/** 次回振替予定日（年） */
		this.m_nNextTransYear = 0;
		/** 次回振替予定日（月） */
		this.m_nNextTransMonth = 0;
		/** 次回振替予定日（日） */
		this.m_nNextTransDay = 0;
	}


	setValue(m_nChuatu, m_nKoubetsu, mHyc5, m_sChocode, m_sNyucode, m_nNextTransYear, m_nNextTransMonth, m_nNextTransDay) {
		var data = new KouserDat();

		data.m_nChuatu = m_nChuatu;
		data.m_nKoubetsu = m_nKoubetsu;
		data.mHyc5 = mHyc5;
		data.m_sChocode = m_sChocode;
		data.m_sNyucode = m_sNyucode;
		data.m_nNextTransYear = m_nNextTransYear;
		data.m_nNextTransMonth = m_nNextTransMonth;
		data.m_nNextTransDay = m_nNextTransDay;
		return data;
	}
}


export class KtpcDat {
	constructor() {
		/** 基本料金 */
		this.m_nBasekin = 0;
		/** 従量料金 */
		this.m_nAddkin = 0;
		/** 設備料金 */
		this.m_nFacilitykin = 0;
	}


	setValue(Basekin, Addkin, Facilitykin) {
		var data = new KtpcDat();

		data.m_nBasekin = Basekin;
		data.m_nAddkin = Addkin;
		data.m_nFacilitykin = Facilitykin;
		return data;
	}
}


export class GasfDat {
	constructor() {
		/** 計算方法 */
		this.mSum = 0;
		/** 料金表種別 */
		this.mSyu = 0;
		/** 端数処理1：加算 */
		this.mFrac1Add = 0;
		/** 端数処理2:加算 */
		this.mFrac2Add = 0;
		/** 端数処理1:乗算 */
		this.mFrac1Mult = 0;
		/** 端数処理2:乗算 */
		this.mFrac2Mult = 0;
		/** 増減率 */
		this.mRiseFall = 0;
		/** ガス料金ステップデータ */
		this.m_lstGstpDat = null;
		/** 消費税区分 */
		this.mTaxDiv = 0;
		/** 消費税端数処理：加算 */
		this.mTaxAdd = 0;
		/** 消費税端数処理：乗算 */
		this.mTaxMult = 0;
		/** 調整単価 */
		this.mChoTanka = 0;
		/** ガス料金拡張データ */
		this.mGextDat = null;
	}

	setValue(mSum, mSyu, mFrac1Add, mFrac2Add, mFrac1Mult, mFrac2Mult, mRiseFall, m_lstGstpDat, mTaxDiv, mTaxAdd, mTaxMult, mChoTanka, mGextDat) {
		var data = new GasfDat();

		/** 計算方法 */
		data.mSum = mSum;
		/** 料金表種別 */
		data.mSyu = mSyu;
		/** 端数処理1：加算 */
		data.mFrac1Add = mFrac1Add;
		/** 端数処理2:加算 */
		data.mFrac2Add = mFrac2Add;
		/** 端数処理1:乗算 */
		data.mFrac1Mult = mFrac1Mult;
		/** 端数処理2:乗算 */
		data.mFrac2Mult = mFrac2Mult;
		/** 増減率 */
		data.mRiseFall = mRiseFall;
		/** ガス料金ステップデータ */
		data.m_lstGstpDat = m_lstGstpDat;
		/** 消費税区分 */
		data.mTaxDiv = mTaxDiv;
		/** 消費税端数処理：加算 */
		data.mTaxAdd = mTaxAdd;
		/** 消費税端数処理：乗算 */
		data.mTaxMult = mTaxMult;
		/** 調整単価 */
		data.mChoTanka = mChoTanka;
		/** ガス料金拡張データ */
		data.mGextDat = mGextDat;
		return data;
	}
}


export class GstpDat {
	constructor() {
		/** 上限値 */
		this.mUplimit = 0;
		/** 加算値 */
		this.mAdd = 0;
		/** 基準料金 */
		this.mBase = 0;
	}

	setValue(mUplimit, mAdd, mBase) {
		var data = new GstpDat();

		data.mUplimit = mUplimit;
		data.mAdd = mAdd;
		data.mBase = mBase;
		return data;
	}
}


export class HanfDat {
	constructor() {
		/** 名称 */
		this.mName = "";
		/** 電話番号 */
		this.mTel = "";
		/** FAX */
		this.mFax = null;
		/** 住所1 */
		this.mAdd1 = "";
		/** 住所2 */
		this.mAdd2 = null;
		/** 住所3 */
		this.Add3 = null;
	}

	setValue(mName, mTel, mFax, mAdd1, mAdd2, Add3) {
		var data = new HanfDat();

		data.mName = mName;
		data.mTel = mTel;
		data.mFax = mFax;
		data.mAdd1 = mAdd1;
		data.mAdd2 = mAdd2;
		data.Add3 = Add3;
		return data;
	}
}


export class KnebDat {
	constructor() {
		/** コード */
		this.m_nCode = 0;
		/** 有無 */
		this.m_nUmu = 0;
		/** 結果 */
		this.m_nRes = 0;
		/** 金額 */
		this.m_nKin = 0;
		/** 消費税 */
		this.m_nTax = 0;
	}

	setValue(m_nCode, m_nUmu, m_nRes, m_nKin, m_nTax) {
		var data = new KnebDat();

		data.m_nCode = m_nCode;
		data.m_nUmu = m_nUmu;
		data.m_nRes = m_nRes;
		data.m_nKin = m_nKin;
		data.m_nTax = m_nTax;
		return data;
	}
}


export class HmefDat {
	constructor() {
		/** 使用有無 */
		this.mUsef = false;
		/** 明細種別 0:締後、1:締前、9:ﾊﾝﾃﾞｨ、2：残高明細 */
		this.mHmeKind = 0;
		/** リース明細かどうか */
		this.mLeasKind = 0;
		/** 金額 */
		this.mKin = 0;
		/** 消費税額 */
		this.mTax = 0;
		/** 品目No >=100 */
		this.mHmCode = 0;
		/** 消費税区分 */
		this.mTaxKu = 0;
		/** 消費税率 */
		this.mTaxR = 0;
		/** 品番No 0 ～ 99 */
		this.mHbCode = 0;
		/** 伝票日付(月) */
		this.mDenm = 0;
		/** 伝票日付(日) */
		this.mDend = 0;
		/** 品目名称 (漢字12文字) */
		this.mHmName = "";
		/** 数量 */
		this.mSuryo = 0;
		/** 単価 */
		this.mTanka = 0;
		/** 軽減税率区分 */
		this.mKeigenKubun = 0;
		/** 品番印字有無 */
		this.mHbnmPrn = 0;
		/** 品番名称 (半角24文字) */
		this.mHbName = "";
	}

	setValue(mUsef, mHmeKind, mLeasKind, mKin, mTax, mHmCode, mTaxKu, mTaxR, mHbCode, mDenm,
		mDend, mHmName, mSuryo, mTanka, mKeigenKubun, mHbnmPrn, mHbName) {
		var data = new HmefDat();

		data.mUsef = mUsef;
		data.mHmeKind = mHmeKind;
		data.mLeasKind = mLeasKind;
		data.mKin = mKin;
		data.mTax = mTax;
		data.mHmCode = mHmCode;
		data.mTaxKu = mTaxKu;
		data.mTaxR = mTaxR;
		data.mHbCode = mHbCode;
		data.mDenm = mDenm;
		data.mDend = mDend;
		data.mHmName = mHmName;
		data.mSuryo = mSuryo;
		data.mTanka = mTanka;
		data.mKeigenKubun = mKeigenKubun;
		data.mHbnmPrn = mHbnmPrn;
		data.mHbName = mHbName;
		return data;
	}
}


export class KotfDat {
	constructor() {
		/** 灯油検針済み区分(0:未, 1:済) */
		this.m_bKen_sumi = 0;
		/** 灯油料金 */
		this.m_nFee = 0;
		/** 灯油消費税額 */
		this.m_nCon_tax = 0;
	}

	setValue(m_bKen_sumi, m_nFee, m_nCon_tax) {
		var data = new KotfDat();

		data.m_bKen_sumi = m_bKen_sumi;
		data.m_nFee = m_nFee;
		data.m_nCon_tax = m_nCon_tax;
		return data;
	}
}


export class GtpcDat {
	constructor() {
		/** ガス料金印字 */
		this.m_nPrintGasRyokinSiki = 0;
		/** ガス料金総額印字 */
		this.m_nPrintGasRyokinTotal = 0;
		/** 日割りコメント印字 */
		this.m_nPrintHiwariComment = 0;
		/** 日割りコメント1 */
		this.m_strHiwariComment_0 = null;
		/** 日割りコメント2 */
		this.m_strHiwariComment_1 = null;
		/** 前年同月使用量印字フラグ */
		this.m_nPrintZenyearkensr = 0;
		/** 検針伝票タイトル */
		this.m_strTitle_0 = null;
		/** 検針伝票タイトル（領収書） */
		this.m_strTitle_1 = null;
		/** 検針伝票タイトル（控え） */
		this.m_strTitle_2 = null;
		/** 検針伝票タイトル（領収書控え） */
		this.m_strTitle_3 = null;
		/** ガス料金式印字パターン(0: 秋元式, 1: 大口式) */
		this.m_nPrintGastablePtn = 0;
	}

	setValue(m_nPrintGasRyokinSiki, m_nPrintGasRyokinTotal, m_nPrintHiwariComment, m_strHiwariComment_0, m_strHiwariComment_1,
		m_nPrintZenyearkensr, m_strTitle_0, m_strTitle_1, m_strTitle_2, m_strTitle_3, m_nPrintGastablePtn) {

		var data = new GtpcDat();

		data.m_nPrintGasRyokinSiki = m_nPrintGasRyokinSiki;
		data.m_nPrintGasRyokinTotal = m_nPrintGasRyokinTotal;
		data.m_nPrintHiwariComment = m_nPrintHiwariComment;
		data.m_strHiwariComment_0 = m_strHiwariComment_0;
		data.m_strHiwariComment_1 = m_strHiwariComment_1;
		data.m_nPrintZenyearkensr = m_nPrintZenyearkensr;
		data.m_strTitle_0 = m_strTitle_0;
		data.m_strTitle_1 = m_strTitle_1;
		data.m_strTitle_2 = m_strTitle_2;
		data.m_strTitle_3 = m_strTitle_3;
		data.m_nPrintGastablePtn = m_nPrintGastablePtn;
		return data;
	}
}


export class ZyksDat {
	constructor() {
		/** 使用量 */
		this.m_nSr = 0;
		/** 伝票日付(年) */
		this.m_nDenymd_year = 0;
		/** 伝票日付(月) */
		this.m_nDenymd_month = 0;
		/** 伝票日付(日) */
		this.m_nDenymd_day = 0;
	}

	setValue(m_nSr, m_nDenymd_year, m_nDenymd_month, m_nDenymd_day) {
		var data = new ZyksDat();

		data.m_nSr = m_nSr;
		data.m_nDenymd_year = m_nDenymd_year;
		data.m_nDenymd_month = m_nDenymd_month;
		data.m_nDenymd_day = m_nDenymd_day;
		return data;
	}
}


export class BusfDat {
	constructor() {
		/** 使用有無 */
		this.mUsef = false;
		/** 品目No(取引区分No) */
		this.mHinno = 0;
		/** 名称 */
		this.mName = "";
		/** 符号 */
		this.mSign = 0;
		/** 種別 */
		this.mKind = 0;
	}

	setValue(mUsef, mHinno, mName, mSign, mKind) {
		var data = new BusfDat();

		data.mUsef = mUsef;
		data.mHinno = mHinno;
		data.mName = mName;
		data.mSign = mSign;
		data.mKind = mKind;
		return data;
	}
}


export class GextDat {
	constructor() {
		/** ガス基本料金 */
		this.m_nBasekin = 0;
		/** ガス設備料 */
		this.m_nFacilitykin = 0;
		/** ガス料金式印字フラグ */   				//can tim hieu cach doc bien nay
		this.m_nPrintGasryokinSiki = 1;
	}

	setValue(mUsef, mHinno, mName, mSign, mKind) {
		var data = new GextDat();

		data.mUsef = mUsef;
		data.mHinno = mHinno;
		data.mName = mName;
		data.mSign = mSign;
		data.mKind = mKind;
		return data;
	}
}


export class TaxDat {
	constructor() {
		/** ガス内税 */
		this.mGUchiZei = 0,
			/** ガス外内税 */
			this.mUchiZei = 0
	}

	setValue(mGUchiZei, mUchiZei) {
		var data = new TaxDat();

		data.mGUchiZei = mGUchiZei;
		data.mUchiZei = mUchiZei;
		return data;
	}
}


export class KensinData {
	constructor() {
		/** 今回指針 */
		this.m_Sisin = 0;
		/** 前回検針月 */
		this.m_KensinPrevMonth = 0;
		/** 前回検針日 */
		this.m_KensinPrevDay = 0;
		/** 前回指針 */
		this.m_SisinPrev = 0;
		/** 今回使用量 */
		this.m_NowUse = 0;
		/** 前回使用量 */
		this.m_PreUse = 0;
		/** ガス売上 */
		this.m_GasPay = 0;
		/** ガス消費税 */
		this.m_GasTax = 0;
		/** 調整費 */
		this.m_Reduce = 0;
		/** メーター取替有無 */
		this.m_bChgMeter = false;
		/** メーター取替月 */
		this.m_ChgMonth = 0;
		/** メーター取替日 */
		this.m_ChgDay = 0;
		/** メーター取替前回指針 */
		this.m_ChgZsisin = 0;
		/** メーター取り外し指針 */
		this.m_ChgSisin = 0;
		/** 中間使用量 */
		this.m_ChukanSur = 0;
		/** 前月残高 */
		this.m_PreReceipt = 0;
		/** 本日売上 */
		this.m_HmDay = 0;
		/** 当月売上 */
		this.m_HmMonth = 0;
		/** 今回請求額 */
		this.m_Receipt = 0;
		/** 預かり金 */
		this.m_Azukarikin = 0;
		/** 入金 */
		this.m_Nyukin = 0;
		/** 調整 */
		this.m_Chosei = 0;
		/** 残高 */
		this.m_Zandaka = 0;
		/** CNポイント使用フラグ */
		this.mCnp = false;
		/** CNポイントデータ */
		this.mCnpCusDat = null;
		/** CNポイント本会員用コメント */
		this.mCnpMemberCmt = null;
		/** CNポイント仮会員用コメント */
		this.mCnpTempCmt = null;
		/** 前回使用量印字フラグ */
		this.mPrnZensr = false;
		/** ガス基本料金印字フラグ */
		this.mPrnGasBaseKin = false;
		/** ガス基本料金 */
		this.mGasBaseKin = 0;
		/** ガス契約単価 */
		this.mGasAddKin = 0;
		/** 前年同月使用量 */
		this.m_nZenYearKenSr = 0;
		/** ガス料金総額 */
		this.m_nGasTotalKin = 0;
		/** ガス料金総額(税抜き) */
		this.m_nGasTotalKinWithoutTax = 0;
		/** 設備料金 */
		this.m_nFacilityKin = 0;
		/** ガス料金総額印字フラグ */
		this.m_bPrintGasRyokinTotal = false;
		/** ガス料金式印字フラグ */
		this.m_bPrintGasRyokinSiki = false;
		/** 設備料金印字フラグ */
		this.m_bPrintGasFacilityKin = false;
		/** 日割りコメント印字フラグ */
		this.m_bPrintHiwariComment = false;
		/** 前年同月使用量印字フラグ */
		this.m_bPrintZenYearKenSr = false;
		/** 日割りコメント１ */
		this.m_strHiwariComment_0 = null;
		/** 日割りコメント２ */
		this.m_strHiwariComment_1 = null;
		/** ガス料金データ */
		this.m_GasfDat = null;
		/** ガス料金表開始インデックス */
		this.m_nStartIdx = 0;
		/** 一律料金フラグ */
		this.m_bSingleStep = false;
		/** 伝票印字パターン */
		this.m_nPrintGasRyokinSikiPtn = 0;
		/** ハイブリッド料金データ */
		this.mHybfDat = null;
		/** ハイブリッドカウンタ―名称 */
		this.mCounterName = null;
		/** ハイブリッドフラグ */
		this.m_isHybrid = false;
		/** 顧客ハイブリッドデータ */
		this.mKo2fDat = null;
		/** ガス料金のみ */
		this.m_nOnlyGas = 0;
		/** ガス料金透明化フラグ */
		this.m_isVisibleGas = false;
		/** 通常使用量 */
		this.m_nNorSr = 0;
		/** ハイブリッドガス使用量 */
		this.m_nHybGasUse = null;
		/** 顧客灯油データ */
		this.mKotfDat = null;
		/** 灯油料金分割印字 */
		this.m_isToyuKinSep = false;
		/** 検針のみ印刷 */
		this.m_isPrintKensin = false;
		/** 灯油のみ印刷 */
		this.m_isPrintToyu = false;
		/** 灯油単価 */
		this.m_nLoilUnit = 0;
	}

	setValue(m_Sisin, m_KensinPrevMonth, m_KensinPrevDay, m_SisinPrev, m_NowUse, m_PreUse, m_GasPay, m_GasTax, m_Reduce,
		m_bChgMeter, m_ChgMonth, m_ChgDay, m_ChgZsisin, m_ChgSisin, m_ChukanSur, m_PreReceipt, m_HmDay, m_HmMonth, m_Receipt,
		m_Azukarikin, m_Nyukin, m_Chosei, m_Zandaka, mCnp, mCnpCusDat, mCnpMemberCmt, mCnpTempCmt, mPrnZensr, mPrnGasBaseKin,
		mGasBaseKin, mGasAddKin, m_nZenYearKenSr, m_nGasTotalKin, m_nGasTotalKinWithoutTax, m_nFacilityKin, m_bPrintGasRyokinTotal,
		m_bPrintGasRyokinSiki, m_bPrintGasFacilityKin, m_bPrintHiwariComment, m_bPrintZenYearKenSr, m_strHiwariComment_0,
		m_strHiwariComment_1, m_GasfDat, m_nStartIdx, m_bSingleStep, m_nPrintGasRyokinSikiPtn, mHybfDat, mCounterName, m_isHybrid,
		mKo2fDat, m_nOnlyGas, m_isVisibleGas, m_nNorSr, m_nHybGasUse, mKotfDat, m_isToyuKinSep, m_isPrintKensin, m_isPrintToyu, m_nLoilUnit) {

		this.m_Sisin = m_Sisin;
		this.m_KensinPrevMonth = m_KensinPrevMonth;
		this.m_KensinPrevDay = m_KensinPrevDay;
		this.m_SisinPrev = m_SisinPrev;
		this.m_NowUse = m_NowUse;
		this.m_PreUse = m_PreUse;
		this.m_GasPay = m_GasPay;
		this.m_GasTax = m_GasTax;
		this.m_Reduce = m_Reduce;
		this.m_bChgMeter = m_bChgMeter;
		this.m_ChgMonth = m_ChgMonth;
		this.m_ChgDay = m_ChgDay;
		this.m_ChgZsisin = m_ChgZsisin;
		this.m_ChgSisin = m_ChgSisin;
		this.m_ChukanSur = m_ChukanSur;
		this.m_PreReceipt = m_PreReceipt;
		this.m_HmDay = m_HmDay;
		this.m_HmMonth = m_HmMonth;
		this.m_Receipt = m_Receipt;
		this.m_Azukarikin = m_Azukarikin;
		this.m_Nyukin = m_Nyukin;
		this.m_Chosei = m_Chosei;
		this.m_Zandaka = m_Zandaka;
		this.mCnp = mCnp;
		this.mCnpCusDat = mCnpCusDat;
		this.mCnpMemberCmt = mCnpMemberCmt;
		this.mCnpTempCmt = mCnpTempCmt;
		this.mPrnZensr = mPrnZensr;
		this.mPrnGasBaseKin = mPrnGasBaseKin;
		this.mGasBaseKin = mGasBaseKin;
		this.mGasAddKin = mGasAddKin;
		this.m_nZenYearKenSr = m_nZenYearKenSr;
		this.m_nGasTotalKin = m_nGasTotalKin;
		this.m_nGasTotalKinWithoutTax = m_nGasTotalKinWithoutTax;
		this.m_nFacilityKin = m_nFacilityKin;
		this.m_bPrintGasRyokinTotal = m_bPrintGasRyokinTotal;
		this.m_bPrintGasRyokinSiki = m_bPrintGasRyokinSiki;
		this.m_bPrintGasFacilityKin = m_bPrintGasFacilityKin;
		this.m_bPrintHiwariComment = m_bPrintHiwariComment;
		this.m_bPrintZenYearKenSr = m_bPrintZenYearKenSr;
		this.m_strHiwariComment_0 = m_strHiwariComment_0;
		this.m_strHiwariComment_1 = m_strHiwariComment_1;
		this.m_GasfDat = m_GasfDat;
		this.m_nStartIdx = m_nStartIdx;
		this.m_bSingleStep = m_bSingleStep;
		this.m_nPrintGasRyokinSikiPtn = m_nPrintGasRyokinSikiPtn;
		this.mHybfDat = mHybfDat;
		this.mCounterName = mCounterName;
		this.m_isHybrid = m_isHybrid;
		this.mKo2fDat = mKo2fDat;
		this.m_nOnlyGas = m_nOnlyGas;
		this.m_isVisibleGas = m_isVisibleGas;
		this.m_nNorSr = m_nNorSr;
		this.m_nHybGasUse = m_nHybGasUse;
		this.mKotfDat = mKotfDat;
		this.m_isToyuKinSep = m_isToyuKinSep;
		this.m_isPrintKensin = m_isPrintKensin;
		this.m_isPrintToyu = m_isPrintToyu;
		this.m_nLoilUnit = m_nLoilUnit;
	}
};

export class ShukeiItem {
	constructor() {
		/** 件数 */
		this.mKensu = 0;
		/** ガス使用量 */
		this.mGsiyou = 0;
		/** ガス料金 */
		this.mGryokin = 0;
		/** 消費税 */
		this.mShohi = 0;
		/**還元額 */
		this.mKang = 0;
		/** 合計 */
		this.mTotal = 0;
		/** 入金額 */
		this.mNyukin = 0;
		/** 調整額 */
		this.mChosei = 0;
		/** 入金件数 */
		this.mNyucnt = 0;
		/** 売上件数 */
		this.mUricnt = 0;
		/** 売上数量 */
		this.mUrisur = 0;
		/** 売上金額 */
		this.mUrikin = 0;
		/** 売上消費税金額 */
		this.mUritax = 0;
		/** 灯油検針件数 */
		this.mToyuCnt = 0;
		/** 灯油使用量 */
		this.mToyuUse = 0;
		/** 灯油金額 */
		this.mToyuKin = 0;
		/** 灯油消費税 */
		this.mToyuTax = 0;
		/** 灯油金額合計 */
		this.mToyuTotal = 0;
	}

	setValue(mKensu, mGsiyou, mGryokin, mShohi, mKang, mTotal, mNyukin, mChosei, mNyucnt, mUricnt, mUrisur,
		mUrikin, mUritax, mToyuCnt, mToyuUse, mToyuKin, mToyuTax, mToyuTotal) {
		var data = new ShukeiItem();

		data.mKensu = mKensu;
		data.mGsiyou = mGsiyou;
		data.mGryokin = mGryokin;
		data.mShohi = mShohi;
		data.mKang = mKang;
		data.mTotal = mTotal;
		data.mNyukin = mNyukin;
		data.mChosei = mChosei;
		data.mNyucnt = mNyucnt;
		data.mUricnt = mUricnt;
		data.mUrisur = mUrisur;
		data.mUrikin = mUrikin;
		data.mUritax = mUritax;
		data.mToyuCnt = mToyuCnt;
		data.mToyuUse = mToyuUse;
		data.mToyuKin = mToyuKin;
		data.mToyuTax = mToyuTax;
		data.mToyuTotal = mToyuTotal;
		return data;
	}
};





export var printStatus = {
	m_isPrintHoan: false,
	m_isPrintNyukin: false,
	m_lReceipt: 0,
	m_lZandaka: 0,
	m_isPrintKensin: false,
	m_isPrintToyu: false,
}

export var mUserData = {}

export class UserData {
	constructor() {
		/** システム設定情報 */
		this.mSysfDat = null;
		/** 検針日 */
		this.mKensinDate = "";
		/** 顧客データ */
		this.mKokfDat = null;
		/** 顧客ハイブリッドデータ */
		this.mKo2fDat = null;
		/** ガス料金データ */
		this.mGasfDat = null;
		/** 販売明細データ */
		this.mHmefList = [];
		/** 店舗データ */
		this.mHanfDat = null;
		/** 入金モードフラグ */
		this.mNyukinMode = null;
		/** 領収書印字時に残高明細を印字しない */
		this.mNyukinOnly = null;
		/** 顧客特別仕様 */
		this.mKouserDat = null;
		/** 顧客値引きデータ */
		this.m_lstKnebDat = null;
		/** 検針時リースの販売明細一覧 */
		this.m_lstLeasHmefDat = null;
		/** 取引区分・品目データクラス */
		this.mBusfdat = null;

		this.getHmef0 = null;
		this.getHmef1 = null;
		this.getHmef2 = null;
	}

	setValue(inputData) {
		var data = new UserData();
		data = inputData;
		return data;
	}
}







export class ShukeiKensinData {
	constructor() {
		/** 顧客コード */
		this.m_strKcode = "";
		/** 顧客名 */
		this.m_strName = "";
		/** 今回指針 */
		this.m_nSs = 0;
		/** 今回使用量 */
		this.m_nSr = 0;
		/** ガス料金 */
		this.m_nKin = 0;
		/** 消費税 */
		this.m_nTax = 0;
		/** 還元額 */
		this.m_nKng = 0;
		/** 灯油指針 */
		this.m_nToyuSs = 0;
		/** 灯油使用量 */
		this.m_nToyuSr = 0;
		/** 灯油金額 */
		this.m_lToyuKin = 0;
		/** 灯油消費税 */
		this.m_lToyuTax = 0;
		/** 灯油検針有無 */
		this.m_isToyu = false;
		/** ガス検針有無 */
		this.m_isKensin = false;
		/** 入金額 */
		this.m_lNyu = 0;
		/** 調整額 */
		this.m_lCho = 0;
	}


	setValue(m_strKcode, m_strName, m_nSs, m_nSr, m_nKin, m_nTax, m_nKng, m_nToyuSs,
		m_nToyuSr, m_lToyuKin, m_lToyuTax, m_isToyu, m_isKensin, m_lNyu, m_lCho) {

		var data = new ShukeiKensinData();

		data.m_strKcode = m_strKcode;
		data.m_strName = m_strName;
		data.m_nSs = m_nSs;
		data.m_nSr = m_nSr;
		data.m_nKin = m_nKin;
		data.m_nTax = m_nTax;
		data.m_nKng = m_nKng;
		data.m_nToyuSs = m_nToyuSs;
		data.m_nToyuSr = m_nToyuSr;
		data.m_lToyuKin = m_lToyuKin;
		data.m_lToyuTax = m_lToyuTax;
		data.m_isToyu = m_isToyu;
		data.m_isKensin = m_isKensin;
		data.m_lNyu = m_lNyu;
		data.m_lCho = m_lCho;
		return data;
	}


	add(data) {
		this.m_nSr += data.m_nSr;
		this.m_nKin += data.m_nKin;
		this.m_nTax += data.m_nTax;
		this.m_nKng += data.m_nKng;
		this.m_nToyuSr += data.m_nToyuSr;
		this.m_lToyuKin += data.m_lToyuKin;
		this.m_lToyuTax += data.m_lToyuTax;
		this.m_lNyu += data.m_lNyu;
		this.m_lCho += data.m_lCho;
	}
}


export class MetMeisaiDat{
    constructor(){
    /** 顧客管理コード */
	this.m_nCusrec = 0;
	/** 請求月度 */	
	this.m_dtSeiymd = null;
	/** システム月度 */	
	this.m_dtSysymd = null;
    /** 旧メーター指針 */
	this.m_nOld_ss = 0;
	/** 新メーター指針 */
	this.m_nNew_ss = 0;
	/** 中間使用量（検針） */
	this.m_nKenmsr = 0;
    /** 担当者 */
	this.m_nTancd = 0;
	/** 担当者名称 */
	this.m_strTanname = null;
    /** 記入担当者 */
	this.m_nWrt_tancd = 0;
	/** 記入日付 */
	this.m_dtWrt_ymd = null;
    }


	setValue(nCusrec , dtSeiymd , dtSysymd , nOld_ss , nNew_ss , nKenmsr , nTancd , strTanname , nWrt_tancd , dtWrt_ymd){
		var data = new MetMeisaiDat();
		data.m_nCusrec = nCusrec;
		data.m_dtSeiymd = dtSeiymd;
		data.m_dtSysymd = dtSysymd;
		data.m_nOld_ss = nOld_ss;
		data.m_nNew_ss = nNew_ss;
		data.m_nKenmsr = nKenmsr;
		data.m_nTancd = nTancd;
		data.m_strTanname = strTanname;
		data.m_nWrt_tancd = nWrt_tancd;
		data.m_dtWrt_ymd = dtWrt_ymd;	
		return data;	
	}
 }

export  class SeclawDat{
    constructor(){
        /** 顧客管理コード */
	    this.m_nCusrec = 0;
        /** 調査点検日付 */      
        this.m_dtEntymd = null;
        /** 総合結果 */
        this.m_bRes = 0;   
        this.m_strTanname;
        this.m_sTancd;
    }

	setValue(nCusrec,dtEnt_ymd , bRes, strTanname ,nTancd ){
		var data = new SeclawDat();
		data.m_nCusrec = nCusrec;
		data.m_dtEntymd = dtEnt_ymd;
		data.m_bRes = bRes;
		data.m_strTanname = strTanname;
		data.m_sTancd = nTancd;
		return data;
	}
 }

export class LawItemDat{
    constructor(){
        /** コード */
	    this.m_nCode = nCode;
	    /** 値 */
        this.m_nValue = nValue;
    }

	setValue(nCode , nValue){
		var data = new LawItemDat();
		data.m_nCode = nCode;
		data.m_nValue = nValue;
		return data;
	}
 }

