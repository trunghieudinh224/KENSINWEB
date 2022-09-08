"use strict";
// http://192.168.200.218:8080/Webkensin/compackr/cussearch?key=0582668301&srch_kind=0&srch_string=0&match_kind=0&status=0&order_kind=0&login_id=7&login_pw=7
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const searchType = $("#search-type");
const searchPart = $("#search-part");
const searchKey = $("#search-key");
const searchBtn = $("#kensaku");
const checkKenShin = $("#finished").value === true ? "済" : "未";
const table = $(".result-tb");

//--------------------Check valid value input-------------------------->
searchKey.onfocus = function () {
  searchKey.classList.remove("warning");
  searchKey.value = "";
};
searchBtn.onclick = function () {
  const searchTypeValue = searchType.value;
  const searchKeyValue = searchKey.value;
  let isCheck = false;
  let errorMessage = "error";

  //-----------------Show data------------------------>
  // $(".result-tb").style.display = "block";
  // ----------------Check valid input --------------->
  switch (searchTypeValue) {
    case "0":
      isCheck = searchKeyValue.match(/^\d+$/) ? true : false;
      errorMessage = "not customer code";
      break;
    case "1":
      isCheck = searchKeyValue.match(
        /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
      )
        ? true
        : false;
      errorMessage = "not customer name";
      break;
    case "2":
      isCheck = searchKeyValue.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{4}$/)
        ? true
        : false;
      errorMessage = "invalid phone number";
      break;
    case "3":
      isCheck = searchKeyValue.match(/^\d+$/) ? true : false;
      errorMessage = "invalid code";
      break;
    default:
      console.log("ok");
  }
  if (searchKeyValue === "" || isCheck === false) {
    searchKey.classList.add("warning");
    searchKey.value = errorMessage;
  }
  //------------------------Call API---------------------------->
  const kcode = searchType.value;
  const key = searchKey.value;
  fetch(
    `http://192.168.200.218:8080/Webkensin/compackr/cussearch?key=0582668301&srch_kind=${kcode}&srch_string=${key}&match_kind=0&status=0&order_kind=0&login_id=7&login_pw=7`
  )
    .then((res) => {
      const list = $(".result-tb tbody");
      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }
      return res.json();
    })
    .then((json) => {
      json.cuslist.map((item) => {
        const newElement = document.createElement("tr");
        const newName = document.createElement("td");
        const newAddress = document.createElement("td");
        const newStatus = document.createElement("td");
        newName.appendChild(document.createTextNode(item.name));
        newAddress.appendChild(document.createTextNode(item.add_0));
        newStatus.appendChild(document.createTextNode(checkKenShin));
        newElement.appendChild(newName);
        newElement.appendChild(newAddress);
        newElement.appendChild(newStatus);
        $(".result-tb tbody").appendChild(newElement);
      });
    });
};
