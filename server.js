const express = require("express");
const path = require("path");
const data = require("./app/data/friends.js")
const routing = require("./app/routing/htmlRoutes.js")
const routesApi = require("./app/routing/apiRoutes.js");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

printData();

function printData(){
    console.log(data.friends);
}

//Set the public folder
app.use(express.static("app/public"));

app.get("/", function(req, res) {
    let directory = routing.routing(req.params.directory);
    res.sendFile(path.join(__dirname, directory));
});

app.get("/:directory", function(req, res) {
    let directory = routing.routing(req.params.directory);
    res.sendFile(path.join(__dirname, directory));
});

app.get("/getfriend/:friends", function (req, res){
    let name = req.params.friends;
    let userData = req.body;
    res.send(routesApi.getfriends(name, userData));
});


app.post("/getfriend/:friends", function (req, res){
    let name = req.params.friends;
    let userData = req.body;
    console.log(userData);
    res.send(routesApi.getfriends(name, userData));
});

app.get("/getquestion/questions", function (req, res){
    res.send(routesApi.getQuestions());
});

app.post("/modifyfriend/:value", function(req, res){
    let newFriend = req.body;
    routesApi.modifyfriends(req.params.value, newFriend);
    res.json(newFriend);
});

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
  