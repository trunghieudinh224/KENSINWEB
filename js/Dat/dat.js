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
		this.mKtpcdat = new KtpcDat();
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
		/** 住所1 */
		this.mAdd_0 = "";
		/** 住所2 */
		this.mAdd_1 = "";
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
		this.mCusrec = 0;
		/** 使用率 */
		this.mPuseSrpDay = 0;
		this.nGasrkcnt = 0;
		/** 灯油:単価 */
		this.mLoilUnit = 0;
		/** 灯油：端数処理(加算) */
		this.mLoilAdd = 0;
		/** 灯油：端数処理(乗算) */
		this.mLoilMulti = 0;
		/** ポイント */
		this.mPoint = 0;
		/** 振替:月 */
		this.mTransMonth = 0;
		/** 振替:日 */
		this.mTransDate = 0;
		/** 振替:金額 */
		this.mTransFee = 0;
		/** 締後：ガス売上 */
		this.mGUri2 = 0;
		/** 締後：その他売上 */
		this.mUri2 = 0;
		/** 締後：その他消費税 */
		this.mTax2 = 0;
		/** 締後：入金額 */
		this.mNyu2 = 0;
		/** 締後：調整額 */
		this.mCho2 = 0;
		/** 振替依頼状態 */
		this.mFristat = 0;
		/** 振替依頼金額 */
		this.mFriKin = 0;
		this.seiymd = null;
		this.kai_ymd = null;
		this.mKenku = 0;
		this.chuatu = 0;
		this.mLoilDiv = 0;
	}

	setValue(mName, mKMonth, mKDate, mGasUse, mGasKubun, mKenSumi, mNowMeter, mPreMeter, mPuseYear, mPuseMonth, mPuseDate,
		mGasDiv, mConTax, mBetwMeter, mPreUse, mFee, mHiwari, mTaxDiv, mSimeF, mKaiYear, mKaiMonth, mKaiDate, mKtpcdat,
		mSupplyForm, mGasBase, mMtKeta, mGasUnit, mHybseikyu, mUrikin, mUriTax, mReduce, mReduceTax, mKotfDat, mProcTisyuu,
		mTaxTisyuu, mPreBalance, mTAdjust, mTReceipt, mProcLease, mTaxLease, mProcDiv, mProcLoil, mTaxLoil, mProcEtc,
		mTaxEtc, mProcGas, mTaxGas, mReceipt, mAdjust, mSyuSumi, mInpReceipt, mAdd_0, mAdd_1, mCusCode, mSName0,
		mSName1, mKName, mZyksDat, mHoan, mBankCode, mNoKensin, mCusrec, mPuseSrpDay, nGasrkcnt, mLoilUnit, mLoilAdd, mLoilMulti,
		mPoint, mTransMonth, mTransDate, mTransFee, mGUri2, mUri2, mTax2, mNyu2, mCho2, mFristat, mFriKin, seiymd, kai_ymd, mKenku, chuatu, mLoilDiv) {

		var data = new KokfDat();

		data.mName = mName;
		data.mKMonth = mKMonth;
		data.mKDate = mKDate;
		data.mGasUse = mGasUse;
		data.mGasKubun = mGasKubun;
		data.mKenSumi = mKenSumi;
		data.mNowMeter = mNowMeter;
		data.mPreMeter = mPreMeter;
		data.mPuseYear = mPuseYear;
		data.mPuseMonth = mPuseMonth;
		data.mPuseDate = mPuseDate;
		data.mGasDiv = mGasDiv;
		data.mConTax = mConTax;
		data.mBetwMeter = mBetwMeter;
		data.mPreUse = mPreUse;
		data.mFee = mFee;
		data.mHiwari = mHiwari;
		data.mTaxDiv = mTaxDiv;
		data.mSimeF = mSimeF;
		data.mKaiYear = mKaiYear;
		data.mKaiMonth = mKaiMonth;
		data.mKaiDate = mKaiDate;
		if (mKtpcdat != null) {
			data.mKtpcdat = new KtpcDat().parseData(mKtpcdat);
		}
		data.mSupplyForm = mSupplyForm;
		data.mGasBase = mGasBase;
		data.mMtKeta = mMtKeta;
		data.mGasUnit = mGasUnit;
		data.mHybseikyu = mHybseikyu;
		data.mUrikin = mUrikin;
		data.mUriTax = mUriTax;
		data.mReduce = mReduce;
		data.mReduceTax = mReduceTax;
		if (mKotfDat != null) {
			data.mKotfDat = new KotfDat().parseData(mKotfDat);
		}
		data.mProcTisyuu = mProcTisyuu;
		data.mTaxTisyuu = mTaxTisyuu;
		data.mPreBalance = mPreBalance;
		data.mTAdjust = mTAdjust;
		data.mTReceipt = mTReceipt;
		data.mProcLease = mProcLease;
		data.mTaxLease = mTaxLease;
		data.mProcDiv = mProcDiv;
		data.mProcLoil = mProcLoil;
		data.mTaxLoil = mTaxLoil;
		data.mProcEtc = mProcEtc;
		data.mTaxEtc = mTaxEtc;
		data.mProcGas = mProcGas;
		data.mTaxGas = mTaxGas;
		data.mReceipt = mReceipt;
		data.mAdjust = mAdjust;
		data.mSyuSumi = mSyuSumi;
		data.mInpReceipt = mInpReceipt;
		data.mAdd_0 = mAdd_0;
		data.mAdd_1 = mAdd_1;
		data.mCusCode = mCusCode;
		data.mSName0 = mSName0;
		data.mSName1 = mSName1;
		data.mKName = mKName;
		if (mZyksDat != null) {
			data.mZyksDat = new ZyksDat().parseData(mZyksDat);
		}
		data.mHoan = mHoan;
		data.mBankCode = mBankCode;
		data.mNoKensin = mNoKensin;
		data.mCusrec = mCusrec;
		data.mPuseSrpDay = mPuseSrpDay;
		data.nGasrkcnt = nGasrkcnt;
		data.mLoilUnit = mLoilUnit;
		data.mLoilAdd = mLoilAdd;
		data.mLoilMulti = mLoilMulti;
		data.mPoint = mPoint;
		data.mTransMonth = mTransMonth;
		data.mTransDate = mTransDate;
		data.mTransFee = mTransFee;
		data.mGUri2 = mGUri2;
		data.mUri2 = mUri2;
		data.mTax2 = mTax2;
		data.mNyu2 = mNyu2;
		data.mCho2 = mCho2;
		data.mFristat = mFristat;
		data.mFriKin = mFriKin;
		data.seiymd = seiymd;
		data.kai_ymd = kai_ymd;
		data.mKenku = mKenku;
		data.chuatu = chuatu;
		data.mLoilDiv = mLoilDiv;

		return data
	}

	parseData(responeData) {
		var data = new KokfDat();
		if (responeData == null) {
			return data;
		}

		data.mName = responeData.mName;
		data.mKMonth = responeData.mKMonth;
		data.mKDate = responeData.mKDate;
		data.mGasUse = responeData.mGasUse;
		data.mGasKubun = responeData.mGasKubun;
		data.mKenSumi = responeData.mKenSumi;
		data.mNowMeter = responeData.mNowMeter;
		data.mPreMeter = responeData.mPreMeter;
		data.mPuseYear = responeData.mPuseYear;
		data.mPuseMonth = responeData.mPuseMonth;
		data.mPuseDate = responeData.mPuseDate;
		data.mGasDiv = responeData.mGasDiv;
		data.mConTax = responeData.mConTax;
		data.mBetwMeter = responeData.mBetwMeter;
		data.mPreUse = responeData.mPreUse;
		data.mFee = responeData.mFee;
		data.mHiwari = responeData.mHiwari;
		data.mTaxDiv = responeData.mTaxDiv;
		data.mSimeF = responeData.sime;
		data.mKaiYear = responeData.mKaiYear;
		data.mKaiMonth = responeData.mKaiMonth;
		data.mKaiDate = responeData.mKaiDate;
		if (responeData.mKtpcdat != null) {
			data.mKtpcdat = new KtpcDat().parseData(responeData.mKtpcdat);
		}
		data.mSupplyForm = responeData.mSupplyForm;
		data.mGasBase = responeData.mGasBase;
		data.mMtKeta = responeData.mMtKeta;
		data.mGasUnit = responeData.mGasUnit;
		data.mHybseikyu = responeData.mHybseikyu;
		data.mUrikin = responeData.mUrikin;
		data.mUriTax = responeData.mUriTax;
		data.mReduce = responeData.mReduce;
		data.mReduceTax = responeData.mReduceTax;
		if (responeData.mKotfDat != null) {
			data.mKotfDat = new KotfDat().parseData(responeData.mKotfDat);
		}
		data.mProcTisyuu = responeData.mProcTisyuu;
		data.mTaxTisyuu = responeData.mTaxTisyuu;
		data.mPreBalance = responeData.mPreBalance;
		data.mTAdjust = responeData.mTAdjust;
		data.mTReceipt = responeData.mTReceipt;
		data.mProcLease = responeData.mProcLease;
		data.mTaxLease = responeData.mTaxLease;
		data.mProcDiv = responeData.mProcDiv;
		data.mProcLoil = responeData.mProcLoil;
		data.mTaxLoil = responeData.mTaxLoil;
		data.mProcEtc = responeData.mProcEtc;
		data.mTaxEtc = responeData.mTaxEtc;
		data.mProcGas = responeData.mProcGas;
		data.mTaxGas = responeData.mTaxGas;
		data.mReceipt = responeData.mReceipt;
		data.mAdjust = responeData.mAdjust;
		data.mSyuSumi = responeData.mSyuSumi;
		data.mInpReceipt = responeData.mInpReceipt;
		data.mAdd_0 = responeData.mAdd_0;
		data.mAdd_1 = responeData.mAdd_1;
		data.mCusCode = responeData.mCusCode;
		data.mSName0 = responeData.mSName0;
		data.mSName1 = responeData.mSName1;
		data.mKName = responeData.mKName;
		if (responeData.mZyksDat != null) {
			data.mZyksDat = new ZyksDat().parseData(responeData.mZyksDat);
		}
		data.mHoan = responeData.mHoan;
		data.mBankCode = responeData.mBankCode;
		data.mNoKensin = responeData.mNoKensin;
		data.mCusrec = responeData.mCusrec;
		data.mPuseSrpDay = responeData.mPuseSrpDay;
		data.nGasrkcnt = responeData.nGasrkcnt;
		data.mLoilUnit = responeData.mLoilUnit;
		data.mLoilAdd = responeData.mLoilAdd;
		data.mLoilMulti = responeData.mLoilMulti;
		data.mPoint = responeData.mPoint;
		data.mTransMonth = responeData.mTransMonth;
		data.mTransDate = responeData.mTransDate;
		data.mTransFee = responeData.mTransFee;
		data.mGUri2 = responeData.mGUri2;
		data.mUri2 = responeData.mUri2;
		data.mTax2 = responeData.mTax2;
		data.mNyu2 = responeData.mNyu2;
		data.mCho2 = responeData.mCho2;
		data.mFristat = responeData.mFristat;
		data.mFriKin = responeData.mFriKin;
		data.seiymd = responeData.seiymd;
		data.kai_ymd = responeData.kai_ymd;
		data.mKenku = responeData.mKenku;
		data.chuatu = responeData.chuatu;
		data.mLoilDiv = responeData.mLoilDiv;

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
		this.m_isToyukensinFlg = false;
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
		/** 日常点検判定項目△有無 */
		this.mTenkenDelta = 0;
		/** 産気率 */
		this.mSanki = 0;
		/** 灯油品目コード */
		this.mHinCd9 = 0;
		/** ltasモードフラグ */
		this.m_isLtas = false;
		/**  */
		this.mShofDatKangen = null;
	}

	setValue(mKgasDays0, mKgasDays1, mKgasDays2, mTax_yy, mTax_mm, mTax_dd, mConsumTax, mTaxr_old, mTaxr_new, mVisibleGas, mVisibleFacility, 
		mLesUmu, mFracAddKin, mFracMulKin, mFracAddTax, mFracMulTax, mSysYear, mMonth, mDate, mIfReduce, mShoTaxcom, mCheckHoan, mIfMoney, 
		mTenkenKgas, m_isToyukensinFlg, mSrChkr, mSrChkm, mKnebFlg, mIfAdjust, mIfAlarm, mIfDiv, mIfLampoil, mIfProceeds, mIfDemand, mGtpcDat,
		mHtOption, mSnvalue, mIfChitUser, mSysMonth, mTenkenDelta, mSanki, mHinCd9, m_isLtas, mShofDatKangen) {
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
		data.m_isToyukensinFlg = m_isToyukensinFlg;
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
		data.mTenkenDelta = mTenkenDelta;
		data.mSanki = mSanki;
		data.mHinCd9 = mHinCd9;
		data.m_isLtas = m_isLtas;
		data.mShofDatKangen = mShofDatKangen;
		return data;
	}

	parseData(responeData) {
		var data = new SysfDat();
		if (responeData == null) {
			return data;
		}

		data.mKgasDays0 = responeData.mKgasDays0;
		data.mKgasDays1 = responeData.mKgasDays1;
		data.mKgasDays2 = responeData.mKgasDays2;
		data.mTax_yy = responeData.mTax_yy;
		data.mTax_mm = responeData.mTax_mm;
		data.mTax_dd = responeData.mTax_dd;
		data.mConsumTax = responeData.mConsumTax;
		data.mTaxr_old = responeData.mTaxr_old;
		data.mTaxr_new = responeData.mTaxr_new;
		data.mVisibleGas = responeData.mVisibleGas;
		data.mVisibleFacility = responeData.mVisibleFacility;
		data.mLesUmu = responeData.mLesUmu;
		data.mFracAddKin = responeData.mFracAddKin;
		data.mFracMulKin = responeData.mFracMulKin;
		data.mFracAddTax = responeData.mFracAddTax;
		data.mFracMulTax = responeData.mFracMulTax;
		data.mSysYear = responeData.mSysYear;
		data.mMonth = responeData.mMonth;
		data.mDate = responeData.mDate;
		data.mIfReduce = responeData.mIfReduce;
		data.mShoTaxcom = responeData.mShoTaxcom;
		data.mCheckHoan = responeData.mCheckHoan;
		data.mIfMoney = responeData.mIfMoney;
		data.mTenkenKgas = responeData.mTenkenKgas;
		data.m_isToyukensinFlg = responeData.m_isToyukensinFlg;
		data.mSrChkr = responeData.mSrChkr;
		data.mSrChkm = responeData.mSrChkm;
		data.mKnebFlg = responeData.mKnebFlg;
		data.mIfAdjust = responeData.mIfAdjust;
		data.mIfAlarm = responeData.mIfAlarm;
		data.mIfDiv = responeData.mIfDiv;
		data.mIfLampoil = responeData.mIfLampoil;
		data.mIfProceeds = responeData.mIfProceeds;
		data.mIfDemand = responeData.mIfDemand;
		data.mGtpcDat = responeData.mGtpcDat;
		data.mHtOption = responeData.mHtOption;
		data.mSnvalue = responeData.mSnvalue;
		if (data.mSnvalue == 0) {
			data.mSnvalue = 100;
		}
		data.mIfChitUser = responeData.mIfChitUser;
		data.mSysMonth = responeData.mSysMonth;
		data.mTenkenDelta = responeData.mTenkenDelta;
		data.mSanki = responeData.mSanki;
		data.mHinCd9 = responeData.mHinCd9;
		data.m_isLtas = responeData.m_isLtas;
		if (responeData.mShofDatKangen != null) {
			data.mShofDatKangen = new ShofDat().parseData(responeData.mShofDatKangen);
		}
		return data
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
		/** ポイントシステムver */
		this.mPntVer;
		/** ポイント名称 */
		this.pntDatName;
	}

	setValue(mCaHas, mCaFlg, mKangHbcd, mKangHcd, mNyucho, mSysOption, mSysfHmcd13, mJifuriNext, mSyskeigen, mPntVer, pntDatName) {
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
		data.mPntVer = mPntVer;
		data.pntDatName = pntDatName;
		return data;
	}

	parseData(responeData) {
		var data = new Sy2fDat();
		if (responeData == null) {
			return data;
		}

		data.mCaHas = responeData.mCaHas;
		data.mCaFlg = responeData.mCaFlg;
		data.mKangHbcd = responeData.mKangHbcd;
		data.mKangHcd = responeData.mKangHcd;
		data.mNyucho = responeData.mNyucho;
		data.mSysOption = responeData.mSysOption;
		data.mSysfHmcd13 = responeData.mSysfHmcd13;
		data.mJifuriNext = responeData.mJifuriNext;
		data.mSyskeigen = responeData.mSyskeigen;
		data.mPntVer = responeData.mPntVer;
		data.pntDatName = responeData.pntDatName;
		return data
	}
}


