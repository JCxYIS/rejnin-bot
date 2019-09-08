const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");

module.exports = {
	name: "test",
	description: "aaaa",
	ownerExclusive: "true",
	execute(message, args){
		const Embed = new Discord.RichEmbed(embed(message));
		Embed.addField('Inline field title', 'Some value here', true);
		message.channel.send(Embed);
	},
};
