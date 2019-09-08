const Discord = require("discord.js");
const embed = require("../bot-modules/embedtemplate.js");
const getUser = require("../bot-modules/getuser.js");

module.exports = {
	name: "avatar",
	aliases: ["pfp", "icon", "av"],
	usage: "[tagged user||displayName||discord ID]",
	description: "Sends the avatar of the specified user. (Sends the avatar of the sender if not specified.)",
	execute(message, args) {
		const Embed = new Discord.RichEmbed(embed(message));

		if (!args[0]) {
			Embed.setTitle(`**${message.author.username}**'s avatar:`);
			Embed.setImage(`${message.author.displayAvatarURL}`)
			return message.channel.send(Embed);
		};

		const name = message.content.slice(message.content.indexOf(" ") + 1);

		getUser(message, name)
		.then(user => {
				Embed.setTitle(`**${user.username}**'s avatar:`)
				.setImage(`${user.displayAvatarURL}`);
				message.channel.send(Embed);
		})
		.catch(error => {
			message.channel.send("I couldn't find the user you were looking for!");
			});
	},
};
