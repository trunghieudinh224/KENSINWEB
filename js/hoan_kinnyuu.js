import { LawItemDat } from './Dat/dat.js';
import * as KensinKinyuu from './kensin_kinnyuu.js'
import * as StringCS from './Constant/strings.js'


export var m_bRes;
export var m_lLawItem = [];
const combobox_total = document.getElementById("combobox_total");
const combobox_1 = document.getElementById("combobox_1");
const combobox_2 = document.getElementById("combobox_2");
const combobox_3 = document.getElementById("combobox_3");
const combobox_4 = document.getElementById("combobox_4");
const combobox_5 = document.getElementById("combobox_5");
const combobox_6 = document.getElementById("combobox_6");
const combobox_7 = document.getElementById("combobox_7");
const combobox_8 = document.getElementById("combobox_8");
const unnecessary_btn = document.getElementById("unnecessary_btn");
const no_btn = document.getElementById("no_btn");
const good_btn = document.getElementById("good_btn");

export var hoanString = KensinKinyuu.mUserData.mKokfDat.mHoan.substring(0, 8);
var listHoanData = hoanString.split("");

var pos_combobox = 0;

var tenkenDelta = KensinKinyuu.mUserData.mSysfDat.mTenkenDelta;

const kenshin_data = document.getElementById("kenshin_data");

var mUserData = JSON.parse(sessionStorage.getItem(StringCS.USERDATA));
var list_combobox ;
if(mUserData.mKokfDat.mSupplyForm != 3 ){
    list_combobox = [combobox_1, combobox_2, combobox_3, combobox_4, combobox_5, combobox_6, combobox_7, combobox_8];
}else{
    list_combobox = [combobox_5, combobox_6, combobox_8];
}


function setAllComboBox() {

    if (combobox_total.value != 1) {
        list_combobox.forEach(item => {
            item.value = combobox_total.value;
        });
    }
    setHoanKinnyuu();
}

function setComboBoxTotal(item) {
    var isOne = true;
    var check = item.value;
    list_combobox.forEach(element => {
        if (element.value != check) {
            isOne = false;
        }
    });

    if (isOne == true) {
        combobox_total.value = check;
    }
    m_bRes = getValueOfHoanItem(combobox_total.value);
}

function setDataforComboBoxSelect(value) {
    switch (value) {
        case 0:
            list_combobox[pos_combobox].value = 0;
            break;
        case 1:
            combobox_total.value = 1;
            list_combobox[pos_combobox].value = 1;
            break;
        default:
            list_combobox[pos_combobox].value = 2;
            break;
    }
    list_combobox[pos_combobox].classList.remove("combobox_select");
    setComboBoxTotal(list_combobox[pos_combobox]);
    pos_combobox++;
    if (pos_combobox > list_combobox.length-1) {
        pos_combobox = 0;
    }
    list_combobox[pos_combobox].classList.add("combobox_select");
    setHoanKinnyuu();
    setLawItem();

}

function getHoan() {
    var list_Value = new Array();
    var value = new Object();
    var result = "";

    for (let i = 0; i < list_combobox.length; i++) {
        switch (list_combobox[i].value) {
            case "o":
                result = "o";
                break;
            case "-":
                result = "x";
                break;
            case "x":
                result = "-";
                break;
            default:
                result = "*";
                break;
        }
        value.code = i;
        value.value = result;
        list_Value.push(value);

    }
    return list_Value;
}



function changeValue() {
    console.log(kenshin_data.value);
}

function setHoanKinnyuu() {
    hoanString = "";
    for (let i = 0; i < 8; i++) {
        var combobox_pos = document.getElementById("combobox_"+(i+1));
        var hoanVal = combobox_pos.options[list_combobox[i].selectedIndex].text;
        if (hoanVal == "ー") {
            hoanVal = "-";
        }
        hoanString = hoanString + hoanVal;
    }
}

function getValueOfHoanItem(value) {
    if (value == 0) {
        return 1;
    } else if (value == 1) {
        return 4;
    } else if (value == 2) {
        return 2;
    }
}

function setLawItem() {
    m_lLawItem = [];
    var item;
    for (let i = 0; i < list_combobox.length; i++) {
        item = new LawItemDat();
        item.code = 101 + i;
        item.value = getValueOfHoanItem(list_combobox[i].value);
        m_lLawItem.push(item);
    }
}

function onLoadAction() {
    if (combobox_total != null) {
        m_bRes = getValueOfHoanItem(combobox_total.value);

        for (let i = 0; i < list_combobox.length; i++) {
            switch (listHoanData[i]) {
                case "o":
                    list_combobox[i].value = "0";
                    break;
                case "-":
                    list_combobox[i].value = "2";
                    break;
                case "x":
                    list_combobox[i].value = "1";
                    break;
            }
        }


        list_combobox[pos_combobox].classList.add("combobox_select");

        if (tenkenDelta == 1) {
            var option = document.createElement("option");
            option.text = "△";
            option.value = "3";
            combobox_total.add(option);

            list_combobox.forEach(item => {
                item.add(option);
            });
        }

        setLawItem();


        list_combobox.forEach(item => {
            item.addEventListener("change", function () {
                if (item.value == 1) {
                    combobox_total.value = item.value;
                } else {
                    setComboBoxTotal(item);
                }
            });
        });

        combobox_total.onchange = setAllComboBox;

        good_btn.addEventListener("click", function () {
            setDataforComboBoxSelect(0);
        
        });
        unnecessary_btn.addEventListener("click", function () {
            setDataforComboBoxSelect(2);
        
        });
        no_btn.addEventListener("click", function () {
            setDataforComboBoxSelect(1);
        
        });
    }
}

export function checkInsertSecLawDat(){
    var check = false;
    for (let i = 0; i < m_lLawItem.length; i++) {
        if(m_lLawItem[i] != 4){
            check = true;
            break;
        } 
    }
    return check;
}

onLoadAction();