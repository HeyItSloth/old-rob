const { Events, EmbedBuilder, ClientUser } = require('discord.js');
const chalk = require('chalk');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		console.log(chalk.yellowBright(`=> ${member.user.username} (${member.id}) has joined the server.`));
		const embed = new EmbedBuilder()
			.setColor(0x0080FF)
			.setTitle(member.displayName)
			.setURL(member.user.avatarURL())
			.setThumbnail(member.user.avatarURL({ dynamic: true }))
			.setDescription(`Welcome to the server, ${member}!`)
			.setFooter({ text: `ID: ${member.id}` })
			.setTimestamp();
		const welc = await member.guild.systemChannel.send({ embeds: [embed] });
		const self = welc.author;

		const welcome = new EmbedBuilder()
			.setColor(0xFF0066)
			.setAuthor({ name: self.displayName, iconURL: self.avatarURL({ dynamic : true }), url: 'https://www.ancientrobotgames.co.uk/' })
			.setTitle('Welcome!')
			.setURL('https://www.ancientrobotgames.co.uk/')
			.setDescription('Welcome to the **Ancient Robot Games** Discord server!\n\n We\'re located at the [Foot of the Walk in Leith](https://maps.app.goo.gl/BkRGVWJZ26hyZqEdA), and we specialise in boardgames and roleplaying games! Feel free to browse our extensive board games library, tabletop RPGs, and minatures!\n\n Before you continue, make sure you check out the rules below!')
			.addFields(
				{ name: 'Rule 1', value: 'No Harassment / Racism / Sexism, etc.', inline: true },
				{ name: 'Rule 2', value: 'No Spamming / Advertising / Self Promotion', inline: true },
				{ name: 'Rule 3', value: 'No NSFW content', inline: true },
				{ name: 'Rule 4', value: 'Respect others. If someone asks you to stop doing something, stop.', inline: true },
				{ name: 'Rule 5', value: 'Do not impersonate other members or intentionally edit your messages to mislead others', inline: true },
				{ name: 'Rule 6', value: 'Be excellent to each other', inline: true },
			)
			.setTimestamp()
		await member.send({ embeds: [welcome] });
	}
}