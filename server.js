/**
 * Created by sandeepchhapola on 15/7/14.
 */
var express = require('express'),
    path = require('path'),
    db = require("./module/dbObject.js"),
    app = express(),
    bodyParser = require('body-parser'),
    http = require("http"),
    session = require('express-session');


app.use(bodyParser());
app.use(session({secret: 'keyboard cat'}));
app.use(express.static(path.join(__dirname + "")));

app.post("/user", db.addUser);

app.get("/user", db.showUserList);

app.get("/user/:email", db.showUser);

app.put("/user/:email", db.addFriend);

app.get("/getUser", function(req,res){
    if(req.session.user)
    {
        res.send(req.session.user)
    }
});

app.get("/getFriendData/:email", db.getFriend);

app.post("/isValidUser", db.getSession);

http.createServer(app).listen(3000);
