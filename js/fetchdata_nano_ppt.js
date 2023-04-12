function getCook(cookiename) {
    // Get name followed by anything except a semicolon
    var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}

//Sample usage
var cookieValue;
if (getCook('pollpublishtime')) {

    //alert("has value");
    cookieValue = getCook('pollpublishtime');
    //alert(cookieValue);
}
else {
    cookieValue = "000";
}


var questions = "1";
var questions1 = "1";
var stream1 = "0";
var stream2 = "0";
var m = "0";
var lasttime = "";
var lastslate = "";
var polldone = "0";
var lastpolldata = "";
var publishtime = "";
function ajaxmain() {

   var href = window.location.pathname;
    var urlpath = href.substring(0, href.lastIndexOf('/')) + "/";

			var obj = {};
			obj.url = urlpath;

    $.ajax({
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: "//vcm.24fd.com/e20/vcm/vcm2.0/videodetailfetch1.aspx/getpagedetails",
      success: function (data) {
        var displayinformation = data.d;
        $(displayinformation).each(function () {
          $("#lblspeaker").text(this.speakername1);
          $("#lblquestionaskedby").text(this.questionaskedby);
          $("#lblquestiondetails").text(this.questiondetails);
          $("#lblspeaker").text(this.speakername1);
          $("#lblslate").text(this.slate1);
          $("#lblsession").text(this.sessionname);
          $("#iRock").attr("src", this.slidefile);
          m = this.datetime;
          $("#lbldatetime").text(m);

          if (this.speakername1 != "" && this.sessionname != "") {
            $("#winner").show();
            $("#info").hide();
          } else {
            $("#winner").hide();
            $("#info").show();
          }

          publishtime = this.questionaskedby;

          if (cookieValue != publishtime) {
            if (this.activatepoll == "1") {
              if (lastpolldata == this.polldata) {
                polldone = "1";
              } else {
                polldone = "0";
                lastpolldata = this.polldata;
              }

              if (polldone == "0") {
                questions1 = this.polldata;
                questions = JSON.parse(questions1);

                callpoll();
                $("#quiz").show();
              }
            } else {
              $("#prev").hide();

              $("#start").hide();
            }
          } else {
          }

          if (this.slate1 == "") {
            $("#slatediv").hide();
          } else {
            if (this.datetime != lasttime || this.slate1 != lastslate) {
              if (this.datetime == "") {
               $("#slatediv").html(
                 "</br> </br> <span id='lblslate' >" + this.slate1 + "</span>"
               );
              } else {
                $("#slatediv").html(
                  " <span>" + $("#count1").html() + "</span>"
                );
              }
            }
          }
          lastslate = this.slate1;
          lasttime = this.datetime;

          if (this.status == "Live") {
            $("#jwplayer1").show();

            if (stream1 != this.streamname) {
              stream1 = this.streamname;
              stream2 = this.streamname2;
              play3(stream1);

              $(".backuptext").hide();
              if (stream1 == "" && stream2 == "") {
                $("#slatediv").show();
              } else {
                $("#slatediv").hide();
              }
            }

            mainload();
          } else {
            $("#jwplayer1").show();

            if (stream1 != this.streamname) {
              stream1 = this.streamname;
              stream2 = this.streamname2;
              play3(stream1);

              $(".backuptext").hide();
              if (stream1 == "" && stream2 == "") {
                $("#slatediv").show();
              } else {
                $("#slatediv").hide();
              }
            }
          }
        });
        return false;
      },
      error: function (textStatus, errorThrown) {},
      dataType: "json",
    });
}

function mainload() {

   setTimeout(function () {

        ajaxmain();

    }, 15000);

};
 function captus() {

            setInterval(function () {

                    captureuser();

            }, 50000);

        };

 $(document).ready(function () {
   //ajaxmain();
   //captus();
   //captureuser();
 });