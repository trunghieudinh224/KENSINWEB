var modePrint = sessionStorage.getItem("mode_print");
var time_kensin = sessionStorage.getItem("time_kensin");
var user_reader = sessionStorage.getItem("user_reader");

var form_mode_print = document.getElementById("get_print");
// api url
const api_url =
  "http://192.168.200.218:8080/Webkensin/compackr/getSetting?key=0582668301&login_id=7&login_pw=7";
var comment_1 = new Array();
var comment_2 = new Array();
var username = new Array();
var checkbox_format_date = document.getElementById("checkbox_format_date");

const date_picker_element = document.querySelector(".date-picker");

const dates_element = document.querySelector(".dates");
const date_select = document.getElementById("myDate");

const test = document.querySelector(".abcxyz");
const user_name = document.getElementById("Combobox");
const combobox_print_mode = document.getElementById("combobox_print_mode");
let isDate = true;

var date;
if (time_kensin == null) {
  date = new Date();
} else {
  date = new Date(time_kensin);
}

var nowDate = new Date();

// check user check checkbox time
if (
  nowDate.getDate() == date.getDate() &&
  nowDate.getMonth() == date.getMonth() &&
  nowDate.getFullYear() == date.getFullYear()
) {
  checkbox_format_date.checked = true;
  date_select.type = "button";
} else {
  checkbox_format_date.checked = false;
  date_select.type = "date";
}

var ck = checkbox_format_date.checked;

//get day kensin

let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;
console.log(year + "-" + month + "-" + day);

console.log(document.getElementById("myDate").value);
date_select.value = year + "-0" + (month + 1) + "-" + day;

//show day kensin
checkbox_format_date.addEventListener("click", setCheckBoxTime);

// Calling that async function
getapi(api_url);

if (modePrint == null) {
  modePrint = "画像印刷モード";
  sessionStorage.setItem("mode_print", modePrint);
}

var mode_image = document.getElementById("mode_image");
var mode_charactor = document.getElementById("mode_charactor");

if (modePrint.localeCompare("画像印刷モード") == 0) {
  combobox_print_mode.selectedIndex = 0;
} else {
  combobox_print_mode.selectedIndex = 1;
}

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);
  // Storing data in form of JSON
  var data = await response.json();
  var data_comment = data.m_lstComment;
  var data_username = data.m_lstTantName;

  for (let r of data_comment) {
    if (r.code == 1) {
      comment_1.push(r.name);
    } else if (r.code == 2) {
      comment_2.push(r.name);
    }
  }

  for (let r of data_username) {
    username.push(r.name);
  }

  populateClient();
}

//cancel button
function canCel() {
  window.location.href = "/menu.html";
}

//reset data in session when finish layout
function resetTing() {
  if (combobox_print_mode.value.localeCompare("画像印刷モード") == 0) {
    sessionStorage.setItem("mode_print", "画像印刷モード");
  } else {
    sessionStorage.setItem("mode_print", "文字列印刷モード");
  }

  date = new Date(date_select.value);
  sessionStorage.setItem("time_kensin", date);
  sessionStorage.setItem("user_reader", $("#Combobox option:selected").text());
  history.back();
}

//show comment
function showComment(abc) {
  
  if (abc == 1) {
    
      comment_1.forEach((item) => {
        setupModal('load',item,"Ok");
      });
    
  } else {
    
      comment_2.forEach((item) => {
        setupModal('load',item,null,null);
      });
    
  }
  
}

//close Dialog
function closeDialog() {
  document.getElementById("notificationComment").classList.remove("show");
}

// get user
function populateClient() {
  if (user_reader == null) {
  }
  console.log(username.length);
  for (var i = 0; i <= username.length; i++) {
    var option = document.createElement("option");
    option.classList.add("item-combobox")
    if (user_reader == username[i]) {
      option.selected = true;
    }
    option.text = username[i];
    option.value = username[i];

    user_name.add(option);
  }
}

function getUserItem(text) {
  console.log(text);
}

// select print date, current time or specified time
function setCheckBoxTime() {
  if (ck == true) {
    date_select.type = "date";
    checkbox_format_date.checked = false;
  } else {
    day = new Date();
    if (day.getMonth() + 1 < 10) {
      date_select.value =
        day.getFullYear() + "-0" + (day.getMonth() + 1) + "-" + day.getDate();
    } else {
      date_select.value =
        day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
    }

    checkbox_format_date.checked = true;
    date_select.type = "button";
  }
  ck = checkbox_format_date.checked;
}

// check if user choose change date kensin, show calendar
function toggDatePicker(e) {
  if (isDate == true) {
    isDate = false;
  } else {
    isDate = true;
  }
  if (!checkEventPathForClass(e.path, "dates")) {
    dates_element.classList.toggle("active");
  }
}

// get after month
function goToNextMonth(e) {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  mth_element.textContent = months[month] + " " + year;

  dates_element.classList.toggle("active");
  populateDates();
}

// get before month
function goToPrevMonth(e) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  mth_element.textContent = months[month] + " " + year;
  dates_element.classList.toggle("active");
  populateDates();
}

// create calender to change day kensin
function populateDates(e) {
  days_element.innerHTML = "";
  let amount_days = 30;

  if (
    month == 0 ||
    month == 2 ||
    month == 4 ||
    month == 6 ||
    month == 7 ||
    month == 9 ||
    month == 11
  ) {
    amount_days = 31;
  } else if (month == 1) {
    amount_days = 28;
  }

  for (let i = 0; i < amount_days; i++) {
    const day_element = document.createElement("div");
    day_element.classList.add("day");
    day_element.textContent = i + 1;

    if (
      selectedDay == i + 1 &&
      selectedMonth == month &&
      selectedYear == year
    ) {
      day_element.classList.add("selected");
    }
    day_element.addEventListener("click", function () {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      date = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;
      selected_date_element.textContent = formatdate(selectedDate);
      selected_date_element.dataset.value = selectedDate;

      populateDates();
    });
    days_element.appendChild(day_element);
  }
}

// check user click calender or not
function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.lenght; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
}

// format date
function formatdate(d) {
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return day + " / " + month + " / " + year;
}

function setupModal(status, title, message) {
    var modal = document.getElementById("myModal");
    var titleModal = document.getElementsByClassName("title-modal")[0];
    var buttonConfirm = document.getElementsByClassName("button-confirm")[0];
    var closeButton = document.getElementsByClassName("modal-close-button")[0];

    
    titleModal.innerHTML = title;
   
    if (status == "load") {
      //  titleModal.style.display = "none";
        closeButton.style.display = "none";
      //  buttonConfirm.style.display = "none";
    }

    if (modal.style.display == "none" || modal.style.display == "") {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }

    // When the user clicks on <span> (x), close the modal
    buttonConfirm.onclick = function () {
        modal.style.display = "none";
    }
}
