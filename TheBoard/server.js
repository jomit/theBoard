var http = require("http");
var express = require("express");
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')

var app = express();
var controllers = require("./controllers");  //will use index.js in the controllers foler
var flash = require("connect-flash");

//var ejsEngine = require("ejs-locals");

//Setup the view engine
//app.set("view engine", "jade");
//app.engine("ejs", ejsEngine);  //support master pages
//app.set("view engine", "ejs"); //ejs view engine
app.set("view engine", "vash");


// set the public static resources folder
app.use(express.static(__dirname + "/public"));


//OPT INTO SERVICES
//======================================
//app.use(express.urlencoded());  -- Not working as middleware is not bundles with Express anymore
//https://github.com/senchalabs/connect#middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret : "JomitTheBoard"}));
app.use(flash());
app.use(bodyParser.json());

var auth = require("./auth");
auth.init(app);


// Map the routes
controllers.init(app);

//app.get("/", function (request, response) { 
//    //response.send("<html><body><h1>Welcome to express 13</h1></body></html>");
//    //response.render("ejs/index", { title : "Express + EJS" });
//    response.render("index", { title : "Express + Vash" });
//});

app.get("/api/users", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send({ name: "jomit", isValid: true, group: "Admin" });
})

//app.get("/api/sql", function (req, res) {
//    var msnodesql = require("msnodesql");
//    var connString = "Driver={SQL Server Native Client 11.0};Server=.;Database=coeconnect;Trusted_Connection={Yes}";

//    msnodesql.query(connString, "select * from roles", function (err, results) { 
//        res.send(results);
//    });
//});

var server = http.createServer(app);
server.listen(3000);

//SOCKET IO INTEGRATION
var updater = require("./updater");
updater.init(server);