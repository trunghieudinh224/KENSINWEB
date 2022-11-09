/*
    ******  VALUES  ******
*/
// short timeout
export var VL_SHORT_TIMEOUT = 30000;
// long timeout
export var kensinData = {

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


export  var printStatus = {
            m_isPrintHoan : false,
            m_isPrintNyukin : false,
            m_lReceipt : 0,
            m_lZandaka : 0,
            m_isPrintKensin : false,
            m_isPrintToyu : false,
        }

export var mUserData ={}

export var mGtpc = {
      /** ガス料金印字 */
    m_nPrintGasRyokinSiki : 0,
    /** ガス料金総額印字 */
     m_nPrintGasRyokinTotal : 0,
    /** 日割りコメント印字 */
    m_nPrintHiwariComment : 0,
    /** 日割りコメント1 */
      m_strHiwariComment_0 : null,
    /** 日割りコメント2 */
      m_strHiwariComment_1 : null,
    /** 前年同月使用量印字フラグ */
      m_nPrintZenyearkensr : 0,
    /** 検針伝票タイトル */
      m_strTitle_0 : null,
    /** 検針伝票タイトル（領収書） */
      m_strTitle_1 : null,
    /** 検針伝票タイトル（控え） */
      m_strTitle_2 : null,
    /** 検針伝票タイトル（領収書控え） */
      m_strTitle_3 : null,
    /** ガス料金式印字パターン(0: 秋元式, 1: 大口式) */
      m_nPrintGastablePtn : 0,
}

export var mZyksDat = {
      /** 使用量 */
     m_nSr : 0,
    /** 伝票日付(年) */
     m_nDenymd_year : 0,
    /** 伝票日付(月) */
      m_nDenymd_month :0,
    /** 伝票日付(日) */
      m_nDenymd_day : 0
}
