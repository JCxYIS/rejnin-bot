const config = require("../config.json");
const Discord = require('discord.js');
const embed = require("../embedtemplate.js");

module.exports = {
	name: "restart",
	description: "Restarts the bot. Can only be used by bot owner `ninjer#6366`.",
	aliases: ["sleep"],
	ownerExclusive: true,
	execute(message, args){
		const Embed = new Discord.RichEmbed(embed(message));

		if (message.author.id !== config.ownerID){
			message.client.fetchUser(config.ownerID)
			.then(owner => {
				message.channel.send(`Hey! You're not \`${owner.tag}\`! What are you doing?`);
			})
			.catch(error => console.error(error));
		};
		Embed.setTitle("Shutting down... See you later!");

		message.channel.send(Embed)
		.then(message => process.exit())
		.catch(error => console.error(error));
	},
};
