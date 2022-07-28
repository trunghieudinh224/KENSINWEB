function checkLogin() {
    var data = sessionStorage.getItem('username');
    if (data == null || data == '') {
        window.location.href = "/login_page.html";
    } else {
        document.getElementById("userName").textContent = data;
    }
}
window.onload = checkLogin;

const startScan = () => {
    // const form = document.getElementById('form');
    // form.style.marginTop = "40px";
    const button = document.getElementById("camera");
    if (window.getComputedStyle(button).display === "none") {
        button.style.display = "block";
    } else {
        return;
    }

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#camera')
        },
        decoder: {
            readers: [
                "code_128_reader",
                'code_39_reader',
                'code_39_vin_reader',
                'upc_reader',
                'upc_e_reader',
                'codabar_reader',
                'code_93_reader'
            ]
        },
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function (data) {
        console.log(data.codeResult.code);
        document.getElementById("barcodeValue").value = data.codeResult.code;
        document.getElementById("barcodeType").value = data.codeResult.format;
    });
}