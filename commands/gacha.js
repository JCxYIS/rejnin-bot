const Discord = require('discord.js');
const getUser = require("../bot-modules/getuser.js");
const timestamp = require("../bot-modules/currentTime.js");
const { UserItems } = require("../dbObjects.js");
const { gacha } = require("../bot-modules/gacha.json");
const embed = require("../bot-modules/embedtemplate.js");

module.exports = {
	name: "gacha",
	description: "Draws a card! Costs **100** Doubees.",
  aliases: ["抽卡", "draw", "十連抽", "抽", "十連"],
  usage: "[10]",

	async execute(message, args){
    async function gachaPull() {
      // const rand = Math.random();
			const rand = parseFloat(args[0]);
			let chance = 0;
			for (const rarity of gacha){
				chance += rarity.chance
				if (rand <= rarity.chance){
					const length = rarity.cards.length;
					const card = rarity.cards[Math.floor(Math.random() * length)];
					return card;
				}
			}
    }

		const balance = await message.client.currency.getBalance(message.author.id);
		if (balance - 100 < 0) return message.channel.send(`You don't have enough Doubees! ($**${balance}**)`);
		const result = await gachaPull();
		const target = await message.client.currency.add(message.author.id, -100);
		try {
			const cardCount = await UserItems.findOne({ where: { user_id: message.author.id, item_id: result.id } });
			if (!cardCount) return UserItems.create({ user_id: message.author.user_id, item_id: result.id, amount: 1 });

			cardCount.amount += 1;
			return cardCount.save();
		} catch(error){
			console.error(error);
		}

		const Embed = new Discord.RichEmbed(embed(message));
		Embed.setTitle(`You got a ${result.name}!`);
		message.channel.send(Embed);
	},
};
