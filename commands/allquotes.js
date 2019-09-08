module.exports = {
	name: "allquotes",
	description: "Equivalent to \`$quote [user] all\`.",
	aliases: ["allquote"],
  args: true,
  usage: "[user]",
	execute(message, args){
    message.client.emit("message", "$quote ninjer all");
	},
};
