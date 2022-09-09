window.onload = async function () {
    
    const sendAPI = () => {
        $.ajax({
            url: "http://192.168.200.218:8080/Webkensin/compackr/readData?key=0582668301&cusrec=7463&login_id=7&login_pw=7",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (result) {
                console.log(result)

                if (JSON.parse(result).err_code == 0) {
                    
                } else {
                    updateDialog("./images/gif/gif_fail.gif", JSON.parse(result).err_msg, "red", true)
                }
            },
            error: function (jqXHR, exception) {
                console.log(exception);
            }
        });
    }

    sendAPI();
}