export class Ko2fDat {

	constructor() {
		/** ハイブリッドカウンタ数 */
		this.kHyb_MAX = 4;
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
		/** 今回使用量 */
		this.mGasUse = [];
	}

	setValue(mGashyb, mChoTaxku, mChoTax, mUseKin, mUseTaxku, mUseTax, mChoKin, mGasUse) {
		var data = new Ko2fDat();

		data.kHyb_MAX = 4;
		data.mGashyb = mGashyb;
		data.mChoTaxku = mChoTaxku;
		data.mChoTax = mChoTax;
		data.mUseKin = mUseKin;
		data.mUseTaxku = mUseTaxku;
		data.mUseTax = mUseTax;
		data.mChoKin = mChoKin;
		data.mGasUse = mGasUse;
		return data;
	}

	parseData(responeData) {
		var data = new Ko2fDat();
		if (responeData == null) {
			return data;
		}

		data.kHyb_MAX = 4;
		data.mGashyb = responeData.mGashyb;
		data.mChoTaxku = responeData.mChoTaxku;
		data.mChoTax = responeData.mChoTax;
		data.mUseKin = responeData.mUseKin;
		data.mUseTaxku = responeData.mUseTaxku;
		data.mUseTax = responeData.mUseTax;
		data.mChoKin = responeData.mChoKin;
		data.mGasUse = responeData.mGasUse;
		return data
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
		/** 依頼状況 */
		this.m_nIraiStat = 0;
		/** 引落し予定日（月） */
		this.m_nIraiMonth = 0;
		/** 引落し予定日（日） */
		this.m_nIraiDay = 0;
		/** 依頼金額 */
		this.m_nIraiKin = 0;
		/** 引落し予定日（年） */
		this.m_nIraiYear = 0;
		/** 顧客毎コメント */
		this.m_strCmt = "";
	}


