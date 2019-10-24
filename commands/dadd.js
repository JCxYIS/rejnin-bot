const Discord = require('discord.js');
const getUser = require("../bot-modules/getuser.js");

module.exports = {
	name: "dadd",
	description: "Adds an amount of Doubee to a user.",
	usage: "[user] <amount>",
	ownerExclusive: true,

	execute(message, args){
		if (!args[1]){
			async function addSelf(){
				const amount = parseFloat(args[0]);
				if (!Number.isInteger(amount)) return message.channel.send("Please specify a valid number.");
				user = await message.client.currency.add(message.author.id, amount);
				return message.channel.send(`**${message.author.username}** now has \`$${message.client.currency.getBalance(message.author.id)}\`.`);
			};
			addSelf()
			.catch(error => console.error(error));
			return;
		}

		const s = message.content.indexOf(" ");
		const e = message.content.lastIndexOf(" ");
		const name = message.content.slice(s + 1, e);
		const amount = parseFloat(message.content.slice(e + 1));

		if (!Number.isInteger(amount)) return message.channel.send("Please specify a valid number.");

		getUser(message, name)
		.then(async user => {
			target = await message.client.currency.add(user.id, amount);
			return message.channel.send(`**${user.username}** now has \`$${message.client.currency.getBalance(target.user_id)}\`.`);
		})
		.catch(error => {
				message.channel.send("I couldn't find the user you were looking for!");
				console.error(error);
			});
	},
};
