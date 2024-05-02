const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const chalk = require('chalk');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(chalk.red(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property!`));
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(chalk.blueBright(`> Started refreshing ${commands.length} application (/) commands`));

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands }
		);

		console.log(chalk.greenBright(`> Successfully reloaded application (/) commands`));
	} catch (error) {
		console.error(chalk.redBright(`> An error occurred while reloading application (/) commands`));
		console.error(error);
	}
})();