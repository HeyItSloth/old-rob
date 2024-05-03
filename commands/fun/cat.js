const { SlashCommandBuilder } = require('discord.js');
const chalk = require('chalk');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Meow!'),
	async execute(interaction) {
		await interaction.deferReply()
		const req = await fetch('https://api.thecatapi.com/v1/images/search')
		const res = await req.json()
		interaction.followUp({ files: [res[0].url] })
	}
}