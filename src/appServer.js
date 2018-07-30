var express = require('express');
var http = require('http');
//Definición de rutas del servidor
var routes = require("./config/routes");
const chalk = require('chalk');

var cookieParser = require('cookie-parser');

var app = express();
//Configuración puerto del servidor
app.set('port', process.env.PORT || 3000);
//var port = process.env.PORT || 3000;
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//rutas
routes(app);

//servidor
http.createServer(app).listen(app.get('port'), function(){
	console.log(chalk.cyan('Express server listening on port ' + app.get('port')));
});

console.log("Environment " + app.get("env"));
var config = require('./config/config.json')[app.get('env')];
console.log(config);

module.exports = app;