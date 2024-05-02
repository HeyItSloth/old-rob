const chalk = require('chalk');
const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		const d = new Date()
		const time = Date.now()
		console.log(chalk.blue(`Ready at ${d.toLocaleString(time)}`))
	}
}