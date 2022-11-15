/*
	******  VALUES  ******
*/
export class KensinData {
	constructor() {
		/** 今回指針 */
		this.m_Sisin;
		/** 前回検針月 */
		this.m_KensinPrevMonth;
		/** 前回検針日 */
		this.m_KensinPrevDay;
		/** 前回指針 */
		this.m_SisinPrev;
		/** 今回使用量 */
		this.m_NowUse;
		/** 前回使用量 */
		this.m_PreUse;
		/** ガス売上 */
		this.m_GasPay;
		/** ガス消費税 */
		this.m_GasTax;
		/** 調整費 */
		this.m_Reduce;
		/** メーター取替有無 */
		this.m_bChgMeter;
		/** メーター取替月 */
		this.m_ChgMonth;
		/** メーター取替日 */
		this.m_ChgDay;
		/** メーター取替前回指針 */
		this.m_ChgZsisin;
		/** メーター取り外し指針 */
		this.m_ChgSisin;
		/** 中間使用量 */
		this.m_ChukanSur;
		/** 前月残高 */
		this.m_PreReceipt;
		/** 本日売上 */
		this.m_HmDay;
		/** 当月売上 */
		this.m_HmMonth;
		/** 今回請求額 */
		this.m_Receipt;
		/** 預かり金 */
		this.m_Azukarikin;
		/** 入金 */
		this.m_Nyukin;
		/** 調整 */
		this.m_Chosei;
		/** 残高 */
		this.m_Zandaka = 0;
		/** CNポイント使用フラグ */
		this.mCnp;
		/** CNポイントデータ */
		this.mCnpCusDat;
		/** CNポイント本会員用コメント */
		this.mCnpMemberCmt;
		/** CNポイント仮会員用コメント */
		this.mCnpTempCmt;
		/** 前回使用量印字フラグ */
		this.mPrnZensr;
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
		this.m_GasfDat;
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
		this.m_isHybrid;
		/** 顧客ハイブリッドデータ */
		this.mKo2fDat = null;
		/** ガス料金のみ */
		this.m_nOnlyGas;
		/** ガス料金透明化フラグ */
		this.m_isVisibleGas;
		/** 通常使用量 */
		this.m_nNorSr = 0;
		/** ハイブリッドガス使用量 */
		this.m_nHybGasUse = null;
		/** 顧客灯油データ */
		this.mKotfDat;
		/** 灯油料金分割印字 */
		this.m_isToyuKinSep;
		/** 検針のみ印刷 */
		this.m_isPrintKensin;
		/** 灯油のみ印刷 */
		this.m_isPrintToyu;
		/** 灯油単価 */
		this.m_nLoilUnit;
	}
};

export var shukeiItem = {
	mKensu: 0,
	/** ガス使用量 */
	mGsiyou: 0,
	/** ガス料金 */
	mGryokin: 0,
	/** 消費税 */
	mShohi: 0,
	/**還元額 */
	mKang: 0,
	mTotal: 0,
	/** 入金額 */
	mNyukin: 0,
	/** 調整額 */
	mChosei: 0,
	/** 入金件数 */
	mNyucnt: 0,
	/** 売上件数 */
	mUricnt: 0,
	/** 売上数量 */
	mUrisur: 0,
	/** 売上金額 */
	mUrikin: 0,
	/** 売上消費税金額 */
	mUritax: 0,
	/** 灯油検針件数 */
	mToyuCnt: 0,
	/** 灯油使用量 */
	mToyuUse: 0,
	/** 灯油金額 */
	mToyuKin: 0,
	/** 灯油消費税 */
	mToyuTax: 0,
	/** 灯油金額合計 */
	mToyuTotal: 0
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

export var mGtpc = {
	/** ガス料金印字 */
	m_nPrintGasRyokinSiki: 0,
	/** ガス料金総額印字 */
	m_nPrintGasRyokinTotal: 0,
	/** 日割りコメント印字 */
	m_nPrintHiwariComment: 0,
	/** 日割りコメント1 */
	m_strHiwariComment_0: null,
	/** 日割りコメント2 */
	m_strHiwariComment_1: null,
	/** 前年同月使用量印字フラグ */
	m_nPrintZenyearkensr: 0,
	/** 検針伝票タイトル */
	m_strTitle_0: null,
	/** 検針伝票タイトル（領収書） */
	m_strTitle_1: null,
	/** 検針伝票タイトル（控え） */
	m_strTitle_2: null,
	/** 検針伝票タイトル（領収書控え） */
	m_strTitle_3: null,
	/** ガス料金式印字パターン(0: 秋元式, 1: 大口式) */
	m_nPrintGastablePtn: 0,
}

export var mZyksDat = {
	/** 使用量 */
	m_nSr: 0,
	/** 伝票日付(年) */
	m_nDenymd_year: 0,
	/** 伝票日付(月) */
	m_nDenymd_month: 0,
	/** 伝票日付(日) */
	m_nDenymd_day: 0
}


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


export var TaxDat = {
	/** ガス内税 */
	mGUchiZei: 0,
	/** ガス外内税 */
	mUchiZei: 0
}

export class HmefDat {
	constructor() {
		/** 使用有無 */
		this.mUsef;
		/** 明細種別 0:締後、1:締前、9:ﾊﾝﾃﾞｨ、2：残高明細 */
		this.mHmeKind;
		/** リース明細かどうか */
		this.mLeasKind;
		/** 金額 */
		this.mKin;
		/** 消費税額 */
		this.mTax;

		//Hieu
		/** 使用有無 */
		this.mUsef;
		/** 品目No >=100 */
		this.mHmCode;
	}
}