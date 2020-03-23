const Discord = require('discord.js');
const getUser = require("../bot-modules/getuser.js");
const { Quotes } = require("../dbObjects.js");
const fs = require("fs");

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
			message.client.logger.error(error);
			return message.channel.send("I couldn't find that user!");
		}

		const allQuotes = await Quotes.findAll({ where: { user_id: user.id }});

		if (number.toLowerCase() === "all"){
			const speaker = message.author;
			const channel = message.channel;
			const filter = response => response.author === speaker && response.channel === channel && (response.content === "$confirm" || response.content === "$cancel");
			message.channel.send(`Are you sure you want to delete all **${allQuotes.length}** quotes from **${user.username}**? This timeouts in 30 seconds. Type \`$confirm/$cancel\` to continue.`)
			const collector = message.channel.createMessageCollector(filter, { time: 30000 })

			collector.on("collect", async m => {
				if (m.content === "$cancel") {
					m.channel.send("Cancelled.")
					return collector.stop();
				};
				try {
					for (let i = 0; i < allQuotes.length; i++){
						if (allQuotes[i].description.startsWith("&QUOTEIMAGE")){
							const filename = allQuotes[i].description.slice(allQuotes[i].description.indexOf(" ") + 1);
							fs.unlinkSync(`./assets/quoteimg/${filename}`);
						}
						const quote = await Quotes.destroy({
							where: {id: allQuotes[i].id}
						});
					}
					collector.stop();
					return message.channel.send(`Successfully deleted all **${allQuotes.length}** quotes from **${user.username}**.`);
				} catch(error){
						message.client.logger.error(error);
						return message.reply('Something went wrong with deleting a quote.');
					}
			});

			collector.on("end", (collected, reason) => {

			});

			return;
		};

		if (parseFloat(number) === 0 || !Number.isInteger(parseFloat(number))) return message.channel.send("Please specify a valid integer!");

		if (parseFloat(number) <= allQuotes.length) {
			const index = parseFloat(number) - 1;
			try {
				if (allQuotes[index].description.startsWith("&QUOTEIMAGE")){
					const filename = allQuotes[index].description.slice(allQuotes[index].description.indexOf(" ") + 1);
					fs.unlinkSync(`./assets/quoteimg/${filename}`);
				}
				const quote = await Quotes.destroy({
					where: {id: allQuotes[index].id}
				});
				return message.channel.send(`Successfully deleted quote **#${number}** from **${user.username}**.`);
			} catch(error){
					message.client.logger.error(error);
					return message.reply('Something went wrong with deleting a quote.');
				}
		}

		if (parseFloat(number) >= allQuotes.length) return message.channel.send(`**${user.username}** only has ${allQuotes.length} quote(s)!`);
		else message.channel.send("Please specify a valid number!");
	},
};
