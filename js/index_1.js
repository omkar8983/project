$(".loading").hide();
function callpoll() {
  (function () {
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $("#quiz"); //Quiz div object

    // Display initial question
    displayNext();

    // Click handler for the 'next' button

    $("#next")
      .off()
      .on("click", function (e) {
        e.preventDefault();
        // Suspend click listener during fade animation
        if (quiz.is(":animated")) {
          return false;
        }
        choose();

        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
          $(".quizalerts").html(
            "<div class='alert alert-warning'><strong>Warning!</strong> You must select an answer to view the next action.</div>"
          );
          $(".alert-warning")
            .fadeTo(2000, 500)
            .slideUp(500, function () {
              $(".alert-warning").slideUp(500);
            });
        } else {
          questionCounter++;
          //alert(questionCounter);
          displayNext();
        }
      });

    // Click handler for the 'prev' button
    $("#prev")
      .off()
      .on("click", function (e) {
        e.preventDefault();

        if (quiz.is(":animated")) {
          return false;
        }
        choose();
        questionCounter--;
        displayNext();
      });

    // Click handler for the 'Start Over' button
    $("#start").on("click", function (e) {
      e.preventDefault();

      if (quiz.is(":animated")) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $("#start").hide();
    });

    // Animates buttons on hover
    $(".button").on("mouseenter", function () {
      $(this).addClass("active");
    });
    $(".button").on("mouseleave", function () {
      $(this).removeClass("active");
    });

    // Creates and returns the div that contains the questions and
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $("<div>", {
        id: "question",
      });

      var header = $("<h5>Contest Question " + (index + 1) + ":</h5>");
      // qElement.append(header);

      var question = $('<p class="question-holder">').append(
        questions[index].question
      );
      qElement.append(question);

      var radioButtons = createRadios(index);
      qElement.append(radioButtons);

      return qElement;
    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var ques = questions[index].question;
      var array1 = ques.split(":");

      if (array1[0] == "Result of ") {
        // $("#redot").show();

        if ($("#menu1").hasClass("active")) {
        } else {
          $(".poll-ul").addClass("blink-text");
        }

        $("#imgs23").css("display", "block");
        $("#redot1").css("background-color", "#f58634");
        var radioList = $("<ul>");
        var item;
        var input = "";
        for (var i = 0; i < questions[index].choices.length; i++) {
          item = $("<li >");
          var array2 = questions[index].choices[i].split("-");
          if (
            array2[0] != "nooption1" &&
            array2[0] != "nooption2" &&
            array2[0] != "nooption3" &&
            array2[0] != "nooption4"
          ) {
            //input = '<label style="width: 25%;word-wrap: break-word;">';
            input =
              '<label class="bg-label" style="width: 99%;word-wrap: break-word;">';
            input += array2[0] + "</label>";
            //input += ': <label style="width:73%;"> <p style="     margin: 5px;font-size: 1.2em;   padding: 5px 0px; width:' + array2[1] +'; background-color:#fe0002;     color: #070e18;">';
            input +=
              ' <label style="width:99%;border: 1px solid #b44d35;"> <p style="     margin: 0px;font-size: 15px;   padding: 20px 0px 0px;height: 6px; width:' +
              array2[1] +
              '; background-color:#b44d35;     color: #070e18;">';
            input += array2[1] + "</p></label>";

            item.append(input);
            radioList.append(item);
          }
        }
        questionCounter = 1000001;
        return radioList;
      } else if (array1[0] == "Contest will start shortly") {
        $("#redot").hide();
        $("#imgs23").css("display", "block");
        $("#redot1").css("background-color", "#f58634");
        var radioList = $("<ul>");
        var item;
        var input = "";
        for (var i = 0; i < questions[index].choices.length; i++) {
          item = $("<li>");
          input = "<label>";
          input += questions[index].choices[i] + "</label>";
          item.append(input);
          radioList.append(item);
        }
        questionCounter = 1000001;
        return radioList;
      } else if (
        array1[0] ==
        "Thank you for participating in the contest. We will soon announce the winner. Stay tuned with Huawei on Facebook."
      ) {
        $("#redot").hide();
        $("#imgs23").css("display", "none");
        $("#redot1").css("background-color", "#f58634");
        var radioList = $("<ul>");
        var item;
        var input = "";
        for (var i = 0; i < questions[index].choices.length; i++) {
          item = $("<li>");
          input = "<label>";
          input += questions[index].choices[i] + "</label>";
          item.append(input);
          radioList.append(item);
        }
        questionCounter = 1000001;
        return radioList;
      } else {
        // $("#redot").show();
        // $(".poll-ul").addClass("blink-text");
        if ($("#menu1").hasClass("active")) {
        } else {
          $(".poll-ul").addClass("blink-text");
        }
        $("#imgs23").css("display", "block");
        $("#redot1").css("background-color", "#f58634");
        var radioList = $("<ul>");
        var item;
        var input = "";
        for (var i = 0; i < questions[index].choices.length; i++) {
          item = $("<li>");
          if (
            questions[index].choices[i] != "nooption1" &&
            questions[index].choices[i] != "nooption2" &&
            questions[index].choices[i] != "nooption3" &&
            questions[index].choices[i] != "nooption4"
          ) {
            // input = '<label class="question-label"><input type="radio"  name="answer" value=' + i + ' style="opacity:0" /><span>';
            //input += questions[index].choices[i] + '</span></label>';

            input =
              '<div class="question-option-holder"><div class="radio-holder"><input type="radio"  name="answer"  id=' +
              i +
              "  value=" +
              i +
              " /></div>";
            input +=
              '<label class="question-label" for=' +
              i +
              "> " +
              questions[index].choices[i] +
              "</label></div>";

            // input = '<input type="radio" name="answer" value=' + i + ' /><button type="button" class="btn-bg next123" name="answer" value="' + questions[index].choices[i] + '"> ' + questions[index].choices[i] + ' </button>';
            //input = '<label><input type="button" type="button" class="btn-bg" name="answer" value=' + i + ' />';
            // input +=  + '</label>';
            item.append(input);
            radioList.append(item);
          }
        }
        //alert(radioList);
        return radioList;
      }
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function () {
        $("#question").remove();
        //alert(questionCounter + "--" + questions.length);
        if (questionCounter < questions.length) {
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!isNaN(selections[questionCounter])) {
            $("input[value=" + selections[questionCounter] + "]").prop(
              "checked",
              true
            );
          }

          // Controls display of 'prev' button
          if (questionCounter === 1) {
            $("#prev").show();
            $("#start").hide();
          } else if (questionCounter === 0) {
            $("#prev").hide();
            $("#next").show();
            $("#msg").hide();
            $("#start").hide();
          } else if (questionCounter === 1000001) {
            $("#prev").hide();
            $("#next").hide();
            $("#msg").hide();
            $("#start").hide();
          }
        } else {
          quizend();
        }
      });
    }

    function quizend() {
      displayScore();
      $("#quiz").html("");

      $("#question").remove();
      $("#quiz-time-left").hide();
      quiz
        .append(
          '<h4 style="text-align: center;"> Answers will be displayed soon</h4>'
        )
        .fadeIn();
      polldone = "1";
      questionCounter = 0;
      selections = [];
      document.cookie = "pollpublishtime=" + publishtime;

      setTimeout(function () {
        $("#prev").hide();
        $("#next").hide();
        $("#start").hide();
        $("#msg").show();
        $("#redot").hide();
        $("#redot1").css("background-color", "#005587");
        $("#quiz").html("");
      }, 500);

      /*$.ajax({
        type: "POST",
        url: "addquizpoints.asp",
        data: {'tq': questions.length, 'ta' : numCorrect, 'tt' : quiz_time},
        success: function(result) {
            $('.loading').hide();
        }
    }); 
	*/
    }

    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $("<p>", { id: "question" });
      var answers = "";
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        answers =
          answers +
          "~" +
          questions[i].question +
          "-" +
          questions[i].choices[selections[i]];
      }
      //alert(answers);
      savepoll(answers);
    }
  })();

  function savepoll(ans) {
    var obj = {};

    obj.ans = ans;

    $.ajax({
      type: "POST",
      url: "data.aspx/savepolldata",
      data: JSON.stringify(obj),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (result) {
        //alert(result.d);
      },
    });
  }
}