	setValue(m_nChuatu, m_nKoubetsu, mHyc5, m_sChocode, m_sNyucode, m_nNextTransYear, m_nNextTransMonth, m_nNextTransDay,
		m_nIraiStat, m_nIraiMonth, m_nIraiDay, m_nIraiKin, m_nIraiYear, m_strCmt) {
		var data = new KouserDat();

		data.m_nChuatu = m_nChuatu;
		data.m_nKoubetsu = m_nKoubetsu;
		data.mHyc5 = mHyc5;
		data.m_sChocode = m_sChocode;
		data.m_sNyucode = m_sNyucode;
		data.m_nNextTransYear = m_nNextTransYear;
		data.m_nNextTransMonth = m_nNextTransMonth;
		data.m_nNextTransDay = m_nNextTransDay;
		data.m_nIraiStat = m_nIraiStat;
		data.m_nIraiMonth = m_nIraiMonth;
		data.m_nIraiDay = m_nIraiDay;
		data.m_nIraiKin = m_nIraiKin;
		data.m_nIraiYear = m_nIraiYear;
		data.m_strCmt = m_strCmt;
		return data;
	}

	parseData(responeData) {
		var data = new KouserDat();
		if (responeData == null) {
			return data;
		}

		data.m_nChuatu = responeData.m_nChuatu;
		data.m_nKoubetsu = responeData.m_nKoubetsu;
		data.mHyc5 = responeData.mHyc5;
		data.m_sChocode = responeData.m_sChocode;
		data.m_sNyucode = responeData.m_sNyucode;
		data.m_nNextTransYear = responeData.m_nNextTransYear;
		data.m_nNextTransMonth = responeData.m_nNextTransMonth;
		data.m_nNextTransDay = responeData.m_nNextTransDay;
		data.m_nIraiStat = responeData.m_nIraiStat;
		data.m_nIraiMonth = responeData.m_nIraiMonth;
		data.m_nIraiDay = responeData.m_nIraiDay;
		data.m_nIraiKin = responeData.m_nIraiKin;
		data.m_nIraiYear = responeData.m_nIraiYear;
		data.m_strCmt = responeData.m_strCmt;

		return data
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


	setValue(m_nBasekin, m_nAddkin, m_nFacilitykin) {
		var data = new KtpcDat();

		data.m_nBasekin = m_nBasekin;
		data.m_nAddkin = m_nAddkin;
		data.m_nFacilitykin = m_nFacilitykin;
		return data;
	}

	parseData(responeData) {
		var data = new KtpcDat();
		if (responeData == null) {
			return data;
		}

		data.m_nBasekin = responeData.m_nBasekin;
		data.m_nAddkin = responeData.m_nAddkin;
		data.m_nFacilitykin = responeData.m_nFacilitykin;
		return data
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
		/** 消費税区分 */
		this.mTaxDiv;
	}

	setValue(mSum, mSyu, mFrac1Add, mFrac2Add, mFrac1Mult, mFrac2Mult, mRiseFall, m_lstGstpDat, mTaxDiv, mTaxAdd, mTaxMult, mChoTanka, mGextDat) {
		var data = new GasfDat();

		data.mSum = mSum;
		data.mSyu = mSyu;
		data.mFrac1Add = mFrac1Add;
		data.mFrac2Add = mFrac2Add;
		data.mFrac1Mult = mFrac1Mult;
		data.mFrac2Mult = mFrac2Mult;
		data.mRiseFall = mRiseFall;
		data.m_lstGstpDat = m_lstGstpDat;
		data.mTaxDiv = mTaxDiv;
		data.mTaxAdd = mTaxAdd;
		data.mTaxMult = mTaxMult;
		data.mChoTanka = mChoTanka;
		data.mGextDat = mGextDat;
		return data;
	}

	parseData(responeData) {
		var data = new GasfDat();
		if (responeData == null) {
			return data;
		}

		data.mSum = responeData.mSum;
		data.mSyu = responeData.mSyu;
		data.mFrac1Add = responeData.mFrac1Add;
		data.mFrac2Add = responeData.mFrac2Add;
		data.mFrac1Mult = responeData.mFrac1Mult;
		data.mFrac2Mult = responeData.mFrac2Mult;
		data.mRiseFall = responeData.mRiseFall;
		data.m_lstGstpDat = responeData.m_lstGstpDat;
		data.mTaxDiv = responeData.mTaxDiv;
		data.mTaxAdd = responeData.mTaxAdd;
		data.mTaxMult = responeData.mTaxMult;
		data.mChoTanka = responeData.mChoTanka;
		data.mGextDat = responeData.mGextDat;
		return data
	}
}


export class GstpDat {
	constructor() {
		/** 上限値 */
		this.mUplimit = 0;
		/** 加算値 */
		this.m_nAddp = 0;
		/** 基準料金 */
		this.m_nBase = 0;
	}

	setValue(mUplimit, m_nAddp, m_nBase) {
		var data = new GstpDat();

		data.mUplimit = mUplimit;
		data.m_nAddp = m_nAddp;
		data.m_nBase = m_nBase;
		return data;
	}

	parseData(responeData) {
		var data = new GstpDat();
		if (responeData == null) {
			return data;
		}

		data.mUplimit = responeData.mUplimit;
		data.m_nAddp = responeData.m_nAddp;
		data.m_nBase = responeData.m_nBase;
		return data
	}
}


export class HanfDat {
	constructor() {
		/** 名称 */
		this.mName = "";
		/** 電話番号 */
		this.mTel = "";
		/** FAX */
		this.mFax = "";
		/** 住所1 */
		this.mAdd1 = "";
		/** 住所2 */
		this.mAdd2 = "";
		/** 住所3 */
		this.mAdd3 = "";
		/** URL */
		this.mUrl = "";
		/** 請求先銀行１銀行名 */
		this.mBkname_0 = "";
		/** 請求先銀行１支店名 */
		this.mBkshiten_0 = "";
		/** 請求先銀行１口座種別 */
		this.mBkkubun_0 = "";
		/** 請求先銀行１口座番号 */
		this.mBkban_0 = "";
		/** 請求先銀行２銀行名 */
		this.mBkname_1 = "";
		/** 請求先銀行２支店名 */
		this.mBkshiten_1 = "";
		/** 請求先銀行２口座種別 */
		this.mBkkubun_1 = "";
		/** 請求先銀行２口座番号 */
		this.mBkban_1 = "";
	}

	setValue(mName, mTel, mFax, mAdd1, mAdd2, mAdd3, mUrl, mBkname_0, mBkshiten_0, mBkkubun_0, mBkban_0, mBkname_1, mBkshiten_1, mBkkubun_1, mBkban_1) {
		var data = new HanfDat();

		data.mName = mName;
		data.mTel = mTel;
		data.mFax = mFax;
		data.mAdd1 = mAdd1;
		data.mAdd2 = mAdd2;
		data.mAdd3 = mAdd3;

		data.mUrl = mUrl;
		data.mBkname_0 = mBkname_0;
		data.mBkshiten_0 = mBkshiten_0;
		data.mBkkubun_0 = mBkkubun_0;
		data.mBkban_0 = mBkban_0;
		data.mBkname_1 = mBkname_1;
		data.mBkshiten_1 = mBkshiten_1;
		data.mBkkubun_1 = mBkkubun_1;
		data.mBkban_1 = mBkban_1;
		return data;
	}

