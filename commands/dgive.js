const Discord = require('discord.js');
const getUser = require("../bot-modules/getuser.js");

module.exports = {
	name: "dgive",
	description: "Gives a user some of your Doubee.",
	usage: "<user> <amount>",

	execute(message, args){
		const s = message.content.indexOf(" ");
		const e = message.content.lastIndexOf(" ");
		const name = message.content.slice(s + 1, e);
		const amount = parseFloat(message.content.slice(e + 1));

		if (!Number.isInteger(amount) || amount < 0) return message.channel.send("Please specify a valid number.");

		getUser(message, name)
		.then(async user => {
			const balance = await message.client.currency.getBalance(message.author.id);
			if (balance < amount) return message.channel.send(`You don't have enough Doubees! ($**${balance}**)`);

			giver = await message.client.currency.add(message.author.id, -amount);
			receiver = await message.client.currency.add(user.id, amount);
			return message.channel.send(`You gave **${user.username}** \`$${amount}\`.`);
		})
		.catch(error => {
				message.channel.send("I couldn't find the user you were looking for!");
				message.client.logger.error(error);
		});
	},
};
