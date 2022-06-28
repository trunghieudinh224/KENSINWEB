// const barcodeValue = document.getElementById("barcodeValue")

// Quagga.init({
//     inputStream: {
//         name: "Live",
//         type: "LiveStream",
//         constraints: {
//             width: 220,
//             height: 200
//         },
//         target: document.querySelector('#camera')
//     },
//     decoder: {
//         readers: ["code_128_reader"]
//     }
// }, function (err) {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log("Initialization finished. Ready to start");
//     Quagga.start();
// });

// Quagga.onDetected(function (data) {
//     console.log(data.codeResult.code);
// }); 



const startScan = () => {
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
            // area: { // defines rectangle of the detection/localization area
            //   top: '25%',
            //   right: '0%',
            //   left: '0%',
            //   bottom: '25%'
            // },
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
        }
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