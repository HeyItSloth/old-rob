const { SlashCommandBuilder, codeBlock } = require('discord.js');
const chalk = require('chalk');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ascii')
		.setDescription('Converts text to ASCII art.')
		.addStringOption(option => option
			.setName('text')
			.setDescription('The text to convert.')
			.setRequired(true)),
	async execute(interaction) {
		const text = interaction.options.getString('text');
		const figlet = require('figlet');
		figlet(text, (err, data) => {
			if (err) {
				console.log(chalk.red(`[ERROR] ${err}`));
				interaction.reply({ content: 'There was an error while converting the text!', ephemeral: true });
			} else {
				interaction.reply({ content: `${codeBlock(data)}` });
			}
		})
	}
}