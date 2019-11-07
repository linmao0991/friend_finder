const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/:directory", function(req, res) {
    let directory = req.params.directory;
    switch (directory){
        case "home":
        case "home.html":
            res.sendFile(path.join(__dirname, "/app/public/home.html"));
            break;
        case "survey":
        case "survey.html":
            res.sendFile(path.join(__dirname, "/app/public/survey.html"));
        default:
            res.sendFile(path.join(__dirname, "/app/public/home.html"));
    }
});

app.get("/survey")

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  