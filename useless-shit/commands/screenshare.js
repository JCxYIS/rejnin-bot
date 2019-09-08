const Discord = require('discord.js');
const embed = require("../embedtemplate.js");

module.exports = {
	name: "screenshare",
	description: "Sends a link that enables screensharing in the current voice channel. You need to be in a voice channel to be able to use this command.",
	guildOnly: true,
	execute(message, args) {
		const Embed = new Discord.RichEmbed(embed(message));
		if (!message.member.voiceChannel){
			return message.channel.send("You need to be in a voice channel to use this command. Dummy.");
		}
		Embed.setDescription(`Click [here](https://discordapp.com/channels/${message.guild.id}/${message.member.voiceChannelID}) to enable screensharing for **${message.member.voiceChannel.name}**.`);
		message.channel.send(Embed);
	},
};    