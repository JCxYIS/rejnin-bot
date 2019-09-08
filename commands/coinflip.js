const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");

module.exports = {
	name: "coinflip",
  aliases: ["flip", "coin"],
	description: "Flips a coin!",
	execute(message, args){
		const Embed = new Discord.RichEmbed(embed(message));

    const num = Math.floor(Math.random() * 101) + 1;
    if (num < 51) Embed.setImage("https://imgur.com/8kJTODS.gif").setTitle("The coin landed on tails!")
    else if (num === 51) Embed.setImage("https://imgur.com/WVbap25.gif").setTitle("The coin landed on edge!")
    else Embed.setImage("https://imgur.com/jwWUQOy.gif").setTitle("The coin landed on heads!")

		message.channel.send(Embed);
	},
};
