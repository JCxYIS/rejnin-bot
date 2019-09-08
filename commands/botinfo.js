//avatar createdat tag uptime guilds ping
const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");
const convert = require("../bot-modules/secondstimeconvert.js")

module.exports = {
	name: "botinfo",
	description: "Sends info about me!",
	aliases: ["bot", "binfo"],
	execute(message, args){
		const Embed = new Discord.RichEmbed(embed(message));
		const Client = message.client;

		Embed.setTitle("Hi! I'm a bot created by my master `ninjer#6366`! Nice to meet you!")
		.setDescription("My code is written in discord.js. Ninjer started developing me in July of 2019. I think he's doing a great job! \n*spoiler: no im not lol i want to kms*")
		.setImage(Client.user.displayAvatarURL)
		.addField("Tag", Client.user.tag)
		.addField("Guilds", Client.guilds.size)
		.addField("Ping", `${Math.round(Client.ping)}ms`, true)
		.addField("Uptime", convert(Math.floor(Client.uptime / 1000)), true)
		.addField("Created at", Client.user.createdAt, true)
		.addField("Avatar", "\u200b");
		message.channel.send(Embed);
	},
};
