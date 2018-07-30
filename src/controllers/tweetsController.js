const chalk = require('chalk');

var tweetDAO = require("./../daos/tweetDAO");

function obtenerToken(req,res){
	console.log(chalk.yellow("TweetsController.js: obtenerToken();"));

	tweetDAO.obtenerToken(function(result,mensajes,token){
		console.log(chalk.green(result,mensajes,token));
		if(result){
			console.log(chalk.red(result,mensajes,token));
		} else {
			console.log(chalk.cyan(result,mensajes,token));
		}
		res.json({result:result,mensajes:mensajes,token:token});
	});

}

function obtenerTweets(req,res) {
	console.log(chalk.yellow("TweetsController.js: obtenerTweets();"));
	console.log(req.session);

	if(!req.session.token){
		console.log("No existe token");

		tweetDAO.obtenerToken(function(result,mensajes,token){
			console.log(chalk.green(result,mensajes,token));
			if(result){
				//console.log(chalk.red(result,mensajes,token));
				console.log("Token obtenido");
	            req.session.token = token;
                req.session.save(function(err) {
                	if(err){
	                    console.log(chalk.red(err));
                	}
                    console.log("Session Saved");
                    console.log(req.session);
                });
				//Obtener tweets desde la API
				tweetDAO.obtenerTweets(token,function(result,mensajes,tweets){
					res.json({result:result,mensajes:mensajes,tweets:tweets});		
				});
			} else {
				console.log("Token no obtenido");
				res.json({result:result,mensajes:mensajes,token:token});
			}
		});

	} else {
		console.log("Ya existe token, obtener tweets directamente");
		//Obtener tweets desde la API
		tweetDAO.obtenerTweets(req.session.token,function(result,mensajes,tweets){
			res.json({result:result,mensajes:mensajes,tweets:tweets});		
		});
	}

}

module.exports = {
	obtenerToken:obtenerToken,
	obtenerTweets:obtenerTweets,
};
