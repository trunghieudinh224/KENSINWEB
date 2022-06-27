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

const barcodeValue = document.getElementById("barcodeValuee") 

        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#camera') 
            },
            decoder: {
                readers: ["code_128_reader"]
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
			document.getElementById("barcodeValue").innerHTML = data.codeResult.code;
        }); 