const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");

module.exports = {
	name: "ping",
	description: "Sends current ping of the bot.",
	execute(message, args) {
		const Embed = new Discord.RichEmbed(embed(message));
		Embed.setTitle(`Average ping: \`${Math.round(message.client.ping)}\`ms`);
		Embed.setDescription(`Last 3 pings: ${message.client.pings.map(ping => `\`${Math.round(ping)}\``).join(" ")}`);
		message.channel.send(Embed);
	},
};
