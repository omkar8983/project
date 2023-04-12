//$(document).ready(function(){})
var form1 = $("#form1");
var form2 = $("#form2");
//validation starts
form1.validate({
    rules: {
        txtContact: {
            required: true,
            minlength: 10,
            maxlength: 15,
            number: true
        },
        //txtEmail: "required email"
        txtEmail: {
            required: true,
            email: true
        }
    },
    messages: {

        txtName: "Please Enter Name",
        txtEmail: {
            required: "Please Enter Email ID",
            email: "Please Enter Proper Email ID"
        },
        txtState: "Please Select State",
        txtOrg: "Please Enter Organisation",
        txtLocation: "Please Enter Location",
        txtContact: {
            required: "Please Enter Mobile Number"
        }
    }
});

//validation ends
form2.validate({
    rules: {
        emailid: {
            required: true,
            email: true
        }
    },
    messages: {
        emailid: {
            required: "Please Enter Registered Email ID",
            email: "Please Enter Proper Registered Email ID"
        }
    }
});


//Register

$("#btbRegister").click(function() {

    if (form1.valid())

        $(function() {

        var x = Math.floor((Math.random() * 10000) + 1000);
        $(".backdiv").show();
        var obj = {};
        obj.name = $.trim($("[id*=txtName]").val());
        obj.lname = $.trim($("[id*=txtLastname]").val());
        obj.email = $.trim($("[id*=txtEmail]").val());
        obj.org = $.trim($("[id*=txtOrg]").val());
        obj.location = $.trim($("[id*=txtLocation]").val());
        obj.state = $.trim($("[id*=txtState]").val());
        obj.phone = $.trim($("[id*=txtContact]").val());
        obj.a_location = $.trim($("[id*=use_loc]").val());
        obj.devtype = getDeviceType();
        obj.browser = navigator.saysWho;
        obj.eventid = $.trim($("[id*=eventid]").val());;
        obj.replaceurl = $.trim($("[id*=replaceurl]").val());;
        obj.clientIp = $.trim($("[id*=clientIp]").val());;

        //setTimeout(function () {
        var originalURL = obj.replaceurl;
        obj.replaceurl = obj.replaceurl.replace('https://', '');
        obj.replaceurl = obj.replaceurl.replace('http://', '');
        obj.replaceurl = obj.replaceurl.substring(obj.replaceurl.indexOf("/"));
        obj.replaceurl = obj.replaceurl.substr(0, obj.replaceurl.lastIndexOf("/") + 1);

        var abc = {
            "name": obj.name + ' ' + obj.lname,
            "email": obj.email,
            "org": obj.org,
            "location": obj.location,
            "state": obj.state,
            "a_location": obj.a_location,
            "devtype": obj.devtype,
            "a_browser": obj.browser,
            "eventid": obj.eventid,
            "replaceurl": obj.replaceurl,
            "phone": obj.phone,
            "clientIp": obj.clientIp,
            "originalURL": originalURL
        }


        console.log(abc);
        // setTimeout(function () {
        $.ajax({
            //type: "POST",
            //url: "data.aspx/registerUser",
            //data: JSON.stringify(obj),
            //contentType: "application/json; charset=utf-8",
            //dataType: "json",
            type: "POST",
            //url: "/home/registerUser",
            url: "https://cdn.24fd.com/eapp/FrontEnd/registerUser",
            data: JSON.stringify(abc),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(r) {

                $('#e-error').html("");
                if (r.retStatus == 0) {
                    $('#label1').html("Enter Email ID !!");
                } else if (r.retStatus == 1) {
                    // document.cookie = " "+ urlpath +" =" + obj.name + "~" + obj.location + "~" + obj.empid + "~" + eid + "~" + urlpath + "";
                    // $(".backdiv").hide();
                    var coockieVal = r.name + "~" + obj.email + "~" + r.eventid + "~" + r.uniqueId;
                    createCookie(r.replaceurl, coockieVal);
                    //alert("To the Webcast");
                    window.location.replace("webcast.html");
                } else if (r.retStatus == 3) {
                    $(".backdiv").hide();
                    alert(" You are already registered");
                } else {
                    $(".backdiv").hide();
                    $('#e-error').html("Please register to Watch Webcast !!");

                }
            }
        });
        // }, x);
        return false;
    });
});
//Register Ends


