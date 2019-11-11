$(document).ready(function(){
    getQuestions();

    function getQuestions(){
        $.get("/getquestion/questions", function(data){
            console.log(data);
        }).then(function(data){
            let radioChoices = [
                "Strongly Disagree",
                "Disagree",
                "I feel nothing",
                "Agree",
                "Strongly Agree"
            ]
            $("#survey_form").attr("questioncount",data.length);

            let friendName = $("<div>");
            friendName.addClass("form-group");
            friendName.append('<label for="friend_name">Please enter your name.</label>','<input type="text" class="form-control" id="friend_name">')

            let friendImage = $("<div>");
            friendName.addClass("form-group");
            friendImage.append('<label for="friend_image">Please enter a link to image for your profile image.</label>','<input type="text" class="form-control" id="friend_image">');

            $("#survey_form").append(
                friendName, 
                friendImage,
                "<br><h5>Survey Questions</h5>",
                "<hr>");

            for ( let i = 0; i < data.length; i++){
                let questionDiv = $("<div>")
                questionDiv.addClass("p-2").attr("id","questiongroup_"+i).append("<h6>"+data[i]+"</h6>");
                for (let x = 0; x < 5; x++){
                    let div = $("<div>");
                    $(div).addClass("form-group form-check");

                    let input = $("<input>");
                    $(input).addClass("form-check-input").attr({"type":"radio","name":"question_"+i,"id":"q"+i+"v"+x,"value":x+1});

                    let label = $("<label>");
                    $(label).addClass("form-check-label").attr("for","q"+i+"v"+x).text(radioChoices[x]);

                    $(div).append(input, label);
                    $(questionDiv).append(div);
                }
                $("#survey_form").append(questionDiv,"<hr>");
            }

        });
    };

    $("#submit_button").click(function(){
        console.log("Clicked");
        let questionCount = $("#survey_form").attr("questioncount");
        console.log(questionCount);
        let result = [];
        let incomplete = false;

        for ( let i = 0; i < questionCount; i++){
            if( !$("input[name = question_"+i+"]").is(":checked")){
                $("#questiongroup_"+i).addClass("border border-danger rounded");
                incomplete = true;
            }else{
                $("#questiongroup_"+i).removeClass("border border-danger rounded")
            }
        }

        if( incomplete === false){
            for ( let i = 0; i < questionCount; i++){
                let questionValue = $("input[name = question_"+i+"]:checked").val();
                result.push(parseInt(questionValue));
            }
            let newFriend = {
                name: $("#friend_name").val().trim(),
                photo: $("#friend_image").val().trim(),
                scores: result
            }
            console.log(newFriend);

            $.post("/modifyfriend/add", newFriend)
                .then(function(data){
                    $("#survey_form").trigger("reset");
                    $("#survey_form").empty();
                    $("#submit_div").hide();
                    findMyBestFriend(data);
                });
        }else{
            incompleteSurvey();
        }
    });

});

function findMyBestFriend(myData){
    console.log("Finding best friend.")
    $.post("/getfriend/findbestfriend", myData)
        .then(function(data){
            showBestestFriends(data)
    })
}

function incompleteSurvey(){
    alert("Survery is incomplete. Please complete highlighted questions.");
}

function showBestestFriends(friendData){
    let cardDeck = $("<div>")
    cardDeck.addClass("card-deck");
    for (let i = 0; i < 1; i++){
        let cardDiv = $("<div>");
        cardDiv.addClass("card border border-rounded m-2 w-20").attr({"style":"width: 18rem;"})

        let cardImg = $("<img>");
        cardImg.addClass("card-img-top rounded mx-auto d-block").attr("src",friendData[i].photo);

        let bodyDiv = $("<div>");
        bodyDiv.addClass("card-body");
        bodyDiv.append(
            "<h5>"+friendData[i].name+"</54>",
            "<h6 class='card-text'>Compatibility: "+friendData[i].match+"%</h6>"
        )

        let contactButton = $("<button>")
        contactButton.addClass("btn btn-warning").attr({"type":"button","id":"contact_"+friendData[i].name}).html("Message")

        cardDiv.append(cardImg, bodyDiv, contactButton);
        cardDeck.append(cardDiv);
    }
    $("#survey_results").append(cardDeck);
}