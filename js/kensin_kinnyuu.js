// class KokfDat {
//   constructor() {
//     /** 漢字氏名 */
//     this.mName = "佐々木　弘子"; // NAME
//     /** 検針月 */
//     this.mKMonth = 5;
//     /** 検針日 */
//     this.mKDate = 7;
//     /** 今回入力：ガス使用量 */
//     this.mGasUse = 250;
//     /** 顧客区分　 */
//     this.mGasKubun = 1;
//     /** 検針済み区分 */
//     this.mKenSumi = true;
//     /** 今回入力：今回指針 */
//     this.mNowMeter = 250;
//     /** 前回指針 */
//     this.mPreMeter = 0;
//     /** 前回検針日付:年 */
//     this.mPuseYear = 0;
//     /** 前回検針日付：月 */
//     this.mPuseMonth = 0;
//     /** 前回検針日付：日 */
//     this.mPuseDate = 0;
//     /** ガス料金No */
//     this.mGasDiv = 9;
//     /** 今回入力：消費税 */
//     this.mConTax = 800;
//     /** 中間使用量(検針) */
//     this.mBetwMeter = 0;
//     /** 前回使用量 */
//     this.mPreUse = 0;
//     /** 今回入力：金額 */
//     this.mFee = 10000;
//     /** 日割り日数 */
//     this.mHiwari = 0;
//     /** 当月：消費税(分割) */
//     this.mTaxDiv = 0;
//     /** 締日処理フラグ */
//     this.mSimeF = 0;
//     /** 開栓日付：年 */
//     this.mKaiYear = 0;
//     /** 開栓日付：月 */
//     this.mKaiMonth = 0;
//     /** 開栓日付：日 */
//     this.mKaiDate = 0;
//     /** ガス料金内訳データ */
//     this.mKtpcdat = new KtpcDat(15000000, 85000000, 0);
//     /** 供給区分 */
//     this.mSupplyForm = 1;
//     /** 契約料金(基本) */
//     this.mGasBase = 0; // GASBASE
//     /** メーター桁数 */
//     this.mMtKeta = 4;  //MTKETA
//     /** 契約料金(単価) */
//     this.mGasUnit = 0;
//     /** ハイブリッド請求フラグ */
//     this.mHybseikyu = 0;
//     /** 今回入力：その他売上金額 */
//     this.mUrikin = 0;
//     /** 今回入力：その他売上消費税 */
//     this.mUriTax = 0;
//     /** 今回入力：還元額 */
//     this.mReduce = 0;
//     /** 今回入力：還元額の消費税 */
//     this.mReduceTax = 0;
//     /** 顧客灯油 */
//     var mKotfDat = null;
//     this.mKotfDat = mKotfDat;
//     /** 当月：遅収料金 */
//     this.mProcTisyuu = 0;
//     /** 当月：消費税(遅収料金) */
//     this.mTaxTisyuu = 0;
//     /** 前月残高 */
//     this.mPreBalance = 14048;
//     /** 当月：調整額 */
//     this.mTAdjust = 0;
//     /** 当月：入金額 */
//     this.mTReceipt = 0;
//     /** 当月：売上額(リース) */
//     this.mProcLease = 0;
//     /** 当月：消費税(リース) */
//     this.mTaxLease = 0;
//     /** 当月：売上額(分割金) */
//     this.mProcDiv = 0;
//     /** 当月：売上額(灯油) */
//     this.mProcLoil = 0;
//     /** 当月：消費税(灯油) */
//     this.mTaxLoil = 0;
//     /** 当月：売上額(その他) */
//     this.mProcEtc = 0;
//     /** 当月：消費税(その他) */
//     this.mTaxEtc = 0;
//     /** 当月：売上額(ガス) */
//     this.mProcGas = 0;
//     /** 当月：消費税(ガス) */
//     this.mTaxGas = 0;
//     /** 当月：遅収料金 */
//     this.mProcTisyuu = 0;
//     /** 当月：消費税(遅収料金) */
//     this.mTaxTisyuu = 0;
//     /** 今回入力：入金額 */
//     this.mReceipt = 0; 
//     /** 今回入力：調整額 */
//     this.mAdjust = 0;

//   }
// }

// class Ko2fDat {
//   constructor() {
//     /** ハイブリッド料金区分 */
//     this.mGashyb;
//     /** カウント値引:税区分 */
//     this.mChoTaxku;
//     /** カウント値引消費税 */
//     this.mChoTax;
//     /** カウンタ使用料 */
//     this.mUseKin;
//     /** カウンター使用料:税区分 */
//     this.mUseTaxku;
//     /** カウンタ使用料消費税 */
//     this.mUseTax;
//     /** カウント値引 */
//     this.mChoKin;
//   }
// }

// class KtpcDat {
//   constructor(m_nBasekin, m_nAddkin, m_nFacilitykin) {
//     this.m_nBasekin = m_nBasekin;
//     this.m_nAddkin = m_nAddkin;
//     this.m_nFacilitykin = m_nFacilitykin;
//   }
// }

// class Sy2fDat {
//   constructor() {
//     /** 中圧係数での使用量端数処理(0:切り捨て, 1:四捨五入, 2:切り上げ) */
//     this.mCaHas = 0;
//     /** 中圧ガス料金計算有無 */
//     this.mCaFlg = 0;
//     /** 差益還元品番コード */
//     this.mKangHbcd = 0;
//     /** 差益還元コード */
//     this.mKangHcd = 0;
//     /** 入金・調整取引区分設定フラグ */
//     this.mNyucho = 0;
//     /** ハイブリッド料金区分 */
//     this.mGashyb;
//     /** オプション3 */
//     var mSysOption = [
//       1, 1, -1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 5, 0, 0,
//     ];
//     this.mSysOption = mSysOption;
//   }
// }

// class SysfDat {
//   constructor() {
//     /** 管ガス:最低検針日数 */
//     this.mKgasDays0 = 25;
//     /** 管ガス:最大検針日数 */
//     this.mKgasDays1 = 35;
//     /** 管ガス:閉開栓時日数 */
//     this.mKgasDays2 = 29;
//     /** 消費税変更日付 */
//     this.mTax_yy = 1970;
//     this.mTax_mm = 1;
//     this.mTax_dd = 1;
//     /** 消費税率 */
//     this.mConsumTax = 80;
//     /** 消費税変更旧税率 */
//     this.mTaxr_old = 50;
//     this.mTaxr_new = 80;
//     /** ガス料金透明化対応フラグ */
//     this.mVisibleGas = 1;
//     /** ガス料金透明化設備料金対応フラグ */
//     this.mVisibleFacility = 0;
//     /** リース計上機能有無 */
//     this.mLesUmu = 1;
//     /** 売上用端数処理:加算 */
//     this.mFracAddKin = 0;
//     /** 売上用端数処理:乗算 */
//     this.mFracMulKin = 1000;
//     /** 消費税:端数処理(加算) */
//     this.mFracAddTax = 0;
//     /** 消費税:端数処理(乗算) */
//     this.mFracMulTax = 1000;
//     //
//     this.mFracAddMult = null;
//     /** システム年 */
//     this.mSysYear = 2019;
//     /** 処理日付(月) */
//     this.mMonth = 5;
//     /** 処理日付(日) */
//     this.mDate = 1;
//     /** 差益還元:有無 */
//     this.mIfReduce = false;
//     /** 商品消費税の使用依頼 */
//     this.mShoTaxcom = 0;
//     /** 入力有無:保安点検 */
//     this.mCheckHoan = true;
//     /** 入力有無:入金 */
//     this.mIfMoney = true;
//     /** 簡ガス日常点検有無 */
//     this.mTenkenKgas = 0;
//     /** 灯油検針フラグ */
//     this.m_isToyukeninFlg = false;
//     /** 使用率チェック:倍率 */
//     this.mSrChkr = [50, 250, 50, 200, 60, 180];
//     /** 使用率チェック:使用率 */
//     this.mSrChkm = [20, 60];
//     /** 値引きシステムフラグ */
//     this.mKnebFlg = 0;
//     /** 伝票出力フラグ:入金・調整 */
//     this.mIfAdjust = true;
//     /** 伝票出力フラグ:警報機リース */
//     this.mIfAlarm = true;
//     /** 伝票出力フラグ:分割金 */
//     this.mIfDiv = true;
//     /** 伝票出力フラグ:灯油 */
//     this.mIfLampoil = true;
//     /** 伝票出力フラグ:その他売上 */
//     this.mIfProceeds = true;
//     /** 伝票出力フラグ:前月請求額 */
//     this.mIfDemand = true;

//   }
// }

// class KouserDat {
//   constructor() {
//     /** 中圧係数 */
//     this.m_nChuatu = 0;
//     /** 個別検針顧客 */
//     this.m_nKoubetsu = 0;
//     /** ハイブリッドカウンター有無 */
//     this.mHyc5 = 0;
//     /** 調整取引区分 */
//     this.m_sChocode = 0;
//     /** 入金取引区分 */
//     this.m_sNyucode = 0;
//   }
// }

// class GasfDat {
//   constructor(m_lstGstpDat) {
//     /** 計算方法 */
//     this.mSum = 1;
//     /** 料金表種別 */
//     this.mSyu = 0;
//     /** 端数処理1：加算 */
//     this.mFrac1Add = 0;
//     /** 端数処理2:加算 */
//     this.mFrac2Add = 0;
//     /** 端数処理1:乗算 */
//     this.mFrac1Mult = 1000;
//     /** 端数処理2:乗算 */
//     this.mFrac2Mult = 10000;
//     /** 増減率 */
//     this.mRiseFall = 0;
//     /** ガス料金ステップデータ */
//     this.m_lstGstpDat = m_lstGstpDat;
//     /** 消費税区分 */
//     this.mTaxDiv = 3;
//     /** 消費税端数処理：加算 */
//     this.mTaxAdd = 0;
//     /** 消費税端数処理：乗算 */
//     this.mTaxMult = 10000;
//     /** 調整単価 */
//     this.mChoTanka = 0;
//     /** ガス料金拡張データ */
//     var mGextDat = new GextDat();
//     this.mGextDat = mGextDat;
//   }
// }

// class GstpDat {
//   constructor(mUplimit, mAdd, mBase) {
//     /** 上限値 */
//     this.mUplimit = mUplimit;
//     /** 加算値 */
//     this.mAdd = mAdd;
//     /** 基準料金 */
//     this.mBase = mBase;
//   }
// }

// class KnebDat {
//   constructor() {
//     /** コード */
//     this.m_nCode;
//     /** 有無 */
//     this.m_nUmu;
//     /** 結果 */
//     this.m_nRes;
//     /** 金額 */
//     this.m_nKin;
//     /** 消費税 */
//     this.m_nTax;
//   }
// }

// class HmefDat {
//   constructor() {
//     /** 使用有無 */
//     this.mUsef;
//     /** 明細種別 0:締後、1:締前、9:ﾊﾝﾃﾞｨ、2：残高明細 */
//     this.mHmeKind;
//     /** リース明細かどうか */
//     this.mLeasKind;
//     /** 金額 */
//     this.mKin;
//     /** 消費税額 */
//     this.mTax;
//   }
// }

// class BusfDat {
//   constructor() {}
// }

// class KotfDat {
//   constructor() {
//     /** 灯油検針済み区分(0:未, 1:済) */
//     this.m_bKen_sumi;
//     /** 灯油料金 */
//     this.m_nFee;
//     /** 灯油消費税額 */
//     this.m_nCon_tax;
//   }
// }

// class GextDat {
//   constructor() {
//     /** ガス基本料金 */
//     this.m_nBasekin = 0;
//     /** ガス設備料 */
//     this.m_nFacilitykin = 0;
//   }
// }

// class KensinData{


//     // --------------------------------------------------
//     // 定数


//     // --------------------------------------------------
//     // 変数
//     // --------------------------------------------------
//     /** 今回指針 */
//     // static  let m_Sisin;
//     // /** 前回検針月 */
//     // var m_KensinPrevMonth;
//     // /** 前回検針日 */
//     // private final int m_KensinPrevDay;
//     // /** 前回指針 */
//     // private final int m_SisinPrev;
//     // /** 今回使用量 */
//     // private final int m_NowUse;
//     // /** 前回使用量 */
//     // private final int m_PreUse;
//     // /** ガス売上 */
//     // private int m_GasPay;
//     // /** ガス消費税 */
//     // private int m_GasTax;
//     // /** 調整費 */
//     // private final int m_Reduce;
//     // /** メーター取替有無 */
//     // private boolean m_bChgMeter;
//     // /** メーター取替月 */
//     // private int m_ChgMonth;
//     // /** メーター取替日 */
//     // private int m_ChgDay;
//     // /** メーター取替前回指針 */
//     // private int m_ChgZsisin;
//     // /** メーター取り外し指針 */
//     // private int m_ChgSisin;
//     // /** 中間使用量 */
//     // private int m_ChukanSur;
//     // /** 前月残高 */
//     // private final long m_PreReceipt;
//     // /** 本日売上 */
//     // private int m_HmDay;
//     // /** 当月売上 */
//     // private final int m_HmMonth;
//     // /** 今回請求額 */
//     // private long m_Receipt;
//     // /** 預かり金 */
//     // private final int m_Azukarikin;
//     // /** 入金 */
//     // private final int m_Nyukin;
//     // /** 調整 */
//     // private final int m_Chosei;
//     // /** 残高 */
//     // private long m_Zandaka = 0;
//     // /** CNポイント使用フラグ */
//     // private boolean mCnp;
//     // /** CNポイントデータ */
//     // private final CnpCusDat mCnpCusDat;
//     // /** CNポイント本会員用コメント */
//     // private final Sy2fCnpDat mCnpMemberCmt;
//     // /** CNポイント仮会員用コメント */
//     // private final Sy2fCnpDat mCnpTempCmt;
//     // /** 前回使用量印字フラグ */
//     // private final boolean mPrnZensr;
//     // /** ガス基本料金印字フラグ */
//     // private boolean mPrnGasBaseKin = false;
//     // /** ガス基本料金 */
//     // private long mGasBaseKin = 0L;
//     // /** ガス契約単価 */
//     // private long mGasAddKin = 0L;
//     // /** 前年同月使用量 */
//     // private int m_nZenYearKenSr = 0;
//     // /** ガス料金総額 */
//     // private long m_nGasTotalKin = 0L;
//     // /** ガス料金総額(税抜き) */
//     // private long m_nGasTotalKinWithoutTax = 0L;
//     // /** 設備料金 */
//     // private long m_nFacilityKin = 0L;
//     // /** ガス料金総額印字フラグ */
//     // private boolean m_bPrintGasRyokinTotal = false;
//     // /** ガス料金式印字フラグ */
//     // private boolean m_bPrintGasRyokinSiki = false;
//     // /** 設備料金印字フラグ */
//     // private boolean m_bPrintGasFacilityKin = false;
//     // /** 日割りコメント印字フラグ */
//     // private boolean m_bPrintHiwariComment = false;
//     // /** 前年同月使用量印字フラグ */
//     // private boolean m_bPrintZenYearKenSr = false;
//     // /** 日割りコメント１ */
//     // private String m_strHiwariComment_0 = null;
//     // /** 日割りコメント２ */
//     // private String m_strHiwariComment_1 = null;
//     // /** ガス料金データ */
//     // private final GasfDat m_GasfDat;
//     // /** ガス料金表開始インデックス */
//     // private int m_nStartIdx = 0;
//     // /** 一律料金フラグ */
//     // private boolean m_bSingleStep = false;
//     // /** 伝票印字パターン */
//     // private int m_nPrintGasRyokinSikiPtn = 0;
//     // /** ハイブリッド料金データ */
//     // private HybfDat mHybfDat = null;
//     // /** ハイブリッドカウンタ―名称 */
//     // private String[] mCounterName = null;
//     // /** ハイブリッドフラグ */
//     // private final boolean m_isHybrid;
//     // /** 顧客ハイブリッドデータ */
//     // private Ko2fDat mKo2fDat = null;
//     // /** ガス料金のみ */
//     // private int m_nOnlyGas;
//     // /** ガス料金透明化フラグ */
//     // private final boolean m_isVisibleGas;
//     // /** 通常使用量 */
//     // private int m_nNorSr = 0;
//     // /** ハイブリッドガス使用量 */
//     // private int[] m_nHybGasUse = null;
//     // /** 顧客灯油データ */
//     // private KotfDat mKotfDat;
//     // /** 灯油料金分割印字 */
//     // private final boolean m_isToyuKinSep;
//     // /** 検針のみ印刷 */
//     // private final boolean m_isPrintKensin;
//     // /** 灯油のみ印刷 */
//     // private final boolean m_isPrintToyu;
//     // /** 灯油単価 */
//     // private final int m_nLoilUnit;

//     /**
//      * コンストラクタ.
//      *
//      * @param context           [in] {@link Context}    呼び出し元コンテキス
//      * @param userData          [in] {@link UserData}   アプリ共通データ
//      * @param isHybSeikyu       [in] boolean            ハイブリッド請求フラグ
//      * @param isPrintKensin     [in] boolean            検針フラグ
//      * @param isPrintToyu       [in] boolean            灯油フラグ
//      */
//      constructor  (userData,  isHybSeikyu,  isPrintKensin,  isPrintToyu) {
//         var kokfDat = userData.getKokfDat();
//         var sysfDat = userData.getSysfDat();
//         var sy2fDat = userData.getSy2fDat();
//         var kouserDat = userData.getKouserDat();
//         m_GasfDat = userData.getGasfDat();

//         m_Sisin = kokfDat.mNowMeter;// 今回指針
//         m_KensinPrevMonth = kokfDat.mPuseMonth;// 前回検針日
//         m_KensinPrevDay = kokfDat.mPuseDate;
//         m_SisinPrev = kokfDat.mPreMeter; // 前回指針
//         m_NowUse = GasRaterCom.getGasSuryo(kokfDat.mGasUse, sy2fDat, kouserDat);// 今回使用量
//         m_PreUse = GasRaterCom.getGasSuryo(kokfDat.mPreUse, sy2fDat, kouserDat);// 前回使用量

//         m_GasPay = kokfDat.mFee;// ガス売上
//         m_GasTax = kokfDat.mConTax;// ガス消費税

//         m_nOnlyGas = kokfDat.mFee + kokfDat.mConTax;

//         m_Reduce = kokfDat.mReduce + kokfDat.mReduceTax;// 還元額
//         m_PreReceipt = GasRaterCom.readPrebalance(context, sysfDat, kokfDat, sy2fDat);
//         m_HmDay = kokfDat.mUrikin + kokfDat.mUriTax;// 本日売上
//         if( kokfDat.mKenSumi && isPrintKensin){
//             // 検針済みの場合は検針時リース金額加算
//             // for(var hmefDat : userData.getLeasHmefDat()){
//             //     // 有効な明細、ハンディ売上、リース明細フラグ=1
//             //     if(hmefDat.mUsef && hmefDat.mHmeKind == 9 && hmefDat.mLeasKind == 1){
//             //         m_HmDay += hmefDat.mKin + hmefDat.mTax;
//             //     }
//             // }
//         }
            
