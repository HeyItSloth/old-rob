const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option => option.setName('command').setDescription('The command to reload.').setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('command').toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply({ content: `Command ${commandName} does not exist.` });
		}

		delete require.cache[require.resolve(`./${commandName}.js`)];

		try {
			interaction.client.commands.delete(command.data.name);
			const newCommand = require(`./${commandName}.js`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply({ content: `Successfully reloaded command ${commandName}.` });
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: `There was an error while reloading command ${commandName}:\n${error.message}` });
		}
	}
}