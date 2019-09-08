const Discord = require('discord.js');
const embed = require("../embedtemplate.js");

module.exports = {
	name: "userinfo",
	description: "Returns info of the specified user/sender (if not specified).",
	usage: "[tagged user||displayName||discord ID]",
	aliases: ["uinfo"],
	execute(message, args){
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

		function createUserInfoEmbed(user){
			Embed.setTitle(`Here's some info about **${user.username}**:`);
			Embed.setImage(`${user.displayAvatarURL}`);
			Embed.addField("Created at", `${user.createdAt}`, true);
			Embed.addField("Tag", `${user.tag}`, true);
			Embed.addField("ID", `\`${user.id}\``, true);

			if(!!message.guild.members.has(user.id)){
				const member = message.guild.members.get(user.id);
				Embed.addBlankField()
				if (!!member.nickname)
					Embed.addField("Nickname", member.nickname, true);
				Embed.addField("Roles", member.roles.map(role => role.name).join(", "));
				Embed.addField(`Hexcolor`, member.displayHexColor, true);
				Embed.addField(`Joined **${member.guild}** at`, member.joinedAt, true);
			};

			Embed.addField("Avatar", "\u200b");
			return message.channel.send(Embed);
		};

		if (!args[0]) {
			return createUserInfoEmbed(message.author);
		};

		getUser(message)
		.then(user => createUserInfoEmbed(user))
		.catch(error =>{
			message.channel.send("I couldn't find the user you were looking for!");
			console.error(error);
		});

	},
};