//         m_HmMonth = GasRaterCom.calcEtcUri(context, sysfDat, kokfDat) + GasRaterCom.calcEtcTax(context, sysfDat, kokfDat);// 当月売上

//         m_isHybrid = kouserDat.mHyc5 == 1 && isHybSeikyu;
//         if(m_isHybrid) {
//             // ハイブリッドカウンタの名称取得
//             mCounterName = new String[Ko2fDat.kHyb_MAX];
//             for(var i = 0; i < mCounterName.length; i++){
//                 mCounterName[i] = getCounterName(context, i);
//             }
//             // 顧客ハイブリッドデータの取得
//             mKo2fDat = userData.getKo2fDat();

//             // ハイブリッド料金データの取得
//             try {
//                 mHybfDat = InputDat.getHybfDat(context, mKo2fDat.mGashyb);
//             } catch ( mex) {
//                 console.log( mex);
//             }

//             m_nNorSr = GasRaterCom.getGasSuryo(mKo2fDat.mNorSr, sy2fDat, kouserDat);
//             m_nHybGasUse = new int[Ko2fDat.kHyb_MAX];
//             for( var i = 0; i < Ko2fDat.kHyb_MAX; i++ ){
//                 m_nHybGasUse[i] = GasRaterCom.getGasSuryo(mKo2fDat.mGasUse[i], sy2fDat, kouserDat);
//             }
//         }
//         calcTotalKin();
//         // 値引き金額はガス料金総額に含める
//         if(sysfDat.mKnebFlg == 1){
//             // 漢の値引きシステム有り
//             m_nGasTotalKin += GasRaterCom.calcNebiki(sysfDat, userData.getKnebiDat());
//         }

//         // 今回請求額
//         var lTotal = GasRaterCom.calcSeikyu(context, sysfDat, kokfDat, sy2fDat, !userData.getNyukinMode());
//         if(isPrintKensin) {
//             lTotal += m_nGasTotalKin;
//         }
//         lTotal += m_HmDay;
//         m_Receipt = lTotal;
//         m_Azukarikin =  kokfDat.mInpReceipt; // 預かり金
//         m_Nyukin =  kokfDat.mReceipt; // 入金
//         m_Chosei =  kokfDat.mAdjust; // 調整

//         mCnp = false;
//         mCnpMemberCmt = userData.getSy2fDat().mSy2fCnpMemberDat;
//         mCnpTempCmt = userData.getSy2fDat().mSy2fCnpTempDat;
//         mCnpCusDat = kokfDat.mCnpCusDat;
//         if(sy2fDat.mCnp == 1 && mCnpCusDat != null &&
//                 (mCnpCusDat.mCnpMembers == 1 || mCnpCusDat.mCnpTemp == 1)){
//             // CNポイントを使用し、仮会員か、本会員の場合はtrueを設定
//             mCnp = true;
//         }
//         m_bChgMeter = false;
//         if(kokfDat.mBetwMeter > 0){
//             // メーター交換有り
//             m_bChgMeter = true;
//             m_ChgMonth = kokfDat.mMtChgM;
//             m_ChgDay = kokfDat.mMtChgD;
//             m_ChgZsisin = kokfDat.mMtChgZknss;
//             m_ChgSisin = kokfDat.mMtChgOldss;
//             m_ChukanSur = GasRaterCom.getGasSuryo(kokfDat.mBetwMeter, sy2fDat, kouserDat);
//         }

//         // 前回使用量印字フラグを設定
//         mPrnZensr = kokfDat.mKaiYear <= kokfDat.mPuseYear &&
//                 kokfDat.mKaiMonth <= kokfDat.mPuseMonth &&
//                 kokfDat.mKaiDate <= kokfDat.mPuseDate;

//         if(sysfDat.mHtOption[7] == 1 && m_GasfDat != null && m_GasfDat.mSum != 4){
//             mPrnGasBaseKin = true;
//             mGasBaseKin = GasRaterCom.calcGasBase(context, sysfDat, kokfDat, userData.getGasfDat(), sy2fDat, kouserDat);
//         }
//         m_isVisibleGas = sysfDat.mVisibleGas == 1;
//         if(sysfDat.mVisibleGas == 1 && m_GasfDat != null){
//             if(sysfDat.mGtpcDat.m_nPrintGasRyokinTotal == 0) {
//                 // ガス料金総額
//                 m_bPrintGasRyokinTotal = true;
//             }
//             // ガス料金式印字フラグ設定
//             if(m_GasfDat.mGextDat.m_nPrintGasryokinSiki == 1 && m_GasfDat.mSum != 4){
//                 m_bPrintGasRyokinSiki = true;
//             }
//             // ガス料金式印字パターン
//             m_nPrintGasRyokinSikiPtn = sysfDat.mGtpcDat.m_nPrintGastablePtn;

//             // 設備料金印字フラグ設定
//             if(sysfDat.mVisibleFacility == 1 && kokfDat.mKtpcdat.m_nFacilitykin != 0){
//                 // システム設定のフラグが1、設備料金を設定している場合印字する
//                 m_bPrintGasFacilityKin = true;
//             }

//             var zyksDat = kokfDat.mZyksDat;
//             var calKai = Calendar.getInstance();
//             calKai.set(kokfDat.mKaiYear, kokfDat.mKaiMonth - 1, kokfDat.mKaiDate);
//             var calZyks = Calendar.getInstance();
//             calZyks.set(zyksDat.m_nDenymd_year, zyksDat.m_nDenymd_month - 1, zyksDat.m_nDenymd_day);
//             if(sysfDat.mGtpcDat.m_nPrintZenyearkensr == 0 &&
//                     calKai.compareTo(calZyks) <= 0 &&
//                     zyksDat.m_nDenymd_year != 0 ){
//                 // 前年同月使用量
//                 m_bPrintZenYearKenSr = true;
//                 m_nZenYearKenSr = GasRaterCom.getGasSuryo(kokfDat.mZyksDat.m_nSr, sy2fDat, kouserDat);
//             }

//             if(sysfDat.mGtpcDat.m_nPrintHiwariComment == 0 && kokfDat.mHiwari != 0){
//                 // 日割りコメント印字
//                 m_bPrintHiwariComment = true;
//                 m_strHiwariComment_0 = sysfDat.mGtpcDat.m_strHiwariComment_0;
//                 m_strHiwariComment_1 = sysfDat.mGtpcDat.m_strHiwariComment_1;
//                 if(OtherUtil.cutStringSpace(m_strHiwariComment_0).length() == 0 &&
//                         OtherUtil.cutStringSpace(m_strHiwariComment_1).length() == 0){
//                     m_bPrintHiwariComment = false;
//                 }
//             }

//             m_nStartIdx = GasRaterCom.calcGasBaseKin(context, sysfDat, m_GasfDat, kokfDat, sy2fDat, kouserDat);

//             mGasBaseKin = kokfDat.mKtpcdat.m_nBasekin / 10;
//             m_nFacilityKin = kokfDat.mKtpcdat.m_nFacilitykin / 10;

//             if (m_GasfDat.mSum == 2 || m_GasfDat.mSum == 3) {
//                 m_bSingleStep = true;
//                 if (m_GasfDat.mSum == 3) {
//                     // 契約単価
//                     mGasAddKin = kokfDat.mGasUnit;
//                 }
//             } else {
//                 if (m_GasfDat.m_lstGstpDat != null &&
//                         m_GasfDat.m_lstGstpDat.size() <= m_nStartIdx + 1) {
//                     m_bSingleStep = true;
//                 }
//             }
//         }
//         if(sysfDat.m_isToyukeninFlg){
//             mKotfDat = kokfDat.mKotfDat;
//             m_isPrintKensin = isPrintKensin;
//             m_isPrintToyu = isPrintToyu;
//             if(isPrintToyu){
//                 m_Receipt += mKotfDat.m_nFee + mKotfDat.m_nCon_tax;
//             }
//         }
//         else {
//             m_isPrintKensin = true;
//             m_isPrintToyu = false;
//         }
//         m_isToyuKinSep = sy2fDat.m_isToyuSep;
//         m_nLoilUnit = kokfDat.mLoilUnit / 100;
//     }

//     /**
//      * ガス料金のみの金額取得.
//      *
//      * @return int  ガス料金のみの金額
//      */
//      getOnlyGas(){
//         return m_nOnlyGas;
//     }

//     /**
//      * ガス料金のみの金額設定.
//      *
//      * @param nOnlyGas [in] int    ガス料金のみの金額
//      */
//      set_m_nOnlyGas( nOnlyGas){
//         m_nOnlyGas = nOnlyGas;
//     }

//     /**
//      * ハイブリッド料金データの取得.
//      *
//      * @return {@link HybfDat}  ハイブリッド料金データ
//      */
//      getHybfDat(){
//         return mHybfDat;
//     }

//     /**
//      * 指針の取得
//      *
//      * @return int 指針
//      */
//      getSisin() {
//         return m_Sisin;
//     }

//     /**
//      * 前回検針月の取得
//      *
//      * @return int 前回検針月
//      */
//      getKensinPrevMonth() {
//         return m_KensinPrevMonth;
//     }

//     /**
//      * 前回検針日の取得
//      *
//      * @return int 前回検針日
//      */
//      getKensinPrevDay() {
//         return m_KensinPrevDay;
//     }

//     /**
//      * 前回検針指針の取得
//      *
//      * @return int 前回検針指針
//      */
//      getSisinPrev() {
//         return m_SisinPrev;
//     }

//     /**
//      * 今回検針使用量の取得
//      *
//      * @return int 今回検針使用量
//      */
//      getNowUse() {
//         return m_NowUse;
//     }

//     /**
//      * 前回検針使用量の取得
//      *
//      * @return int 前回検針使用量
//      */
//      getPreUse() {
//         return m_PreUse;
//     }

//     /**
//      * ガス料金の取得
//      *
//      * @return int ガス料金
//      */
//      getGasPay() {
//         return m_GasPay;
//     }

//     /**
//      * ガス消費税金額の取得
//      *
//      * @return int ガス消費税金額
//      */
//      getGasTax() {
//         return m_GasTax;
//     }

//     /**
//      * 還元額の取得
//      *
//      * @return int 還元額
//      */
//      getReduce() {
//         return m_Reduce;
//     }

//     /**
//      * 請求金額の取得
//      *
//      * @return long 請求金額
//      */
//      getPreReceipt() {
//         return m_PreReceipt;
//     }

//     /**
//      * 本日売上金額の取得
//      *
//      * @return int 本日売上金額
//      */
//      getHmDay() {
//         return m_HmDay;
//     }

//     /**
//      * 当月売上金額の取得
//      *
//      * @return int 当月売上金額
//      */
//      getHmMonth() {
//         return m_HmMonth;
//     }

//     /**
//      * 領収金額の取得
//      *
//      * @return long 領収金額
//      */
//      getReceipt() {
//         return m_Receipt;
//     }

//     /**
//      * 入金金額の取得
//      *
//      * @return int 入金金額
//      */
//      getNyukin() {
//         return m_Nyukin;
//     }

//     /**
//      * 調整金額の取得
//      *
//      * @return int 調整金額
//      */
//      getChosei() {
//         return m_Chosei;
//     }

//     /**
//      * 差引残高の取得
//      *
//      * @return long 差引残高
//      */
//      getZandaka() {
//         return m_Zandaka;
//     }

//     /**
//      * 差引残高の設定
//      *
//      * @param zandaka   [in] long   差引残高
//      */
//      setZandaka( zandaka) {
//         m_Zandaka = zandaka;
//     }

//     /**
//      * 預かり金の取得
//      *
//      * @return int 預かり金
//      */
//      getAzukarikin() {
//         return m_Azukarikin;
//     }

//     /**
//      * CNポイントコメント使用フラグの取得
//      *
//      * @return  boolean CNポイントコメント使用フラグ
//      */
//      isCnp(){
//         return mCnp;
//     }
    
//     /**
//      * 利用可能CNポイントの取得
//      *
//      * @return  long    ポイント残高
//      */
//      getCnpPnt(){
//         if(mCnpCusDat == null){
//             return 0;
//         }
//         return mCnpCusDat.mCnpZpoint;
//     }
    
//     /**
//      * 獲得CNポイントの取得
//      *
//      * @return  long    獲得ポイント
//      */
//      getGetCnpPnt(){
//         if(mCnpCusDat == null){
//             return 0;
//         }
//         return mCnpCusDat.mCnpPoint;
//     }
    
//     /**
//      * CNポイントデータの取得
//      *
//      * @return  CnpCusDat   CNポイントデータ
//      */
//      getCnpCusDat(){
//         return mCnpCusDat;
//     }
    
//     /**
//      * CNポイント用コメントの取得
//      *
//      * @return  List<String>    CNポイント用コメント
//      */
//      getCnpCmt(){
//         List<String> lstCnpCmt = new ArrayList<>();
//         if(mCnp){
//             if(mCnpCusDat.mCnpMembers > 0){
//                 // 本会員用コメント
//                 if(mCnpMemberCmt.mCnpComment_0.trim().length() != 0){
//                     lstCnpCmt.add(mCnpMemberCmt.mCnpComment_0);
//                 }
//                 if(mCnpMemberCmt.mCnpComment_1.trim().length() != 0){
//                     lstCnpCmt.add(mCnpMemberCmt.mCnpComment_1);
//                 }
//                 if(mCnpMemberCmt.mCnpComment_2.trim().length() != 0){
//                     lstCnpCmt.add(mCnpMemberCmt.mCnpComment_2);
//                 }
//             }
//             else if(mCnpCusDat.mCnpTemp > 0){
//                 // 仮会員用コメント
//                 if(mCnpTempCmt.mCnpComment_0.trim().length() != 0){
//                     lstCnpCmt.add(mCnpTempCmt.mCnpComment_0);
//                 }
//                 if(mCnpTempCmt.mCnpComment_1.trim().length() != 0){
//                     lstCnpCmt.add(mCnpTempCmt.mCnpComment_1);
//                 }
//                 if(mCnpTempCmt.mCnpComment_2.trim().length() != 0){
//                     lstCnpCmt.add(mCnpTempCmt.mCnpComment_2);
//                 }
//             }
//         }
//         return lstCnpCmt;
//     }
    
//     /**
//      * メーター取替月の取得
//      *
//      * @return  int メーター取替月
//      */
//      getMtChgMonth(){
//         return m_ChgMonth;
//     }
    
//     /**
//      * メーター取替日の取得
//      *
//      * @return  int メーター取替日
//      */
//      getMtChgDay(){
//         return m_ChgDay;
//     }
    
//     /**
//      * メーター交換有無の取得
//      *
//      * @return  boolean メーター取替有無
//      */
//      isMtChg(){
//         return m_bChgMeter;
//     }
    
//     /**
//      * メーター前回指針の取得
//      *
//      * @return  int メーター前回指針
//      */
//      getMtChgZss(){
//         return m_ChgZsisin;
//     }
    
//     /**
//      * メーター取り外し指針の取得
//      *
//      * @return  int メーター取り外し指針
//      */
//      getMtChgOldss(){
//         return m_ChgSisin;
//     }
    
//     /**
//      * 中間使用量の取得
//      *
//      * @return  int 中間使用量
//      */
//      getBetweenSur(){
//         return m_ChukanSur;
//     }

//     /**
//      * 前回使用量印字フラグの取得
//      *
//      * @return boolean true: 印字する, false: 印字しない
//      */
//      isPrnZensr(){
//         return mPrnZensr;
//     }

//     /**
//      * ガス基本料金・従量料金印字フラグの取得
//      *
//      * @return boolean ガス基本料金・従量料金印字フラグ
//      */
//      isPrnGasBaseKin(){
//         return mPrnGasBaseKin;
//     }

//     /**
//      * ガス基本料金の取得
//      *
//      * @return long ガス基本料金
//      */
//      getGasBaseKin(){
//         return mGasBaseKin;
//     }

//     /**
//      * ガス料金総額印字フラグの取得
//      *
//      * @return boolean ガス料金総額印字フラグ(true: 印字する, false: 印字しない)
//      */
//      isPrintGasRyokinTotal(){
//         return m_bPrintGasRyokinTotal;
//     }

//     /**
//      * ガス料金式印字フラグの取得
//      *
//      * @return boolean ガス料金式印字フラグ(true: 印字する, false: 印字しない)
//      */
//      isPrintGasRyokinSiki(){
//         return m_bPrintGasRyokinSiki;
//     }

//     /**
//      * 日割りコメント印字フラグの取得
//      *
//      * @return boolean 日割りコメント印字フラグ(true: 印字する, false: 印字しない)
//      */
//      isPrintHiwariComment(){
//         return m_bPrintHiwariComment;
//     }

//     /**
//      * 前年同月使用量印字フラグの取得
//      *
//      * @return boolean 前年同月使用量印字フラグ(true: 印字する, false: 印字しない)
//      */
//      isPrintZenYearKenSr(){
//         return m_bPrintZenYearKenSr;
//     }

//     /**
//      * ガス料金総額の取得
//      *
//      * @return long ガス料金総額
//      */
//      getGasTotalKin(){
//         return m_nGasTotalKin;
//     }

//     /**
//      * 税抜きガス料金総額の取得
//      *
//      * @return  long    ガス料金総額(税抜き)
//      */
//      getGasTotalKinWithoutTax(){
//         return m_nGasTotalKinWithoutTax;
//     }

//     /**
//      * 前年同月使用量の取得
//      *
//      * @return int 前年同月使用量
//      */
//      getZenYearKenSr(){
//         return m_nZenYearKenSr;
//     }

//     /**
//      * 日割りコメント１の取得
//      *
//      * @return String 日割りコメント１
//      */
//      getHiwariComment_0(){
//         return m_strHiwariComment_0;
//     }

//     /**
//      * 日割りコメント２の取得
//      *
//      * @return String 日割りコメント２
//      */
//      getHiwariComment_1(){
//         return m_strHiwariComment_1;
//     }

//     /**
//      * 設備料金印字フラグの取得
//      *
//      * @return boolean 設備料金印字フラグ(true: 印字する, false: 印字しない)
//      */
//      isPrintFacilityKin(){
//         return m_bPrintGasFacilityKin;
//     }

//     /**
//      * 設備料金の取得
//      *
//      * @return long 設備料金
//      */
//      getFacilityKin(){
//         return m_nFacilityKin;
//     }

//     /**
//      * ガス料金データの取得
//      *
//      * @return GasfDat ガス料金データ
//      */
//      getGasfDat(){
//         return m_GasfDat;
//     }

//     /**
//      * ガス料金印字開始インデックスの取得
//      *
//      * @return int ガス料金印字開始インデックス
//      */
//      getStartIdx(){
//         return m_nStartIdx;
//     }

//     /**
//      * 単一料金フラグの取得
//      *
//      * @return boolean (true: 単一料金, false: 複数料金)
//      */
//      isSingleStep(){
//         return m_bSingleStep;
//     }

//     /**
//      * ガス加算料金（契約単価用）
//      *
//      * @return long 契約単価用ガス加算料金
//      */
//      getGasAddKin(){
//         return mGasAddKin;
//     }

//     /**
//      * ガス料金式印字パターン
//      *
//      * @return int ガス料金式印字パターン(0:秋元式, 1: 大口式)
//      */
//      getPrintGasRyokinSikiPtn(){
//         return m_nPrintGasRyokinSikiPtn;
//     }

