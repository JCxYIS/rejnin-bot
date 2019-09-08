const config = require("../config.json");
const Discord = require('discord.js');
const embed = require("../embedtemplate.js");

module.exports = {
	name: "help",
	description: "Feeling clever are we? Lists info about all my commands or about a specific command.",
	execute(message, args){
		const Embed = new Discord.RichEmbed(embed(message));
		const { commands } = message.client;
		let data = [];
		if (!args.length){
			const tip = [`Tip: You can send \`${config.prefix}help [command name]\` to get info on a specific command.`];
			const desc = tip.concat(commands.map(command => "`" + command.name + "`"));

			Embed.setTitle(`Here's a list of all my commands:`);
			Embed.setDescription(desc.join("\n"));

			return message.channel.send(Embed);

			// return message.author.send(Embed)
			// 	.then(() => {
			// 		if (message.channel.type ===  "dm") return;
			// 		message.reply("I've sent you a DM with all my commands.");
			// 	})
			// 	.catch(error => {
			// 		console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
			// 		message.reply("it seems like I can't DM you. Do you have DMs turned on?")
			// 	});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases || c.aliases.includes(name));

		if (!command){
			return message.channel.reply("that's not a valid command. Dummy.");
		}

		Embed.setTitle(`\`${command.name}\``);

		if (command.description) Embed.setDescription(`${command.description}`);
		if (command.aliases) Embed.addField("Aliases", `\`${command.aliases.join("`, `")}\``, true);
		if (command.usage) Embed.addField("Usage", `\`${config.prefix}${command.name} ${command.usage}\``, true);

		Embed.addField('is guildOnly', `\`${!!command.guildOnly}\``, true)
		Embed.addField('Cooldown', `${command.cooldown || 2} second(s)`, true)

		message.channel.send(Embed);
	},
};
