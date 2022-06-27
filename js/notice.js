$(document).ready(function () {
    const array = ["1", "2", "3", "4"]
    const selectOne = document.getElementById("selectOne");
    array.map(item => {
        let  option = document.createElement("option");
        option.value = item;
        console.log(option.value);
        option.text = "Hand" + item;
        selectOne.add(option);
    })
    const image1  = document.getElementById("image1");
});


const takePhoto = (id) => {
    console.log(id);
    chooseFile(id);
}
const takeCamera = () => {
    document.getElementById('camera').classList.add("show");
}
const chooseFile = (id) => {
    document.getElementById(id).click();
}
imgInp1.onchange = evt => {
    const [file] = imgInp1.files;
    const buttonX = document.getElementById("buttonX_1");

    if (file) {
        console.log(buttonX)
        image1.src = URL.createObjectURL(file);
        buttonX.style.display = "block";
    }
}
imgInp2.onchange = evt => {
    console.log("22323")
    const [file] = imgInp2.files
    const buttonX = document.getElementById("buttonX_2");
    if (file) {
        image2.src = URL.createObjectURL(file)
        buttonX.style.display = "block";
    }
}
imgInp3.onchange = evt => {
    const [file] = imgInp3.files
    const buttonX = document.getElementById("buttonX_3");
    if (file) {
        image3.src = URL.createObjectURL(file)
        buttonX.style.display = "block";
    }
}
function before(idButton, idPic) {
    const buttonX = document.getElementById(idButton);

    document.getElementById(idPic).src = "images/image.png";
    buttonX.style.display = "none";
}

const showTime = () => {
    var m = new Date();
    var dateString = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate() + " " + (m.getUTCHours() + 7) + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();

    document.getElementById('txtTimeValue').value = dateString;
}