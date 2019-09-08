const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");
const getUser = require("../bot-modules/getuser.js");

module.exports = {
	name: "serverinfo",
	description: "Returns info of the current server.",
	aliases: ["sinfo"],
  guildOnly: true,
	execute(message, args){
		const Embed = new Discord.RichEmbed(embed(message));
    const guild = message.guild;
    const defaultChannel = guild.systemChannel.toString() || "None";

		Embed.setTitle(`Here's some info about **${guild.name}**:`)
		.setImage(guild.iconURL)
		.addField("Created at", guild.createdAt, true)
    .addField("ID", `\`${guild.id}\``, true)
		.addField("Total Members", guild.memberCount, true)
    .addField("Bots", guild.members.filter(member => member.user.bot).size, true)
		.addField("Channels", guild.channels.size, true)
		.addField("Default Channel (#general)", defaultChannel, true)
		.addField("Owner", guild.owner.toString(), true)
		.addField("Region", guild.region, true);

		Embed.addField("Icon", "\u200b");
		message.channel.send(Embed);
	}
};