//     /**
//      * 顧客ハイブリッドデータの取得.
//      *
//      * @return  {@link Ko2fDat} 顧客ハイブリッドデータ
//      */
//      getKo2fDat(){
//         return mKo2fDat;
//     }

//     /**
//      * 通常使用量の取得.
//      *
//      * @return  int 通常使用量
//      */
//      getHybNorSr(){
//         return m_nNorSr;
//     }

//     /**
//      * ハイブリッドカウンタ使用量の取得.
//      *
//      * @param nIdx  [in] int    対象カウンタ
//      * @return  int 対象カウンタの使用量
//      */
//      getHybCntSr( nIdx){
//         return m_nHybGasUse[nIdx];
//     }

//     /**
//      * 対象カウンタの名称を取得
//      *
//      * @param nCounterNo    [in] int    カウンター番号
//      * @return  String  カウンター名称
//      */
//      getCounterName( nCounterNo){
//         return mCounterName[nCounterNo];
//     }

//     /**
//      * 使用しているカウンタ名称の取得.<br />
//      * 取得に失敗した場合はデフォルト名称を使用する.
//      *
//      * @param ctx           [in] {@link Context}    呼び出し元コンテキスト
//      * @param nCounterNo    [in] int                カウンター番号
//      * @return String カウンター名称
//      */
//      getCounterName( nCounterNo){
//         var hyb_cnt_nm = [ "指定時間１", "指定時間２"
//                 ,"大流量使用", "長時間使用"
//                 ,"基本料金　", "通常使用　"
//     ];

//         var strCounterName = null;
//         try {
//             strCounterName = InputDat.getHymnDat(ctx, nCounterNo).mName;
//         }
//         catch ( mex){
//            console.log( mex);
//         }
//         if(TextUtils.isEmpty(strCounterName)){
//             strCounterName = hyb_cnt_nm[nCounterNo];
//         }
//         return strCounterName;
//     }

//     /**
//      * ガス料金総額の取得.<br />
//      * ハイブリッドの場合はハイブリッド料金の総額を取得する
//      */
//      calcTotalKin(){
//         if(m_isHybrid && mKo2fDat.mGashyb > 0){
//             m_GasPay = mKo2fDat.mNorKin;
//             for (var i = 0 ; i <  Ko2fDat.kHyb_MAX ; i++) {
//                 if ( mHybfDat.mCusef[i] == 1 && mKo2fDat.mFee[i] != 0 ) {
//                     m_GasPay += mKo2fDat.mFee[i];
//                 }
//             }
//             m_nGasTotalKinWithoutTax = m_GasPay;
//             m_GasTax = mKo2fDat.mHybTax / 1000;
//             // カウンタ使用料
//             if(mKo2fDat.mUseKin > 0 && mHybfDat.mUseSncode > 0){
//                 m_nGasTotalKinWithoutTax += mKo2fDat.mUseKin;
//                 if(mHybfDat.mUseTaxku == 3){
//                     m_nGasTotalKinWithoutTax += mKo2fDat.mUseTax;
//                 }
//             }
//         }else{
//             m_nGasTotalKinWithoutTax = m_GasPay;
//         }

//         m_nGasTotalKin = m_nGasTotalKinWithoutTax + m_GasTax + m_Reduce;
//     }

//     /**
//      * ハイブリッド使用フラグの取得
//      *
//      * @return  boolean ハイブリッド使用フラグ(true: 使用, false: 未使用)
//      */
//      isHybrid(){
//         return m_isHybrid;
//     }

//     /**
//      * ガス料金透明化フラグの取得
//      *
//      * @return boolean ガス料金透明化フラグ(true: ON, false: OFF)
//      */
//      isVisibleGas(){
//         return m_isVisibleGas;
//     }

//     /**
//      * 顧客灯油情報の取得.
//      *
//      * @return  KotfDat 顧客灯油情報
//      */
//      getKotfDat(){
//         return mKotfDat;
//     }

//     /**
//      * 灯油料金分割印字フラグの取得.
//      *
//      * @return  boolean true:分割印字, false:印字無し
//      */
//      isToyuKinSep(){
//         return m_isToyuKinSep;
//     }

//     /**
//      * 検針印刷フラグの取得.
//      *
//      * @return  boolean true:印刷する, false:印刷しない
//      */
//      isPrintKensin(){
//         return m_isPrintKensin;
//     }

//     /**
//      * 灯油印刷フラグの取得.
//      *
//      * @return  boolean true:印刷する, false:印刷しない
//      */
//      isPrintToyu(){
//         return m_isPrintToyu;
//     }

//     /**
//      * 灯油単価の取得.
//      *
//      * @return  int 灯油単価
//      */
//      getLoilUnit(){
//         return m_nLoilUnit;
//     }


// }
import * as Dat from './Dat/dat.js'
class KokfDat {
  constructor() {
    /** 漢字氏名 */
    this.mName = "安藤　秀丸"; // NAME
    /** 検針月 */
    this.mKMonth = 5;
    /** 検針日 */
    this.mKDate = 1;
    /** 今回入力：ガス使用量 */
    this.mGasUse = 250;
    /** 顧客区分　 */
    this.mGasKubun = 1;
    /** 検針済み区分 */
    this.mKenSumi = true;
    /** 今回入力：今回指針 */
    this.mNowMeter = 250;
    /** 前回指針 */
    this.mPreMeter = 0;
    /** 前回検針日付:年 */
    this.mPuseYear = 0;
    /** 前回検針日付：月 */
    this.mPuseMonth = 0;
    /** 前回検針日付：日 */
    this.mPuseDate = 0;
    /** ガス料金No */
    this.mGasDiv = 654;
    /** 今回入力：消費税 */
    this.mConTax = 1230;
    /** 中間使用量(検針) */
    this.mBetwMeter = 0;
    /** 前回使用量 */
    this.mPreUse = 0;
    /** 今回入力：金額 */
    this.mFee = 15450;
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
    this.mKtpcdat = new KtpcDat(15000000, 139500000, 0);
    /** 供給区分 */
    this.mSupplyForm = 1;
    /** 契約料金(基本) */
    this.mGasBase = 0; // GASBASE
    /** メーター桁数 */
    this.mMtKeta = 4;  //MTKETA
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
    var mKotfDat = null;
    this.mKotfDat = mKotfDat;
    /** 当月：遅収料金 */
    this.mProcTisyuu = 0;
    /** 当月：消費税(遅収料金) */
    this.mTaxTisyuu = 0;
    /** 前月残高 */
    this.mPreBalance = 4620;
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
    /** 当月：遅収料金 */
    this.mProcTisyuu = 0;
    /** 当月：消費税(遅収料金) */
    this.mTaxTisyuu = 0;
    /** 今回入力：入金額 */
    this.mReceipt = 0; 
    /** 今回入力：調整額 */
    this.mAdjust = 1000;
    
    this.mSyuSumi = true;
    /** 預かり金 */
    this.mInpReceipt = 0 ;

	//bien moi
	this.mAdd = "○武市△冬町３－２";
	this.mCusCode = "0010000375";
	this.mSName0 = "" ;
	this.mSName1 = "安藤　秀丸";
	this.mKName = "様";

	this.mZyksDat = Dat.mZyksDat;

  }
}

class Ko2fDat {
  constructor() {
    /** ハイブリッド料金区分 */
    this.mGashyb;
    /** カウント値引:税区分 */
    this.mChoTaxku;
    /** カウント値引消費税 */
    this.mChoTax;
    /** カウンタ使用料 */
    this.mUseKin;
    /** カウンター使用料:税区分 */
    this.mUseTaxku;
    /** カウンタ使用料消費税 */
    this.mUseTax;
    /** カウント値引 */
    this.mChoKin;
  }
}
class GextDat {
  constructor() {
    /** ガス基本料金 */
    this.m_nBasekin = 0;
    /** ガス設備料 */
    this.m_nFacilitykin = 0;
    //can tim hieu cach doc bien nay
    this.m_nPrintGasryokinSiki = 0;
  }
}


class KtpcDat {
  constructor(m_nBasekin, m_nAddkin, m_nFacilitykin) {
    this.m_nBasekin = m_nBasekin;
    this.m_nAddkin = m_nAddkin;
    this.m_nFacilitykin = m_nFacilitykin;
  }
}

class Sy2fDat {
  constructor() {
    /** 中圧係数での使用量端数処理(0:切り捨て, 1:四捨五入, 2:切り上げ) */
    this.mCaHas = 0;
    /** 中圧ガス料金計算有無 */
    this.mCaFlg = 0;
    /** 差益還元品番コード */
    this.mKangHbcd = 0;
    /** 差益還元コード */
    this.mKangHcd = 0;
    /** 入金・調整取引区分設定フラグ */
    this.mNyucho = 0;
    /** ハイブリッド料金区分 */
    this.mGashyb;
    /** オプション3 */
    var mSysOption = [
      1, 1, -1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1,0,1,1,1,1,1,1,1,0,0,0,0,0,5,0,0,0,0
    ];
    this.mSysOption = mSysOption;
	this.mSysfHmcd13 = 2;

	

  }
}

class SysfDat {
  constructor() {
    /** 管ガス:最低検針日数 */
    this.mKgasDays0 = 25;
    /** 管ガス:最大検針日数 */
    this.mKgasDays1 = 35;
    /** 管ガス:閉開栓時日数 */
    this.mKgasDays2 = 29;
    /** 消費税変更日付 */
    this.mTax_yy = 1970;
    this.mTax_mm = 1;
    this.mTax_dd = 1;
    /** 消費税率 */
    this.mConsumTax = 80;
    /** 消費税変更旧税率 */
    this.mTaxr_old = 50;
    this.mTaxr_new = 80;
    /** ガス料金透明化対応フラグ */
    this.mVisibleGas = 1;
    /** ガス料金透明化設備料金対応フラグ */
    this.mVisibleFacility = 0;
    /** リース計上機能有無 */
    this.mLesUmu = 1;
    /** 売上用端数処理:加算 */
    this.mFracAddKin = 0;
    /** 売上用端数処理:乗算 */
    this.mFracMulKin = 1000;
    /** 消費税:端数処理(加算) */
    this.mFracAddTax = 0;
    /** 消費税:端数処理(乗算) */
    this.mFracMulTax = 1000;
    //
    this.mFracAddMult = null;
    /** システム年 */
    this.mSysYear = 2019;
    /** 処理日付(月) */
    this.mMonth = 5;
    /** 処理日付(日) */
    this.mDate = 1;
    /** 差益還元:有無 */
    this.mIfReduce = false;
    /** 商品消費税の使用依頼 */
    this.mShoTaxcom = 0;
    /** 入力有無:保安点検 */
    this.mCheckHoan = true;
    /** 入力有無:入金 */
    this.mIfMoney = true;
    /** 簡ガス日常点検有無 */
    this.mTenkenKgas = 0;
    /** 灯油検針フラグ */
    this.m_isToyukeninFlg = false;
    /** 使用率チェック:倍率 */
    this.mSrChkr = [50, 250, 50, 200, 60, 180];
    /** 使用率チェック:使用率 */
    this.mSrChkm = [20, 60];
    /** 値引きシステムフラグ */
    this.mKnebFlg = 0;
    /** 伝票出力フラグ:入金・調整 */
    this.mIfAdjust = true;
    /** 伝票出力フラグ:警報機リース */
    this.mIfAlarm = true;
    /** 伝票出力フラグ:分割金 */
    this.mIfDiv = true;
    /** 伝票出力フラグ:灯油 */
    this.mIfLampoil = true;
    /** 伝票出力フラグ:その他売上 */
    this.mIfProceeds = true;
    /** 伝票出力フラグ:前月請求額 */
    this.mIfDemand = true;


	//them moi
	this.mGtpcDat = Dat.mGtpc;

	this.mHtOption = [0 , 0 , -1 , 1 , 1 , 1 , 1 , 1 , 5 , 1];
	this.mSnvalue = 100;
  }
}

class KouserDat {
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
  }
}

class GasfDat {
  constructor(m_lstGstpDat) {
    /** 計算方法 */
    this.mSum = 1;
    /** 料金表種別 */
    this.mSyu = 0;
    /** 端数処理1：加算 */
    this.mFrac1Add = 0;
    /** 端数処理2:加算 */
    this.mFrac2Add = 0;
    /** 端数処理1:乗算 */
    this.mFrac1Mult = 1000;
    /** 端数処理2:乗算 */
    this.mFrac2Mult = 10000;
    /** 増減率 */
    this.mRiseFall = 0;
    /** ガス料金ステップデータ */
    this.m_lstGstpDat = m_lstGstpDat;
    /** 消費税区分 */
    this.mTaxDiv = 3;
    /** 消費税端数処理：加算 */
    this.mTaxAdd = 0;
    /** 消費税端数処理：乗算 */
    this.mTaxMult = 10000;
    /** 調整単価 */
    this.mChoTanka = 0;
    /** ガス料金拡張データ */
    var mGextDat = new GextDat();
    this.mGextDat = mGextDat;
  }
}

class GstpDat {
  constructor(mUplimit, mAdd, mBase) {
    /** 上限値 */
    this.mUplimit = mUplimit;
    /** 加算値 */
    this.mAdd = mAdd;
    /** 基準料金 */
    this.mBase = mBase;
  }
}

class KnebDat {
  constructor() {
    /** コード */
    this.m_nCode;
    /** 有無 */
    this.m_nUmu;
    /** 結果 */
    this.m_nRes;
    /** 金額 */
    this.m_nKin;
    /** 消費税 */
    this.m_nTax;
  }
}

class BusfDat {
	constructor(){
		this.mUsef = true
		this.mHinno = 2
		this.mName = "調整"
		this.mSign = 1
		this.mKind = 3
	}
}

class HmefDat {
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
  }
}

class OtherUtil {
  /**
   * 端数処理
   *
   * @param suu    [in] double 対象数値
   * @param add    [in] int    加算分
   * @param multi  [in] int    乗算分
   * @param keta   [in] double 桁数
   * @return   long    端数処理後の値
   */
  static hasCom(suu, add, multi, keta) {
    var kin, kin1;
    var add1, multi1;
    var sgn;
    if (add == 0 && multi == 10) {
      // 端数処理：未設定
      kin = suu;
    } else {
      kin1 = suu;
      if (keta < 0) {
        kin1 = suu * Math.abs(keta);
      // console.log(kin1);
      } else if (keta > 0) {
        kin1 = suu / Math.abs(keta);
        //             console.log(kin1);
      }

      add1 = 0.1 + add;
      multi1 = multi;
      if (kin1 < 0) {
        sgn = -1;
      } else {
        sgn = 1;
      }
      kin1 = Math.abs(kin1);
      //            console.log(kin1);

      var temp = (kin1 * 1000 + add1 + 0.01) / multi1;
      //             console.log(temp);

      temp = Math.floor(temp);
      //           console.log(temp);

      kin = ((temp * multi1) / 1000) * sgn;
      //         console.log(kin);

      if (keta < 0) {
        kin /= Math.abs(keta);
        //                 console.log(kin);
      } else if (keta > 0) {
        kin *= Math.abs(keta);
        //               console.log(kin);
      }
    }
    return kin;
  }

  /**
   * 月と日から0無しでMM/dd形式で作成
   * @param year [in] long       年
   * @param month [in] long       月
   * @param day   [in] long       日
   * @param mask  [in] booelan    true: mm/dd, false: mm月dd日
   * @return String   整形された日付文字列
   */
  static DateFormat(year, month, day, mask) {
    var _month;
    var _day;
    var ymd;
    if (month < 10) {
      _month = "0" + month;
    } else {
      _month = month;
    }
    if (day < 10) {
      _day = "0" + day;
    } else {
      _day = day;
    }
    if (mask) {
      ymd = _month + "/" + _day;
    } else {
      ymd = year + "年" + _month + "月" + _day + "日";
    }
    return ymd;
  }

  /**
   * 文字列から\0と"　"(大文字スペース)を取り除く
   *
   * @param wkStr [in] String 対象文字列
   * @return  String  取り除いたあとの文字列
   */
  static getClearString(wkStr) {
    wkStr = wkStr == null ? "" : wkStr;
    return wkStr;
  }

  /**
   * null値を文字数０の空白に変換します。
   *
   * @param wkStr [in] String 文字列
   * @return String   変換後文字列
   */
  static nullToString(wkStr) {
    return wkStr == null ? "" : wkStr;
  }

  /**
   * 数値を指定したフォーマットで変換します。
   *
   * @param value     [in] long   値
   * @param keta      [in] byte   値の桁数補正値
   * @return  String  フォーマット後の文字列
   */
  static Format(value, keta) {
    var temp;
    temp = value / Math.pow(10, keta);
    return temp;
  }

  /**
   * 3桁毎の区切り(,)を取り除く
   * @param wkStr [in] String 対象文字列
   * @return  String  3桁毎","を取り除いた文字列
   */
  static getNumFromString(wkStr) {
    var wkStrArray = wkStr.split(",");
    var wkStrBuilder = "";
    if (wkStrArray.length == 0) {
      wkStrBuilder = wkStr;
    } else {
      for (let i = 0; i < wkStrArray.length; i++) {
        wkStrBuilder = wkStrBuilder + wkStrArray[i];
      }
    }
    return wkStrBuilder;
  }

  /**
   * 数値(double型)を倍数変換して指定フォーマットに合わせて文字列に変換します。
   *
   * @param wkFormat  [in] String 指定フォーマット
   * @param wkValue   [in] double 変換したい数値(double型)
   * @param wkMulti   [in] byte   倍数値（wkValueの値を１倍＝０、１０倍＝－１、１０分の１倍＝１）
   * @return String   変換後文字列
   */
  static format(wkFormat, wkValue, wkMulti) {
    return OtherUtil.formatLocal(wkFormat, wkValue, wkMulti);
  }

  /**
   * 指定フォーマットと倍数計算後の値を用いて、数値用文字列に変換します。
   *
   * @param wkFormat  [in] String 指定フォーマット
   * @param wkValue   [in] double 変換したい値
   * @param wkMulti   [in] byte   倍数値（wkValueの値を１倍＝０、１０倍＝－１、１０分の１倍＝１）
   * @return String   変換後文字列
   */
  static formatLocal(wkFormat, wkValue, wkMulti) {
    if (wkFormat == null) {
      return null;
    }

    var retStr = null;

    try {
      wkValue = OtherUtil.calcMultiValue(wkValue, wkMulti * -1); // 倍数を逆算する。
      retStr = wkValue.toFixed(1);
    } catch (err) {
      console.log(err);
    }

    return retStr;
  }

  /**
   * 指定値を１０倍数化します。
   *
   * @param wkValue [in] double   倍計算したい値
   * @param wkMulti [in] byte     倍数値(wkValueの100倍値を取得したい場合は、2を設定します。)
   * @return double   指定値を倍数化された値
   */
  static calcMultiValue(wkValue, wkMulti) {
    return wkValue * OtherUtil.calcMulti(wkMulti);
  }

