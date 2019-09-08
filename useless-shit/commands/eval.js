const config = require("../config.json");

function clean(text){
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
};

module.exports = {
	name: "eval",
	args: true,
  ownerExclusive: true,
	description: "Evaluates some code. Can only be used by bot owner `ninjer#6366`.",
	execute(message, args){
		if(message.author.id !== config.ownerID){
      message.client.fetchUser(config.ownerID)
      .then(owner => {
        message.channel.send(`Hey! You're not \`${owner.tag}\`! What are you doing?`);
      })
      .catch(error => console.error(error));
      return;
    }
    try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    };
	},
};
