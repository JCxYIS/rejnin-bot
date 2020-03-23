const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");

module.exports = {
	name: "leaderboard",
	description: "Displays the richest # users. (Defaults to 10)",
	ownerExclusive: false,
	guildOnly: true,
  aliases: ["lb"],
  usage: "<number(max: 20)>",
	execute(message, args){
		const currency = message.client.currency;
		const num = !!args[0] ? parseFloat(args[0]) : 10;
		if (!Number.isInteger(num) || num > 20 || num < 1) return message.channel.send("Please specify a valid number.");
		const leaderboard = currency.filter(userID => message.guild.members.has(userID)).sort((a, b) => b.balance - a.balance).first(num)
		.map((user, index) => {
				let rank = (index + 1) + "th";
				if (index == 0) rank = "1st";
				else if (index == 1) rank = "2nd";
				else if (index == 2) rank = "3rd";

				const fetchedUser = message.client.users.get(user.user_id)
				const username = fetchedUser.username;

				const balance = user.balance;
				const digits = balance.toString().length;

				const returnStr = rank.concat(": ", username).padEnd(30 - digits, ".") + "$" + balance;
				return returnStr;
		});

		const Embed = new Discord.RichEmbed(embed(message));
		Embed.setAuthor(`Leaderboard`)
		.setDescription(`Showing the top ${num} wealthiest users:`)
		.addField('​', `\`${leaderboard.join("\n")}\``, true);
		message.channel.send(Embed);
	},
};
