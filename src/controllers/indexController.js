const chalk = require('chalk');
var indexDAO = require("./../daos/indexDAO");

function saludar(req,res) {
	console.log(chalk.yellow("IndexController.js: saludar();"));
	res.json({result:true,mensaje:indexDAO.saludar()});
}

module.exports = {
	saludar:saludar,
};
