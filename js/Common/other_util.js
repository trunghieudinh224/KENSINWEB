/**
   * 数値を指定したフォーマットで変換します。
   *
   * @param value     [in] long   値
   * @param keta      [in] byte   値の桁数補正値
   * @return  String  フォーマット後の文字列
   */
function Format(value, keta) {
	var temp;
	temp = value / Math.pow(10, keta);
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
		// format = new DecimalFormat("-" + wkFormat);
	}

	kingaku = temp;
	kingaku = kingaku.toLocaleString("en-US");
	return kingaku;
}


function isEmpty(strVal) {
	return strVal == null || strVal.length() == 0;
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

	var nLen = strTarget.length() - 1;
	if (nLen < 0) {
		return "";
	}

	var nPos = -1;
	var retStr;
	var strMulti = "　";   // 全角スペース
	var strSingle = " ";   // 半角スペース

	for (var i = nLen; i >= 0; i--) {
		if (!(strTarget.substring(i, i + 1)) == strMulti && !(strTarget.substring(i, i + 1)) == strSingle) {
			nPos = i + 1;
			break;
		}
	}
	if (nPos == -1) {
		retStr = "";
	}
	else {
		retStr = strTarget.substring(0, nPos);
	}

	return retStr;
}


function nullToString(wkStr) {
	return wkStr == null ? "" : wkStr;
}


function getClearString(wkStr) {
	return nullToString(wkStr).replace('\0', ' ').replace('　', ' ').trim();
}


export { Format, KingakuFormat, KingakuFormatLocal, isEmpty, cutStringSpace, nullToString, getClearString }