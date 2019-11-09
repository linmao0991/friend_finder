const express = require("express");
const path = require("path");
const data = require("./app/data/friends.js")
const routing = require("./app/routing/htmlRoutes.js")

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

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  