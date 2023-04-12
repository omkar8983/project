//feedback

var form3 = $("#form3");
form3.validate({
    rules: {
        starq1: {
            required: true
        },
        suggestion: {
            required: true
        },
        rate1: {
            required: true
        },
        rate2: {
            required: true
        },
        rate3: {
            required: true
        },
        rate4: {
            required: true
        },
        rate5: {
            required: true
        },
        rate6: {
            required: true
        }
    },
    messages: {
        q1: {
            required: "Please Select Any One Option"
        },
        q2: {
            required: "Please Select Any One Option"
        },
        q3: {
            required: "Please Select Any One Option"
        },
        q4: {
            required: "Please Select Any One Option"
        },
        suggestion: {
            required: "Please share your feedback"
        }
        ,
        q6: {
            required: "Please share your feedback"
        },
         
        rate1: {
            required: "Please Rate"
        },

        rate2: {
            required: "Please Rate"
        },

        rate3: {
            required: "Please Rate"
        },

        rate4: {
            required: "Please Rate"
        },

        rate5: {
            required: "Please Rate"
        },

        rate6: {
            required: "Please Rate"
        }
    }
});
$("#submitFeedback").click(function () {
    if (form3.valid())

        $(function () {
            var obj = {};
          
            obj.q1 = $("input[name=rate1]:checked").val();
            obj.q2 = $("input[name=rate2]:checked").val();
            obj.q3 = $("input[name=rate3]:checked").val();
            obj.q4 = $("input[name=rate4]:checked").val();
            obj.q5 = $("input[name=rate5]:checked").val();
            obj.q6 = "";
             obj.q7 = "";
            //obj.q7 = $("input[name=q7]:checked").val();
            
            //alert(obj.drname);
            //alert(obj.city);
          
            //alert(obj.q1);
            //alert(obj.q2);
            //alert(obj.q3);
            //alert(obj.q4);
            //alert(obj.q5);
            //alert(obj.q6);
            //alert(obj.q7);
         
            

            $.ajax({
                type: "POST",
                url: "data.aspx/submitpostFeedback",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) {

                    $('input[name=rate1]').removeAttr('checked')
                    $('input[name=rate2]').removeAttr('checked')
                    $('input[name=rate3]').removeAttr('checked')
                    $('input[name=rate4]').removeAttr('checked')
                    $('input[name=rate5]').removeAttr('checked')
                    // $("#suggestion").val("");
                    $("#success-feedback").text("Thanks for feedaback");
                    //$('#myModal').modal('hide')
                    setTimeout(function () {
                        $('#myModal').modal('hide')
                    }, 3000);
                    //window.location.replace("webcast.html");

                }
            });

            return false;
        });
});