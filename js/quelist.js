$( document ).ready(function() {
    //  eventid = 1234;
    //  email = "mohini.koli@24framesdigital.com";
        var eventid = GetParameterValues('eventid');  
        var email = GetParameterValues('email');  
        function GetParameterValues(param) {  
            var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
            for (var i = 0; i < url.length; i++) {  
                var urlparam = url[i].split('=');  
                if (urlparam[0] == param) {  
                    return urlparam[1];  
                }  
            }  
        }  
   
    var quelist;
   var formid= {"form_id": "33"};
    $.ajax({
        url: "https://cdn.24fd.com/eapp/FeedbackSurvey/GET_VCM_Feedback_Survey_Question_List",
        
        type: 'POST',
        data: JSON.stringify(formid),
        contentType: "application/json; charset=utf-8",
            dataType: "json",
       success:function(data){
         quelist =  JSON.parse(JSON.stringify(data)).dataObject;
         sessionStorage.setItem("quelist", JSON.stringify(quelist));
         quelist.forEach((val, index) => {

            console.log(' Value: ' + val.question_type_id);
            if (val.question_mandatory == "1") {
                star = "*";
            }
            item = $('.quelistdata');
            if (val.question_type_id == "1") {
              
                
                input = '<div class="col-sm-12 feedbackBox" > <p class="questions">' + val.question + star + '</p> <div><label class="mr-3"> <input type="radio" id='+val.question_id+' class="option-input radio" name="'+val.question_id+'" value="yes" /> Yes.</label> <label class="mr-3"><input type="radio" class="option-input radio" name="'+val.question_id+'" value="no"/> No. </label></div>';
                item.append(input);
                if (val.question_mandatory == "1") {
                    $('#'+val.question_id).attr('required', true);
                }
                console.log(input);
        
            }
            if (val.question_type_id == "2") {
                input = '<div class="col-sm-12 feedbackBox" > <p class="questions">' + val.question + star + '  </p> <div class="rating"> <input type="radio"     name="rate6" value="10" id='+val.question_id+'> <label for="'+val.question_id+'">10</label> <input type="radio"     name="rate6" value="9" id="rate69"> <label for="rate69">9</label> <input type="radio"     name="rate6" value="8" id="rate68"> <label for="rate68">8</label> <input type="radio"     name="rate6" value="7" id="rate67"> <label for="rate67">7</label> <input type="radio"     name="rate6" value="6" id="rate66"> <label for="rate66">6</label> <input type="radio"     name="rate6" value="5" id="rate65"> <label for="rate65">5</label> <input type="radio"     name="rate6" value="4" id="rate64"> <label for="rate64">4</label> <input type="radio"     name="rate6" value="3" id="rate63"> <label for="rate63">3</label> <input type="radio"     name="rate6" value="2" id="rate62"> <label for="rate62">2</label> <input type="radio"     name="rate6" value="1" id="rate61"> <label for="rate61">1</label> </div> <div style="margin-top:0.5%;"> <label id="rate6-error" class="error rateerror'+val.question_id+'" style="display:none;" for="rate6">Please Rate.</label> </div> </div> ';
       
                item.append(input);
                if (val.question_mandatory == "1") {
                    $('#'+val.question_id).attr('required', true);
                }
                console.log(input);
            }
            if (val.question_type_id == "3") {
                opt = [val.option2, val.option3, val.option4, val.option5, val.option6];
        
               input = ' <div class="col-sm-12 feedbackBox" > <p class="questions">' + val.question + star + '  <br> </p> <div>';
               input +='<label class="mr-3"><input type="radio" id="'+val.question_id+'" class="option-input radio "  name="'+val.question_id+'" value=' + val.option1 + '>' + val.option1 + '  </label>';
                opt.forEach((value, index) => {
                
                    if (value != '') {
                        console.log(value);
                        input += ' <label class="mr-3"><input type="radio" class="option-input radio "  name="'+val.question_id+'" value=' + value + '>' + value + '  </label>';
                    }
                });
                input += ' </div> </div>';
                item.append(input);
               if (val.question_mandatory == "1") {
                 $('#'+val.question_id).attr('required', true);
                }
                console.log(input);
            }
            if (val.question_type_id == "4") {
                opt = [ val.option2, val.option3, val.option4, val.option5, val.option6];
        
        
                input = ' <div class="col-md-12 feedbackBox" > <p class="questions">' + val.question + star + ' </p> <div> ';
                input +='<label class="mr-3"> <input type="checkbox" id="'+val.question_id+'" name="'+val.question_id+'" class="option-input checkbox" value=' + val.option1 + ' /> ' + val.option1 + '  </label>';
                opt.forEach((value, index) => {
        
                    if (value != '') {
                        console.log(value);
                        input += '<label class="mr-3"> <input type="checkbox" name="'+val.question_id+'" class="option-input checkbox" value=' + value + ' /> ' + value + '  </label>';
                    }
                });
                input += ' <div style="margin-top:0.5%;"><label id="" class="error checkboxerror'+val.question_id+'" style="display:none;" >You must check at least one checkbox.</label> </div> </div> </div>';
                item.append(input);
               
                console.log(input);
            }
            if (val.question_type_id == "5") {
                input = ' <div class="col-sm-12 feedbackBox" > <p class="questions">' + val.question + star + '</p> <textarea rows="2" class="form-control required" id="'+val.question_id+'" name="suggestion" maxlength="100"></textarea> </div>';
                item.append(input);
                if (val.question_mandatory == "1") {
                    $('#'+val.question_id).attr('required', true);
                   }
                console.log(input);
        
            }
            // val.forEach(()=> {console.log('Index: '+val.question)});
        });
        }
    });
});

var formresult=[];

$('#form3').on('submit', function (e) {
      quelist1= JSON.parse(JSON.stringify(sessionStorage.getItem('quelist')));
      alert(quelist1);
});

