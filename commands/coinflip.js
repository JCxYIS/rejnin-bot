const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");

module.exports = {
	name: "coinflip",
  aliases: ["flip", "coin"],
	usage: "[heads/h/head/tails/t/tail] [amount]",
	description: "Flips a coin! You can also gamble an amount of Doubee.",
	async execute(message, args){
		const Embed = new Discord.RichEmbed(embed(message));
		const headsAliases = ["heads", "head", "h"];
		const tailsAliases = ["tails", "tail", "t"];
		const edgeAliases = ["edge", "e"];

		let guess = "", amount = 0;
		if (!!args[0] && !!args[1]){
			if (headsAliases.some((name) => {return name === args[0]})) {guess = "heads";}
			else if (tailsAliases.some((name) => {return name === args[0]})) {guess = "tails";}
			//else if (edgeAliases.some((name) => {return name === args[0]})) {guess = "edge";}
			else return;

			amount = parseFloat(args[1]);
			if (!Number.isInteger(amount) || amount < 0) return message.channel.send("Please specify a valid number.");
			const balance = await message.client.currency.getBalance(message.author.id);
			if (balance < amount) return message.channel.send(`You don't have enough Doubee! ($**${balance}**)`);
		}

		let side = "";
    const num = Math.floor(Math.random() * 101) + 1;
    if (num < 51) {
			Embed.setImage("https://imgur.com/8kJTODS.gif").setTitle("The coin landed on tails!");
			side = "tails";
		}
    else if (num === 51) {
			Embed.setImage("https://imgur.com/WVbap25.gif").setTitle("The coin landed on edge!");
			side = "edge";
		}
    else {
			Embed.setImage("https://imgur.com/jwWUQOy.gif").setTitle("The coin landed on heads!");
			side = "heads";
		}

		if (!!guess && !!amount){
			amount = (guess === side) ? amount : -amount;
			const result = (guess === side) ? "You won the bet!" : "You lost the bet.";
			message.client.currency.add(message.author.id, amount)
			.then(() => {
				return message.client.currency.getBalance(message.author.id);
			})
			.then(newBalance => {
				Embed.setDescription(`**${result}\n${message.author.tag}** now has \`$${newBalance}\`.`);
				message.channel.send(Embed);
			})
			.catch(error => {
				console.error(error);
			});
			return;
		}

		message.channel.send(Embed);
	},
};
//change this
