//avatar createdat tag uptime guilds ping
const Discord = require('discord.js');
const embed = require("../embedtemplate.js");

module.exports = {
	name: "botinfo",
	description: "Sends info about me!",
	aliases: ["bot"],
	execute(message, args){
		const Embed = new Discord.RichEmbed(embed(message));
		const Client = message.client;

		function secondsTimeConvert(sec){
			const units = [" days", " hours", " minutes", " seconds"];
			const days = Math.floor(sec / (24 * 3600));
			const hours = Math.floor((sec % (24 * 3600)) / 3600);
			const minutes = Math.floor((sec % 3600) / 60);
			const seconds = sec % 60;
			let time = [days, hours, minutes, seconds];

			for (i = 0; i < 4; i++){
				if (time[i] === 0){
					time[i] = "";
				}
				else time[i] = " " + time[i] + units[i]; 
			};

			return time.join("").trim();
		}

		Embed.setTitle("Hi! I'm a bot created by my master `ninjer#6366`! Nice to meet you!");
		Embed.setImage(Client.user.avatarURL);
		Embed.addField("Tag", Client.user.tag);
		Embed.addField("Guilds", Client.guilds.size);
		Embed.addField("Ping", `${Math.round(Client.ping)}ms`, true);
		Embed.addField("Uptime", secondsTimeConvert(Math.floor(Client.uptime / 1000)), true);
		Embed.addField("Created at", Client.user.createdAt, true);
		Embed.addField("Avatar", "\u200b");
		message.channel.send(Embed);
	},
};