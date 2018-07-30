var pjson = require('./../../package.json');

function saludar(){
	return "API de TweetsLanding versión " +pjson.version;
}

module.exports = {
	saludar: saludar,
};