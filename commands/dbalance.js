const Discord = require('discord.js');
const getUser = require("../bot-modules/getuser.js");

module.exports = {
	name: "dbalance",
	description: "Shows how much Doubee a user has.",
  aliases: ["dmoney", "balance", "money"],
	execute(message, args){
		if (!args[0]) return message.channel.send(`**${message.author.username}** has \`$${message.client.currency.getBalance(message.author.id)}\`.`);
		const name = message.content.slice(message.content.indexOf(" ") + 1);
		getUser(message, name)
		.then(user => {
			message.channel.send(`**${user.username}** has \`$${message.client.currency.getBalance(user.id)}\`.`);
		})
		.catch(error => {
			message.channel.send("I couldn't find the user you were looking for!");
			console.error(error);
		});
	}
};
