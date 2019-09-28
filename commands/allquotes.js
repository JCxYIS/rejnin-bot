const { ownerID } = require("../config.json");

module.exports = {
	name: "allquotes",
	description: "Equivalent to \`$quote [user] all\`.",
	aliases: ["allquote"],
  args: true,
  usage: "[user]",
	execute(message, args){
		const user = args[0];
		const allQuoteMessage = message;
		allQuoteMessage.content = `$quote ${user} all`;
    message.client.emit("message", allQuoteMessage);
	},
};
