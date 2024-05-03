const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const chalk = require('chalk');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Shows info about a user.')
		.addMentionableOption(option => option
			.setName('member')
			.setDescription('The user to show info about.')
			.setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMentionable('member');
		const pres = member.presence;
		let act
		if (!pres) {
			act = 'Offline';
		} else {
			if (pres.activities[0].type === 0 ){
				act = `Playing ${pres.activities[0].name}`
			} else if (pres.activities[0].type === 1) {
				act = `Streaming ${pres.activities[0].details} on ${pres.activities[0].state}`
			} else if (pres.activities[0].type === 2) {
				act = `Listening to ${pres.activities[0].details}`
			} else if (pres.activities[0].type === 3 ) {
				act = `Watching ${pres.activities[0].state}`
			} else if (pres.activities[0].type === 4) {
				act = pres.activities[0].state
			} else if (pres.activities[0].type === 5) {
				act = `Competing in ${pres.activities[0].name}`
			} else {
				act = 'No activity'
			}
		}
		let stat
		if (!pres) {
			stat = 'Offline'
		} else {
			stat = pres.status
		}
		console.log(pres)
		const userInfo = new EmbedBuilder()
			.setColor(member.displayHexColor || 0xFF0800)
			.setTitle(member.displayName)
			.setDescription(`***Activity***\n\n${act}`)
			.setAuthor({ name: member.nickname })
			.setImage(member.user.avatarURL({ dynamic: true }))
			.addFields(
				{ name: 'Joined At', value: member.joinedAt.toLocaleString('en-GB'), inline: true },
				{ name: 'Account Created', value: member.user.createdAt.toLocaleString('en-GB'), inline: true },
				{ name: 'Status', value: stat, inline: true },
				{ name: 'Roles', value: member.roles.cache.map(role => role.toString()).join(', ') },
			)

		await interaction.reply({ embeds: [userInfo] });
	}
}