	parseData(responeData) {
		var data = new HanfDat();
		if (responeData == null) {
			return data;
		}

		data.mName = responeData.mName;
		data.mTel = responeData.mTel;
		data.mFax = responeData.mFax;
		data.mAdd1 = responeData.mAdd1;
		data.mAdd2 = responeData.mAdd2;
		data.mAdd3 = responeData.mAdd3;
		data.mUrl = responeData.mUrl;
		data.mBkname_0 = responeData.mBkname_0;
		data.mBkshiten_0 = responeData.mBkshiten_0;
		data.mBkkubun_0 = responeData.mBkkubun_0;
		data.mBkban_0 = responeData.mBkban_0;
		data.mBkname_1 = responeData.mBkname_1;
		data.mBkshiten_1 = responeData.mBkshiten_1;
		data.mBkkubun_1 = responeData.mBkkubun_1;
		data.mBkban_1 = responeData.mBkban_1;
		return data
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
		/** 伝票日付(年) */
		this.mDeny = 0;
		/** 備考 */
		this.m_strBikou = "";
		/** 灯油検針フラグ設定 */
		this.m_isToyukensin = false;
		/** 顧客コード */
		this.mCusRec = 0;
		/** 前明細レコード */
		this.mPreHrec = 0;
		/** 次明細レコード 0で最終レコード */
		this.mNxtHrec = 0;
	}

	setValue(mUsef, mHmeKind, mLeasKind, mKin, mTax, mHmCode, mTaxKu, mTaxR, mHbCode, mDenm,
		mDend, mHmName, mSuryo, mTanka, mKeigenKubun, mHbnmPrn, mHbName, mDeny) {
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
		data.mDeny = mDeny;
		return data;
	}

	parseData(responeData) {
		var data = new HmefDat();
		if (responeData == null) {
			return data;
		}

		data.mUsef = responeData.mUsef;
		data.mHmeKind = responeData.mHmeKind;
		data.mLeasKind = responeData.mLeasKind;
		data.mKin = responeData.mKin;
		data.mTax = responeData.mTax;
		data.mHmCode = responeData.mHmCode;
		data.mTaxKu = responeData.mTaxKu;
		data.mTaxR = responeData.mTaxR;
		data.mHbCode = responeData.mHbCode;
		data.mDenm = responeData.mDenm;
		data.mDend = responeData.mDend;
		data.mHmName = responeData.mHmName;
		data.mSuryo = responeData.mSuryo;
		data.mTanka = responeData.mTanka;
		data.mKeigenKubun = responeData.mKeigenKubun;
		data.mHbnmPrn = responeData.mHbnmPrn;
		data.mHbName = responeData.mHbName;
		data.mDeny = responeData.mDeny;
		return data
	}
}


export class KotfDat {
	constructor() {
		/** 検針対象区分(0:対象, 1:非検針) */
		this.m_bNo_kensin = 0;
		/** 灯油検針済み区分(0:未, 1:済) */
		this.m_bKen_sumi = 0;
		/** 灯油料金 */
		this.m_nFee = 0;	
		/** 灯油消費税額 */
		this.m_nCon_tax = 0;
		/** 今回指針 */
		this.m_nNow_meter = 0;
		/** 前回指針 */
		this.m_nPre_meter = 0;
		/** 今回使用量 */
		this.m_nLoil_use = 0;
		/** 中間使用量 */
		this.m_nBetw_meter = 0;
		/** 前回使用量 */
		this.m_nPre_use = 0;
		/** 灯油基本料金 */
		this.m_nLoil_base = 0;
		/** 灯油消費税区分 */
		this.m_bLoil_taxku = 0;
		/** 灯油消費税率 */
		this.m_sLoil_taxr;
		/** 灯油消費税端数処理(加算) */
		this.m_nLoil_fracadd_tax = 0;
		/** 灯油消費税端数処理(乗算) */
		this.m_nLoil_fracmul_tax = 0;
		/** 指針桁数 */
		this.m_bMt_keta;

		/** 前回検針：年 */
		this.m_sPuse_year = 0;
		/** 前回検針：月 */
		this.m_bPuse_month = 0;
		/** 前回検針：日 */
		this.m_bPuse_day = 0;
	}

	setValue(m_bKen_sumi, m_nFee, m_nCon_tax, m_nNow_meter, m_nPre_meter, m_nLoil_use, m_nBetw_meter, m_nPre_use, m_nLoil_base,
		m_bLoil_taxku, m_sLoil_taxr, m_nLoil_fracadd_tax, m_nLoil_fracmul_tax, m_bMt_keta, m_sPuse_year, m_bPuse_month, m_bPuse_day , m_bNo_kensin) {
		var data = new KotfDat();

		data.m_bKen_sumi = m_bKen_sumi;
		data.m_nFee = m_nFee;
		data.m_nCon_tax = m_nCon_tax;
		data.m_nNow_meter = m_nNow_meter;
		data.m_nPre_meter = m_nPre_meter;
		data.m_nLoil_use = m_nLoil_use;
		data.m_nBetw_meter = m_nBetw_meter;
		data.m_nPre_use = m_nPre_use;
		data.m_nLoil_base = m_nLoil_base;
		data.m_bLoil_taxku = m_bLoil_taxku;
		data.m_sLoil_taxr = m_sLoil_taxr;
		data.m_nLoil_fracadd_tax = m_nLoil_fracadd_tax;
		data.m_nLoil_fracmul_tax = m_nLoil_fracmul_tax;
		data.m_bMt_keta = m_bMt_keta;
		data.m_sPuse_year = m_sPuse_year;
		data.m_bPuse_month = m_bPuse_month;
		data.m_bPuse_day = m_bPuse_day;
		data.m_bNo_kensin = m_bNo_kensin;
		return data;
	}

