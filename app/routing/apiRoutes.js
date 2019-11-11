const friendData = require("../data/friends");
const questionData = require("../data/questions.js")

exports.getfriends = function(value, data){
    switch (value){
        case "all":
            return friendData.friends;
        case "findbestfriend":
            return findBestfriend(data);
        default:
            return searchFriends(value);
    }
}

exports.modifyfriends = function(value, data){
    switch (value){
        case "add":
            addFriend(data);
            return data;
        case "remove":
        case "update":
        default:
            break;
    }
}

exports.getQuestions = function(){
    return questionData.questions;
}

function findBestfriend(userData){
    let friendArray = friendData.friends;
    console.log(friendArray);
    let matchArray = [];
    let bestFriendMeter = 50;
    var bestestFriends =[];
    console.log(userData);
    console.log("searching best friend");
    for ( let i = 0; i < friendArray.length; i++){
        if( userData.name !== friendArray[i].name){
        console.log("Looking at: "+friendArray[i].name);
            let index = i;
            let compatibility = 0;
            let percentage = 0;
            console.log("Checking scores"+friendArray[index].scores.length);
            for (let x = 0; x < friendArray[index].scores.length; x++){
                console.log("Score "+x+" = "+compatibility+" + "+userData.scores[x]+" - "+friendArray[index].scores[x]);
                compatibility += (Math.abs(userData.scores[x] - friendArray[index].scores[x]));
            }

            console.log("Compatibility Score of: "+friendArray[i].name+" : "+compatibility);
            if( compatibility <= bestFriendMeter){
                bestFriendMeter = compatibility;
                percentage = 100-(compatibility*2);
                matchArray.unshift({"friendIndex": i, "compatiblity": percentage});
            }else{
                percentage = 100-(compatibility*2);
                matchArray.push({"friendIndex": i, "compatiblity": percentage});
            }
            console.log(friendArray[i].name+" is a: "+percentage+"% Match");
            console.log("bestfriend Meter: "+bestFriendMeter);
            console.log("==============================")
        }
    }
    
    console.log("Finding best match");
    for ( let i = 0; i < matchArray.length; i++){
        let index = matchArray[i].friendIndex;
        let compatibility = matchArray[i].compatiblity;
        bestestFriends.push(friendArray[index]);
        bestestFriends[i].match = compatibility;
    }

    console.log("Match Found");
    console.log(bestestFriends);
    return bestestFriends;
}

function searchFriends(value){
    let name = value;
    for ( let i = 0; i < friendData.friends.length; i++){
        if( friendData.friends[i].name.toLowerCase() === name.toLowerCase() ){
            return friendData.friends[i];
        }
    }
    return ("No Data Found");
}

function addFriend(data){
    let newFriend = data;
    friendData.friends.push(newFriend);
    return ("Friend Added");
}

function removeFriend(data){

}

function updateFriend(data){

}

