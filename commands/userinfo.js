const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");
const getUser = require("../bot-modules/getuser.js");

module.exports = {
	name: "userinfo",
	description: "Returns info of the specified user or sender if not specified.",
	usage: "[tagged user||displayName||discord ID]",
	aliases: ["uinfo"],
	execute(message, args){
		const Embed = new Discord.RichEmbed(embed(message));

		function createUserInfoEmbed(user){
			Embed.setTitle(`Here's some info about **${user.username}**:`);
			Embed.setImage(`${user.displayAvatarURL}`);
			Embed.addField("Created at", `${user.createdAt}`, true);
			Embed.addField("Tag", `${user.tag}`, true);
			Embed.addField("ID", `\`${user.id}\``, true);

			const allMembers = await message.guild.members.fetch();
			if (allMembers.has(user.id)){
				const member = allMembers.get(user.id);
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

		const name = message.content.slice(message.content.indexOf(" ") + 1);

		getUser(message, name)
		.then(user => createUserInfoEmbed(user))
		.catch(error =>{
			message.channel.send("I couldn't find the user you were looking for!");
		});

	},
};
