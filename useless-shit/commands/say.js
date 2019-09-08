const Discord = require('discord.js');
const embed = require("../embedtemplate.js");

module.exports = {
	name: "say",
	description: "Makes me say stuff.",
	args: true,
	usage: "[server name||ID] [stuff]",
	ownerExclusive: true,
	execute(message, args){
		const Embed = new Discord.RichEmbed(embed(message));
		Embed.addField('Inline field title', 'Some value here', true);
		message.channel.send(Embed);
	},
};
