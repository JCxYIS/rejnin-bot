const Discord = require('discord.js');
const embed = require("../embedtemplate.js");

module.exports = {
	name: "say",
	description: "Makes me say stuff.",
	args: true,
	usage: "([channel name||ID] or [username||ID]) [stuff]",
	ownerExclusive: true,
	execute(message, args){
		const client = message.client;
		client.fetchUser(args[0], true)
		.then(user => {
			user.send(message.content.slice(4 + 1 + args[0].length + 1));
			return user;
		})
		.catch(error => {
			const channel = client.channels.get(args[0]);
			channel.send(message.content.slice(4 + 1 + args[0].length + 1));
			return channel;
		})
		.then(receiver => {
			receiverName = receiver.name || receiver.username;
			message.channel.send(`Successfully sent message to \`${receiverName}\`!`)
		})
		.catch(error => {
			message.channel.send("Couldn't send message!");
			console.error(error);
		})
	}
};
