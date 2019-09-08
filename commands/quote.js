const Discord = require('discord.js');
const getUser = require("../bot-modules/getuser.js");
const { Quotes } = require("../dbObjects.js");

module.exports = {
	name: "quote",
	description: "Displays a quote (or all quotes) from a user.",
	aliases: ["quotes", "q"],
	usage: "[user] [number/all]",
	async execute(message, args){

		async function getQuote(target, number){
			const Embed = new Discord.RichEmbed();
			const allQuotes = await Quotes.findAll({ where: { user_id: target.id }});

			if (allQuotes.length === 0) return message.channel.send(`**${target.username}** has no quotes. How sad.`);

			if (number === "all"){
				let index = 1
				const quoteList = allQuotes.map(q => q.description);
				for (let i = 0; i < quoteList.length; i++){
					quoteList[i] = (i + 1) + ". " + quoteList[i];
				};
				return message.channel.send(`Here are all quotes from **${target.username}**:\n${quoteList.join("\n")}`);
			}

			let index;
			if (number === "random")  index = 1 + Math.floor(Math.random() * allQuotes.length);
			else index = parseFloat(number);

			if (!Number.isInteger(index)) return message.channel.send("Please specify a valid number.");
			if (index > allQuotes.length) return message.channel.send(`**${target.username}** only has ${allQuotes.length} quote(s)!`);

			const quote = allQuotes[index - 1];
			Embed.setAuthor(target.username, target.displayAvatarURL)
			.setDescription(quote.get("description"))
			.setColor(Math.floor((Math.random() * 16777216)));
			quote.increment("usage_count");

			return message.channel.send(Embed);
		}

		if (!args[0]) return getQuote(message.author, "random")
		else if (!args[1]) {
			if (args[0] < 1000 || args[0].toLowerCase() === "all") return getQuote(message.author, args[0]);
			else {
				const user = await getUser(message, args[0]);
				return getQuote(user, "random")
			}
		}
		else {
			const user = await getUser(message, args[0]);
			if (!user) return message.channel.send("Couldn't find that user!");
			return getQuote(user, args[1]);
		}
	},
};
