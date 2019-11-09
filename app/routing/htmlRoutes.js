exports.routing = function(directory){
    switch (directory){
            case "home":
            case "home.html":
                return ("/app/public/home.html");
            case "survey":
            case "survey.html":
                return("/app/public/survey.html");
            default:
                return("/app/public/home.html");
    }
}