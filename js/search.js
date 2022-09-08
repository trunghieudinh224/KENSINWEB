"use strict";
// http://192.168.200.218:8080/Webkensin/compackr/cussearch?key=0582668301&srch_kind=0&srch_string=0&match_kind=0&status=0&order_kind=0&login_id=7&login_pw=7
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const searchType = $("#search-type");
const searchPart = $("#search-part");
const searchOrder = $("#search-order");
const searchKey = $("#search-key");
const searchStatus = $("#search-status");
const searchBtn = $("#kensaku");
const warningMessage = $("#warning-message");
const table = $(".result-tb");
console.log(warningMessage)
//--------------------Check valid value input-------------------------->
searchKey.onfocus = function () {
  searchKey.classList.remove("warning");
  warningMessage.textContent = "";
};
searchBtn.onclick = function () {
  console.log(searchStatus.value);
  const checkKenShin = searchStatus.value === "1" ? "済" : "未";
  const searchTypeValue = searchType.value;
  const searchKeyValue = searchKey.value;
  let isCheck = false;
  let errorMessage = "error";

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
    warningMessage.textContent = errorMessage;
    warningMessage.style.display = "block";
  }
  //------------------------Call API---------------------------->
  const kcode = searchType.value;
  const part = searchPart.value;
  const key = searchKey.value;
  const status = searchStatus.value;
  const order = searchOrder.value;
  fetch(
    `http://192.168.200.218:8080/Webkensin/compackr/cussearch?key=0582668301&srch_kind=${kcode}&srch_string=${key}&match_kind=${part}&status=${status}&order_kind=${order}&login_id=7&login_pw=7`
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
        newElement.onclick = function(){
          const cuslistData = Object.assign({}, item)
          localStorage.setItem("cuslist", JSON.stringify(cuslistData));
          window.location.href = "/kokyaku_sentaku_page.html";
        }
      });
      //-----------------Show data------------------------>
      if($(".result-tb tbody").hasChildNodes()){
        $(".table-container").style.display = "block";
        $("#data-messages").style.display = "none";
      }else{
        $(".table-container").style.display = "none";
        $("#data-messages").style.display = "block";
      }
    });
      
};