	parseData(responeData) {
		var data = new KotfDat();
		if (responeData == null) {
			return data;
		}

		data.m_bKen_sumi = responeData.m_bKen_sumi;
		data.m_nFee = responeData.m_nFee;
		data.m_nCon_tax = responeData.m_nCon_tax;
		data.m_nNow_meter = responeData.m_nNow_meter;
		data.m_nPre_meter = responeData.m_nPre_meter;
		data.m_nLoil_use = responeData.m_nLoil_use;
		data.m_nBetw_meter = responeData.m_nBetw_meter;
		data.m_nPre_use = responeData.m_nPre_use;
		data.m_nLoil_base = responeData.m_nLoil_base;
		data.m_bLoil_taxku = responeData.m_bLoil_taxku;
		data.m_sLoil_taxr = responeData.m_sLoil_taxr;
		data.m_nLoil_fracadd_tax = responeData.m_nLoil_fracadd_tax;
		data.m_nLoil_fracmul_tax = responeData.m_nLoil_fracmul_tax;
		data.m_bMt_keta = responeData.m_bMt_keta;
		data.m_sPuse_year = responeData.m_sPuse_year;
		data.m_bPuse_month = responeData.m_bPuse_month;
		data.m_bPuse_day = responeData.m_bPuse_day;
		data.m_bNo_kensin = responeData.m_bNo_kensin;
		return data
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

	parseData(responeData) {
		var data = new GtpcDat();
		if (responeData == null) {
			return data;
		}

		data.m_nPrintGasRyokinSiki = responeData.m_nPrintGasRyokinSiki;
		data.m_nPrintGasRyokinTotal = responeData.m_nPrintGasRyokinTotal;
		data.m_nPrintHiwariComment = responeData.m_nPrintHiwariComment;
		data.m_strHiwariComment_0 = responeData.m_strHiwariComment_0;
		data.m_strHiwariComment_1 = responeData.m_strHiwariComment_1;
		data.m_nPrintZenyearkensr = responeData.m_nPrintZenyearkensr;
		data.m_strTitle_0 = responeData.m_strTitle_0;
		data.m_strTitle_1 = responeData.m_strTitle_1;
		data.m_strTitle_2 = responeData.m_strTitle_2;
		data.m_strTitle_3 = responeData.m_strTitle_3;
		data.m_nPrintGastablePtn = responeData.m_nPrintGastablePtn;
		return data
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

	parseData(responeData) {
		var data = new ZyksDat();
		if (responeData == null) {
			return data;
		}

		data.m_nSr = responeData.m_nSr;
		data.m_nDenymd_year = responeData.m_nDenymd_year;
		data.m_nDenymd_month = responeData.m_nDenymd_month;
		data.m_nDenymd_day = responeData.m_nDenymd_day;
		return data
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

	parseData(responeData) {
		var data = new BusfDat();
		if (responeData == null) {
			return data;
		}

		data.mUsef = responeData.mUsef;
		data.mHinno = responeData.mHinno;
		data.mName = responeData.mName;
		data.mSign = responeData.mSign;
		data.mKind = responeData.mKind;
		return data;
	}
}


export class GextDat {
	constructor() {
		/** ガス基本料金 */
		this.m_nBasekin = 0;
		/** ガス設備料 */
		this.m_nFacilitykin = 0;
		/** ガス料金式印字フラグ */
		this.m_nPrintGasryokinSiki = 1;
	}

	setValue(m_nBasekin, m_nFacilitykin, m_nPrintGasryokinSiki) {
		var data = new GextDat();

		data.m_nBasekin = m_nBasekin;
		data.m_nFacilitykin = m_nFacilitykin;
		data.m_nPrintGasryokinSiki = m_nPrintGasryokinSiki;
		return data;
	}

	parseData(responeData) {
		var data = new GextDat();
		if (responeData == null) {
			return data;
		}

		data.m_nBasekin = responeData.m_nBasekin;
		data.m_nFacilitykin = responeData.m_nFacilitykin;
		data.m_nPrintGasryokinSiki = responeData.m_nPrintGasryokinSiki;
		return data;
	}
}


export class TaxDat {
	constructor() {
		/** ガス内税 */
		this.mGUchiZei = 0;
		/** ガス外内税 */
		this.mUchiZei = 0;
	}

	setValue(mGUchiZei, mUchiZei) {
		var data = new TaxDat();

		data.mGUchiZei = mGUchiZei;
		data.mUchiZei = mUchiZei;
		return data;
	}

	parseData(responeData) {
		var data = new TaxDat();
		if (responeData == null) {
			return data;
		}

		data.mGUchiZei = responeData.mGUchiZei;
		data.mUchiZei = responeData.mUchiZei;
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
		this.mKo2fDat = new Ko2fDat();
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
		
		/** 前月ご請求額タイトル */
		this.m_strZanTitle = "前月御請求額";
		/** 当月入金額 */
		this.m_nTReceipt = 0;
		/** 当月調整額 */
		this.m_nTAdjust = 0;
		this.m_strIrai = "";
	}

	setValue(m_Sisin, m_KensinPrevMonth, m_KensinPrevDay, m_SisinPrev, m_NowUse, m_PreUse, m_GasPay, m_GasTax, m_Reduce,
		m_bChgMeter, m_ChgMonth, m_ChgDay, m_ChgZsisin, m_ChgSisin, m_ChukanSur, m_PreReceipt, m_HmDay, m_HmMonth, m_Receipt,
		m_Azukarikin, m_Nyukin, m_Chosei, m_Zandaka, mCnp, mCnpCusDat, mCnpMemberCmt, mCnpTempCmt, mPrnZensr, mPrnGasBaseKin,
		mGasBaseKin, mGasAddKin, m_nZenYearKenSr, m_nGasTotalKin, m_nGasTotalKinWithoutTax, m_nFacilityKin, m_bPrintGasRyokinTotal,
		m_bPrintGasRyokinSiki, m_bPrintGasFacilityKin, m_bPrintHiwariComment, m_bPrintZenYearKenSr, m_strHiwariComment_0,
		m_strHiwariComment_1, m_GasfDat, m_nStartIdx, m_bSingleStep, m_nPrintGasRyokinSikiPtn, mHybfDat, mCounterName, m_isHybrid,
		mKo2fDat, m_nOnlyGas, m_isVisibleGas, m_nNorSr, m_nHybGasUse, mKotfDat, m_isToyuKinSep, m_isPrintKensin, m_isPrintToyu, m_nLoilUnit,
		m_strZanTitle, m_nTReceipt, m_nTAdjust, m_strIrai) {

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

		this.m_strZanTitle = m_strZanTitle;
		this.m_nTReceipt = m_nTReceipt;
		this.m_nTAdjust = m_nTAdjust;
		this.m_strIrai = m_strIrai;
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


export class UserData {
	constructor() {
		/** システム設定情報 */
		this.mSysfDat = null;
		/** システムデータクラス */
		this.mSy2fDat = null;
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
		this.mBusfDat_kang = null;
		/** 取引区分・品目データクラス */
		this.mBusfDat_hmcd13 = null;
		/** ハイブリッドカウンタ名称データ */
		this.mHynmDat = null;



		this.getHmef0 = null;
		this.getHmef1 = null;
		this.getHmef2 = null;
	}

	parseData(responeData) {
		if (responeData == null) {
			return null;
		}
		var data = new UserData();

		data.mSysfDat = new SysfDat().parseData(responeData.mSysfDat);
		data.mSy2fDat = new Sy2fDat().parseData(responeData.mSy2fDat);
		data.mKensinDate = responeData.mKensinDate;
		data.mKokfDat = new KokfDat().parseData(responeData.mKokfDat);
		data.mKo2fDat = new Ko2fDat().parseData(responeData.mKo2fDat);
		data.mGasfDat = new GasfDat().parseData(responeData.mGasfDat);
		data.mHmefList = responeData.mHmefList;
		data.mHanfDat = new HanfDat().parseData(responeData.mHanfDat);
		data.mNyukinMode = responeData.mNyukinMode;
		data.mNyukinOnly = responeData.mNyukinOnly;
		data.mKouserDat = new KouserDat().parseData(responeData.mKouserDat);
		data.m_lstKnebDat = responeData.m_lstKnebDat;
		data.m_lstLeasHmefDat = responeData.m_lstLeasHmefDat;
		data.mBusfDat_kang = responeData.mBusfDat_kang;
		data.mBusfDat_hmcd13 = responeData.mBusfDat_hmcd13;
		data.mHynmDat = new HynmDat().parseData(responeData.mHynmDat);
		data.getHmef0 = responeData.getHmef0;
		data.getHmef1 = responeData.getHmef1;
		data.getHmef2 = responeData.getHmef2;
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


export class PrintStatus {
	constructor() {
		/** 保安点検印刷フラグ */
		this.m_isPrintHoan = false;
		/** 入金印刷フラグ */
		this.m_isPrintNyukin = false;
		/** 領収印刷フラグ */
		this.m_lReceipt = 0;
		/** 残高 */
		this.m_lZandaka = 0;
		/** 検針印刷フラグ */
		this.m_isPrintKensin = false;
		/** 灯油印刷フラグ */
		this.m_isPrintToyu = false;
	}

	setValue(m_isPrintHoan, m_isPrintNyukin, m_lReceipt, m_lZandaka, m_isPrintKensin, m_isPrintToyu) {
		var data = new PrintStatus();

		data.m_isPrintHoan = m_isPrintHoan;
		data.m_isPrintNyukin = m_isPrintNyukin;
		data.m_lReceipt = m_lReceipt;
		data.m_lZandaka = m_lZandaka;
		data.m_isPrintKensin = m_isPrintKensin;
		data.m_isPrintToyu = m_isPrintToyu;
		return data;
	}
}


export class WriteDataDat {
	constructor() {
		/** 調査点検実績情報 */
		this.m_oSecLawDat = null;
		/** 点検結果一覧 */
		this.m_lLawItem = null;
		/** 販売の伝票と明細 */
		this.m_oDenpyoMeisaiDat = null;
		/** メーター指針 */
		this.m_oMetMeisaiDat = null;
		/** ガス料金計算結果 */
		this.m_oGasraterDat = null;
		/** モード（0:新規追加、1:修正、2:削除） */
		this.m_nMode = 0;
		/** ログインID */
		this.login_id = 0;
		/** ログインパスワード */
		this.login_pw = 0;
		this.m_kokfDat = null;
	}

	setValue(m_oSecLawDat, m_lLawItem, m_oDenpyoMeisaiDat, m_oMetMeisaiDat, m_oGasraterDat, m_nMode, login_id, login_pw) {
		var data = new WriteDataDat();

		data.m_oSecLawDat = m_oSecLawDat;
		data.m_lLawItem = m_lLawItem;
		data.m_oDenpyoMeisaiDat = m_oDenpyoMeisaiDat;
		data.m_oMetMeisaiDat = m_oMetMeisaiDat;
		data.m_oGasraterDat = m_oGasraterDat;
		data.m_nMode = m_nMode;
		data.login_id = login_id;
		data.login_pw = login_pw;
		return data;
	}
}


export class MetMeisaiDat {
	constructor() {
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


	setValue(nCusrec, dtSeiymd, dtSysymd, nOld_ss, nNew_ss, nKenmsr, nTancd, strTanname, nWrt_tancd, dtWrt_ymd) {
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

export class SeclawDat {
	constructor() {
		/** 顧客管理コード */
		this.m_nCusrec = 0;
		/** 調査点検日付 */
		this.m_dtEntymd = null;
		/** 総合結果 */
		this.m_bRes = 0;
		this.m_strTanname;
		this.m_sTancd;
	}

	setValue(nCusrec, dtEnt_ymd, bRes, strTanname, nTancd) {
		var data = new SeclawDat();
		data.m_nCusrec = nCusrec;
		data.m_dtEntymd = dtEnt_ymd;
		data.m_bRes = bRes;
		data.m_strTanname = strTanname;
		data.m_sTancd = nTancd;
		return data;
	}
}

export class LawItemDat {
	constructor() {
		/** コード */
		this.code = 0;
		/** 値 */
		this.value = 0;
	}

	setValue(nCode, nValue) {
		var data = new LawItemDat();
		data.code = nCode;
		data.value = nValue;
		return data;
	}
}


export class HnDenMeiDat {
	constructor() {
		/** 伝票：顧客内部管理コード */
		this.d_cusrec = 0;
		/** 伝票：顧客請求月度（値がnullの場合は、エラーとなります。） */
		this.d_seiymd = 0;
		/** 伝票：システム月度（値がnullの場合は、今現在の販売システム年月が割り当てられます。） */
		this.sysymd = 0;
		/** 伝票：伝票番号 */
		this.m_dtEntymd = 0;
		/** 伝票：伝票日付 */
		this.d_denymd = 0;
		/** 伝票：伝票区分 0:前月残高, 1:通常, 2:割賦 */
		this.d_denku = 0;
		/** 伝票：商品取引区分 0:売上, 1:返品 */
		this.d_torku = 0;
		/** 伝票：伝票番号（処理時、値が-1である場合は、自動的に順序キーが割り当てられます。） */
		this.d_denno = 0;
		/** 明細：削除フラグ */
		this.m_delflg = 0;
		/** 伝票：金額 */
		this.d_kin = 0;
		/** 伝票：内税 */
		this.utax = 0;
		/** 伝票：外税 */
		this.d_stax = 0;
		/** 伝票：消費税端数処理計算方法 */
		this.d_taxcom = 0;
		/** 伝票：消費税端数処理 */
		this.d_taxhas = 0;
		/** 伝票：担当者コード */
		this.d_tancd = 0;
		/** 伝票：担当者名称 */
		this.d_tanname = 0;
		/** 伝票：指針 */
		this.d_sisin = 0;
		/** 伝票：使用量 */
		this.d_siyouryo = 0;
		/** 伝票：検針期間 */
		this.d_days = 0;
		/** 伝票：検針使用率 */
		this.d_srpday = 0;
		/** 伝票：検針区分 */
		this.d_kenku = 0;
		/** 伝票：データ発送フラグ（主に検針データ発送向け） */
		this.d_sendf = 0;
		/** 伝票：データ発送日付（主に検針データ発送向け） */
		this.d_sendymd = 0;
		/** 伝票：データ発送フラグ２（主に売上データ発送向け） */
		this.d_send2f = 0;
		/** 伝票：データ発送日付２（主に売上データ発送向け） */
		this.d_send2ymd = 0;
		/** 伝票：伝票が割賦扱いとなった場合のリンクコード */
		this.d_kapcnt = 0;
		/** 伝票：リース伝票とリンクします。 */
		this.d_les_key = 0;
		/** 伝票：伝票が分割金である場合、もととなる割賦伝票の内部管理コード */
		this.d_kap_key = 0;
		/** 伝票：記入する時に連動元となった伝票の内部管理コード(連動元は0, 連動対象は連動元のdencnt) */
		this.d_lnk_dencnt = 0;
		/** 伝票：記入担当者コード（デフォルトは、other.DB.userNo） */
		this.d_wrt_tancd = 0;
		/** 明細：記入プログラムコード */
		this.m_wrt_prg = 0;
		/** 明細：消費税区分 */
		this.m_taxku = 0;
		/** 明細：消費税 */
		this.m_tax = 0;
	}

	setValue(d_cusrec, d_seiymd, sysymd, entymd, d_denymd, d_denku, d_torku, d_denno, m_delflg, d_kin, utax,
		d_stax, d_taxcom, d_taxhas, d_tancd, d_tanname, d_sisin, d_siyouryo, d_days, d_srpday, d_kenku,
		d_sendf, d_sendymd, d_send2f, d_send2ymd, d_kapcnt, d_les_key, d_kap_key, d_lnk_dencnt, d_wrt_tancd, m_wrt_prg) {
		var data = new HnDenMeiDat();

		data.d_cusrec = d_cusrec;
		data.d_seiymd = d_seiymd;
		data.sysymd = sysymd;
		data.entymd = entymd;
		data.d_denymd = d_denymd;
		data.d_denku = d_denku;
		data.d_torku = d_torku;
		data.d_denno = d_denno;
		data.m_delflg = m_delflg;
		data.d_kin = d_kin;
		data.utax = utax;
		data.d_stax = d_stax;
		data.d_taxcom = d_taxcom;
		data.d_taxhas = d_taxhas;
		data.d_tancd = d_tancd;
		data.d_tanname = d_tanname;
		data.d_sisin = d_sisin;
		data.d_siyouryo = d_siyouryo;
		data.d_days = d_days;
		data.d_srpday = d_srpday;
		data.d_kenku = d_kenku;
		data.d_sendf = d_sendf;
		data.d_sendymd = d_sendymd;
		data.d_send2f = d_send2f;
		data.d_send2ymd = d_send2ymd;
		data.d_kapcnt = d_kapcnt;
		data.d_les_key = d_les_key;
		data.d_kap_key = d_kap_key;
		data.d_lnk_dencnt = d_lnk_dencnt;
		data.d_wrt_tancd = d_wrt_tancd;
		data.m_wrt_prg = m_wrt_prg;
		return data;
	}
}

export class KnebDat {
	constructor() {
		/** コード */
		this.m_nCode = 0;
		/** 有無 */
		this.m_nUmu = 0;
		/** 種別 */
		this.m_nKind = 0;
		/** 値引き金額 */
		this.m_nSkkin = 0;
		/** 値引率 */
		this.m_nSkper = 0;
		/** 商品コード */
		this.m_nSncode = 0;
		/** 使用量下限 */
		this.m_nLimit_s = 0;
		/** 使用量上限 */
		this.m_nLimit_e = 0;
		/** 結果 */
		this.m_nRes = 0;
		/** 金額 */
		this.m_nKin = 0;
		/** 消費税 */
		this.m_nTax = 0;
		/** 使用量下限 */
		this.m_nLowlimit = 0;
	}

	setValue(code, numu, nkind, nsskin, nskper, nsncode, nlimits, nlimite, nres, nkin, ntax, nlowlimit) {
		var data = new KnebDat();

		data.m_nCode = code;
		data.m_nUmu = numu;
		data.m_nKind = nkind;
		data.m_nSkkin = nsskin;
		data.m_nSkper = nskper;
		data.m_nSncode = nsncode;
		data.m_nLimit_s = nlimits;
		data.m_nLimit_e = nlimite;
		data.m_nRes = nres;
		data.m_nKin = nkin;
		data.m_nTax = ntax;
		data.m_nLowlimit = nlowlimit;

		return data;
	}
}

export class ShofDat {
	constructor() {
		/** 使用有無 */
		this.mUsef = 0;
		/** 品目No(取引区分No) */
		this.mHinno = 0;
		/** 品番No */
		this.mShono = 0;
		/** 名称(型式名) */
		this.mHinban = "";
		/** 単位 */
		this.mUnit = "";
		/** 消費税区分 */
		this.mTaxKu = 0;
		/** 消費税率 */
		this.mTaxR = 0;
		/** 単価 */
		this.mTanka = 0;
		/** 消費税端数処理：加算 */
		this.mFracAddTax = 0;
		/** 消費税端数処理：乗算 */
		this.mFracAddMult = 0;
		/** 消費税変更日付 */
		this.mTax_yy = 0;
		/** 消費税変更日付 **/
		this.mTax_mm = 0;
		/** 消費税変更日付 */
		this.mTax_dd = 0;
		/** 消費税変更旧税率 */
		this.mTaxr_old = 0;
		/** 消費税変更新税率 */
		this.mTaxr_new = 0;
	}

	setValue(mUsef, mHinno, mShono, mHinban, mUnit, mTaxKu, mTaxR
		, mTanka, mFracAddTax, mFracAddMult, mTax_yy, mTax_mm, mTax_dd
		, mTaxr_old, mTaxr_new) {
		var shofdat = new ShofDat();
		shofdat.mUsef = mUsef;
		shofdat.mHinno = mHinno;
		shofdat.mHinban = mHinban;
		shofdat.mShono = mShono;
		shofdat.mUnit = mUnit;
		shofdat.mTaxKu = mTaxKu;
		shofdat.mTaxR = mTaxR;
		shofdat.mTanka = mTanka;
		shofdat.mFracAddMult = mFracAddMult;
		shofdat.mFracAddTax = mFracAddTax;
		shofdat.mTax_yy = mTax_yy;
		shofdat.mTax_mm = mTax_mm;
		shofdat.mTax_dd = mTax_dd;
		shofdat.mTaxr_old = mTaxr_old;
		shofdat.mTaxr_new = mTaxr_new;

		return shofdat;
	}

	parseData(responeData) {
		var shofdat = new ShofDat();
		if (responeData == null) {
			return shofdat;
		}
		shofdat.mUsef = parseInt(responeData.MUSEF);
		shofdat.mHinno = parseInt(responeData.MHINNO);
		shofdat.mHinban = parseInt(responeData.MHINBAN);
		shofdat.mShono = String(responeData.MSHONO);
		shofdat.mUnit = String(responeData.MUNIT);
		shofdat.mTaxKu = parseInt(responeData.MTAXKU);
		shofdat.mTaxR = parseInt(responeData.MTAXR);
		shofdat.mTanka = parseInt(responeData.MTANKA);
		shofdat.mFracAddMult = parseInt(responeData.MFRACADDMULT);
		shofdat.mFracAddTax = parseInt(responeData.MFRACADDTAX);
		shofdat.mTax_yy = parseInt(responeData.MTAX_YY);
		shofdat.mTax_mm = parseInt(responeData.MTAX_MM);
		shofdat.mTax_dd = parseInt(responeData.MTAX_DD);
		shofdat.mTaxr_old = parseInt(responeData.MTAXR_OLD);
		shofdat.mTaxr_new = parseInt(responeData.MTAXR_NEW);

		return shofdat;
	}
}

export class Hme2Dat {
	constructor() {
		/** 備考 */
		this.mBikou = "";
		/** 現金売りflag */
		this.m_bGenuri = 0;
		/** 売上明細レコード(入金・調整のみ書込み) */
		this.m_nUrirec = 0;
		/** 預り金(売上明細のみ書込み) */
		this.m_nReceipt = 0;
	}

	setValue(mBikou, m_bGenuri, m_nUrirec, m_nReceipt) {
		var data = new Hme2Dat();
		data.mBikou = mBikou;
		data.m_bGenuri = m_bGenuri;
		data.m_nUrirec = m_nUrirec;
		data.m_nReceipt = m_nReceipt;
	}


	parseData(responeData) {
		var data = new Hme2Dat();
		if (responeData == null) {
			return data;
		}

		data.mBikou = mBikou;
		data.m_bGenuri = m_bGenuri;
		data.m_nUrirec = m_nUrirec;
		data.m_nReceipt = m_nReceipt;;
		return data
	}
}


export class PrintGenuriInfo {
	constructor() {
		/** 伝票用氏名1 */
		this.m_strSname_0 = "";
		/** 伝票用氏名2 */
		this.m_strSname_1 = "";
		/** 現金売りフラグ */
		this.m_isGenuri = false;
		/** 調整額 */
		this.m_nChokin = 0;
		/** 入金額 */
		this.m_nNyukin = 0;
		/** 預り金額 */
		this.m_nReceipt = 0;
		/** 今回売上明細一覧 */
		this.m_lstHmefDat = null;
	}

	setValue(m_strSname_0, m_strSname_1, m_isGenuri, m_nChokin, m_nNyukin, m_nReceipt, m_lstHmefDat) {
		var data = new PrintGenuriInfo();
		data.m_strSname_0 = m_strSname_0;
		data.m_strSname_1 = m_strSname_1;
		data.m_isGenuri = m_isGenuri;
		data.m_nChokin = m_nChokin;
		data.m_nNyukin = m_nNyukin;
		data.m_nReceipt = m_nReceipt;
		data.m_lstHmefDat = m_lstHmefDat;
		return data;
	}


	parseData(responeData) {
		var data = new PrintGenuriInfo();
		if (responeData == null) {
			return data;
		}

		data.m_strSname_0 = responeData.m_strSname_0;
		data.m_strSname_1 = responeData.m_strSname_1;
		data.m_isGenuri = responeData.m_isGenuri;
		data.m_nChokin = responeData.m_nChokin;
		data.m_nNyukin = responeData.m_nNyukin;
		data.m_nReceipt = responeData.m_nReceipt;
		data.m_lstHmefDat = responeData.m_lstHmefDatc;
		return data
	}
}


/**
 * 売上機能の書き込むデータ
 */
export class HmefWriteDat {

	constructor() {
		/** 顧客管理番号 */
		this.m_nCusrec = 0;
		/** 顧客データ(標準)  */
		this.m_kokfDat = null;
		/** 販売明細一覧 */
		this.m_lstHmefDat = null;
		/** モード（0:新規追加、1:修正、2:削除） */
		this.m_nMode = 0;
		/** ログインID */
		this.m_strloginID = "";
		/** ログインパスワード */
		this.m_strloginPW = "";
	}
}

/**
 * 売上機能の書き込むデータ
 */
export class LoilWriteDat {

	constructor() {
		/** 顧客データ(標準)  */
		this.m_kokfDat = null;
		/** 販売明細一覧 */
		this.m_nMode = 0;
		/** ログインID */
		this.m_strloginID = "";
		/** ログインパスワード */
		this.m_strloginPW = "";
	}
}



export class HynmDat {
	constructor() {
		/** 種別 */
		this.mSyu = 0;
		/** コード */
		this.mCode = 0
		/** 名称 */
		this.mName = 0
	}

	setValue(mSyu, mCode, mName) {
		var data = new HynmDat();

		data.mSyu = mSyu;
		data.mCode = mCode;
		data.mName = mName;
		return data;
	}

	parseData(responeData) {
		var data = new HynmDat();
		if (responeData == null) {
			return data;
		}

		data.mSyu = responeData.mSyu;
		data.mCode = responeData.mCode;
		data.mName = responeData.mName;
		return data;
	}
}

/**
 * システム2情報(CNポイント)データクラス.
 */
export class Sy2fCnpDat {
	constructor() {
		/** CNコメント１ */
		this.mCnpComment_0 = "";
		/** CNコメント２ */
		this.mCnpComment_1 = "";
		/** CNコメント３ */
		this.mCnpComment_2 = "";
	}

	setValue(mCnpComment_0, mCnpComment_1, mCnpComment_2) {
		var data = new Sy2fCnpDat();

		data.mCnpComment_0 = mCnpComment_0;
		data.mCnpComment_1 = mCnpComment_1;
		data.mCnpComment_2 = mCnpComment_2;
		return data;
	}

	parseData(responeData) {
		var data = new Sy2fCnpDat();
		if (responeData == null) {
			return data;
		}

		data.mCnpComment_0 = responeData.mCnpComment_0;
		data.mCnpComment_1 = responeData.mCnpComment_1;
		data.mCnpComment_2 = responeData.mCnpComment_2;
		return data;
	}
}

/**
 * システム2情報(CNポイント)データクラス.
 */
export class Sy2fCnpTempDat {
	constructor() {
		/** CN仮会員コメント1 */
		this.mCnpTempComment_0 = "";
		/** CN仮会員コメント2 */
		this.mCnpTempComment_1 = "";
		/** CNコメント１ */
		this.mCnpComment_0 = "";
		/** CNコメント２ */
		this.mCnpComment_1 = "";
		/** CNコメント３ */
		this.mCnpComment_2 = "";

	}

	setValue(mCnpTempComment_0, mCnpTempComment_1, mCnpComment_0, mCnpComment_1, mCnpComment_2) {
		var data = new Sy2fCnpTempDat();

		data.mCnpTempComment_0 = mCnpTempComment_0;
		data.mCnpTempComment_1 = mCnpTempComment_1;
		data.mCnpComment_0 = mCnpComment_0;
		data.mCnpComment_1 = mCnpComment_1;
		data.mCnpComment_2 = mCnpComment_2;
		return data;
	}

	parseData(responeData) {
		var data = new Sy2fCnpTempDat();
		if (responeData == null) {
			return data;
		}

		data.mCnpTempComment_0 = responeData.mCnpTempComment_0;
		data.mCnpTempComment_1 = responeData.mCnpTempComment_1;
		data.mCnpComment_0 = responeData.mCnpComment_0;
		data.mCnpComment_1 = responeData.mCnpComment_1;
		data.mCnpComment_2 = responeData.mCnpComment_2;
		return data;
	}
}

/**
 * システム2データ(銀行不能コメント)クラス
 */
export class Sy2fFunouComment {
	constructor() {
		/** 不能コメント1 */
		this.mFunouComment0 = "";
		/** 不能コメント2 */
		this.mFunouComment1 = "";
	}

	setValue(mFunouComment0, mFunouComment1) {
		var data = new Sy2fFunouComment();

		data.mFunouComment0 = mFunouComment0;
		data.mFunouComment1 = mFunouComment1;

		return data;
	}

	parseData(responeData) {
		var data = new Sy2fFunouComment();
		if (responeData == null) {
			return data;
		}

		data.mCnpComment_0 = responeData.mCnpComment_0;
		data.mCnpComment_1 = responeData.mCnpComment_1;

		return data;
	}
}

export class KeyboardProp {
	constructor() {
		this.minus = false;
		this.dot = false;
		this.lengthVal = 0;
		this.numAfterDot = 0;
	}

	setValue(minus, dot, lengthVal, numAfterDot) {
		var data = new KeyboardProp();

		data.minus = minus;
		data.dot = dot;
		data.lengthVal = lengthVal;
		data.numAfterDot = numAfterDot;
		return data;
	}

	parseData(responeData) {
		var data = new KeyboardProp();
		if (responeData == null) {
			return data;
		}

		data.minus = responeData.minus;
		data.dot = responeData.dot;
		data.lengthVal = responeData.lengthVal;
		data.numAfterDot = responeData.numAfterDot;
		return data
	}
}


export class AndroidData {
	constructor() {
		this.type = "";
		this.printStatus;
		this.isHybseikyu;
		this.isHikae;
		this.mUserData = new UserData();
		this.kensinData = new KensinData();
		this.mKSIB = new KSIB();
		this.mKI = new KI();
	}

	setValue(type, printStatus, isHybseikyu, isHikae, mUserData, kensinData, mKSIB, mKI) {
		var data = new AndroidData();

		data.type = type;
		data.printStatus = printStatus;
		data.isHybseikyu = isHybseikyu;
		data.isHikae = isHikae;
		data.mUserData = mUserData;
		data.kensinData = kensinData;
		data.mKSIB = mKSIB;
		data.mKI = mKI;
		return data;
	}
}


export class HieuDat {
	constructor() {
		this.mName = "";
		this.mTel = "";
		this.mFax = "";
		this.mAdd1 = "";
		this.mAdd2 = "";
		this.mAdd3 = "";
	}

	setValue(mName, mTel, mFax, mAdd1, mAdd2, mAdd3) {
		var data = new HieuDat();

		data.mName = mName;
		data.mTel = mTel;
		data.mFax = mFax;
		data.mAdd1 = mAdd1;
		data.mAdd2 = mAdd2;
		data.mAdd3 = mAdd3;
		return data;
	}
}

export class KSIB {
	constructor() {
		this.sSisin = "";
		this.bIsChgMeter = false;
		this.sToritsukjJiZenkaiSiSin = "";
		this.sSisinPrev = "";
		this.sChukanSur = "";
		this.sNowUse = "";
		this.bIsPrnZensr = false;
		this.sPreUse = "";
		this.bIsPrintZenYearKenSr = false;
		this.sZenYearKenSr = "";
		this.sTorihazuSiSinDate = "";
		this.sZenkaiSiSinDate = "";
		this.sChgZsisin = "";
		this.sGasPay = "";
		this.bIsPrnGasBaseKin = false;
		this.sKihonRyookin = "";
		this.bIsHybrid = false;
		this.nGashyb = 0;
		this.sRyookinTitle = "";
		this.sRyookin = "";
		this.counterUseKinDat = new CounterUseKinDat();
		this.gasfDat = null;
		this.nGasTax = "";
		this.nKnebFlg = 0;
		this.bIfReduce = false;
		this.nReduce = 0;
		this.sKangcontname = "";
		this.bIsPrintGasRyokinTotal = false;
		this.sGasTotalKin = "";
	}

	setValue(sSisin, bIsChgMeter, sToritsukjJiZenkaiSiSin, sSisinPrev, sChukanSur, sNowUse, bIsPrnZensr, 
			sPreUse, bIsPrintZenYearKenSr, sZenYearKenSr, sTorihazuSiSinDate, sZenkaiSiSinDate, sChgZsisin, 
			sGasPay, bIsPrnGasBaseKin, sKihonRyookin, bIsHybrid, nGashyb, sRyookinTitle, sRyookin, counterUseKinDat, 
			gasfDat, nGasTax, nKnebFlg, bIfReduce, nReduce, sKangcontname, bIsPrintGasRyokinTotal, sGasTotalKin ) {
		var data = new KSIB();

		data.sSisin = sSisin;
		data.bIsChgMeter = bIsChgMeter;
		data.mFax = mFax;
		data.sToritsukjJiZenkaiSiSin = sToritsukjJiZenkaiSiSin;
		data.sSisinPrev = sSisinPrev;
		data.sChukanSur = sChukanSur;
		data.sNowUse = sNowUse;
		data.bIsPrnZensr = bIsPrnZensr;
		data.sPreUse = sPreUse;
		data.bIsPrintZenYearKenSr = bIsPrintZenYearKenSr;
		data.sZenYearKenSr = sZenYearKenSr;
		data.sTorihazuSiSinDate = sTorihazuSiSinDate;
		data.sZenkaiSiSinDate = sZenkaiSiSinDate;
		data.sChgZsisin = sChgZsisin;
		data.sGasPay = sGasPay;
		data.bIsPrnGasBaseKin = bIsPrnGasBaseKin;
		data.sKihonRyookin = sKihonRyookin;
		data.bIsHybrid = bIsHybrid;
		data.nGashyb = nGashyb;
		data.sRyookinTitle = sRyookinTitle;
		data.sRyookin = sRyookin;
		data.counterUseKinDat = counterUseKinDat;
		data.gasfDat = gasfDat;
		data.nGasTax = nGasTax;
		data.nKnebFlg = nKnebFlg;
		data.bIfReduce = bIfReduce;
		data.nReduce = nReduce;
		data.sKangcontname = sKangcontname;
		data.bIsPrintGasRyokinTotal = bIsPrintGasRyokinTotal;
		data.sGasTotalKin = sGasTotalKin;
		return data;
	}
}

export class CounterUseKinDat {
	constructor() {
		this.nUseKin = 0;
		this.nUseSncode = 0;
		this.sKin = "";
	}

	setValue(nUseKin, nUseSncode, sKin) {
		var data = new CounterUseKinDat();

		data.nUseKin = nUseKin;
		data.nUseSncode = nUseSncode;
		data.sKin = sKin;
		return data;
	}
}


export class KI {
	constructor() {
		this.bNyukinOnly = false;
		this.bIfDemand = false;
		this.sZanTitle = "";
		this.nPreReceipt = 0;
		this.bIfProceeds = false;
		this.nHmDay = 0;
		this.nHmMonth = 0;
		this.nTReceipt = 0;
		this.nTAdjust = 0;
		this.nReceipt = 0;
		this.bIsFuriDemand = false;
		this.sIraimsg = "";
		this.sChoseiTitle = "";
		this.nChosei = 0;
		this.nNyukin = 0;
		this.nAzukarikin = 0;
		this.nKZandaka = 0;
		this.nLZandaka = 0;
	}

	setValue(bNyukinOnly, bIfDemand, sZanTitle, nPreReceipt, bIfProceeds, nHmDay, nHmMonth, nTReceipt, nTAdjust, 
			nReceipt,bIsFuriDemand, sIraimsg, sChoseiTitle, nChosei, nNyukin, nAzukarikin, nKZandaka, nLZandaka) {
		var data = new KI();

		data.bNyukinOnly = bNyukinOnly;
		data.bIfDemand = bIfDemand;
		data.sZanTitle = sZanTitle;
		data.nPreReceipt = nPreReceipt;
		data.bIfProceeds = bIfProceeds;
		data.nHmDay = nHmDay;
		data.nHmMonth = nHmMonth;
		data.nTReceipt = nTReceipt;
		data.nTAdjust = nTAdjust;
		data.nReceipt = nReceipt;
		data.bIsFuriDemand = bIsFuriDemand;
		data.sIraimsg = sIraimsg;
		data.sChoseiTitle = sChoseiTitle;
		data.nChosei = nChosei;
		data.nNyukin = nNyukin;
		data.nAzukarikin = nAzukarikin;
		data.nKZandaka = nKZandaka;
		data.nLZandaka = nLZandaka;
		return data;
	}
}