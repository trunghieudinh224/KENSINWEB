/**
   * 数値を指定したフォーマットで変換します。
   *
   * @param value     [in] long   値
   * @param keta      [in] byte   値の桁数補正値
   * @return  String  フォーマット後の文字列
*/
function Format(value, keta) {
	var temp = 0.0;
	temp = (parseFloat(value) / Math.pow(10, keta)).toFixed(1);
	return temp;
}

/**
	* 金額のフォーマットで変換.
	*
	* @param value [in] long   値
	* @return  String  フォーマット後の文字列
*/
function KingakuFormat(value) {
	return KingakuFormatLocal("###,##0", value);
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
function KingakuFormatLocal(wkFormat, value) {
	var kingaku;
	var format;
	var temp = value;
	if (temp < 0) {
		temp = Math.abs(temp);
		format = "-" + new DecimalFormat(wkFormat);
	} else {
		format = wkFormat;
	}

	kingaku = temp;
	kingaku = kingaku.toLocaleString("en-US");
	return kingaku;
}


/**
	* check string value is empty
	*
	* @return bBoolean
*/
function isEmpty(strVal) {
	return strVal == null || strVal.length == 0;
}


/**
	* 文字列後方の全半角スペース除去.
	*
	* @param strTarget [in] String 対象文字列
	* @return String   全半角スペース除去済み文字列を返す。
*/
function cutStringSpace(strTarget) {
	if (strTarget == null) {
		return "";
	}

	var nLen = strTarget.length;
	if (nLen < 0) {
		return "";
	}

	var nPos = -1;
	var retStr;
	var strMulti = '　';   // 全角スペース
	var strSingle = ' ';   // 半角スペース

	for (var i = nLen-1; i>=0; i--) {
		if (strTarget.substring(i-1, i) == strMulti || strTarget.substring(i-1, i) == strSingle) {
			strTarget = strTarget.substring(0, i-1);
		} else {
			break;
		}
	}

	nLen = strTarget.length;
	for (var i = 0; i < nLen; i++) {
		var x = strTarget.substring(0, 1);
		console.log(x);
		if (strTarget.substring(0, 1) == strMulti || strTarget.substring(0, 1) == strSingle) {
			strTarget = strTarget.substring(1, strTarget.length);
		} else {
			break;
		}
	}
	retStr = strTarget;

	return retStr;
}


/**
	* convert null value to string
	*
	* @param wkStr [in] String
	* @return String   全半角スペース除去済み文字列を返す。
*/
function nullToString(wkStr) {
	return wkStr == null ? "" : wkStr;
}


/**
	* clear space of string
	*
	* @param wkStr [in] String 
	* @return String
*/
function getClearString(wkStr) {
	return nullToString(wkStr).replace('\0', ' ').replace('　', ' ').trim();
}


/**
   * 月と日から0無しでMM/dd形式で作成
   * @param year [in] long       年
   * @param month [in] long       月
   * @param day   [in] long       日
   * @param mask  [in] booelan    true: mm/dd, false: mm月dd日
   * @return String   整形された日付文字列
*/
function DateFormat(month, day, mask) {
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
		ymd = _month + "月" + _day + "日";
	}
	return ymd;
}


/**
   * format time with day and month
   * @param month [in] long       月
   * @param day   [in] long       日
   * @return String  
*/
function MonthDayFormat(month, day) {
	var _month;
	var _day;
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

	return _month + "月" + _day + "日";
}


/**
	* 差益還元の名称を取得.
	*
	* @param mUserData   [in] {@link Userdata}   
	* @return  String  差益還元名称
*/
function getKangcontname(mUserData) {
	var strKang = "原料費調整";
	// 差益還元額名称取得
	const busfDat = mUserData.mBusfDat_kang;
	if (busfDat != null) {
		strKang = busfDat.mName;
	}
	return getClearString(nullToString(strKang));
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
	}
	else {
		kin1 = suu;
		if (keta < 0) {
			kin1 = suu * Math.abs(keta);
		}
		else if (keta > 0) {
			kin1 = suu / Math.abs(keta);
		}

		add1 = (0.1 + add);
		multi1 = multi;
		if (kin1 < 0) {
			sgn = -1;
		}
		else {
			sgn = 1;
		}
		kin1 = Math.abs(kin1);

		var temp = (((kin1 * 1000) + add1 + 0.01) / multi1);
		temp = Math.floor(temp);
		kin = ((temp * multi1) / 1000) * sgn;

		if (keta < 0) {
			kin /= Math.abs(keta);
		}
		else if (keta > 0) {
			kin *= Math.abs(keta);
		}
	}
	return kin;
}


