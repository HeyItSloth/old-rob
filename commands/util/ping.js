const { SlashCommandBuilder, ClientUser } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		console.log(client)
		await interaction.reply('Pong!');
	}
}