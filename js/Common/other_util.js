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

export { Format, KingakuFormat, KingakuFormatLocal }