/**
	* 数値(long型)を指定フォーマットに合わせた文字列を作成後、足りない桁数分先頭から半角空白を追加した文字列を取得します。
	* 
	* @param wkValue   [in] long   数値
	* @param wkFormat  [in] String フォーマット
	* @param wkMulti   [in] byte   倍数値（wkValueの値を１倍＝０、１０倍＝－１、１０分の１倍＝１）
	* @return  String  変換後文字列
*/
function printformat(wkValue, wkFormat, wkMulti) {
	return printformatLocal(wkFormat, parseFloat(wkValue).toFixed(1), wkMulti);
}


/**
	* 数値(double型)を倍数変換して指定フォーマットに合わせて文字列に変換します。
	* 
	* @param wkFormat  [in] String 指定フォーマット
	* @param wkValue   [in] double 変換したい数値(double型)
	* @param wkMulti   [in] byte   倍数値（wkValueの値を１倍＝０、１０倍＝－１、１０分の１倍＝１）
	* @return String   変換後文字列
*/
function format(wkFormat, wkValue, wkMulti) {
	return formatLocal(wkFormat, wkValue, wkMulti);
}


/**
     * 数値(long型)を指定フォーマットに合わせた文字列に変換します。
     * 
     * @param wkFormat  [in] String 指定フォーマット
     * @param wkValue   [in] long   変換したい数値(long型)
     * @return String   変換後文字列
     */
function format2pr(wkFormat, wkValue) {
	return formatLocal(wkFormat, parseFloat(wkValue), 0);
}


/**
	* 指定フォーマットと倍数計算後の値を用いて、数値用文字列に変換します。
	* 
	* @param wkFormat  [in] String 指定フォーマット（小数点以下の文字列数を固定化したい場合は、0.## のように指定してください。）
	* @param wkValue   [in] double 倍数計算後の値
	* @param wkMulti   [in] byte   倍数値（wkValueの値を１倍＝０、１０倍＝－１、１０分の１倍＝１）
	* @return String   変換後文字列
*/
function printformatLocal(wkFormat, wkValue, wkMulti) {
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
		wkStr += format(wkFormat, wkValue, wkMulti);
		wkLen = wkFormat.length;

		wkIdx = wkFormat.indexOf(".");
		// 極力インスタンスを生成しないようにする。// 2011.02.10
		if (wkFormat.includes("#")) {
			strTail = wkFormat.substring(wkIdx + 1).replaceAll("#", "");
		}
		else {
			strTail = wkFormat.substring(wkIdx + 1);
		}
		if (strTail.length == 0) {
			// 小数点以下が全て # となっている。
			// 末尾に付与する空白文字列数を計算します。
			wkCalcValue = parseInt(wkValue % calcMulti(wkMulti));
			if (wkCalcValue != 0) {
				wkCnt = String(wkCalcValue).length;
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
					tailCnt = ((wkMulti > wkCnt) ? (wkMulti - wkCnt) : 0);
				}
			}
			else {
				tailCnt = wkMulti + 1;
			}
			wkStr += (createMultiString(" ", tailCnt));
		}
		retBui += wkStr; // 最後にフォーマットされた文字列を追加する。

	}
	catch (err) {
		console.log(err);
		retBui = "";
	}

	return String(retBui);
}


/**
	* 引数の値分１０倍して返します。
	* 
	* @param wkMulti [in] byte 倍数値(100倍値を取得したい場合は、2を設定します。)
	* @return double   １０×倍数値(倍数値０の場合は１が返ります。)
*/
function calcMulti(wkMulti) {
	return Math.pow(10.0, wkMulti);
}


