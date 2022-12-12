import * as Other from '../Common/other_util.js'
import * as Dat from '../Dat/dat.js'
/** 端数処理：加算 */
export var HASADD = [
	0, 50000, 0, 99000, 20000, 0, 49000, 5000, 0, 9000, 2000, 0, 4000, 500, 0,
	900, 0,
];
/** 端数処理：乗算 */
export var HASMUL = [
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

function calcConTax(kin, kokfDat, gasfDat, sysfDat) {
	var tax;
	var wkConTax = 0;
	if (gasfDat.mTaxDiv == 3) {
		tax = kin * getKenTaxr(
			kokfDat,
			sysfDat,
			sysfDat.mTax_yy,
			sysfDat.mTax_mm,
			sysfDat.mTax_dd,
			sysfDat.mConsumTax,
			sysfDat.mTaxr_old,
			sysfDat.mTaxr_new
		);
		wkConTax =
			Other.hasCom(tax, gasfDat.mTaxAdd, gasfDat.mTaxMult, 1000) / 1000;
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
function getKenTaxr(
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
 function getGasSuryo(nGasUse, sy2f, kouser) {
    return getGasSuryo_(nGasUse, sy2f, kouser, false);
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
   function getGasSuryo_(nGasUse, sysf2, kouser, isNebiki) {
    //ガス料金で使用する使用量（中圧係数対応）
    var nGasSur;
    if (sysf2.mCaFlg == 1 && kouser.m_nChuatu > 0) {
      //中圧係数後での料金計算
      var dValue = nGasUse * kouser.m_nChuatu * 10;
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
function hasCom(suu, add, multi, keta) {
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
function calcGasUse(kokfDat, nowMeter) {
	var wkUse = kokfDat.mBetwMeter;
	if (kokfDat.mPreMeter <= nowMeter) {
		wkUse += nowMeter - kokfDat.mPreMeter;
	} else {
		wkUse += (Math.pow(10, kokfDat.mMtKeta + 1)) + (nowMeter - kokfDat.mPreMeter);
	}
	return wkUse;
}

/**
* 基本料金の再計算
* @param sysfDat   [in] {@link SysfDat}    システムデータ
* @param kokfDat   [in] {@link KokfDat}    顧客データ
* @param gasfDat   [in] {@link GasfDat}    ガス料金データ
* @return  long ガス基本料金
*/
function calcGasBase(sysfDat, kokfDat, gasfDat, sy2fDat, kouserDat) {
	calcGasBaseKin(sysfDat, gasfDat, kokfDat, sy2fDat, kouserDat);
	return kokfDat.mKtpcdat.m_nBasekin / 10;
}

/**
 * ガス基本料金の再計算
 *
 * @param sysf  [in] {@link SysfDat}    システムデータ
 * @param gasf  [in] {@link GasfDat}    ガス料金データ
 * @param kokf  [in] {@link KokfDat}    顧客データ
 * @return int 開始ステップ
 */
function calcGasBaseKin(sysf, gasf, kokf, sy2fDat, kouserDat) {
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
			if (tmpgstpdat.m_nUpLimit > nSur) {
				// 基本料金確定
				gstpDat = tmpGstpDat;
				break;
			}
			nStartStep++;
		}
		nBaseKin = gstpDat.m_nBase;
	} else {
		// ガス料金の基本料金
		var prevGstpDat = null;
		gstpDat = lstGstpDat[0];
		if (lstGstpDat.length > 1 && lstGstpDat[0].m_nUpLimit <= 1) {
			prevGstpDat = lstGstpDat[0];
			gstpDat = lstGstpDat[1];
		}
		if (prevGstpDat == null) {
			nBaseKin = gstpDat.m_nBase;
		} else {
			nStartStep = 1;
			nBaseKin = gstpDat.m_nBase - (gstpDat.m_nAddp * prevGstpDat.m_nUpLimit) / 10;
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
	calcZogenHiwari(
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
function checkSrpday(
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
		(getSrpSuryo(siyou, sy2fDat, kouserDat) * sysf.mSanki) / it;
	new1_srpday = new1_srpday / 10;
	var mSrChkm = sysf.mSrChkm;
	var mSrChkr = sysf.mSrChkr;

	if (old_srpday == 0) {
		ret = true;
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
	return !ret;
}

/**
 * 使用量チェック用の使用量を取得.
 *
 * @param nGasUse   [in] int                ガス使用量
 * @param sy2fDat   [in] {@link Sy2fDat}    システム2データ
 * @param kouserDat [in] {@link KouserDat}  顧客拡張データ
 * @return  ガス使用量
 */
function getSrpSuryo(nGasUse, sy2fDat, kouserDat) {
	//ガス料金で使用する使用量（中圧係数対応）
	var nGasSur;
	if (sy2fDat.mCaFlg == 1 && kouserDat.m_nChuatu > 0) {
		//中圧係数後での料金計算
		var dValue = nGasUse * kouserDat.m_nChuatu;
		nGasSur =
			hasCom(dValue, HASADD[14], HASMUL[14], 10000) / 10000;
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
function checkKgas(kokfDat, kobetu) {
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
function getKgasday(sysfDat, kokfDat, kMonth, kDay) {
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
	var chkYmd = Other.parseDate(wky + "/" + wkm + "/" + wkd);

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
	var wrkYMD = Other.parseDate(chky + "/" + chkm + "/" + chkd);

	// 前回検針日もしくは供給開始日から今回検針日までの日数を計算
	var ts = Other.betweenDays(chkYmd, wrkYMD);

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
function dailyGasrate(siyou, day, kokfDat, gasfDat) {
	if (kokfDat.mSupplyForm == 2) {
		// 供給親の場合はガス料金を計算しない
		return 0;
	}
	var wkRyokin;
	try {
		if (day != 0) {
			// 日割り計算有
			wkRyokin = mathDayGasRate(day, siyou, kokfDat, gasfDat);
		} else {
			// 日割り無し
			wkRyokin = mathGasRate(siyou, kokfDat, gasfDat);
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
function mathDayGasRate(day, siyou, kokfDat, gasfDat) {
	var wkRyoukin;
	switch (gasfDat.mSum) {
		case 1: // 通常
			if (gasfDat.mSyu == 1) {
				// 表形式
				wkRyoukin = mathDayGasRateNormal_1(day, siyou, gasfDat);
			} else {
				//ステップ形式
				wkRyoukin = mathDayGasRateNormal(day, siyou, gasfDat); // 13.07.09
			}
			break;
		case 2: // 簡ガス
			wkRyoukin = mathDayGasRateKgas(day, siyou, gasfDat); // 13.07.09
			break;
		case 3: // 契約単価
			wkRyoukin = mathDayGasRateDay(day, siyou, gasfDat, kokfDat);
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
function mathDayGasRateNormal_1(day, siyou, gasfDat) {
	var dbRate;

	if (gasfDat.m_lstGstpDat.size() - 2 < siyou) {
		// 表形式で設定されている上限超過時
		var max_50_kin = gasfDat.m_lstGstpDat.get(gasfDat.m_lstGstpDat.size() - 2).m_nBase; // 50.0m3の料金
		var lmt_over_add = gasfDat.m_lstGstpDat.get(gasfDat.m_lstGstpDat.size() - 1).m_nBase; // 0.1m3の従量料金
		var base_tanka = gasfDat.m_lstGstpDat.get(0).m_nBase; // 基本料金

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
		var base_tanka = gasfDat.m_lstGstpDat.get(0).m_nBase; // 基本料金
		dbRate =
			(base_tanka * day) / 30 +
			gasfDat.m_lstGstpDat.get(siyou).m_nBase -
			base_tanka;

		//	日割り計算した結果がマイナス時、ガス料金を０円とする。
		if (dbRate < 0) {
			dbRate = 0.0;
		}
	}

	dbRate = Other.hasCom(
		dbRate,
		gasfDat.mFrac1Add,
		gasfDat.mFrac1Mult,
		10000
	);
	dbRate *= 1000 + gasfDat.mRiseFall;
	dbRate = Other.hasCom(
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
function mathDayGasRateNormal(day, siyou, gasfDat) {
	var wkGr1; // １ヵ月(30日)での予測使用量
	var wkGr2; // １ヵ月(30日)での予測使用量
	var dbRate;

	var nStep = 0;
	var nLimit;
	var wk_gr = 0;

	if (gasfDat.mLine > 0 && gasfDat.m_lstGstpDat.get(0).m_nBase > 0) {
		wk_gr = gasfDat.m_lstGstpDat.get(0).m_nBase; // 基本料金
	} else if (gasfDat.mLine > 1) {
		// 基本料金 - 従量料金
		wk_gr =
			gasfDat.m_lstGstpDat.get(1).m_nBase -
			(gasfDat.m_lstGstpDat.get(0).m_nUpLimit *
				gasfDat.m_lstGstpDat.get(1).m_nAddp) /
			10;
	}

	for (var i = 0; i < gasfDat.m_lstGstpDat.size(); i++) {
		nLimit = gasfDat.m_lstGstpDat.get(i).m_nUpLimit;
		if (nLimit > siyou) {
			nStep = i;
			break;
		}
		if (nLimit > 0) {
			nStep = i;
		}
	}
	if (nStep >= gasfDat.m_lstGstpDat.size()) {
		// console.log("入力値が不正です");
	}
	var gstpDat = gasfDat.m_lstGstpDat.get(nStep);
	if (nStep == 0) {
		wkGr1 = gstpdat.m_nBase; // 基本料金
	} else {
		// 対象となる料金設定の手前まで使用量を引く
		wkGr1 =
			gstpdat.m_nBase -
			gasfDat.m_lstGstpDat.get(nStep - 1).m_nUpLimit * (gstpdat.m_nAddp / 10);
	}
	wkGr2 = siyou * (gstpdat.m_nAddp / 10);
	//従量料金
	wkGr2 = wkGr1 + wkGr2 - wk_gr;
	//基本料金の日割＋従量料金
	wkGr1 = (wk_gr * day) / 30; // 基本料金の日割計算
	dbRate = wkGr1 + wkGr2;
	if (dbRate < 0) {
		dbRate = 0;
	}

	dbRate = Other.hasCom(
		dbRate,
		gasfDat.mFrac1Add,
		gasfDat.mFrac1Mult,
		10000
	);
	dbRate *= 1000 + gasfDat.mRiseFall;
	dbRate = Other.hasCom(dbRate, gasfDat.mFrac2Add, gasfDat.mFrac2Mult, 10000000);
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
function mathDayGasRateKgas(day, siyou, gasfDat) {
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
		limit = gasfDat.m_lstGstpDat.get(i).m_nUpLimit;
		if (limit > wkSr) {
			iStep = i;
			break;
		}
		if (limit > 0) {
			iStep = i;
		}
		if (gasfDat.m_lstGstpDat.get(i).m_nAddp != 0) {
			dSubChoSur = limit;
		}
	}
	if (iStep >= gasfDat.m_lstGstpDat.size()) {
		throw new Exception("入力値が不正です");
	}
	var gstpDat = gasfDat.m_lstGstpDat.get(iStep);
	wkGr = gstpdat.m_nBase; // 基本料金
	wkGr2 = (siyou / 10) * gstpdat.m_nAddp; // 使用量＊（加算額＋調整単価）
	dSubSur = dSubSur / 10;
	dSubChoSur = dSubChoSur / 10; // 基本料金の日割計算
	wkGr1 = (wkGr * day) / 30;
	var dbRate = wkGr1 + wkGr2;
	if (dbRate > 0 && dSubSur > dSubChoSur) {
		dbRate += (dSubSur - dSubChoSur) * gasfDat.mChoTanka;
	}
	dbRate = Other.hasCom(
		dbRate,
		gasfDat.mFrac1Add,
		gasfDat.mFrac1Mult,
		10000
	);
	dbRate *= 1000 + gasfDat.mRiseFall;
	dbRate = Other.hasCom(
		dbRate,
		gasfDat.mFrac2Add,
		gasfDat.mFrac2Mult,
		10000000
	);
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
function mathDayGasRateDay(day, siyou, gasfDat, kokfDat) {
	MLog.INFO(ctx, TAG, "契約単価日割り料金計算[開始]");
	var wkGr; // １ヵ月(30日)での予測使用量
	var wkGr1; // １ヵ月(30日)での予測使用量
	var wkGr2; // １ヵ月(30日)での予測使用量

	wkGr = kokfDat.mGasBase * 10; // 基本料金-従量料金分
	wkGr2 = siyou * kokfDat.mGasUnit; // 使用量＊加算額
	wkGr1 = (wkGr * day) / 30; // 基本料金の日割計算
	var dbRate = wkGr1 + wkGr2;
	if (dbRate != 0) {
		dbRate = Other.hasCom(dbRate, gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000);
		dbRate = dbRate * (1000 + gasfDat.mRiseFall);
		dbRate = Other.hasCom(
			dbRate,
			gasfDat.mFrac2Add,
			gasfDat.mFrac2Mult,
			10000000
		);
	}
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
function mathGasRate(siyou, kokfDat, gasfDat) {
	var wkRyoukin;
	switch (gasfDat.mSum) {
		case 1: // 通常
			if (gasfDat.mSyu == 1) {
				// 表形式
				wkRyoukin = mathGasRateNormalG_1(siyou, gasfDat);
			} else {
				//ステップ形式
				wkRyoukin = mathGasRateNormalG(siyou, gasfDat);
			}
			break;
		case 2: // 簡ガス
			wkRyoukin = mathGasRateKgasG(ctx, siyou, gasfDat);
			break;
		case 3: // 契約単価
			var dbRate = siyou * kokfDat.mGasUnit + kokfDat.mGasBase * 10;
			// 端数処理
			dbRate = Other.hasCom(
				dbRate,
				gasfDat.mFrac1Add,
				gasfDat.mFrac1Mult,
				10000
			);
			dbRate = dbRate * (1000 + gasfDat.mRiseFall);
			dbRate = Other.hasCom(dbRate, gasfDat.mFrac2Add, gasfDat.mFrac2Mult, 10000000);
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
function mathGasRateNormalG_1(siyou, gasfDat) {
	// console.log("表形式ガス料金計算[開始]");
	var dbRate;

	if (gasfDat.m_lstGstpDat.length - 2 < siyou) {
		// 表形式で設定されている上限超過時
		var base_tanka =
			gasfDat.m_lstGstpDat[gasfDat.m_lstGstpDat.length - 2].m_nBase;
		var lmt_over_add =
			gasfDat.m_lstGstpDat[gasfDat.m_lstGstpDat.length - 1].m_nBase;

		var add_sum = 0;
		if (lmt_over_add > 0) {
			add_sum = lmt_over_add * (siyou - (gasfDat.m_lstGstpDat.length - 2));
		}

		dbRate = base_tanka + add_sum;
	} else {
		dbRate = gasfDat.m_lstGstpDat[siyou].m_nBase;
	}

	if (dbRate > 0) {
		dbRate = Other.hasCom(
			dbRate,
			gasfDat.mFrac1Add, gasfDat.mFrac1Mult, 10000);
		dbRate *= 1000 + gasfDat.mRiseFall;
		dbRate = Other.hasCom(
			dbRate,
			gasfDat.mFrac2Add,
			gasfDat.mFrac2Mult,
			10000000
		);
	}
	// console.log("表形式ガス料金計算[終了][ガス料金:" + dbRate / 10000000 + "]");
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
function mathGasRateNormalG(siyou, gasfDat) {
	// console.log("ステップ形式ガス料金計算[開始]");
	var gstpDat;
	var nStep = 0;
	var nLimit;
	var nSubChoSur = 0;
	var nSubSur = siyou;
	// console.log(gasfDat.m_lstGstpDat.length);
	for (var i = 0; i < gasfDat.m_lstGstpDat.length; i++) {
		nLimit = gasfDat.m_lstGstpDat[i].m_nUpLimit;
		if (nLimit > siyou) {
			nStep = i;
			break;
		}
		if (nLimit > 0) {
			nStep = i;
		}
		if (gasfDat.m_lstGstpDat[i].m_nAddp == 0) {
			nSubChoSur = nLimit;
		}
	}
	if (nStep >= gasfDat.m_lstGstpDat.length) {
		// console.log("ガス通常料金：入力値が不正です。");
	}
	// 対象となる料金設定のためまでの使用量を引く
	if (nStep > 0) {
		siyou = siyou - gasfDat.m_lstGstpDat[nStep - 1].m_nUpLimit;
	}
	gstpDat = gasfDat.m_lstGstpDat[nStep];
	var dbRate = (siyou / 10) * gstpDat.m_nAddp + gstpDat.m_nBase;
	if (dbRate != 0 && gstpDat.m_nAddp != 0) {
		dbRate += ((nSubSur - nSubChoSur) / 10) * gasfDat.mChoTanka;
	}
	dbRate = Other.hasCom(
		dbRate,
		gasfDat.mFrac1Add,
		gasfDat.mFrac1Mult,
		10000
	);
	dbRate *= 1000 + gasfDat.mRiseFall;
	dbRate = Other.hasCom(
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
function mathGasRateKgasG(siyou, gasfDat) {
	var gstpdat;
	var nStep = 0;
	var nLimit;
	var nSubChoSur = 0;
	for (var i = 0; i < gasfDat.m_lstGstpDat.length; i++) {
		nLimit = gasfDat.m_lstGstpDat[i].m_nUpLimit;
		if (nLimit > siyou) {
			nStep = i;
			break;
		}
		if (nLimit > 0) {
			nStep = i;
		}
		if (gasfDat.m_lstGstpDat[i].m_nAddp == 0) {
			nSubChoSur = nLimit;
		}
	}
	if (nStep >= gasfDat.m_lstGstpDat.length) {
		// console.log("簡ガス料金：入力値が不正です");
	}
	gstpdat = gasfDat.m_lstGstpDat.get(nStep);
	var dbRate = (siyou / 10) * gstpdat.m_nAddp + gstpdat.m_nBase;
	if (dbRate != 0 && gstpdat.m_nAddp != 0) {
		dbRate += ((siyou - nSubChoSur) / 10) * gasfDat.mChoTanka;
	}
	dbRate = Other.hasCom(
		dbRate,
		gasfDat.mFrac1Add,
		gasfDat.mFrac1Mult,
		10000
	);
	dbRate = dbRate * (1000 + gasfDat.mRiseFall);
	dbRate = Other.hasCom(
		dbRate,
		gasfDat.mFrac2Add,
		gasfDat.mFrac2Mult,
		10000000
	);
	return dbRate / 10000000;
}

/**
 * 割引金額の取得.
 *
 * @param sysfDat       [in] {@link SysfDat}        システムデータ
 * @param lstKnebDat    [in] {@code List<KnebDat>}  値引きデータ
 * @return  int 値引き金額
 */
function calcNebiki(sysfDat, lstKnebDat) {
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
function calcTotal(
	userData,
	sysfDat,
	kokfDat,
	ko2fDat,
	sy2fDat,
	kouserDat,
	lstLeasHmefDat,
	isIrai
) {
	var wkRyokin = calcSeikyu(sysfDat, kokfDat, sy2fDat, isIrai);
	// その他売上加算
	wkRyokin += kokfDat.mUrikin + kokfDat.mUriTax;
	// 当月ガス売上加算
	wkRyokin += kokfDat.mFee + kokfDat.mConTax;
	// 還元額加算
	wkRyokin += kokfDat.mReduce + kokfDat.mReduceTax;

	// 検針時リース計上
	if (kokfDat.mKenSumi) {
		// 検針済みの場合は検針時リース金額加算
		for (let i = 0; i < lstLeasHmefDat.length; i++) {
			const hmefDat = lstLeasHmefDat[i];
			if (hmefDat.mUsef && hmefDat.mHmeKind == 9 && hmefDat.mLeasKind == 1) {
				wkRyokin += hmefDat.mKin;
				wkRyokin += hmefDat.mTax;
			}
		}
	}
	var nNebiki = 0;
	if (sysfDat.mKnebFlg == 1) {
		// 漢の値引き有り
		nNebiki = calcNebiki(sysfDat, userData.m_lstKnebDat);		//Cần tìm hiểu cái hàm này Hieu
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
 function calcSeikyu(sysfDat, kokfDat, sy2fDat, isIrai) {
	var wkUrizan; // 売掛残高
	wkUrizan = kokfDat.mProcTisyuu + kokfDat.mTaxTisyuu; // 遅収料金
	if (sysfDat.mIfDemand) {
		wkUrizan += isIrai
			? readPrebalance(sysfDat, kokfDat, sy2fDat)
			: kokfDat.mPreBalance; // 前月残高
	}
	if (sysfDat.mIfAdjust) {
		wkUrizan += kokfDat.mTAdjust - kokfDat.mTReceipt; // 入金調整額
	}
	if (sysfDat.mIfAlarm) {
		wkUrizan += kokfDat.mProcLease + kokfDat.mTaxLease; // リース 加算
	}
	if (sysfDat.mIfDiv) {
		wkUrizan += kokfDat.mProcDiv + kokfDat.mTaxDiv; // 分割金 加算
	}
	if (sysfDat.mIfLampoil) {
		wkUrizan += kokfDat.mProcLoil + kokfDat.mTaxLoil; // 灯油　加算
	}
	if (sysfDat.mIfProceeds) {
		wkUrizan +=
			kokfDat.mProcEtc +
			kokfDat.mTaxEtc + // その他 加算
			kokfDat.mProcGas +
			kokfDat.mTaxGas - // ガス残高
			(kokfDat.mProcTisyuu + kokfDat.mTaxTisyuu); // 遅収料金
	}
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
function readPrebalance(sysfDat, kokfDat, sy2fDat) {
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
 * 増減率の計算.
 *
 * @param ktpc          [in] {@link KtpcDat}    顧客料金透明化データ
 * @param nFee          [in] long               ガス料金
 * @param nBaseKin      [in] double             基本料金
 * @param nFacilityKin  [in] double             設備料金
 * @param gasf          [in] {@link GasfDat}    ガス料金データ
 * @param nHiwari       [in] int                日割り日数.
 */
function calcZogenHiwari(ktpc, nFee, nBaseKin, nFacilityKin, gasf, nHiwari) {
	if (nHiwari != 0) {
		// 基本料金の日割り計算
		nBaseKin = (nBaseKin * nHiwari) / 30;
		nFacilityKin = (nFacilityKin * nHiwari) / 30;
	}
	nBaseKin = Other.hasCom(
		nBaseKin,
		gasf.mFrac1Add,
		gasf.mFrac1Mult,
		10000
	);
	nFacilityKin = Other.hasCom(
		nFacilityKin,
		gasf.mFrac1Add,
		gasf.mFrac1Mult,
		10000
	);
	nBaseKin *= 1000 + gasf.mRiseFall;
	nFacilityKin *= 1000 + gasf.mRiseFall;
	nBaseKin =
		Other.hasCom(nBaseKin, gasf.mFrac2Add, gasf.mFrac2Mult, 10000000) /
		1000;
	nFacilityKin =
		Other.hasCom(
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
 * ガス料金:還元率の更新
 *
 * @param kokfDat   [in] {@link KokfDat}    顧客データ
 * @param gasfDat   [in] {@link GasfDat}    ガス料金データ
 * @param sysfDat   [in] {@link SysfDat}    システムデータ
 * @param sy2fDat   [in] {@link Sy2fDat}    システム2データ
 */
function calcGasKangen(kokfDat, gasfDat, sysfDat, sy2fDat, kouserDat) {
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
			Other.hasCom(wkKin, gasfDat.mRedAdd, gasfDat.mRedMult, 1000) / 1000;
	} else if (gasfDat.mRedDiv == 2) {
		wkKin =
			getGasSuryo(kokfDat.mGasUse, sy2fDat, kouserDat) *
			gasfDat.mRedMred;
		kokfDat.mReduce =
			Other.hasCom(wkKin, gasfDat.mRedAdd, gasfDat.mRedMult, 10000) /
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
		console.log("取引区分ファイルの読込みに失敗: " + ex);
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
				Other.hasCom(
					wkKin,
					sysfDat.mFracAddTax,
					sysfDat.mFracMulTax,
					1000
				) / 1000;
		} else {
			kokfDat.mReduceTax =
				Other.hasCom(
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
function calcEtcUri(sysfDat, kokfDat) {
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
	return gTM_etcUri;
}

/**
 * 当月その他消費税額
 *
 * @param sysfDat   [in] {@link SysfDat}    システムデータ
 * @param kokfDat   [in] {@link KokfDat}    顧客データ
 * @return  int その他売上消費税
 */
function calcEtcTax(sysfDat, kokfDat) {
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
	return gTM_etcTax;
}

/**
* 振替依頼中を考慮した前月残高計算
*

* @param sysfDat   [in] {@link SysfDat}    システムデータ
* @param kokfDat   [in] {@link KokfDat}    顧客データ
* @param sy2fDat   [in] {@link Sy2fDat}    システム2データ
* @return  int 前月残高
*/
function calcPrebalance(sysfDat, kokfDat, sy2fDat) {
	var wkKingaku;
	// 振替依頼中の前月残高の抑制フラグ
	var wkFuriDemand = 0;
	// SysOption.PRINT_ZENZAN_IRAI = 13
	if (sy2fDat.mSysOption[Dat.SysOption.PRINT_ZENZAN_IRAI] == 1) {
		// 振替依頼中は、前月残高を抑制フラグの有効中
		if (kokfDat.mBankCode != 0 && kokfDat.mFriKin != 0 && (kokfDat.mFristat == 2 || kokfDat.mFristat == 3) && sysfDat.mIfDemand) {
			// 振替依頼中は前月残高は印字しない
			wkFuriDemand = 1;
			if (kokfDat.mFriKin != kokfDat.mPreBalance) {
				// 振替依頼中の金額<>前月残高では、前月残高の抑制は不可
				wkFuriDemand = 0;
			}
		}
	}
	if (!((sysfDat.mIfDemand && kokfDat.mPreBalance != 0) && wkFuriDemand == 0)) {
		wkKingaku = kokfDat.mPreBalance;
	}
	else {
		wkKingaku = 0;
	}

	return wkKingaku;
}


export {
	calcConTax, getKenTaxr, getGasSuryo, hasCom, calcGasUse, calcGasBaseKin, calcGasBase,
	checkSrpday, getSrpSuryo, checkKgas, getKgasday, dailyGasrate, mathDayGasRate, mathDayGasRateNormal_1,
	mathDayGasRateNormal, mathDayGasRateKgas, mathDayGasRateDay, mathGasRate, mathGasRateNormalG_1, mathGasRateNormalG
	, calcNebiki, calcTotal, calcSeikyu, readPrebalance, calcZogenHiwari, calcGasKangen, calcEtcUri, calcEtcTax , calcPrebalance
}