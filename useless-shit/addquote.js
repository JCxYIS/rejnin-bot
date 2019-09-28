const Discord = require('discord.js');
const getUser = require("../bot-modules/getuser.js");
const { Quotes } = require("../dbObjects.js")

module.exports = {
	name: "addquote",
	description: "Adds a quote to a user.",
	usage: "<user> \"<quote||attachment>\"",
	async execute(message, args){

		const quoteStart = message.content.indexOf("\"");
		const quoteEnd = message.content.lastIndexOf("\"");
		if ((!quoteStart && !quoteEnd) || (quoteStart === quoteEnd)){
			return message.channel.send("Put quotation marks around your quote!");
		}

		const name = message.content.slice(message.content.indexOf(" ") + 1, quoteStart - 1);
		let user;
		try {
			user = await getUser(message, name);
		} catch(error){
			console.error(error);
			return message.channel.send("I couldn't find that user!");
		}
		const content = message.content.slice(quoteStart + 1, quoteEnd);

		try {
			const quote = await Quotes.create({
				user_id: user.id,
				description: content
			})
			return message.channel.send(`Successfully added quote to **${user.username}**.`)
		} catch(error){
			if (error.name === 'SequelizeUniqueConstraintError') {
				return message.reply('That quote already exists.');
			}
			console.error(error);
			return message.reply('Something went wrong with adding a quote.');
		}
	},
};
