var mongoose = require('mongoose');
var urlstring = "mongodb://localhost/YoNinjaDatabase";
var dbconnection=mongoose.createConnection(urlstring);

var usersDatabaseSchema = {
    email: String,
    nickName:String,
    password: String,
    friends:[]
};
var usersSchema = new mongoose.Schema(usersDatabaseSchema);
var userModel = dbconnection.model("YoNinjaUsers", usersSchema);

var addUser = function (req, res) {
    new userModel(req.body).save(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.end("New User added: " + req.body);
    });
};
var addFriend = function (req, res) {
    userModel.update({email: req.params.email}, {$push: {friends:req.body} }, function callback(err, numAffected) {
        res.end("Number of Docs affected: " + numAffected);
    });
};
var showUser = function (req, res) {
    userModel.findOne({email: req.params.email}).exec(function (err, result) {
        res.end(JSON.stringify(result));
    });
};

var showUserList = function (req, res) {
    userModel.find({}).exec(function (err, result) {
        res.header("Access-Control-Allow-Origin", 'http://localhost:63342');
        res.end(JSON.stringify(result));
    });
};

var getFriend = function (req, res) {
    userModel.findOne({email: req.params.email}).exec(function (err, result) {
        res.end(JSON.stringify(result));
    });
};
var getSession = function (req, res) {
    userModel.findOne({email: req.body.email}).exec(function (err, result) {
        if(result.password==req.body.pass)
        {
            req.session.user=result;
            res.end(JSON.stringify({isUserValid:true}));
        }else {
            res.end(JSON.stringify({isUserValid: false}));
        }
    });
};


module.exports.addUser = addUser;
module.exports.addFriend = addFriend;
module.exports.showUser = showUser;
module.exports.showUserList = showUserList;
module.exports.getFriend = getFriend;
module.exports.getSession = getSession;

