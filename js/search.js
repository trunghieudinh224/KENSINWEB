import * as constant from "./Constant/message.js";

("use strict");
// http://192.168.200.218:8080/Webkensin/compackr/cussearch?key=0582668301&srch_kind=0&srch_string=0&match_kind=0&status=0&order_kind=0&login_id=7&login_pw=7
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const selectTags = $$("select");
const dataMessage = $("#data-messages");
const firstCustomer = $("#first-customer");
const searchType = $("#search-type");
const searchPart = $("#search-part");
const searchOrder = $("#search-order");
const searchKey = $("#search-key");
const searchStatus = $("#search-status");
const searchBtn = $("#kensaku");
const searchBackBtn = $("#search-back-btn");
const warningMessage = $("#warning-message");
const table = $(".result-tb");
const checkKenShin = searchStatus.value === "1" ? "済" : "未";

//------------------Founded data message----------------------------->
dataMessage.textContent = constant.E00005;

//--------------------Show previous data------------------------------->
const getCuslist = JSON.parse(localStorage.getItem("cuslist"));
if (getCuslist) {
  const previousCuslist = Object.values(getCuslist);
  if (previousCuslist.length > 0) {
    document.getElementById("countList").innerHTML = "検索件数：" + previousCuslist.length + "件";
    document.getElementById("countList").style.display = "block";
  } else {
    document.getElementById("countList").style.display = "none";
  }
  previousCuslist.map((item) => {
    const newElement = document.createElement("tr");
    const newName = document.createElement("td");
    newName.className += " text";
    const newAddress = document.createElement("td");
    newAddress.className += " text";
    const newStatus = document.createElement("td");
    newStatus.className += " text";
    newName.appendChild(document.createTextNode(item.name.trim()));
    newAddress.appendChild(document.createTextNode(item.add_0.trim()));
    newStatus.appendChild(document.createTextNode(checkKenShin.trim()));
    newElement.appendChild(newName);
    newElement.appendChild(newAddress);
    newElement.appendChild(newStatus);
    $(".result-tb").appendChild(newElement);
    newElement.onclick = function () {
      item.taishoo = searchOrder.options[searchOrder.selectedIndex].text;
      const cusdat = Object.assign({}, item);
      localStorage.setItem("cusdat", JSON.stringify(cusdat));
      window.location.href = "/kokyaku_sentaku_page.html";
    };
  });
  if (previousCuslist.length !== 0) {
    $(".table-container").style.display = "block";
  }
}
//--------------------Check valid value input-------------------------->
for (const input of selectTags) {
  input.onchange = function () {
    searchKey.classList.remove("warning");
  };
}
searchKey.onfocus = function () {
  searchKey.classList.remove("warning");
  warningMessage.textContent = "";
};
searchBtn.onclick = function () {
  const checkKenShin = searchStatus.value === "1" ? "済" : "未";
  const searchTypeValue = searchType.value;
  const searchKeyValue = searchKey.value;
  let isCheck = false;
  let errorMessage = "error";

  // ----------------Check valid input --------------->

  switch (searchTypeValue) {
    case "0":
      isCheck = searchKeyValue.match(/^\d+$/) ? true : false;
      errorMessage = constant.E00001;
      break;
    case "1":
      isCheck = searchKeyValue.match(
        /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
      )
        ? true
        : false;
      errorMessage = constant.E00002;
      break;
    case "2":
      isCheck = searchKeyValue.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{4}$/)
        ? true
        : false;
      errorMessage = constant.E00003;
      break;
    case "3":
      isCheck = searchKeyValue.match(/^\d+$/) ? true : false;
      errorMessage = constant.E00004;
      break;
    default:
      console.log("ok");
  }
  if (searchKeyValue === "" || isCheck === false) {
    searchKey.classList.add("warning");
    warningMessage.textContent = errorMessage;
    warningMessage.style.display = "block";
  } else {
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
        const list = $(".result-tb");
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
        return res.json();
      })
      .then((json) => {
        const cuslist = Object.assign({}, json.cuslist);
        localStorage.setItem("cuslist", JSON.stringify(cuslist));
        json.cuslist.map((item) => {
          const newElement = document.createElement("tr");
          const newName = document.createElement("td");
          newName.className += " text";
          const newAddress = document.createElement("td");
          newAddress.className += " text";
          const newStatus = document.createElement("td");
          newStatus.className += " text";
          newName.appendChild(document.createTextNode(item.name.trim()));
          newAddress.appendChild(document.createTextNode(item.add_0.trim()));
          newStatus.appendChild(document.createTextNode(checkKenShin.trim()));
          newElement.appendChild(newName);
          newElement.appendChild(newAddress);
          newElement.appendChild(newStatus);
          table.appendChild(newElement);
          newElement.onclick = function () {
            item.taishoo = searchOrder.options[searchOrder.selectedIndex].text;
            const cusdat = Object.assign({}, item);
            localStorage.setItem("cusdat", JSON.stringify(cusdat));
            window.location.href = "/kokyaku_sentaku_page.html";
          };
        });
        //-----------------Show data------------------------>
        if (table.hasChildNodes()) {
          $(".table-container").style.display = "block";
          $("#data-messages").style.display = "none";
          $("#countList").innerHTML = "検索件数：" + table.childElementCount + "件";
          $("#countList").style.display = "block";
        } else {
          $(".table-container").style.display = "none";
          $("#countList").style.display = "none";
          $("#data-messages").style.display = "block";
        }
      });
  }
};
//-------------------Direct to First Customer info page-------------->
firstCustomer.onclick = function () {
    const kcode = searchType.value;
    const part = searchPart.value;
    const key = searchKey.value;
    const order = searchOrder.value;
    fetch(
        `http://192.168.200.218:8080/Webkensin/compackr/cussearch?key=0582668301&srch_kind=${kcode || 0}&srch_string=${key || 0}&match_kind=${part || 0}&status=0&order_kind=${order || 0}&login_id=7&login_pw=7`
    )
    .then((res) => res.json())
    .then((json) => {
        const cusdat = Object.assign({}, json.cuslist[0]);
        cusdat.taishoo = searchOrder[order].innerHTML;
        localStorage.setItem("cusdat", JSON.stringify(cusdat));
        window.location.href = "/kokyaku_sentaku_page.html";
    })
    }
searchBackBtn.onclick = function () {
  window.location.href = "/menu_page.html";
};