  /**
   * 引数の値分１０倍して返します。
   *
   * @param wkMulti [in] byte 倍数値(100倍値を取得したい場合は、2を設定します。)
   * @return double   １０×倍数値(倍数値０の場合は１が返ります。)
   */
  static calcMulti(wkMulti) {
    return Math.pow(10.0, wkMulti);
  }

  /**
   * 日付文字列を指定フォーマットの型に合わせて作成し、日付型を取得します。
   * @param wkFormat  [in] String フォーマット
   * <p>
   * 指定フォーマット<br>
   * 指定文字列 : 変換結果 (以下の例は、"2000/01/02 14:25:36.789"をもとにしています。)<br>
   * yyyy(年)   : 2000<br>
   * yy  (年2桁): 00<br>
   * MM  (月)   : 01<br>
   * dd  (日)   : 02<br>
   * hh  (時12) : 02<br>
   * HH  (時24) : 14<br>
   * mm  (分)   : 25<br>
   * ss  (秒)   : 36<br>
   * SSS (ﾐﾘ秒) : 789
   * </p>
   * @param wkStr [in] String 日付文字列(例:"2000/01/02 14:25:36.789")
   * @return {@link java.util.Date}   指定フォーマットの型に合わせて作成された日付型
   */
  static parseDate(wkStr) {
    var retDate = null;
    // 日付型を変換する。
    // 極力インスタンスを生成しないように、毎回チェックする。// 2011.02.10
    // wkFormat2 = wkFormat;
    // if (wkFormat.includes("#Y")) {
    //     wkFormat2 = wkFormat2.replace("#Y", "yy");
    // }
    // if (wkFormat.includes("YY")) {
    //     wkFormat2 = wkFormat2.replace("YY", "yy");
    // }
    // if (wkFormat.includes("#M")) {
    //     wkFormat2 = wkFormat2.replace("#M", "MM");
    // }
    // if (wkFormat.includes("#d")) {
    //     wkFormat2 = wkFormat2.replace("#d", "dd");
    // }
    // // retDate = new SimpleDateFormat(wkFormat2, Locale.JAPANESE).parse(wkStr);
    // console.log(wkFormat);
    // var year = wkStr.substring(0,4);
    // var month = wkStr.substring(4,2);
    // var day = wkStr.substring(6,2);
    // console.log(year + " " + month + " " + day);
    retDate = new Date(wkStr);
    return retDate;
  }

  /**
   * 数値(int型)を指定フォーマットに合わせた文字列を作成後、足りない桁数分先頭から半角空白を追加した文字列を取得します。
   *
   * @param wkFormat  [in] String 指定フォーマット
   * @param wkValue   [in] int    変換したい数値(int型)
   * @return String   変換後文字列
   */
  static printformat(wkFormat, wkValue) {
    return OtherUtil.printformatLocal(wkFormat, wkValue, 0);
  }

  /**
   * 指定フォーマットと倍数計算後の値を用いて、数値用文字列に変換します。
   *
   * @param wkFormat  [in] String 指定フォーマット（小数点以下の文字列数を固定化したい場合は、0.## のように指定してください。）
   * @param wkValue   [in] double 倍数計算後の値
   * @param wkMulti   [in] byte   倍数値（wkValueの値を１倍＝０、１０倍＝－１、１０分の１倍＝１）
   * @return String   変換後文字列
   */
  static printformatLocal(wkFormat, wkValue, wkMulti) {
    if (wkFormat == null) return null;

    var retBui = "";
    var wkStr = "";
    var wkIdx;
    var wkLen;
    var wkCalcValue;
    var wkCnt;
    var strTail;
    var tailCnt = 0;

    try {
      wkStr = wkStr + format(wkFormat, wkValue, wkMulti);
      wkLen = wkFormat.length();

      wkIdx = wkFormat.indexOf(".");
      // 極力インスタンスを生成しないようにする。// 2011.02.10
      if (wkFormat.includes("#")) {
        strTail = wkFormat.substring(wkIdx + 1).replace("#", "");
      } else {
        strTail = wkFormat.substring(wkIdx + 1);
      }
      if (strTail.length == 0) {
        // 小数点以下が全て # となっている。
        // 末尾に付与する空白文字列数を計算します。
        wkCalcValue = wkValue % Math.pow(10.0, wkMulti);
        if (wkCalcValue != 0) {
          // wkCnt =  String.valueOf(wkCalcValue).length();
          wkCnt = wkCalcValue.length();
          if (wkMulti <= wkCnt) {
            if (wkCalcValue % 10 == 0) {
              wkCnt--;
            }
            while (wkCalcValue % 10 != 0) {
              wkCalcValue /= 10;
            }
            if (wkCalcValue < 0) {
              wkCnt--;
            }
            tailCnt = byte(wkMulti > wkCnt ? wkMulti - wkCnt : 0);
          }
        } else {
          tailCnt = byte(wkMulti + 1);
        }
        wkStr = wkStr + createMultiString(" ", tailCnt);
      }
      for (var i = wkStr.length; i < wkLen; i++) {
        retBui = retBui + " "; // 先頭から半角空白を追加する。
      }
      retBui = retBui + wkStr; // 最後にフォーマットされた文字列を追加する。
    } catch (e) {
      retBui = "";
    }

    return retBui;
  }

  /**
   * 基準日付から日付を引いた差分日数を取得します。
   * @param wkDateA   [in] {@link java.util.Date} 基準日付
   * @param wkDateB   [in] {@link java.util.Date} 基準日付から引く日付
   * @return  int
   * <p>
   * 差分日数 = 基準日付 - 日付 = wkDateA - wkDateB<br>
   * 基準日付よりも日付が未来の場合は、差分日数はマイナス値となります。<br>
   * 日付のどちらかがnull値の場合は、差分日数は０となります。<br>
   * COMPACKのgetBetweenとは引数の順番が逆となります。
   * </p>
   */
  static betweenDays(wkDateA, wkDateB) {
    var retValue = 0;
    var calendarA = wkDateA;
    var calendarB = wkDateB;
    console.log(
      wkDateA.getDate() +
        "/" +
        (wkDateA.getMonth() + 1) +
        "/" +
        wkDateA.getFullYear()
    );
    console.log(
      wkDateB.getDate() +
        "/" +
        (wkDateB.getMonth() + 1) +
        "/" +
        wkDateB.getFullYear()
    );

    try {
      if (wkDateA == null || wkDateB == null) {
        return retValue;
      }

      // 基準日付

      // calendarA = Calendar.getInstance();
      // calendarA.setTime(wkDateA);
      // calendarA.add(Calendar.HOUR, 0);
      // calendarA.add(Calendar.MINUTE, 0);
      // calendarA.add(Calendar.SECOND, 0);
      // calendarA.add(Calendar.MILLISECOND, 0);

      // // 基準日付から引く日付
      // calendarB = Calendar.getInstance();
      // calendarB.setTime(wkDateB);
      // calendarB.add(Calendar.HOUR, 0);
      // calendarB.add(Calendar.MINUTE, 0);
      // calendarB.add(Calendar.SECOND, 0);
      // calendarB.add(Calendar.MILLISECOND, 0);

      var wkValue = calendarA.getTime() - calendarB.getTime();
      wkValue /= 1000; // MILLISECOND
      wkValue /= 60; // SECOND
      wkValue /= 60; // MINUTE
      wkValue /= 24; // HOUR
      retValue = wkValue;
      console.log(retValue);
    } catch (err) {
      console.log(err);
    }

    return retValue;
  }

  /**
   * 金額のフォーマットで変換.
   *
   * @param value [in] long   値
   * @return  String  フォーマット後の文字列
   */
  static KingakuFormat(value) {
    return OtherUtil.KingakuFormatLocal("###,##0", value);
  }

  /**
   * 金額用フォーマット<br />
   * 正数の場合： ￥xxx,xxx<br />
   * 負数の場合： △xxx,xxx
   *
   * @param wkFormat  [in] String フォーマット
   * @param value     [in] long   金額
   * @return String   金額用に整形された金額
   */
  static KingakuFormatLocal(wkFormat, value) {
    var kingaku;
    var format;
    var temp = value;
    if (temp < 0) {
      temp = Math.abs(temp);
      // format = new DecimalFormat("-" + wkFormat);
    }

    kingaku = temp;
    kingaku = kingaku.toLocaleString("en-US");
    return kingaku;
  }
}

/**
 * ガス料金等計算処理クラス.
 */

class GasRaterCom {
  /** 端数処理：加算 */
  static HASADD = [
    0, 50000, 0, 99000, 20000, 0, 49000, 5000, 0, 9000, 2000, 0, 4000, 500, 0,
    900, 0,
  ];
  /** 端数処理：乗算 */
  static HASMUL = [
    10, 100000, 100000, 100000, 50000, 50000, 50000, 10000, 10000, 10000, 5000,
    5000, 5000, 1000, 1000, 1000, 10,
  ];

  /**
   * ガス消費税の計算
   *
   * @param kin       [in] long               金額
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @param sysfDat   [in] {@link SysfDat}    システムデータ
   * @return  int 消費税額
   */

  static calcConTax(kin, kokfDat, gasfDat, sysfDat) {
    var tax;
    var wkConTax = 0;
    if (gasfDat.mTaxDiv == 3) {tax =kin *GasRaterCom.getKenTaxr(
          kokfDat,
          sysfDat,
          sysfDat.mTax_yy,
          sysfDat.mTax_mm,
          sysfDat.mTax_dd,
          sysfDat.mConsumTax,
          sysfDat.mTaxr_old,
          sysfDat.mTaxr_new
        );
      console.log(tax);
      wkConTax =
        OtherUtil.hasCom(tax, gasfDat.mTaxAdd, gasfDat.mTaxMult, 1000) / 1000;
      console.log(wkConTax);
    }
    return wkConTax;
  }

  /**
   * 検針関係の消費税率の取得（検針・還元額）.
   *
   * @param kokf      [in] {@link KokfDat}    顧客データ
   * @param sysf      [in] {@link SysfDat}   システムデータ
   * @param tax_yy    [in] short              消費税変更日付(年)
   * @param tax_mm    [in] byte               消費税変更日付(月)
   * @param tax_dd    [in] byte               消費税変更日付(日)
   * @param taxr      [in] short              基本の消費税率
   * @param taxr_old  [in] short              旧税率
   * @param taxr_new [in] short               新税率
   * @return int   消費税率
   */
  static getKenTaxr(
    kokf,
    sysf,
    tax_yy,
    tax_mm,
    tax_dd,
    taxr,
    taxr_old,
    taxr_new
  ) {
    var res_taxr = taxr;
    var wk_yy;
    var wk_mm;
    var wk_dd;
    var tax_ymd; //消費税更新日
    var tax_next; //消費税更新の翌月
    var srt_ymd; //初期日付
    var old_ymd; //前回検針日
    var ken_ymd; //今回検針日

    if (tax_yy != 0 && tax_mm != 0 && tax_dd != 0) {
      tax_next = tax_yy * 10000 + (tax_mm + 1) * 100 + tax_dd;
      tax_ymd = tax_yy * 10000 + tax_mm * 100 + tax_dd;
      //
      if (kokf.mKMonth == 0) {
        wk_yy = sysf.mSysYear;
        wk_mm = sysf.mMonth;
        wk_dd = sysf.mDate;
      } else {
        wk_mm = kokf.mKMonth;
        wk_dd = kokf.mKDate;
        if (sysf.mSysMonth == wk_mm) {
          wk_yy = sysf.mSysYear;
        } else if (sysf.mSysMonth == 1) {
          wk_yy = sysf.mSysYear - 1;
        } else {
          wk_yy = sysf.mSysYear;
        }
      }
      ken_ymd = wk_yy * 10000 + wk_mm * 100 + wk_dd;
      //初回日付
      if (kokf.mKaiYear != 0 && kokf.mKaiMonth != 0 && kokf.mKaiDate != 0) {
        srt_ymd = kokf.mKaiYear * 10000 + kokf.mKaiMonth * 100 + kokf.mKaiDate;
      } else {
        srt_ymd = 0;
      }
      //前回検針日
      if (kokf.mPuseYear != 0 && kokf.mPuseMonth != 0 && kokf.mPuseDate != 0) {
        old_ymd =
          kokf.mPuseYear * 10000 + kokf.mPuseMonth * 100 + kokf.mPuseDate;
      } else {
        old_ymd = 0;
      }
      //消費税更新日付あり
      //　①今回検針日が、  システムの消費変更日付の翌月以降・・・・新税率
      //　②メータ初期日が、システムの消費変更日付以降・・・・・・・新税率
      //　③前回検針日が、  システムの消費変更日付以降・・・・・・・新税率
      //　④今回検針日が、  システムの消費変更日付以前・・・・・・・旧税率
      //　⑤前回検針日が、  システムの消費変更日付以前・・・・・・・旧税率
      //  ⑥メータ初期日、  システムの消費変更日付以前・・・・・・・旧税率
      //　　上記以外は、新税率とする。
      if (ken_ymd >= tax_next) {
        res_taxr = taxr_new;
      } else if (srt_ymd > 0 && srt_ymd >= tax_ymd) {
        res_taxr = taxr_new;
      } else if (old_ymd > 0 && old_ymd >= tax_ymd) {
        res_taxr = taxr_new;
      } else if (ken_ymd > 0 && ken_ymd < tax_ymd) {
        res_taxr = taxr_old;
      } else if (old_ymd > 0) {
        res_taxr = taxr_old;
      } else if (srt_ymd > 0) {
        res_taxr = taxr_old;
      } else {
        res_taxr = taxr_new;
      }
    }
    return res_taxr;
  }

  /**
   * ガス使用量の取得.
   *
   * @param nGasUse   [in] int                使用量
   * @param sy2f      [in] {@link Sy2fDat}    システム2データ
   * @param kouser    [in] {@link KouserDat}  顧客拡張データ
   * @return int 中圧係数、
   */
  static getGasSuryo(nGasUse, sy2f, kouser) {
    return getGasSuryo(nGasUse, sy2f, kouser, false);
  }

  /**
   * ガス使用量の取得.
   *
   * @param nGasUse   [in] int                ガス使用量
   * @param sysf2     [in] {@link Sy2fDat}    システム2データ
   * @param kouser    [in] {@link KouserDat}  顧客拡張データ
   * @param isNebiki  [in] boolean            値引きフラグ
   * @return  int ガス使用量
   */
  static getGasSuryo(nGasUse, sysf2, kouser, isNebiki) {
    //ガス料金で使用する使用量（中圧係数対応）
    var nGasSur;
    if (sysf2.mCaFlg == 1 && kouser.m_nChuatu > 0) {
      //中圧係数後での料金計算
      var dValue = nGasUse * kouser.m_nChuatu * 10;
      console.log(dValue);
      switch (sysf2.mCaHas) {
        case 1: //四捨五入
          nGasSur =
            OtherUtil.hasCom(
              dValue,
              GasRaterCom.HASADD[13],
              GasRaterCom.HASMUL[13],
              10000
            ) / 10000;
          break;
        case 2: //切上げ
          nGasSur =
            OtherUtil.hasCom(
              dValue,
              GasRaterCom.HASADD[15],
              GasRaterCom.HASMUL[15],
              10000
            ) / 10000;
          break;
        case 0: //切捨て
        default: //切捨て
          nGasSur =
            OtherUtil.hasCom(
              dValue,
              GasRaterCom.HASADD[14],
              GasRaterCom.HASMUL[14],
              10000
            ) / 10000;
          break;
      }
    } else if (isNebiki && kouser.m_nChuatu > 0) {
      nGasSur =
        GasRaterCom.hasCom(
          nGasUse * kouser.m_nChuatu * 10,
          GasRaterCom.HASADD[14],
          GasRaterCom.HASMUL[14],
          10000
        ) / 10000;
    } else {
      //指針の差での料金計算
      console.log(nGasUse);
      nGasSur = nGasUse;
    }
    return nGasSur;
  }

  /**
   * 端数処理
   *
   * @param suu    [in] double 対象数値
   * @param add    [in] int    加算分
   * @param multi  [in] int    乗算分
   * @param keta   [in] double 桁数
   * @return   long    端数処理後の値
   */
  static hasCom(suu, add, multi, keta) {
    var kin, kin1;
    var add1, multi1;
    var sgn;

    if (add == 0 && multi == 10) {
      // 端数処理：未設定
      kin = suu;
    } else {
      kin1 = suu;
      if (keta < 0) {
        kin1 = suu * Math.abs(keta);
      } else if (keta > 0) {
        kin1 = suu / Math.abs(keta);
      }

      add1 = 0.1 + add;
      multi1 = multi;
      if (kin1 < 0) {
        sgn = -1;
      } else {
        sgn = 1;
      }
      kin1 = Math.abs(kin1);

      var temp = (kin1 * 1000 + add1 + 0.01) / multi1;
      temp = Math.floor(temp);
      kin = ((temp * multi1) / 1000) * sgn;

      if (keta < 0) {
        kin /= Math.abs(keta);
      } else if (keta > 0) {
        kin *= Math.abs(keta);
      }
    }

    return kin;
  }

  /**
   * 使用量の計算
   *
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @param nowMeter  [in] int                現在指針
   * @return  int ガス使用量
   */
  static calcGasUse(kokfDat, nowMeter) {
    var wkUse = kokfDat.mBetwMeter;
    if (kokfDat.mPreMeter <= nowMeter) {
      wkUse += nowMeter - kokfDat.mPreMeter;
    } else {
      wkUse += Math.pow(10, kokfDat.mMtKeta + 1) + nowMeter - kokfDat.mPreMeter;
    }
    return wkUse;
  }

  /**
   * ガス基本料金の再計算
   *
   * @param sysf  [in] {@link SysfDat}    システムデータ
   * @param gasf  [in] {@link GasfDat}    ガス料金データ
   * @param kokf  [in] {@link KokfDat}    顧客データ
   * @return int 開始ステップ
   */
  static calcGasBaseKin(sysf, gasf, kokf, sy2fDat, kouserDat) {
    if (gasf.mSum == 4 || kokf.mSupplyForm == 2) {
      // 手入力は計算対象外
      // 供給親も対象外
      return 0;
    }
    var nStartStep = 0;
    var nBaseKin;
    var nFacilityKin = 0;
    var lstGstpDat = gasf.m_lstGstpDat;
    var gstpDat;
    if (gasf.mSum == 3) {
      // 契約単価
      nBaseKin = kokf.mGasBase * 10;
    } else if (gasf.mSum == 2) {
      // 簡ガス
      var nSur = getGasSuryo(kokf.mGasUse, sy2fDat, kouserDat);
      if (kokf.mHiwari != 0) {
        // 日割り日数がある場合は予測使用量を計算
        nSur = (nSur * 30) / kokf.mHiwari;
      }
      // 予め最後の料金式を設定
      gstpDat = lstGstpDat[lstGstpDat.length - 1];
      for (tmpGstpDat in lstGstpDat) {
        if (tmpGstpDat.mUplimit > nSur) {
          // 基本料金確定
          gstpDat = tmpGstpDat;
          break;
        }
        nStartStep++;
      }
      nBaseKin = gstpDat.mBase;
    } else {
      // ガス料金の基本料金
      var prevGstpDat = null;
      gstpDat = lstGstpDat[0];
      if (lstGstpDat.length > 1 && lstGstpDat[0].mUplimit <= 1) {
        prevGstpDat = lstGstpDat[0];
        gstpDat = lstGstpDat[1];
      }
      if (prevGstpDat == null) {
        nBaseKin = gstpDat.mBase;
      } else {
        nStartStep = 1;
        nBaseKin = gstpDat.mBase - (gstpDat.mAdd * prevGstpDat.mUplimit) / 10;
      }
      var gext = gasf.mGextDat;
      if (sysf.mVisibleGas == 1 && gext.m_nBasekin != 0) {
        // ガス料金透明化によるガス基本料金を設定している場合
        nBaseKin = gext.m_nBasekin * 10000;
        if (gext.m_nFacilitykin != 0 && sysf.mVisibleFacility == 1) {
          nFacilityKin = gext.m_nFacilitykin * 10000;
        }
        nBaseKin -= nFacilityKin;
      }
    }
    GasRaterCom.calcZogenHiwari(
      kokf.mKtpcdat,
      kokf.mFee,
      nBaseKin,
      nFacilityKin,
      gasf,
      kokf.mHiwari
    );
    return nStartStep;
  }

