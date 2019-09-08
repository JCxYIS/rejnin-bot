const embed = require("../embedtemplate.js");
const Discord = require("discord.js");


module.exports = {
	name: "avatar",
	aliases: ["pfp", "icon", "av"],
	usage: "[tagged user||displayName||discord ID]",
	description: "Sends the avatar of the specified user. (Sends the avatar of the sender if not specified.)",
	execute(message, args) {
		const Embed = new Discord.RichEmbed(embed(message));

		function getUserByName(collection){
			const memberObject = collection.find(member => member.displayName.toLowerCase().startsWith(args[0].toLowerCase()) || member.user.username.toLowerCase().startsWith(args[0].toLowerCase()));
			if (!memberObject) return "";
			return memberObject.user;
		};

		async function getUser(message){
			const user = message.mentions.users.first()
			|| getUserByName(message.guild.members)
			|| await message.client.fetchUser(args[0], true);
			return user;
		};

		if (!args[0]) {
			Embed.setTitle(`**${message.author.username}**'s avatar:`);
			Embed.setImage(`${message.author.displayAvatarURL}`)
			return message.channel.send(Embed);
		};

		getUser(message)
		.then(user => {
				Embed.setTitle(`**${user.username}**'s avatar:`);
				Embed.setImage(`${user.displayAvatarURL}`);
				message.channel.send(Embed);
		})
		.catch(error => {
			message.channel.send("I couldn't find the user you were looking for!");
			console.error(error);
			});
	},
};
