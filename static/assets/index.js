var date = new Date()
let display_date= "Date:" + date.toLocaleDateString()

$(document).ready(function () {
    $("#display_date").html(display_date)
    $('#save_button').prop('disabled', true);
    $('#predict_button').prop('disabled', false)
})

let predicted_emotion;
$(function () {
    $("#predict_button").click(function () {
        let input_data = {
            "text": $("#text").val()
        }
        console.log("Not Working")
        $.ajax({
            type: 'POST',
            url: "/predict-emotion",
            data: JSON.stringify(input_data),
            dataType: "json",
            contentType: 'application/json',
            success: function (result) {
                $("#prediction").html(result.data.predicted_emotion)
                $("#emo_img_url").attr('src', result.data.predicted_emotion_img_url);
                $('#prediction').css("display", "");
                $('#emo_img_url').css("display", "");
                predicted_emotion = result.data.predicted_emotion
                $('#save_button').prop('disabled', false);
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });
    });
    //Write the code here for AJAX call
    $("save_button").click(function(){
        save_data = {
            "date":display_date,
            "emotion":predicted_emotion,
            "text":$("#text").val()
        }
        $.ajax({
            type: 'POST',
            url: "/save-entry",
            data: JSON.stringify(save_data),
            dataType: "json",
            contentType: 'application/json',
            success: function () {
                alert("Your Entry has been saved successfully?")
                window.location.reload()
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        })
    })

})

