const Discord = require('discord.js');
const embed = require("../bot-modules/embedtemplate.js");

module.exports = {
	name: "say",
	description: "Makes me say stuff. (Type $endsay to end the collector)",
	usage: "[channel ID/ user ID] <stuff>",
	ownerExclusive: true,
	async execute(message, args){
    const client = message.client;

    const destination = await client.channels.get(args[0]) || await client.fetchUser(args[0], true);
    if (!destination) return message.channel.send("Couldn't find destination!");
    let destinationName = !!destination.type ? destination.name : destination.username;

    if (!args[1]){
      const speaker = message.author;
      const channel = message.channel;
      const filter = response => response.author === speaker && response.channel === channel;
      message.channel.send(`Sending messages to **${destinationName}**.`)
      const collector = message.channel.createMessageCollector(filter, { time: 1800000 })

      collector.on("collect", m => {
        if (m.content === "$endsay") return collector.stop("$endsay.");
        destination.send(m.content);
      });

      collector.on("end", (collected, reason) => {
        const total = reason === "time" ? collected.size : collected.size - 1;
        channel.send(`Sent a total of **${total}** messages to \`${destinationName}\`.\nReason collector ended: ${reason}`)
      });
    }

    else {
      destination.send(message.content.slice(4 + 1 + args[0].length + 1))
      .then(() => message.channel.send(`Successfully sent message to \`${destinationName}\`!`))
      .catch(error => {
        message.channel.send("Couldn't send message!")
        console.error(error);
      });
    }
  },
};
