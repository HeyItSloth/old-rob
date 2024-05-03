const chalk = require('chalk');
const { Events, PresenceUpdateStatus, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setPresence({
			status: PresenceUpdateStatus.Online,
			activities: [{
				name: 'a game of Warhammer!',
				type: ActivityType.Playing,
			}]
		})
		const d = new Date()
		const time = Date.now()
		console.log(chalk.blue(`Ready at ${d.toLocaleString(time)}`))
	}
}