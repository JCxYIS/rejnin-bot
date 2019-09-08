const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");

module.exports = {
	name: "prune",
	description: "Deletes a specified number (1-99) of messages. Cannot delete messages older than 2 weeks old.",
	guildOnly: true,
	args: true,
	aliases: ["delete", "purge"],
	usage: "<1-99>",
	ownerExclusive: true,
	cooldown: 5,
	execute(message, args) {
		const Embed = new Discord.RichEmbed(embed(message));
		const amount = parseFloat(args[0]) + 1;

		if (!Number.isInteger(amount)){
			return message.reply("please specify a valid number.");
		}else if (amount < 1 || amount > 99){
			return message.reply("you need to input a number between 1 to 99.");
		}

		message.channel.bulkDelete(amount, true)
		.then(messages => {
			Embed.setTitle(`I have deleted ${messages.size - 1} messages for you.`)
			.setAuthor(message.member.name, message.author.displayAvatarURL)
			return message.channel.send(Embed);
			})
		.then(msg => msg.delete(5000))
		.catch(err => {
		console.error(err);
		message.channel.send('There was an error trying to prune messages in this channel!');
		});
	},
};
