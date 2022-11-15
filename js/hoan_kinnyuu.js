 import * as KensinKinyuu from './kensin_kinnyuu.js'


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

export var hoanString = KensinKinyuu.kokfDat.mHoan;
var listHoanData = hoanString.split("");

var pos_combobox = 0;
const list_combobox = [combobox_1,combobox_2,combobox_3,combobox_4,combobox_5,combobox_6,combobox_7,combobox_8]; 
for (let i = 0; i < list_combobox.length; i++) {
    if(listHoanData[i] == "o"){
        list_combobox[i].value = "0";
    }
    else if(listHoanData[i] == "-"){
        list_combobox[i].value = "2";
    }
    else if(listHoanData[i] == "x"){
        list_combobox[i].value = "1";
    }

  //  list_combobox[i].value = listHoanData[i];
    
}

list_combobox[pos_combobox].classList.add("combobox_select");

var  tenkenDelta = 1;

if(tenkenDelta == 1){
    var option = document.createElement("option");
    option.text = "△";
    option.value = "3";
    combobox_total.add(option);

    list_combobox.forEach(item => {      
        item.add(option);
    });
}

//combobox_total.addEventListener("click",setAllComboBox);

var combo_choose;

list_combobox.forEach(item => {
    item.addEventListener("change",function(){
        if(item.value == 1){
            combobox_total.value = item.value;
        }else{
            setComboBoxTotal(item);           
        }
    });
});

combobox_total.onchange = setAllComboBox;


function setAllComboBox(){
   
        if(combobox_total.value != 1){
                list_combobox.forEach(item => {
                item.value = combobox_total.value;
            });
        }else{
            var list = getHoan();
            //console.log(list.length);
            list.forEach(item => {
               // console.log(item.code + " - "+ item.value + "\n");
            });

         //   isFirst = true;
        } 
        setHoanKinnyuu();
    }

function setComboBoxTotal(item){

    var isOne = true;
    var check = item.value;
    list_combobox.forEach(element => {
        if(element.value != check){
            isOne = false;
        }
    });

        if(isOne == true){
            combobox_total.value = check;  
        }
}

function setDataforComboBoxSelect(value){
    if(value == 0){
        list_combobox[pos_combobox].value = 0;
    }else if(value == 1){
        combobox_total.value = 1;
        list_combobox[pos_combobox].value = 1;
    }else{
        list_combobox[pos_combobox].value = 2;
    }
    list_combobox[pos_combobox].classList.remove("combobox_select");
    setComboBoxTotal(list_combobox[pos_combobox]);
    pos_combobox++;
    if(pos_combobox > 7){
        pos_combobox = 0;
    }
    list_combobox[pos_combobox].classList.add("combobox_select");
    setHoanKinnyuu();

}

function getHoan(){
    var list_Value = new Array();
    var value = new Object();
    var result = "";

    for (let i = 0; i < list_combobox.length; i++) {
        if(list_combobox[i].value == 0){
            result =  "o";
        }else if(list_combobox[i].value == 1){
            result =  "x";
        }else if(list_combobox[i].value == 2){
            result =  "-";
        }else{
            result =  "*";
        }
        value.code = i;
        value.value = result;
        list_Value.push(value);
        
    }
    return list_Value;
}



const kenshin_data = document.getElementById("kenshin_data");

function changeValue(){
    console.log(kenshin_data.value);
}

function setHoanKinnyuu(){
    hoanString = "";
    for (let i = 0; i < list_combobox.length; i++) {
       hoanString = hoanString + list_combobox[i].options[list_combobox[i].selectedIndex].text;        
    }
}

good_btn.addEventListener("click" ,function (){
     setDataforComboBoxSelect(0);
    
}) ;
unnecessary_btn.addEventListener("click" ,function (){
     setDataforComboBoxSelect(2);
    
}) ;
no_btn.addEventListener("click" ,function (){
     setDataforComboBoxSelect(1);
   
}) ;