  /**
   * ガス使用率のチェック
   *
   * @param sysf      [in] {@link SysfDat}    システムデータ
   * @param kokf      [in] {@link KokfDat}    顧客データ
   * @param siyou     [in] int                ガス使用量
   * @param now_month [in] short              現在月
   * @param now_day   [in] short              現在日
   * @return  boolean 使用率チェック
   */
  static checkSrpday(
    sysf,
    kokf,
    siyou,
    now_month,
    now_day,
    sy2fDat,
    kouserDat
  ) {
    var ret;
    var month_tbl = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var old_srpday = kokf.mPuseSrpDay;
    var new1_srpday;
    var it;
    var wkm, wkd;
    if (now_month == 0) {
      wkm = sysf.mMonth;
      wkd = sysf.mDate;
    } else {
      wkm = now_month;
      wkd = now_day;
    }

    if (kokf.mPuseMonth == 0 && kokf.mPuseDate == 0) {
      it = 30;
    } else {
      if (wkm == kokf.mPuseMonth) {
        it = wkd - kokf.mPuseDate;
      } else if (wkm == kokf.mPuseMonth + 1) {
        it = wkd + month_tbl[kokf.mPuseMonth] - kokf.mPuseDate;
      } else {
        it = 30;
      }
    }

    if (it < 1) {
      it = 1; /* 除算エラー対策 */
    }
    new1_srpday =
      (GasRaterCom.getSrpSuryo(siyou, sy2fDat, kouserDat) * sysf.mSanki) / it;
    new1_srpday = new1_srpday / 10;
    var mSrChkm = sysf.mSrChkm;
    var mSrChkr = sysf.mSrChkr;

    if (old_srpday == 0) {
      ret = false;
    } else if (old_srpday < mSrChkm[0] * 100) {
      ret =
        mSrChkr[0] * old_srpday >= new1_srpday * 100 &&
        mSrChkr[1] * old_srpday <= new1_srpday * 100;
    } else {
      if (
        sysf.mSrChkm[0] * 100 > old_srpday &&
        sysf.mSrChkm[1] * 100 <= old_srpday
      ) {
        ret =
          sysf.mSrChkr[2] * old_srpday >= new1_srpday * 100 &&
          sysf.mSrChkr[3] * old_srpday <= new1_srpday * 100;
      } else {
        ret =
          sysf.mSrChkr[4] * old_srpday >= new1_srpday * 100 &&
          sysf.mSrChkr[5] * old_srpday <= new1_srpday * 100;
      }
    }
    return ret;
  }

  /**
   * 使用量チェック用の使用量を取得.
   *
   * @param nGasUse   [in] int                ガス使用量
   * @param sy2fDat   [in] {@link Sy2fDat}    システム2データ
   * @param kouserDat [in] {@link KouserDat}  顧客拡張データ
   * @return  ガス使用量
   */
  static getSrpSuryo(nGasUse, sy2fDat, kouserDat) {
    //ガス料金で使用する使用量（中圧係数対応）
    var nGasSur;
    if (sy2fDat.mCaFlg == 1 && kouserDat.m_nChuatu > 0) {
      //中圧係数後での料金計算
      var dValue = nGasUse * kouserDat.m_nChuatu;
      nGasSur =
        GasRaterCom.hasCom(dValue, HASADD[14], HASMUL[14], 10000) / 10000;
    } else {
      //指針の差での料金計算
      nGasSur = nGasUse;
    }
    return nGasSur;
  }

  /**
   * 間ガス日割り計算チェック
   *
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @return  boolean 日割り有無フラグ
   */
  static checkKgas(kokfDat, kobetu) {
    var ret = false;
    if (kokfDat.mGasKubun == 2 || kobetu != 0) {
      // 日割りを行うか、間ガス顧客の場合
      if (kokfDat.mPuseMonth != 0 || kokfDat.mKaiYear != 0) {
        // 前回検針月か開栓年のいずれかが設定されている場合
        ret = true;
      }
    }
    return ret;
  }

  /**
   * 簡易ガスの日割りチェック
   *
   * @param sysfDat   [in] {@link SysfDat}    システムデータ
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @param kMonth    [in] int                月
   * @param kDay      [in] int                日
   * @return  int 日割り日数
   */
  static getKgasday(sysfDat, kokfDat, kMonth, kDay) {
    var kdaySuu;
    var chky, chkm, chkd;
    var wky, wkm, wkd;
    if (kMonth == 0) {
      // 検針月が0(基本的にありえない)
      wky = sysfDat.mYear;
      wkm = sysfDat.mMonth;
      wkd = sysfDat.mDate;
    } else if (sysfDat.mSysMonth != kMonth) {
      // システム月と検針月が違う
      wky = sysfDat.mSysYear;
      if (sysfDat.mSysMonth == 1 && kMonth == 12) {
        // システム月が1月、検針月が12月
        // 検針年はシステム年の前年
        wky--;
      } else if (sysfDat.mSysMonth == 12 && kMonth == 1) {
        // システム月が12月、検針月が1月
        // 検針年はシステム年の翌年
        wky++;
      }
      wkm = kMonth;
      wkd = kDay;
    } else {
      // 処理年
      wky = sysfDat.mSysYear;
      // 検針月
      wkm = kMonth;
      // 検針日
      wkd = kDay;
    }

    // チェック対象の日付データ生成
    var chkYmd = OtherUtil.parseDate(wky + "/" + wkm + "/" + wkd);

    var t_pre = 0;
    var t_start = 0;
    // 前回検針日もしくは供給開始日の設定
    if (kokfDat.mPuseMonth == 0) {
      // 前回検針日なし・・・開栓日
      chky = kokfDat.mKaiYear;
      chkm = kokfDat.mKaiMonth;
      chkd = kokfDat.mKaiDate;
    } else {
      // 前回検針日
      chky = kokfDat.mPuseYear;
      chkm = kokfDat.mPuseMonth;
      chkd = kokfDat.mPuseDate;
      if (0 != kokfDat.mKaiYear) {
        // 供給開始日有り
        t_pre =
          kokfDat.mPuseYear * 10000 +
          kokfDat.mPuseMonth * 100 +
          kokfDat.mPuseDate;
        t_start =
          kokfDat.mKaiYear * 10000 + kokfDat.mKaiMonth * 100 + kokfDat.mKaiDate;
        if (t_pre < t_start) {
          // 供給開始日が新しい・・・供給開始日を設定
          chky = kokfDat.mKaiYear;
          chkm = kokfDat.mKaiMonth;
          chkd = kokfDat.mKaiDate;
        }
      }
    }

    // 前回検針日もしくは供給開始日から日付データ生成
    var wrkYMD = OtherUtil.parseDate(chky + "/" + chkm + "/" + chkd);

    // 前回検針日もしくは供給開始日から今回検針日までの日数を計算
    var ts = OtherUtil.betweenDays(chkYmd, wrkYMD);

    if (t_pre < t_start || kokfDat.mPuseMonth == 0) {
      // 供給開始日の方が新しいか前回検針無し
      // 供給開始日の日にちを計上する
      ts++;
    }

    // 簡ガス 検針日数
    // 似数が0未満の場合は0に設定
    kdaySuu = Math.max(ts, 0);
    return kdaySuu;
  }

  /**
   * ガス料金計算開始
   *
   * @param siyou     [in] int                ガス使用量
   * @param day       [in] int                使用日数
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @return  long    ガス料金
   * @throws MException    ガス料金計算でエラーが発生した場合
   */
  static dailyGasrate(siyou, day, kokfDat, gasfDat) {
    if (kokfDat.mSupplyForm == 2) {
      // 供給親の場合はガス料金を計算しない
      return 0;
    }
    var wkRyokin;
    try {
      if (day != 0) {
        // 日割り計算有
        console.log("if day !=0");
        wkRyokin = GasRaterCom.mathDayGasRate(day, siyou, kokfDat, gasfDat);
      } else {
        // 日割り無し
        console.log("if day ==0");
        wkRyokin = GasRaterCom.mathGasRate(siyou, kokfDat, gasfDat);
      }
    } catch (err) {
      console.log(err);
    }
    return wkRyokin;
  }

  /**
   * 日割りガス料金計算
   *
   * @param day       [in] int                使用日数
   * @param siyou     [in] int                ガス使用量
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @return  long ガス料金
   * @throws Exception    ガス料金計算でエラーがあった場合に発生
   */
  static mathDayGasRate(day, siyou, kokfDat, gasfDat) {
    var wkRyoukin;
    switch (gasfDat.mSum) {
      case 1: // 通常
        if (gasfDat.mSyu == 1) {
          // 表形式
          wkRyoukin = GasRaterCom.mathDayGasRateNormal_1(day, siyou, gasfDat);
        } else {
          //ステップ形式
          wkRyoukin = GasRaterCom.mathDayGasRateNormal(day, siyou, gasfDat); // 13.07.09
        }
        break;
      case 2: // 簡ガス
        wkRyoukin = GasRaterCom.mathDayGasRateKgas(day, siyou, gasfDat); // 13.07.09
        break;
      case 3: // 契約単価
        wkRyoukin = GasRaterCom.mathDayGasRateDay(day, siyou, gasfDat, kokfDat);
        break;

      default:
        return 0;
    }
    return wkRyoukin;
  }

  /**
   * 日割り料金計算(通常) : LPガスの表形式の情報より計算
   *
   * @param day       [in] int                使用日数
   * @param siyou     [in] int                ガス使用量
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @return  int ガス料金
   */
  static mathDayGasRateNormal_1(day, siyou, gasfDat) {
    var dbRate;

    if (gasfDat.m_lstGstpDat.size() - 2 < siyou) {
      // 表形式で設定されている上限超過時
      var max_50_kin = gasfDat.m_lstGstpDat.get(gasfDat.m_lstGstpDat.size() - 2).mBase; // 50.0m3の料金
      var lmt_over_add = gasfDat.m_lstGstpDat.get(gasfDat.m_lstGstpDat.size() - 1).mBase; // 0.1m3の従量料金
      var base_tanka = gasfDat.m_lstGstpDat.get(0).mBase; // 基本料金

      // 従量料金50.1～
      var add_sum = 0;
      if (lmt_over_add > 0) {
        add_sum = lmt_over_add * (siyou - (gasfDat.m_lstGstpDat.size() - 2));
      }

      var max_50_kin_jyuryo = 0;

      // 万が一50.0m3の料金が基本料金より安い場合は、50.0m3の従量0円
      if (max_50_kin > base_tanka) {
        max_50_kin_jyuryo = max_50_kin - base_tanka;
      }

      // 50.0m3の従量料金を加算
      add_sum += max_50_kin_jyuryo;

      //超過時の基本料金のみ日割り
      dbRate = (base_tanka * day) / 30 + add_sum;
    } else {
      var base_tanka = gasfDat.m_lstGstpDat.get(0).mBase; // 基本料金
      dbRate =
        (base_tanka * day) / 30 +
        gasfDat.m_lstGstpDat.get(siyou).mBase -
        base_tanka;

      //	日割り計算した結果がマイナス時、ガス料金を０円とする。
      if (dbRate < 0) {
        dbRate = 0.0;
      }
    }

    dbRate = OtherUtil.hasCom(
      dbRate,
      gasfDat.mFrac1Add,
      gasfDat.mFrac1Mult,
      10000
    );
    dbRate *= 1000 + gasfDat.mRiseFall;
    dbRate = OtherUtil.hasCom(
      dbRate,
      gasfDat.mFrac2Add,
      gasfDat.mFrac2Mult,
      10000000
    );
    return long(dbRate / 10000000);
  }

  /**
   * 日割り料金計算(通常)
   *
   * @param day       [in] int                使用日数
   * @param siyou     [in] int                ガス使用量
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @return  int ガス料金
   * @throws Exception    ガス料金計算でエラーがあった場合に発生
   */
  static mathDayGasRateNormal(day, siyou, gasfDat) {
    var wkGr1; // １ヵ月(30日)での予測使用量
    var wkGr2; // １ヵ月(30日)での予測使用量
    var dbRate;

    var nStep = 0;
    var nLimit;
    var wk_gr = 0;

    if (gasfDat.mLine > 0 && gasfDat.m_lstGstpDat.get(0).mBase > 0) {
      wk_gr = gasfDat.m_lstGstpDat.get(0).mBase; // 基本料金
    } else if (gasfDat.mLine > 1) {
      // 基本料金 - 従量料金
      wk_gr =
        gasfDat.m_lstGstpDat.get(1).mBase -
        (gasfDat.m_lstGstpDat.get(0).mUplimit *
          gasfDat.m_lstGstpDat.get(1).mAdd) /
          10;
    }

    for (var i = 0; i < gasfDat.m_lstGstpDat.size(); i++) {
      nLimit = gasfDat.m_lstGstpDat.get(i).mUplimit;
      if (nLimit > siyou) {
        nStep = i;
        break;
      }
      if (nLimit > 0) {
        nStep = i;
      }
    }
    if (nStep >= gasfDat.m_lstGstpDat.size()) {
      console.log("入力値が不正です");
    }
    var gstpDat = gasfDat.m_lstGstpDat.get(nStep);
    if (nStep == 0) {
      wkGr1 = gstpDat.mBase; // 基本料金
    } else {
      // 対象となる料金設定の手前まで使用量を引く
      wkGr1 =
        gstpDat.mBase -
        gasfDat.m_lstGstpDat.get(nStep - 1).mUplimit * (gstpDat.mAdd / 10);
    }
    wkGr2 = siyou * (gstpDat.mAdd / 10);
    //従量料金
    wkGr2 = wkGr1 + wkGr2 - wk_gr;
    //基本料金の日割＋従量料金
    wkGr1 = (wk_gr * day) / 30; // 基本料金の日割計算
    dbRate = wkGr1 + wkGr2;
    if (dbRate < 0) {
      dbRate = 0;
    }

    dbRate = OtherUtil.hasCom(
      dbRate,
      gasfDat.mFrac1Add,
      gasfDat.mFrac1Mult,
      10000
    );
    dbRate *= 1000 + gasfDat.mRiseFall;
    dbRate = OtherUtil.hasCom(dbRate,gasfDat.mFrac2Add,gasfDat.mFrac2Mult,10000000);
    console.log("ステップ形式日割り料金計算[終了][ガス料金:" + dbRate / 10000000 + "]");
    return long(dbRate / 10000000);
  }

  /**
   * 日割り料金計算(簡ガス)
   *
   * @param day       [in] int                使用日数
   * @param siyou     [in] int                ガス使用量
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @return  int ガス料金
   * @throws Exception    ガス料金計算でエラーがあった場合に発生
   */
  static mathDayGasRateKgas(day, siyou, gasfDat) {
    console.log("簡ガス日割りガス料金計算[開始]");
    var wkSr; // １ヵ月(30日)での予測使用量
    var wkGr; // １ヵ月(30日)での予測使用量
    var wkGr1; // １ヵ月(30日)での予測使用量
    var wkGr2; // １ヵ月(30日)での予測使用量

    var dSubSur = siyou;
    var dSubChoSur = 0;

    if (day == 0) {
      // 0割対応
      wkSr = siyou;
    } else {
      // １ヵ月(30日)での予測使用量
      wkSr = (siyou * 30) / day;
    }

    var iStep = 0;
    var limit;
    for (var i = 0; i < gasfDat.m_lstGstpDat.size(); i++) {
      limit = gasfDat.m_lstGstpDat.get(i).mUplimit;
      if (limit > wkSr) {
        iStep = i;
        break;
      }
      if (limit > 0) {
        iStep = i;
      }
      if (gasfDat.m_lstGstpDat.get(i).mAdd != 0) {
        dSubChoSur = limit;
      }
    }
    if (iStep >= gasfDat.m_lstGstpDat.size()) {
      throw new Exception("入力値が不正です");
    }
    var gstpDat = gasfDat.m_lstGstpDat.get(iStep);
    wkGr = gstpDat.mBase; // 基本料金
    wkGr2 = (siyou / 10) * gstpDat.mAdd; // 使用量＊（加算額＋調整単価）
    dSubSur = dSubSur / 10;
    dSubChoSur = dSubChoSur / 10; // 基本料金の日割計算
    wkGr1 = (wkGr * day) / 30;
    var dbRate = wkGr1 + wkGr2;
    if (dbRate > 0 && dSubSur > dSubChoSur) {
      dbRate += (dSubSur - dSubChoSur) * gasfDat.mChoTanka;
    }
    dbRate = OtherUtil.hasCom(
      dbRate,
      gasfDat.mFrac1Add,
      gasfDat.mFrac1Mult,
      10000
    );
    dbRate *= 1000 + gasfDat.mRiseFall;
    dbRate = OtherUtil.hasCom(
      dbRate,
      gasfDat.mFrac2Add,
      gasfDat.mFrac2Mult,
      10000000
    );
    console.log("簡ガス日割りガス料金計算[終了][簡ガス日割りガス料金:" +dbRate / 10000000 +"]");
    return long(dbRate / 10000000);
  }

  /**
   * 日割り料金計算（契約単価）
   *
   * @param day       [in] int                日数
   * @param siyou     [in] int                使用量
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @return  long ガス料金
   */
  static mathDayGasRateDay(day, siyou, gasfDat, kokfDat) {
    MLog.INFO(ctx, TAG, "契約単価日割り料金計算[開始]");
    var wkGr; // １ヵ月(30日)での予測使用量
    var wkGr1; // １ヵ月(30日)での予測使用量
    var wkGr2; // １ヵ月(30日)での予測使用量

    wkGr = kokfDat.mGasBase * 10; // 基本料金-従量料金分
    wkGr2 = siyou * kokfDat.mGasUnit; // 使用量＊加算額
    wkGr1 = (wkGr * day) / 30; // 基本料金の日割計算
    var dbRate = wkGr1 + wkGr2;
    if (dbRate != 0) {
      dbRate = OtherUtil.hasCom(dbRate,gasfDat.mFrac1Add,gasfDat.mFrac1Mult,10000);
      dbRate = dbRate * (1000 + gasfDat.mRiseFall);
      dbRate = OtherUtil.hasCom(
        dbRate,
        gasfDat.mFrac2Add,
        gasfDat.mFrac2Mult,
        10000000
      );
    }
    console.log("契約単価日割り料金計算[終了][ガス料金:" + dbRate / 10000000 + "]");
    return dbRate / 10000000;
  }

