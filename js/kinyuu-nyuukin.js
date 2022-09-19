"use strict";

const seikyuKin = document.querySelector("#seikyugaku");
const chouseiKin = document.querySelector("#chouseigaku");
const azukariKin = document.querySelector("#azukari-kin");
const nyuukinGaku = document.querySelector("#nyuukin");
const zandakaKin = document.querySelector("#zandaka");

const teiseiBtn = document.querySelector("#teisei");
const teiseiGroup = document.querySelector("#teisei-group");
const nyuukinGroup = document.querySelector("#nyuukin-group");
const teiseiNyuukin = document.querySelector("#teisei-nyuukin");
const otsuri = document.querySelector("#otsuri");
const teiseiSumi = document.querySelector("#teisei-sumi");

let seikyu = Number(seikyuKin.textContent);
let zandaka = 0;
let nyuukin = 0;

setZandaka(0, 0); // default zandaka;

//-------------------Enter Input Sting event--------------------------------->

chouseiKin.onchange = function () {
  if (isValidNumber(chouseiKin.value)) {
    const chousei = Number(chouseiKin.value);
    const azukari = Number(azukariKin.value);
    setZandaka(chousei, azukari);
  }
};

azukariKin.onchange = function () {
  if (isValidNumber(azukariKin.value)) {
    const chousei = Number(chouseiKin.value);
    nyuukin = Number(azukariKin.value);
    setZandaka(chousei, nyuukin);
    nyuukinGaku.textContent = nyuukin;
  }
};

//--------------Teisei button event--------------------->

teiseiBtn.onclick = function () {
  teiseiGroup.classList.remove("hidden");
  nyuukinGroup.classList.add("hidden");
  teiseiNyuukin.onchange = function () {
    if (isValidNumber(teiseiNyuukin.value)) {
      otsuri.textContent =
        Number(azukariKin.value) - Number(teiseiNyuukin.value);
    }
  };
};

teiseiSumi.onclick = function () {
  if (isValidNumber(teiseiNyuukin.value)) {
    const chousei = Number(chouseiKin.value);
    nyuukin = Number(teiseiNyuukin.value);
    setZandaka(chousei, nyuukin);
    nyuukinGaku.textContent = nyuukin;
    teiseiGroup.classList.add("hidden");
    nyuukinGroup.classList.remove("hidden");
  }
};

// -------------Zandaka calculate----------------------->

function setZandaka(chousei, nyuukin) {
  zandaka = seikyu + chousei - nyuukin;
  zandakaKin.textContent = zandaka;
}

// -------------check valid string----------------------->

function isValidNumber(inputString) {
  const isnum = /^\d+$/.test(inputString);
  return isnum;
}
