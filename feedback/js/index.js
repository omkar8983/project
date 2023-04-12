$('.loading').hide();

/*	var ref_this = $("ul.nav-pills li.active a");
		if(ref_this.data("id")==2){
		$(".poll-ul").removeClass("blink_me");
	}
$(".poll-ul").click(function(){
 $(".poll-ul").removeClass("blink_me");
});	
function blinkMe() {
	$(".poll-ul").addClass("blink_me");
	
	var ref_this = $("ul.nav-pills li.active a");
		if(ref_this.data("id")==2){
		$(".poll-ul").removeClass("blink_me");
	}
	$(".poll-ul").click(function(){
 $(".poll-ul").removeClass("blink_me");
});
	
	} */
function notifyMe() {
	
      $("#success-alert").fadeTo(10000, 500).slideUp(500, function() {
      $("#success-alert").slideUp(500);
    });
	}
	function notifyMe1() {
	
      $("#success-alert1").fadeTo(10000, 500).slideUp(500, function() {
      $("#success-alert1").slideUp(500);
    });
	}
	
function callpoll() {



    (function () {

        var questionCounter = 0; //Tracks question number
        var selections = []; //Array containing user choices
        var quiz = $('#quiz'); //Quiz div object

        // Display initial question
        displayNext();

        // Click handler for the 'next' button
        $('#next').off().on('click', function (e) {
            e.preventDefault();

            // Suspend click listener during fade animation
            if (quiz.is(':animated')) {
                return false;
            }
            choose();

            // If no user selection, progress is stopped
            if (isNaN(selections[questionCounter])) {
                $(".quizalerts").html("<div class='alert alert-warning'><strong>Warning!</strong> You must select an answer to view the next action.</div>")
                $(".alert-warning").fadeTo(2000, 500).slideUp(500, function () {
                    $(".alert-warning").slideUp(500);
                });
            } else {
                questionCounter++;
                //alert(questionCounter);
                displayNext();
            }
        });




        // Animates buttons on hover
        $('.button').on('mouseenter', function () {
            $(this).addClass('active');
        });
        $('.button').on('mouseleave', function () {
            $(this).removeClass('active');
        });

        // Creates and returns the div that contains the questions and 
        // the answer selections
        function createQuestionElement(index) {
            var qElement = $('<div>', {
                id: 'question'
            });

            var header = $('<h5>Contest Question ' + (index + 1) + ':</h5>');
           // qElement.append(header);

            var question = $('<h4>').append(questions[index].question);
            qElement.append(question);

            var radioButtons = createRadios(index);
            qElement.append(radioButtons);

            return qElement;
        }

        // Creates a list of the answer choices as radio inputs
        function createRadios(index) {
//alert(questions[index].question);
console.log(1);
            var ques = questions[index].question;
            var array1 = ques.split(':');

            if (array1[0] == "Result of ") {
console.log(2);
                $("#redot").show();
                $("#redot1").css("background-color", "#f58634");
                var radioList = $('<ul>');
                var item;
                var input = '';
                for (var i = 0; i < questions[index].choices.length; i++) {
                    item = $('<li>');
                    var array2 = questions[index].choices[i].split('-');
					console.log(array2);
					if(array2[0]!="nooption1" && array2[0]!="nooption2")
					{
                   input = '<label style="word-wrap: break-word;">'+ array2[0] + '</label>: <label style=""> <p style="     margin: 5px;font-size: 1.2em;   padding: 5px 0px; width:' + array2[1] +'; background-color:#f58634;     color: #070e18;">'+ array2[1] +'</p></label>';
                   

                    item.append(input);
                    radioList.append(item);
					}
                }
                questionCounter = 1000001;
                return radioList;


            }
            else if (array1[0] == "Contest will start shortly") {
console.log(3);               
			   $("#redot").hide();
                $("#redot1").css("background-color", "#f58634");
                var radioList = $('<ul>');
                var item;
                var input = '';
                for (var i = 0; i < questions[index].choices.length; i++) {
                    item = $('<li>');
                    input = '<label>';
                    input += questions[index].choices[i] + '</label>';
                    item.append(input);
                    radioList.append(item);
                }
                questionCounter = 1000001;
                return radioList;



            }
            else if (array1[0] == "Thank you for participating in the contest. We will soon announce the winner. Stay tuned with Huawei on Facebook.") {
console.log(4);               
			   $("#redot").hide();
                $("#redot1").css("background-color", "#f58634");
                var radioList = $('<ul>');
                var item;
                var input = '';
                for (var i = 0; i < questions[index].choices.length; i++) {
                    item = $('<li>');
                    input = '<label>';
                    input += questions[index].choices[i] + '</label>';
                    item.append(input);
                    radioList.append(item);
                }
                questionCounter = 1000001;
                return radioList;



            }
            else {
				console.log(5);
               $("#redot").show();
                $("#redot1").css("background-color", "#f58634");
                var radioList = $('<ul>');
                var item;
                var input = '';
              //  alert(1);
                for (var i = 0; i < questions[index].choices.length; i++) {
                    item = $('<li>');
					console.log(questions[index].choices);
					// if(questions[index].choices[i]!="nooption1" && questions[index].choices[i]!="nooption2" && questions[index].choices[i]!="nooption3" && questions[index].choices[i]!="nooption4")
					if (questions[index].choices[i] != "") 
                    {
                       // alert('2:'+questions[index].choices[i] );
                        input = '<input type="radio" name="answer" value=' + i  + ' />'+questions[index].choices[i];
                        // input += questions[index].choices[i] + '</label>';
                        item.append(input);
                        radioList.append(item);
                }
				}
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
                $('#question').remove();
                //alert(questionCounter + "--" + questions.length);
                if (questionCounter < questions.length) {
                    var nextQuestion = createQuestionElement(questionCounter);
                    quiz.append(nextQuestion).fadeIn();
                    if (!(isNaN(selections[questionCounter]))) {
                        $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                    }
                    console.log('questionCounter:' + questionCounter)
                    
                    if (questionCounter === 1) {
                       
                        $('#start').hide();
                    } else if (questionCounter === 0) {

                        
                        $('#next').show();
                        $('#msg').hide();
                        $('#start').hide();
                    }
                    else if (questionCounter === 1000001) {

                      
                        $('#next').hide();
                        $('#msg').hide();
                        $('#start').hide();

                    }


                } else {

                    quizend();


                }

                //quizend();
            });
        }

        function quizend() {
         
            displayScore();
            $('#quiz').html("");

            $('#question').remove();
            $('#quiz-time-left').hide();
            quiz.append('<h4 style="text-align: center;">Next contest question will appear soon.</h4>').fadeIn();
            polldone = "1";
            questionCounter = 0;
            selections = [];
            document.cookie = "pollpublishtime=" + publishtime;
   
                $("#next").hide();
                $("#start").hide();
                $("#msg").show();
                $("#redot").hide();
                $("#redot1").css("background-color", "#005587");
                $('#quiz').html("");
         /*   setTimeout(function () {
             

            }, 50); */


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
            var score = $('<p>', { id: 'question' });
            var answers = "";
            var numCorrect = 0;
            for (var i = 0; i < selections.length; i++) {

                answers = answers + "~" + questions[i].question + "-" + questions[i].choices[selections[i]];
                savepoll(questions[i].questionID,questions[i].question, questions[i].choices[selections[i]]);
            }
            //alert(answers);
            

        }
    })();

    function savepoll(pid,ques,ans) {
       
        var obj = {};


        obj.replaceurl = $.trim(window.location.href);
        obj.replaceurl = obj.replaceurl.replace('https://', '');
        obj.replaceurl = obj.replaceurl.substring(obj.replaceurl.indexOf("/"));
        obj.replaceurl = obj.replaceurl.substr(0, obj.replaceurl.lastIndexOf("/") + 1);
        var xyz = accessCookie(obj.replaceurl);
        var str_array = xyz.split('~');
        var abc = {
            "name": str_array[0],
            "email": str_array[1],
            "eventid": str_array[2],
            "Replaceurl": obj.replaceurl,
            "Question": pid,
            "Answer": ans

        }
// alert(JSON.stringify(abc));
        $.ajax({
            type: "POST",
            url: "data/all_webmethods.aspx/AddPollAnsData",

            //url: "../home/AddPollAnsData",
            data: JSON.stringify(abc),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                //alert(result.d);
            }
        });
    }

}