  /**
   * ガス料金計算
   *
   * @param siyou     [in] int                ガス使用量
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @return  long ガス料金
   * @throws Exception    ガス料金計算でエラーが発生した場合
   */
  static mathGasRate(siyou, kokfDat, gasfDat) {
    var wkRyoukin;
    console.log(gasfDat.mSum);
    switch (gasfDat.mSum) {
      case 1: // 通常
        console.log(gasfDat.mSyu);
        if (gasfDat.mSyu == 1) {
          // 表形式
          wkRyoukin = GasRaterCom.mathGasRateNormalG_1(siyou, gasfDat);
        } else {
          //ステップ形式
          wkRyoukin = GasRaterCom.mathGasRateNormalG(siyou, gasfDat);
        }
        console.log("ガス料金: " + wkRyoukin);
        break;
      case 2: // 簡ガス
        wkRyoukin = mathGasRateKgasG(ctx, siyou, gasfDat);
        console.log("簡ガス料金: " + wkRyoukin);
        break;
      case 3: // 契約単価
        var dbRate = siyou * kokfDat.mGasUnit + kokfDat.mGasBase * 10;
        // 端数処理
        dbRate = OtherUtil.hasCom(
          dbRate,
          gasfDat.mFrac1Add,
          gasfDat.mFrac1Mult,
          10000
        );
        dbRate = dbRate * (1000 + gasfDat.mRiseFall);
        dbRate = OtherUtil.hasCom(dbRate,gasfDat.mFrac2Add,gasfDat.mFrac2Mult,10000000);
        wkRyoukin = dbRate / 10000000;
        break;
      default:
        wkRyoukin = 0;
        break;
    }
    return wkRyoukin;
  }

  /**
   * 通常料金計算（COMPACK-G用）: LPガスの表形式の情報より計算
   *
   * @param siyou     [in] int                使用量
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @return  long ガス料金
   */
  static mathGasRateNormalG_1(siyou, gasfDat) {
    console.log("表形式ガス料金計算[開始]");
    var dbRate;

    if (gasfDat.m_lstGstpDat.length - 2 < siyou) {
      // 表形式で設定されている上限超過時
      var base_tanka =
        gasfDat.m_lstGstpDat[gasfDat.m_lstGstpDat.length - 2].mBase;
      var lmt_over_add =
        gasfDat.m_lstGstpDat[gasfDat.m_lstGstpDat.length - 1].mBase;

      var add_sum = 0;
      if (lmt_over_add > 0) {
        add_sum = lmt_over_add * (siyou - (gasfDat.m_lstGstpDat.length - 2));
      }

      dbRate = base_tanka + add_sum;
    } else {
      dbRate = gasfDat.m_lstGstpDat[siyou].mBase;
    }

    if (dbRate > 0) {
      dbRate = OtherUtil.hasCom(
        dbRate,
        gasfDat.mFrac1Add,gasfDat.mFrac1Mult,10000);
      dbRate *= 1000 + gasfDat.mRiseFall;
      dbRate = OtherUtil.hasCom(
        dbRate,
        gasfDat.mFrac2Add,
        gasfDat.mFrac2Mult,
        10000000
      );
    }
    console.log("表形式ガス料金計算[終了][ガス料金:" + dbRate / 10000000 + "]");
    return dbRate / 10000000;
  }

  /**
   * 通常料金計算（COMPACK-G用）: LPガスのガス計算方式からの計算(ステップ形式)
   *
   * @param siyou     [in] int                使用量
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @return  long ガス料金
   * @throws Exception    ガス料金計算でエラーがあった場合に発生
   */
  static mathGasRateNormalG(siyou, gasfDat) {
    console.log("ステップ形式ガス料金計算[開始]");
    var gstpDat;
    var nStep = 0;
    var nLimit;
    var nSubChoSur = 0;
    var nSubSur = siyou;
    console.log(gasfDat.m_lstGstpDat.length);
    for (var i = 0; i < gasfDat.m_lstGstpDat.length; i++) {
      nLimit = gasfDat.m_lstGstpDat[i].mUplimit;
      if (nLimit > siyou) {
        nStep = i;
        break;
      }
      if (nLimit > 0) {
        nStep = i;
      }
      if (gasfDat.m_lstGstpDat[i].mAdd == 0) {
        nSubChoSur = nLimit;
      }
    }
    if (nStep >= gasfDat.m_lstGstpDat.length) {
      console.log("ガス通常料金：入力値が不正です。");
    }
    // 対象となる料金設定のためまでの使用量を引く
    if (nStep > 0) {
      siyou = siyou - gasfDat.m_lstGstpDat[nStep - 1].mUplimit;
    }
    gstpDat = gasfDat.m_lstGstpDat[nStep];
    var dbRate = (siyou / 10) * gstpDat.mAdd + gstpDat.mBase;
    if (dbRate != 0 && gstpDat.mAdd != 0) {
      dbRate += ((nSubSur - nSubChoSur) / 10) * gasfDat.mChoTanka;
    }
    dbRate = OtherUtil.hasCom(
      dbRate,
      gasfDat.mFrac1Add,
      gasfDat.mFrac1Mult,
      10000
    );
    dbRate *= 1000 + gasfDat.mRiseFall;
    dbRate = OtherUtil.hasCom(
      dbRate,
      gasfDat.mFrac2Add,
      gasfDat.mFrac2Mult,
      10000000
    );

    return dbRate / 10000000;
  }

  /**
   * 簡ガス料金計算
   *
   * @param siyou     [in] int                使用量
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @return  long 簡ガス料金
   * @throws Exception    Exception   ガス料金計算でエラーがあった場合に発生
   */
  static mathGasRateKgasG(siyou, gasfDat) {
    console.log("簡ガス料金計算[開始]");
    var gstpdat;
    var nStep = 0;
    var nLimit;
    var nSubChoSur = 0;
    for (var i = 0; i < gasfDat.m_lstGstpDat.length; i++) {
      nLimit = gasfDat.m_lstGstpDat[i].mUplimit;
      if (nLimit > siyou) {
        nStep = i;
        break;
      }
      if (nLimit > 0) {
        nStep = i;
      }
      if (gasfDat.m_lstGstpDat[i].mAdd == 0) {
        nSubChoSur = nLimit;
      }
    }
    if (nStep >= gasfDat.m_lstGstpDat.length) {
      console.log("簡ガス料金：入力値が不正です");
    }
    gstpdat = gasfDat.m_lstGstpDat.get(nStep);
    var dbRate = (siyou / 10) * gstpdat.mAdd + gstpdat.mBase;
    if (dbRate != 0 && gstpdat.mAdd != 0) {
      dbRate += ((siyou - nSubChoSur) / 10) * gasfDat.mChoTanka;
    }
    dbRate = OtherUtil.hasCom(
      dbRate,
      gasfDat.mFrac1Add,
      gasfDat.mFrac1Mult,
      10000
    );
    dbRate = dbRate * (1000 + gasfDat.mRiseFall);
    dbRate = OtherUtil.hasCom(
      dbRate,
      gasfDat.mFrac2Add,
      gasfDat.mFrac2Mult,
      10000000
    );
    console.log("簡ガス料金計算[終了][簡ガス料金:" + dbRate / 10000000 + "]");
    return dbRate / 10000000;
  }

  /**
   * 割引金額の取得.
   *
   * @param sysfDat       [in] {@link SysfDat}        システムデータ
   * @param lstKnebDat    [in] {@code List<KnebDat>}  値引きデータ
   * @return  int 値引き金額
   */
  static calcNebiki(sysfDat, lstKnebDat) {
    var nKin = 0;
    if (sysfDat.mKnebFlg == 1) {
      // COMPACK-G 漢の値引き有り
      for (let i = 0; i < lstKnebDat.length; i++) {
        const knebDat = lstKnebDat[i];
        if (
          knebDat.m_nCode > 0 &&
          knebDat.m_nUmu == 1 &&
          knebDat.m_nRes == 1 &&
          knebDat.m_nKin != 0
        ) {
          nKin += knebDat.m_nKin + knebDat.m_nTax;
        }
      }
    }
    return nKin;
  }

  /**
   * 差引残高の計算.
   *
   * @param userData  [in] {@link UserData}   アプリデータ
   * @param isIrai    [in] boolean            依頼中前残計上フラグ(true: 計上する, false: 計上しない)
   * @return  int 差引残高
   */
  static calcTotal(
    sysfDat,
    kokfDat,
    ko2fDat,
    sy2fDat,
    kouserDat,
    m_lstKnebDat,
    isIrai
  ) {
    var wkRyokin = GasRaterCom.calcSeikyu(sysfDat, kokfDat, sy2fDat, isIrai);
    console.log(wkRyokin);
    // その他売上加算
    wkRyokin += kokfDat.mUrikin + kokfDat.mUriTax;
    console.log(wkRyokin);
    // 当月ガス売上加算
    wkRyokin += kokfDat.mFee + kokfDat.mConTax;
    console.log(wkRyokin);
    // 還元額加算
    wkRyokin += kokfDat.mReduce + kokfDat.mReduceTax;
    console.log(wkRyokin);

    // 検針時リース計上
    if (kokfDat.mKenSumi) {
      // 検針済みの場合は検針時リース金額加算
      for (let i = 0; i < m_lstKnebDat.length; i++) {
        const hmefDat = m_lstKnebDat[i];
        if (hmefDat.mUsef && hmefDat.mHmeKind == 9 && hmefDat.mLeasKind == 1) {
          wkRyokin += hmefDat.mKin;
          wkRyokin += hmefDat.mTax;
        }
      }
    }
    console.log(wkRyokin);
    var nNebiki = 0;
    if (sysfDat.mKnebFlg == 1) {
      // 漢の値引き有り
      nNebiki = GasRaterCom.calcNebiki(sysfDat, userData.getKnebiDat());
    }
    var isHybrid;
    if (
      kouserDat.mHyc5 == 1 &&
      ko2fDat.mGashyb > 0 &&
      kokfDat.mHybseikyu != 2
    ) {
      isHybrid = true;
    } else {
      isHybrid = false;
    }
    if (isHybrid) {
      // ハイブリッド値引き有り
      nNebiki += ko2fDat.mChoKin;
      if (ko2fDat.mChoTaxku == 3) {
        nNebiki += ko2fDat.mChoTax;
      }
      wkRyokin += ko2fDat.mUseKin;
      if (ko2fDat.mUseTaxku == 3) {
        nNebiki += ko2fDat.mUseTax;
      }
    }
    wkRyokin += nNebiki;

    if (
      sysfDat.m_isToyukeninFlg &&
      kokfDat.mKotfDat != null &&
      kokfDat.mKotfDat.m_bKen_sumi == 1
    ) {
      wkRyokin += kokfDat.mKotfDat.m_nFee;
      wkRyokin += kokfDat.mKotfDat.m_nCon_tax;
    }
    // console.log("差引残高:" + wkRyokin);
    return wkRyokin;
  }

  /**
   * 売掛残高の計算
   *
   * @param sysfDat       [in]    SysfDat システムデータ
   * @param kokfDat       [in]    KokfDat 顧客データ
   * @param sy2fDat       [in]    Sy2fDat システム2データ
   * @param isIrai        [in] boolean    依頼中前残計上フラグ
   * @return  int 売掛残高
   */
  static calcSeikyu(sysfDat, kokfDat, sy2fDat, isIrai) {
    var wkUrizan; // 売掛残高
    wkUrizan = kokfDat.mProcTisyuu + kokfDat.mTaxTisyuu; // 遅収料金
    if (sysfDat.mIfDemand) {
      console.log("前月残高あり");
      wkUrizan += isIrai
        ? GasRaterCom.readPrebalance(sysfDat, kokfDat, sy2fDat)
        : kokfDat.mPreBalance; // 前月残高
      console.log("1    -> " + wkUrizan);
    }
    if (sysfDat.mIfAdjust) {
      console.log("入金調整あり");
      wkUrizan += kokfDat.mTAdjust - kokfDat.mTReceipt; // 入金調整額
      console.log("    -> " + wkUrizan);
    }
    if (sysfDat.mIfAlarm) {
      console.log("リース加算あり");
      wkUrizan += kokfDat.mProcLease + kokfDat.mTaxLease; // リース 加算
      console.log("    -> " + wkUrizan);
    }
    if (sysfDat.mIfDiv) {
      console.log("分割金あり");
      wkUrizan += kokfDat.mProcDiv + kokfDat.mTaxDiv; // 分割金 加算
      console.log("    -> " + wkUrizan);
    }
    if (sysfDat.mIfLampoil) {
      console.log("灯油あり");
      wkUrizan += kokfDat.mProcLoil + kokfDat.mTaxLoil; // 灯油　加算
      console.log("    -> " + wkUrizan);
    }
    if (sysfDat.mIfProceeds) {
      console.log("その他、ガス残高、遅収料金あり");
      wkUrizan +=
        kokfDat.mProcEtc +
        kokfDat.mTaxEtc + // その他 加算
        kokfDat.mProcGas +
        kokfDat.mTaxGas - // ガス残高
        (kokfDat.mProcTisyuu + kokfDat.mTaxTisyuu); // 遅収料金
      console.log("    -> " + wkUrizan);
    }
    console.log("請求金額:" + wkUrizan);
    return wkUrizan;
  }

  /**
   * 振替依頼中を考慮した前月残高計算
   *
   * @param sysfDat   [in] {@link SysfDat}    システムデータ
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @param sy2fDat   [in] {@link Sy2fDat}    システム2データ
   * @return  int 前月残高
   */
  static readPrebalance(sysfDat, kokfDat, sy2fDat) {
    var wkKingaku;
    // 振替依頼中の前月残高の抑制フラグ
    var wkFuriDemand = 0;

    if (sy2fDat.mSysOption[13] == 1) {
      // 振替依頼中は、前月残高を抑制フラグの有効中
      if (
        kokfDat.mBankCode != 0 &&
        kokfDat.mFriKin != 0 &&
        (kokfDat.mFristat == 2 || kokfDat.mFristat == 3) &&
        sysfDat.mIfDemand
      ) {
        // 振替依頼中は前月残高は印字しない
        wkFuriDemand = 1;
        if (kokfDat.mFriKin != kokfDat.mPreBalance) {
          // 振替依頼中の金額<>前月残高では、前月残高の抑制は不可
          wkFuriDemand = 0;
        }
      }
    }
    if (sysfDat.mIfDemand && kokfDat.mPreBalance != 0 && wkFuriDemand == 0) {
      wkKingaku = kokfDat.mPreBalance;
    } else {
      wkKingaku = 0;
    }
    console.log("前残:" + wkKingaku);
    return wkKingaku;
  }

  /**
   * 増減率の計算.
   *
   * @param ktpc          [in] {@link KtpcDat}    顧客料金透明化データ
   * @param nFee          [in] long               ガス料金
   * @param nBaseKin      [in] double             基本料金
   * @param nFacilityKin  [in] double             設備料金
   * @param gasf          [in] {@link GasfDat}    ガス料金データ
   * @param nHiwari       [in] int                日割り日数.
   */
  static calcZogenHiwari(ktpc, nFee, nBaseKin, nFacilityKin, gasf, nHiwari) {
    if (nHiwari != 0) {
      // 基本料金の日割り計算
      nBaseKin = (nBaseKin * nHiwari) / 30;
      nFacilityKin = (nFacilityKin * nHiwari) / 30;
    }
    nBaseKin = OtherUtil.hasCom(
      nBaseKin,
      gasf.mFrac1Add,
      gasf.mFrac1Mult,
      10000
    );
    nFacilityKin = OtherUtil.hasCom(
      nFacilityKin,
      gasf.mFrac1Add,
      gasf.mFrac1Mult,
      10000
    );
    nBaseKin *= 1000 + gasf.mRiseFall;
    nFacilityKin *= 1000 + gasf.mRiseFall;
    nBaseKin =
      OtherUtil.hasCom(nBaseKin, gasf.mFrac2Add, gasf.mFrac2Mult, 10000000) /
      1000;
    nFacilityKin =
      OtherUtil.hasCom(
        nFacilityKin,
        gasf.mFrac2Add,
        gasf.mFrac2Mult,
        10000000
      ) / 1000;

    if (
      ktpc.m_nBasekin == 0 &&
      ktpc.m_nFacilitykin == 0 &&
      ktpc.m_nAddkin == 0
    ) {
      ktpc.m_nBasekin = nBaseKin;
      ktpc.m_nFacilitykin = nFacilityKin;
      ktpc.m_nAddkin = nFee * 10000 - nBaseKin - nFacilityKin;
    }
  }

  /**
   * 売掛残高の計算
   *
   * @param sysfDat       [in]    SysfDat システムデータ
   * @param kokfDat       [in]    KokfDat 顧客データ
   * @param sy2fDat       [in]    Sy2fDat システム2データ
   * @param isIrai        [in] boolean    依頼中前残計上フラグ
   * @return  int 売掛残高
   */
  static calcSeikyu(sysfDat, kokfDat, sy2fDat, isIrai) {
    var wkUrizan; // 売掛残高
    wkUrizan = kokfDat.mProcTisyuu + kokfDat.mTaxTisyuu; // 遅収料金
    if (sysfDat.mIfDemand) {
      // console.log( "前月残高あり");
      wkUrizan += isIrai
        ? GasRaterCom.readPrebalance(sysfDat, kokfDat, sy2fDat)
        : kokfDat.mPreBalance; // 前月残高
      // console.log( "    -> " + wkUrizan);
    }
    if (sysfDat.mIfAdjust) {
      // console.log( "入金調整あり");
      wkUrizan += kokfDat.mTAdjust - kokfDat.mTReceipt; // 入金調整額
      // console.log( "    -> " + wkUrizan);
    }
    if (sysfDat.mIfAlarm) {
      // console.log( "リース加算あり");
      wkUrizan += kokfDat.mProcLease + kokfDat.mTaxLease; // リース 加算
      // console.log( "    -> " + wkUrizan);
    }
    if (sysfDat.mIfDiv) {
      // console.log( "分割金あり");
      wkUrizan += kokfDat.mProcDiv + kokfDat.mTaxDiv; // 分割金 加算
      // console.log( "    -> " + wkUrizan);
    }
    if (sysfDat.mIfLampoil) {
      // console.log( "灯油あり");
      wkUrizan += kokfDat.mProcLoil + kokfDat.mTaxLoil; // 灯油　加算
      // console.log( "    -> " + wkUrizan);
    }
    if (sysfDat.mIfProceeds) {
      // console.log( "その他、ガス残高、遅収料金あり");
      wkUrizan +=
        kokfDat.mProcEtc +
        kokfDat.mTaxEtc + // その他 加算
        kokfDat.mProcGas +
        kokfDat.mTaxGas - // ガス残高
        (kokfDat.mProcTisyuu + kokfDat.mTaxTisyuu); // 遅収料金
      // console.log( "    -> " + wkUrizan);
    }
    // console.log( "請求金額:" + wkUrizan);
    return wkUrizan;
  }

