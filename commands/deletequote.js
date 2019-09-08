const Discord = require('discord.js');
const getUser = require("../bot-modules/getuser.js");
const { Quotes } = require("../dbObjects.js")

module.exports = {
	name: "deletequote",
	description: "Deletes a quote from a user.",
	usage: "[user] [number/all]",
	async execute(message, args){
		const nameStart = message.content.indexOf(" ");
		const nameEnd = message.content.lastIndexOf(" ");
		const name = message.content.slice(nameStart + 1, nameEnd);
		const number = message.content.slice(nameEnd + 1);

		let user;
		try {
			user = await getUser(message, name);
		} catch(error){
			console.error(error);
			return message.channel.send("I couldn't find that user!");
		}

		const allQuotes = await Quotes.findAll({ where: { user_id: user.id }});

		if (number.toLowerCase() === "all"){
			try {
				for (let i = 0; i < allQuotes.length; i++){
						const quote = await Quotes.destroy({
							where: {id: allQuotes[i].id}
						})
					}
				return message.channel.send(`Successfully deleted all **${allQuotes.length}** quotes from **${user.username}**.`);
			} catch(error){
					console.error(error);
					return message.reply('Something went wrong with deleting a quote.');
				}
		};

		if (parseFloat(number) === 0 || !Number.isInteger(parseFloat(number))) return message.channel.send("Please specify a valid integer!");

		if (parseFloat(number) <= allQuotes.length) {
			try {
				const quote = await Quotes.destroy({
					where: {id: allQuotes[parseFloat(number) - 1].id}
				});
				return message.channel.send(`Successfully deleted quote **#${number}** from **${user.username}**.`);
			} catch(error){
					console.error(error);
					return message.reply('Something went wrong with deleting a quote.');
				}
		}

		if (parseFloat(number) >= allQuotes.length) return message.channel.send(`**${user.username}** only has ${allQuotes.length} quote(s)!`);
		else message.channel.send("Please specify a valid number!");
	},
};
