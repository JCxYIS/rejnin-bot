module.exports = {
	name: "allquotes",
	description: "Equivalent to \`$quote [user] all\`.",
	aliases: ["allquote"],
  usage: "<user>",
	execute(message, args){
		const user = args[0] ? args[0] : message.author.id;
		const allQuoteMessage = message;
		allQuoteMessage.content = `$quote ${user} all`;
    message.client.emit("message", allQuoteMessage);
	},
};