  /**
   * 振替依頼中を考慮した前月残高計算
   *
   * @param sysfDat   [in] {@link SysfDat}    システムデータ
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @param sy2fDat   [in] {@link Sy2fDat}    システム2データ
   * @return  int 前月残高
   */
  static readPrebalance(sysfDat, kokfDat, sy2fDat) {
    var wkKingaku;
    // 振替依頼中の前月残高の抑制フラグ
    var wkFuriDemand = 0;

    if (sy2fDat.mSysOption[13] == 1) {
      // 振替依頼中は、前月残高を抑制フラグの有効中
      if (
        kokfDat.mBankCode != 0 &&
        kokfDat.mFriKin != 0 &&
        (kokfDat.mFristat == 2 || kokfDat.mFristat == 3) &&
        sysfDat.mIfDemand
      ) {
        // 振替依頼中は前月残高は印字しない
        wkFuriDemand = 1;
        if (kokfDat.mFriKin != kokfDat.mPreBalance) {
          // 振替依頼中の金額<>前月残高では、前月残高の抑制は不可
          wkFuriDemand = 0;
        }
      }
    }
    if (sysfDat.mIfDemand && kokfDat.mPreBalance != 0 && wkFuriDemand == 0) {
      wkKingaku = kokfDat.mPreBalance;
    } else {
      wkKingaku = 0;
    }
  
    return wkKingaku;
  }

  /**
   * ガス料金:還元率の更新
   *
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
   * @param sysfDat   [in] {@link SysfDat}    システムデータ
   * @param sy2fDat   [in] {@link Sy2fDat}    システム2データ
   */
  static calcGasKangen(kokfDat, gasfDat, sysfDat, sy2fDat, kouserDat) {
    var wkKin;
    if (kokfDat.mSupplyForm == 2) {
      // 供給親の場合は計算しない
      return;
    }

    if (sy2fDat.mKangHbcd == 0 && sy2fDat.mKangHcd == 0) {
      return;
    }

    kokfDat.mReduce = 0;
    kokfDat.mReduceTax = 0;
    if (
      !sysfDat.mIfReduce ||
      gasfDat.mRedDiv == 0 ||
      (gasfDat.mRedAdd == 0 && gasfDat.mRedMult == 0)
    ) {
      return;
    }

    if (gasfDat.mRedDiv == 1) {
      wkKin = kokfDat.mFee * gasfDat.mRedReduce;
      kokfDat.mReduce =
        OtherUtil.hasCom(wkKin, gasfDat.mRedAdd, gasfDat.mRedMult, 1000) / 1000;
    } else if (gasfDat.mRedDiv == 2) {
      wkKin =
        GasRaterCom.getGasSuryo(kokfDat.mGasUse, sy2fDat, kouserDat) *
        gasfDat.mRedMred;
      kokfDat.mReduce =
        OtherUtil.hasCom(wkKin, gasfDat.mRedAdd, gasfDat.mRedMult, 10000) /
        10000;
    }

    if (sy2fDat.mKangHcd < 100) {
      // 還元額:取引区分
      return;
    }
    var shofDat;
    try {
      shofDat = InputDat.getShofDat(sy2fDat.mKangHcd, sy2fDat.mKangHbcd);
    } catch (ex) {
      console.log(
        "取引区分ファイルの読込みに失敗: " + ex.getLocalizedMessage()
      );
    }
    if (shofDat.mTaxKu == 3) {
      if (shofDat.mTaxR == 0) {
        shofDat.mTaxR = getKenTaxr(
          kokfDat,
          sysfDat,
          sysfDat.mTax_yy,
          sysfDat.mTax_mm,
          sysfDat.mTax_dd,
          sysfDat.mConsumTax,
          sysfDat.mTaxr_old,
          sysfDat.mTaxr_new
        );
      }
      wkKin = kokfDat.mReduce * shofDat.mTaxR;

      if (sysfDat.mShoTaxcom == 0) {
        kokfDat.mReduceTax =
          OtherUtil.hasCom(
            wkKin,
            sysfDat.mFracAddTax,
            sysfDat.mFracMulTax,
            1000
          ) / 1000;
      } else {
        kokfDat.mReduceTax =
          OtherUtil.hasCom(
            wkKin,
            shofDat.mFracAddTax,
            shofDat.mFracAddMult,
            1000
          ) / 1000;
      }
    }
  }

  /**
   * 当月その他売上
   *
   * @param sysfDat   [in] {@link SysfDat}    システムデータ
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @return  int その他売上額
   */
  static calcEtcUri(sysfDat, kokfDat) {
    var gTM_etcUri = 0; // 当月その他売上
    gTM_etcUri += kokfDat.mProcTisyuu; // 遅収料金
    if (sysfDat.mIfAlarm) {
      gTM_etcUri += kokfDat.mProcLease; // リース 加算
    }
    if (sysfDat.mIfDiv) {
      gTM_etcUri += kokfDat.mProcDiv; // 分割金 加算
    }
    if (sysfDat.mIfLampoil) {
      gTM_etcUri += kokfDat.mProcLoil; // 灯油 加算
    }
    if (sysfDat.mIfProceeds) {
      gTM_etcUri +=
        kokfDat.mProcEtc - // その他 加算
        kokfDat.mProcTisyuu; // 遅収料金
    }
    console.log("その他売上:" + gTM_etcUri);
    return gTM_etcUri;
  }

  /**
   * 当月その他消費税額
   *
   * @param sysfDat   [in] {@link SysfDat}    システムデータ
   * @param kokfDat   [in] {@link KokfDat}    顧客データ
   * @return  int その他売上消費税
   */
  static calcEtcTax(sysfDat, kokfDat) {
    var gproc_tax; // 消費税 計算
    var gTM_etcTax; // 当月その他消費税額

    // 遅収料金
    gproc_tax = kokfDat.mTaxTisyuu;
    if (sysfDat.mIfAlarm) {
      // リース 加算
      gproc_tax += kokfDat.mTaxLease;
    }
    if (sysfDat.mIfDiv) {
      // 分割金 加算
      gproc_tax += kokfDat.mTaxDiv;
    }
    if (sysfDat.mIfLampoil) {
      // 灯油 加算
      gproc_tax += kokfDat.mTaxLoil;
    }

    if (sysfDat.mIfProceeds) {
      // その他 加算-遅収料金
      gTM_etcTax = gproc_tax + kokfDat.mTaxEtc - kokfDat.mTaxTisyuu;
    } else {
      gTM_etcTax = gproc_tax;
    }
    console.log("その他売上消費税:" + gTM_etcTax);
    return gTM_etcTax;
  }
}

//kensin layout
const kensin_layout = document.getElementById("kensin_layout");
const hoan_layout = document.getElementById("hoan_layout");
const niukin_layout = document.getElementById("niukin_layout");
const mBtnCheck = document.getElementById("btnKensinMainCheck");
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
const mUserData = JSON.parse(sessionStorage.getItem("UserData"));

const closeBtn = document.querySelector("#close-icon");
const overlay = document.querySelector(".overlay");
const detail = document.querySelector("#detail-btn");
const wrapMainForm = document.querySelector(".overlay .container-mainform .wrap-mainform");
const mEditAdjust = document.getElementById("chouseigaku");
const mEditInputReceipt = document.getElementById("azukari-kin"); // 預かり金
const mEditReceipt = document.getElementById("nyuukin"); // 入金
const mTxtZandakaLabel = document.getElementById("txtKensinNyukinZandaka0");
const mTxtZandaka = document.getElementById("zandaka");
const btnHyCUchiwake = document.getElementById("btnKensinNyukinHycUchiwake");
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
const btnKensinNyukinUchiwake = document.getElementById("btnKensinNyukinUchiwake");
const div_otsuri = document.getElementById("div_otsuri");
const txtKensinNyukinOtsuri = document.getElementById("txtKensinNyukinOtsuri");

//const mEditAdjust = document.querySelector("#chouseigaku");
//const mEditInputReceipt = document.querySelector("#azukari-kin");
//const mEditReceipt = document.querySelector("#nyuukin");
//const mTxtZandaka = document.querySelector("#zandaka");

const teiseiBtn = document.querySelector("#teisei");
const cancelBtn = document.querySelector("#cancel");
const teiseiGroup = document.querySelector("#teisei-group");
const nyuukinGroup = document.querySelector("#nyuukin-group");
const teiseiNyuukin = document.querySelector("#teisei-nyuukin");
const Sashihiki_zandaka = document.querySelector("#Sashihiki_zandaka");
const teiseiSumi = document.querySelector("#teisei-sumi");
// const txtKensinNyukinOtsuri = document.querySelector("#txtKensinNyukinOtsuri");

var mTeiseiFlg = false;

var kokfDat = new KokfDat();
var sy2fDat = new Sy2fDat();
var kouserDat = new KouserDat();
var sysfDat = new SysfDat();
var ko2fDat = null;

var gstpDat1 = new GstpDat(99999, 3400000, 15000000);
// var gstpDat2 = new GstpDat(100,4400000,46750000);
// var gstpDat3 = new GstpDat(300,3850000,68750000);
// var gstpDat4 = new GstpDat(999999,3300000,145750000);
// var gstpDat5 = new GstpDat(500,3200000,134000000);
// var gstpDat6 = new GstpDat(999999,3000000,198000000);
var gasfDatlist = [gstpDat1];

var gasfDat = new GasfDat(gasfDatlist);
var kensin_date = new Date("2019/5/1");
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
var bdChosei = new BusfDat();
var bdNyukin = new BusfDat();
/** 顧客値引きデータ */
var m_lstKnebDat = new Array();

// kensin_layout.addEventListener("click",openKensinLayout);
// hoan_layout.addEventListener("click",openHoanLayout);
// niukin_layout.addEventListener("click",openNiukinLayout);

openKensinLayout();
setdataNiukinLayout();
// setGasInfo();
setdataUchiWake();

function openKensinLayout() {
  setCusInfo();
  //setGasInfo();
  mTxtNowMeter.addEventListener("change", checkNowGas);
}

function openHoanLayout() {}

function setdataNiukinLayout() {
  initComponents();
  init();
  btnKensinNyukinUchiwake.addEventListener("click", setdataUchiWake);
}

/**
 * 顧客情報等を設定する。
 *
 */
function setCusInfo() {
  // 顧客名
  mTxtNameUser.innerHTML = OtherUtil.getClearString(kokfDat.mName);
  // 検針日付

  mTxtDate.innerHTML = OtherUtil.DateFormat(
    kensin_date.getFullYear(),
    kensin_date.getMonth(),
    kensin_date.getDate(),
    false
  );
  // if (kokfDat.mKMonth == 0 && kokfDat.mKDate == 0) {
  //     var dates = new Date();
  //     var year = dates.getFullYear();
  //     var month = dates.getMonth() + 1;
  //     var date =  dates.getDate();
  //     mTxtDate.innerHTML = (OtherUtil.DateFormat(year,month,date, false));
  // }
  // else {
  //     mTxtDate.innerHTML = OtherUtil.DateFormat(sysfDat.mSysYear,kokfDat.mKMonth, kokfDat.mKDate, false);
  // }
  m_nGasuse = kokfDat.mGasUse;

  if (kokfDat.mKenSumi) {
    // 検針済みの場合
    mTxtCmt.innerHTML = "検針済みです。";
    mTxtNowMeter.value = OtherUtil.Format(kokfDat.mNowMeter, 1);
    mTxtPreMeter.innerHTML = OtherUtil.Format(kokfDat.mPreMeter, 1);
    if (kokfDat.mGasDiv != 0 && gasfDat.mTaxDiv == 3) {
      // mTxtGasTax.innerHTML = (OtherUtil.KingakuFormat(kokfDat.mConTax));
      mTxtGasTax.innerHTML = kokfDat.mConTax;
    } else {
      mTxtGasTax.innerHTML = "***";
    }
    mTxtNowUse.innerHTML = OtherUtil.Format(
      GasRaterCom.getGasSuryo(kokfDat.mGasUse, sy2fDat, kouserDat),
      1
    );
    var strPreUseTitle;
    var strPreUseValue;
    if (kokfDat.mBetwMeter > 0) {
      strPreUseTitle = "前回/中間";
      strPreUseValue =
        OtherUtil.Format(
          GasRaterCom.getGasSuryo(kokfDat.mPreUse, sy2fDat, kouserDat),
          1
        ) +
        " / " +
        OtherUtil.Format(
          GasRaterCom.getGasSuryo(kokfDat.mBetwMeter, sy2fDat, kouserDat),
          1
        );
    } else {
      strPreUseTitle = "前回使用量";
      strPreUseValue = OtherUtil.Format(
        GasRaterCom.getGasSuryo(kokfDat.mPreUse, sy2fDat, kouserDat),
        1
      );
    }
    document.getElementById("txtKensinMainPrevSiyou0").innerHTML =
      strPreUseTitle;

    mTxtPreUse.innerHTML = strPreUseValue;

    // ガス料金
    // 顧客データからガス料金を取得する 12.04.24
    mTxtGasPay.innerHTML = OtherUtil.KingakuFormat(kokfDat.mFee);
    //mTxtGasPay.innerHTML = (kokfDat.mFee);

    // 確認ボタンを押せるようにする 12.04.24
    // mBtnCheck.setEnabled(true);
    mDays = kokfDat.mHiwari;
    if (kokfDat.mHiwari != 0) {
      // 日割り日数がある場合は予測使用量を計算
      mTitleGasPay.innerHTML = "日割料金";
    } else {
      mTitleGasPay.innerHTML = "ガス料金";
    }
  } else {
    // 今回指針
    if (kokfDat.mKenSumi) {
      mTxtNowMeter.innerHTML = OtherUtil.Format(kokfDat.mNowMeter, 1);
    } else {
      // 入力前は前回値
      mTxtNowMeter.innerHTML = "";
    }
    // 前回指針
    mTxtPreMeter.innerHTML = OtherUtil.Format(kokfDat.mPreMeter, 1);
    // 使用量(これも再入力で初期値が変わるかも)
    if (kokfDat.mKenSumi) {
      mTxtNowUse.innerHTML = OtherUtil.Format(
        GasRaterCom.getGasSuryo(kokfDat.mGasUse, sy2fDat, kouserDat),
        1
      );
    } else {
      mTxtNowUse.innerHTML = "";
    }
    // 前回使用量
    var tvPreUsetTitle = document.getElementById("txtKensinMainPrevSiyou0");
    if (kokfDat.mBetwMeter > 0) {
      // 中間使用量有
      tvPreUsetTitle.innerHTML = "前回/中間";
      var strPreUseValue =
        OtherUtil.Format(
          GasRaterCom.getGasSuryo(kokfDat.mPreUse, sy2fDat, kouserDat),
          1
        ) +
        "/" +
        OtherUtil.Format(
          GasRaterCom.getGasSuryo(kokfDat.mBetwMeter, sy2fDat, kouserDat),
          1
        );
      mTxtPreUse.innerHTML = strPreUseValue;
    } else {
      mTxtPreUse.innerHTML = OtherUtil.Format(
        GasRaterCom.getGasSuryo(kokfDat.mPreUse, sy2fDat, kouserDat),
        1
      ); //13.02.08
    }

    // ガス料金
    // 顧客データからガス料金を取得する 12.05.07 不具合対応票No.50対応
    if (kokfDat.mKenSumi) {
      mTxtGasPay.innerHTML = OtherUtil.KingakuFormat(kokfDat.mFee);
    } else {
      mTxtGasPay.innerHTML = "";
    }

    // 消費税
    // 内税の場合は***
    mTxtGasTax.innerHTML = kokfDat.mTaxDiv == 3 ? "" : "***";
    mTxtCmt.innerHTML = "今回指針を入力してください。";
  }
}

