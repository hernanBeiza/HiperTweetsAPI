const chalk = require('chalk');
var http = require('http');
var request = require('request');

var configJSON = require('./../config/config.json');

function obtenerToken(callbackObtener){
	var postData = {
		"grant_type": "client_credentials"
	};
	//Datos conexión APITwitter
	let userName = "";
	let password = "";
    //var auth = "Basic " + new Buffer(userName + ":" + password).toString("base64");
	request({
	    url: "https://api.twitter.com/oauth2/token",
	    method: "POST",
	    /*
	    headers: {
    	    "Authorization": auth
	    },
	    */
	    //json: true,   // <--Very important!!!
	    //body: postData
	    formData: postData
	}, function (error, response, body){
	    //console.log(body);
	    if(body.error!=null){
	    	console.log("Error encontrado");
	    	var error = body.errors[0];
	    	console.log(chalk.red(JSON.stringify(error)));
	    	callbackObtener(false,error.message,null);
	    } else {
    	    var data = JSON.parse(body);
		    console.log(chalk.cyan(data.access_token));
	    	callbackObtener(true,"Token recibido",data.access_token);
	    }
	}).auth(userName, password, true);
}

function obtenerTweets(token,callbackObtener){

	var hashtag = "bancodechile";

	request({
	    url: "https://api.twitter.com/1.1/search/tweets.json?q=%23"+hashtag,
	    method: "GET",
	    /*
	    headers: {
    	    "Authorization": auth
	    },
	    */
	    //json: true,   // <--Very important!!!
	    //body: postData
	    //formData: postData
	}, function (error, response, body){
	    //console.log(body);
	    if(body.error!=null){
	    	console.log("Error encontrado");
	    	callbackObtener(false,"No se encontraron tweets",null);
	    } else {
    	    var data = JSON.parse(body);
		    //console.log(chalk.cyan(data.statuses));
		    var tuits = [];
		    var tweets = data.statuses;
		    for (var i = 0; i < tweets.length; i++) {
		    	let tweet = tweets[i];
		    	let tuit = {id:tweet.id,usuario:tweet.user.name,mensaje:tweet.text};
		    	tuits.push(tuit);
		    }
	    	callbackObtener(true,"Tweets encontados",tuits);
	    }
	}).auth(null, null, true, token);

}

module.exports = {
	obtenerToken: obtenerToken,
	obtenerTweets: obtenerTweets,
};
