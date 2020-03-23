const config = require("../config.json");
const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");

module.exports = {
	name: "restart",
	description: "Restarts the bot. Can only be used by bot owner `ninjer#6366`.",
	aliases: ["sleep", "r", "fuckoff"],
	ownerExclusive: true,
	execute(message, args){
		const Embed = new Discord.RichEmbed(embed(message));
		Embed.setTitle("Shutting down... See you later!");

		message.channel.send(Embed)
		.then(message => process.exit())
		.catch(error => message.client.logger.error(error));
	},
};