//check gas now is a number?
function checkNowGas() {
  var strSisin = mTxtNowMeter.value;
  if (isNaN(strSisin)) {
    mTxtNowMeter.classList.add("edtError");
    mTxtCmt.innerHTML = "Vui long nhap dung ki tu so。";
  } else {
    mTxtNowMeter.classList.remove("edtError");
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
    mTxtGasTax.innerHTML = kokfDat.mTaxDiv == 3 ? "" : "***";
    return;
  }
  var nSisin = OtherUtil.getNumFromString(strSisin) * 10;
  m_nGasuse = GasRaterCom.calcGasUse(kokfDat, nSisin);
  mTxtNowUse.innerHTML = OtherUtil.format(
    "##,##0.0",
    GasRaterCom.getGasSuryo(m_nGasuse, sy2fDat, kouserDat),
    1
  );

  // 使用率チェック
  if (
    GasRaterCom.checkSrpday(
      sysfDat,
      kokfDat,
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
    //mTxtCmt.setTextColor(Color.RED);
  } else {
    mTxtCmt.innerHTML = "今回指針を入力してください。";
    mTxtCmt.classList.add("text_black");
    mTxtCmt.classList.remove("text_blue");
    mTxtCmt.classList.remove("text_red");
    // mTxtCmt.setTextColor(Color.BLACK);
  }

  // メーター一回り確認
  if (kokfDat.mPreMeter > nSisin) {
    mTxtCmt.innerHTML = "メーター周り";
    mTxtCmt.classList.add("text_blue");
    mTxtCmt.classList.remove("text_red");
    mTxtCmt.classList.remove("text_black");
    // mTxtCmt.setTextColor(Color.BLUE);
  }

  if (gasfDat.mSum == 4) {
    mTxtCmt.innerHTML = "ガス料金を入力してください。";
    //  mTxtGasPay.setOnClickListener(this);
    return;
  } else if (kouserDat.m_nKoubetsu == 1) {
    mTxtCmt.innerHTML = "ガス料金を入力してください。";
    // mTxtGasPay.setOnClickListener(this);
  }

  if (GasRaterCom.checkKgas(kokfDat, kouserDat.m_nKoubetsu)) {
    // 13.03.18
    // if (true) { // 13.03.18
    // 簡ガス日割りチェック

    var nDays = GasRaterCom.getKgasday(
      sysfDat,
      kokfDat,
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
      (kokfDat.mPuseMonth == 0 && nDays <= sysfDat.mKgasDays2)
    ) {
      // 前回検針がないときのみkgasDays2のチェックが入る
      // var wkStrDays = new StringBuilder();
      // wkStrDays.append("今回検針: ").append(OtherUtil.DataFormat(mUserData.getKensinDate(),  0)).append("\n");
      // if (kokfDat.mKaiYear + kokfDat.mKaiMonth + kokfDat.mKaiDate > 0) {
      //     wkStrDays.append("検針開始日: ").append(OtherUtil.DateFormat(kokfDat.mKaiYear, kokfDat.mKaiMonth, kokfDat.mKaiDate, true)).append("\n");
      // }
      // if (kokfDat.mPuseYear + kokfDat.mPuseMonth + kokfDat.mPuseDate > 0) {
      //     wkStrDays.append("前回検針日: ").append(OtherUtil.DateFormat(kokfDat.mPuseYear, kokfDat.mPuseMonth, kokfDat.mPuseDate, true)).append("\n");
      // }
      // wkStrDays.append("日割り日数: ").append(nDays).append("\n\n");
      // wkStrDays.append("日割計算をしますか？\n");
      // if (kokfDat.mPuseMonth == 0 && nDays <= sysfDat.mKgasDays2) {
      //     wkStrDays.append("閉開栓時には").append(sysfDat.mKgasDays2).append("日以下が対象です。");
      // }
      // else {
      //     wkStrDays.append("日割対象の検針期間\n( ").append(sysfDat.mKgasDays0 - 1).append("日数以下、").append(sysfDat.mKgasDays1 + 1).append("日数以上) ");
      // }

      // final Dialog wkDlg = OtherUtil.createAlertDialog(this, "日割計算", wkStrDays.toString(), true);
      // wkDlg.findViewById(R.id.yes).setOnClickListener(new View.OnClickListener() {
      //     @Override
      //     public void onClick(View v) {
      //         MLog.INFO(KensinMainActivity.this, TAG, "[確認ダイアログ:終了][YES]");
      //         // 日割計算する
      //         setGasPay(m_nGasuse, nDays, kokfDat, gasfDat, sysfDat, sy2fDat, kouserDat);
      //         wkDlg.dismiss();
      //     }
      // });
      // wkDlg.findViewById(R.id.no).setOnClickListener(new View.OnClickListener() {
      //     @Override
      //     public void onClick(View v) {
      //         MLog.INFO(KensinMainActivity.this, TAG, "[確認ダイアログ:終了][NO]");
      //         // 日割計算しない
      //         setGasPay(m_nGasuse, 0, kokfDat, gasfDat, sysfDat, sy2fDat, kouserDat);
      //         wkDlg.dismiss();
      //     }
      // });
      // wkDlg.show();
      console.log("if day out lenght");
    } else {
      console.log("if day  not out lenght");
      setGasPay(m_nGasuse, 0, kokfDat, gasfDat, sysfDat, sy2fDat, kouserDat);
    }
  } else {
    console.log("if check gas false");
    setGasPay(m_nGasuse, 0, kokfDat, gasfDat, sysfDat, sy2fDat, kouserDat);
  }
}

/**
 * ガス料金を出力する
 * @param nSiyou    [in] int                使用量
 * @param nDays     [in] int                日割り日数
 * @param kokfDat   [in] {@link KokfDat}    顧客データ
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
  console.log("Days: " + nDays);

  // 数量は中圧係数考慮
  nSiyou = GasRaterCom.getGasSuryo(nSiyou, sy2fDat, kouserDat);
  console.log("Siyou: " + nSiyou);

  lGasFee = GasRaterCom.dailyGasrate(nSiyou, nDays, kokfDat, gasfDat);
  console.log("GasFee: " + lGasFee);

  nGasTax = GasRaterCom.calcConTax(lGasFee, kokfDat, gasfDat, sysfDat);
  console.log("GasTax: " + nGasTax);

  // ガス料金設定
  if (nDays > 0) {
    mTitleGasPay.innerHTML = "日割料金";
  } else {
    mTitleGasPay.innerHTML = "ガス料金";
  }
  mTxtGasPay.innerHTML = OtherUtil.KingakuFormat(lGasFee);
  // mTxtGasPay.innerHTML = ((lGasFee));
  // 消費税設定
  if (gasfDat.mTaxDiv == 3) {
    // 外税の場合のみ税額表示
    mTxtGasTax.innerHTML = OtherUtil.KingakuFormat(nGasTax);
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
  console.log(
    GasRaterCom.calcGasBaseKin(sysfDat, gasfDat, kokfDat, sy2fDat, kouserDat)
  );
  //    findViewById(R.id.btnKensinMainUchiwake).setEnabled(true);
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
  if (sysfDat.mKnebFlg == 0 && (!isHybrid || kokfDat.mHybseikyu == 2)) {
    // 値引きシステム無し
    // 値引き項目のビューを取り除く
    nVisible = 0;
  }

  if (nVisible == 1) {
    tableNebiki.classList.remove(         "hidden"          );
  } else {
    tableNebiki.classList.add(            "hidden"          );
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
    kokfDat,
    ko2fDat,
    sy2fDat,
    kouserDat,
    m_lstKnebDat,
    false
  );
  txtKensinNyukinNowSeikyu.innerHTML = OtherUtil.KingakuFormat(nRyokin);
  console.log("nRyokin: " + nRyokin);

  mTotal = nRyokin;

  // @当月請求
  nRyokin = GasRaterCom.calcSeikyu(sysfDat, kokfDat, sy2fDat, false);
  txtKensinNyukinPreZandaka.innerHTML = OtherUtil.KingakuFormat(nRyokin);
  console.log("nRyokin: " + nRyokin);

  // 当月ガス売上
  nRyokin = kokfDat.mFee;
  var nKangen = 0;
  if (sysfDat.mIfReduce) {
    nKangen = kokfDat.mReduce;
  }

  // console.log( "  ガス料金: " + kokfDat.mFee + ", 還元額: " + kokfDat.mReduce);
  txtKensinNyukinGasRyokin.innerHTML = OtherUtil.KingakuFormat(nRyokin);
  //txtKensinNyukinGasRyokin.innerHTML = nRyokin;

  // 消費税
  // その他消費税
  console.log(kokfDat.mConTax);

  if (gasfDat != null) {
    if (gasfDat.mTaxDiv == 3) {
      // 13.01.16
      nRyokin = kokfDat.mConTax;
      if (sysfDat.mIfReduce) {
        // 還元額消費税
        nKangen += kokfDat.mReduceTax;
      }
      tvTax.innerHTML = OtherUtil.KingakuFormat(nRyokin);
      //tvTax.innerHTML = (nRyokin);
      console.log("nRyokin: " + nRyokin);
    } else {
      tvTax.innerHTML = "***";
    }
  } else {
    tvTax.innerHTML = "***";
  }

  // 還元額名称設定
  // txtKensinNyukinKangen.innerHTML = (OtherUtil.getKangcontname(sy2fDat));
  txtKensinNyukinKangen.innerHTML = sy2fDat;
  // 還元額
  txtKensinNyukinKangenKin.innerHTML = OtherUtil.KingakuFormat(nKangen);
  //txtKensinNyukinKangenKin.innerHTML = (nKangen);

  // 値引き
  // 値引き
  var nNebiki = 0;
  if (sysfDat.mKnebFlg == 1) {
    // 漢の値引き有り
    nNebiki = GasRaterCom.calcNebiki(sysfDat, lstKnebDat);
  }
  txtKensinNyukinNebiki.innerHTML = OtherUtil.KingakuFormat(nNebiki);
  //txtKensinNyukinNebiki.innerHTML = (nNebiki);

  // その他売上
  var nEtcUri = kokfDat.mUrikin;
  var nEtcUriTax = kokfDat.mUriTax;
  if (kokfDat.mKenSumi) {
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
  if (kouserDat.mHyc5 == 1 && ko2fDat.mGashyb > 0 && kokfDat.mHybseikyu != 2) {
    nEtcUri += ko2fDat.mUseKin;
    if (ko2fDat.mUseTaxku == 3) {
      nEtcUriTax += ko2fDat.mUseTax;
    }
  }

  txtKensinNyukinOtherUri.innerHTML = OtherUtil.KingakuFormat(nEtcUri);
  txtKensinNyukinOtherShohi.innerHTML = OtherUtil.KingakuFormat(nEtcUriTax);
  //txtKensinNyukinOtherUri.innerHTML = ((nEtcUri));
  //txtKensinNyukinOtherShohi.innerHTML = ((nEtcUriTax));

  if (kokfDat.mSyuSumi) {
    // 13.02.13
    // 検針済み or 再入力の場合は入力して編集不可
    mEditAdjust.value = OtherUtil.KingakuFormat(kokfDat.mAdjust);
    mEditInputReceipt.innerHTML = OtherUtil.KingakuFormat(kokfDat.mInpReceipt);
    mEditReceipt.innerHTML = OtherUtil.KingakuFormat(kokfDat.mReceipt);
   // mTeiseiFlg = getLongValue(mEditInputReceipt) != getLongValue(mEditReceipt);
    // mEditAdjust.innerHTML = ((kokfDat.mAdjust));
    // mEditInputReceipt.innerHTML = ((kokfDat.mInpReceipt));
    // mEditReceipt.innerHTML = ((kokfDat.mReceipt));
    // mTeiseiFlg = getLongValue(mEditInputReceipt) != getLongValue(mEditReceipt);
  } else {
    mEditAdjust.innerHTML = OtherUtil.KingakuFormat(0); // 調整額
    mEditInputReceipt.innerHTML = OtherUtil.KingakuFormat(0); // 預かり金
    mEditReceipt.innerHTML = OtherUtil.KingakuFormat(0); // 入金額
    // mEditAdjust.value = "0";// 調整額
    // mEditInputReceipt.value = "0";// 預かり金
    // mEditReceipt.value = "0";// 入金額
  }
  // 残高、おつり確認
  setZandaka();

  if (sy2fDat.mNyucho == 1) {
    if (kouserDat.m_sChocode != 0) {
      if (bdChosei != null) {
        txtKensinNyukinChosei.innerHTML = OtherUtil.cutSpace(
          bdChosei.mName
        ).trim();
      }
    }
    if (kouserDat.m_sNyucode != 0) {
      if (bdNyukin != null) {
        txtKensinNyukinNyukin.innerHTML = OtherUtil.cutSpace(
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

  var lAdjust  = getLongValue(mEditAdjust.value); // 調整額
  var lAzukari = getLongValue(mEditInputReceipt.value); // 預かり金
  var lReceipt = getLongValue(mEditReceipt.textContent); // 入金額


  //   console.log("  入金額: " + lReceipt + ", 調整額: " + lAdjust + ", 預かり金: " + lAzukari);
  console.log(mTeiseiFlg);
  if (!mTeiseiFlg) {
    lReceipt = lAzukari;
    if (lReceipt != 0) {
      if (mTotal + lAdjust < lReceipt && mTotal + lAdjust > 0) {
        lReceipt = mTotal + lAdjust;
      }
    }
    mEditReceipt.innerHTML = OtherUtil.KingakuFormat(lReceipt);
    // mEditReceipt.innerHTML = (lReceipt);
  }

  var mZandaka = mTotal + lAdjust - lReceipt; // 13.02.12
  console.log(mZandaka);

  console.log(mTotal);
  console.log(lAdjust);
  console.log(lAzukari);
  console.log(lReceipt);
  if (lAzukari == lReceipt) {
    mTxtZandakaLabel.innerHTML = "差引残高";
    mTxtZandaka.innerHTML = OtherUtil.KingakuFormat(mZandaka);
    div_otsuri.classList.add("hidden");
    //mTxtZandaka.innerHTML = mZandaka;
  } else {
    div_otsuri.classList.remove("hidden");
    txtKensinNyukinOtsuri.innerHTML = OtherUtil.KingakuFormat(lAzukari - lReceipt);
    // mTxtZandakaLabel.innerHTML = "おつり";
    // mTxtZandaka.innerHTML = (OtherUtil.KingakuFormat(lAzukari - lReceipt));
    mTxtZandaka.innerHTML =  OtherUtil.KingakuFormat(mZandaka);
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
  var strValue = OtherUtil.getClearString(tvSrc);
  return strValue == "" ? 0 : parseInt(OtherUtil.getNumFromString(strValue));
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
        // final Dialog wkDlg = OtherUtil.createAlertDialog(this, "確認", "検針時リースが未計上です。リースを計上しますか？", true);
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
    kokfDat.mHiwari = mDays;
    kokfDat.mKenSumi = true;
    kokfDat.mKMonth = kensin_date.getMonth() + 1;
    kokfDat.mKDate = kensin_date.getDate();

    kokfDat.mNowMeter =
      OtherUtil.getNumFromString(mTxtNowMeter.textContent) * 10;
    kokfDat.mGasUse = m_nGasuse;
    kokfDat.mFee = parseInt(OtherUtil.getNumFromString(mTxtGasPay.textContent));

    if (gasfDat.mTaxDiv == 3) {
      kokfDat.mConTax = parseInt(
        OtherUtil.getNumFromString(mTxtGasTax.textContent)
      );
    } else {
      kokfDat.mConTax = 0;
    }
    if (sysfDat.mKnebFlg == 1) {
      // 値引き
      // GasRaterCom.calcGasWaribiki(this, sysfDat, mUserData.getKokfDat(), mUserData.getKnebiDat(), mUserData.getKo2fDat(), sy2fDat, kouserDat, mUserData.getGasfDat());
    }
    // 還元
    // GasRaterCom.calcGasKangen(kokfDat, mUserData.getGasfDat(), sysfDat, sy2fDat, kouserDat);

    // 配送使用量の計算
    if (kokfDat.mSupplyForm != 2) {
      // 親以外
      kokfDat.mKhaiSs = kokfDat.mNowMeter;
      kokfDat.mKhaiSr = kokfDat.mHaiMsr;
      if (kokfDat.mHaiSs <= kokfDat.mKhaiSs) {
        kokfDat.mKhaiSr = kokfDat.mKhaiSr + kokfDat.mKhaiSs - kokfDat.mHaiSs;
      } else {
        kokfDat.mKhaiSr =
          kokfDat.mKhaiSr +
          Math.pow(10, kokfDat.mMtKeta + 1) +
          kokfDat.mKhaiSs -
          kokfDat.mHaiSs;
      }
    }

    if (
      sysfDat.mCheckHoan &&
      (kokfDat.mGasKubun != 2 || sysfDat.mTenkenKgas == 1)
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
  console.log("hello world");

  document.getElementById("txtKensinNaiyakuCusName").innerHTML =
    OtherUtil.getClearString(kokfDat.mName);
  var nKin = 0;
  // 前残印字
  if (sysfDat.mIfDemand) {
    // 前残印字有りの場合のみ
    nKin = kokfDat.mPreBalance;
  }
  document.getElementById("txtKensinNaiyakuZandaka").innerHTML =
    OtherUtil.KingakuFormat(nKin);

  // 当月ガス料金
  document.getElementById("txtKensinNaiyakuGasRyokin").innerHTML =
    OtherUtil.KingakuFormat(kokfDat.mProcGas);

  // 当月ガス料金消費税
  document.getElementById("txtKensinNaiyakuShohizei").innerHTML =
    OtherUtil.KingakuFormat(kokfDat.mTaxGas);

  // その他売上
  document.getElementById("txtKensinNaiyakuOtherUri").innerHTML =
    OtherUtil.KingakuFormat(GasRaterCom.calcEtcUri(sysfDat, kokfDat));

  // その他売上消費税
  document.getElementById("txtKensinNaiyakuOtherShohi").innerHTML =
    OtherUtil.KingakuFormat(GasRaterCom.calcEtcTax(sysfDat, kokfDat));

  // 当月調整
  document.getElementById("txtKensinNaiyakuChosei").innerHTML =
    OtherUtil.KingakuFormat(kokfDat.mTAdjust);
  // 当月入金
  document.getElementById("txtKensinNaiyakuNyukin").innerHTML =
    OtherUtil.KingakuFormat(kokfDat.mTReceipt);

  // 当月請求金額
  document.getElementById("txtKensinNaiyakuSeikyu").innerHTML =
    OtherUtil.KingakuFormat(
      GasRaterCom.calcSeikyu(sysfDat, kokfDat, sy2fDat, false)
    );

  if (sysfDat.mKnebFlg == 1) {
    // 漢の値引きシステム有り
    document.getElementById("txtKensinNaiyakuNebiki").innerHTML =
      OtherUtil.KingakuFormat(GasRaterCom.calcNebiki(knebDat));
  } else {
    // 値引き項目のビューを取り除く
    document.getElementById("nebiki").classList.add("hidden");
  }
}

//const div1_otsuri = document.querySelector("div_otsuri");

let seikyu = OtherUtil.getNumFromString(txtKensinNyukinNowSeikyu.textContent);
let zandaka = 0;
let nyuukin = 0;

//setZandaka(0, 0); // default zandaka

//-------------------Enter Input Sting event--------------------------------->

mEditAdjust.onchange = function () {
    console.log("adjust in change");
  if (isValidNumber(mEditAdjust.value)) {
 //   setZandaka1(chousei, azukari);
   // calCutaleTotal();
    setZandaka();
  }else{
    console.log("value err");
  }
};

mEditInputReceipt.onchange = function () {
  if (isValidNumber(mEditInputReceipt.value)) {
    // const zakanda = Number(mEditAdjust.value);
    nyuukin = Number(mEditInputReceipt.value);
    mEditReceipt.textContent = nyuukin;
    Sashihiki_zandaka.textContent = nyuukin;
 //   setZandaka1(zakanda, nyuukin);
  //  calCutaleTotal();
    setZandaka();

  }
};


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
  if (isValidNumber(teiseiNyuukin.value)) {
    const chousei = Number(mEditAdjust.value);
    nyuukin = Number(teiseiNyuukin.value);
    console.log(nyuukin);
    mEditReceipt.textContent = nyuukin;
    txtKensinNyukinOtsuri.textContent = Number(OtherUtil.getNumFromString(mEditInputReceipt.value)) - nyuukin  ;
    console.log(txtKensinNyukinOtsuri.textContent);
    //  setZandaka(chousei, nyuukin);
    // nyuukinGaku.textContent = nyuukin;
    teiseiGroup.classList.add("hidden");
    nyuukinGroup.classList.remove("hidden");
    // setOtsuri();
    // calCutaleTotal();
    mTeiseiFlg = true;
    setZandaka();
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
  var first = Number(OtherUtil.getNumFromString(txtKensinNyukinNowSeikyu.textContent));
  var second = Number(mEditAdjust.value);
  var third = Number(OtherUtil.getNumFromString(mEditReceipt.textContent));
  
    if(third >= (first + second)){
        console.log("if");       
        div_otsuri.classList.remove("hidden");
        txtKensinNyukinOtsuri.textContent = third - (first + second);      
    }else{
        console.log("else");
 
        div_otsuri.classList.add("hidden");
        total = Number(first) + Number(second) - Number(third);
        mTxtZandaka.textContent = total;
    }

}

function setOtsuri() {
  var nyuukin = teiseiNyuukin.value;
  var zakanda = Sashihiki_zandaka.textContent;
  if (isValidNumber(nyuukin)) {
    if (nyuukin < zakanda) {     
        div_otsuri.classList.remove("hidden");
        txtKensinNyukinOtsuri.textContent = zakanda - nyuukin;
        mEditReceipt.textContent = nyuukin;    
    }
  }
}

function checkValue(){
    var moneyGasUse = Number(OtherUtil.getNumFromString(txtKensinNyukinNowSeikyu.textContent));
    var moneyBonus = Number(mEditAdjust.value);
    var moneyUserGet = Number(OtherUtil.getNumFromString(mEditReceipt.textContent));
    var tienNhap = Number(OtherUtil.getNumFromString(mEditInputReceipt.textContent));
    if(moneyGasUse + moneyBonus > tienNhap){
        moneyUserGet = tienNhap;
        mEditReceipt.textContent = moneyUserGet;
    }else{
        moneyUserGet = moneyBonus + moneyGasUse;
        mEditReceipt.textContent = moneyUserGet;
    }
}
