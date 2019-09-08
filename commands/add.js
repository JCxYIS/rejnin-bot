const Discord = require('discord.js');
const getUser = require("../bot-modules/getuser.js");

module.exports = {
	name: "add",
	description: "Gives a user an amount of money.",
  aliases: ["give"],
	usage: "[user] <amount>",
	execute(message, args){
		if (!args[1]){
			async function addSelf(){
				user = await message.client.currency.add(message.author.id, args[1]);
				return message.channel.send(`**${message.author.username}** now has \`$${message.client.currency.getBalance(message.author.id)}\`.`);
			};
			addSelf()
			.catch(error => console.error(error));
			return;
		}

		const s = message.content.indexOf(" ");
		const e = message.content.lastIndexOf(" ");
		const name = message.content.slice(s + 1, e);
		const amount = message.content.slice(e + 1);

		getUser(message, name)
		.then(async user => {
			target = await message.client.currency.add(user.id, amount);
			return message.channel.send(`**${user.username}** now has \`$${message.client.currency.getBalance(target.user_id)}\`.`);
		})
		.catch(error => console.error(error));
	},
};