/**
	* 指定フォーマットと倍数計算後の値を用いて、数値用文字列に変換します。
	* 
	* @param wkFormat  [in] String 指定フォーマット
	* @param wkValue   [in] double 変換したい値
	* @param wkMulti   [in] byte   倍数値（wkValueの値を１倍＝０、１０倍＝－１、１０分の１倍＝１）
	* @return String   変換後文字列
*/
function formatLocal(wkFormat, wkValue, wkMulti) {
	if (wkFormat == null || wkFormat == "") return null;

	var retStr = "";

	try {
		wkValue = calcMultiValue(wkValue, wkMulti * -1); // 倍数を逆算する。
		// retStr = new DecimalFormat(wkFormat).format(wkValue);	//not done hieu
		retStr = KingakuFormat(wkValue);
	}
	catch (err) {
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
function calcMultiValue(wkValue, wkMulti) {
	return wkValue * calcMulti(wkMulti);
}


/**
	* 指定文字列を、指定回数分連続した文字列を作成します。
	* 
	* @param wkStr     [in] String 指定文字列
	* @param wkMulti   [in] int    指定回数
	* @return String   作成された文字列
*/
function createMultiString(wkStr, wkMulti) {
	if (wkStr == null || wkMulti <= 0) return ""; // 余計にインスタンスを生成させないようにする。

	var retBui = "";

	for (var i = 0; i < wkMulti; i++) {
		retBui.append(wkStr);
	}

	return retBui;
}


/**
	* 売上用の消費税率取得.
	*
	* @param sTaxyy    [in] short  消費税切替:年
	* @param bTaxmm    [in] byte   消費税切替:月
	* @param bTaxdd    [in] byte   消費税切替:日
	* @param sDenyy    [in] short  伝票日付:年
	* @param bDenmm    [in] byte   伝票日付:月
	* @param bDendd    [in] byte   伝票日付:日
	* @param sTaxr     [in] short  消費税率
	* @param sTaxrOld  [in] short  旧消費税率
	* @param sTaxrNew  [in] short  新消費税率
	* @return  short   消費税率
*/
function getUriTaxr(
	sTaxyy,
	bTaxmm,
	bTaxdd,
	sDenyy,
	bDenmm,
	bDendd,
	sTaxr,
	sTaxrOld,
	sTaxrNew) {
	var nResTaxr = sTaxr;
	if (sTaxyy != 0 && bTaxmm != 0 && bTaxdd != 0) {
		var lTaxYmd = sTaxyy * 10000 + bTaxmm * 100 + bTaxdd;
		var lDenYmd = sDenyy * 10000 + bDenmm * 100 + bDendd;
		if (lDenYmd >= lTaxYmd) {
			nResTaxr = sTaxrNew;
		}
		else {
			nResTaxr = sTaxrOld;
		}
	}
	return nResTaxr;
}


/**
	* 指定文字列のバイト数を取得します。
	* 
	* @param wkStr [in] String バイト数を調べたい文字列
	* @return int  指定文字列のバイト数
*/
function getBytesLen(wkStr) {
	if (wkStr == null || wkStr == "") return 0;
	// return wkStr.getBytes().length; // 正しい文字バイト数を取得できない。 // 2011.05.11

	var ret = 0;
	var ch;
	var len = wkStr.length;
	for (var i = 0; i < len; i++) {
		ch = wkStr.charAt(i);		//Hiếu kiểm tra lại
		// Unicodeｶﾅの範囲以外は２バイト
		if ((ch > 0x0019 && ch < 0x0080) || (ch >= 0xFF61 && ch <= 0xFF9F)) {
			ret++;
		}
		else {
			ret += 2;
		}
	}
	return ret;
}


/**
	* FORMAT DECIMAL NUMBER WITH DOT
	* 
	* @param value [in] String
	* @param numBehindDot [in] int
	* @param wkMulti [in] int
	* @return double
*/
function formatLocalJS(value, numBehindDot, wkMulti) {
	return parseFloat(parseFloat(value) / calcMulti(wkMulti)).toFixed(numBehindDot);
}


/**
	* FORMAT DECIMAL NUMBER
	* 
	* @param wkVal [in] String
	* @return String
*/
function formatDecial(wkVal) {
	let number = parseInt(wkVal);
	let nf = new Intl.NumberFormat('en-US');
	return nf.format(number);
}


/**
 * 3桁毎の区切り(,)を取り除く
 * @param wkStr [in] String 対象文字列
 * @return  String  3桁毎","を取り除いた文字列
 */
function getNumFromString(wkStr) {
	var stringBuilder = wkStr + "";
	var wkStrArray = stringBuilder.replaceAll(",", "").replaceAll(".", "");
	return wkStrArray;
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
function parseDate(wkStr) {
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
function betweenDays(wkDateA, wkDateB) {
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
     * 年と月と日から0無しでyyyy/mm/dd形式で作成
     * 
     * @param year  [in] int        年
     * @param month [in] int        月
     * @param day   [in] int        日
     * @param mask  [in] boolean    true: yyyy/mm/dd, false: yyyy年mm月dd日
     * @return  String  整形された日付文字列
     */
function DateFormatYMD(year, month, day, mask) {
	var _year = year;
	var _month = month;
	var _day = day;
	var ymd = "";

	if (month < 10) {
		_month = " " + _month;
	}
	if (day < 10) {
		_day = " " + _day;
	}

	if (mask) {
		ymd = _year + "/" + _month + "/" + _day;
	}
	else {
		ymd = _year + "年" + _month + "月" + _day + "日";
	}

	return ymd;
}


export {
	Format, KingakuFormat, KingakuFormatLocal, isEmpty, cutStringSpace, nullToString, getClearString, DateFormat, MonthDayFormat, getKangcontname, hasCom,
	printformat, printformatLocal, calcMulti, format, format2pr, formatLocal, getUriTaxr, getBytesLen, formatLocalJS, formatDecial, getNumFromString, parseDate,
	betweenDays, DateFormatYMD
}