//Login start
//Login start
$(function() {
    $("[id*=Signin]").click(function() {

        if (form2.valid()) {

            var x = Math.floor((Math.random() * 10000) + 1000);
            $(".backdiv").show();
            var obj = {};
            obj.useremail = $.trim($("[id*=email]").val());
            obj.useloc = $.trim($("[id*=use_loc]").val());
            obj.devtype = getDeviceType();
            obj.browser = navigator.saysWho;
            obj.a_location = $.trim($("[id*=use_loc]").val());
            obj.replaceurl = $.trim($("[id*=replaceurl]").val());;
            obj.clientIp = $.trim($("[id*=clientIp]").val());;
            //setTimeout(function () {

            obj.replaceurl = obj.replaceurl.replace('https://', '');
            obj.replaceurl = obj.replaceurl.replace('http://', '');
            obj.replaceurl = obj.replaceurl.substring(obj.replaceurl.indexOf("/"));
            obj.replaceurl = obj.replaceurl.substr(0, obj.replaceurl.lastIndexOf("/") + 1);

            var abc = {

                "email": obj.useremail,
                "useloc": obj.useloc,
                "replaceurl": obj.replaceurl,
                "clientIp": obj.clientIp,
                "devtype": getDeviceType(),
                "a_location": obj.a_location,
                "a_browser": obj.browser

            }


            // setTimeout(function () {
            $.ajax({
                type: "POST",
                url: "https://cdn.24fd.com/eapp/FrontEnd/registerUserCheck",
                data: JSON.stringify(abc),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(r) {


                    $('#e-error').html("");
                    if (r.retStatus == 0) {

                        $(".backdiv").hide();
                        $('#e-error').html("Enter Email ID !!");
                    } else if (r.retStatus == 1) {
                        $(".backdiv").hide();

                        var coockieVal = r.name + "~" + obj.useremail + "~" + r.eventid + "~" + r.uniqueId;
                        // alert(coockieVal);
                        createCookie(r.replaceurl, coockieVal);
                        window.location.replace("webcast.html");
                    } else if (r.retStatus == 2) {
                        $(".backdiv").hide();
                        $("[id*=txtEmail]").val($("[id*=email]").val());
                        $('#e-error').html("Please Register to Watch Webcast !!");
                        $('#label1').text("Please Register to Watch Webcast !!");
                        $('.nav-tabs a[href="#register"]').delay("slow").tab('show');
                    }
                }
            });
            //  }, x);
            return false;

        }

    });
});
//Login Ends
//devicedetect
const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
};
//devicedetectend
//browserDetected

navigator.saysWho = (() => {
    const { userAgent } = navigator
    let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
    let temp

    if (/trident/i.test(match[1])) {
        temp = /\brv[ :]+(\d+)/g.exec(userAgent) || []

        return `IE ${temp[1] || ''}`
    }

    if (match[1] === 'Chrome') {
        temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/)

        if (temp !== null) {
            return temp.slice(1).join(' ').replace('OPR', 'Opera')
        }

        temp = userAgent.match(/\b(Edg)\/(\d+)/)

        if (temp !== null) {
            return temp.slice(1).join(' ').replace('Edg', 'Edge (Chromium)')
        }
    }

    match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?']
    temp = userAgent.match(/version\/(\d+)/i)

    if (temp !== null) {
        match.splice(1, 1, temp[1])
    }

    return match.join(' ')
})()

console.log(navigator.saysWho) // outputs: `Chrome 89`
    //browserDetectedend

function createCookie(cookieName, cookieValue) {

    //var date = new Date();
    //date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    //document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
    document.cookie = cookieName + "=" + cookieValue;
    //alert(document.cookie);
}